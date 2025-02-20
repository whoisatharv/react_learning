const qs= require("querystring");
exports.parseRequest=function(data,mapping){
    //pass mapping here form conf.json
    var request={};
    request.error=0;
    request.isClientSideTechnologyResource=true;
    var str=data.toString();
    var splits= str.splits('\n');
    var firstline=splits[0];
    var w=firstline.split(" ");
    request.method=w[0].toUpperCase();
    var i=w[1].indexOf("?");
    request.queryString=null;
    request.data={};
    if(request.method=='GET'){
        if(i!=-1){
            request.queryString=w[1].substring(i+1);
            var value=qs.decode(request.queryString);
            request.data=JSON.parse(JSON.stringify(value))
        }
    }
    
    console.log("--------------------------------------------");
    console.log(str);
    console.log("--------------------------------------------");
   
    if (w[1] == "/private" || w[1].startsWith("/private/")) {
        request.error = 404;
        request.resource = w[1].substring(1);
        return request;
    }
    
    if (w[1] == "/") {
        request.resource = "index.html";
    } else {
        console.log("W[1]" + w[1]);
        let items = mapping.filter((resource) => resource.path === w[1]);
        if (items != null && items.length == 1) {
            request.isClientSideTechnologyResource = false;
            request.resource = items[0].resource;
        } else {
            request.resource = w[1].substring(1);
        }
    } 
    return request
    }
    

