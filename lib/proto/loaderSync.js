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
    var value = this.cacheGet && this.cacheGet();
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
    var value = this._parser ? this._parser(this._source) : this._source;
    this.cacheSet && this.cacheSet(value);
    return value;
}

/**
 * Accessor.
 * 
 * @return {parser | this}
 */
function parser(_parser) {
    if (0 === arguments.length) return this._parser;
    this._parser = _parser;
    return this;
}

/**
 * Accessor.
 * 
 * @return {source | this}
 */
function source(_source) {
    if (0 === arguments.length) return this._source;
    this._source = _source;
    return this;
}
