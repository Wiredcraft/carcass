// var debug = require('debug')('carcass:test');

var should = require('should');
var accessor = require('../lib/helpers/accessor');

describe('Carcass / helpers / accessor:', function() {

    it('should be a function', function() {
        accessor.should.be.type('function');
    });

    it('can build a function', function() {
        accessor('lorem').should.be.type('function');
    });

    it('should throw without a key', function() {
        accessor.should.throwError();
    });

    describe('Use with an object:', function() {
        var obj = {
            lorem: accessor('_lorem')
        };

        it('should not have a value', function() {
            should.not.exist(obj.lorem());
        });

        it('can have a value', function() {
            obj.lorem(true).should.equal(obj);
            obj.lorem().should.equal(true);
            obj._lorem.should.equal(true);
        });

        it('can have another value', function() {
            obj.lorem('lorem').should.equal(obj);
            obj.lorem().should.equal('lorem');
            obj._lorem.should.equal('lorem');
        });
    });

    describe('Plus a default value:', function() {
        var obj = {
            lorem: accessor('_lorem', {
                getDefault: function() {
                    return false;
                }
            })
        };

        it('should have a default value', function() {
            obj.lorem().should.equal(false);
        });

        it('can have a different value', function() {
            obj.lorem(true).should.equal(obj);
            obj.lorem().should.equal(true);
            obj._lorem.should.equal(true);
        });
    });

    describe('Plus a pre hook:', function() {
        var obj = {
            lorem: accessor('_lorem', {
                pre: function(value) {
                    if (!value) return true;
                    return value;
                }
            })
        };

        it('should not have a value', function() {
            should.not.exist(obj.lorem());
        });

        it('can alter the value', function() {
            obj.lorem(false).should.equal(obj);
            obj.lorem().should.equal(true);
            obj._lorem.should.equal(true);
        });

        it('can have another value', function() {
            obj.lorem('lorem').should.equal(obj);
            obj.lorem().should.equal('lorem');
            obj._lorem.should.equal('lorem');
        });
    });
});
