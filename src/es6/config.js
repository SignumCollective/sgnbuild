import * as fs from 'fs';
import * as path from 'path';
import * as program from 'commander';
import { version } from '../../package.json';

export const npmPackage = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));

program
  .version(version)
  .option('-t, --type [type]', 'Project type (web, library, or node)')
  .option('-r, --root [path]', 'Directory in which to find es6/index.js')
  .option('-g, --global [identifier]', 'If type is library, this sets the global to put all '
        + 'exported fields in if the environment is not CommonJS or AMD.')
  .option('-u, --uglify', 'If type is library or web, pass the result through UglifyJS')
  .option('-w, --watch', 'Watch for changes in the current folder and rebuild on every change '
        + 'to a .js or .json file')
  .parse(process.argv);

const config = npmPackage.sgnbuild || {};
config.type = program.type || config.type || 'library';
config.root = program.root || config.root || 'src';
config.global = program.global || config.global || undefined;
if (program.uglify != null) {
  config.uglify = program.uglify;
} else if (config.uglify == null) {
  config.uglify = false;
}
if (program.watch != null) {
  config.watch = program.watch;
} else if (config.watch == null) {
  config.watch = false;
}

export default config;
