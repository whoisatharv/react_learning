exports.parseRequest=function(data,mappings){//exports the parse request function to the other modules
var request={};
var str=data.toString();//converting buffer to string
 var splits=str.str.splits('\n');//brekaes the raw request into an arrAY of lines,where each line represents one part of the hhttp request

 var firstLine=splits[0];
 var w=firstLine.split(" ");
 request.method=w[0]; // request me dynamically ek property addd krdi method naam ki

 /*
   if w[1] starts with /private
   then assign 404 to request.error and return request
   assign w[1].substring(1) to request.resource
  
 */
  if(w[1].startsWith('/private')){
    request.error=404;
    return request;
  }
 if(w[1]=='/')// w1 represent the requested resource path
 {
    request.resource ="index.html";
 }
 else{
    request.resource=w[1].substring(1);
 }

 /*
 iterate mappings.path
 on every cycle compare w[1] with the path property of every object
 if it matches.then it is a server side resource
 so assign false to isclientsidetechnologyresource
 and assign the actual name of the resource (starter.js)
 as per the conf.json that i have written to request.resource and return request
 request.isClientSideTechnologyResource=true;
 */



 for (let mapping of mappings.paths ){
    if(w[1].startsWith(mapping.path)){
        request.isClientSideTechnologyResource=false;//it is a server side resouce
        request.resource=mapping.resource;
        return request;
    }
 }
 request.isClientSideTechnologyResource=true;
}