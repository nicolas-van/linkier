module.exports = function(grunt) {

  var jsfiles = [
    "bower_components/underscore/underscore.js",
    "bower_components/URIjs/src/URI.js",
    "bower_components/jquery/jquery.js",
    "bower_components/bootstrap/bootstrap/js/bootstrap.js",
    "bower_components/lz-string/libs/lz-string-1.3.0.js",
    "bower_components/ace/build/src/ace.js",
    "bower_components/ace/build/src/mode-html.js",
    "app.js",
  ];

  var cssfiles = [
    "style.css",
  ];

  grunt.initConfig({
    jshint: {
      files: ['app.js'],
    },
    less: {
      dev: {
        options: {
          paths: ["."]
        },
        files: {
          "style.css": "style.less"
        }
      }
    },
    consolidate: {
      options: {
        engine: 'handlebars'
      },
      dev: {
        options: {
          local: {
            jsfiles: jsfiles,
            cssfiles: cssfiles,
          }
        },
        files: [{
          src: 'index.src.html',
          dest: 'index.html',
        }],
      },
      dist: {
        options: {
          local: {
            jsfiles: ["app.min.js"],
            cssfiles: ["style.min.css"],
          }
        },
        files: [{
          src: 'index.src.html',
          dest: 'index.tmp.html',
        }],
      },
    },
    watch: {
      less: {
        files: ['style.less'],
        tasks: ['less']
      },
      html: {
        files: ['index.src.html'],
        tasks: ['consolidate:dev']
      },
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: jsfiles,
        dest: 'app-concat.js'
      }
    },
    uglify: {
      dist: {
        options: {
          sourceMap: 'dist/app-source-map.js',
          sourceMappingURL: 'app-source-map.js',
        },
        files: {
          'dist/app.min.js': ['app-concat.js']
        }
      }
    },
    copy: {
      dist: {
        files: {
          "dist/app-concat.js": "app-concat.js",
        },
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/style.min.css': "style.css",
        }
      },
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': "index.tmp.html",
        }
      },
    },
    clean: {
      tmp: {
        src: ["app-concat.js", "index.tmp.html"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-consolidate');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('dev', ['less', 'consolidate:dev']);
  grunt.registerTask('watcher', ['dev', 'watch']);

  grunt.registerTask('dist', ['test', 'less', 'concat', 'uglify', 'copy', "cssmin", "consolidate:dist", "htmlmin", "clean:tmp"]);

  grunt.registerTask('default', ['dev']);

};