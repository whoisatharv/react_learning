exports.parseRequest = function (data, mapping) { // pass mapping here from conf.js
var request = {};
request.error = 0;
request.isClientSideTechnologyResource = true;
var str = data.toString();
var splits = str.split('\n');
var firstLine = splits[0];
var w = firstLine.split(" ");
request.method = w[0];

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
	var query = parseRequestObject();
	if(query.resource == undefined){
		let items = mapping.filter((resource) => resource.path === w[1]);
		if (items != null && items.length == 1) {
			request.isClientSideTechnologyResource = false;
			request.resource = items[0].resource;
		} else {
			request.resource = w[1].substring(1);
		}
	} else{
		request.isClientSideTechnologyResource = false;
		request.resource = query.resource;
		request.requestObject = query.request;
	}
} 

function parseRequestObject() {
	var query = {};
	if (w[1].indexOf("?") !== -1) {
		 var queryItems = w[1].substring(1).split(" ");
		 var queryRs  =  queryItems[0].split("?");
		 var property = queryRs[1].split("&");
		 query.resource  = queryRs[0];
		 query.request = parseProperty(property);
	}

	return query;
}

function parseProperty(data) {
	var properties = {};
	if(data != undefined && data.length > 0) {
		data.forEach(function(value){
			if(value.indexOf("=") !== -1) {
				var item = value.split("=");
				properties[item[0]] = item[1];
			}
		})
	}
	return properties;
}

return request
}