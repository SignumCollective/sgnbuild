import * as fs from 'fs';

import config from './config';

import buildLibrary from './library';
import buildWeb from './web';
import buildNode from './node';

async function build() {
  switch (config.type) {
    case 'library': {
      return await buildLibrary();
    }
    case 'web': {
      return await buildWeb();
    }
    case 'node': {
      return await buildNode();
    }
    default: {
      console.error('Invalid type in config');
      return null;
    }
  }
}

if (config.watch) {
  // I think this is kinda genius, schedules builds after the previous
  let buildStream = build().then(() => {
    fs.watch(process.cwd(), { recursive: true }, (event, filename) => {
      const matches = filename !== 'bin/index.js' && filename.match(/\.js(on)?$/);
      if (matches) {
        console.log('Change detected, building... '
                  + '(if a build is currently running, the new one will start when it is done.)');
        buildStream = buildStream.then(() => build());
      }
    });
  });
} else {
  build().catch((err) => {
    console.error(`Build error: ${err}`);
    process.exit(1);
  });
}
