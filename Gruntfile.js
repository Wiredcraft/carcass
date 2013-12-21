'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: ['*.js',
                'lib/**/*.js',
                'plugins/**/*.js',
                'test/**/*.js',
                'examples/**/*.js'
            ],
            options: {
                'jshintrc': '.jshintrc'
            }
        }
    });

    // Load plugins.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default tasks.
    grunt.registerTask('default', ['jshint']);
};
