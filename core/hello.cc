#include <node.h>
#include <stdlib.h>
#include <stdio.h>

#include "libjsonnet.h"

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

    int argc=2;
    int error;
    char *output;
    struct JsonnetVm *vm;
    if (argc != 2) {
        fprintf(stderr, "libjsonnet_test_snippet <string>\n");
        //return EXIT_FAILURE;
    }
    vm = jsonnet_make();
    output = jsonnet_evaluate_snippet(vm, "snippet", "{age:1}", &error);
    if (error) {
        fprintf(stderr, "%s", output);
        jsonnet_realloc(vm, output, 0);
        jsonnet_destroy(vm);
        //return EXIT_FAILURE;
    } 
    // printf("%s", output);
    jsonnet_realloc(vm, output, 0);
    jsonnet_destroy(vm);


    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "word"));
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
}

NODE_MODULE(addon, init)

}  
// namespace demo
