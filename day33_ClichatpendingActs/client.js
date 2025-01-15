
const net = require('net'); // TCP client-server connections
const readline = require('readline'); // Reading user input
const events = require('events'); // Event-driven programming

function acceptInput(q, ioInterface) {
    return new Promise((resolve) => {
        ioInterface.question(q, (answer) => {
            resolve(answer);
        });
    });
}

class Request {
    constructor() {
        this.action = null;
        this.username = null;
        this.password = null;
    }
}

class DataModel {
    constructor() {
        this.user = null; // Store logged-in user details
    }
}

const model = new DataModel();
const eventEmitter = new events.EventEmitter();
let client = null;

function processAction(action) {
    if (action === "login") processLoginAction();
    if (action === "logout") processLogoutAction();
    if (action === "acceptCommand") processAcceptCommandAction();
}

// Login logic
async function processLoginAction() {
    const ioInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const username = await acceptInput("Username: ", ioInterface);
    const password = await acceptInput("Password: ", ioInterface);
    ioInterface.close();

    const request = new Request();
    request.action = "login";
    request.username = username;
    request.password = password;

    client.write(JSON.stringify(request));
}

// Login response handler
function processLoginActionResponse(response) {
    if (!response.success) {
        console.log(response.error);
        processAction("login");
    } else {
        model.user = response.result;
        console.log(`Welcome ${model.user.username}!`);
        processAction("acceptCommand");
    }
}

// Logout logic
function processLogoutAction() {
    const request = new Request();
    request.action = "logout";
    request.userID = model.user.id;

    client.write(JSON.stringify(request));
}

// Logout response handler
function processLogoutActionResponse(response) {
    if (!response.success) {
        console.log(response.error);
    } else {
        console.log("Successfully logged out.");
        model.user = null;
        client.destroy();
    }
}

// Accept user commands after login
async function processAcceptCommandAction() {
    const ioInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    while (model.user) {
        const command = await acceptInput(
            `${model.user.username}(${model.user.id}) > `,
            ioInterface
        ).then((c) => c.trim());

        const request = new Request();

        if (command.startsWith("send ")) {
            const [_, toUser, ...messageParts] = command.split(" ");
            const message = messageParts.join(" ");

            if (!toUser || !message) {
                console.log("Invalid send command. Use: send <username> <message>");
                continue;
            }

            request.action = "send";
            request.fromUser = model.user.username;
            request.toUser = toUser;
            request.message = message;
            client.write(JSON.stringify(request));
        } else if (command.startsWith("broadcast ")) {
            const message = command.substring(10);
            request.action = "broadcast";
            request.fromUser = model.user.username;
            request.message = message;
            client.write(JSON.stringify(request));
        } else if (command === "getUsers") {
            request.action = "getUsers";
            request.userID = model.user.id;
            client.write(JSON.stringify(request));
        } else if (command === "logout") {
            processLogoutAction();
            ioInterface.close();
            break;
        } else {
            console.log("Invalid command. Use send, broadcast, getUsers, or logout.");
        }
    }
}

// Handle server responses
client = new net.Socket();
client.connect(5500, "localhost", function () {
    console.log("Connected to the chat server.");
    processAction("login");
});

client.on("data", function (data) {
    const response = JSON.parse(data);

    if (response.action === "login") processLoginActionResponse(response);
    if (response.action === "logout") processLogoutActionResponse(response);
    if (response.action === "notification") console.log(response.message);
    if (response.action === "send") console.log(`${response.fromUser} > ${response.message}`);
    if (response.action === "broadcast") console.log(`[Broadcast] ${response.fromUser} > ${response.message}`);
    if (response.action === "getUsers") {
        console.log("Online users:", response.result.join(", "));
    }
});

client.on("close", () => console.log("Disconnected from the server."));
