// var debug = require('debug')('carcass:test');

// var should = require('should');

var Processor = require('../lib/classes/Processor');
var processor = null;

describe('Classes / Processor:', function() {

    it('should be a class', function() {
        Processor.should.be.type('function');
        (new Processor()).should.be.type('object');
    });

    describe('An instance:', function() {

        before(function() {
            processor = new Processor();
        });

        it('should be an object', function() {
            processor.should.be.type('object');
        });

        it('should be mixable', function() {
            processor.should.have.property('mixin').with.type('function');
        });

        it('should have some methods', function() {
            processor.should.have.property('task').with.type('function');
            processor.should.have.property('consume').with.type('function');
        });

    });

    describe('With a simple task:', function() {

        before(function() {
            processor = new Processor();
            processor.count = 0;
            processor.plus = function() {
                this.count++;
                return this.count;
            };
        });

        it('can stack a task', function() {
            processor.task('plus').should.equal(processor);
            processor.task().should.eql(['plus']);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 0);
            processor.consume(function(err, res) {
                res.should.eql([1]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 1);
            processor.task().should.eql([]);
        });

        it('can stack a task', function() {
            processor.task('plus').should.equal(processor);
            processor.task().should.eql(['plus']);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 1);
            processor.consume(function(err, res) {
                res.should.eql([2]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 2);
            processor.task().should.eql([]);
        });

        it('can stack two tasks', function() {
            processor.task('plus').task('plus').should.equal(processor);
            processor.task().should.eql(['plus', 'plus']);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 2);
            processor.consume(function(err, res) {
                res.should.eql([3, 4]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 4);
            processor.task().should.eql([]);
        });

        it('can stack two tasks', function() {
            processor.task('plus').task('plus').should.equal(processor);
            processor.task().should.eql(['plus', 'plus']);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 4);
            processor.consume(function(err, res) {
                res.should.eql([5, 6]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 6);
            processor.task().should.eql([]);
        });

    });

    describe('With a function as the task:', function() {

        var plus = function() {
            this.count++;
            return this.count;
        };

        before(function() {
            processor = new Processor();
            processor.count = 0;
        });

        it('can stack a task', function() {
            processor.task(plus).should.equal(processor);
            processor.task().should.eql([plus]);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 0);
            processor.consume(function(err, res) {
                res.should.eql([1]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 1);
            processor.task().should.eql([]);
        });

        it('can stack a task', function() {
            processor.task(plus).should.equal(processor);
            processor.task().should.eql([plus]);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 1);
            processor.consume(function(err, res) {
                res.should.eql([2]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 2);
            processor.task().should.eql([]);
        });

        it('can stack two tasks', function() {
            processor.task(plus).task(plus).should.equal(processor);
            processor.task().should.eql([plus, plus]);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 2);
            processor.consume(function(err, res) {
                res.should.eql([3, 4]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 4);
            processor.task().should.eql([]);
        });

        it('can stack two tasks', function() {
            processor.task(plus).task(plus).should.equal(processor);
            processor.task().should.eql([plus, plus]);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 4);
            processor.consume(function(err, res) {
                res.should.eql([5, 6]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 6);
            processor.task().should.eql([]);
        });

    });

    describe('With a task and an argument:', function() {

        before(function() {
            processor = new Processor();
            processor.count = 0;
            processor.plus = function(num) {
                this.count += num;
                return this.count;
            };
        });

        it('can stack a task', function() {
            processor.task({
                handler: 'plus',
                args: 2
            }).should.equal(processor);
            processor.task().should.be.type('object').with.lengthOf(1);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 0);
            processor.consume(function(err, res) {
                res.should.eql([2]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 2);
            processor.task().should.eql([]);
        });

        it('can stack a task', function() {
            processor.task({
                handler: 'plus',
                args: 3
            }).should.equal(processor);
            processor.task().should.be.type('object').with.lengthOf(1);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 2);
            processor.consume(function(err, res) {
                res.should.eql([5]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 5);
            processor.task().should.eql([]);
        });

        it('can stack two tasks', function() {
            processor.task({
                handler: 'plus',
                args: 2
            }).task({
                handler: 'plus',
                args: 3
            }).should.equal(processor);
            processor.task().should.be.type('object').with.lengthOf(2);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 5);
            processor.consume(function(err, res) {
                res.should.eql([7, 10]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 10);
            processor.task().should.eql([]);
        });

        it('can stack two tasks', function() {
            processor.task({
                handler: 'plus',
                args: 2
            }).task({
                handler: 'plus',
                args: 3
            }).should.equal(processor);
            processor.task().should.be.type('object').with.lengthOf(2);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 10);
            processor.consume(function(err, res) {
                res.should.eql([12, 15]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 15);
            processor.task().should.eql([]);
        });

    });

    describe('With a task and some arguments:', function() {

        before(function() {
            processor = new Processor();
            processor.count = 0;
            processor.plus = function() {
                var i;
                for (i = 0; i < arguments.length; i++) {
                    this.count += arguments[i];
                }
                return this.count;
            };
        });

        it('can stack a task', function() {
            processor.task({
                handler: 'plus',
                args: [1, 2]
            }).should.equal(processor);
            processor.task().should.be.type('object').with.lengthOf(1);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 0);
            processor.consume(function(err, res) {
                res.should.eql([3]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 3);
            processor.task().should.eql([]);
        });

        it('can stack a task', function() {
            processor.task({
                handler: 'plus',
                args: [1, 2, 3]
            }).should.equal(processor);
            processor.task().should.be.type('object').with.lengthOf(1);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 3);
            processor.consume(function(err, res) {
                res.should.eql([9]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 9);
            processor.task().should.eql([]);
        });

        it('can stack two tasks', function() {
            processor.task({
                handler: 'plus',
                args: [1, 2]
            }).task({
                handler: 'plus',
                args: [3, 4, 5]
            }).should.equal(processor);
            processor.task().should.be.type('object').with.lengthOf(2);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 9);
            processor.consume(function(err, res) {
                res.should.eql([12, 24]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 24);
            processor.task().should.eql([]);
        });

        it('can stack two tasks', function() {
            processor.task({
                handler: 'plus',
                args: [1, 2]
            }).task({
                handler: 'plus',
                args: [3, 4, 5]
            }).should.equal(processor);
            processor.task().should.be.type('object').with.lengthOf(2);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 24);
            processor.consume(function(err, res) {
                res.should.eql([27, 39]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 39);
            processor.task().should.eql([]);
        });

    });

    describe('With a task and a callback:', function() {

        before(function() {
            processor = new Processor();
            processor.count = 0;
            processor.plus = function(num, done) {
                this.count += num;
                done(null, this.count);
                return;
            };
        });

        it('can stack a task', function() {
            processor.task({
                handler: 'plus',
                callback: true,
                args: 2
            }).should.equal(processor);
            processor.task().should.be.type('object').with.lengthOf(1);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 0);
            processor.consume(function(err, res) {
                res.should.eql([2]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 2);
            processor.task().should.eql([]);
        });

        it('can stack a task', function() {
            processor.task({
                handler: 'plus',
                callback: true,
                args: 3
            }).should.equal(processor);
            processor.task().should.be.type('object').with.lengthOf(1);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 2);
            processor.consume(function(err, res) {
                res.should.eql([5]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 5);
            processor.task().should.eql([]);
        });

        it('can stack two tasks', function() {
            processor.task({
                handler: 'plus',
                callback: true,
                args: 2
            }).task({
                handler: 'plus',
                callback: true,
                args: 3
            }).should.equal(processor);
            processor.task().should.be.type('object').with.lengthOf(2);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 5);
            processor.consume(function(err, res) {
                res.should.eql([7, 10]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 10);
            processor.task().should.eql([]);
        });

        it('can stack two tasks', function() {
            processor.task({
                handler: 'plus',
                callback: true,
                args: 2
            }).task({
                handler: 'plus',
                callback: true,
                args: 3
            }).should.equal(processor);
            processor.task().should.be.type('object').with.lengthOf(2);
        });

        it('can consume', function(done) {
            processor.should.have.property('count', 10);
            processor.consume(function(err, res) {
                res.should.eql([12, 15]);
                done(err);
            });
        });

        it('should have changed processor', function() {
            processor.should.have.property('count', 15);
            processor.task().should.eql([]);
        });

    });

});
