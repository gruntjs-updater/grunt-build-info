/*
 * grunt-build-info
 * https://github.com/r3b/grunt-build-info
 *
 * Copyright (c) 2014 ryan bridges
 * Licensed under the APLv2 license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= mochaTest.test.src %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },
    clean: {
      tests: ['tmp'],
    },
    build_info: {
      default_options: {
        options: {
          token: 'TEST'
        },
      },
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['test/**/*.js']
      }
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('test', ['clean', 'build_info', 'mochaTest']);
  grunt.registerTask('default', ['jshint', 'test']);
};
