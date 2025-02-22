const fs=require('fs');
const mimeTypes=require('mime-types');
const net=require('net');
const configuration= require('./configuration');
const errors=require('./errors');
const requestParser=require('./requestParser');

var mapping = configuration.getConfigurations();
 function Response(socket)
{
    this.isClosed
    this.$$$socket=socket;
    this.responseInitiated=false;
    this.contentType="text/html";
     this.setContentType=function(str){
        this.setContentType=str;
     }

     this.close=function(){
        if(this._isClosed) return;
        socket.end();
        this._isClosed=true;
     }

     this.write=function(data){
        if(this.responseInitiated==false){
            this.$$$socket.write("HTTP/1.1 200 Ok\n");
			this.$$$socket.write( new Date().toGMTString()  + "\n");
			this.$$$socket.write("Server : TMWeb Projector\n");
			this.$$$socket.write("Content-Type: " + this.contentType + "\n");
			this.$$$socket.write("Connection: close\n\n");	// extra newline '\n' is must here
			this.responseInitiated = true; 
        }
        this.$$$socket.write(data);
     }
}

function serverResource(socket,resource){
    if(!fs.existsSync(resource)){
        errors.send404(socket,resource);
        return;
    }

    var data =fs.readFileSync(resource,'utf-8');
    var header="HTTP/1.1 200 OK\n";
    header+= `Content-Type: ${mimeTypes.lookup(resource)}\n`;
    header+=`Content-Length:${data.length}\n`;
    header+="\n";
    var response=header+data;
    socket.write(response);

}
var httpServer=net. createServer(function(socket){
    socket.on('data',function(data){
        var request=requestParser.parseRequest(data,mapping.paths);
        console.log(`${request.resource}`);


        if(request.error==404){
            console.log("Error:"+request.error);
            errors.processErrors(request.error,socket,request.resource);
            return;
        }
        if(request.isClientSideTechnologyResource) {
			serverResource(socket,request.resource);
		} else {
			console.log("Server resource : "+ request.resource);
			var service = require("./private/"+request.resource);
			service.processRequest(request,new Response(socket));
		}
	});

	socket.on('end', function() {
		console.log("Connection close by client");
	});

	socket.on('error', function(){
		console.log("Some error on client side");
	})
});

httpServer.listen(7070,'localhost');
console.log("TMWebProjector is UP : 7070");

