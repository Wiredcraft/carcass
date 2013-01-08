var debug = require('debug')('carcass:Factory:Model');

var carcass = require('carcass');
var _ = require('underscore');

// .
var createModel = require('../lib/model');

// Model
// ---
// Abstract factory; returns a concrete factory.

// Actually returns the class which is also a builder.
module.exports = function(args) {
    debug('building');

    args = args || {};

    // .
    var Model = createModel(args.title || _.uniqueId('model_'));

    // Add attributes to the constructor.
    _.each(args.attributes || args.attrs || null, function(attr, key) {
        Model.attr(key, attr);
    });

    // Mixin.
    Model.mixin(_.omit(args, 'prototype', 'attributes', 'attrs'));

    // TODO: a way to mixin prototype?

    return Model;
};
