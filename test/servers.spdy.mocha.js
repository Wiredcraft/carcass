var carcass = require('../../carcass');
var should = require('should');
var debug = require('debug')('carcass:test:servers:spdy');
var request = require('request');
var fs = require('fs');

// console.log(carcass.servers.Spdy())
//### use the command to gen ssh keys 
//### --------------------------------
//### mkdir keys
//### openssl genrsa -des3 -out keys/server.orig.key 2048
//### openssl rsa -in keys/server.orig.key -out keys/server.key
//### openssl req -new -key keys/server.key -out keys/server.csr
//### openssl x509 -req -days 365 -in keys/server.csr -signkey keys/server.key -out keys/server.crt
//### ---------------------------------------------
describe('Spdy Server', function() {
    it('should be contain a property spdy', function(done){
        carcass.servers.should.have.property('Spdy');
        done();
    });
    var server = new carcass.servers.Spdy();
    server.app.use('/', function(req, res, next){
        res.write('helloworld');
        next();
    });

    describe('create server ', function(){
        it('should create a spdy server ', function(done){
            var options = { 
                key: fs.readFileSync('./fixture/keys/server.key'),
                cert: fs.readFileSync('./fixture/keys/server.crt'),
                ca: fs.readFileSync('./fixture/keys/server.csr')
            };
            server.start(options, function(){
                request.get('https://127.0.0.1:4000', function(err, res, body){
                    if(err) debug('err', err);
                    debug('res', res);
                    debug('body', body);
                    body.should.equal('helloworld');
                    done();
                });
            });
        })
    });

   describe('destory server ', function(){
        it('should create a spdy server ', function(done){
            server.close(function(){
                done();
            });
        });
    });
});
