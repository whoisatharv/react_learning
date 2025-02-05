exports.processRequest = function(request, response) {

    var name = request.data['nm'];
    var city = request.data["ct"];
    var body = "<!DOCTYPE HTML>";
    body += "<HTML lang = 'eg'>";
    body += "<head>";
    body += "<title> Cool server side codding example </title>"
    body += "<meta charset = 'utf-8'>";
    body += "</head>"
    body += "<body>";
    body += "<h1> " + name + ", Hello we are here in Ujjain </h1>"
    body += "<p>" + city + " is city of Gods</p>";
    body += "</body>"
    body += "</html>";
    var header = "HTTP/1.1 200 Ok\n";
    header += new Date().toGMTString()  + "\n";
    header += "Server : TMWeb Projector\n";
    header += "Content-Type: text/html\n";
    header += "Content-Lenght: "+body.length +"\n";
    header += "Connection: close\n";
    header += "\n";
    
    console.log(name);
    console.log("city " + city);
    
    response.write(header + body);
    
    }