
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
