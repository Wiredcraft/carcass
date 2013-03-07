var carcass = require('../../carcass');
var should = require('should');

require('./fixture');

var machineName;

describe('Machine name', function() {
    // TODO
    it('should be a function.', function(done) {
        carcass.utils.should.have.property('machineName');
        machineName = carcass.utils.machineName;
        done();
    });
    // Lower case.
    describe('Lorem', function() {
        it('should become lorem.', function(done) {
            machineName('Lorem', function(err, name) {
                should.not.exist(err);
                name.should.equal('lorem');
                done();
            });
        });
    });
    // Space.
    describe('Lorem ipsum', function() {
        it('should become lorem_ipsum.', function(done) {
            machineName('Lorem ipsum', function(err, name) {
                should.not.exist(err);
                name.should.equal('lorem_ipsum');
                done();
            });
        });
    });
    // Multiple spaces.
    describe('Lorem  ipsum', function() {
        it('should become lorem_ipsum.', function(done) {
            machineName('Lorem  ipsum', function(err, name) {
                should.not.exist(err);
                name.should.equal('lorem_ipsum');
                done();
            });
        });
    });
    // Numbers.
    describe('Lorem 2', function() {
        it('should become lorem_2.', function(done) {
            machineName('Lorem 2', function(err, name) {
                should.not.exist(err);
                name.should.equal('lorem_2');
                done();
            });
        });
    });
    // Some special characters (on my keyboard).
    describe('Lorem~!@#$%^&*ipsum', function() {
        it('should become lorem_ipsum.', function(done) {
            machineName('Lorem~!@#$%^&*ipsum', function(err, name) {
                should.not.exist(err);
                name.should.equal('lorem_ipsum');
                done();
            });
        });
    });
    // A different separator.
    describe('Lorem ipsum with - as the separator', function() {
        it('should become lorem-ipsum.', function(done) {
            machineName('Lorem ipsum', {
                separator: '-'
            }, function(err, name) {
                should.not.exist(err);
                name.should.equal('lorem-ipsum');
                done();
            });
        });
    });
    // Errors
    // ------
    describe('Source is a Number', function(){
        it('should return an error.', function(done){
            machineName(21, function(err, name){
                should.exist(err);
                done();
            });
        });
    });

    describe('Source is not a string', function() {
        it('should return an error.', function(done) {
            machineName({}, function(err, name) {
                should.exist(err);
                done();
            });
        });
    });
    describe('Separator is not a string', function() {
        it('should return an error.', function(done) {
            machineName('Lorem', {
                separator: {}
            }, function(err, name) {
                should.exist(err);
                done();
            });
        });
    });
    describe('Separator is longer than 1 character', function() {
        it('should return an error.', function(done) {
            machineName('Lorem', {
                separator: '--'
            }, function(err, name) {
                should.exist(err);
                done();
            });
        });
    });
});
