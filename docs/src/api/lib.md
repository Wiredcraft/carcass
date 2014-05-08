---
weight: 0
id: lib
title: 3rd-party libraries
template: doc.jade
---

* __carcass.highland__: [Highland](https://github.com/caolan/highland), a high-level streams library.
* __carcass.postal__: [Postal.js](https://github.com/postaljs/postal.js), an in-memory message bus.
* __[ES6 Shim](https://github.com/paulmillr/es6-shim)__: Provides compatibility shims so that legacy JavaScript engines behave as closely as possible to ECMAScript 6 (Harmony).
    - Note that it is auto-loaded with Carcass (when you do `require('carcass')`).
* __[ES5 extensions](https://github.com/medikoo/es5-ext)__: A lot of useful tools; integrated with Carcass as `Carcass.prototype.mixin(require('es5-ext'))` so it's a one to one map, e.g. `carcass.global == require('es5-ext').global`.
