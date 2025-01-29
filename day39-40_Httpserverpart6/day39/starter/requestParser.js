exports.parseRequest = function (data, mapping) { // pass mapping here from conf.js
   var request = {};
   request.error = 0;
   request.isClientSideTechnologyResource = true;
   var str = data.toString();
   var splits = str.split('\n');
   var firstLine = splits[0];
   var w = firstLine.split(" ");
   request.method = w[0];
   /*
   /*
   if user request for the resource for private folder then deny the request
   if w[1] starts with 'private' eg. private/ xyz.js  then assign 404 to request.error 
   // as we need send resouce name in error 
   assign w[1].substring(1) to request.resource (private/xyz.js) 
   and return  request 
   */
   
   if (w[1] == "/private" || w[1].startsWith("/private/")) {
      request.error = 404;
      request.resource = w[1].substring(1);
      return request;
   }
   
   if (w[1] == "/") {
      request.resource = "index.html";
   } else {
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