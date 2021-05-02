// var gulp = require("gulp");
// var sass = require("gulp-sass");
// var autoprefixer = require("gulp-autoprefixer");
// var plumber = require("gulp-plumber");
// var browserSync = require("browser-sync");

// // Compile sass into CSS & auto-inject into browsers
// gulp.task("sass", function () {
//   gulp
//     .src(["node_modules/bootstrap/scss/bootstrap.scss", "scss/main.scss"])
//     .pipe(plumber())
//     .pipe(
//       sass({
//         includePaths: ["scss"],
//       })
//     )
//     .pipe(gulp.dest("css"))
//     .pipe(autoprefixer())
//     .pipe(browserSync.stream());
// });

// // Move the javascript files into our /src/js folder
// gulp.task("js", function () {
//   return gulp
//     .src([
//       "node_modules/bootstrap/dist/js/bootstrap.min.js",
//       "node_modules/jquery/dist/jquery.min.js",
//       "node_modules/tether/dist/js/tether.min.js",
//     ])
//     .pipe(gulp.dest("js"))
//     .pipe(browserSync.stream());
// });

// // Static Server + watching scss/html files
// gulp.task("browser-sync", function () {
//   browserSync.init(["css/*.css", "js/*.js"], {
//     server: {
//       baseDir: "./",
//     },
//   });
// });

// gulp.task("default", ["sass", "js", "browser-sync"], function () {
//   gulp.watch("scss/**/*.scss", ["sass"]);
//   gulp.watch("*.html").on("change", browserSync.reload);
// });

const { src, dest, series, parallel,watch } = require('gulp')
const del = require('del')


const browserSync = require('browser-sync').create()
const { reload } = require('browser-sync')
const sass = require('gulp-sass')

const origin = 'src'
const destination = 'build'

sass.compiler = require('node-sass')
async function clean(cb) {
  await del(destination)
  cb()
}

function html(cb) {
  src(`${origin}/**/*.html`).pipe(dest(`${destination}`))
  cb()
}

function php(cb) {
  src(`${origin}/**/*.php`).pipe(dest(`${destination}`))
  cb()
}

function scss(cb) {
  src([`node_modules/bootstrap/scss/bootstrap.scss`, `${origin}/scss/main.scss`])
  .pipe(sass())
  .pipe(dest(`${destination}/css`))
  cb()
}

function image(cb) {
  src(`${origin}/image/**/**`).pipe(dest(`${destination}/image`))
  cb()
}
function icons(cb) {
  src(`${origin}/icons/**/*.svg`).pipe(dest(`${destination}/icons`))
  cb()
}

function css(cb) {
  src([
    `${origin}/css/bootstrap.css`,
    `${origin}/css/slick-theme.css`,
    `${origin}/css/slick.css`,
    `${origin}/css/star-rating-svg.css`,
    `${origin}/css/main.css`
  ]).pipe(dest(`${destination}/css`))
   cb()
  
}

function js(cb) {
  src(`${origin}/js/**/*.js`).pipe(dest(`${destination}/js`))
  cb()
}

function server(cb) {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: destination,
    },
  })
  cb()
}

function watcher(cb) {
  watch(`${origin}/**/*.php`).on('change', series(php, browserSync.reload))
  watch(`${origin}/**/*.html`).on('change', series(html, browserSync.reload))
  watch(`${origin}/css/**/*.css`).on('change', series(css, browserSync.reload))
  watch(`${origin}/icons/**/*.svg`).on('change',series(icons, browserSync.reload) )
   watch(`${origin}/image/**/**`).on('change', series(image, browserSync.reload))
    watch(`${origin}/scss/**/*.scss`).on('change', series(scss, browserSync.reload) )
  watch(`${origin}/js/**/*.js`).on('change', series(html, browserSync.reload))
  cb()
}

exports.default = series(clean, parallel(html, php, icons,image, scss, css, js),server, watcher)
