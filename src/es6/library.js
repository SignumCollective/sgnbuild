import * as path from 'path';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';

import config, { npmPackage } from './config';

export default function buildLibrary() {
  const start = new Date;
  console.log('Running rollup...');
  const plugins = [
    babel({
      exclude: ['node_modules/**', '*.json'],
      presets: ['es2015-rollup', 'stage-0', 'react'],
      plugins: ['transform-runtime'],
    }),
    json(),
    config.uglify ? uglify() : void 0,
  ].filter(x => x != null);
  return rollup({
    entry: path.join(process.cwd(), config.root, 'es6', 'index.js'),
    plugins,
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
  })
  .catch(err => {
    console.error(`Build error: ${err}`);
  });
}
