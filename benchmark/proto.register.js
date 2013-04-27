var debug = require('debug')('carcass:proto:register');

var carcass = require('..');
var Benchmark = require('benchmark');

var path = require('path');
var root = path.resolve(__dirname, '../test', 'fixture');
var lorem = require(path.resolve(root, 'applications', 'lorem'));
var ipsum = require(path.resolve(root, 'applications', 'ipsum'));
var dolor = require(path.resolve(root, 'applications', 'dolor', 'lorem'));

// Benchmark
// ---
describe.skip('Proto / register:', function() {

    it('benchmarking the speed of register.', function(done) {
        var suite = Benchmark.Suite();
        suite.add('using register.', function() {
            var obj = carcass.mixable({
                lorem: 'lorem'
            });
            obj.mixin(carcass.proto.register);
            obj.register(root, 'applications');
        });
        suite.add('using register.', function() {
            var obj = carcass.mixable({
                lorem: 'lorem',
                registerOptions: {
                    noRecursive: true
                }
            });
            obj.mixin(carcass.proto.register);
            obj.register(root, 'applications');
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
