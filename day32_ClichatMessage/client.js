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
function processSpaces(command){
    command=command.trim();
    while(true)
    {
        var i=command.indexOf("  ");//2 spaces
        if(i==-1) break;
        command=command.replace("  "," ")//2spaces followed by 1 space
    }
    return command;
}
function isValidCommand(command){
    command=command.trim();
    if(command=="logout") return true;
    if(command=="getUsers")return true;
    if(command.startsWith("send "))
    {
      var pcs=command.split(" ");///1space
      if(pcs.length>=3)return true;
    }
    if(command.startsWith("broadcast"))
    {
        const pcs = command.split(" "); // Split by a single space
        if (pcs.length >= 2) return true;
    }
    return false;
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
        let command = processSpaces(await acceptInput(`${model.user.username}(${model.user.id}) > `, ioInterface)); // Prompt with username and id
        
         if(isValidCommand(command)==false)
         {
            console.log("Invalid command/syntax");
            continue;
         }
        
        // Handle user input command
        let request = new Request();
        if(command.startsWith("send")){
              //assignment
              var spc1=command.indexOf(" ");
              var spc2=command.indexOf(" ",spc1+1);
              var message=command.subtring(spc2+1);
              var toUser=command.substring(spc1+1,spc);
              //assignemnt
        }
        if(command.startsWith("broadcast")){
            request.action="broadcast";
            request.fromUser=model.user.username;
            request.message=command.substring(10);
            
            client.write(JSON.stringify(request));
        }
        if(command=="getUsers"|| command=="logout")
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


    //in assignment we have to do , suppose that whenever  sombody login or logout to the chat window it should  print on the window of the other ser that  for example tina has logged in  aur tina has logged out .