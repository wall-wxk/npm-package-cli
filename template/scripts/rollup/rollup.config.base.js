import json from 'rollup-plugin-json';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {eslint} from 'rollup-plugin-eslint';

export default {
    input: 'src/main.ts',
    plugins: [
        resolve(),
        json(),
        alias({
            resolve: ['.js', '.ts']
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            babelrc: false,
            comments: false,
            presets: [
                ["@babel/preset-env", {
                    "modules": false,
                    "useBuiltIns": false
                }],
                ["@babel/preset-typescript"]
              ],
            plugins: [
                "@babel/plugin-transform-runtime"
                ]
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        eslint({
            include: ['src/**/*.js', 'src/**/*.ts']
        })
    ]
  };