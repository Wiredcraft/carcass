var carcass = require('carcass');
var should = require('should');
var path = require('path');

var stashRoot = path.resolve(require.resolve('carcass'), '../test/fixture',
    'stash');
var stashPath = path.resolve(stashRoot, 'lorems');

describe('Storages / Stash:', function() {
    it('should be a function.', function() {
        carcass.storages.should.have.property('stash');
        carcass.storages.stash.should.be.a('function');
    });

    it('should return an object.', function() {
        carcass.storages.stash().should.be.a('object');
    });

    describe('A storage without an id', function() {
        // TODO: should just fail.
        var storage = carcass.storages.stash();
    });

    describe('A storage with an id', function() {

        var storage = carcass.storages.stash({
            id: stashPath
        });

        describe('Install', function() {
            it('should be able to install', function(done) {
                storage.install(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        });

        describe('CRUD', function() {
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
                storage.get('', function(err, data) {
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

            it('should allow a same instance to read.', function(done) {
                carcass.storages.stash({
                    id: stashPath
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

            it('should not allow a different instance to read.',
                function(done) {
                    carcass.storages.stash({
                        id: 'ipsum'
                    }).get({
                        id: 'lorem'
                    }, function(err, data) {
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

        // TODO
        describe('CRUD with a given _id', function() {});

        // TODO
        describe('CRUD without an id', function() {});

        describe('Uninstall', function() {
            it('should fail to uninstall an unempty stash', function(done) {
                carcass.storages.stash({
                    id: stashRoot
                }).uninstall(function(err) {
                    should.exist(err);
                    err.should.be.a('object');
                    err.should.have.property('code', 'ENOTEMPTY');
                    setTimeout(done, 1);
                });
            });

            it('should be able to uninstall lorems', function(done) {
                storage.uninstall(function(err) {
                    should.not.exist(err);
                    setTimeout(done, 1);
                });
            });

            it('should be able to uninstall', function(done) {
                carcass.storages.stash({
                    id: stashRoot
                }).uninstall(function(err) {
                    should.not.exist(err);
                    setTimeout(done, 1);
                });
            });
        });
    });
});
