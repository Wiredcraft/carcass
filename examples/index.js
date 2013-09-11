var carcass = require('../');

carcass.mixable(exports);

exports.mixin(carcass.proto.register);

exports.register(__dirname, 'proto');
