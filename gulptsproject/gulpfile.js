const gulp = require("gulp");
const tsgulp = require("gulp-typescript");
const tsProject = tsgulp.createProject("tsconfig.json");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const gulpBrowserify = require("gulp-browserify");
const watchify = require("watchify");
const tsify = require("tsify");
const browserSync = require("browser-sync");
const browserify = require("browserify");
const reload = browserSync.reload;
const gutil = require("gulp-util");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

const watchedBrowserify = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/index.ts"],
    cache: {},
    packageCache: {},
  }).plugin(tsify)
);

const build = function () {
  return browserify({
    basedir: ".",
    debug: true,
    entries: ["src"],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .transform("babelify", {
      presets: ["@babel/preset-env"],
      extensions: [".ts"],
    })
    .bundle()
    .pipe(source("index.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"))
    .pipe(reload({ stream: true }));
};

gulp.task("watch", build);

gulp.task("serve", function () {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: "index.html",
    },
    port: 8050,
  });
});

gulp.task("default", build);

watchedBrowserify.on("update", build);
watchedBrowserify.on("log", gutil.log);
