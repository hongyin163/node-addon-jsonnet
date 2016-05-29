# node-addon-jsonnet
This lib is a jsonnet addon for node,build from jsonnet source code, is not a javascript version of jsonnet such as node-jsonnet project.

Jsonnet is a domain specific configuration language that helps you define JSON data. Jsonnet lets you compute fragments of JSON within the structure, bringing the same benefit to structured data that templating languages bring to plain text,[Jsonnet](http://jsonnet.org/index.html)
```js
var jsonnet = require('node-addon-jsonnet');

jsonnet.eval('{a:1}',function(err,data){
	console.log(data);
})

jsonnet.evalFile('./data.json',function(err,data){
	console.log(data);
})
```

## Installation

```bash
$ npm install node-addon-jsonnet --save
```

## Features

- build from c++ code
- have good performance than javscript version



## License

  [MIT](LICENSE)