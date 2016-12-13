import includePaths from 'rollup-plugin-includepaths';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
import riot from 'rollup-plugin-riot';
import * as path from 'path';

let includePathOptions = {
    include: {},
    paths: ['src'],
    external: [ 'riot', 'riot-forms' ],
    extensions: ['.js', '.tag']
};

export default {
  entry: 'src/riot-forms-basic-controls.js',
  dest: 'build/riot-forms-basic-controls.js',
  format: 'iife',  
  moduleName: 'RiotFormsBasicControls',
  banner: '/* Basic Controls for Riot Forms, @license MIT */',
  globals: {
    "riot": "riot",
    "riot-forms": "RiotForms"
  },
  plugins: [
    includePaths(includePathOptions),
    riot({
      style: 'cssnext',
      parsers: {
        css: { cssnext }
      }
    }),    
    nodeResolve({ 
      jsnext: true, 
      main: true 
    }),
    commonjs({
      include: 'node_modules/**',
      ignoreGlobal: true
    }),
    buble()
  ]
}

/**
 * Transforms new CSS specs into more compatible CSS
 */
function cssnext (tagName, css) {
  // A small hack: it passes :scope as :root to PostCSS.
  // This make it easy to use css variables inside tags.
  css = css.replace(/:scope/g, ':root')
  css = postcss([postcssCssnext]).process(css).css
  css = css.replace(/:root/g, ':scope')
  return css
}