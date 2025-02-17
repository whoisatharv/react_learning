const fs = require("fs");
var thisModule = this;
exports.processRequest = function(request, response) {


    var students = [];
    if(fs.existsSync("./private/data/student.db"))
    {
        students = JSON.parse(fs.readFileSync("./private/data/student.db")).students;
    }
    response.setContentType("text/html");
    response.write( "<!DOCTYPE HTML>");
    response.write("<HTML lang = 'eg'>");
    response.write("<head>");
    response.write( "<title> College Message board </title>");
    response.write( "<meta charset = 'utf-8'>");
    response.write("</head>");
    response.write("<h1> Administrator Module </h1>");
    response.write("<table width= '80%' border = '0'>");
    response.write("<tr>");
    response.write("<td><h3> Students </h3></td>");
    response.write("<td align ='right'><a href = 'logout'> Logout </a><td>");
    response.write("</tr>");
    response.write("</table>");
    response.write("<a href = 'StudentAddForm.html'>Add</a>");
    response.write("<table border ='1'>");
    response.write("<thead>");
    response.write("<tr>");
    response.write("<th>S.No </th>");
    response.write("<th>Roll No</th>");
    response.write("<th>Name</th>");
    response.write("<th>Edit</th>");
    response.write("<th>Delete</th>");
    response.write("</tr>");
    response.write("</thead>");
    response.write("<tbody>");
    if(students.length == 0) {
        response.write("<tr>");
        response.write("<td colspan = '5'align ='center'>No Students Exits</td>");
        response.write("</tr>");
    }
    else {
        var student;
        var e =0;
        while(e< students.length){
            student = students[e];
            response.write("<tr>");
            response.write("<td> "+(e+1)+".</td>");
            response.write("<td> "+student.rollNumber +" </td>");
            response.write("<td>" + student.name+"</td>");
            response.write("<td><a href = 'editStudent'> Edit </a></td>");
            response.write("<td><a href = 'deleteStudent'> Delete </a></td>");
            response.write("</tr>");
            e++;
        }
    }
    response.write("</tbody>");
    response.write("</table>");
 response.write(" <a href='AdminHomePage.html'>Home</a>")
    response.write( "<body>");
    response.write( "</html>");
    response.close();
}