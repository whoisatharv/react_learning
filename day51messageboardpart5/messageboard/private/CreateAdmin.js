const fs = require("fs");
var thisModule = this;
exports.processRequest = function(request, response) {

    var username = request.data["username"];
    var password = request.data["password"];

    var administrator =  JSON.parse(fs.readFileSync("./private/data/admin.conf"));

    if(administrator.username != username || administrator.password != password) {

        response.setContentType("text/html");
        response.write( "<!DOCTYPE HTML>");
        response.write("<HTML lang = 'eg'>");
        response.write("<head>");
        response.write( "<title> College Message board </title>");
        response.write( "<meta charset = 'utf-8'>");
        response.write( "<script> ");
        response.write( "function validateForm(f){");
        response.write( "var username = f.username.value.trim();");
        response.write( "var password = f.password.value.trim();");
        response.write( "if(username.length == 0) {");
        response.write( "alert('Username Required');");
        response.write( "f.username.focus();");
        response.write( " return false;");
        response.write( "}");

        response.write( "if(password.length == 0) {");
        response.write( "   alert('Password Required');");
        response.write( "   f.password.focus();");
        response.write( "   return false;");
        response.write( "}");
        response.write( "return true;");
        response.write( "}");
        response.write( "</script>");
        response.write( "<body>");

        response.write( "<h1> Administrator Module  </h1>");
        response.write( "<h3> Authentication</h3>");
        response.write( "<div style = 'color:red'>");
        response.write( "Invalid Username and Password <br>");
        response.write(" </div>");
        response.write( "<form action = 'authenticateAdmin' method = 'POST' onsubmit = 'return validateForm(this)'>");
        response.write( "<table border = '0' >");
        response.write( "<tr>");
        response.write( "<td> UserName </td>");
        response.write( "<td><input type = 'text' id = 'username' name = 'username' value ='"+username+"'maxlength = '15' size = '16' /> </td>");
        response.write( "</tr>");
        response.write( "<tr>");
        response.write( "<td> Password</td>");
        response.write( "<td> <input type = 'password' id = 'password' name = 'password' maxlength = '15' size = '16' /></td>");
        response.write( "</tr>");
        response.write( "<tr>");
        response.write( "<tr>");
        response.write( "<td colspan = '2' align = 'center'>");
        response.write( "<button type = 'submit'> Login </button>");
        response.write( "</td>");
        response.write( "</tr>");
        response.write( "</table>");
        response.write( "</form>");
        response.write( "</body>");
        response.write( "</html>");
        response.close();
        return;
    }
    response.write( "<!DOCTYPE HTML>");
    response.write("<HTML lang = 'eg'>");
    response.write("<head>");
    response.write( "<title> College Message board </title>");
    response.write( "<meta charset = 'utf-8'>");
    response.write( "</head>");
    response.write( " <body>");   
    response.write( "<h1> Administrator Module </h1>");
    response.write( "<a href= 'StudentAddForm.html'> Add Student </a> <br>");
    response.write( "<a href= 'getStudents'> Students List</a> <br>");
    response.write( "<a href= 'MessageForm.html'> Post Message </a> <br>");
    response.write( "<a href= 'messageBoard'> Message Board </a> <br>");
    response.write( "<a href= 'logout'> Logout </a> <br>");
    response.write( "</body>");
    response.write( "</html>");    
    response.close();

}