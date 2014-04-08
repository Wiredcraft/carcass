---
weight: 20
id: proto.register
title: proto.register
template: api.jade
---

It can be accessed with `carcass.proto.register`. It is an object:

```js
{
    register: register
}
```

It can be merged to any object with `mixin()` or equivalent. It is used to read a dir and map the files to an object.

For example

```js
var obj = carcass.mixable();
obj.mixin(carcass.proto.register);
obj.register('dirname/of/the_dir', 'the_dir');
// now you have
obj.the_dir.basename_of_a_file === whatever_the_file_exports
obj.the_dir.another_file === that_file_exports
// plus everything in the sub-directories
obj.the_dir.sub_dir.xxx
```
