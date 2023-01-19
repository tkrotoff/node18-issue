# node18-local-path-traversal-issue

https://github.com/nodejs/node/issues/46270

package.json local path traversal working with Node 19, not with Node < 19

Structure:

- index.js
- subfolder
  - index.js
  - package.json references parent folder package ([local path](https://docs.npmjs.com/cli/v9/configuring-npm/package-json?v=true#local-paths)) with `"node18-local-path-traversal-issue": "file:.."`
  - webpack.config.js

With Node.js 19, webpack + @babel/preset-env `useBuiltIns: 'usage'` browses the parent folder correctly

With Node.js < 19, webpack + @babel/preset-env `useBuiltIns: 'usage'` fails to browse parent folder correctly

<br>
<br>

Output with Node.js 19.4.0 (OK):

```
Run cd subfolder && npm install && npm run build

added 274 packages, and audited 275 packages in 11s

22 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

> subfolder@1.0.0 build
> webpack --mode=development

@babel/preset-env: `DEBUG` option

Using targets:
{
  "android": "108",
  "chrome": "107",
  "edge": "107",
  "firefox": "102",
  "ios": "14.5",
  "opera": "91",
  "safari": "15.6",
  "samsung": "18"
}

Using modules transform: auto

Using plugins:
  proposal-class-static-block { ios, safari }
  proposal-private-property-in-object { ios < 15 }
  proposal-class-properties { ios < 15 }
  proposal-private-methods { ios < 15 }
  syntax-numeric-separator
  syntax-nullish-coalescing-operator
  syntax-optional-chaining
  syntax-json-strings
  syntax-optional-catch-binding
  transform-parameters { ios, safari }
  syntax-async-generators
  syntax-object-rest-spread
  proposal-export-namespace-from { ios, safari }
  syntax-dynamic-import
  syntax-top-level-await
corejs3: `DEBUG` option

Using targets: {
  "android": "108",
  "chrome": "107",
  "edge": "107",
  "firefox": "102",
  "ios": "14.5",
  "opera": "91",
  "safari": "15.6",
  "samsung": "18"
}

Using polyfills with `usage-global` method:

[/home/runner/work/node18-local-path-traversal-issue/node18-local-path-traversal-issue/subfolder/index.js]
Based on your code and targets, the corejs3 polyfill did not add any polyfill.

[/home/runner/work/node18-local-path-traversal-issue/node18-local-path-traversal-issue/subfolder/node_modules/node18-local-path-traversal-issue/index.js]
The corejs3 polyfill added the following polyfills:
  es.error.cause { "ios":"14.5" }
asset main.js 178 KiB [emitted] (name: main)
runtime modules 221 bytes 1 module
modules by path ./node_modules/core-js/internals/*.js 43.7 KiB
  ./node_modules/core-js/internals/export.js 2.61 KiB [built] [code generated]
  ./node_modules/core-js/internals/global.js 590 bytes [built] [code generated]
  ./node_modules/core-js/internals/function-apply.js 387 bytes [built] [code generated]
  ./node_modules/core-js/internals/wrap-error-constructor-with-cause.js 2.9 KiB [built] [code generated]
  ./node_modules/core-js/internals/object-get-own-property-descriptor.js 1.1 KiB [built] [code generated]
  ./node_modules/core-js/internals/descriptors.js 308 bytes [built] [code generated]
  ./node_modules/core-js/internals/function-bind-native.js 337 bytes [built] [code generated]
  ./node_modules/core-js/internals/get-built-in.js 358 bytes [built] [code generated]
  ./node_modules/core-js/internals/object-is-prototype-of.js 114 bytes [built] [code generated]
  + 71 modules
./index.js 83 bytes [built] [code generated]
./node_modules/node18-local-path-traversal-issue/index.js 179 bytes [built] [code generated]
./node_modules/core-js/modules/es.error.cause.js 2.51 KiB [built] [code generated]
webpack 5.75.0 compiled successfully in 779 ms
```

Output with Node.js 18.13.0 (KO):

```
Run cd subfolder && npm install && npm run build

added 274 packages, and audited 276 packages in 8s

22 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

> subfolder@1.0.0 build
> webpack --mode=development

@babel/preset-env: `DEBUG` option

Using targets:
{
  "android": "108",
  "chrome": "107",
  "edge": "107",
  "firefox": "102",
  "ios": "14.5",
  "opera": "91",
  "safari": "15.6",
  "samsung": "18"
}

Using modules transform: auto

Using plugins:
  proposal-class-static-block { ios, safari }
  proposal-private-property-in-object { ios < 15 }
  proposal-class-properties { ios < 15 }
  proposal-private-methods { ios < 15 }
  syntax-numeric-separator
  syntax-nullish-coalescing-operator
  syntax-optional-chaining
  syntax-json-strings
  syntax-optional-catch-binding
  transform-parameters { ios, safari }
  syntax-async-generators
  syntax-object-rest-spread
  proposal-export-namespace-from { ios, safari }
  syntax-dynamic-import
  syntax-top-level-await
corejs3: `DEBUG` option

Using targets: {
  "android": "108",
  "chrome": "107",
  "edge": "107",
  "firefox": "102",
  "ios": "14.5",
  "opera": "91",
  "safari": "15.6",
  "samsung": "18"
}

Using polyfills with `usage-global` method:

[/home/runner/work/node18-local-path-traversal-issue/node18-local-path-traversal-issue/subfolder/index.js]
Based on your code and targets, the corejs3 polyfill did not add any polyfill.

[/home/runner/work/node18-local-path-traversal-issue/node18-local-path-traversal-issue/index.js]
The corejs3 polyfill added the following polyfills:
  es.error.cause { "ios":"14.5" }
asset main.js 4.06 KiB [emitted] (name: main)
./index.js 83 bytes [built] [code generated]
../index.js 179 bytes [built] [code generated]

ERROR in ../index.js 1:0-44
Module not found: Error: Can't resolve 'core-js/modules/es.error.cause.js' in '/home/runner/work/node18-local-path-traversal-issue/node18-local-path-traversal-issue'
resolve 'core-js/modules/es.error.cause.js' in '/home/runner/work/node18-local-path-traversal-issue/node18-local-path-traversal-issue'
  Parsed request is a module
  using description file: /home/runner/work/node18-local-path-traversal-issue/node18-local-path-traversal-issue/package.json (relative path: .)
    Field 'browser' doesn't contain a valid alias configuration
    resolve as module
      /home/runner/work/node18-local-path-traversal-issue/node18-local-path-traversal-issue/node_modules doesn't exist or is not a directory
      /home/runner/work/node18-local-path-traversal-issue/node_modules doesn't exist or is not a directory
      /home/runner/work/node_modules doesn't exist or is not a directory
      /home/runner/node_modules doesn't exist or is not a directory
      /home/node_modules doesn't exist or is not a directory
      /node_modules doesn't exist or is not a directory
 @ ./index.js 1:16-60

webpack 5.75.0 compiled with 1 error in 660 ms
Error: Process completed with exit code 1.
```