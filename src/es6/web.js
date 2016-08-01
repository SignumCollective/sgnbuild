import * as path from 'path';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import nodeGlobals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import uglify from 'rollup-plugin-uglify';
import bundleBabel from 'rollup-plugin-bundle-babel';

import config, { npmPackage } from './config';

export default function buildWeb() {
  const start = new Date;
  console.log('Running rollup...');
  const plugins = [
    builtins(),
    nodeResolve({
      jsNext: true,
      main: true,
    }),
    bundleBabel({
      main: true,
      jsNext: true,
    }),
    commonjs({
      include: [`${__dirname}/../node_modules/**`, 'node_modules/**'],
      sourceMap: false,
    }),
    babel({
      exclude: ['node_modules/**', '*.json'],
      presets: ['es2015-rollup', 'stage-0', 'react'],
      plugins: ['transform-runtime'],
      runtimeHelpers: true,
    }),
    json(),
    nodeGlobals(),
    config.uglify ? uglify() : void 0,
  ].filter(x => x != null);
  return rollup({
    entry: path.join(process.cwd(), config.root, 'es6', 'index.js'),
    plugins,
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
