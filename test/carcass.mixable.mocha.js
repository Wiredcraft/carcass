var carcass = require('carcass');
var should = require('should');
var assert = require('assert');


describe('Mixable', function() {
    it('should be able to merge objects.', function(done) {
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

    it('should be able to merge functions', function(done) {
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

    it('should only allow Function and Object merge.', function(done) {
        var num = 1, str = 'string', bool = true;
        var obj = carcass.mixable();
        [num, str, bool].forEach(function (elem) {
            assert.not.exist(carcass.mixable(elem));
            (function() {
                obj.mixin(elem);
            }).should.throw();
        });
        done();
    });

    it('should allow target\'s prototype be mixable.', function(done) {
        assert.exist(carcass.mixable({}.prototype));
        assert.exist(carcass.mixable((function() {}).prototype));
        done();
    });

    it('should only allow enumerable properties be merged.', function(done) {
        var obj = carcass.mixable();
        var mix = Object.defineProperties({}, {
            canenum: { 
                value: 1,
                enumerable: true
            },
            notenum: {
                value: 1,
                enumerable: false
            }
        });
        obj.mixin(mix);
        obj.should.have.property('canenum', 1);
        obj.should.not.have.property('notenum');
        done();
    });
});
