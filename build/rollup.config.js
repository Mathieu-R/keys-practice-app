import typescript2 from 'rollup-plugin-typescript2';
import loadz0r from 'rollup-plugin-loadz0r';
import replace from 'rollup-plugin-replace';
import rimraf from 'rimraf';

const pkg = require('./package.json');
const version = pkg.version;

rimraf.sync('dist');

export default {
  input: 'src/scripts/index.js',
  output: {
    file: 'dist/src/scripts/bundle.ts',
    format: 'amd'
  },
  plugins: [
    typescript2(),
    loadz0r(),
    replace({
      delimiters: ['{{', '}}'],
      version
    })
  ]
}
