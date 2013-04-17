var carcass = require('carcass');
var should = require('should');

require('./fixture');

describe('Factories / Express', function() {
    it('should be an object.', function(done) {
        carcass.factories.should.have.property('Express');
        done();
    });

    describe('builder function', function() {
    	it('should be function', function(done) {
    		carcass.factories.Express().should.be.a('function');
    		done();
    	});

    	it('should return an Express object.', function(done) {
    		var builer = carcass.factories.Express();
    		var obj = builer();
    		obj.should.be.a('function');
    		obj.should.have.property('name');
    		obj.name.should.eql('app');
    		done();
    	});

    	it('should accept options.', function(done) {
    		var builer = carcass.factories.Express({
    			initialize: function(app, options) {
    				options.should.have.property('property', 'val');
    			}
    		});
    		builer({
    			'property': 'val'
    		});
    		done();
    	});
    });

    describe('initializer', function() {
    	it('should accept initializer as function arg.', function(done) {
    		var val = null;
    		var builer = carcass.factories.Express(function(app, options) {
    			val = 'val';
    		});
    		builer();
    		val.should.eql('val');
    		done();
    	});

    	it('should accept initializer in function arg.', function(done) {
    		var val = null;
    		var builer = carcass.factories.Express({
    			initialize: function() {
    				val = 'val';
    			}
    		});
    		builer();
    		val.should.eql('val');
    		done();
    	});

    	it('should get options.', function(done) {
    		var builer = carcass.factories.Express({
    			property: 'val',
    			initialize: function(app, options) {
    				options.should.have.property('property');
    			}
    		});
    		builer();
    		done();
    	});
    });

    describe('options / args', function() {
    	it('initialize should see keys from args.', function(done) {
    		var builer = carcass.factories.Express({
    			key: 'val',
    			initialize: function(app, options) {
    				options.should.have.property('key', 'val');
    			}
    		});
    		done();
    	});

    	it('should properly mixed, initialize excluded.', function(done) {
    		var builer = carcass.factories.Express({
    			property: 'val',
    			initialize: function(app, options) {
    				options.should.not.have.property('initialize');
    				options.should.have.property('property', 'val');
    				options.should.have.property('key', 'val');
    			}
    		});
    		builer({
    			'key': 'val'
    		});
    		done();
    	});

    	it('should rely on options if there\'re duplicate keys', function(done) {
    		var builer = carcass.factories.Express({
    			key: 'args',
    			initialize: function(app, options) {
    				options.should.have.property('key');
    				options.key.should.eql('options');
    			}
    		});
    		builer({
    			key: 'options'
    		});
    		done();
    	});
    });
});
