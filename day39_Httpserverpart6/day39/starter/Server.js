const fs=require('fs');//file system module , for  handling the file operations
const mimeTypes=require("mime-types");//module to  detrerine the mime types of the files 
const net= require('net');//network module for creating tcp servers
const configuration= require("./configuration");
const errors=require('./errors');
const requestParser=require('./requestParser');
var mappings= configuration.getConfiguration();//load some configuration mapping routes
//this function handles sending back files to the client 
function severResource(socket,resource)
{
    if(!fs.existsSync(resource))
    {
        errors.send404(socket,resource);//if the file resource doesnt exist,it will call errror
        return
    }

    //response code for sending chunks of 1024 bytes


}

var httpServer=net.createServer(function(socket){
    socket.on('data',function(data){
        var request=requestParser.parseRequest(data,mappings);


        /* if request.error is not zero
        then call send 404and pass socket,request.resource
        */

        if(request.error){
            error.send404(socket,request.resource)
            return;
        }

        if(request.isClientSideTechnologyResouce){
            serverResource(socket,request.resource)
        }
    });
    socket.on('end',function(){
        console.log('connection is closed by client');
    });

    
    socket.on('error',function(){
        console.log('some error')
    })
});
