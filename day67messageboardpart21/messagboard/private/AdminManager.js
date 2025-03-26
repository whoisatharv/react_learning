module.exports = class AdminManager {
 constructor() {

 }

 index() {
//when this method gets called check if admin credentials data file exists, if exists, send back json as follows
{
    "forward": "private/AdminIndex.html"
}
//if does not exist , return json as follow

{
    "forward":"private/AdministratorCreationForm.html"
}
 }

 createAdministrator(administrator) {
  //check if the admin credentials data file exists,
 // if exists return the following json
 {
    "forward":"private/AdminIndex.html"
 }
 }

 checkCredentials(administrator) {
 	//compare data against administrator object with data in credentials data file
    //if matches return the following json
    {
        "success": true
    }
    //else return the following json
    {
        "success":false
    }
 }

 logout(){
    //return the following json
    {
        "forward":"private/AdminIndex.html"
    }
 }
}