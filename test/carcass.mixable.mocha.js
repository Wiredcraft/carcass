var carcass = require('carcass');
var should = require('should');
var assert = require('assert');


describe('Mixable', function() {
    it('should be a function.', function(done) {
        carcass.mixable.should.be.a('function');
        done();
    });

    describe('constructor', function() {
        it('should return an object.', function(done) {
            carcass.mixable().should.be.a('object');
            carcass.mixable(carcass).should.be.a('object');
            done();
        });

    });

    describe('used on object', function() {
        it('should return the object.', function(done) {
            var obj = {
                x: 1
            };
            var mobj = carcass.mixable(obj);
            mobj.should.be.a('object');
            mobj.should.have.property('x');
            mobj.x.should.eql(obj.x);
            done();
        });

        it('should make the object mixable.', function(done) {
            var obj = {};
            obj = carcass.mixable(obj);
            obj.should.have.property('mixin');
            done();
        });
    });

    describe('used on function', function() {
        it('should return the function', function(done) {
            var value = false;
            var func = function() {
                value = true;
                return 'func';
            };
            func = carcass.mixable(func);
            func.should.be.a('function');
            func().should.eql('func');
            value.should.eql(true);
            done();
        });

        it('should make the function mixable', function(done) {
            var func = carcass.mixable(function() {});
            func.should.have.property('mixin');
            done();
        });
    });

    it('should allow target\'s prototype be mixable.', function(done) {
        assert.exist(carcass.mixable({}.prototype));
        assert.exist(carcass.mixable((function() {}).prototype));
        done();
    });

    it('should only allow Function and Object to be mixable', function(done) {
        var num = 1, str = 'string', bool = true;
        assert.not.exist(carcass.mixable(num));
        assert.not.exist(carcass.mixable(str));
        assert.not.exist(carcass.mixable(bool));
        done();
    });
});

describe('Mixin', function() {
    describe('Mixable object', function() {
        it('should be able to mixin others.', function(done) {
            var obj = carcass.mixable();
            var value = false;
            var mixinObj = {
                lorem: function() {
                    this.should.equal(obj);
                    value = true;
                    return 'lorem';
                }
            };
            obj.mixin(mixinObj);
            obj.should.have.property('lorem');
            obj.lorem().should.equal('lorem');
            value.should.equal(true);
            done();
        });
    });

    describe('Mixable function', function() {
        it('should be able to mixin others.', function(done) {
            var func = function() {
                return 'func';
            };
            func = carcass.mixable(func);
            var value = false;
            var mixinObj = {
                lorem: function() {
                    this.should.equal(func);
                    value = true;
                    return 'lorem';
                }
            };
            func.mixin(mixinObj);
            func.should.have.property('lorem');
            func.lorem().should.equal('lorem');
            value.should.equal(true);
            func().should.equal('func');
            done();
        });
    });

    it('should only allow Function and Object to be mixed in from.', function(done) {
        var num = 1, str = 'string', bool = true;
        var obj = carcass.mixable();
        (function() { obj.mixin(num); }).should.throw();
        (function() { obj.mixin(str); }).should.throw();
        (function() { obj.mixin(bool); }).should.throw();
        done();
    });
});

describe('Mixin descriptor', function() {
    describe('enumerable', function() {
            it('should be kept after mixin.', function(done) {
                var obj = carcass.mixable();
                var mix = Object.defineProperties({}, {
                    canenum: { 
                        value: 1,
                        enumerable: true
                    }
                });
                obj.mixin(mix);
                obj.should.have.property('canenum');
                done();
            });
            
            it('should only allow enumerable properties be mixed in.', function(done) {
                var obj = carcass.mixable();
                var mix = Object.defineProperties({}, {
                    notenum: {
                        value: 1,
                        enumerable: false
                    }
                });
                obj.mixin(mix);
                obj.should.not.have.property('notenum');
                done();
            });
    });

    describe('value', function() {
        it('should be kept the same after mix.', function(done) {
            var obj = carcass.mixable();
            var mix = Object.defineProperties({}, {
                prop: {
                    value: 'somevalue',
                    enumerable: true
                }
            });
            obj.mixin(mix);
            obj.should.have.property('prop', 'somevalue');
            done();
        });
    });

    describe('writable/configurable', function() {
        it('should be kept the same after mix.', function(done) {
            var obj = carcass.mixable();
            var mix = Object.defineProperties({}, {
                prop: {
                    writable: true,
                    configurable: true,
                    enumerable: true,
                    value: 0
                },
                prop2: {
                    writable: false,
                    configurable: false,
                    enumerable: true,
                    value: 0
                }
            });
            obj.mixin(mix);
            obj.should.have.property('prop');
            obj.should.have.property('prop2');

            var desc = Object.getOwnPropertyDescriptor(obj, 'prop');
            desc.writable.should.eql(true);
            desc.configurable.should.eql(true);
            
            var desc = Object.getOwnPropertyDescriptor(obj, 'prop2');
            desc.writable.should.eql(false);
            desc.configurable.should.equal(false);
            done();
        })
    });

    describe('get/set', function() {
        it('should be kept the same after mix.', function(done) {
            var obj = carcass.mixable();
            var outval = 'val';
            var mix = Object.defineProperties({}, {
                prop: {
                    get: function() { return outval; },
                    set: function(val) { outval = val; },
                    enumerable: true
                }
            });
            
            obj.mixin(mix);
            obj.should.have.property('prop', 'val');
            obj.prop = 'new';
            obj.prop.should.eql('new');
            done();
        })
    });
});