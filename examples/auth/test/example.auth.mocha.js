var superagent = require('superagent');
var should = require('should');

describe('Test auth application', function() {

    describe('test get method', function() {
        it('get /', function(done) {
            superagent
            .get('http://localhost:3000/')
            .end(function(err, res) {
                res.should.be.json;
                res.body.should.be.a('object').and.have.property('msg','welcome');
                done();
            })
        });
    })
    
    describe('test login', function() {

        it('login success /', function(done) {
            superagent
            .post('http://localhost:3000/login')
            .send({id : 'root', password : 'test'})
            .end(function(err, res) {
                res.should.be.json;
                res.body.should.be.a('object').and.have.property('login','success');;
                done();
            })
        });

        it('login fail /', function(done) {
            superagent
            .post('http://localhost:3000/login')
            .send({id : 'root', password : 'wrongPassword'})
            .end(function(err, res) {
                res.unauthorized.should.be.true;
                done();
            })
        });     
    })
    

})