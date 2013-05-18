module.exports = Config;

/**
 * Builds a new config.
 * 
 * A config is only a loader. It loads JSON objects from a stack of sources,
 * merges them together, and returns the result. It only holds the source stack,
 * doesn't save the result.
 * 
 * @return config
 */
function Config() {

    function config() {
        return config.reload();
    }

    carcass.mixable(config);

    config.stack = [];

    config.mixin(carcass.proto.stack);

    config.mixin(Config.proto);

    return config;
};

Config.proto = {
    reload: reload
};

/**
 * ...
 * 
 * @return {Object}
 */
function reload() {
    var self = this;
    if (!self.stack || !self.stack.length) return {};
    return {};
}
