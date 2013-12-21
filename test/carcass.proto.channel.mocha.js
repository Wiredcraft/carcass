// var debug = require('debug')('carcass:test');

var carcass = require('..');
// var should = require('should');

describe('Carcass / proto / channel:', function() {

    it('should be a proto.', function() {
        carcass.proto.should.have.property('channel');
        carcass.proto.channel.should.be.a('object');
    });

    describe('Use:', function() {
        var obj = carcass.mixable();
        var published = false;
        var sub = null;
        var consumer = function(data, envelope) {
            data.should.equal('message');
            envelope.should.be.a('object');
            envelope.should.have.property('topic', 'topic');
            envelope.should.have.property('data', 'message');
            published = true;
        };

        before(function() {
            obj.mixin(carcass.proto.channel);
        });

        it('should have the properties.', function() {
            obj.should.have.property('_postal');
            obj.should.have.property('channel');
            obj.should.have.property('publish');
            obj.should.have.property('subscribe');
        });

        it('should not have channel yet.', function() {
            obj.should.not.have.property('_channel');
        });

        it('can not subscribe without a channel.', function() {
            (function() {
                obj.subscribe('*', function() {});
            }).should.throwError();
        });

        it('can not publish without a channel.', function() {
            (function() {
                obj.publish('topic', 'message');
            }).should.throwError();
        });

        it('can have a channel.', function() {
            obj.channel('lorem');
            obj.should.have.property('_channel');
        });

        it('can publish but does nothing without a consumer.', function() {
            published = false;
            obj.publish('topic', 'message');
            published.should.equal(false);
        });

        it('can subscribe with a channel.', function() {
            sub = obj.subscribe('*', consumer);
            sub.should.be.a('object');
            sub.should.have.property('channel', 'lorem');
            sub.should.have.property('topic', '*');
            sub.should.have.property('callback', consumer);
            sub.should.have.property('unsubscribe');
        });

        it('can publish with a channel.', function() {
            published = false;
            obj.publish('topic', 'message');
            published.should.equal(true);
        });

        it('can unsubscribe.', function() {
            published = false;
            sub.unsubscribe();
            obj.publish('topic', 'message');
            published.should.equal(false);
        });
    });
});
