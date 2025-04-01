const fs = require('fs');
const mimeTypes = require('mime-types');

exports.processData = function (socket, resource) {

var bufferSize = 1024 // this should be  1024 or 4096 
var buffer = Buffer.alloc(bufferSize);
file = resource;

var fileDescriptor  = fs.openSync(file,'r');
var data;
var bytesExtracted;

while(true) {
	bytesExtracted = fs.readSync(fileDescriptor, buffer, 0, bufferSize, null);
	if(bytesExtracted == 0) {
		fs.closeSync(fileDescriptor);
		break;
	}
	if(bytesExtracted < bufferSize) {
		data += buffer.slice(0, bytesExtracted);
	} else {
		data += buffer;
	}
	//process.stdout.write(data.toString());
}

//var data = fs.readFileSync(resource, 'utf-8');
var header = "HTTP/1.1 200 OK\n";
header += `Content-Type: ${mimeTypes.lookup(resource)}\n`;
header += `Content-Length:${data.length}\n`;
header += "\n";
var response = header + data;
socket.write(response);
}


