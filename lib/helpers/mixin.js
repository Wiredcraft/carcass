var defineProp, descriptor, mixin, properties;

descriptor = Object.getOwnPropertyDescriptor;

properties = Object.getOwnPropertyNames;

defineProp = Object.defineProperty;


/**
 * The common mixin, simply merges properties, by redefining the same properties
 *   from the source.
 *
 * @param {Object} source
 * @param {Object|null} options
 *
 * @return {this}
 */

module.exports = mixin = function(source, options) {
  properties(source).reduce(function(target, key) {
    if (!source.propertyIsEnumerable(key)) {
      return target;
    }
    return defineProp(target, key, descriptor(source, key));
  }, this);
  return this;
};
