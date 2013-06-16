module.exports = {
    use: use
};

/**
 * Simply add a layer to the stack.
 * 
 * @param layer
 * @return {this}
 */
function use(layer) {
    this.stack.push(layer);
    return this;
}
