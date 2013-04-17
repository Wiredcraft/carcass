
0.4.0 (Proto) / 2013-04-17 
==================

  * Rebuilt mixable() with proto/mixin.
  * Added proto/stack.
  * Added proto/mixin.
  * Building things into lib/proto.
  * Building promise flow - not ready.
  * Rebuilt utils.machineName() with promise.

0.3.2 / 2013-03-11 
==================

  * Added a test case for carcass.httpError().
  * Expose Express as carcass.express.

0.3.1 / 2013-02-25 
==================

  * Updated package keywords and url.
  * Added carcass.httpError().

0.3.0 (Promise) / 2013-02-18 
==================

  * Core: added deferred to carcass core; also exposed a promise with carcass itself as the resolve value.
  * Core: moved mixable() to plugins.
  * Core: moved register() to a lib.
  * Added Deferred 0.6.1.
  * Upgraded: Express 3.1.0; Underscore 1.4.4.
  * Adding a few examples; not ready.

0.2.2 / 2013-01-15 
==================

  * Improved storage: given a cache key, also cache without an id.
  * Improved stash: only require mkdirp when needed.
  * Improved stash debug output. Fixed stash test: do a cleanup.
  * Fixed storage: do not merge id; mixin options.
  * Added cors example and credential support to applications/cors.

0.2.1 / 2013-01-10 
==================

  * Improved storages: memory doesn't need "_id"; stash uses "_id" as the filename; display error with "noop()".

0.2.0 (Model) / 2013-01-09 
==================

  * Added 2 factory: "Model" and "Storage".
  * Added 2 storage: "memory" and "stash".
  * Removed the old model constructor.
  * Added a simple test with an implemented model.
  * Updated Express to 3.0.6.
  * Improved comments for Express factory.
  * Improved event emitter use case.
  * Reorganized mixable tests.
  * Improved mixin(): only merge enumerable properties for now, and removed "black lists".

0.1.1 / 2012-12-26 
==================

  * Improved tests.
  * Optimized applications: cache functions.
  * Improved express factory: also support only an initialize function as the argument.
  * Changed applications syntax to have arguments more than only an initialize function.
  * Update Express.

0.1.0 / 2012-12-19 
==================

  * Improved configurable: ability to load config files.
  * Completely rebuilt constructors/Application and it's now factories/Express.
  * Removed the old constructors/Application.
  * Improved: default options for configurable.
  * Improved core: default obj and target; removed target.mixable.
  * Added a simple util - carcass.utils.machineName() - to generate "machine names".
  * mount() can pass options to plugins now.
  * Added namespace to plugin title.
  * Added a getApplication() method to Server.
  * Improved debug info for mixin().
  * Reorganizing tests.

0.0.3 / 2012-12-13 
==================

  * Added a default OPTIONS handler for Cors.
  * Fixed: bind() breaks apply().
  * Refactored mount().
  * Disabled mountAll(); no simple way to handle dependencies etc.
  * Made mixin() safer and replace _.extend() with it.
  * Removed target.plugin(). I don't have factories anymore, plus it's a too common name.
  * Simplified carcass.plugins.extendable() so it can be used directly.
  * Simplified carcass.plugins.configurable() so it can be used directly.
  * Removed event emitter plugin - too simple to be a plugin.
  * Added 2 demo applications: Restify and Cors.
  * Carcass.mixable() returns the target now, so it can be also used to build an object.

0.0.2 / 2012-12-10 
==================

  * Added plugin: configurable.
  * Added plugin: event emitter.
  * Added: a common mixin method.
  * Renamed: mixin() -> plugin().
  * Removed: mixinPlugin().

0.0.1 / 2012-12-06 
==================

  * Initial commit
