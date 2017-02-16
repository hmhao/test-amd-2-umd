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
                /**
                 *  \s*define[^\(]*?\( ：define前面可能有换行空格，匹配define函数非贪婪的直到左小括号
                 *  [^\[]*?(\[[^\]]*?\])? ： 非贪婪的匹配到左中括号，中括号里面的内容，右中括号，该中括号可能会没有，即define没有依赖
                 *  \s*,?\s*? ： 匹配到function前面，如果前面的中括号没有那么逗号也可能没有
                 *  function\s*\(([^\)]*)?\)[^\{]*?\{) ： 匹配function以及其参数直到函数体前的左大括号，参数可能没有
                 *  [\w\W]* ： 匹配function函数体直到右大括号前
                 *  (\}\s*\)\s*;*\s*$ ： 匹配function函数体右大括号以及define函数的右小括号，define函数后可能有分号和换行空格
                 */
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

gulp.task('umdify', function(){
    var fs = require('fs-extra')
    var glob = require('glob');
    var umdify = require('umdify');
    var files = glob.sync(src);
    files.forEach(function(file) {
        var contents = fs.readFileSync(file, 'utf8');
        try{
            contents = umdify(contents);
        }catch(e){
        }
        var dest = file.replace(/.\/src\//, './dist/umdify/');
        fs.outputFileSync(dest, contents);
    });
});