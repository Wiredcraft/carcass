var debug = require('debug')('carcass:proto:loaderSync');

var carcass = require('..');
var Benchmark = require('benchmark');

var loaderSync = carcass.proto.loaderSync;
var mixin = carcass.proto.mixin;

function LoaderA(_source) {
    function loader() {
        return loader.get();
    }
    loader.mixin = mixin;
    loader.mixin(loaderSync);
    loader.source(_source);
    return loader;
}

function LoaderB(_source) {
    var loader = {};
    loader.mixin = mixin;
    loader.mixin(loaderSync);
    loader.source(_source);
    return loader;
}

function LoaderC(_source) {
    if (!(this instanceof LoaderC)) return new LoaderC(_source);
    this.source(_source);
}
LoaderC.prototype.mixin = mixin;
LoaderC.prototype.mixin(loaderSync);

// Benchmark
// ---
describe.skip('Proto / Loader Sync:', function() {

    it('benchmarking the speed of building instances.', function(done) {
        var suite = Benchmark.Suite();
        suite.add('Loader returns a function using mixin', function() {
            return LoaderA('lorem');
        });
        suite.add('Loader returns an object using mixin', function() {
            return LoaderB('lorem');
        });
        suite.add('Loader returns an object using prototype', function() {
            return LoaderC('lorem');
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

    it('benchmarking the speed of using instances.', function(done) {
        var a = LoaderA('lorem');
        var b = LoaderB('lorem');
        var c = LoaderC('lorem');
        var suite = Benchmark.Suite();
        suite.add('Loader returns a function using mixin', a);
        suite.add('Loader returns an object using mixin', function() {
            b.get();
        });
        suite.add('Loader returns an object using prototype', function() {
            c.get();
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
