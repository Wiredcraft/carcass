var debug = require('debug')('carcass:proto:loaderSync');

var isCallable = require('es5-ext/lib/Object/is-callable');

// Loader
// ---
// The synchronous version.
module.exports = {
    source: source,
    parser: parser,
    reload: reload,
    get: get
};

/**
 * Get value. Use cache if available.
 * 
 * @return {value}
 */
function get() {
    // FIXME: doesn't work without cache.
    var value = isCallable(this.cacheGet) && this.cacheGet();
    if (null != value) return value;
    return this.reload();
}

/**
 * Reload from source. Parse source if a parser is available. Save to cache if
 * available.
 * 
 * @return {value}
 */
function reload() {
    if (null == this._source) return null;
    var value = isCallable(this._parser) ? this._parser(this._source)
        : this._source;
    if (isCallable(this.cacheSet)) this.cacheSet(value);
    return value;
}

/**
 * Accessor.
 * 
 * @return {parser | this}
 */
function parser(_parser) {
    if (0 == arguments.length) return this._parser;
    // TODO: valid-callable?
    this._parser = _parser;
    return this;
}

/**
 * Accessor.
 * 
 * @return {source | this}
 */
function source(_source) {
    if (0 == arguments.length) return this._source;
    // TODO: valid-value?
    this._source = _source;
    return this;
}
