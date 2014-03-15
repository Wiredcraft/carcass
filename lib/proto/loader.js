var accessor;

accessor = require('../helpers/accessor');


/**
 * Mixin this so your object / instance can become a "loader", which can have a
 *   source, a parser, and can load the source with the parser.
 *
 * @type {Object}
 */

module.exports = {
  source: accessor('_source'),
  parser: accessor('_parser'),

  /**
   * Reload from source. Parse source if a parser is available.
   *
   * @return {value}
   */
  reload: function() {
    var parser, source;
    source = this.source();
    if (source == null) {
      return;
    }
    parser = this.parser();
    if (parser != null) {
      return parser(source);
    } else {
      return source;
    }
  }
};
