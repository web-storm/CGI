var gulp = require('gulp');
var concat = require('gulp-concat');
//var rename = require('gulp-rename');
var del = require('del');
var uglify = require('gulp-uglify');

//Очистка папки для Dev
gulp.task('clean_app', function() {
    return del.sync(['./DevDir/**']);
});

// Дев
// Копирование файлов в папку DevDir
gulp.task('DevMustHaveComponents', function() {
    gulp.src('./bower_components/**')
        .pipe(gulp.dest('./DevDir/bower_components'));
});

gulp.task('DevSrc', function() {
    gulp.src(['./src/**','!./src/**/*.json'])
        .pipe(gulp.dest('./DevDir'));
    //todo: разделить стримы
});


// Продакшн
// Конкатенация и минификация файлов
gulp.task('prod', function(){
    gulp.src('./src/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// Действия по умолчанию
gulp.task('default', function(){
    gulp.run('clean_app');
    gulp.run('DevMustHaveComponents');
    gulp.run('DevSrc');
//gulp.task('default', ['clean_app', 'Dev']);

    // Отслеживаем изменения в файлах
   // gulp.watch("./src/*.js", function(event){
    //    gulp.run('Dev');
});