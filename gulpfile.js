var gulp = require('gulp');

var src = './src/**/*.js';
/*gulp.task('umd', function() {
    var umdwrap = require('gulp-umd');
    gulp.src(src)
        .pipe(umdwrap())
        .pipe(gulp.dest('./dist/'));
});*/
gulp.task('umd', function() {
    var umdwrap = require('gulp-umd');
    gulp.src(src)
        .pipe(umdwrap({
            dependencies: function (file) {
                var match = file.contents.toString().match(/(\s*define[^\(]*?\([^\[]*?(\[[^\]]*?\])?\s*,?\s*?function\s*\(([^\)]*)?\)[^\{]*?\{)[\w\W]*(\}\s*\)\s*;*\s*)$/);
                if(match){
                    file.contents = file.contents.slice(match[1].length, -(match[4].length));
                    var deps = match[2] ? eval(match[2]) : [];
                    var params = match[3] ? match[3].replace(/\s/,'').split(',') : [];
                    deps = deps.map(function(dep, i) {
                        var split = dep.split('/');
                        return {
                            amd: dep,
                            cjs: dep,
                            global: split.length > 1 ? split[split.length - 1] : dep,
                            param: params[i]
                        };
                    });
                    return deps;
                }else{
                    return [];
                }
            },
            templateSource: require('fs').readFileSync('./returnExports.tpl')
        }))
        .pipe(gulp.dest('./dist/'));
});
