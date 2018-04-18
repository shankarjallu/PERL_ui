module.exports = function(grunt) {

    // grunt config options
    // add --env=dev in grunt command to output non-minified css/js paths in processhtml
    grunt.config('env', grunt.option('env') || 'prod');

    // Project configuration. Desktop base would be JS for header and footer
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        files:{
            src:{
                 js:['<%= pkg.js_src_path %>*.js'],
                sass:'<%= pkg.sass_src_path %>**/*.scss'
            },
            dest:{
                jsconcat:'<%= pkg.js_bundle_path %>highmark-desktop-base.js',
                jsmin:'<%= pkg.js_bundle_path %>highmark-base.min.js'
            }
        },
        html_imports: {
            all: {
                expand: true,
                src: 'pages/**/*.html',
                dest: 'tmp/'
            }
        },

        jshint:{
            files:['<%=files.src.js%>'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        watch:{
            liveReload:{
                files: ['pages/**/*.*', 'dotcom/**/*.*', 'includes/**/*.*','./*.html'],
                options: {
                    livereload: true
                }
            },
            js:{
                files:['<%=files.src.js%>*.js'],
                tasks:['jshint','concat','uglify']              
            },
            sass:{
                files:['<%=files.src.sass%>'],
                tasks:['sass']              
            },
            html:{
                files:['./pages/**/*.*'],
                tasks:['clean','html_imports']              
            }            
        },
       
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                src: ['<%=files.src.js%>'],
                dest: '<%=files.dest.jsconcat%>'
            },
            lib:{
                src:['<%= pkg.js_src_path %>lib/modernizr.3.3.1.js',
'<%= pkg.js_src_path %>lib/hoverIntent.js',
'<%= pkg.js_src_path %>lib/superfish.js',
'<%= pkg.js_src_path %>lib/jquery.matchHeight.js',
'<%= pkg.js_src_path %>lib/eluminate.js',
'<%= pkg.js_src_path %>lib/remodal.min.js',
'<%= pkg.js_src_path %>lib/slick.min.js',
// '<%= pkg.js_src_path %>lib/jquery-ui.min.js',               
 '<%= pkg.js_src_path %>lib/jquery.vEllipsis.min.js',

'<%= pkg.js_src_path %>lib/jquery.form.js',
'<%= pkg.js_src_path %>lib/jquery.ba-postMessage.js',
'<%= pkg.js_src_path %>lib/underscore-min-1.4.2.js',
'<%= pkg.js_src_path %>lib/jquery.history.js',
'<%= pkg.js_src_path %>lib/script.js'],
                dest:'<%= pkg.js_bundle_path %>lib.js'
            }
           
           
               
        },

        uglify:{
            js:{
                files: {
                    '<%=files.dest.jsmin%>': ['<%=files.dest.jsconcat%>'],
                        //   '<%= pkg.js_bundle_path %>jcp-homepage-bundle.min.js': ['<%= pkg.js_bundle_path %>jcp-homepage-bundle.js'], 
                    '<%= pkg.js_bundle_path %>lib.min.js': ['<%= pkg.js_bundle_path %>lib.js']
                }
            }
        },

        sass: {
            options:  (function() { 
                if (grunt.config('env') != 'dev') {
                    return {
                        sourcemap: 'none'
                    };
                }
            }()),
            dist: {
                files: {
                    // '<%= pkg.css_src_path %>jcp-header-footer.css': '<%= pkg.sass_src_path %>jcp-header-footer.scss',
                   
                    '<%= pkg.css_src_path %>jcp-desktop-base.css': '<%= pkg.sass_src_path %>jcp-desktop-base.scss',
                   
                }
            }
        },

        cssmin:{
            target:{
                files: {
                   
                    '<%= pkg.css_bundle_path %>jcp-desktop-base.min.css': '<%= pkg.css_src_path %>jcp-desktop-base.css'
                   

                }
            }
        },

        sasslint: {
            /* options: {
                configFile: 'config/.sass-lint.yml',
            },*/
            target: ['<%=files.src.sass%>']
        },

        connect: {
            server: {
                 options: {
                    port: 9000,
                    hostname: 'localhost',
                    livereload: true
                 }
            }
        },

        processhtml: (function() { 
            if (grunt.config('env') === 'dev') {
                return {
                    dev:  {
                        files: {
                            'pages/partials/_meta-output.html': ['pages/partials/_meta.html'],
                            'pages/partials/_meta-exacttarget-output.html': ['pages/partials/_meta-exacttarget.html'],
                            'pages/partials/_meta-perlcontent-output.html': ['pages/partials/_meta-perlcontent.html']
                           
                        }
                    }
                };
            } else {
                return {
                    prod:  {
                        files: {
                            'pages/partials/_meta-output.html': ['pages/partials/_meta.html'],
                            'pages/partials/_meta-exacttarget-output.html': ['pages/partials/_meta-exacttarget.html'],
                            'pages/partials/_meta-perlcontent-output.html': ['pages/partials/_meta-perlcontent.html']
                            
                        }
                    }
                };
            }
        }()),

        strip_code: {
            options: {
                blocks: [
                    {
                    start_block: "/* start-developmentonly-block */",
                    end_block: "/* end-developmentonly-block */"
                    }
                ]
            },
            your_target: {
                src: '<%= pkg.js_bundle_path %>/*.js'
            }
        },        

        clean: ['<%= pkg.js_bundle_path %>highmark-desktop-base.js','<%= pkg.js_bundle_path %>lib.js','tmp/**/*.html'],
        
    });            

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-html-imports');
    grunt.loadNpmTasks('grunt-strip-code');

    // Build solution
    grunt.registerTask('build', ['jshint','clean','concat','strip_code','uglify','sass','cssmin','processhtml','html_imports']);

    // Run server and watch for changes
    grunt.registerTask('default', ['build']);
    grunt.registerTask('run', ['build','connect','watch']);

};
