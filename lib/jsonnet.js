'use strict';
var libjsonnet = require('./libjsonnet');
//var Prism=require('./prism');

// Prism.languages.jsonnet = {
//       'cppcomment': /\/\/.*/g,
//       'comment': /\/\*[\w\W]*?\*\//g,
//       'string': /("|')(\\?.)*?\1/g,
//       'keyword': /\b(self|super)\b|\$/g,
//       'boolean': /\b(true|false)\b/g,
//       'constant': /\bnull\b/g,
//       'error': /\berror\b/g,
//       'special': /\b(local|function|if|then|else|import|importstr|for|in)\b/g,
//       'number': /\b[0-9][0-9.eE]*\b/g,
//       'operator': /(\+|\*|\/)+/g,
//     };

// function jsonnet_evaluate_snippet_wrapped(code) {
//     //var jsonnet_make = libjsonnet.cwrap('jsonnet_make', 'number', [])
//     // var jsonnet_realloc = libjsonnet.cwrap('jsonnet_realloc', 'number', ['number', 'number', 'number'])
//     // var jsonnet_evaluate_snippet = libjsonnet.cwrap('jsonnet_evaluate_snippet', 'number', ['number', 'string', 'string', 'number'])
//     // var jsonnet_destroy = libjsonnet.cwrap('jsonnet_destroy', 'number', ['number'])

//     var vm = libjsonnet._jsonnet_make();
//     var error_ptr = libjsonnet._malloc(4);
//     var output_ptr = libjsonnet._jsonnet_evaluate_snippet(vm, "snippet", code, error_ptr);
//     var error = libjsonnet.getValue(error_ptr, 'i32*');
//     libjsonnet._free(error_ptr);
//     var result = libjsonnet.Pointer_stringify(output_ptr);
//     libjsonnet._jsonnet_realloc(vm, output_ptr, 0);
//     libjsonnet._jsonnet_destroy(vm);
//     return result;
// }

// module.exports=jsonnet_evaluate_snippet_wrapped;

var Jsonnet = function () {
  var jsonnet_make = libjsonnet.cwrap('jsonnet_make', 'number', []);
  this.vm = jsonnet_make();
  // this.jsonnet_cleanup_string = libjsonnet.cwrap('jsonnet_cleanup_string', 'number', ['number', 'number']);
  this.jsonnet_evaluate_snippet = libjsonnet.cwrap('jsonnet_evaluate_snippet', 'number', ['number', 'string', 'string', 'number']);
  this.jsonnet_destroy = libjsonnet.cwrap('jsonnet_destroy', 'number', ['number']);
};

module.exports = Jsonnet;

Jsonnet.prototype.transform = function (code) {
  var error_ptr = libjsonnet._malloc(100);
  var output_ptr = this.jsonnet_evaluate_snippet(this.vm, "snippet", code, error_ptr);
  var error = libjsonnet.getValue(error_ptr, 'i32*');
  libjsonnet._free(error_ptr);
  var result = libjsonnet.Pointer_stringify(output_ptr);
  // this.jsonnet_cleanup_string(this.vm, output_ptr);
  if (error) {
    throw new Error(result);
  }
  return result;
}



Jsonnet.prototype.eval = function (code) {
  var error_ptr = libjsonnet._malloc(4);
  var output_ptr = this.jsonnet_evaluate_snippet(this.vm, "snippet", code, error_ptr);
  var error = libjsonnet.getValue(error_ptr, 'i32*');
  libjsonnet._free(error_ptr);
  var result = libjsonnet.Pointer_stringify(output_ptr);
  // this.jsonnet_cleanup_string(this.vm, output_ptr);
  if (error) {
    throw new Error(result);
  }
  return JSON.parse(result);
};

Jsonnet.prototype.evalFile = function (filepath) {
  var code = libjsonnet.read(filepath);
  return this.eval(code);
};


Jsonnet.prototype.destroy = function () {
  this.jsonnet_destroy(this.vm);
};

