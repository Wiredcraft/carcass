var debug = require('debug')('carcass:Plugin:ModelSync');

var carcass = require('carcass');

// .
function sync(method, data, fn) {
    var storage = this.storage || this.model.storage;
    if (!storage) return fn(new Error('no storage'));
    var op = function(_data, _fn) {
        _fn(new Error('invalid method'));
    };
    switch (method) {
    case 'remove':
    case 'delete':
        op = storage.del || op;
        break;
    case 'save':
    case 'create':
    case 'update':
        op = storage.put || op;
        break;
    case 'get':
    case 'read':
        op = storage.get || op;
        break;
    }
    op(data, fn);
};

// .
module.exports = function(Model) {
    Model.sync = Model.prototype.sync = sync;
};
