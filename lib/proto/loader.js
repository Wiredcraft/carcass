var accessor = require('../helpers/accessor');

// Loader
// ---
module.exports = {
    source: accessor('_source'),
    parser: accessor('_parser'),
    reload: reload
};

/**
 * Reload from source. Parse source if a parser is available.
 *
 * @return {value}
 */
function reload() {
    if (null == this._source) return null;
    var value = this._parser ? this._parser(this._source) : this._source;
    return value;
}
