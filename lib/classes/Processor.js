var Processor, mixable, processor, stacker;

require('highland-array');

mixable = require('../mixable');

stacker = require('../helpers/stacker');

processor = require('../helpers/processor');


/**
 * Represents a processor.
 *
 * A simple implement of proto/processor.
 *
 * @param *task
 */

module.exports = Processor = (function() {

  /**
   * Constructor.
   */
  function Processor() {
    var task, _i, _len;
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      task = arguments[_i];
      this.task(task);
    }
  }


  /**
   * A stack of tasks.
   *
   * @type {Function}
   */

  Processor.prototype.task = stacker('_tasks');


  /**
   * The processor.
   *
   * @type {Function}
   */

  Processor.prototype._process = processor();


  /**
   * Consume tasks with the processor.
   */

  Processor.prototype.consume = function(done) {
    var stream;
    stream = this._process(this.task().shiftToStream());
    if (done == null) {
      return stream;
    }
    stream.on('error', done);
    stream.toArray(function(res) {
      return done(null, res);
    });
    return this;
  };

  return Processor;

})();


/**
 * Mixins.
 */

mixable(Processor);
