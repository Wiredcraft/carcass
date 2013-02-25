var carcass = require('carcass');
var should = require('should');

describe('Http error', function() {
    it('should be a function.', function() {
        carcass.utils.should.have.property('httpError');
        (typeof carcass.utils.httpError).should.equal('function');
    });

    it('should have a shortcut.', function() {
        carcass.httpError.should.equal(carcass.utils.httpError);
    });

    it('should return an error.', function() {
        var err = carcass.httpError();
        (typeof err).should.equal('object');
        (err instanceof Error).should.equal(true);
        err.toString().should.equal('HTTP Error: 500 Internal Server Error');
    });

    it('can have a message.', function() {
        var err = carcass.httpError('Lorem ipsum');
        err.toString().should.equal('HTTP Error: 500 Lorem ipsum');
    });

    it('can have a status.', function() {
        var err = carcass.httpError(403);
        err.toString().should.equal('HTTP Error: 403 Forbidden');
    });

    it('can have a status and a message.', function() {
        var err = carcass.httpError(403, 'Requires login');
        err.toString().should.equal('HTTP Error: 403 Requires login');
    });

    it('can use an error.', function() {
        var err = carcass.httpError(new Error('Ipsum dolor'));
        err.toString().should.equal('HTTP Error: 500 Ipsum dolor');
    });

    it('can use an error with a status.', function() {
        var _err = new Error('Requires login');
        _err.status = 403;
        var err = carcass.httpError(_err);
        err.toString().should.equal('HTTP Error: 403 Requires login');
    });

    it('can use an error with a status.', function() {
        var err = carcass.httpError(403, new Error('Requires login'));
        err.toString().should.equal('HTTP Error: 403 Requires login');
    });
});
