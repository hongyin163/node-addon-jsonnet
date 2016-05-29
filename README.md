# express-jsonnet
This lib is a jsonnet addon for node,build from jsonnet source code, is not a javascript version of jsonnet such as node-jsonnet project.

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
$ npm install express-jsonnet
```

## Features

  * use jsonnet to aggregated data
  * provide json api by configuration
  * provide file,http,mongodb .etc data source

## License

  [MIT](LICENSE)