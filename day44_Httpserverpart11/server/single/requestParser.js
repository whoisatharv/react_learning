const qs=require("querystring");
exports.parseRequest=function (data,mapping){
    //pass mapping here from conf.js
    var request={};
    //creating request object
    request.error=0;
    request.isClientSideTechnologyResource=true;
    var str=data.toString();
    var splits=str.split("\n")
    var firstline=splits[0];
    var w= firstline.split(" ");
    request.method=w[0].toUpperCase();
    
//get request processing
var i = w[1].indexOf("?");
   request.queryString=null;
   request.data={};
   if (request.method=="GET"){

    if(i!=-1){
        //w[1] ke baad joh bhi cheez he use query string ko assign krte he
        request.queryString=w[1].substring(i+1);
        var value=qs.decode(request.queryString); //this will parse the query
        request.data=JSON.parse(JSON.stringify(value));
        w[1]=w[1].substring(0,i);
    }
   }
   if(request.method=="POST"){
    //assignment
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
}
 else {
	
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