import config from './config';

import buildLibrary from './library';
import buildWeb from './web';
import buildNode from './node';

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
