var defineProp, descriptor, mixin, properties;

descriptor = Object.getOwnPropertyDescriptor;

properties = Object.getOwnPropertyNames;

defineProp = Object.defineProperty;


/**
 * The common mixin, simply merges properties, by redefining the same properties
 *   from the source.
 *
 * @param {Object} source
 *
 * @return {this}
 */

module.exports = mixin = function(source) {
  var key, _i, _len, _ref;
  _ref = properties(source);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    key = _ref[_i];
    if (source.propertyIsEnumerable(key)) {
      defineProp(this, key, descriptor(source, key));
    }
  }
  return this;
};
