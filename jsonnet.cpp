#include <node.h>
#include <stdlib.h>
#include <stdio.h>

namespace nodejsonnet {

using v8::Function;
using v8::FunctionCallbackInfo;
using v8::Handle;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void init(Local<Object> exports) {

}

NODE_MODULE(jsonnet, init)

}  
// namespace demo
