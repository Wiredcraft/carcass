---
weight: 20
id: mixin
title: Mixin
template: api.jade
---

"Mixin" is the major way we do code sharing. It simply merges the attributes from one object to another. For convenient, we prepare the origin objects as "proto"s with each a single purpose and "mixin" them together so we got a full functional object or class. For example we have `carcass.register` because we do

```js
carcass.mixin(require('path/to/register'));
```
