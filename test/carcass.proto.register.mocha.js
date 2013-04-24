var debug = require('debug')('carcass:test');

var carcass = require('carcass');
var should = require('should');

var path = require('path');
var root = path.resolve(__dirname, 'fixture');
var lorem = require(path.resolve(root, 'applications', 'lorem'));

describe('Carcass / proto / register:', function() {

    it('should be a ...', function() {
        carcass.proto.should.have.property('register');
    });

    describe('...:', function() {
        var obj = carcass.mixable();

        before(function() {
            obj.mixin(carcass.proto.register);
        });

        it('should ...', function() {
            obj.should.have.property('register');
        });

        it('should ...', function() {
            obj.register(root, 'applications');
            // obj.should.have.property('applications');
            // obj.applications.should.be.a('object');
            // obj.applications.should.have.property('lorem');
            // obj.applications.lorem.should.equal(lorem);
        });
    });
});
