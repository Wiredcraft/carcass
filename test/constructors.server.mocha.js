var carcass = require('carcass');
var should = require('should');

// TODO
describe('Constructors / Server', function() {

    it('should be a constructor.', function(done) {
        done();
    });

    describe('Instance', function() {
        var server = new carcass.constructors.Server();

        it('should be an object with some methods.', function(done) {
            server.should.be.a('object');
            server.should.have.property('getApplication');
            server.should.have.property('mount');
            server.should.have.property('start');
            server.should.have.property('close');
            done();
        });

        it('should be able to load an application.', function(done) {
            var lorem = carcass.applications.lorem;
            server.getApplication('applications/lorem').should.equal(lorem);
            done();
        });

        it('should be able to mount an application.', function(done) {
            done();
        });
    });
});
