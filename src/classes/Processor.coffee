# debug = require('debug')('carcass:task')

require('highland-array')
mixable = require('../mixable')
stacker = require('../helpers/stacker')
processor = require('../helpers/processor')

###*
 * Represents a processor.
 *
 * A simple implement of proto/processor.
 *
 * @param *task
###
module.exports = class Processor
    ###*
     * Constructor.
    ###
    constructor: ->
        # Use arguments as tasks.
        @task(task) for task in arguments

    ###*
     * A stack of tasks.
     *
     * @type {Function}
    ###
    task: stacker('_tasks')

    ###*
     * The processor.
     *
     * @type {Function}
    ###
    _process: processor()

    ###*
     * Consume tasks with the processor.
    ###
    consume: (done) ->
        stream = @_process(@task().shiftToStream())
        return stream if not done?
        # stream.stopOnError(done)
        stream.on('error', done)
        stream.toArray((res) -> done(null, res))
        return @

###*
 * Mixins.
###
mixable(Processor)
