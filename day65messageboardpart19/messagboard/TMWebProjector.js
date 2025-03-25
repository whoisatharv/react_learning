const fs = require('fs');
const mimeTypes = require('mime-types');
const net = require('net');
const configuration = require('./configuration');
const errors = require('./errors');
const requestParser = require('./requestParser');
const jst2js = require('./jst2js');
const path = require('path');

var mapping = configuration.getConfigurations();

function Response(socket){
	this._isClosed
	this.$$$socket = socket;
	this.responseInitiated = false;
	this.contentType = "text/html";

	this.setContentType = function(str) {
		this.contentType = str;
	}

	this.close = function () {
		if(this._isClosed) return;
		socket.end();
		this._isClosed = true;
	}

	this.write = function(data) {
		if(this.responseInitiated == false) {
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

function serverResource(socket, resource){
	if (!fs.existsSync(resource)){
		errors.send404(socket, resource);
		return;
	}
	// do not user the following code, instead write the one that sends the chunk of 1024
	var data = fs.readFileSync(resource, 'utf-8');
	var header = "HTTP/1.1 200 OK\n";
	header += `Content-Type: ${mimeTypes.lookup(resource)}\n`;
	header += `Content-Length:${data.length}\n`;
	header += "\n";
	var response = header + data;
	socket.write(response);
}

var httpServer  = net.createServer(function(socket){
	socket.on('data', function(data){
		var request = requestParser.parseRequest(data, mapping.paths);
		console.log(JSON.stringify(request));

		while(true) {
			request.forwardTo = null;
			if (request.error!= 0){
				console.log("Error :" + request.error);
				errors.processErrors(request.error, socket, request.resource);
				return;
			}

			if(request.isClientSideTechnologyResource) {
				serverResource(socket,request.resource);
				return;
			} else {
				console.log("Server resource : "+ request.resource + " Will be processed");
				var absolutePath = path.resolve("./private/"+request.resource);
				delete require.cache[absolutePath];
				// because of the above line older file from the cache will get removed
				var service = require("./private/"+request.resource);


				//day65
				if(request.isClassMapping)
				{
					var  requestData={};
					var object=new service();
					object[request.serviceMethod](requestData);
					//lot of new code will be introduced here
					break;
					//yha pr joh code aaega use response me bhejna he
				}








				service.processRequest(request,new Response(socket));
				if(request.isForwarded() == false) return;

				var forwardTo = request.forwardTo;
				request.isClientSideTechnologyResource = true;

				if(forwardTo == '/private' || forwardTo.startsWith('/private/') || forwardTo.startsWith('private/')) {
					request.error = 500;
					return;
				}

				if (forwardTo == '/') {
					request.resource == 'index.html';
					return;
				}
				if (forwardTo.toUpperCase().endsWith(".JST")) {
					console.log("JST File :" + forwardTo);
					if(fs.existsSync(forwardTo)) {
						request.resource = jst2js.prepareJS(forwardTo,request);
						request.isClientSideTechnologyResource = false;
					} else {
						request.error = 404;
						request.resource = forwardTo;
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
		} // infinite loop end
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

