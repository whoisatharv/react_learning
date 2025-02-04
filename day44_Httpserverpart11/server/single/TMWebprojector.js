const fs = require('fs');
const mimeTypes = require('mime-types');
const net = require('net');
const configuration = require('./configuration');
const errors = require('./errors');
const requestParser = require('./requestParser');


var mapping = configuration.getConfigurations();

function Response(socket){
	this.$$$socket = socket;

	this.write = function(data) {
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
		console.log(`${request.resource}`);

		if (request.error == 404){
			console.log("Error :" + request.error);
			errors.processErrors(request.error, socket, request.resource);
			return;
		}

		if(request.isClientSideTechnologyResource) {
			serverResource(socket,request.resource);
		} else {
			console.log("Server resource : "+ request.resource);
			var service = require("./private/"+request.resource);
			service.processRequest(request,new Response(socket));//response ka object banaya usme socket ka reference pass kiya
            
		}
	});

	socket.on('end', function() {
		console.log("Connection close by client");
	});

	socket.on('error', function(){
		console.log("Some error on client side");
	})
});

httpServer.listen(8080,'localhost');
console.log("TMWebProjector is UP : 8080");

