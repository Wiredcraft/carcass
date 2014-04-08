---
weight: 0
id: carcass.mixable
title: carcass.mixable()
template: api.jade
---

`carcass.mixable()` is used to make any given object "mixable", by simply attaching a [mixin()](#helpers.mixin) to it. For example

```js
var obj = {};
carcass.mixable(obj);
obj.mixin(carcass.proto.register);
obj.register(...);
```

It also makes the `prototype` of an object "mixable". For example

```js
carcass.mixable(MyClass);
MyClass.prototype.mixin(carcass.proto.register);
// either
MyClass.prototype.register(...);
// or
var myInstance = new MyClass();
myInstance.register(...);
```

It returns an object if no argument is provided.
