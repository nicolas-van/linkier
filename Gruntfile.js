module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app.js'],
        dest: 'app-concat.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'app.min.js': ['app-concat.js']
        }
      }
    },
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
    watch: {
      files: ['style.less'],
      tasks: ['less']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('dev', ['less']);

  grunt.registerTask('dist', ['test', 'less', 'concat', 'uglify']);

  grunt.registerTask('default', ['dev']);

};