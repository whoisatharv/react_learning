const fs = require('fs');
const mimeTypes = require('mime-types');
const net = require('net');
const configuration = require('./configuration');
const errors = require('./errors');
const requestParser = require('./requestParser');
const HttpDocument = require('./HttpDocument');

var mapping = configuration.getConfigurations();

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
			var starter = require("./private/"+request.resource);

			var response = new HttpDocument(socket);
			starter.processRequest(request.requestObject,response);
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

//request agar get type ki he toh joh bhi hum action ke against   likhte uske aage question mark lagakr ek query string banayi jati he
//get request ke hisab se parsing krke get request  bannani he aur post request ke hisab se parsing krke post request bannai he
