var os = require('os');
var platform = os.platform();
if (platform == 'win32') {
    var jsonnet_win32 = require('./lib/jsonnet_win32.js')
    module.exports = jsonnet_win32;
} else {
    var libjsonnet = require('./lib/jsonnet.node');
    module.exports = libjsonnet;
}

