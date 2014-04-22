var fs = require('fs');
module.exports = function (grunt) {

  "use strict";
  // Export the SpriteMaker function
  grunt.registerMultiTask('import', 'import css and js to html file.', function () {
    var that = this,
      done = this.async(),
      log = function(){};//console.log;
    
    var options = this.options({
    });

    var hasDelete = false;
    var myimport = function (file, callback) {
      try{
        var src = file.src[0];
        console.log("    read file: "+file.src);
        var context = fs.readFileSync(src,'utf-8');
        var points = context.match(/<.*import=[\"\']import[\'\"].*>/g);
        for(var i = 0;i<points.length;i++){
          var point = points[i];
          var type = point.indexOf("<script") >=0?"script":"style";
          var importfile =type=="script"?point.match(/src=["']([^"']*)/)[1]:point.match(/href=["']([^"']*)/)[1];//取得引入的文件
          importfile = src.substring(0,src.lastIndexOf("/")+1)+importfile;
          console.log("    read imported file: "+importfile);
          var importContext = fs.readFileSync(importfile,"utf-8");
          context = context.replace(point,"<"+type+">"+importContext+"\n</"+type+">");
        }
        console.log("----write to file:"+file.dest);
        fs.writeFileSync(file.dest,context,"utf-8");
        callback();
      }catch(err){
        throw err;
        callback();
      }
    };

    grunt.util.async.forEachSeries(this.files, myimport, function (err) {
      done();
    });

  });

};
