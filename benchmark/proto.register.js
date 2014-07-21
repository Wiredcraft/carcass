var debug = require('debug')('carcass:benchmark');

var carcass = require('..');
var Benchmark = require('benchmark');

var path = require('path');
var root = path.resolve(__dirname, '../test', 'fixture');

// Benchmark
// ---
describe('Proto / register:', function() {

    it('benchmarking the speed of register.', function(done) {
        Benchmark.options.maxTime = 1;
        var suite = Benchmark.Suite();
        suite.add('using register.', function() {
            var obj = carcass.mixable({
                lorem: 'lorem'
            });
            obj.mixin(carcass.proto.register);
            obj.register(root, 'files');
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
