#  sgnbuild [![NPM](https://img.shields.io/npm/v/sgnbuild.svg) ![Downloads per month](https://img.shields.io/npm/dm/sgnbuild.svg) ![Downloads total](https://img.shields.io/npm/dt/sgnbuild.svg)](https://npmjs.com/package/sgnbuild) [![Build Status](https://travis-ci.org/SignumCollective/sgnbuild.svg?branch=master)](https://travis-ci.org/SignumCollective/sgnbuild)
## NOTICE: sgnbuild is built for the latest ["Current"](https://nodejs.org/en/download/current/) version of Node. If it works on other versions, consider that _undefined behavior_. Do not use sgnbuild on Node versions older than Current. (including 4, the current LTS)
## A web application build system

Motto: _it works, nothing more_

## Building instructions

 1. Install sgnbuild from npm

    ```sh
    npm install --global sgnbuild
    ```

 2. Build

    ```sh
    sgnbuild
    ```

 3. Install

    ```sh
    npm install --global
    ```

## Usage instructions

All configuration is done within an object called `"sgnbuild"` in your project's `package.json`.

 - `sgnbuild.type: string`:
   - `"web"`: Build a web application with Rollup, Webpack, and Babel
   - `"node"`: Build a Node application with Rollup, outputting CommonJS
   - `"library"`: Build a library with Rollup, outputting UMD
 - `sgnbuild.root: string`: Directory in which to find `es6/index.js`
 - `sgnbuild.global: string`: If `sgnbuild.type` is `"library"`, this sets the global to put all exported fields in if the environment is not CommonJS or AMD.
 - `sgnbuild.uglify: boolean`: If `sgnbuild.type` is `"web"`, the bundle will be run through UglifyJS.

Take a look at sgnbuild's `package.json` to see an example which is enough for most circumstances:

```json
"sgnbuild": {
  "type": "node"
}
```
