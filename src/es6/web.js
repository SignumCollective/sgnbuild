import * as path from 'path';
import { rollup } from 'rollup';
import webpack from 'webpack';

import config, { npmPackage } from './config';

export default function buildWeb() {
  const start = new Date;
  console.log('Running rollup...');
  return rollup({
    entry: path.join('.', config.root, 'es6', 'index.js'),
  })
  .then(bundle =>
    bundle.write({
      format: 'es',
      dest: 'bin/index.cjs',
      moduleId: npmPackage.name,
      moduleName: config.global || npmPackage.name,
    })
  )
  .then(() => {
    console.log('Running webpack...');
    return new Promise((resolve, reject) => {
      const compiler = webpack({
        entry: 'bin/index.cjs',
        output: {
          filename: 'index.js',
          path: './bin',
        },
        loaders: [
          {
            test: /.(c)?js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ['es2015-webpack'],
            },
          },
        ],
      });
      compiler.run((err, stats) => {
        if (err != null) {
          reject(err);
        } else {
          resolve(stats);
        }
      });
    });
  })
  .then(stats => {
    console.log(stats);
    console.log(`Build finished in ${(new Date - start) / 1000} seconds.`);
  })
  .catch(err => {
    console.error(`Build error: ${err.toString()}`);
  });
}
