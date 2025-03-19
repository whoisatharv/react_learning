const fs = require("fs");
var thisModule = this;
exports.processRequest = function(request, response) {

    var username = request.data["username"];
    var password = request.data["password"];
    var repassword = request.data["repassword"];

    if(username != null) username = username.trim(); else username = "";
    if(password != null) password = password.trim(); else password = "";
    if(repassword != null) repassword = repassword.trim(); else repassword = ""; 

    var resend = false;

    if (username.length == 0) resend = true;
    if(password.length == 0) resend = true;
    if(repassword != password) resend = true;

    if(resend) {

        response.setContentType("text/html");
        response.write( "<!DOCTYPE HTML>");
        response.write("<HTML lang = 'eg'>");
        response.write("<head>");
        response.write( "<title> College Message board </title>");
        response.write( "<meta charset = 'utf-8'>");
        response.write( "</body>");
        response.write( "</html>");
        response.write( "<h1> Administrator Module  </h1>");
        response.write( "<h3> SetUp administrator Account</h3>");
        response.write( "<div style = 'color:red'>");
        if(username.length == 0) response.write( " Username required <br>");
        if(password.length == 0) response.write( " Password is required");
        else if (password != repassword) response.write( "Password typed incorrtect <br>");
        response.write(" </div>");
        response.write( "<form action = 'createAdmin' method = 'POST'>");
        response.write( "<table border = '0' >");
        response.write( "<tr>");
        response.write( "<td> UserName </td>");
        response.write( "<td><input type = 'text' id = 'username' name = 'username' value ='"+username+"  'maxlength = '15' size = '16' /> </td>");
        response.write( "</tr>");
        response.write( "<tr>");
        response.write( "<td> Password</td>");
        response.write( "<td> <input type = 'password' id = 'password' name = 'password' maxlength = '15' size = '16' /></td>");
        response.write( "</tr>");
        response.write( "<tr>");
        response.write( "<tr>");
        response.write( "<td> Renter Password</td>");
        response.write( "<td> <input type = 'password' id = 'repassword' name = 'repassword' maxlength = '15' size = '16' /></td>");
        response.write( "</tr>");
        response.write( "<tr>");
        response.write( "<td colspan = '2' align = 'center'>");
        response.write( "<button type = 'submit'> Create </button>");
        response.write( "</td>");
        response.write( "</tr>");
        response.write( "</table>");
        response.write( "</form>");
        response.write( "</body>");
        response.write( "</html>");
        response.close();
        return;
    }
    
    var administrator = {
        "username": username,
        "password": password
    }; 
    fs.writeFileSync("./private/data/admin.conf", JSON.stringify(administrator));

    response.write( "<!DOCTYPE HTML>");
    response.write("<HTML lang = 'eg'>");
    response.write("<head>");
    response.write( "<title> College Message board </title>");
    response.write( "<meta charset = 'utf-8'>");
    response.write( "</head>");
    response.write( " <body>");   
    response.write( "<h1> Administrator Module </h1>");
    response.write( "<h3> Setup Administrator Account </h3>");
    response.write( "<h2> Account updated </h2>");
    response.write( "<form action = '/admin'>");
    response.write( "<button type = 'submit' > Proceed to login </button>");
    response.write( "</form>");
    response.write( "</body>");
    response.write( "</html>");    
    response.close();

}