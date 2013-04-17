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

    // TODO
    it('should have some utils.', function() {
        carcass.should.have.property('utils');
    });

    // TODO
    it('should have some plugins.', function() {
        carcass.should.have.property('plugins');
    });

    // TODO
    it('should have some constructors.', function() {
        carcass.should.have.property('constructors');
    });

    // TODO
    it('should have some factories.', function() {
        carcass.should.have.property('factories');
    });

    // TODO
    it('should have some applications.', function() {
        carcass.should.have.property('applications');
    });

    // .
    describe('Mixin', function() {
        it('should be able to merge objects.', function() {
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
        });
    });

    describe('Register', function() {
        it('should be able to register new files.', function() {
            carcass.register('', 'applications');
            carcass.applications.should.have.property('ipsum');
            carcass.applications.should.have.property('lorem');
        });
    });

    // TODO: more.
});
