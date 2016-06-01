var os = require('os');
var path = require('path');
var cp = require('child_process');

var EXE_PATH = path.resolve(__dirname, './jsonnet.exe');

var jsonnet = {
    evaluate_snippet: function (code, cb) {
        cp.execFile(EXE_PATH, ['-e', code], {}, function (err, stdout, stderr) {
            if(err){
                cb && cb(err);
            }else{
                cb && cb(null, stdout);
            }            
        });
    },
    evaluate_file: function (filePath, cb) {
        cp.execFile(EXE_PATH, [filePath], {}, function (err, stdout, stderr) {
             if(err){
                cb && cb(err);
            }else{
                cb && cb(null, stdout);
            }        
        });
    }

};

module.exports = jsonnet;

