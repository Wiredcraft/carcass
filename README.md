# Carcass

A toolbox for [Node.js](http://nodejs.org/), includes [Deferred](https://github.com/medikoo/deferred), [Postal.js](https://github.com/postaljs/postal.js), and a lot more.

**Caution**: Everything will be reviewed before 1.0 release. That means nothing is stable at this point. We will have stability indications like [Node.js does](http://nodejs.org/api/documentation.html#documentation_stability_index).

## Why

## How to use

* `var carcass = require('carcass');`
* For detailed usage, please see the tests.

## What's inside

### Root level tools

Can be accessed as `carcass.xxx`.

* 3rd-party libraries.
    * **`carcass.deferred`**: [Deferred](https://github.com/medikoo/deferred), a promise implementation.
    * **`carcass.postal`**: [Postal.js](https://github.com/postaljs/postal.js), an in-memory message bus.

* My tools.
    * **`carcass.register`**: It can be used to register a new tool or a new directory to carcass, e.g. `carcass.register(__dirname, 'the_directory')`, then the files inside the directory can be accessed as `carcass.the_directory.xxx`, plus the sub-directories can be also accessed, like `carcass.the_directory.sub_directory.xxx`. The files are not loaded until accessed.

    * **`carcass.mixin`**: "Mixin" is the major way we do code sharing. It simply merges the attributes from one object to another. For convenient, we prepare the origin objects as "proto"s with each a single purpose and "mixin" them together so we got a full functional object or class. For example we have `carcass.register` because we do

        ```js
        carcass.mixin(require('path/to/register'));
        ```

    * **`carcass.mixable`**: Want to register or mixin tools to something other than `carcass` itself? You can do it with `mixable`. For example say you have an object `myObject`

        ```js
        carcass.mixable(myObject);
        myObject.mixin(carcass.proto.register);
        myObject.register(...);
        ```

        It also makes the `prototype` of an object "mixable". For example

        ```js
        carcass.mixable(myClass);
        myClass.prototype.mixin(carcass.proto.register);
        // either
        myClass.prototype.register(...);
        // or
        var myInstance = new myClass();
        myInstance.register(...);
        ```

### "Proto"s

...

### Examples

...

## Roadmap

* Build "config".
* Build "errors".
* Build "log".
* Rebuild examples.
* Build a Carcass class.
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

**[WTFPL](http://en.wikipedia.org/wiki/WTFPL)**
