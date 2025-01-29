const fs=require('fs');//file system module, use dto read the files
const mimeTypes=require("mime-types");//module to determine the mime type of the files
const net=require('net');//network module for creating tcp servers
const configuration=require("./configuration");//custom configuration module
const errors=require('./errors');//custom module for handling errors
const requestParser=require('./requestParser');//custom module to parse Http request
var mappings=configuration.getConfiguration();//load some configuration mappings routes etc.
console.log("Mappings loaded:", mappings);


//this function handles sending files back to the client when requested.
function serveResource(socket,resource)
{
    if(!fs.existsSync(resource))
    {
        errors.send404(socket,resource);//if the file (resource) doesn't exist, it calls errors.send404 to tell the client that the file doesn't exist
        return;
    }
    //do not use the following code , instead write the one that send s chuncks of 1024


    var data =fs.readFileSync(resource,"utf-8");
    var header="HTTP/1.1 200 OK\n";//protocol version
    header=header+`Content-Type:${mimeTypes.lookup(resource)}\n`;//looking up for the mime type of the particular file
    header=header+`Content-Length:${data.length}\n`;
    header=header+"\n";
    var response=header+data;
    socket.write(response);

}

var httpServer=net.createServer(function(socket){
    socket.on('data',function(data){
   var request=requestParser.parseRequest(data,mappings);//parse the http request using requestParser.parserequest

   if(request.error!=0){
    errors.processError(request.error,socket,request.resource);
    return;
   }
   if(request.isClientSideTechnologyResource){
    serveResource(socket,request.resource)
   }
    });

    socket.on('end',function(){
        console.log('connection closed by client');

    });
    socket.on('error',function(){
        console.log('Some error')
    })
 
});
httpServer.listen(8089, function() {
    console.log('Server is listening on port 8089...');
});

//TH client  sends an Http request to this server
//the request is parsed to extract details like the requested file.
//the server  creates an http response and sends it over the socket.