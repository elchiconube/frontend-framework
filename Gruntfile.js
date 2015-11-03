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
			dist: {
				options: {
					style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: 'sass',
					src: ['*.{scss,sass}'],
					dest: 'css',
					ext: '.css'
				}]
			}
		}
	});

	/* Load plugins  */
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-html');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');

	/* Task  */

	// Validate HTML
	grunt.registerTask('validate', ['clean','htmllint']);

	// Dev mode
	grunt.registerTask('start', ['browserSync', 'watch']);

	// Initial task
	grunt.registerTask('default', ['sass', 'jade']);

};
