const qs = require("querystring");
const fs = require("fs");
const jst2js = require("./jst2js");

exports.parseRequest = function (data, mapping) { // pass mapping here from conf.js
var request = {};

request.isClassMapping = false;
request.forwardTo = null;
request.forward = function(forwardToresource) {
	this.forwardTo = forwardToresource;
}

request.isForwarded = function() {
	return this.forwardTo != null;
}

request.error = 0;
request.isClientSideTechnologyResource = true;
var str = data.toString();
var splits = str.split('\n');
var firstLine = splits[0];
var w = firstLine.split(" ");
request.method = w[0].toUpperCase();

var i = w[1].indexOf("?");
request.queryString = null;
request.data = {};
if(request.method == "GET") {
if (i != -1) {
 request.queryString = w[1].substring(i+1);
 var value = qs.decode(request.queryString); // this will parse the query
 request.data = JSON.parse(JSON.stringify(value));
 w[1] = w[1].substring(0,i);
}
}
if(request.method == "POST") {
var lastLine = splits[splits.length -1];
request.queryString = lastLine;
	var value = qs.decode(request.queryString); // this will parse the query
 request.data = JSON.parse(JSON.stringify(value));
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
	return request;
}
if (w[1].toUpperCase().endsWith(".JST")) {
	if(fs.existsSync(w[1].substring(1))) {
		request.resource = jst2js.prepareJS(w[1].substring(1),request);
		request.isClientSideTechnologyResource = false;
	} else {
		request.error = 404;
		request.resource = w[1];
		request.isClientSideTechnologyResource = true;
	}
	return request;
}
else {
	console.log("W[1]" + w[1]);

	var e = 0;

	while(e < mapping.paths.length) {
		if(mapping.paths[e].path == w[1]) {
			request.resource = mapping.paths[e].resource;
			request.isClientSideTechnologyResource = false;
			return request;
		}
		if (w[1].startsWith(mapping.paths[e].path+ "/")) {
			if (mapping.paths[e].methods) {
				if(mapping.paths[e].methods[w[1].substring(w[1].indexOf("/",1))]){
					if(mapping.paths[e].module) {
						request.isClientSideTechnologyResource = false;
						request.isClassMapping = true;
						request.resource = mapping.paths[e].module + ".js";
						request.serviceMethod = mapping.paths[e].methods[w[1].substring(w[1].indexOf("/",1))];
						return request;
					}

				}
			}
		}
		e++;
	}
	request.resource = w[1].substring(1);
	request.isClientSideTechnologyResource = true;
} 
return request
}