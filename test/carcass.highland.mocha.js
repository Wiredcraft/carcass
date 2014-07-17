var debug = require('debug')('carcass:test');

var should = require('should');
var highland = require('../lib/highland');
var isNumber = require('es5-ext/number/is-number');
var through2 = require('through2');

describe('Carcass / highland:', function() {

    it('should be a function', function() {
        highland.should.be.type('function');
    });

    describe('wrapInvoke:', function() {

        var plusOne = function(num, done) {
            if (!isNumber(num)) {
                return done(new TypeError('must be a number'));
            }
            done(null, num + 1);
        };

        var obj = {};
        obj.count = 0;
        obj.plusOne = function(done) {
            this.count++;
            done();
        };

        it('should be a function', function() {
            highland.should.have.property('wrapInvoke').with.type('function');
        });

        it('can wrap a function', function(done) {
            var invoke = highland.wrapInvoke(plusOne, 1);
            invoke.should.be.type('function');
            var stream = invoke();
            stream.should.be.type('object');
            stream.should.have.property('pull').with.type('function');
            stream.pull(function(err, res) {
                should.not.exist(err);
                res.should.equal(2);
                done();
            });
        });

        it('can wrap a function and handler error', function(done) {
            var invoke = highland.wrapInvoke(plusOne, 'lorem');
            invoke.should.be.type('function');
            var stream = invoke();
            stream.should.be.type('object');
            stream.should.have.property('pull').with.type('function');
            stream.pull(function(err, res) {
                should.exist(err);
                should.not.exist(res);
                done();
            });
        });

        it('can wrap a method of an object', function(done) {
            var invoke = highland.wrapInvoke(obj.plusOne);
            invoke.should.be.type('function');
            var stream = invoke(obj);
            stream.should.be.type('object');
            stream.should.have.property('pull').with.type('function');
            stream.pull(function(err) {
                should.not.exist(err);
                obj.count.should.equal(1);
                done();
            });
        });

    });

    describe('pipeThrough:', function() {

        var plusOne = function() {
            return through2.obj(function(chunk, enc, done) {
                if (!isNumber(chunk)) {
                    return done(new TypeError('must be a number'));
                }
                this.push(chunk + 1);
                done();
            });
        };

        it('should be a function', function() {
            highland.should.have.property('pipeThrough').with.type('function');
        });

        it('can pipe', function(done) {
            var stream = highland.pipeThrough([1], plusOne());
            stream.should.be.type('object');
            stream.should.have.property('pull').with.type('function');
            stream.pull(function(err, res) {
                should.not.exist(err);
                res.should.equal(2);
                done();
            });
        });

        it('can pipe', function(done) {
            var stream = highland.pipeThrough([1, 2], plusOne());
            stream.should.be.type('object');
            stream.should.have.property('pull').with.type('function');
            stream.toArray(function(res) {
                res.should.eql([2, 3]);
                done();
            });
        });

        it('can pipe', function(done) {
            var stream = highland.pipeThrough([1, 2], plusOne(), plusOne());
            stream.should.be.type('object');
            stream.should.have.property('pull').with.type('function');
            stream.toArray(function(res) {
                res.should.eql([3, 4]);
                done();
            });
        });

        it('can pipe and handler error', function(done) {
            var stream = highland.pipeThrough(['lorem'], plusOne());
            stream.should.be.type('object');
            stream.should.have.property('pull').with.type('function');
            stream.pull(function(err, res) {
                debug('err', err);
                should.exist(err);
                should.not.exist(res);
                done();
            });
        });

        it('can pipe and handler error', function(done) {
            var stream = highland.pipeThrough(['lorem'], plusOne(), plusOne());
            stream.should.be.type('object');
            stream.should.have.property('pull').with.type('function');
            stream.pull(function(err, res) {
                debug('err', err);
                should.exist(err);
                should.not.exist(res);
                done();
            });
        });

        it('can pipe and handler error', function(done) {
            var stream = highland.pipeThrough(['lorem'], plusOne());
            stream.should.be.type('object');
            stream.should.have.property('pull').with.type('function');
            stream.on('error', function(err) {
                debug('err', err);
                should.exist(err);
                done();
            }).toArray(function() {});
        });

    });

});
