var carcass = require('carcass');
var should = require('should');

require('./fixture');

describe('Models / Dolor:', function() {
    var builder = carcass.models.dolor;

    it('should be a function.', function() {
        builder.should.be.a('function');
    });

    it('should return an object.', function() {
        builder().should.be.a('object');
    });

    describe('An instance with id', function() {
        var model = builder({
            id: 'lorem',
            name: 'ipsum'
        });

        describe('Read', function() {
            it('should ...', function(done) {
                builder.get('lorem', function(err, _model) {
                    should.exist(err);
                    should.not.exist(_model);
                    done();
                });
            });
        });

        describe('Create', function() {
            it('should ...', function(done) {
                model.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        });

        describe('Read', function() {
            it('should ...', function(done) {
                builder.get('lorem', function(err, _model) {
                    should.not.exist(err);
                    should.exist(_model);
                    _model.get('name').should.equal('ipsum');
                    done();
                });
            });
        });

        describe('Update', function() {
            it('should ...', function(done) {
                model.set({
                    name: 'dolor'
                }).save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        });

        describe('Read', function() {
            it('should ...', function(done) {
                builder.get('lorem', function(err, _model) {
                    should.not.exist(err);
                    should.exist(_model);
                    _model.get('name').should.equal('dolor');
                    done();
                });
            });
        });

        describe('Delete', function() {
            it('should ...', function(done) {
                model.remove(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        });

        describe('Read', function() {
            it('should ...', function(done) {
                builder.get('lorem', function(err, _model) {
                    should.exist(err);
                    should.not.exist(_model);
                    done();
                });
            });
        });
    });
});
