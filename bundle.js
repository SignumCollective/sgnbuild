(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('fs'), require('path'), require('commander'), require('rollup'), require('rollup-plugin-babel'), require('rollup-plugin-json'), require('rollup-plugin-commonjs'), require('rollup-plugin-node-resolve'), require('rollup-plugin-node-globals'), require('rollup-plugin-node-builtins'), require('rollup-plugin-uglify')) :
  typeof define === 'function' && define.amd ? define(['fs', 'path', 'commander', 'rollup', 'rollup-plugin-babel', 'rollup-plugin-json', 'rollup-plugin-commonjs', 'rollup-plugin-node-resolve', 'rollup-plugin-node-globals', 'rollup-plugin-node-builtins', 'rollup-plugin-uglify'], factory) :
  (factory(global.fs,global.path,global.program,global.rollup,global.babel,global.json,global.commonjs,global.nodeResolve,global.nodeGlobals,global.builtins,global.uglify));
}(this, function (fs,path,program,rollup,babel,json,commonjs,nodeResolve,nodeGlobals,builtins,uglify) { 'use strict';

  babel = 'default' in babel ? babel['default'] : babel;
  json = 'default' in json ? json['default'] : json;
  commonjs = 'default' in commonjs ? commonjs['default'] : commonjs;
  nodeResolve = 'default' in nodeResolve ? nodeResolve['default'] : nodeResolve;
  nodeGlobals = 'default' in nodeGlobals ? nodeGlobals['default'] : nodeGlobals;
  builtins = 'default' in builtins ? builtins['default'] : builtins;
  uglify = 'default' in uglify ? uglify['default'] : uglify;

  //import { version } from '../../package.json';
  const version = '1';

  const npmPackage = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));

  program
    .version(version)
    .option('-t, --type [type]', 'Project type (web, library, or node)')
    .option('-r, --root [path]', 'Directory in which to find es6/index.js')
    .option('-g, --global [identifier]', 'If type is library, this sets the global to put all '
          + 'exported fields in if the environment is not CommonJS or AMD.')
    .option('-u, --uglify', 'If type is library or web, pass the result through UglifyJS')
    .parse(process.argv);

  const config = npmPackage.sgnbuild || {};
  config.type = program.type || config.type || 'library';
  config.root = program.root || config.root || 'src';
  config.global = program.global || config.global || void 0;
  if (program.uglify != null) {
    config.uglify = program.uglify;
  } else if (config.uglify == null) {
    config.uglify = false;
  }

  function buildLibrary() {
    const start = new Date;
    console.log('Running rollup...');
    return rollup.rollup({
      entry: path.join(process.cwd(), config.root, 'es6', 'index.js'),
      plugins: [
        babel({
          exclude: 'node_modules/**',
          presets: ['es2015-rollup'],
        }),
        json(),
      ],
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

  function buildWeb() {
    const start = new Date;
    console.log('Running rollup...');
    return rollup.rollup({
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
          presets: ['es2015-rollup'],
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

  function buildNode() {
    const start = new Date;
    console.log('Running rollup...');
    return rollup.rollup({
      entry: path.join(process.cwd(), config.root, 'es6', 'index.js'),
      plugins: [
        json(),
      ],
    })
    .then(bundle =>
      bundle.write({
        format: 'cjs',
        dest: path.join(process.cwd(), 'bin', 'index.js'),
        moduleId: npmPackage.name,
        moduleName: config.global || npmPackage.name,
        banner: '#!/usr/bin/env node',
      })
    )
    .then(() => {
      console.log(`Build finished in ${(new Date - start) / 1000} seconds.`);
    })
    .catch(err => {
      console.error(`Build error: ${err}`);
    });
  }

  switch (config.type) {
    case 'library': {
      buildLibrary();
    } break;
    case 'web': {
      buildWeb();
    } break;
    case 'node': {
      buildNode();
    } break;
    default: {
      console.error('Invalid type in config');
    } break;
  }

}));