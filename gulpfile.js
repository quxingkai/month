var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
gulp.task('default',function(){
    gulp.src('src')
        .pipe(server({
            port:9090,
            open:true,
            livereload:true,
            middleware:function(req, res, next){
                if(/\/api\/index/g.test(req.url)){
                    var type = url.parse(req.url,true).query.type;
                    var data = require('./src/data/'+type+'.json');
                    res.end(JSON.stringify(data));
                }else if(/\/api\/detaile/g.test(req.url)){
                    var type = url.parse(req.url,true).query.type;
                    var favicon_id = url.parse(req.url,true).query.favicon_id;
                    var data = require('./src/data/'+type+'.json');
                    data[type].forEach(function(v,i){
                        if(v.favicon_id ==favicon_id){
                            res.end(JSON.stringify(v));
                        }
                    })
                }
                next();
            }
        }))
})