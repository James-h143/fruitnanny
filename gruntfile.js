module.exports = function(grunt) {
  "use strict";
  grunt.initConfig({
    ts: {
      app: {
        src: ["server/**/*.ts"],
        options: {
          "target": "es6",
          "module": "commonjs",
          "moduleResolution": "node",
          "sourceMap": false,
          "types": ["body-parser", "ejs", "events", "express", "express-serve-static-core", "mime", "node", "range-parser", "serve-static"]
        }
      }
    },
    copy: {
      thirdparty: {
        files: [
          {
            src: "node_modules/hls.js/dist/hls.min.js",
            dest: "public/thirdparty/js/hls.min.js"
          }
        ]
      }
    },
    clean: ['server/**/*.js'],
    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: ["server/**/*.ts"]
      }
    },
    watch: {
      ts: {
        files: ["server/**/*.ts"],
        tasks: ["ts"],
        options: {
          livereload: true,
        },
      },
      htmls: {
        files: ["views/*", "public/**/*"],
        tasks: [],
        options: {
          livereload: true,
        },
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.registerTask("default", [
    "clean",
    "copy",
    "ts",
    "tslint"
  ]);
};
