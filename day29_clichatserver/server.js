const net =require('net')//net module is used to create a tcp server  for handling client connection
const fs=require('fs');

//the purpose of response class  is to represent a structured response to be sent back to the client
class Response
{
    constructor()
    {
        this.action="";
        this.success=false;
        this.error=null;
        this.result=null;

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
        users.id=0;//initialize user id
        model.users.push(user);//adds each user to the instance

    });
}
 
//handling the different client requests based on the action field
function processRequest(requestObject)

{
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
  let response=new Response();
  response.action=requestObject.action;
//finding the user associated with this socket
let user=model.users.find(u=>u.id===requestObject.socket,userID);
if(user&& user.loggedIn){
    //mark user as logged out
    user.loggedIn=false;
    delete requestObject.socket.userID;//remove user id from the socket
     //prepare the success response
     response.success=true;
     reponse.error=null;
     response.result=`User ${user.username} has logged out successfully`;
}
else{
            // If the user is not found or not logged in
            response.success = false;
            response.error = "No logged-in user found for this socket.";
            response.result = null;
    
}
requestObject.socket.write(JSON.stringify(response));

 }//logout part ends


 if(requestObject.action=="getUsers"){
  var response= new Response();
  response.action=requestObject.action;
  response.result=model.getLoggedInUsers();
  requestObject.socket.write(JSON.stringify(response))
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

  socket.on('end',function{
    console.log('client closed the connection');
  });

  socket.on('error',function(){

  })
    });
    server.listen(5500,"localhost");
    console.log("chat server is ready to accept request on port 5500");

    
