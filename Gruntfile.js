module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*!\n' +
          'Pikaday 2 - <%= pkg.version %>\n' +
          'Copyright (c) 2014 David Bushell\n' +
          'Copyright (c) 2015 Nathan Cahill\n' +
          'BSD & MIT license\n' +
          'https://github.com/nathancahill/Pikaday2\n' +
          '*/\n'
      },
      pikaday2: {
        files: {
          'dist/pikaday2.min.js': ['dist/pikaday2.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
}
