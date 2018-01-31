const gulp = require("gulp");
const webpack = require("webpack-stream");
const mjml = require("gulp-mjml");
const gulpHtmlToEs6 = require("./gulp-html-to-es6");
const del = require("del");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const runSequence = require("run-sequence");
const sourcemaps = require("gulp-sourcemaps");
const file = require("gulp-file");
const shell = require("gulp-shell");

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

gulp.task("uglify", function() {
  return gulp
    .src("build/*.js")
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(sourcemaps.write("maps"))
    .pipe(gulp.dest("build/min/"));
});

gulp.task("clean", function() {
  return del(["build", "db.json", "./src/mailer/template/*.js", ".deploy.env"]);
});

const createDeployEnv = () =>
  `
OMNIBUS_URL=${process.env.OMNIBUS_URL}
MONGODB_URL=${process.env.MONGODB_URL}
DEFAULT_PATHNAME=${process.env.DEFAULT_PATHNAME}
SENDGRID_API_KEY=${process.env.SENDGRID_API_KEY}
DB_TYPE=${process.env.DB_TYPE}
`.trim();

gulp.task("deploy-env", function() {
  return file(".deploy.env", createDeployEnv(), { src: true }).pipe(
    gulp.dest(".")
  );
});

gulp.task("deploy", () => {
  return gulp
    .src("build/min/omnibus.bundle.min.js", { read: false })
    .pipe(
      shell(
        [
          `wt create --token ${
            process.env.WT_TOKEN
          } --secrets-file .deploy.env ./build/min/omnibus.bundle.min.js`
        ],
        { verbose: true }
      )
    );
});

gulp.task("default", function(cb) {
  runSequence("clean", "mail", "webpack", "uglify", "deploy-env", cb);
});
