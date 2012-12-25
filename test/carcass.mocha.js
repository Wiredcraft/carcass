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
    it('should have some utils.', function(done) {
        carcass.should.have.property('utils');
        done();
    });
    
    // TODO
    it('should have some plugins.', function(done) {
        carcass.should.have.property('plugins');
        done();
    });
    
    // TODO
    it('should have some constructors.', function(done) {
        carcass.should.have.property('constructors');
        done();
    });
    
    // TODO
    it('should have some factories.', function(done) {
        carcass.should.have.property('factories');
        done();
    });
    
    // TODO
    it('should have some applications.', function(done) {
        carcass.should.have.property('applications');
        done();
    });

    // .
    describe('Mixin', function() {
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
    });

    describe('Register', function() {
        it('should be able to register new files.', function(done) {
            carcass.register('', 'applications');
            carcass.applications.should.have.property('ipsum');
            carcass.applications.should.have.property('lorem');
            done();
        });
    });

    // TODO: more.
});
