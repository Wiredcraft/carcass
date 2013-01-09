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
        var builder = carcass.factories.Model();
        var model = builder();

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

        it('should have a reference to the constructor.', function() {
            model.should.have.property('model');
        });
    });

    describe('The constructor of a model', function() {
        var builder = carcass.factories.Model();
        var model = builder();
        var constructor = model.model;

        it('should be a function.', function() {
            constructor.should.be.a('function');
        });

        it('should be an event emitter.', function() {
            var emitted = false;
            constructor.on('data', function(data) {
                emitted = true;
                data.should.equal('Lorem');
            });
            constructor.emit('data', 'Lorem');
            emitted.should.equal(true);
        });

        it('should have some value properties.', function() {
            constructor.should.have.property('attrs');
            constructor.should.have.property('validators');
        });

        it('should have some methods.', function() {
            constructor.should.have.property('validate');
        });
    });

    describe('A builder with some modifications.', function() {
        var builder = carcass.factories.Model();
        builder.lorem = 'ipsum';
        builder.prototype.lorem = 'dolor';
        var model = builder();

        it('should return a model.', function() {
            model.should.be.a('object');
        });

        it('should have the properties.', function() {
            model.model.should.have.property('lorem', 'ipsum');
            model.should.have.property('lorem', 'dolor');
        });
    });

    describe('A builder without the modifications', function() {
        var builder = carcass.factories.Model();
        var model = builder();

        it('should return a model.', function() {
            model.should.be.a('object');
        });

        it('should not have the properties.', function() {
            model.model.should.not.have.property('lorem');
            model.should.not.have.property('lorem');
        });
    });

    describe('A builder with a plugin.', function() {
        var builder = carcass.factories.Model();
        var plugin = function(Model) {
            Model.prototype.lorem = 'ipsum';
        };
        builder.use(plugin);
        var model = builder();

        it('should return a model.', function() {
            model.should.be.a('object');
        });

        it('should have the properties.', function() {
            model.should.have.property('lorem', 'ipsum');
        });
    });

    describe('A builder without the modifications', function() {
        var builder = carcass.factories.Model();
        var model = builder();

        it('should return a model.', function() {
            model.should.be.a('object');
        });

        it('should not have the properties.', function() {
            model.should.not.have.property('lorem');
        });
    });

    describe('A builder with attributes', function() {
        var builder = carcass.factories.Model({
            attributes: {
                lorem: {}
            }
        });
        var model = builder();
        var another = builder({
            lorem: 'dolor'
        });

        it('should return a model.', function() {
            model.should.be.a('object');
        });

        it('should set a setter.', function() {
            model.should.have.property('lorem');
            model.lorem.should.be.a('function');
            model.lorem('ipsum').should.equal(model);
        });

        it('should set a getter.', function() {
            model.lorem().should.equal('ipsum');
            another.lorem().should.equal('dolor');
        });
    });

    describe('A builder without attributes', function() {
        var builder = carcass.factories.Model();
        var model = builder();

        it('should return a model.', function() {
            model.should.be.a('object');
        });

        it('should set a setter or a getter.', function() {
            model.should.not.have.property('lorem');
        });
    });

    describe('A model with attributes', function() {
        var builder = carcass.factories.Model();
        var model = builder({
            lorem: 'ipsum'
        });

        it('should be an object.', function() {
            model.should.be.a('object');
        });

        it('should have the attributes.', function() {
            model.get('lorem').should.equal('ipsum');
        });
    });

    describe('A model without attributes', function() {
        var builder = carcass.factories.Model();
        var model = builder();

        it('should be an object.', function() {
            model.should.be.a('object');
        });

        it('should not have the attributes.', function() {
            should.not.exist(model.get('lorem'));
        });
    });
});
