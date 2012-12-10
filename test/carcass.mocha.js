var carcass = require('carcass');
var should = require('should');

require('./fixture');

describe('Carcass', function() {
    it('should be an object with some methods.', function(done) {
        carcass.should.be.a('object');
        carcass.should.have.property('register');
        carcass.should.have.property('mixable');
        done();
    });

    describe('Mixin', function() {
        it('should be able to merge objects.', function(done) {
            var obj = {};
            carcass.mixable(obj);
            var value = false;
            var mixin = {
                lorem: function() {
                    this.should.equal(obj);
                    value = true;
                    return 'lorem';
                }
            };
            obj.mixin(mixin);
            obj.should.have.property('lorem');
            obj.lorem().should.equal('lorem');
            value.should.equal(true);
            done();
        });
    });
});
