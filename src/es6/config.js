import * as fs from 'fs';
import * as path from 'path';

export const npmPackage = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));

const config = npmPackage.sgnbuild || {};
config.type = config.type || 'library';
config.root = config.root || 'src';

export default config;
