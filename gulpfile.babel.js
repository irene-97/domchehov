import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import spritesmith from 'gulp.spritesmith';
import uglify from 'gulp-uglify';
import zip from 'gulp-zip';
import merge from 'merge-stream';
import postcssUrl from 'postcss-url';
import pump from 'pump';
import {rollup} from 'rollup';
import rollupBabel from 'rollup-plugin-babel';
import {minify} from 'uglify-js';

function copyFiles(items) {
    return merge.apply(this, items.map((item) => {
        return gulp.src(item.src, item.options || {})
            .pipe(gulp.dest(item.dest));
    }));
}

function cssUrlReplace(func) {
    return through.obj(function (file, enc, cb) {
        var css = rework(file.contents.toString()).use(reworkUrl((url) => {
            if (url.startsWith('data:')) {
                return url;
            } else {
                return func(url);
            }
        })).toString({
            indent: '    '
        });

        file.contents = new Buffer(css);
        this.push(file);
        cb();
    });
}

gulp.task('vendor:scripts', (cb) => {
    pump([
        gulp.src([
            'node_modules/babel-polyfill/dist/polyfill.js',
            'node_modules/component-modernizr/modernizr.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/fancybox/dist/js/jquery.fancybox.js',
            'node_modules/fancybox/dist/helpers/js/jquery.fancybox-buttons.js',
            'node_modules/fancybox/dist/helpers/js/jquery.fancybox-media.js',
            'node_modules/fancybox/dist/helpers/js/jquery.fancybox-thumbs.js',
            'node_modules/jquery.inputmask/dist/jquery.inputmask.bundle.js',
            'node_modules/jquery.mmenu/dist/js/jquery.mmenu.all.min.js',
            'node_modules/slick-carousel/slick/slick.js',
            'node_modules/perfectly-aligned/perfectly-aligned.js'
        ]),
        sourcemaps.init(),
        concat('vendor.js'),
        uglify(),
        sourcemaps.write('.'),
        gulp.dest('public/js/dist'),
    ], cb);
});

gulp.task('vendor:images', () => {
    return copyFiles([
        {
            src: [
                'node_modules/fancybox/dist/helpers/img/**',
                'node_modules/fancybox/dist/img/**'
            ],
            dest: 'public/images/fancybox'
        }
    ]);
});

gulp.task('vendor', ['vendor:scripts', 'vendor:images']);

gulp.task('icons', () => {
    var spriteData = gulp.src('public/images/icons/*')
        .pipe(spritesmith({
            imgName: 'icons.png',
            imgPath: 'images/icons.png',
            cssName: '_icons.scss',
            cssTemplate: 'public/styles/src/_icons.scss.hbs'
        }));

    return merge(
        spriteData.img.pipe(gulp.dest('public/images')),
        spriteData.css.pipe(gulp.dest('public/styles/src'))
    );
});

gulp.task('styles', () => {
    return gulp.src('public/styles/src/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            includePaths: ['.'],
            indentWidth: 4,
            outputStyle: 'expanded',
            precision: 10
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 0%'],
            cascade: false
        }))
        .pipe(postcss([
            postcssUrl({
                url: (url) => url.replace(/^\/?((?:images)|(?:fonts))\//, '../../$1/')
            })
        ]))
        .pipe(sourcemaps.write('.', {sourceRoot: '/styles/src'}))
        .pipe(gulp.dest('public/styles/dist'));
});

gulp.task('scripts', () => {
    return rollup({
        entry: 'public/js/src/main.js',
        plugins: [
            rollupBabel({
                babelrc: false,
                compact: false,
                presets: [
                    [
                        "es2015",
                        {
                            "modules": false
                        }
                    ]
                ]
            })
        ]
    }).then((bundle) => {
        return bundle.write({
            format: 'iife',
            dest: 'public/js/dist/main.js',
            sourceMap: true
        });
    });
});

gulp.task('watch', () => {
    gulp.watch(['public/images/icons/*', 'public/styles/src/_icons.scss.hbs'], ['icons']);
    gulp.watch('public/styles/src/**/*.scss', ['styles']);
    gulp.watch('public/js/src/**/*.js', ['scripts']);
});

gulp.task('zip', () => {
    var packageName = require('./package.json').name;
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var hours = today.getHours();
    var minutes = today.getMinutes();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return gulp.src([
        '**',
        '!zip/',
        '!zip/**',
        '!node_modules/',
        '!node_modules/**',
        '!.idea/',
        '!.idea/**'
    ], {
        dot: true
    })
        .pipe(zip(`${packageName}_${year}-${month}-${day}_${hours}-${minutes}.zip`))
        .pipe(gulp.dest('zip'));
});