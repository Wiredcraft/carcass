---
weight: 10
id: helpers.mixin
title: helpers.mixin
template: api.jade
---

"Mixin" is the major way we do code sharing. It simply merges the attributes from a given object to `this`. Because it uses `this` it needs to be attached to an object first. For example

```js
var obj = {};
obj.mixin = carcass.helpers.mixin;
obj.mixin({
    lorem: true
});
// obj now has lorem equal to true.
```

Because we use mixin all the time, we also have a [mixable()](#carcass.mixable).
