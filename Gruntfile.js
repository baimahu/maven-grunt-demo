module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // This will load in our package.json file so we can have access
        // to the project name and version number.
        pkg: grunt.file.readJSON('package.json'),

        // Constants for the Gruntfile so we can easily change the path for
        // our environments.
        BASE_PATH: './src/main/',
        DEVELOPMENT_PATH: './src/main/webapp/',
        PRODUCTION_PATH: './target/<%= pkg.name %>-<%= pkg.version %>/',

        // A code block that will be added to all our minified code files.
        // Gets the name and version from the above loaded 'package.json' file.
        banner: [
                 '/*',
                 '* Project: <%= pkg.name %>',
                 '* Version: <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)',
                 '* Development By: <%= pkg.developedBy %>',
                 '* Copyright(c): <%= grunt.template.today("yyyy") %>',
                 '*/'
        ],


        // The different constants name that will be use to build our html files.
        // Example: <!-- @if NODE_ENV == 'DEVELOPMENT' -->
        env: {
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            prod : {
                NODE_ENV : 'PRODUCTION'
            }
        },

        // Allows us to pass in variables to files that have place holders so we
        // can similar files with different data.
        // Example: <!-- @echo buildVersion --> or <!-- @echo filePath -->
        preprocess : {
            options : {
                context : {
                    buildVersion : '<%= pkg.version %>',
                    filePath : ''
                }
            },
            jsp_inf: {
                src: [ '<%=DEVELOPMENT_PATH%>' + 'WEB-INF/**/*.jsp'],
                options: {
                    inline: true
                }
            },
            // Task to create the HTML5 Cache Manifest.
            // Passes the app version and the current date into the
            // dev/offline/offline.manifest and creates prod/offline/offline.manifest.
            manifest : {
                src : '<%= DEVELOPMENT_PATH %>' + 'static/offline/offline.manifest',
                dest : '<%= PRODUCTION_PATH %>' + 'static/offline/offline.manifest',
                options : {
                    context : {
                        buildVersion : '<%= pkg.version %>',
                        timeStamp : '<%= grunt.template.today() %>'
                    }
                }
            }
        },

        // watch jsp inf folder's change, pre-process jsp files
        // into WEB-INF destination folder
        watch: {
            jsp_inf: {
                files: ['<%=DEVELOPMENT_PATH %>' + 'JSP-INF/**/*.jsp'],
                tasks: ['copy:jsp_inf', 'preprocess:jsp_inf']
            }
        },


        // After the preprocess plugin creates our /index.html we remove all comments
        // and white space from the file so it will be minified.
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%=PRODUCTION_PATH %>WEB-INF/sitemesh/basic-theme.jsp' : '<%=DEVELOPMENT_PATH %>WEB-INF/sitemesh/basic-theme.jsp',
                    '<%=PRODUCTION_PATH %>WEB-INF/pages/index.jsp' : '<%=DEVELOPMENT_PATH %>WEB-INF/pages/index.jsp',
                    '<%=PRODUCTION_PATH %>WEB-INF/pages/test.jsp' : '<%=DEVELOPMENT_PATH %>WEB-INF/pages/test.jsp'
                }
            }
        },

        // The RequireJS plugin that will use uglify2 to build and minify our
        // JavaScript, templates and any other data we include in the require files.
        requirejs: {
            compile: {
                options: {
                    baseUrl: '<%= DEVELOPMENT_PATH %>' + 'static/scripts/',                        // Path of source scripts, relative to this build file
                    mainConfigFile: '<%= DEVELOPMENT_PATH %>' + 'static/scripts/config.js',        // Path of shared configuration file, relative to this build file
                    name: 'AppBootstrap',                                                   // Name of input script (.js extension inferred)
                    out: '<%= PRODUCTION_PATH %>' + 'scripts/app.min.js',                   // Path of built script output

                    fileExclusionRegExp: /.svn/,                                            // Ignore all files matching this pattern
                    useStrict: true,
                    preserveLicenseComments: false,
                    pragmas: {
                        debugExclude: true
                    },

                    optimize: 'uglify2',                                                    // Use 'none' If you do not want to uglify.
                    uglify2: {
                        output: {
                            beautify: true,
                            comments: false
                        },
                        compress: {
                            sequences: false,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: false,
                        mangle: true
                    }
                }
            }
        },

        // Task jsmin
        uglify: {
            options: {
                mangle: true,
                beautify: false
            },
            mainjs: {
                options: {
                    sourceMap: '<%= PRODUCTION_PATH %>' + 'static/scripts/main-min.js.map',
                    sourceMappingURL: './main-min.js.map',
                    sourceMapRoot: 'http://dev.webdev.com:9001/', // the location to find your original source
                    banner: '<%= banner.join("\\n") %> \n'
                },
                files: {
                    '<%= PRODUCTION_PATH %>static/scripts/main.min.js': [
                        '<%= DEVELOPMENT_PATH %>' + 'static/scripts/App.js',
                        '<%= DEVELOPMENT_PATH %>' + 'static/scripts/test.js'
                    ]
                }
            },
            commjs: {
                options: {
                    sourceMap: '<%= PRODUCTION_PATH %>' + 'static/scripts/comm-min.js.map',
                    sourceMappingURL: './comm-min.js.map',
                    sourceMapRoot: 'http://dev.webdev.com:9001/'
                },
                files: {
                    '<%= PRODUCTION_PATH %>static/scripts/comm.min.js': [
                        '<%= DEVELOPMENT_PATH %>' + 'static/libs/jquery/jquery-1.9.1.js',
                        '<%= DEVELOPMENT_PATH %>' + 'static/libs/json.js'
                    ]
                }
            }
        },

        // Minifies our css files that we specify and adds the banner to the top
        // of the minified css file.
        cssmin: {
            main: {
                options: {
                    banner: '<%= banner.join("\\n") %>',
                    keepSpecialComments: 0                                                  // '*' for keeping all (default), 1 for keeping first one, 0 for removing all
                },
                files: {
                    '<%= PRODUCTION_PATH %>/static/styles/main.min.css': [
                        '<%= DEVELOPMENT_PATH %>' + 'static/styles/setup.css',
                        '<%= DEVELOPMENT_PATH %>' + 'static/styles/bootstrap.css'
                    ]
                }
            }
        },

        // Task imagemin
        imagemin: {

            dist: { // Target
                options: { // Target options
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: '<%= DEVELOPMENT_PATH %>' + 'static/images',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: '<%= PRODUCTION_PATH %>' + 'static/images'                  // Destination path prefix
                }]
            }
        },

        // Copies certain files over from the dev/ folder to the prod/ so we don't
        // have to do it manually.
        copy: {
            jsp_inf : {
                files : [
                    { expand : true, cwd : '<%=DEVELOPMENT_PATH%>'+'JSP-INF/pages', src : ['**'], dest : '<%=DEVELOPMENT_PATH%>'+'WEB-INF/pages'},

                    { expand : true, cwd : '<%=DEVELOPMENT_PATH%>'+'JSP-INF/sitemesh', src : ['**'], dest : '<%=DEVELOPMENT_PATH%>'+'WEB-INF/sitemesh'}
                ]
            },
            prod:  {
                files: [
                    // Copy favicon.ico file from dev/ to prod/.
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>'+'static/libs/require/', src: 'require.js', dest: '<%= PRODUCTION_PATH %>'+'static/scripts/' } ,
                    // Copy favicon.ico file from dev/ to prod/.
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: 'favicon.ico', dest: '<%= PRODUCTION_PATH %>' }
                ]
            }
        },

        // Takes the minified JavaScript file and adds the banner to the top.
        concat: {
            prod: {
                options: {
                    banner: '<%= banner.join("\\n") %> \n'
                },
                src: ['<%= PRODUCTION_PATH %>' + 'static/scripts/main.min.js'],
                dest: '<%= PRODUCTION_PATH %>' + 'static/scripts/main.min.js'
            }
        },

        // use for resource js listening
        connect: {
            server: {
                options: {
                    port: 9001,
                    keepalive: true,
                    base: '.'
                }
            }
        }

    });

    // Loads the necessary tasks for this Grunt file.
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // basic process
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // basic setting
    grunt.loadNpmTasks('grunt-env');
    // preprocess
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // watch file or folder change
    grunt.loadNpmTasks('grunt-contrib-watch');

    // connect to js resource
    grunt.loadNpmTasks('grunt-contrib-connect');


    // Grunt tasks.
    grunt.registerTask('default', ['env:prod','copy:jsp_inf','preprocess','htmlmin:dist', 'cssmin:main', 'uglify', 'imagemin','copy:prod']);
    grunt.registerTask('dev', ['env:dev','copy:jsp_inf','preprocess:jsp_inf']);

    grunt.registerTask('jsresource', ['connect']);

    // for dev
    // we can call 'grunt:watch' to listen jsp pages change
};
