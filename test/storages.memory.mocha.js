var carcass = require('carcass');
var should = require('should');

describe('Storages / Memory:', function() {
    it('should be a function.', function() {
        carcass.storages.should.have.property('memory');
        carcass.storages.memory.should.be.a('function');
    });

    it('should return an object.', function() {
        carcass.storages.memory().should.be.a('object');
    });

    describe('A storage', function() {
        var storage = carcass.storages.memory();

        it('should save with an id.', function(done) {
            storage.put({
                id: 'lorem',
                attr: 'ipsum'
            }, function(err, data) {
                should.not.exist(err);
                data.should.be.a('object');
                data.should.have.property('id', 'lorem');
                data.should.have.property('_id', 'lorem');
                data.should.have.property('attr', 'ipsum');
                done();
            });
        });

        it('should save without an id.', function(done) {
            storage.put({}, function(err, data) {
                should.not.exist(err);
                data.should.be.a('object');
                data.should.not.have.property('id');
                data.should.have.property('_id');
                done();
            });
        });

        it('should read with an id.', function(done) {
            storage.get({
                id: 'lorem'
            }, function(err, data) {
                should.not.exist(err);
                data.should.be.a('object');
                data.should.have.property('id', 'lorem');
                data.should.have.property('_id', 'lorem');
                data.should.have.property('attr', 'ipsum');
                done();
            });
        });

        it('should read with an id.', function(done) {
            storage.get({
                _id: 'lorem'
            }, function(err, data) {
                should.not.exist(err);
                data.should.be.a('object');
                data.should.have.property('id', 'lorem');
                data.should.have.property('_id', 'lorem');
                data.should.have.property('attr', 'ipsum');
                done();
            });
        });

        it('should read with an id.', function(done) {
            storage.get('lorem', function(err, data) {
                should.not.exist(err);
                data.should.be.a('object');
                data.should.have.property('id', 'lorem');
                data.should.have.property('_id', 'lorem');
                data.should.have.property('attr', 'ipsum');
                done();
            });
        });

        it('should not read without an id.', function(done) {
            storage.get({}, function(err, data) {
                should.exist(err);
                should.not.exist(data);
                done();
            });
        });

        it('should not read with a wrong id.', function(done) {
            storage.get({
                id: 'ipsum'
            }, function(err, data) {
                should.exist(err);
                should.not.exist(data);
                done();
            });
        });

        it('should not read with a wrong id.', function(done) {
            storage.get({
                _id: 'ipsum'
            }, function(err, data) {
                should.exist(err);
                should.not.exist(data);
                done();
            });
        });

        it('should not read with a wrong id.', function(done) {
            storage.get('ipsum', function(err, data) {
                should.exist(err);
                should.not.exist(data);
                done();
            });
        });

        it('should update with an id.', function(done) {
            storage.put({
                id: 'lorem',
                attr: 'dolor'
            }, function(err, data) {
                should.not.exist(err);
                data.should.be.a('object');
                data.should.have.property('id', 'lorem');
                data.should.have.property('_id', 'lorem');
                data.should.have.property('attr', 'dolor');
                done();
            });
        });

        it('should have been updated.', function(done) {
            storage.get({
                id: 'lorem'
            }, function(err, data) {
                should.not.exist(err);
                data.should.be.a('object');
                data.should.have.property('id', 'lorem');
                data.should.have.property('_id', 'lorem');
                data.should.have.property('attr', 'dolor');
                done();
            });
        });

        it('should delete with an id.', function(done) {
            storage.del({
                id: 'lorem'
            }, function(err, data) {
                should.not.exist(err);
                should.not.exist(data);
                done();
            });
        });

        it('should have been deleted.', function(done) {
            storage.get({
                id: 'lorem'
            }, function(err, data) {
                should.exist(err);
                should.not.exist(data);
                done();
            });
        });

        it('should delete with an id.', function(done) {
            storage.put({
                id: 'lorem'
            }, function(err, data) {
                should.not.exist(err);
                storage.del({
                    _id: 'lorem'
                }, function(err, data) {
                    should.not.exist(err);
                    should.not.exist(data);
                    done();
                });
            });
        });

        it('should have been deleted.', function(done) {
            storage.get({
                id: 'lorem'
            }, function(err, data) {
                should.exist(err);
                should.not.exist(data);
                done();
            });
        });

        it('should delete with an id.', function(done) {
            storage.put({
                id: 'lorem'
            }, function(err, data) {
                should.not.exist(err);
                storage.del('lorem', function(err, data) {
                    should.not.exist(err);
                    should.not.exist(data);
                    done();
                });
            });
        });

        it('should have been deleted.', function(done) {
            storage.get({
                id: 'lorem'
            }, function(err, data) {
                should.exist(err);
                should.not.exist(data);
                done();
            });
        });

        it('should not delete with a wrong id.', function(done) {
            storage.del({
                id: 'lorem'
            }, function(err, data) {
                should.exist(err);
                should.not.exist(data);
                done();
            });
        });
    });

    describe('A storage with an id', function() {
        var storage = carcass.storages.memory({
            id: 'lorem'
        });

        it('should be an object.', function() {
            storage.should.be.a('object');
        });

        it('should same with another with a same id.', function() {
            storage.should.equal(carcass.storages.memory({
                id: 'lorem'
            }));
        });

        it('should not same with another with a different id.', function() {
            storage.should.not.equal(carcass.storages.memory({
                id: 'ipsum'
            }));
        });

        it('should save.', function(done) {
            storage.put({
                id: 'lorem',
                attr: 'ipsum'
            }, function(err, data) {
                should.not.exist(err);
                data.should.be.a('object');
                data.should.have.property('id', 'lorem');
                data.should.have.property('_id', 'lorem');
                data.should.have.property('attr', 'ipsum');
                done();
            });
        });

        it('should read.', function(done) {
            storage.get({
                id: 'lorem'
            }, function(err, data) {
                should.not.exist(err);
                data.should.be.a('object');
                data.should.have.property('id', 'lorem');
                data.should.have.property('_id', 'lorem');
                data.should.have.property('attr', 'ipsum');
                done();
            });
        });

        it('should allow a same instance to read.', function(done) {
            carcass.storages.memory({
                id: 'lorem'
            }).get({
                id: 'lorem'
            }, function(err, data) {
                should.not.exist(err);
                data.should.be.a('object');
                data.should.have.property('id', 'lorem');
                data.should.have.property('_id', 'lorem');
                data.should.have.property('attr', 'ipsum');
                done();
            });
        });

        it('should not allow a different instance to read.', function(done) {
            carcass.storages.memory({
                id: 'ipsum'
            }).get({
                id: 'lorem'
            }, function(err, data) {
                should.exist(err);
                should.not.exist(data);
                done();
            });
        });
    });
});
