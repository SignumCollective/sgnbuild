import * as path from 'path';
import { rollup } from 'rollup';

import config, { npmPackage } from './config';

export default function buildLibrary() {
  const start = new Date;
  console.log('Running rollup...');
  return rollup({
    entry: path.join(process.cwd(), config.root, 'es6', 'index.js'),
  })
  .then(bundle =>
    bundle.write({
      format: 'umd',
      dest: path.join(process.cwd(), 'bin', 'index.js'),
      moduleId: npmPackage.name,
      moduleName: config.global || npmPackage.name,
    })
  )
  .then(() => {
    console.log(`Build finished in ${(new Date - start) / 1000} seconds.`);
  });
}
