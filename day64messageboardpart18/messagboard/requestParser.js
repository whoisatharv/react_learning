//importing require modules
const qs=require("querystring");//node js built in module use to parse the wuery string in the url;

const fs=require("fs");
const jst2js=require("./jst2js");

exports.parseRequest=function(data,mapping){
	var request={};//request object stores parsed request information
	request.forwardTo=null; //if set, request is being forwarded to another resource.

// function to set forwarding
	request.forward=function(forwardToresource){
		this.forwardTo=forwardToresource;

	}
	//this function return s true if request was forwarded
	request.isForwarded=function(){
		return this.forwardTo!=null;
	}

	request.error=0;
	request.isClientSideTechnologyResource=true;
	var str= data.toString();
	var splits=str.split('\n');
	var firstLine=splits[0];
	var w=firstLine.split(" ");
	request.method=w[0].toUpperCase();


	var i=w[1].indexOf("?");
	request.queryString=null;
	request.data={};//stores parsed querystring
	if(request.method=="GET"){
		if(i!=-1){
			request.queryString=w[1].substring(i+1);
			var value=qs.decode(request.queryString);
			request.data=JSON.parse(JSON.stringify(value));
			w[1]=w[1].substring(0,i);
		}
	}

	if(request.method == "POST") {
		var lastLine = splits[splits.length -1];
		request.queryString = lastLine;
		var value = qs.decode(request.queryString);
		request.data = JSON.parse(JSON.stringify(value));
	}
	console.log("--------------------------------------------");
console.log(str);
console.log("--------------------------------------------");

//restrict to  the private resources
if (w[1] == "/private" || w[1].startsWith("/private/")) {
    request.error = 404;
    request.resource = w[1].substring(1);
    return request;
}
//map / to index.html

if (w[1] == "/") {
    request.resource = "index.html";
    return request;
}
//handling .jst files
if(w[1].toUpperCase().ENDSwith(".JST")){
	if(fs.existsSync(w[1].substring(1))){
		request.resource=jst2js.prepareJS(w[1].substring(1),request);
		request.isClientSideTechnologyResource=false;


	}
	else{
		request.error=404;
		request.resource=w[1];
		request.isClientSideTechnologyResource=true;
	}
	return request;
}

//handel the mapped routes
console.log("W[1]" + w[1]);
let items = mapping.filter((resource) => resource.path === w[1]);
if (items != null && items.length == 1) {
    request.isClientSideTechnologyResource = false;
    request.resource = items[0].resource;
} else {
    request.resource = w[1].substring(1);
}

return request;

}