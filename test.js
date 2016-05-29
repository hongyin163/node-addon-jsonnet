var Jsonnet = require('./index.js');

var json="{'name':'lhy','age':20}";
Jsonnet.eval(json,function (err,data) {
	console.log(err);
	console.log(data);
});

Jsonnet.evalFile('./data.json',function (err,data) {
	console.log(err);
	console.log(data);
});
