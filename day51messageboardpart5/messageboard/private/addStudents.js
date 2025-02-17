const fs= require("fs")
var thisModule=this;
exports.processRequest=function(request,response){
 var rollNumber=parseInt(request.data["rollNumber"]);
 var name=request.data["name"];
 console.log(rollNumber);
 console.log(name);
 var students=[];
 if(fs.existsSync("./private\\data\\student.db"))
 {
    students=JSON.parse(fs.readfileSync("./private\\data\\student.db"))
 }
  var i;
  var found=false;
  for(i=0;i<students.length;i++)
  {
    if(students[i].rollNumber==rollNumber)
    {
        found=true;
        break;
    }
  }
  if(found) {


    response.write("<!DOCTYPE HTML>");
    response.write("<HTML lang = 'eg'>");
    response.write("<head>");
    response.write("   <title> College Message board </title>");
    response.write("   <meta charset = 'utf-8'></head> ");

    response.write("   <script>");
    response.write("       function validateForm(frm) {");
    response.write("           var rollNumber = frm.rollNumber.value.trim();");
    response.write("          var name = frm.name.value.trim();");
    response.write("          var rollNumberErrorSection = document.getElementById('rollNumberErrorSection');");
    response.write("          var nameErrorSection = document.getElementById('nameErrorSection');");
    response.write("     rollNumberErrorSection.innerHTML = ''; //2 single quote");
    response.write("     nameErrorSection.innerHTMl = ''; //2 single quote");
    response.write("     var valid = true;");
    response.write("     if(rollNumber.length == 0) {");
    response.write("        valid = false;");
    response.write("       rollNumberErrorSection.innerHTML = 'Required';");
    response.write("   }");
    response.write("   if(name.length == 0 ) {");
    response.write("       valid = false;");
    response.write("       nameErrorSection.innerHTML = 'Required';");
    response.write("   }");

    response.write("  if (rollNumber.length > 0) {");
    response.write("      var e = 0;");
    response.write("      var validSet = '0123456789';");
    response.write("     while(e < rollNumber.length) {");
    response.write("         if(validSet.indexOf(rollNumber.charAt(e)) == -1){");
    response.write("             valid =false;");
    response.write("            rollNumberErrorSection.innerHTML = 'Should be a number';");
    response.write("            break;");
    response.write("        }");
    response.write("        e++;");
    response.write("   }");
    response.write("}");
    response.write(" return valid;");
    response.write("}");
    response.write("</script>");
    response.write("</head>");

    response.write("<body>");
    response.write("<h1> Administrator </h1>");
    response.write("<table width ='100%' border = '0'>");
    response.write("   <tr>");
    response.write("       <td> ");
    response.write("          <h3> Student (Add Modle) </h3>");
    response.write("      </td>");
    response.write("  </tr>");
    response.write("</table>");
    response.write("<form action ='addStudent' onsubmit ='return validateForm(this)'>");
    response.write("<table>");
    response.write("  <tr>");
    response.write("      <td>Roll Number </td>");
    response.write("     <td><input type = 'text' id ='rollNumber' name ='rollNumber' value = '"+rollNumber+"' maxlength='10' size ='11'>");
    response.write("         <span id = 'rollNumberErrorSection' style = 'color:red'> </span>");
    response.write("     </td>");
    
    response.write("</tr>");
    response.write("<tr>");
    response.write("    <td>Name </td>");
    response.write("    <td><input type = 'text' id ='name' name ='name' value ='"+name+"' maxlength='25' size ='26'>");
    response.write("        <span id = 'nameErrorSection' style = 'color:red'> </span>");
    response.write("    </td>");
    
    response.write("</tr>");
    response.write("<tr>");
    response.write("    <td colspan ='2' align ='center'>");
    response.write("        <button type='submit'> Add </button>");
    response.write("    </td>");
    response.write("</tr>");
    response.write("</table>  ");
    response.write("</form>");
    response.write("<br> ");
    response.write("<a href = 'AdminHomePage.html'> Home </a>");
    response.write("</body>");
    response.write("</html>");

}

// save and send back acknowledge
students[students.length] = {
    "rollNumber": rollNumber,
    "name": name
}

var jsonToWrite = {
    "students": students
}
fs.writeFileSync("./private/data/student.db",JSON.stringify(jsonToWrite));


response.write("<!DOCTYPE HTML>");
response.write("<HTML lang = 'eg'>");
response.write("<head>");
response.write("<title> College Message board </title>");
response.write("<meta charset = 'utf-8'></head> ");
response.write("</head>");
response.write("<body>");
response.write("<h1> Administrator </h1>");

response.write("<table width ='100%' border = '0'>");
response.write(" <tr>");
response.write("    <td> ");
response.write("        <h3> Student (Add Modle) </h3>");
response.write("    </td>");
response.write("    <td align= 'right'>");
response.write("   <a href = 'logout'>Logout</a>");
response.write("    </td>");
response.write(" </tr>");
response.write("</table>");
response.write("Want to add more students");
response.write("<table>");
response.write("<tr> ");
response.write("<td>");
response.write("<form action = 'StudentAddForm.html'>");
response.write("<button type = 'submit'> YES </button>");
response.write("</td>");
response.write("</form>");
response.write("</td>");
response.write("<td>");
response.write("<form action ='AdminHomePage.html'>");
response.write("<button type = 'submit'>NO</button>");
response.write("</td>");
response.write("</tr>");
response.write("</table>");
response.write("</body>");

response.close();
}