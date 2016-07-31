#  sgnbuild
## A web application build system

Motto: _it works, nothing more_

## Building instructions

 1. Install sgnbuild from npm

        npm install --global sgnbuild

 2. Build

        sgnbuild

 3. Install

        npm install --global

## Usage instructions

All configuration is done within an object called `"sgnbuild"` in your project's `package.json`.

 - `sgnbuild.type: string`:
   - `"web"`: Build a web application with Rollup, Webpack, and Babel
   - `"node"`: Build a Node application with Rollup, outputting CommonJS
   - `"library"`: Build a library with Rollup, outputting UMD
 - `sgnbuild.root: string`: Directory in which to find `es6/index.js`
 - `sgnbuild.global: string`: If `sgnbuild.type` is `"library"`, this sets the global to put all exported fields in if the environment is not CommonJS or AMD.

Take a look at sgnbuild's `package.json` to see an example which is enough for most circumstances:

```json
"sgnbuild": {
  "type": "node"
}
```
