const gulp          = require('gulp'),  //Подключаем Gulp
      concat        = require('gulp-concat'), //Объединение файлов
      autoprefixer  = require('gulp-autoprefixer'), //Добапвление префиксов
      cleancss      = require('gulp-clean-css'), //Оптимизация стилей
      uglify        = require('gulp-uglify'), //Оптимизация скриптов
      del           = require('del'), //Удаление файлов
      browserSync   = require('browser-sync').create(), //Синхронизация с браузером
      notify        = require('gulp-notify'),
      sourcemaps    = require('gulp-sourcemaps'), //Создает карту для препроцессоров стилей
      sass          = require('gulp-sass')(require('sass')), //Sass препроцессор
      babel 		    = require('gulp-babel'),
      rename        = require('gulp-rename'), //Модуль переименовывания файлов
      pug           = require('gulp-pug'),
      cwebp         = require('gulp-cwebp'); //Конвертер в Webp

//Порядок подключения файлов html
const htmlFiles = [
  '../src/index.html'
]

//Порядок подключения файлов pug
const pugFiles = [
  '../src/pug/*.pug'
]

//Порядок подключения файлов со стилями
const styleFiles = [
  '../src/styles/style.sass'
]

//Порядок подключения js файлов
const scriptFiles = [
  '../src/js/**/*.js'
]

// Таск для обработки pug
gulp.task('pug2html', () => {
  return gulp.src(pugFiles)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('../git/build'))
    .pipe(browserSync.stream());
});

// Таск для обработки html
gulp.task('html', () => {
  return gulp.src(htmlFiles)
    .pipe(gulp.dest('../git/build'))
    .pipe(browserSync.stream());
});

//Таск для обработки стилей
gulp.task('styles', () => {
  return gulp.src(styleFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", notify.onError()))
    .pipe(autoprefixer({ cascade: true, grid:true }))
    .pipe(cleancss({
      level: {
        2: {
          all: true,
          removeUnusedAtRules: false,
          restructureRules: false
        }
      }
    })) // Opt., comment out when debugging
  .pipe(sourcemaps.write())
  // .pipe(rename({suffix: '.min'}))
  //Выходная папка для стилей
  .pipe(gulp.dest('../git/build/css'))
  .pipe(browserSync.stream());
});

//Таск для обработки скриптов
gulp.task('scripts', () => {
  return gulp.src(scriptFiles)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env'],

    }))
    .pipe(concat('scripts.min.js'))
    .pipe(uglify()) // Mifify js (opt.)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../git/build/js'))
    .pipe(browserSync.stream());
});

//Перемещение изображений
gulp.task('images', function(){
  return gulp.src('../src/images/**/*.{png,jpg}')
    .pipe(gulp.dest('../git/build/images'))
    .pipe(cwebp())
    .pipe(gulp.dest('../git/build/images'));
});

//Перемещение шрифтов
gulp.task('fonts', function(){
  return gulp.src('../src/fonts/**/*.{woff,woff2}')
    .pipe(gulp.dest('../git/build/fonts'))
});

//Таск для очистки папки build
gulp.task('del', () => {
  return del([
      '../git/build/*',
    ],
    {force: true});
});

//Таск для отслеживания изменений в файлах
gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: "../git/build/"
    }
  });

  //Следить за файлами со стилями с нужным расширением
  gulp.watch('../src/styles/**/*.sass', gulp.series('styles'))
  //Следить за JS файлами
  gulp.watch('../src/js/**/*.js', gulp.series('scripts'))
  //При изменении HTML запустить синхронизацию
  gulp.watch("../src/*.html").on('change', browserSync.reload);
  //При изменении HTML запустить синхронизацию
  gulp.watch("../src/pug/**/*.pug", gulp.series('pug2html'));
  //При изменении images запустить синхронизацию
  gulp.watch("../src/images/**/*.{png,jpg}", gulp.series('images'));
  //При изменении шрифтов запустить синхронизацию
  gulp.watch("../src/images/**/*.{woff,woff2}", gulp.series('fonts'));
});

//Таск по умолчанию, Запускает del, styles, scripts и watch
gulp.task('default', gulp.series('del', gulp.parallel('pug2html', 'styles', 'scripts','images', 'fonts'), 'watch'));
