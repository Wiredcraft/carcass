# Carcass

A toolbox for [Node.js](http://nodejs.org/).

__Caution__: Everything will be reviewed before 1.0 release. That means nothing is stable at this point. We will have stability indications like [Node.js does](http://nodejs.org/api/documentation.html#documentation_stability_index).

## Why

## How to use

* `var carcass = require('carcass');`
* For detailed usage, please see the tests.

## What's inside

### Root level tools

Can be accessed as `carcass.xxx`.

* 3rd-party libraries.
    * __carcass.highland__: [Highland](https://github.com/caolan/highland), a high-level streams library.
    * __carcass.postal__: [Postal.js](https://github.com/postaljs/postal.js), an in-memory message bus.
    * __[ES6 Shim](https://github.com/paulmillr/es6-shim)__: Provides compatibility shims so that legacy JavaScript engines behave as closely as possible to ECMAScript 6 (Harmony). Note that it is auto-loaded with Carcass (when you do `require('carcass')`).

* My tools.
    * __carcass.register__: It can be used to register a new tool or a new directory to carcass. For example

        ```js
        carcass.register('dirname/of/the_directory', 'the_directory');
        // now you have
        carcass.the_directory.a_file_basename === whatever_the_file_exports
        carcass.the_directory.another_file === that_file_exports
        // plus everything in the sub-directories
        carcass.the_directory.sub_directory.xxx
        ```

    * __carcass.mixin__: "Mixin" is the major way we do code sharing. It simply merges the attributes from one object to another. For convenient, we prepare the origin objects as "proto"s with each a single purpose and "mixin" them together so we got a full functional object or class. For example we have `carcass.register` because we do

        ```js
        carcass.mixin(require('path/to/register'));
        ```

    * __carcass.mixable__: Want to register or mixin tools to something other than `carcass` itself? You can do it with `mixable`. For example say you have an object `myObject`

        ```js
        carcass.mixable(myObject);
        myObject.mixin(carcass.proto.register);
        myObject.register(...);
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

### "Proto"s

### Classes

### Helpers

### Examples

## Roadmap

* Build "errors".
* Build "log".
* Rebuild examples.

## Summary

Output of `git summary`. See [Git Extras](https://github.com/visionmedia/git-extras).

```
project  : carcass (0.10.0)
repo age : 1 year, 4 months
active   : 133 days
commits  : 295
files    : 63
authors  :
  276  Makara Wang             93.6%
    9  Zhou Honglin            3.1%
    8  xeodou                  2.7%
    2  Vincent Viallet         0.7%
```

## License

__[WTFPL](http://en.wikipedia.org/wiki/WTFPL)__
