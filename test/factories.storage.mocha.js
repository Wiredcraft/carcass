var carcass = require('carcass');
var should = require('should');

describe('Factories / Storage:', function() {
    it('should be a function.', function() {
        carcass.factories.should.have.property('Storage');
        carcass.factories.Storage.should.be.a('function');
    });

    it('should return a function.', function() {
        carcass.factories.Storage().should.be.a('function');
    });

    describe('A builder', function() {
        var builder = carcass.factories.Storage();

        it('should be a function.', function() {
            builder.should.be.a('function');
        });

        it('should return an object.', function() {
            builder().should.be.a('object');
        });
    });

    describe('A storage', function() {
        var builder = carcass.factories.Storage();
        var storage = builder();

        it('should be an object.', function() {
            storage.should.be.a('object');
        });

        it('should be an event emitter.', function() {
            var emitted = false;
            storage.on('data', function(data) {
                emitted = true;
                data.should.equal('Lorem');
            });
            storage.emit('data', 'Lorem');
            emitted.should.equal(true);
        });
    });

    describe('A builder with an initialize function', function() {
        var builder = carcass.factories.Storage({
            initialize: function(storage, options) {
                storage.initialized = true;
            }
        });
        var storage = builder();

        it('should return a storage.', function() {
            storage.should.be.a('object');
        });

        it('should initialize the storage.', function() {
            storage.should.have.property('initialized', true);
        });
    });

    describe('A builder without an initialize function', function() {
        var builder = carcass.factories.Storage();
        var storage = builder();

        it('should return a storage.', function() {
            storage.should.be.a('object');
        });

        it('should not initialize the storage.', function() {
            storage.should.not.have.property('initialized');
        });
    });

    describe('A builder with a cache key', function() {
        var builder = carcass.factories.Storage({
            cache: 'lorem'
        });

        it('should return a storage.', function() {
            builder().should.be.a('object');
        });

        it('should cache a storage with an id.', function() {
            var storage = builder({
                id: 'ipsum',
                attr: 'dolor'
            });
            var another = builder({
                id: 'ipsum'
            });
            storage.should.be.a('object');
            another.should.be.a('object');
            another.should.equal(storage);
        });

        it('should not cache a storage without an id.', function() {
            var storage = builder({
                attr: 'dolor'
            });
            var another = builder({
                attr: 'dolor'
            });
            storage.should.be.a('object');
            another.should.be.a('object');
            another.should.not.equal(storage);
        });
    });

    describe('A builder without a cache key', function() {
        var builder = carcass.factories.Storage();

        it('should return a storage.', function() {
            builder().should.be.a('object');
        });

        it('should not cache a storage with an id.', function() {
            var storage = builder({
                id: 'ipsum'
            });
            var another = builder({
                id: 'ipsum'
            });
            storage.should.be.a('object');
            another.should.be.a('object');
            another.should.not.equal(storage);
        });

        it('should not cache a storage without an id.', function() {
            var storage = builder({
                attr: 'dolor'
            });
            var another = builder({
                attr: 'dolor'
            });
            storage.should.be.a('object');
            another.should.be.a('object');
            another.should.not.equal(storage);
        });
    });
});
