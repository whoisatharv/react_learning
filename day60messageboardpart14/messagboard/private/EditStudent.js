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



        response.write("<!DOCTYPE HTML>");
        response.write("<HTML lang = 'eg'>");
        response.write("<head>");
        response.write("   <title> College Message board </title>");
        response.write("   <meta charset = 'utf-8'></head> ");

        response.write("   <script>\r\n");
        response.write("       function validateForm(frm) {\r\n");

        response.write("          var name = frm.name.value.trim();\r\n");
        response.write("          var nameErrorSection = document.getElementById('nameErrorSection');\r\n");
        response.write("     nameErrorSection.innerHTMl = ''; //2 single quote\r\n");
        response.write("     var valid = true;\r\n");
        response.write("   if(name.length == 0 ) {\r\n");
        response.write("       valid = false;\r\n");
        response.write("       nameErrorSection.innerHTML = 'Required';\r\n");
        response.write("   }\r\n");
        response.write(" return valid;\r\n");
        response.write("}\r\n");

        response.write("function cancelUpdation(){\r\n");
        response.write("document.getElementById('cancelUpdationFrom').submit();\r\n");
        response.write("}\r\n");

        response.write("</script>\r\n");
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
        response.write("<form action ='updateStudent' onsubmit ='return validateForm(this)'>");
        response.write("<table>");
        response.write("  <tr>");
        response.write("      <td>Roll Number: </td>");
        response.write("     <td><input type = 'hidden' id ='rollNumber' name ='rollNumber' value = '"+rollNumber+"'>");
        response.write("<b>"+rollNumber+"</b>");
        response.write("     </td>");
        
        response.write("</tr>");
        response.write("<tr>");
        response.write("    <td>Name: </td>");
        response.write("    <td><input type = 'text' id ='name' name ='name' value ='"+name+"' maxlength='25' size ='26'>");
        response.write("        <span id = 'nameErrorSection' style = 'color:red'> </span>");
        response.write("    </td>");
        response.write("</tr>");
        response.write("<tr>");
        response.write("<td colspan ='2' align ='center'>");
        response.write("<button type='submit'>Update</button>");
        response.write("<button type ='button' onclick ='cancelUpdation()'>Cancel</button>");
        response.write("</td>");
        response.write("</tr>");
        response.write("</table>");
        response.write("</form>");
        response.write("<form action ='getStudents' id = 'cancelUpdationFrom'> </form>");
        response.write("<br>");
        response.write("<a href = 'AdminHomePage.html'> Home </a>");
        response.write("</body>");
        response.write("</html>");
        response.close();
}