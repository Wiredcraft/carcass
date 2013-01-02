var carcass = require('carcass');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

require('./fixture');

describe('Event Emitter', function() {

    describe('The example from nodejs.org', function() {
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

    describe('With the mixin method I built', function() {
        it('should also work.', function(done) {
            var lorem = false;
            var MyStream = carcass.mixable(function() {
                EventEmitter.call(this);
            });
            MyStream.prototype.mixin(EventEmitter.prototype);
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

    describe('And it is a simple object', function() {
        it('should also work.', function(done) {
            var lorem = false;
            var stream = carcass.mixable();
            EventEmitter.call(stream);
            stream.mixin(EventEmitter.prototype);
            stream.write = function(data) {
                this.emit('data', data);
            };
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
