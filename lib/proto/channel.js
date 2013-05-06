var debug = require('debug')('carcass:proto:channel');

var postal = require('../postal');

/**
 * Channel.
 * 
 * Makes it a Pub/Sub channel.
 * 
 * Prepared for a special use case, where...
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
 * Setter.
 * 
 * @return {channel | this}
 */
function channel(name) {
    if (0 == arguments.length) {
        if (!this._channel) this._channel = postal.channel();
    } else {
        this._channel = postal.channel.apply(postal, arguments);
    }
    return this;
}

/**
 * ...
 * 
 * @return {this}
 */
function publish() {
    this._channel.publish.apply(this._channel, arguments);
    return this;
}

/**
 * ...
 * 
 * @return subscription
 */
function subscribe() {
    return this._channel.subscribe.apply(this._channel, arguments);
}
