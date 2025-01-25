const fs=require('fs');
const mimeTypes=require("mime-types");
const net=require('net');
const configuration=require("./configuration");
const errors=require('./errors');
const requestParser=require('./requestParser');
var mappings=configuration.getConfiguration();

function serveResource(socket,resource)
{
    if(!fs.existsSync(resource))
    {
        errors.send404(socket,resource);
        return;
    }
    //do not use the following code , instead write the one that send s chuncks of 1024


    var data =fs.readFileSync(resource,"utf-8");
    var header="HTTP/1.1 200 OK\n";
    header=header+`Content-Type:${mimeTypes.lookup(resouce)}\n`;
    header=header+`Content-Length:${data.length}\n`;
    header=header+"\n";
    var esponse=header+data;
    socket.write(response);

}

var httpServer=net.createServer(function(socket){
    socket.on('data',function(data){
   var request=requestParser.parseRequest(data);
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
})