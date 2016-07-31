import * as path from 'path';
import { rollup } from 'rollup';

import config, { npmPackage } from './config';

export default function buildNode() {
  const start = new Date;
  console.log('Running rollup...');
  return rollup({
    entry: path.join('.', config.root, 'es6', 'index.js'),
  })
  .then(bundle =>
    bundle.write({
      format: 'cjs',
      dest: 'bin/index.js',
      moduleId: npmPackage.name,
      moduleName: config.global || npmPackage.name,
      banner: '#!/usr/bin/env node',
    })
  )
  .then(() => {
    console.log(`Build finished in ${(new Date - start) / 1000} seconds.`);
  });
}
