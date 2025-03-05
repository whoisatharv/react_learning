const qs= require("querystring");
const fs=require("fs");
const jst2js=require('./jst2js'); 
exports.parseRequest=function(data,mapping){
	//pass mapping here form conf.js
	var request={};
	request.forwardTo=null;
	request.forward=function(forwardToresource){
		this.forwardTo=forwardToresource;

	}
	request.error=0;
	request.isClientSideTechnologyResource=true;
	var str=data.toString();
	var splits=str.split('/n');
	var firstLine=splits[0];
	var w= firstLine.split(" ");
	request.method=w[0].toUpperCase();
	var i=w[1].indexOf("?");
	request.queryString=null;
	request.data={};
	if(request.method=='GET'){
		if(i!=-1){
			request.queryString=w[1].substring(i+1);
			var value=qs.decode(request.queryString);//this will parse the query
			request.data=JSON.parse(JSON.stringify(value))
		}
	}

	if(request.method=="POST"){
		var lastLine=splits[splits.length-1];
		request.queryString=lastLine;
		var value=qs.decode(request.queryString);//this will parse the query
		request.data=JSON.parse(JSON.stringify(value));

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
 
if(w[1].toUpperCase().endsWith(".JST"))
{
	if (fs.existsSync(w[1].substring(1)))
		{
			request.resource=jst2js.prepareJS(w[1].substring(1))
        request.isClientSideTechnologyResource=false;
	}
	else{
		request.error=404;
		request.resource=w[1];
		request.isClientSideTechnologyResource=true
	}
}

else {
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
