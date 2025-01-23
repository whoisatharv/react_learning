const fs=require('fs')
const net=require ('net')


function sendResponse(socket,file)
{
    try{
    
    var data=fs.readFileSync("index.html","utf-8")
    var response=data;
    var response="Welcome to TMHttpServer version 1.0";
    var responseLength=response.length;
    var a="Http/1.1 200 OK\n";//firstly we will give the protocol version,response code(200 OK)
    a=a=a+"Content-length:text/html\n"; //cotnent type plain text html //MIMEtype
    a=a+"\n";//el line ke gap ke baad actual response
    a=a+response;
    socket.write(a);
    }
    catch(e){
        console.log(e);
    }
}

var httpServer=net.createServer(function(socket){
    socket.on('data',function(data){
      var request=data.toString();
       var splits=request.split('\n');
       console.log(splits.length);
       var firstLine=splits[0];
       console.log(firstLine);
       var words=firstLine.split("");
       console.log(words.length);
       var requestPath=words[1];
       console.log('Path : '+requestPath);
       if(requestPath=="/") sendResponse(socket,"index.html");
       else sendResponse(socket,requestPath.substring(1));





    }); //on data ends

    socket.on('end',function(){
        console.log('connection endss from the client side');
    });
        //on error
        socket.on('error',function(){
            console.log("some problem on client side");

        
    });

});

httpServer.listen(8000,'localhost');
console.log('TMHttpServer ready :port 8080');
//yeh vala code puri trh sahi nhi he isme bhot saare  changes honge regarding file upload and download
