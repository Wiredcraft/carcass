var carcass = require('carcass');
var should = require('should');

describe('Factories / Model:', function() {
    it('should be a function.', function() {
        carcass.factories.should.have.property('Model');
        carcass.factories.Model.should.be.a('function');
    });

    it('should return a function.', function() {
        carcass.factories.Model().should.be.a('function');
    });

    describe('A builder', function() {
        var builder = carcass.factories.Model();

        it('should be a function.', function() {
            builder.should.be.a('function');
        });

        it('should return an object.', function() {
            builder().should.be.a('object');
        });
    });

    describe('A model', function() {
        var builder = carcass.factories.Model({
            initialize: function(model, options) {
                model.initialized = true;
            }
        });
        var model = builder({
            lorem: 'ipsum'
        });

        it('should be an object.', function() {
            model.should.be.a('object');
        });

        it('should be an event emitter.', function() {
            var emitted = false;
            model.on('data', function(data) {
                emitted = true;
                data.should.equal('Lorem');
            });
            model.emit('data', 'Lorem');
            emitted.should.equal(true);
        });

        it('should have some value properties.', function() {
            model.should.have.property('attrs');
            model.should.have.property('dirty');
        });

        it('should have some methods.', function() {
            model.should.have.property('validate');
            model.should.have.property('set');
            model.should.have.property('get');
            model.should.have.property('has');
        });

        it('should have some attributes.', function() {
            model.get('lorem').should.equal('ipsum');
        });

        it('should have a reference to the constructor.', function() {
            model.should.have.property('model');
        });

        it('should have invoked initialize function.', function() {
            model.should.have.property('initialized', true);
        });

        describe('The constructor', function() {
            var parent = model.model;

            it('should be a function.', function() {
                parent.should.be.a('function');
            });

            it('should be an event emitter.', function() {
                var emitted = false;
                parent.on('data', function(data) {
                    emitted = true;
                    data.should.equal('Lorem');
                });
                parent.emit('data', 'Lorem');
                emitted.should.equal(true);
            });

            it('should have some value properties.', function() {
                parent.should.have.property('attrs');
                parent.should.have.property('validators');
            });

            it('should have some methods.', function() {
                parent.should.have.property('validate');
            });
        });
    });
});
