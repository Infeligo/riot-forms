import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
//import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/riot-forms.js',
  dest: 'build/riot-forms.js',
  format: 'umd',  
  moduleName: 'RiotForms',
  banner: '/* Riot Forms, @license MIT */',
  external: [ 'validate.js' ],
  plugins: [
    nodeResolve({ 
      jsnext: true, 
      main: true 
    }),
    commonjs({
      include: 'node_modules/**',
      ignoreGlobal: true
    }),
    buble(),
    //uglify()
  ]
}