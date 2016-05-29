var jsonlib = require('./build/Release/jsonnet');

function jsonnet(){

}
jsonnet.prototype.transform=function (code,callback) {
    jsonlib.evaluate_snippet(code,callback);
}
jsonnet.prototype.transformFile=function (code,callback) {
    jsonlib.evaluate_file(code,callback);
}

jsonnet.prototype.eval=function (code,callback) {
    jsonlib.evaluate_snippet(code,function (err,data) {
        if(err.length>0)
            callback&&callback(err);
        else
            callback&&callback(err,JSON.parse(data));
    });
}

jsonnet.prototype.evalFile=function (code,callback) {
    jsonlib.evaluate_file(code,function (err,data) {
        if(err.length>0)
            callback&&callback(err);
        else
            callback&&callback(err,JSON.parse(data));
    });
}
module.exports=new jsonnet();


