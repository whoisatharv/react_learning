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

    if(found) {
        request.errorMessage = "That student exits";
        request.rollNumber = rollNumber;
        request.name = name;
        request.forward("StudentAddForm.jst");
        return
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
    request.forward("StudentAddedNotification.html");

    response.close();
}