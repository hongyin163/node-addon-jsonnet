var Jsonnet = require('./index.js');
var os = require('os');
var iconv = require('iconv-lite');
var json = { name: "中华人民共和国", age: 20 };
// Jsonnet.transform(JSON.stringify(json), function (err, data) {
// 	console.log(err);
// 	console.log(data);
// });

// Jsonnet.evalFile('./data.json',function (err,data) {
// 	console.log(err);
// 	console.log(data);
// });


// Jsonnet.transform(JSON.stringify(json),function (err,data) {
// 	console.log(err);
// 	console.log(data);
// });

Jsonnet.transformFile('./data.json',function (err,data) {
	console.log(err);
	console.log(data);
});
