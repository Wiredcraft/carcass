var debug = require('debug')('carcass:proto:mixin');

var carcass = require('..');
var Benchmark = require('benchmark');

var mixin = carcass.proto.mixin;
var extend = require('es5-ext/lib/Object/extend-properties');

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
describe.skip('Proto / Mixin:', function() {

    it('benchmarking the speed of mixin.', function(done) {
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
        suite.add('using extend-properties.', function() {
            var obj = {
                something: 'Lorem ipsum dolor sit amet'
            };
            extend(obj, lorem, ipsum);
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
