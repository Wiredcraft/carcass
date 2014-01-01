# Carcass

A toolbox for [Node.js](http://nodejs.org/), includes [Deferred](https://github.com/medikoo/deferred), [Postal.js](https://github.com/postaljs/postal.js), and a lot more.

__Caution__: Everything will be reviewed before 1.0 release. That means nothing is stable at this point. We will have stability indications like [Node.js does](http://nodejs.org/api/documentation.html#documentation_stability_index).

## Why

## How to use

* `var carcass = require('carcass');`
* For detailed usage, please see the tests.

## What's inside

### Root level tools

Can be accessed as `carcass.xxx`.

* 3rd-party libraries.
    * __carcass.deferred__: [Deferred](https://github.com/medikoo/deferred), a promise implementation.
    * __carcass.postal__: [Postal.js](https://github.com/postaljs/postal.js), an in-memory message bus.

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

...

### Classes

### Helpers

### Examples

...

## Roadmap

* Build "server" and "program".
* Build "errors".
* Build "log".
* Rebuild examples.
* Review applications.

## Summary

Output of `git summary`. See [Git Extras](https://github.com/visionmedia/git-extras).

```
project  : carcass (0.5.0)
repo age : 1 year, 1 month
active   : 116 days
commits  : 260
files    : 48
authors  :
  241  Makara Wang             92.7%
    9  Zhou Honglin            3.5%
    8  xeodou                  3.1%
    2  Vincent Viallet         0.8%
```

## License

__[WTFPL](http://en.wikipedia.org/wiki/WTFPL)__
