 
const net = require('net');

// Create the server
var server = net.createServer(function (socket) {
    console.log('New client connected');

    // Handle data received from the client
    socket.on('data', function (data) {
        console.log('Client says: ' + data.toString());
    });

    // Handle client disconnection
    socket.on('end', function () {
        console.log('Client closed connection');
    });

    // Handle socket errors
    socket.on('error', function (err) {
        console.error('Socket error:', err);
    });

    // Send a message to the client
    socket.write('hi client');
    socket.end();
});

// Handle server errors
server.on('error', function (err) {
    console.error('Server error:', err);
});

// Start listening on port 5500
server.listen(5501, function () {
    console.log('Server is ready and is eager to accept connections on port 5500');
});