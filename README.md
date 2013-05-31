# Carcass

A toolbox for [Node.js](http://nodejs.org/), includes [Express.js](http://expressjs.com/), [Deferred](https://github.com/medikoo/deferred), and a lot more.

**Caution**: Everything will be reviewed before 1.0 release. That means nothing is stable at this point. We will have stability indications like [Node.js does](http://nodejs.org/api/documentation.html#documentation_stability_index).

## Why

## How to use

`var carcass = require('carcass');`

## What's inside

### Root level tools

Can be accessed as `carcass.xxx`.

* 3rd-party libraries.
    * **`carcass.deferred`**: [deferred](https://github.com/medikoo/deferred), a promise implementation.
    * **`carcass.postal`**: [postal.js](https://github.com/postaljs/postal.js), an in-memory message bus.
* My tools.
    * **`carcass.mixin`**: ...
    * **`carcass.mixable`**: ...
    * **`carcass.register`**: ...

### "Proto"s

...

## Roadmap

* Rebuild `lib/model` as `proto/model` and drop the storage part.
* Rebuild (or probably drop) `constructors`, `servers`, `storages`, `factories`, `applications`.
* Review `examples`, `plugins`, `utils`.
* Remove some package dependencies; only require as needed.

## Summary

Output of `git summary`. See [Git Extras](https://github.com/visionmedia/git-extras).

```
project  : carcass (0.4.4)
repo age : 5 months ago
commits  : 169
active   : 75 days
files    : 83
authors  :
  150	Makara Wang             88.8%
    9	Zhou Honglin            5.3%
    8	xeodou                  4.7%
    2	Vincent Viallet         1.2%
```

## License

**[WTFPL](http://en.wikipedia.org/wiki/WTFPL)**
