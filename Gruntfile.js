/* global authtoken */

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({

		// Set your favorite port and your Ngrok.com authtoken before you run grunt start to install.

		port : '8080',
		authtoken : 'eY8MphrERwcqWT2MwFtK_2NhD97ducr6w9CKcfKNGm',

		browserSync: {
			bsFiles: {
				src : [
					'css/*.css',
					'js/*.js',
					'templates/*.html'
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: ['templates', 'css'],
				},
				port: '<%= port %>',
			}
		},
		jade: {
			compile: {
				options: {
					pretty : true,
					data: {
						debug: true,
						client: false
					}
				},
				files: [ {
					cwd: "jade/templates",
					src: "index.jade",
					dest: "templates/",
					expand: true,
					ext: ".html"
				} ]
			}
		},
		watch: {
			sass: {
				files: ['sass/{,*/}*.{scss,sass}'],
				tasks: ['sass']
			},
			jade: {
				files: ['jade/{,*/}*.jade'],
				tasks: ['jade']
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded',
					// style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: 'sass',
					src: ['*.{scss,sass}'],
					dest: 'css',
					ext: '.css'
				}]
			}
		},
		validation: {
		    options: {
		        reset: grunt.option('reset') || true,
		        stoponerror: true,
		        relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.',
							 'Using the schema for HTML with SVG 1.1, MathML 3.0, RDFa 1.1, and ITS 2.0 support.',
						 	 'The Content-Type was “text/html”. Using the HTML parser.'], //ignores these errors
		        generateReport: true,
		        errorHTMLRootDir: 'report',
		        useTimeStamp: true,
				doctype: 'HTML5',
				charset: 'utf-8'
		    },
		    files: {
		        src: ['templates/*.html',]
		    }
		},
		csslint: {
		  options: {
		    csslintrc: '.csslintrc',
			formatters: [
		      {id: 'text', dest: 'report/css-validation.txt'}
		    ]
		  },
		  strict: {
		    src: ['css/*.css']
		  }
		},
		shell: {
			ngrok_installer: {
				command:[
					'npm install ngrok -g',
					'ngrok authtoken <%= authtoken %>',
				].join('&&')
			},
			ngrok_launcher:{
				command: 'echo Please run: ngrok http <%= port %>',
			},
		}
	});

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

	/* Tasks  */

	// Ngrok
	grunt.registerTask('ngrok', ['shell:ngrok_launcher']);

	// Validate HTML
	grunt.registerTask('validate', ['validation', 'csslint']);

	// Dev mode
	grunt.registerTask('start', ['browserSync', 'watch']);

	// Initial task
	grunt.registerTask('default', ['sass', 'jade','shell:ngrok_installer']);

};
