#include <node.h>
#include <stdlib.h>
#include <stdio.h>
extern "C" {
    #include "./core/libjsonnet.h"
}
namespace nodejsonnet {

using v8::Function;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

const char* ToCString(const String::Utf8Value& value) {
  return *value ? *value : "<string conversion failed>";
}


void Evaluate_snippet(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
   
    
    String::Utf8Value str(args[0]);
    const char* snippet = ToCString(str);
    const unsigned argc = 2;
    Local<Function> cb = Local<Function>::Cast(args[1]);

    int error;
    char *output;
    Local<String> errmsg ; 
    Local<String> result; 

    struct JsonnetVm *vm;

    vm = jsonnet_make();
    output = jsonnet_evaluate_snippet(vm, "snippet", snippet, &error);
  
    if (error) {        
        errmsg = String::NewFromUtf8(isolate,output);     
        result=String::NewFromUtf8(isolate, "");
    }else{
        errmsg = String::NewFromUtf8(isolate,"");  
        result=String::NewFromUtf8(isolate, output);
    }
    
    Local<Value> argv[argc] = { errmsg,result };
    cb->Call(Null(isolate), argc, argv);
    //args.GetReturnValue().Set(String::NewFromUtf8(isolate, output));

    jsonnet_realloc(vm, output, 0);
    jsonnet_destroy(vm);
}

void Evaluate_file(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
   
    
    String::Utf8Value str(args[0]);
    const char* file = ToCString(str);
    const unsigned argc = 2;
    Local<Function> cb = Local<Function>::Cast(args[1]);

    int error;
    char *output;
    Local<String> errmsg,result; 

    struct JsonnetVm *vm;

    vm = jsonnet_make();
    output = jsonnet_evaluate_file(vm, file, &error);
  
    if (error) {        
        errmsg = String::NewFromUtf8(isolate,output);     
        result=String::NewFromUtf8(isolate, "");
    }else{
        errmsg = String::NewFromUtf8(isolate,"");  
        result=String::NewFromUtf8(isolate, output);
    }
    
    Local<Value> argv[argc] = { errmsg,result };
    cb->Call(Null(isolate), argc, argv);
    //args.GetReturnValue().Set(String::NewFromUtf8(isolate, output));

    jsonnet_realloc(vm, output, 0);
    jsonnet_destroy(vm);
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "evaluate_snippet", Evaluate_snippet);
  NODE_SET_METHOD(exports, "evaluate_file", Evaluate_file);
}

NODE_MODULE(jsonnet, init)

}  
// namespace demo
