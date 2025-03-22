const fs = require("fs");
var thisModule = this;
exports.processRequest = function(request, response) {
    var rollNumber = parseInt(request.data["rollNumber"]);
    var name = request.data["name"];
    var students = [];

    if(fs.existsSync("./private/data/student.db")){
        students = JSON.parse(fs.readFileSync("./private/data/student.db")).students;
    }
    var i;
    var found = false;
    for(i= 0; i< students.length; i++) {
        if(students[i].rollNumber == rollNumber) {
            found = true;
            break;
        }
    }

if(!found) {

        response.write("<!DOCTYPE HTML>");
        response.write("<HTML lang = 'eg'>");
        response.write("<head>");
        response.write("   <title> College Message board </title>");
        response.write("   <meta charset = 'utf-8'></head> ");
        response.write("</head>");
        response.write("<body>");
        response.write("<h1> Administrator </h1>");
        response.write("<table width ='100%' border = '0'>");
        response.write("   <tr>");
        response.write("       <td> ");
        response.write("          <h3> Student (Edit Modle) </h3>");
        response.write("      </td>");
        response.write("       <td align = 'right'> ");
        response.write("          <a href = 'logout'> Logout</a>");
        response.write("      </td>");
        response.write("  </tr>");
        response.write("</table>");
        response.write(`<span style = 'color:red'>Roll Number: ${rollNumber} does not exit. </span>`);
        response.write("<form action ='getStudents' onsubmit ='return validateForm(this)'>");
        response.write("<button type = 'submit'>Ok</button>");
        response.write("</form>");
        response.write("<br> ");
        response.write("<a href = 'AdminHomePage.html'> Home </a>");
        response.write("</body>");
        response.write("</html>");
        response.close();
        return;
}

        students[i] = {
            "rollNumber": rollNumber,
            "name": name
        }

        var jsonToWrite = {
            "students": students
        }

        fs.writeFileSync("./private/data/student.db", JSON.stringify(jsonToWrite));

        response.write("<!DOCTYPE HTML>");
        response.write("<HTML lang = 'eg'>");
        response.write("<head>");
        response.write("   <title> College Message board </title>");
        response.write("   <meta charset = 'utf-8'></head> ");

        response.write("</head>");

        response.write("<body>");
        response.write("<h1> Administrator </h1>");
        response.write("<table width ='100%' border = '0'>");
        response.write("   <tr>");
        response.write("       <td> ");
        response.write("          <h3> Student (Edit Modle) </h3>");
        response.write("      </td>");
        response.write("       <td align = 'right'> ");
        response.write("          <a href = 'logout'> Logout</a>");
        response.write("      </td>");
        response.write("  </tr>");
        response.write("</table>");
        response.write("<form action ='getStudents'>");
        response.write("<center><b> Student Updated </b> <br>");
        response.write("<button type = 'submit' >OK</button>");
        response.write("</center>");
        response.write("</from>");
        response.write("<br>");
        response.write("<a href = 'AdminHomePage.html'> Home </a>");
        response.write("</body>");
        response.write("</html>");
        response.close();
}