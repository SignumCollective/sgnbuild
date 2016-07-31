import * as path from 'path';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import nodeGlobals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import uglify from 'rollup-plugin-uglify';

import config, { npmPackage } from './config';

export default function buildWeb() {
  const start = new Date;
  console.log('Running rollup...');
  return rollup({
    entry: path.join(process.cwd(), config.root, 'es6', 'index.js'),
    plugins: [
      builtins(),
      nodeResolve({
        jsNext: true,
        main: true,
      }),
      commonjs({
        include: 'node_modules/**',
        sourceMap: false,
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['es2015-rollup', 'react'],
      }),
      json(),
      nodeGlobals(),
      config.uglify ? uglify() : void 0,
    ],
  })
  .then(bundle =>
    bundle.write({
      format: 'cjs',
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
