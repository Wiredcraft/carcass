---
weight: 20
id: proto-register
title: proto.register
template: doc.jade
---

It can be accessed with `carcass.proto.register`. It is an object:

```js
{
    register: function() {},
    extend: function() {}
}
```

It can be merged to any object with `mixin()` or equivalent.

The `register()` function is used to read a dir and map the files to `this`.

For example, say we have a files directory (same as what we have in the test):

```
[dirname]/files/
- lorem.js
- ipsum/
    - package.json
    - ipsum.js
- dolor/
    - index.js
```

We can map the file structure to an object:

```js
var obj = carcass.mixable();
obj.mixin(carcass.proto.register);
obj.register('[dirname]', 'files');
// Now we have:
obj.files.lorem === require('path/to/lorem')
obj.files.ipsum === require('path/to/ipsum')
obj.files.dolor === require('path/to/dolor')
```

The `extend()` function is just an helper, used to copy things from another object to `this`.

For example, when we have an object as above, we can merge part of it to another one:

```js
var another = carcass.mixable();
another.mixin(carcass.proto.register);
another.extend(obj, 'files');
// Now we have:
another.files.lorem === require('path/to/lorem')
another.files.ipsum === require('path/to/ipsum')
another.files.dolor === require('path/to/dolor')
```
