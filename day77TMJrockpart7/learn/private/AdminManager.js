const fs = require("fs");
module.exports = class AdminManager {
 constructor() {
  this.adminconfPath = "./private/data/admin.conf";
 }

 index() {
    var adminconfPath = "./private/data/admin.conf";
    var adminExists = fs.existsSync(this.adminconfPath);
    if(adminExists) {
        try {
            var administrator =JSON.parse(fs.readFileSync(this.adminconfPath))
            } catch (exception) {
                adminExists =false;
        }
    } 
    adminExists = adminExists && administrator.username && administrator.password
    var responseJSON = null;
    if(adminExists) responseJSON = {"forward": "/private/AdminIndex.html"};
    else responseJSON = {"forward": "/private/AdministratorCreationForm.html"}
    return responseJSON;
 }

 createAdministrator(administrator) {
    var adminExists = fs.existsSync(this.adminconfPath);
    if(adminExists) {
        try {
            var vAdministrator =JSON.parse(fs.readFileSync(this.adminconfPath))
            } catch (exception) {
                adminExists =false;
                fs.unlinkSync(this.adminconfPath);
        }
    } 
    adminExists = adminExists && vAministrator.username && vAdministrator.password
    if(!adminExists) {
        var administratorJSON = {
            "username": administrator.username,
            "password": administrator.password
        }
        console.log(administratorJSON);
        fs.writeFileSync(this.adminconfPath, JSON.stringify(administratorJSON));
    }

    return {"forward" : "/private/AdminIndex.html"};

 }

 checkCredentials(administrator) {
var adminExists = fs.existsSync(this.adminconfPath);
    if(adminExists) {
        try {
            var vAdministrator = JSON.parse(fs.readFileSync(this.adminconfPath))
            } catch (exception) {
                adminExists =false;
        }
    } 
    adminExists = adminExists && vAdministrator.username && vAdministrator.password
    
        // you verify following scenario
        if(!adminExists) return {"forward": "/admin"}
        return {"success": (vAdministrator.username == administrator.username && vAdministrator.password == administrator.password)}
 }

 logout() {
     /*
        retrun the following json
        {
        "forward" : "/private/AdminIndex.html"
        }
     */
     console.log("Logout get called");
 }
 home(){
    //later on we will have to apply check for backdoor entry
    return{
        "forward":"private/AdminHome.html"
    }
 }

}