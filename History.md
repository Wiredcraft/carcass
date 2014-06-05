
0.11.4 / 2014-06-05
==================

 * Updated packages. Now use precise versions for dependencies.

0.11.3 / 2014-05-30
==================

 * Updated to postal 0.10.
 * Updated highland to 1.25.4; flatMap() is not that useful now.

0.11.2 / 2014-05-26
==================

 * Updated npm modules: es6-shim 0.11, highland 1.25, postal 0.9.

0.11.1 / 2014-05-08
==================

 * Added highland.pipeThrough(); easier to pipe around.
 * Improved accessor; possible to have only a function as the options.

0.11.0 / 2014-04-23
==================

 * Added extend() to proto/register.
 * API change: register now uses require.resolve() and supports everything that can be loaded with require(); also removed registerOptions.
 * Rebuilt proto/register with coffee.
 * Changed license to MIT.
 * API change: updated to es5-ext 0.10 which changed a lot; see https://github.com/medikoo/es5-ext/blob/master/CHANGES.
 * Revamped ignore files.
 * Moved to Wiredcraft.
 * Removed applications.

0.10.1 / 2014-03-24
==================

 * Removed unnecessary dependencies.

0.10.0 (Processor) / 2014-03-24
==================

 * Added helpers/processor (and classes/Processor as a simple implement).
 * Integrated highland-array.
 * Added _.wrapInvoke as an extension to highland.
 * Changed classes to be more coffee style.
 * Removed things about config; refactored to carcass-config.

0.9.0 (Coffee) / 2014-03-17
==================

 * API change: renamed Config#stack to Config#source.
 * Rebuilt proto/id, proto/uid, proto/loader with coffee.
 * Rebuilt root level libs with coffee.
 * Removed deferred module, cause Promise is in es6-shim and will be in ES6.
 * API change: rebuilt proto/stack as helpers/stacker based on helpers/accessor.
 * Rebuilt classes with coffee.
 * Moved coffee files from src/lib to src.
 * Rebuilt helpers with coffee. Removed helpers/extend.
 * Replaced Grunt and Make with Gulp.

0.8.0 (Highland) / 2014-02-24
==================

 * Updated es6-shim. Updated eson. Removed underscore. Added highland.
 * Exported es5-ext with Carcass.

0.7.0 (ES6) / 2014-01-21
==================

 * API change: changed proto.configManager#esonPlugins() to an accessor.
 * Improved proto.uid: generate an id if given a null or undefined.
 * Rebuilt mixin() with reduce() (same with es6-shim).
 * Added es6-shim.
 * Updated to should 2.x.

0.6.0 (Config) / 2014-01-01
==================

 * Added proto.configConsumer.
 * Rebuilt Carcass itself as a class and export a global instance.
 * Added proto.configManager.
 * Rebuilt proto.uid with helpers.accessor().
 * Rebuilt proto.id with helpers.accessor().
 * Updated readme and description.

0.5.0 (Rebirth) / 2013-12-22
==================

 * API change: renamed proto/stack.use() to proto/stack.stack() and rebuilt it as an accessor.
 * Removed plugins.
 * Rebuilt lib/tools to lib/classes (loader and config).
 * Renamed loaderSync to loader; rebuilt it with accessor; removed get() from it.
 * Updated jshintrc and pass it.
 * Added helpers/accessor.
 * Cleaned some styles, comments; removed promise flow (never enabled);
 * Rebuilt applications; to be tested.
 * Removed servers; to be rebuilt.
 * Moved Express to optional dependencies.
 * Removed utils.
 * Removed factories.
 * Removed constructors.
 * Switched to uid2.
 * Removed lib/model.
 * Removed model factory.
 * Removed storage factory.
 * Removed memory storage.
 * Removed stash storage.
 * Cleaned out some empty files.
 * Moved the default loader class from inside tools.config to tools.loader.
 * Rebuilt tools.config with prototype, so it returns an object, not anymore a function.
 * Added helpers/extend which is very similar to Backbone's extend helper.
 * Moved proto/mixin to helpers/mixin.
 * Cleaned up examples; to be rebuilt.

0.4.5 / 2013-06-16
==================

  * Eson is optional now.
  * Deferred 0.6.5. Express 3.2.6.
  * Satisfy jshint.
  * Added grunt and jshint.
  * Updating readme.
  * Added a config loader `carcass.tools.config` (lib/tools/config.js).
  * Added plugins/stackable as a simple wrap to proto/stack.
  * Rebuilt plugins/configurable to be a simple wrap to the configurable library.

0.4.4 / 2013-05-19
==================

  * Added proto/channel.
  * Added carcass.postal.

0.4.3 / 2013-05-11
==================

  * Fixed proto/loaderSync didn't work without cache, and removed isCallable check to improve performance.

0.4.2 / 2013-05-07
==================

  * Rebuilt carcass.register to proto/register.
  * Requires request 2.20.

0.4.1 / 2013-04-24
==================

  * Fixed CORS test; HEAD returns an empty body.
  * Added a benchmark for using loaderSync in different ways.
  * Added a benchmark for mixin.
  * Mixable: shouldn't bind when we don't need to.
  * Added a new proto: a synchronous loader.
  * Updated Express to 3.2.0.
  * Added benchmark to devDependencies.
  * Rebuilding register into proto.
  * Carcass itself is also mixable now.
  * Moved mixable again - it's a core library.
  * Proto/stack: removed shared stack; doesn't make sense to share it.
  * Redefining scope. Rewriting readme.

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
