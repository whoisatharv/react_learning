const net = require('net'); // Net module is used to create a TCP server
const fs = require('fs'); // File system module for reading files

// Response class for structured server responses
class Response {
    constructor() {
        this.action = ""; // Type of response (e.g., "login", "broadcast")
        this.success = false; // Indicates if the operation was successful
        this.error = null; // Error message if any
        this.result = null; // Stores operation results
    }
}

// DataModel class for managing user data
class DataModel {
    constructor() {
        this.users = []; // Array to hold user data
        this.userID = 0; // Counter for assigning unique user IDs
    }

    getUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }

    getUserByID(id) {
        return this.users.find(user => user.id === id);
    }

    getLoggedInUsers() {
        return this.users.filter(user => user.loggedIn).map(user => user.username);
    }
}

const model = new DataModel(); // Create an instance of DataModel

// Load user data from the file
function populateDataStructure() {
    const usersJSONString = fs.readFileSync("users.data", "utf-8");
    const users = JSON.parse(usersJSONString).users;

    users.forEach(user => {
        user.loggedIn = false; // Ensure all users are initially logged out
        user.id = 0; // Initialize user ID
        user.monitorSocket = null; // Initialize monitorSocket
        model.users.push(user);
    });
}

// Process client requests
function processRequest(requestObject) {
    if (requestObject.action === "login") {
        handleLogin(requestObject);
    }

    if (requestObject.action === "logout") {
        handleLogout(requestObject);
    }

    if (requestObject.action === "send") {
        handleSend(requestObject);
    }

    if (requestObject.action === "broadcast") {
        handleBroadcast(requestObject);
    }

    if (requestObject.action === "getUsers") {
        handleGetUsers(requestObject);
    }

    if (requestObject.action === "createMonitor") {
        handleCreateMonitor(requestObject);
    }
}

// Handle login requests
function handleLogin(requestObject) {
    const { username, password, socket } = requestObject;
    const response = new Response();
    response.action = "login";

    // Validate the username and password
    if (!username || !password) {
        response.success = false;
        response.error = "Username and password are required.";
        socket.write(JSON.stringify(response));
        return;
    }

    const user = model.getUserByUsername(username);
    if (!user) {
        response.success = false;
        response.error = "Invalid username.";
        socket.write(JSON.stringify(response));
        return;
    }

    if (user.password !== password) {
        response.success = false;
        response.error = "Invalid password.";
        socket.write(JSON.stringify(response));
        return;
    }

    if (user.loggedIn) {
        response.success = false;
        response.error = "User is already logged in.";
        socket.write(JSON.stringify(response));
        return;
    }

    // Successfully log in the user
    model.userID++;
    user.id = model.userID;
    user.loggedIn = true;
    socket.userID = model.userID;

    response.success = true;
    response.result = { username: user.username, id: user.id };
    socket.write(JSON.stringify(response));

    // Notify other users about the login
    broadcastNotification(`${user.username} has logged in.`, user);
}

// Handle logout requests
function handleLogout(requestObject) {
    const user = model.getUserByID(requestObject.userID);

    if (!user || !user.loggedIn) {
        const response = new Response();
        response.action = "logout";
        response.success = false;
        response.error = "User not logged in.";
        requestObject.socket.write(JSON.stringify(response));
        return;
    }

    user.loggedIn = false;
    user.id = null;
    user.monitorSocket = null;

    const response = new Response();
    response.action = "logout";
    response.success = true;
    requestObject.socket.write(JSON.stringify(response));

    // Notify other users about the logout
    broadcastNotification(`${user.username} has logged out.`, user);
}

// Handle message sending
function handleSend(requestObject) {
    const { fromUser, toUser, message } = requestObject;

    const recipient = model.getUserByUsername(toUser);
    if (recipient && recipient.loggedIn && recipient.monitorSocket) {
        const response = new Response();
        response.action = "send";
        response.message = message;
        response.fromUser = fromUser;
        recipient.monitorSocket.write(JSON.stringify(response));
    }
}

// Handle broadcast messages
function handleBroadcast(requestObject) {
    const { fromUser, message } = requestObject;

    model.users.forEach(user => {
        if (user.loggedIn && user.monitorSocket) {
            const response = new Response();
            response.action = "broadcast";
            response.message = message;
            response.fromUser = fromUser;
            user.monitorSocket.write(JSON.stringify(response));
        }
    });
}

// Handle getting the list of logged-in users
function handleGetUsers(requestObject) {
    const user = model.getUserByID(requestObject.userID);

    if (user && user.monitorSocket) {
        const response = new Response();
        response.action = "getUsers";
        response.result = model.getLoggedInUsers();
        user.monitorSocket.write(JSON.stringify(response));
    }
}

// Handle monitor creation
function handleCreateMonitor(requestObject) {
    const user = model.getUserByID(requestObject.userID);

    const response = new Response();
    response.action = "createMonitor";

    if (user) {
        user.monitorSocket = requestObject.socket;
        response.result = user.username;
    } else {
        response.result = "";
    }

    requestObject.socket.write(JSON.stringify(response));
}

// Notify other users about login/logout events
function broadcastNotification(message, excludeUser) {
    model.users.forEach(user => {
        if (user.loggedIn && user.monitorSocket && user !== excludeUser) {
            const response = new Response();
            response.action = "notification";
            response.message = message;
            user.monitorSocket.write(JSON.stringify(response));
        }
    });
}

// Start the server
populateDataStructure();
const server = net.createServer(socket => {
    socket.on("data", data => {
        try {
            const requestObject = JSON.parse(data);
            requestObject.socket = socket;
            processRequest(requestObject);
        } catch (e) {
            console.error("Error processing request:", e.message);
        }
    });

    socket.on("end", () => {
        console.log("Client disconnected.");
    });

    socket.on("error", err => {
        console.error("Socket error:", err.message);
    });
});

server.listen(5500, "localhost", () => {
    console.log("Server listening on port 5500.");
});
