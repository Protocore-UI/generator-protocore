module.exports = function(grunt) {
    'use strict';

    /**
     * Require it at the top and pass in the grunt instance
     */
    require('time-grunt')(grunt);

    /**
     * Setup configuration
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('config/banner.json'),
        buildTags: "/* Project Name : <%= pkgAppName %> Release version : <%= pkgAppVersion %> */",

        configuredFiles: grunt.file.readJSON('config/servefiles.json'),
        
        clean: {
            build: ['prod']
        },
        shell: {
            uglify: {
                command: [
                    'node src/bower_components/rjs/dist/r.js -o config/build/optimize-build.js',
                    'node src/bower_components/rjs/dist/r.js -o config/build/copy-build.js',
                    'rm src/main-optimize.js',
                    'rm prod/main.js',
                    'mv prod/main-optimize.js prod/main.js'
                ].join('&&')
            }
        },
        usebanner: {
            buildTags: {
                options: {
                    position: 'top',
                    banner: '<%= buildTags %>',
                    linebreak: true
                },
                files: {
                    src: '<%= cfUsebanner %>'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: 'config/lints/.jshintrc',
                ignores: '<%= cfJshintIgnore %>'
            },
            all: '<%= cfJshintFiles %>'
        },
        jscs: {
            options: {
                config: 'config/lints/.jscsrc'
            },
            src: '<%= cfJscsFiles %>',
        },
        jsonlint: {
            files: {
                src: '<%= cfJsonlint %>'
            }
        },
        csslint: {
            strict: {
                options: {
                    csslintrc: 'config/lints/.csslintrc',
                    ignores: '<%= cfCsslintIgnore %>'
                },
                src: '<%= cfCsslintFiles %>'
            }
        },
        htmlhint: {
            Root_HTML_Files: {
                options: {
                    htmlhintrc: 'config/lints/.htmlhint-n-rc',
                    ignores: '<%= cfHtmlhintRoot_HTML_FilesIgnore %>'
                },
                src: '<%= cfHtmlhintRoot_HTML_FilesFiles %>'
            },
            Templates: {
                options: {
                    htmlhintrc: 'config/lints/.htmlhint-t-rc',
                    ignores: '<%= cfHtmlhintTemplatesIgnore %>'
                },
                src: '<%= cfHtmlhintTemplatesFiles %>'

            }
        },
        less: {
            readyMade: {
                options: {
                    compress: true
                },
                files: '<%= cfLessReadyMadeFiles %>'
            },
            customMade: {
                options: {
                    compress: false
                },
                files: '<%= cfLessCustomMadeFiles %>'
            },
            prod: {
                options: {
                    compress: true
                },
                files: '<%= cfLessCustomMadeFiles %>'
            }
        },
        watch: {
            less: {
                options: {
                    spawn: false
                },
                files: '<%= cfWatchLessFiles %>',
                tasks: ['less:customMade']
            }
        },
        qunit: {
            options: {
                '--web-security': 'no',
                coverage: {
                    src: ['src/**/*.js'],
                    instrumentedFiles: 'temp/',
                    htmlReport: 'report/coverage',
                    coberturaReport: 'report/'
                }
            },
            all: ['tests/**/*.html']
        },
        strip: {
            main: {
                src: 'prod/src/apps/**/*.js',
                options: {
                    inline: true,
                    nodes: ['console.log', 'debug']
                }
            }
        },
        autoprefixer: {
            options: {
                'browsers': ['last 2 versions']
            },
            multiple: {
                expand: true,
                flatten: true,
                src: 'src/stylesheets/css/common/*.css',
                dest: 'src/stylesheets/css/common/'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: '<%= cfHtmlminFiles %>'
            }
        }
    });

    /**
     * Load tasks
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-strip');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-banner');

    /**
     * Define tasks : Tasks for development eco - system.
     */
    grunt.registerTask('default', [
        'htmlhint',
        'jsonlint',
        'jscs',
        'jshint',
        'compileLessDev',
        'autofix',
        'csslint'
    ]);
    grunt.registerTask('dev', ['default']); // Alias for `default`.

    /**
     * Define tasks : Tasks for build eco - system.
     */
    grunt.registerTask('build', [
        'htmlhint',
        'jsonlint',
        'jscs',
        'jshint',
        'compileLessProd',
        'autofix',
        'csslint',
        'clean',
        'strip',
        'shell',
        'htmlmin',
        'usebanner'
    ]);

    /**
     * Define tasks : Tasks for less:compilation watch, Also alias for `watch`
     */
    grunt.registerTask('watchless', ['watch:less']);
    
    /**
     * Define sub-tasks : Tasks for Less compilation for development.
     */
    grunt.registerTask('compileLessDev', ['less:readyMade', 'less:customMade']);

    /**
     * Define sub-tasks : Tasks for Less compilation for production.
     */
    grunt.registerTask('compileLessProd', ['less:readyMade', 'less:prod']);

    /**
     * Define sub-tasks : Alias for `autofix`
     */
    grunt.registerTask('autofix', ['autoprefixer']);

    /**
     * Define sub-tasks : Alias for `tests`
     */
    grunt.registerTask('tests', ['qunit']);

};