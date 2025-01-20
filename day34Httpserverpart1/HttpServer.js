const fs= require('fs')
const net =require('net')
var httpServer= net.createServer(function(socket){
    socket.on('data',function(data){
        console.log(data.toString());//converting buffer to string
        var data=fs.readFileSync("index.html","utf-8");
        var response=data;
        var response="Welcome to TMHttpServer version 1.0";
        var responseLength=response.length;
        var a="Http/1.1   200 OK\n";//sabse pehle protocol version, response code(200 OK)
        a=a+"Content-Type:text/html\n";//content type plain text  oblique html  //MIME type
        a=a+`Content-Length:${responseLength}\n`;//length of the response
        a=a+"\n";//ek line ke gap ke baad actual response he\
        
        a=a+response;
        socket.write(a);


        socket.write("a");

    }); //onData ends

    socket.on('end',function(){
        console.log('connection ends from the client side ');
    }); //onEnd ends
    socket.on('error',function(){
        console.log("some problem on client side");
    });//onError ends
});


httpServer.listen(8080,'localhost');
console.log('TMHttpServer ready :port 8080');