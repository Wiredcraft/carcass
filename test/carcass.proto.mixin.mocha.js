var debug = require('debug')('carcass:test');

var carcass = require('carcass');
var should = require('should');

describe('Carcass / proto / mixin:', function() {
    describe('With an object', function() {
        var obj = {
            lorem: 'ipsum',
            mixin: carcass.proto.mixin
        };

        it('can mixin an object.', function() {
            obj.mixin({
                dolor: 'sit'
            });
            obj.should.have.property('lorem', 'ipsum');
            obj.should.have.property('dolor', 'sit');
        });

        it('can mixin a function.', function() {
            var func = function() {};
            func.dolor = 'amet';
            obj.mixin(func);
            obj.should.have.property('lorem', 'ipsum');
            obj.should.have.property('dolor', 'amet');
        });

        // TODO: other simple types like a number.

        it('can override.', function() {
            obj.mixin({
                dolor: 'amet'
            });
            obj.should.have.property('lorem', 'ipsum');
            obj.should.have.property('dolor', 'amet');
        });

        it('can mixin enumerable.', function() {
            var other = Object.defineProperties({}, {
                consectetur: {
                    value: true,
                    enumerable: true
                }
            });
            obj.mixin(other);
            obj.should.have.property('consectetur', true);
        });

        it('cannot mixin non-enumerable.', function() {
            var other = Object.defineProperties({}, {
                consectetur: {
                    value: false,
                    enumerable: false
                }
            });
            obj.mixin(other);
            obj.should.have.property('consectetur', true);
        });

        it('can mixin getters / setters.', function() {
            var elit = null;
            var other = Object.defineProperties({}, {
                adipisicing: {
                    get: function() {
                        return elit;
                    },
                    set: function(val) {
                        elit = val;
                    },
                    enumerable: true
                }
            });
            obj.mixin(other);
            obj.should.have.property('adipisicing', null);
            obj.adipisicing = true;
            obj.should.have.property('adipisicing', true);
            elit.should.equal(true);
        });

        // TODO: (non-)writable, (non-)configurable
    });
});
