exports.processRequest = function(request, response) {

    var name = request.data['nm'];
    var city = request.data["ct"];
    var gender=request.data["gender"];
    response.setContentType("text/html");
    response.write("<!DOCTYPE HTML>");
    response.write("<HTML lang = 'eg'>");
    response.write("<head>");
    response.write( "<title> Cool server side codding example </title>");
    response.write("<meta charset = 'utf-8'>");
    response.write("</head>");
    response.write("<body>");
    response.write( "<h1> " + name + ", Hello we are here in Ujjain </h1>")
    response.write("<p>" + city + " is city of Gods</p>");
    response.write("</body>");
    response.write("</html>");
   // response.write( "HTTP/1.1 200 Ok\n");
    //response.write( new Date().toGMTString()  + "\n");
    //response.write("Server : TMWeb Projector\n");
     //response.write("Content-Type: text/html\n");
     //response.write("Content-Lenght: "+body.length +"\n");
     //"Connection: close\n";
    //header += "\n";
    
    console.log(name);
    console.log("city " + city);
    
    response.write(header + body);
    
    }