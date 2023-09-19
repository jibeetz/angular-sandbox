module.exports = function (grunt) {
  require("time-grunt")(grunt);

  var options = {};

  options.filesToCopy = [
    "images/*",
    "partials/*",
    "data/*",
    "fonts/**",
    "assets/*",
    "tile.png",
    "tile-wide.png",
    "favicon.ico",
    "browserconfig.xml",
    "apple-touch-icon.png",
    "js/vendor/html5-3.6-respond-1.4.2.min.js",
  ];

  options.filesWatch = [
    "Gruntfile.js",
    "app/**/*",
    "!**/dist/**",
    "!**app/css/custom/main.css**",
    "!**app/css/style.css**",
    "!**app/js/script.js**",
  ];

  options.jsFiles = {
    "app/js/script.js": [
      "app/js/vendor/jquery-1.12.1.min.js",
      "app/js/vendor/bootstrap.min.js",
      "app/js/vendor/angular.min.js",
      "app/js/vendor/angular-resource.min.js",
      "app/js/vendor/angular-route.min.js",
      "app/js/vendor/angular-sanitize.min.js",
      "app/js/vendor/slick.min.js",
      "app/js/custom/main.js",
      "app/js/custom/app.js",
      "app/js/custom/controllers/page.js",
      "app/js/custom/controllers/home.js",
      "app/js/custom/controllers/events.js",
      "app/js/custom/factories/getData.js",
      "app/js/custom/directives/articles-init.js",
      "app/js/custom/directives/video-brightcove.js",
      "app/js/custom/directives/slider-init.js",
    ],
  };

  options.cssFiles = {
    "app/css/style.css": [
      "app/css/vendor/bootstrap.min.css",
      "app/css/vendor/slick.css",
      "app/css/custom/main.css",
    ],
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      all: ["Gruntfile.js", "app/js/custom/**/*.js"],
    },
    concat: {
      css: {
        files: [options.cssFiles],
      },
      js: {
        files: [options.jsFiles],
      },
    },
    uglify: {
      prod: {
        files: { "dist/js/script.js": "app/js/script.js" },
      },
    },
    less: {
      all: {
        files: { "app/css/custom/main.css": "app/css/custom/main.less" },
      },
    },
    cssmin: {
      all: {
        files: { "dist/css/style.css": "app/css/style.css" },
      },
    },
    watch: {
      scripts: {
        files: options.filesWatch,
        tasks: ["less", "concat:css", "concat:js"],
        options: {
          livereload: true,
        },
      },
    },
    connect: {
      server: {
        options: {
          port: 1337,
          base: ".",
          hostname: "0.0.0.0",
          protocol: "http",
          livereload: true,
          open: true,
        },
      },
    },
    copy: {
      main: {
        expand: true,
        cwd: "app/",
        src: options.filesToCopy,
        dest: "dist/",
      },
    },
    "string-replace": {
      inline: {
        files: [
          {
            expand: true,
            cwd: "app/",
            src: "index.html",
            dest: "dist/",
          },
        ],
      },
      options: {
        replacements: [
          {
            pattern:
              '    <script src="//localhost:35729/livereload.js"></script>',
            replacement: "",
          },
        ],
      },
    },
  });
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-string-replace");
  grunt.loadNpmTasks("grunt-contrib-connect");

  grunt.registerTask("serve", [
    "jshint",
    "less",
    "concat:css",
    "concat:js",
    "connect",
    "watch",
  ]);
  grunt.registerTask("build", [
    "jshint",
    "less",
    "concat:css",
    "concat:js",
    "copy",
    "uglify:prod",
    "cssmin",
    "string-replace",
  ]);
};
