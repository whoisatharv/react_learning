

exports.processError=function(error,socket,resource)
{
    if(error==404) send404(socket,resource);
}


exports.send404=function(socket,resource){
    var body="<!DOCTYPE HTML";
    body+= "<HTML lang= 'eg' >";
    body += "<head>";
    body += "<title> 404 Not found </title>"
    body += "<meta charset = 'utf-8'>";
    body += "</head>"
    body += "<body>";
    body += "<h1> Resource not found </h1>"
    body += "<p> The request URL  /"+ resource + "was not found on this server</p>";
    body += "</body>"
    body += "</html>";
    var header="HTTP/1.1 404 Not found\n";//protocol version
    header+= new Date().toGMTString() +"\n";
    header+= "Server:TMWeb Projector\n";
    header+= "Content-Type:text/html\n";
    header+="Content-Length:"+body.length+"\n";
    header+="Connection:close\n";
    header+="\n";
    socket.write(header+body);

}