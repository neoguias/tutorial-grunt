module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Aquí creamos las tareas
    sass: {
      dist: {
        options: {
          sourcemap: 'none',
        },
        files: [
          {
            expand: true,
            cwd: 'sass',
            src: ['**/*.scss'],
            dest: 'css',
            ext: '.css',
          },
        ],
      },
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions'],
          }),
        ],
      },
      dist: {
        src: 'css/estilos.css',
      },
    },
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: 'css',
            src: ['*.css', '!*.min.css'],
            dest: 'css',
            ext: '.min.css',
          },
        ],
      },
    },
    uglify: {
      build: {
        src: ['src/*.js'],
        dest: 'js/scripts.min.js',
      },
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'postcss', 'cssmin'],
      },
      js: {
        files: '**/*.js',
        tasks: ['uglify'],
      },
    },
  });

  // Cargamos los plugins de grunt
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Registramos la tareas
  grunt.registerTask('default', ['watch']);
}