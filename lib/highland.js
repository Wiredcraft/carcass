var StreamError, global, invoke, _,
  __slice = [].slice;

module.exports = _ = require('highland');

global = require('es5-ext/global');

invoke = require('es5-ext/function/invoke');


/**
 * A wrap of es5-ext's invoke().
 *
 * Similar to _.wrapCallback(f) with the difference that this can be used to
 *   invoke the function with a context (`this` in the function).
 *
 * This has a same syntax with invoke(); you invoke a function (1) with the
 *   syntax of (2) and it will return a stream.
 *
 *   (1): `func(args..., callback)`
 *
 *   (2): `_.wrapInvoke('func_name', args_without_the_callback...)(context)`
 *
 * This can be used when you need to put the result of a typical callback-style
 *   function to a stream, and you also need to invoke the function with a
 *   context.
 *
 * @return {Function} the wrapped function
 */

_.wrapInvoke = function() {
  var args;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];

  /**
   * @return {Stream} will yield the result when the callback is invoked
   */
  return function(context) {
    return _(function(push) {
      args.push(function(err, res) {
        if (err) {
          push(err);
        } else {
          push(null, res);
        }
        return push(null, _.nil);
      });
      return invoke.apply(null, args)(context != null ? context : global);
    });
  };
};


/**
 * Helper.
 *
 * Pipes a source (can be a stream or anything highland accepts) through one or
 *   several through streams. Also writes errors to the output.
 *
 * @return {Stream} the output stream
 */

_.pipeThrough = function() {
  var onError, output, source, streams, through, _i, _len;
  source = arguments[0], streams = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  onError = function(err) {
    return output.write(new StreamError(err));
  };
  output = _();
  source = _(source).on('error', onError);
  for (_i = 0, _len = streams.length; _i < _len; _i++) {
    through = streams[_i];
    source = source.pipe(through.on('error', onError));
  }
  return source.pipe(output);
};


/**
 * Copied from highland; until it's exported.
 */

StreamError = (function() {
  function StreamError(err) {
    this.__HighlandStreamError__ = true;
    this.error = err;
  }

  return StreamError;

})();
