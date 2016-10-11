import * as path from 'path';
import { rollup } from './rollup';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
import bundleBabel from 'rollup-plugin-bundle-babel';
import commonjs from 'rollup-plugin-commonjs';

import config, { npmPackage } from './config';

export default async function buildNode() {
  const start = new Date;
  console.log('Running rollup...');
  await rollup({
    rollup: {
      entry: path.join(process.cwd(), config.root, 'es6', 'index.js'),
      plugins: [
        babel({
          exclude: [`${__dirname}/../node_modules/**`, 'node_modules/**', '*.json'],
          // Uglify hates ES2015
          presets: [[
            'es2015',
            {
              modules: false,
            },
          ], 'stage-0', 'react'],
          plugins: ['transform-runtime', 'external-helpers'],
          runtimeHelpers: true,
        }),
        bundleBabel({
          main: true,
          jsNext: true,
        }),
        commonjs({
          include: [`${__dirname}/../node_modules/**`, 'node_modules/**'],
          sourceMap: false,
        }),
        json(),
        config.uglify ? uglify() : void 0,
      ].filter(x => x != null),
      onwarn: Function.prototype,
    },
    bundle: {
      format: 'cjs',
      dest: path.join(process.cwd(), 'bin', 'index.js'),
      moduleId: npmPackage.name,
      moduleName: config.global || npmPackage.name,
      banner: '#!/usr/bin/env node',
    },
  });
  console.log(`Build finished in ${(new Date - start) / 1000} seconds.`);
}
