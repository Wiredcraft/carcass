var carcass = require('carcass');
var should = require('should');

require('./fixture');

var machineName;

describe('Machine name', function() {
    // property
    it('should be a function.', function(done) {
        carcass.utils.should.have.property('machineName');
        machineName = carcass.utils.machineName;
        done();
    });
    // Lower case.
    describe('Lorem', function() {
        it('should become lorem.', function(done) {
            machineName('Lorem').end(function(result){
                result.should.equal('lorem');
                done();
            }, done);
        });
    });
    // Space.
    describe('Lorem ipsum', function() {
        it('should become lorem_ipsum.', function(done) {
            machineName('Lorem ipsum').end(function(result){
                result.should.equal('lorem_ipsum');
                done();
            }, done);
        });
    });
    // Multiple spaces.
    describe('Lorem  ipsum', function() {
        it('should become lorem_ipsum.', function(done) {
            machineName('Lorem  ipsum').end(function(result){
                result.should.equal('lorem_ipsum');
                done();
            }, done);
        });
    });
    // Numbers.
    describe('Lorem 2', function() {
        it('should become lorem_2.', function(done) {
            machineName('Lorem 2').end(function(result){
                result.should.equal('lorem_2');
                done();
            }, done);
        });
    });
    // Some special characters (on my keyboard).
    describe('Lorem~!@#$%^&*ipsum', function() {
        it('should become lorem_ipsum.', function(done) {
            machineName('Lorem~!@#$%^&*ipsum').end(function(result){
                result.should.equal('lorem_ipsum');
                done();
            }, done);
        });
    });
    // A different separator.
    describe('Lorem ipsum with - as the separator', function() {
        it('should become lorem-ipsum.', function(done) {
            machineName('Lorem ipsum', {
                separator: '+'
            }).end(function(result){
                result.should.equal('lorem+ipsum');
                done();
            }, done);
        });
    });
    // Errors
    // ------
    describe('Source is a Number', function(){
        it('should return an error.', function(done){
            machineName(21).end(function(result){
                should.not.exist(result);
                done();
            }, function(err){
                err.message.should.equal('Cannot convert a non-string to a machine name');
                done();
            });
        });
    });

    describe('Source is not a string', function() {
        it('should return an error.', function(done) {
            machineName({}).end(function(result){
                should.not.exist(result);
                done();
            }, function(err){
                should.exist(err.message);
                done();
            });
        });
    });
    describe('Separator is not a string', function() {
        it('should return an error.', function(done) {
            machineName('Lorem', {
                separator: {}
            }).end(function(result){
                should.not.exist(result);
                done();
            }, function(err){
                err.message.should.equal('Separator must be a single character, like "_"');
                done();
            });
        });
    });
    describe('Separator is longer than 1 character', function() {
        it('should return an error.', function(done) {
            machineName('Lorem', {
                separator: {}
            }).end(function(result){
                should.not.exist(result);
                done();
            }, function(err){
                should.exist(err.message);
                done();
            });
        });
    });
});
