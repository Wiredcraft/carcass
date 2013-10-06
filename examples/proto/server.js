/**
 * Example of a typical server which can be setup and started with a "program"
 * (e.g. which mixin `examples.proto.program`).
 */

module.exports = {
    option: option,
    // Methods intend to be overridden.
    // @see `bootConfig()` in `program.js`
    config: null,
    // @see `bootServer()` in `program.js`
    start: null
};

/**
 * Server can prepare some options for the program.
 * 
 * @see `registerServer()` in `program.js`
 * 
 * Example:
 * 
 * <pre>
 * server.option('-L, --lorem', 'Run with lorem ipsum');
 * </pre>
 */
function option() {
    this.options.push(arguments);
    return this;
}

// TODO: server should have a ref to the program's config manager.
