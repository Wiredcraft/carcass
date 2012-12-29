var carcass = require('carcass');
var should = require('should');

describe('The mixable function', function() {
    it('should be a function.', function() {
        carcass.mixable.should.be.a('function');
    });

    describe('Constructor', function() {
        it('should return an object.', function() {
            carcass.mixable().should.be.a('object');
        });
    });

    describe('Used on a object', function() {
        it('should return the object.', function() {
            var obj = {};
            carcass.mixable(obj).should.equal(obj);
        });

        it('should make the object mixable.', function() {
            var obj = carcass.mixable({});
            obj.should.have.property('mixin');
        });
    });

    describe('Used on a function', function() {
        it('should return the function.', function() {
            var func = function() {};
            carcass.mixable(func).should.equal(func);
        });

        it('should make the function mixable', function() {
            var func = carcass.mixable(function() {});
            func.should.have.property('mixin');
        });

        it('should make the prototype mixable', function() {
            var func = carcass.mixable(function() {});
            func.prototype.should.have.property('mixin');
        });
    });

    describe('Used on something else', function() {
        // TODO
        it('should ...', function() {
            var num = 1, str = 'string', bool = true;
        });
    });
});

describe('The mixin method', function() {
    describe('A mixable object', function() {
        var obj = carcass.mixable({
            lorem: 'ipsum'
        });

        it('should be able to mixin an object.', function() {
            obj.mixin({
                dolor: 'sit'
            });
            obj.should.have.property('lorem', 'ipsum');
            obj.should.have.property('dolor', 'sit');
        });

        it('should be able to mixin a function.', function() {
            var func = function() {};
            func.dolor = 'amet';
            obj.mixin(func);
            obj.should.have.property('lorem', 'ipsum');
            obj.should.have.property('dolor', 'amet');
        });

        // TODO
        it('should not be able to mixin others.', function() {});
    });

    describe('A mixable function', function() {
        var obj = carcass.mixable(function() {
            return 'Lorem ipsum';
        });

        it('should be able to mixin an object.', function() {
            obj.mixin({
                dolor: 'sit'
            });
            obj().should.equal('Lorem ipsum');
            obj.should.have.property('dolor', 'sit');
        });

        it('should be able to mixin a function.', function() {
            var func = function() {};
            func.dolor = 'amet';
            obj.mixin(func);
            obj().should.equal('Lorem ipsum');
            obj.should.have.property('dolor', 'amet');
        });

        // TODO
        it('should not be able to mixin others.', function() {});
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

        it('should only allow enumerable properties be mixed in.', function(
            done) {
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
        });
    });

    describe('get/set', function() {
        it('should be kept the same after mix.', function(done) {
            var obj = carcass.mixable();
            var outval = 'val';
            var mix = Object.defineProperties({}, {
                prop: {
                    get: function() {
                        return outval;
                    },
                    set: function(val) {
                        outval = val;
                    },
                    enumerable: true
                }
            });

            obj.mixin(mix);
            obj.should.have.property('prop', 'val');
            obj.prop = 'new';
            obj.prop.should.eql('new');
            done();
        });
    });
});
