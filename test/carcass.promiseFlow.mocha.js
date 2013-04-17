var debug = require('debug')('carcass:test');

var carcass = require('carcass');
var should = require('should');

// TODO: reorganize.

describe.skip('Carcass / promiseFlow:', function() {
    it('should be a function.', function() {
        carcass.should.have.property('promiseFlow');
        carcass.promiseFlow.should.be.a('function');
    });

    it('should return a function.', function() {
        carcass.promiseFlow().should.be.a('function');
    });

    describe('An instance', function() {
        // var lorem = carcass.promiseFlow();

        it('can use a function.', function() {
            lorem.use(function(first) {
                debug('first', first);
                var def = carcass.deferred();
                setTimeout(function() {
                    def.resolve('2nd');
                }, 123);
                return def.promise;
            });
        });

        it('can handle a value.', function(done) {
            lorem('1st').then(function(res) {
                debug('res', res);
                done();
            }, done);
        });

        it('can handle an error.', function(done) {
            lorem(new Error('1st')).then(function(res) {
                done();
            }, function(err) {
                debug('err', err);
                done();
            });
        });

        it('can use a value.', function() {
            lorem.use('3rd');
        });

        it('can handle a value.', function(done) {
            lorem('1st+').then(function(res) {
                debug('res', res);
                done();
            }, done);
        });

        it('can use another promise flow.', function() {
            lorem.use(carcass.promiseFlow(function(first) {
                debug('first+', first);
                var def = carcass.deferred();
                setTimeout(function() {
                    def.resolve('2nd+');
                }, 123);
                return def.promise;
            }));
        });

        it('can handle a value.', function(done) {
            lorem('1st++').then(function(res) {
                debug('res', res);
                done();
            }, done);
        });

        it('can use a function resolves an error.', function() {
            lorem.use(function(first) {
                debug('first', first);
                var def = carcass.deferred();
                setTimeout(function() {
                    def.resolve(new Error('the last'));
                }, 123);
                return def.promise;
            });
        });

        it('can handle a value.', function(done) {
            lorem('the last').then(function(res) {
                done();
            }, function(err) {
                debug('err', err);
                done();
            });
        });
    });
});
