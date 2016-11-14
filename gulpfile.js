const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');

gulp.task('sass', () => {
	gulp.src('./src/sass/**/*.sass')
		.pipe(plumber())
		.pipe(sass({
			preferredSyntax: 'sass'
		}))
		.pipe(postcss([ cssnext() ]))
		.pipe(gulp.dest('./docs/stylesheets'));
});

gulp.task('pug', () => {
	gulp.src('./src/pug/**/!(_)*.pug')
		.pipe(plumber())
		.pipe(pug())
		.pipe(gulp.dest('./docs'));
});

gulp.task('public', () => {
	gulp.src('./src/public/**/*', { base : 'src/public' })
		.pipe(plumber())
		.pipe(gulp.dest('./docs'));
});

gulp.task('watch', () => {
	gulp.watch('./src/pug/**/*.pug', ['pug']);
	gulp.watch('./src/sass/**/*.sass', ['sass']);
});

gulp.task('dev', ['watch', 'pug', 'sass']);