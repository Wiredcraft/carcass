var carcass = require('carcass');
var util = require('util');
var should = require('should');

require('./fixture');

describe('Model', function() {
    it('should be a constructor.', function(done) {
        var Model = carcass.constructors.Model;
        Model.should.have.property('title', 'Model');
        Model.should.have.property('mixin');
        Model.should.have.property('extend');
        done();
    });

    describe('Lorem', function() {
        it('should be a constructor extended from Model.', function(done) {
            var Model = carcass.constructors.Model;
            var Lorem = carcass.models.Lorem;
            Lorem.should.have.property('super_', Model);
            Lorem.should.have.property('title', 'Lorem');
            Lorem.should.have.property('mixin');
            Lorem.should.have.property('extend');
            done();
        });
    });

    describe('An instance of Lorem', function() {
        it('should have the attributes and the methods.', function(done) {
            var Lorem = carcass.models.Lorem;
            var lorem = new Lorem();
            lorem.should.have.property('mixin');
            lorem.should.have.property('initialize');
            lorem.should.have.property('lorem', 'ipsum');
            done();
        });
    });
});
