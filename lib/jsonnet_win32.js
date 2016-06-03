var os = require('os');
var path = require('path');
var cp = require('child_process');
var iconv = require('iconv-lite');
var fs = require('fs');
var EXE_PATH = path.resolve(__dirname, './jsonnet.exe');

function decodeGBK(data) {
    return data.replace(/(\\u[0-9a-f]{4})+/g, function (w) {
        return iconv.decode(new Buffer(w.split('\\u00').join(''), 'hex'), 'GBK');
    });
}

var jsonnet = {
    evaluate_snippet: function (code, cb) {
        cp.execFile(EXE_PATH, ['-e', code], {}, function (err, stdout, stderr) {
            if (err) {
                cb && cb(err);
            } else {
                cb && cb(null, decodeGBK(stdout));
            }
        });
    },
    evaluate_file: function (filePath, cb) {
        var me = this;
        cp.execFile(EXE_PATH, [filePath], {}, function (err, stdout, stderr) {
            if (err) {
                cb && cb(err);
            } else {
                cb && cb(null, decodeGBK(stdout));
            }
        });
    }

};

module.exports = jsonnet;

