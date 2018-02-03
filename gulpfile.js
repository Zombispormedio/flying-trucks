const gulp = require("gulp");
const webpack = require("webpack-stream");
const mjml = require("gulp-mjml");
const gulpHtmlToEs6 = require("./gulp-html-to-es6");
const del = require("del");
const runSequence = require("run-sequence");

gulp.task("mail", function() {
  return gulp
    .src("./src/mailer/template/*.mjml")
    .pipe(mjml())
    .pipe(
      gulpHtmlToEs6({
        concat: "index.js"
      })
    )
    .pipe(gulp.dest("./src/mailer/template"));
});

gulp.task("webpack", function() {
  return gulp
    .src(".")
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest("build/"));
});

gulp.task("clean", function() {
  return del(["build", "db.json", "./src/mailer/template/*.js", ".deploy.env"]);
});

gulp.task("default", function(cb) {
  runSequence("clean", "mail", "webpack", cb);
});
