(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('fs'), require('path'), require('rollup')) :
  typeof define === 'function' && define.amd ? define(['fs', 'path', 'rollup'], factory) :
  (factory(global.fs,global.path,global.rollup));
}(this, function (fs,path,rollup) { 'use strict';

  const npmPackage = JSON.parse(fs.readFileSync('./package.json'));

  const config = npmPackage.sgnbuild || {};
  config.type = config.type || 'library';
  config.root = config.root || 'src';

  function buildLibrary() {
    return rollup.rollup({
      entry: path.join('.', config.root, 'es6', 'index.js'),
    })
    .then(bundle =>
      bundle.write({
        format: 'umd',
        dest: 'bin/index.js',
      })
    );
  }

  function buildWeb() {
    
  }

  function buildNode() {
    return rollup.rollup({
      entry: path.join('.', config.root, 'es6', 'index.js'),
    })
    .then(bundle =>
      bundle.write({
        format: 'umd',
        dest: 'bin/index.js',
      })
    );
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