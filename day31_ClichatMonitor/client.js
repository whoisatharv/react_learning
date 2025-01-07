const net=require('net');//net module helps in creating tcp client -server connections
const readline=require('readline');//readline module provides an interface for reading reader input from the user and displaying output to the console

const events=require('events');//event module provide a way to work with event driven programming.

function acceptInput(q,ioInterface)
{
    var promise=new Promise(function(resolve,reject){
        ioInterface.question(q,function(answer){ //the question method from readliine mmodule  displays  the prompt(q) to the user and waits for the input.
            resolve(answer);
        })
    });
    return promise;
    }

    class Request {
        constructor() {
            this.action = null;
            this.username = null;
            this.password = null;
        }
    }
    


class DataModel
{
    constructor()
    {
        this.user=null;

    }
}
var model=new DataModel();
var eventEmitter=new events.EventEmitter();
var client=null;
function processAction(action)
{
    if(action=='login') processLoginAction();
    if(action=='logout') processLogoutAction();
    if(action=='acceptCommand') processAcceptCommandAction();
}
//Login action
async function processLoginAction(){
    let ioInterface= readline.createInterface({
        "input":process.stdin,
    "output": process.stdout
    });
    let username= await acceptInput("Username:",ioInterface);
    let password=await acceptInput("Password:",ioInterface);
    ioInterface. close();
    let request= new Request();
    request.action="login";
    request.username=username;
    request.password=password;
    client .write(JSON.stringify(request));

}
// login response
function processLoginActionResponse(response)
{
    if(response.success==false){
     console.log(response.error);
     processAction("acceptCommand");
    }
    else{
        model.user=response.result
        eventEmitter.emit('loggedIn');
    }
}
 async function processLogoutAction(response)
 {
  let request= new Request();
  request.action="logout";//here we are specify the logout action
  client.write(JSON.stringify(request));//Notifying the server for the logout request
 }

 function processLogoutActionResponse(response)
 {
  if(response.success==false){
    console.log(response.error);
    processAction("accept command");
  }
  else{
    console.log("successfully logged out.");
    model.user=null;
    client .destroy();//close the client socket
  }
 }

 // Accept command from the user after login
async function processAcceptCommandAction() {
    // Check if the user is logged in before accepting commands
    if (!model.user) {
        console.log("You must log in first.");
        return processAction('login'); // If not logged in, prompt for login again
    }

    let ioInterface = readline.createInterface({
        "input": process.stdin,
        "output": process.stdout
    });

    while (true) {
        let command = await acceptInput(`${model.user.username}(${model.user.id}) > `, ioInterface); // Prompt with username and id
        
        // Handle user input command
        let request = new Request();
        request.action = command; // Set action based on user input
        request.userID = model.user.id; // Set userID based on the logged-in user

        if (command === 'logout') {
            client.write(JSON.stringify(request)); // Send logout request to the server
            ioInterface.close(); // Close the interface after logout command
            break; // Exit the loop after logging out
        }
        
        // Add additional conditions for other commands (like getUsers)
        if (command === 'getUsers') {
            client.write(JSON.stringify(request)); // Send getUsers request to the server
        }

        // If the command is anything else, just send it to the server
        else {
            client.write(JSON.stringify(request)); // Send the command to the server
        }
    }
}
//har  function  apna ek interface banega


 
 function loggedIn()
 {
  console.log(`welcome ${model.user.username}`);
  processAction('acceptCommand');
 }

 function loggedOut(){
    console.log("You have been logged out");

 }
  eventEmitter.on("loggedOut",loggedOut);

 

//setting up events
eventEmitter.on('loggedIn',loggedIn);

client=new net.Socket();
client.connect(5500,"localhost",function(){
    console.log("connected to the chat server");
    processAction('login');
});


client.on('data',function(data){
    var response=JSON.parse(data);
    if(response.action=="login") processLoginActionResponse(response);
    });
