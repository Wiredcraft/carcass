var debug = require('debug')('carcass:benchmark');

var carcass = require('..');
var Benchmark = require('benchmark');

var mixin = carcass.helpers.mixin;

var mixinA = require('./baselines/mixin-a');
var mixinB = require('./baselines/mixin-b');
var mixinC = require('./baselines/mixin-c');

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
        suite.add('using Object.assign() from es6-shim.', function() {
            var obj = {
                something: 'Lorem ipsum dolor sit amet'
            };
            Object.assign(obj, lorem);
            Object.assign(obj, ipsum);
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
        suite.add('using mixin c from my baselines.', function() {
            var obj = {
                something: 'Lorem ipsum dolor sit amet',
                mixin: mixinC
            };
            obj.mixin(lorem).mixin(ipsum);
        });
        suite.on('start', function() {
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
