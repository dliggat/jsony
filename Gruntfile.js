/*global module */
module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'tests/spec/**/*.js'],

      options: {
        jshintrc: true
      },
    },

    requirejs: {
      production: {
        options: {
          optimize: 'none',
          baseUrl: "src",
          name: '../node_modules/almond/almond',
          include: ['main'],
          out: 'dist/jsony.js',
        }
      }
    },

    uglify: {
      minified: {
        files: {
          'dist/jsony.min.js': ['dist/jsony.js']
        }
      },
      beautiful: {
        options: {
          compress: false,
          mangle: false,
          preserveComments: false,
          beautify: true,
        },
        files: {
          'dist/jsony.js': ['dist/jsony.js']
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/**/*.js', 'tests/**/*'],
        tasks: ['test'],
      },
    },

    mocha: {
      options: {
        run: false
      },
      test: {
        src: ['tests/*.html'],
      }
    },

  });

  grunt.registerTask('default', [
    'jshint',
    'build',
    'uglify:beautiful', // beautify first
    'uglify:minified'
  ]);

  grunt.registerTask('build', [
    'requirejs',
  ]);

  grunt.registerTask('test', [
    'build',
    // 'mocha',
  ]);

};
