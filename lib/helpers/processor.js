var invoke, isFunction, isObject, isString, _;

_ = require('highland');

invoke = require('es5-ext/lib/Function/invoke');

isString = require('es5-ext/lib/String/is-string');

isObject = require('es5-ext/lib/Object/is-object');

isFunction = require('es5-ext/lib/Function/is-function');


/**
 * Builds a processor, which can be used to process a series of tasks, with the
 *   highland `flatMap()` function.
 *
 * @param {Object} context the `this` value when the tasks are invoked; can be
 *   null; can be overridden by the individual tasks.
 *
 * @return {Function} a processor
 */

module.exports = function(context) {

  /**
   * A task is defined with a handler, a set of arguments, and a context. Only
   *   the handler is required so the task can be just a function or a
   *   function name.
   *
   * @return {Object} a stream
   */
  return function(tasks) {
    var self;
    self = context != null ? context : this;
    return _(tasks).flatMap(function(task) {
      var args, _invoke, _ref;
      if (isString(task)) {
        if (self[task] != null) {
          return self[task]();
        }
        return;
      }
      if (isFunction(task)) {
        return task.call(self);
      }
      if (isObject(task)) {
        if (task.handler == null) {
          return;
        }
        args = [task.handler];
        if (task.args != null) {
          args = args.concat(task.args);
        }
        _invoke = task.callback ? _.wrapInvoke.apply(_, args) : invoke.apply(null, args);
        return _invoke((_ref = task.context) != null ? _ref : self);
      }
    }).compact();
  };
};
