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
      options: {
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};