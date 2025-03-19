const fs = require("fs");
var thisModule = this;
exports.processRequest = function(request, response) {
    var rollNumber = parseInt(request.data["rollNumber"]);
    var students = [];

    if(fs.existsSync("./private/data/student.db")){
        students = JSON.parse(fs.readFileSync("./private/data/student.db")).students;
    }
    var i;
    var found = false;
    var name = "";
    for(i= 0; i< students.length; i++) {
        if(students[i].rollNumber == rollNumber) {
            name = students[i].name;
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
        response.write("          <h3> Student (Delete Modle) </h3>");
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

        response.write("<!DOCTYPE HTML>");
        response.write("<HTML lang = 'eg'>");
        response.write("<head>");
        response.write("   <title> College Message board </title>");
        response.write("   <meta charset = 'utf-8'></head> ");
        response.write("<script>");
        response.write("function cancelDeletion() {");
        response.write("    document.getElementById('cancelDeletionForm').submit();");
        response.write("}");
        response.write("</script>");
        response.write("</head>");

        response.write("<body>");
        response.write("<h1> Administrator </h1>");
        response.write("<table width ='100%' border = '0'>");
        response.write("   <tr>");
        response.write("       <td> ");
        response.write("          <h3> Student (Delete Modle) </h3>");
        response.write("      </td>");
        response.write("       <td align = 'right'> ");
        response.write("          <a href = 'logout'> Logout</a>");
        response.write("      </td>");
        response.write("  </tr>");
        response.write("</table>");
        response.write("<form action ='deleteStudent'>");
        response.write("<table>");
        response.write("  <tr>");
        response.write("      <td>Roll Number: </td>");
        response.write("     <td><input type = 'hidden' id ='rollNumber' name ='rollNumber' value = '"+rollNumber+"'>");
        response.write("<b>"+rollNumber+"</b>");
        response.write("     </td>");
        
        response.write("</tr>");
        response.write("<tr>");
        response.write("    <td>Name: </td>");
        response.write("    <td>");
        response.write(name);
        response.write("</td>");
        response.write("</tr>");
        response.write("<tr>");
        response.write("<td colspan ='2' align ='center'>");
        response.write("<button type='submit'>Delete</button>&nbsp&nbsp&nbsp");
        response.write("<button type ='button' onclick ='cancelDeletion()'>Cancel</button>");
        response.write("</td>");
        response.write("</tr>");
        response.write("</table>");
        response.write("</form>");
        response.write("<form action ='getStudents' id ='cancelDeletionForm'> </form>");
        response.write("<br>");
        response.write("<a href = 'AdminHomePage.html'> Home </a>");
        response.write("</body>");
        response.write("</html>");
        response.close();
}