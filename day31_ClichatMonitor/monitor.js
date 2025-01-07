const net = require('net'); // Net module for TCP client-server connections
const events = require('events'); // Event module for event-driven programming

// Request class to structure requests sent to the server
class Request {
    constructor() {
        this.action = null;
        this.userID = null;
        this.username = null;
        this.password = null;
    }
}

// DataModel class to store and manage monitor-related data
class DataModel {
    constructor() {
        this.id = null;
        this.username = null;
    }
}

// Initialize model, event emitter, and client socket
const model = new DataModel();
const eventEmitter = new events.EventEmitter();
let client = null;

// Event handler: Handle logout event
function loggedOut() {
    console.log("You have been logged out");
}

// Event handler: Handle online users list arrival
function usersListArrived(users) {
    console.log("List of online users:");
    for (let e = 0; e < users.length; e++) {
        console.log(users[e]);
    }
    
}

// Event handler: Monitor created successfully
function monitorCreated(username) {
    model.username = username;
    console.log("Monitor for user: " + username);
}

// Event handler: Monitor creation denied
function monitordenied() {
    console.log("Unable to create monitor as id is invalid: " + model.id);
    process.exit(0);
}

// Setting up events
eventEmitter.on('loggedOut', loggedOut);
eventEmitter.on('usersListArrived', usersListArrived);
eventEmitter.on('monitorCreated', monitorCreated);
eventEmitter.on('monitordenied', monitordenied);

// Read ID from command-line arguments and set up the model
model.id = process.argv[2];

// Create a new TCP socket
client = new net.Socket();

// Connect to the server
client.connect(5500, "localhost", function () {
    console.log("Connected to the chat server");
    let request = new Request();
    request.action = "createMonitor";
    request.userID = model.id; // Send the user ID to the server
    client.write(JSON.stringify(request)); // Write request to the server
});

// Handle data received from the server
client.on('data', function (data) {
    try {
        let response = JSON.parse(data); // Parse server response
        if (response.action === "createMonitor") {
            if (response.result && response.result.length > 0) {
                eventEmitter.emit('monitorCreated', response.result);
            } else {
                eventEmitter.emit('monitordenied');
            }
        } else if (response.action === "logout") {
            eventEmitter.emit('loggedOut');
        } else if (response.action === "getUsers") {
            eventEmitter.emit('usersListArrived', response.result);
        }
    } catch (e) {
        console.error("Error parsing server response:", e.message);
    }
});

// Handle client socket errors
client.on('error', function (err) {
    console.error("Socket error:", err.message);
});

// Handle client socket closure
client.on('end', function () {
    console.log("Disconnected from the chat server");
});
