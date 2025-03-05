const fs=require('fs');
const jst2js=require('./jst2js');
const mimeTypes=require('mime-types');
const net=require('net');
const configuration=require('./configuration');
const errors=require('./errors');
const requestParser=require('./requestParser');


var mapping=configuration.getConfigurations();


function Response(socket){

	this._isClosed;
	this.$$$socket=socket;
	this.responseInitiated=false;
	this.contentType="text/html";
	this.setContentType=function(str){
		this.contentType=str;

	}


	this.close=function(){
		if(this._isClosed)return;
		socket.end();
		this._isClosed=true;
	}

	this.write=function(data){
		if(this.responseInitiated==false){
			this.$$$socket.write("Http/1.1 200 ok\n");
			this.$$$socket.write(new Date().toGMTString()+"\n");
			this.$$$socket.write("Server:TMWeb Projector\n");
			this.$$$socket.write("Content-Type:"+this.contentType+"\n")
			this.$$$socket.write("Connection:close\n\n");
			this.responseInitiated=true;
		}
		this.$$$socket.write(data);

	}

}

function serverResource(socket,resource){
	if(!fs.existsSync(resource)){
		errors.send404(socket,resource);
		return;
	}

	//do not use the following code ,instead write the one that sends chnck of 1024

	var data=fs.readFileSync(resource,'utf-8');
	var header="HTTP/1.1 200 OK\n";
	header += `Content-Type: ${mimeTypes.lookup(resource)}\n`;
	header += `Content-Length:${data.length}\n`;
	header += "\n";
	var response = header + data;
	socket.write(response);
}


var httpServer=net.createServer(function(socket){
	socket.on('data',function(data){
		var request=requestParser.parseRequest(data,mapping.path);
		console.log(JSON.stringify(request));

		while(true){
			request.forwardTo=null;
			if(request.error!=0){
				console.log("ERROR:"+request.error);
				errors.processErrors(request.error,socket,request.resource)
				return;
			}
			if(request.isClientSideTechnologyResource){
				serverResource(socket,request.resource);
				return;

			}
			else{
				console.log("Server resource :"+request.resource+"Will be processed");
				var service=require("./private/"+request.resource);
				service.processRequest(request,new Response(socket));

				//if its a server side  resource loads, the bcorresponding module and calls its processRequest() method
				if(request.isForwarded==false) return;
				 var forwardTo=request.forwardTo;

				 request.isClientSideTechnologyResource=true;

				 //prevents accessing private files directly by setting error 500.
				 if(forwardTo == '/private' || forwardTo.startsWith('/private/') || forwardTo.startsWith('private/')) {
					request.error = 500;
				}

				if (forwardTo == '/') {
					request.resource = 'index.html';
				}

				//******************************************//
                else
				if(forwardTo.toUpperCase().endsWith(".JST"))
				{
					if (fs.existsSync(forwardTo))
						{
							request.resource=jst2js.prepareJS(forwardTo)
						request.isClientSideTechnologyResource=false;
					}
					else{
						request.error=404;
						request.resource=forwardTo;
						request.isClientSideTechnologyResource=true
					}
				}
				
				
				
				else {
					var e= 0;
					while(e < mapping.paths.length) {
						if(mapping.paths[e].path == "/"+forwardTo) {
							request.resource = mapping.paths[e].resource;
							request.isClientSideTechnologyResource = false;
							break;
						}
						e++;
					}
					if(request.isClientSideTechnologyResource) {
						request.resource = forwardTo;
					}
				}
			}
		} // infinite loop ends here
	});
	socket.on('end', function() {
		console.log("Connection close by client");
	});
	socket.on('error', function(){
		console.log("Some error on client side");
	})
})

httpServer.listen(7070,'localhost');
console.log("TMWebProjector is UP : 7070");

