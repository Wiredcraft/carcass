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
            carcass.mixable(carcass);
            var value = false;
            var obj = {
                lorem: function() {
                    carcass.should.equal(this);
                    value = true;
                    return 'lorem';
                }
            };
            carcass.mixin(obj);
            carcass.should.have.property('lorem');
            carcass.lorem().should.equal('lorem');
            value.should.equal(true);
            done();
        });
    });
});
