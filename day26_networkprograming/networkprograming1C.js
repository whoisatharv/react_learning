const net = require('net');

// Create a new client socket
var clientSocket = new net.Socket();

// Connect to the server
clientSocket.connect(5501, "localhost", function () {
    console.log('Connected to server');
    clientSocket.write("Hi, I'm your new client");
});

// Handle data received from the server
clientSocket.on('data', function (data) {
    console.log('Server says: ' + data);
});

// Handle when the server closes the connection
clientSocket.on('end', function () {
    console.log('Connection to server lost');
});

// Handle errors
clientSocket.on('error', function (err) {
    console.error('An error occurred: ' + err.message);
});

// Handle connection timeout 
clientSocket.on('timeout', function () {
    console.warn('Connection timed out');
    clientSocket.end();
});
