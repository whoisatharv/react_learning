exports.processRequest = function(request, response) {

var body = "<!DOCTYPE HTML>";
body += "<HTML lang = 'eg'>";
body += "<head>";
body += "<title> Cool server side codding example </title>"
body += "<meta charset = 'utf-8'>";
body += "</head>"
body += "<body>";
body += "<h1> Hello we are here in Ujjain </h1>"
body += "<p> Ujjain is city of Gods</p>";
body += "</body>"
body += "</html>";
var header = "HTTP/1.1 200 Ok\n";
header += new Date().toGMTString()  + "\n";
header += "Server : TMWeb Projector\n";
header += "Content-Type: text/html\n";
header += "Content-Lenght: "+body.length +"\n";
header += "Connection: close\n";
header += "\n";

console.log(request['nm']);
console.log("city " + request['ct']);

response.write();
//socket.write(header+ body);

}