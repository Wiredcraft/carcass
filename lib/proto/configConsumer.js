var accessor = require('../helpers/accessor');

/**
 * Mixin this so your object / instance becomes a config consumer.
 *
 * The simplest way of using config is use a config manager directly. This proto
 *   is just a nice convention where a consumer is an instance of a certain
 *   class; it has an id, and only uses a subset of config from the manager.
 */
module.exports = {
    /**
     * A manager is an instance mixed in the configManger proto. Default to the
     *   global carcass.
     */
    configManager: accessor('_configManager', {
        getDefault: function() {
            return require('../..');
        }
    }),
    /**
     * A name is used to get the config from the manager.
     */
    configName: accessor('_configName', {
        getDefault: function() {
            // Default to instance id if available.
            if (this._id) return this._id;
            // Use the class name if available.
            if (this.constructor.name) return this.constructor.name;
        }
    }),
    config: config
};

/**
 * Retrieve config.
 */
function config() {
    var manager = this.configManager();
    if (!manager) return;
    var name = this.configName();
    if (!name) return;
    return manager.get(name);
}
