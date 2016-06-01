var Jsonnet = require('./index.js');
var os=require('os');

var json={name:"lhy",age:20};
Jsonnet.eval(JSON.stringify(json),function (err,data) {	
	console.log(err);
	console.log(data);
});

Jsonnet.evalFile('./data.json',function (err,data) {
	console.log(err);
	console.log(data);
});


Jsonnet.transform(JSON.stringify(json),function (err,data) {
	console.log(err);
	console.log(data);
});

Jsonnet.transformFile('./data.json',function (err,data) {
	console.log(err);
	console.log(data);
});
