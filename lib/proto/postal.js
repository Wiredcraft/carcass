var debug = require('debug')('carcass:proto:postal');

var postal = require('postal')(require('underscore'));

/**
 * Postal.
 * 
 * Makes it a Pub/Sub channel.
 * 
 * @see https://github.com/postaljs/postal.js
 */
module.exports = {
    _postal: postal,
    subscribe: subscribe,
    publish: publish,
    channel: channel
};

/**
 * Accessor.
 * 
 * @return {channel | this}
 */
function channel(name) {
    // TODO: if (!this._channel) {}
    if (0 == arguments.length) return this._channel;
    this._channel = postal.channel.apply(postal, arguments);
    return this;
}

function publish() {}

function subscribe() {}
