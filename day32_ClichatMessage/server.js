//server side pr hume ab yeh dhyan rkhna he ki jisne humne request bheji he use response  nhi dena he usse related joh monitor vala socket he use response dena he
const net =require('net')//net module is used to create a tcp server  for handling client connection
const fs=require('fs');

//the purpose of response class  is to represent a structured response to be sent back to the client
class Response
{
    constructor()
    {
        this.action=""; // describes the type of response(e.g,"login","broadcast")
        this.success=false;//indicates if the operation was successful
        this.error=null;//holds error message if any
        this.result=null;// stores the result  of the operation.

    }
}
class DataModel //the purpose of the data model is to store and manage user data.
{
    constructor()
    {
        this.users=[];//array to hold the user data
        this.userID=0;//counter variable for alloting id to logged in user
    }
    getUserByUsername(username)
    {
        var user= this.users.find(function(user){
            return user.username==username; // finds the user by user name
        });
        return user; //return the user object if found
    }

    getUserByID(id)
    {
        var user=this.users.find(function(user){
            return user.id==id;
        });
        return user;
    }

    getLoggedInUsers()
    {
        var loggedInUsers=[];
        for(var e=0;e<this.users.length; e++)
        {
            if(this.users[e].loggedIn){// checks if user is logged in
                loggedInUsers.push(this.users[e].username);
            }
        }
        return loggedInUsers; /// returns the list of logged in user name.
    }
}
//loading user data from file user.data and initiallizing the usser list
var model= new DataModel();//creating a single instance of data model class for use throughout the app.

function populateDataStructure()
{
    var usersJSONString=fs.readFileSync("users.data","utf-8");
    var users=JSON.parse(usersJSONString).users;

    users.forEach(function(user){
        user.loggedIn=false;//ensures all users are initially logged out
        user.id=0;//initialize user id
        users.monitorSocket=null
        model.users.push(user);//adds each user to the instance

    });
}
 
//handling the different client requests based on the action field
function processRequest(requestObject)
         
{
    if(requestObject.action=="broadcast")
    
   {
    let message=requestObject.message;
    let fromUser=requestObject.fromUser;
    
    model.users.forEach(function(user){  //joh joh logged in har kisi ko message jana chaiye
        if(user.loggedIn&&user.monitorSocket)
        {
            var response=new Response();
            response.action=requestObject.action;
            response.message=message;

            response.fromUser=fromUser;
            user.monitorSocket.write(JSON.stringify(response));
            console.log("sending to:"+user.username)
            console.log(response.action+"-->"+response.message);
            console.log("from user :"+response.fromUser);
        }
    });

   }
    if(requestObject.action=="createMonitor")
    {
        let userID=requestObject.userID;
        let user=model.getUserByID(userID);
        var response=new Response();
        response.action=requestObject.action;
        if(user)
        {
            user.monitorSocket=requestObject.socket;
            response.result=user.username;
           
        }
        else{
            response.result="";
        }
        requestObject.socket.write(JSON.stringify(response));
    }
 if(requestObject.action=="login"){
 let username=requestObject.username;
 let password=requestObject.password;
 let user=model.getUserByUsername(username);
 var success=false;
 if(user)
 {
    if(password==user.password) success=true;
 }
 let response=new Response()
 response.action=requestObject.action;
 response.success=success;
 if(success)
  {
   response.error="";

   model.userID++;
   requestObject.socket.userID=model.userID;//providing id to the socket
   user.id=model.userID;
   user.loggedIn=true;
   response.result={
    "username":user.username,
    "id":user.id
   };
 }
 else
 {
  response.error="Invalid username/password";
  response.result="";
 }
 requestObject.socket.write(JSON.stringify(response));
 }//login part ends



 if(requestObject.action=="logout"){
  let userID=requestObject.userID;
  let user=model.getUserByID(userID);
  if(user&&user.monitorSocket){
    var response=new Response();
    response.action=requestObject.action;
    response.success=true;
    user.monitorSocket.write(JSON.stringify(response));

  }
  user.loggedIn=false;
  user.id=null;
  user.monitorSocket=null;

 }//logout part ends


 if(requestObject.action=="getUsers")
    {
     let userID=requestObject.userID;
     let user=model.getUserByID(userID);
     if(user&& user.monitorSocket){
  var response= new Response();
  response.action=requestObject.action;
  response.result=model.getLoggedInUsers();
  user.monitorSocket.write(JSON.stringify(response))
}
 }//get users parts ends here
}

populateDataStructure();
//json string aayi
//json string me action hoga(for example login ke case me password hoga , username hoga)
 var server=net.createServer(function(socket){
  socket.on('data',function(data){
    var requestObject=JSON.parse(data); //some more programming is required to handel fragments of data 
    requestObject.socket=socket;// request object me socketki property aur bada ke usko fir aage pass krdiya
    try{
        processRequest(requestObject);
    } catch(e)
    {
        console.log(e);
    }
   
  });

  socket.on('end',function(){
    console.log('client closed the connection');
  });

  socket.on('error',function(){

  })
    });
    server.listen(5500,"localhost");
    console.log("chat server is ready to accept request on port 5500");

    
