import * as fs from 'fs';

export const npmPackage = JSON.parse(fs.readFileSync('./package.json'));

const config = npmPackage.sgnbuild || {};
config.type = config.type || 'library';
config.root = config.root || 'src';

export default config;
