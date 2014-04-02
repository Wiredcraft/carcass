---
weight: 10
id: register
title: Register
template: api.jade
---
It can be used to register a new tool or a new directory to carcass. For example

```js
carcass.register('dirname/of/the_directory', 'the_directory');
// now you have
carcass.the_directory.a_file_basename === whatever_the_file_exports
carcass.the_directory.another_file === that_file_exports
// plus everything in the sub-directories
carcass.the_directory.sub_directory.xxx
```
