/* global authtoken */

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  grunt.initConfig({
    port: '8080', // Set your favorite port
    // Set your authtoken at Ngrok.com.
    authtoken: 'eY8MphrERwcqWT2MwFtK_2NhD97ducr6w9CKcfKNGm',
    browserSync: {
      bsFiles: {
        src: [
          'css/*.css',
          'js/*.js',
          'templates/*.html',
        ],
      },
      options: {
        watchTask: true,
        server: {
          baseDir: ['templates', 'css'],
        },
        port: '<%= port %>',
      },
    },
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: true,
            client: false,
          },
        },
        files: [{
          cwd: 'jade/templates',
          src: '*.jade',
          dest: 'templates/',
          expand: true,
          ext: '.html',
        },
      ],},
    },
    watch: {
      sass: {
        files: ['sass/{,*/}*.{scss,sass}'],
        tasks: ['sass', 'postcss'],
      },
      jade: {
        files: ['jade/{,*/}*.jade'],
        tasks: ['jade'],
      },
    },
    sass: {
      dist: {
        options: {
          style: 'expanded', // For compressed use 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.{scss,sass}'],
          dest: 'css',
          ext: '.css',
        },],
      },
    },
    postcss: {
      options: {
        map: {
          inline: false,
          annotation: 'css/maps/',
        },
        processors: [
          require('pixrem')(),
          require('autoprefixer')({browsers: 'last 2 versions'}),
          require('cssnano')({ zindex: false, calc: false}),
        ],
      },
      dist: {
        src: 'css/*.css',
      },
    },
    validation: {
      options: {
        reset: grunt.option('reset') || true,
        stoponerror: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'The Content-Type was “text/html”. Using the HTML parser.',
        ],
        generateReport: true,
        errorHTMLRootDir: 'report',
        useTimeStamp: true,
        doctype: 'HTML5',
        charset: 'utf-8',
      },
      files: {
        src: ['templates/*.html',],
      },
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc',
        formatters: [{
          id: 'text',
          dest: 'report/css-validation.txt',
        },],
      },
      strict: {
        src: ['css/*.css'],
      },
    },
    shell: {
      ngrokInstaller: {
        command: [
          'npm install ngrok -g',
          'ngrok authtoken <%= authtoken %>',
        ].join('&&'),
      },
      nrokLauncher: {
        command: 'echo Please run: ngrok http <%= port %>',
      },
    },
  })

  /* Load plugins  */

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-w3c-html-validation');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-galen');
  grunt.loadNpmTasks('grunt-postcss');

  /* Tasks  */

  // Ngrok
  grunt.registerTask('ngrok', ['shell:nrokLauncher']);

  // Validate HTML
  grunt.registerTask('validate', ['validation', 'csslint']);

  // Dev mode
  grunt.registerTask('start', ['browserSync', 'watch']);

  // Initial task
  grunt.registerTask('default', ['sass', 'jade','shell:ngrokInstaller']);

};
