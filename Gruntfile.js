module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            sass: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass', 'postcss']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['eslint', 'uglify']
            },
            livereload: {
                options: { livereload: true },
                files: ['dist/**/*']
            }
        },
        sass: {
            dev: {
                expand: true,
                cwd: 'src/scss',
                src: ['**/*.scss'],
                dest: 'dist',
                ext: '.css',
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                }
            },
            prod: {
               expand: true,
                cwd: 'src/scss',
                src: ['**/*.scss'],
                dest: 'dist',
                ext: '.min.css',
                options: {
                    style: 'compressed',
                    sourcemap: 'auto'
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core')({browsers: 'last 2 versions'})
                ]
            },
            dev: {
                src: 'dist/style.css'
            },
            prod: {
                src: 'dist/style.min.css',
                map: true
            }
        },
        uglify: {
            dev: {
                options: {
                    mangle: false,
                    beautify: true,
                    preserveComments: 'all',
                    compress: false
                },
                files: {
                    'dist/script.js': ['src/js/**/*.js']
                }
            },
            prod: {
                options: {
                    sourceMap: true,
                },
                files: {
                    'dist/script.min.js': ['src/js/**/*.js']
                }
            }
        },
        eslint: {
            target: ['src/js/**/*.js']
        }
    });

    grunt.registerTask('build', 'Build current project version', ['eslint', 'uglify', 'sass', 'postcss'])
    grunt.registerTask('default', 'Build development version and run watch server', ['build', 'watch']);
};
