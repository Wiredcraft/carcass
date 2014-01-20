var debug = require('debug')('carcass:benchmark');

var carcass = require('..');
var Benchmark = require('benchmark');

var mixin = carcass.helpers.mixin;
var extend = require('es5-ext/lib/Object/extend-properties');

var mixinA = require('./baselines/mixin-a');
var mixinB = require('./baselines/mixin-b');

var lorem = {
    lorem: function() {
        return 'lorem';
    }
};
var ipsum = {
    ipsum: function() {},
    dolor: function() {}
};

// Benchmark
// ---
describe('Proto / mixin:', function() {

    it('benchmarking the speed of mixin.', function(done) {
        Benchmark.options.maxTime = 1;
        var suite = Benchmark.Suite();
        suite.add('using mixin.', function() {
            var obj = {
                something: 'Lorem ipsum dolor sit amet',
                mixin: mixin
            };
            obj.mixin(lorem).mixin(ipsum);
        });
        suite.add('using mixable.', function() {
            var obj = carcass.mixable({
                something: 'Lorem ipsum dolor sit amet'
            });
            obj.mixin(lorem).mixin(ipsum);
        });
        suite.add('using extend-properties from es5-ext.', function() {
            var obj = {
                something: 'Lorem ipsum dolor sit amet'
            };
            extend(obj, lorem, ipsum);
        });
        suite.add('using mixin from es6-shim.', function() {
            var obj = {
                something: 'Lorem ipsum dolor sit amet'
            };
            Object.mixin(obj, lorem);
            Object.mixin(obj, ipsum);
        });
        suite.add('using mixin a from my baselines.', function() {
            var obj = {
                something: 'Lorem ipsum dolor sit amet',
                mixin: mixinA
            };
            obj.mixin(lorem).mixin(ipsum);
        });
        suite.add('using mixin b from my baselines.', function() {
            var obj = {
                something: 'Lorem ipsum dolor sit amet',
                mixin: mixinB
            };
            obj.mixin(lorem).mixin(ipsum);
        });
        suite.on('start', function(event) {
            debug('started');
        }).on('cycle', function(event) {
            debug(String(event.target));
        }).on('complete', function() {
            done();
        }).run({
            'async': true
        });
    });
});
