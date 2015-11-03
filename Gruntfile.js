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
		htmllint: {
	      all:{
			  options: {
				  ignore: 'The “clear” attribute on the “br” element is obsolete. Use CSS instead.',
				  reporterOutput: 'test/html.txt'
			  },
			  src: "templates/*.html"
		  }
	    },
		clean: ["test/html.json"],
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
				tasks: ['sass','cssmin']
			},
			jade: {
				files: ['jade/{,*/}*.jade'],
				tasks: ['jade']
			}
		},
		sass: {
			options: {
				sourceMap: true,
				sourceMapEmbed: false,
				style: 'compressed'
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'sass',
					src: ['*.{scss,sass}'],
					dest: 'css',
					ext: '.css'
				}]
			}
		},
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'css',
		      src: ['*.css'],
		      dest: 'css',
		      ext: '.min.css'
		    }]
		  }
		}
	});

	/* Load plugins  */
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-html');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-clean');

	/* Task  */

	// ngrok

	// Validate HTML
	grunt.registerTask('validate', ['clean','htmllint']);

	// Dev mode
	grunt.registerTask('min', ['cssmin']);

	// Dev mode
	grunt.registerTask('default', ['browserSync', 'watch']);

};
