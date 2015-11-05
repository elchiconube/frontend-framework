module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({
		browserSync: {
			dev: {
				bsFiles: {
					src : [
						'css/*.css',
						'templates/*.html'
					]
				},
				options: {
					watchTask: true,
					server: './templates'
				}
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
		        reset: grunt.option('reset') || false,
		        stoponerror: true,
		        relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.',
							 'Using the schema for HTML with SVG 1.1, MathML 3.0, RDFa 1.1, and ITS 2.0 support.',
						 	 'The Content-Type was “text/html”. Using the HTML parser.'], //ignores these errors
		        generateReport: true,
		        errorHTMLRootDir: 'report',
		        useTimeStamp: true
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
		}
	});

	/* Load plugins  */
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-w3c-html-validation');
	grunt.loadNpmTasks('grunt-contrib-csslint');

	/* Tasks  */

	// Validate HTML
	grunt.registerTask('validate', ['validation', 'csslint']);
	
	// Dev mode
	grunt.registerTask('start', ['browserSync', 'watch']);

	// Initial task
	grunt.registerTask('default', ['sass', 'jade']);

};
