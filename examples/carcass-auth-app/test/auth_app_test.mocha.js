var superagent = require('superagent');
var should = require('should');

describe('Test auth application', function() {
	it('get /', function(done) {
		superagent
		.get('http://localhost:3000/')
		.end(function(err, res) {
			res.body.success.should.equal(true);
			done();
		})
	});

	it('register new user /register', function(done) {
		superagent
		.post('http://localhost:3000/register')
		.send({username : 'Alex', password : '123456'})
		.end(function(err, res) {
			res.body.username.should.equal('Alex');
			done();
		})
	});

	it('login user /login', function(done) {
		superagent
		.post('http://localhost:3000/login')
		.send({username : 'Alex', password: '123456'})
		.end(function(err, res) {
			res.body.username.should.equal('Alex');
			done();
		});
	})
})
