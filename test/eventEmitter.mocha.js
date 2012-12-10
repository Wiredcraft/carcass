var carcass = require('carcass');
var util = require('util');
var should = require('should');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

require('./fixture');

describe('Event Emitter', function() {

    describe('The example from nodejs.org.', function() {
        it('should just work.', function(done) {
            var lorem = false;
            var MyStream = function() {
                EventEmitter.call(this);
            };
            util.inherits(MyStream, EventEmitter);
            MyStream.prototype.write = function(data) {
                this.emit('data', data);
            };
            var stream = new MyStream();
            stream.on('data', function(data) {
                lorem = true;
                data.should.equal('Lorem');
            });
            stream.write('Lorem');
            lorem.should.equal(true);
            setTimeout(done, 1);
        });
    });

    describe('The mixin I built.', function() {
        it('should also work.', function(done) {
            var lorem = false;
            var MyStream = function() {
                EventEmitter.call(this);
            };
            carcass.mixable(MyStream);
            MyStream.plugin('plugins', 'eventEmitter');
            MyStream.prototype.write = function(data) {
                this.emit('data', data);
            };
            var stream = new MyStream();
            stream.on('data', function(data) {
                lorem = true;
                data.should.equal('Lorem');
            });
            stream.write('Lorem');
            lorem.should.equal(true);
            setTimeout(done, 1);
        });
    });
});
