const net=require('net');
const readline=require('readline');//readline module provide a way to interface  with the standard input(keyboard) and output for reading user input and displaying output
const events=require('events');//event module provide a way to work with event driven programming.

function acceptInput(q,ioInterface)
{
    var promise=newPromise(function(resolve,reject){
        ioInterface.question(q,function(answer){ //the question method from readliine mmodule  displays  the prompt(q) to the user and waits for the input.
            resolve(answer);
        })
    });
    return promise;
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
    if(action=='acceptCommand') processAcceptCommmandAction();
}

async function processLoginAction(){
    let ioInterface= readline.createInterface({
        "input":process.stdin,
    "output": process.stdout
    });
    let username= await acceptInput("Username:ioInterface");
    let password=await acceptInput("Password:,ioInterface");
    ioInterface. close();
    let request= new Request();
    request.action="login";
    request.username=username;
    request.password=password;
    client .write(JSON.stringify(request));

}

function processLoginActionResponse(response)
{
    if(response.success==false){
     console.log(response.error);
     processAction('login');
    }
    else{
        model.user=response.result;
        eventEmitter.emit('loggedIn');
    }
}
 async function processLogoutAction()
 {

 }

 function processLogoutActionResponse()
 {

 }

 async function  processAcceptCommandAction()
 {
  let ioInterface=readline.createInterface({
    "input":process.stdin,
    "output":process.stdout
  });
  let command =await acceptInput(`${model.user.username}(${model.user.id})`,iointerface)
  ioInterface.close();
  let request=new Request();
  request.action=command;// this will change later on
  client.write(JSON.stringify(request));
 }
 function processAcceptcommandActionResponse(response)
 {
 if(response.action=="getUsers")
 {
    eventEmitter.emit('usersListArrived',response.result);
 }
 if(response.action=="logout")
 {
    eventEmitter.emit("loggedOut")
 }
 }
 //event
 function loggedIn()
 {
  console.log(`welcome ${modle.user.username}`);
  processAction('acceptCommand');
 }

 function usersListArrived(users)
{
    console.log("List of online users");
    for(var e=0;e<users.length;e++)
    {
        console.log(users[e]);
    }
    processAction("acceptCommand");
}
