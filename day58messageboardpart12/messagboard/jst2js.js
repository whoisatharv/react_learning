const fs=require('fs')


exports.prepareJS=function(jstFileName){
// if folders private/jst does not exist .create them
 var privateFolder="./private";
 if(!fs.existSync(privateFolder)) fs.mkdirSync(privateFolder);
 var jstFolder= "./private/jst";
 if(!fs.existSync(jstFolder)) fs.mkdirSync(jstFolder);
//open file and create new filename with extension as js
  var jsFileName=jstFileName.substring(0,jstFileName.length-3);
  jsFileName=jsFileName+"js";
  var jsFilePath="./private/jst/"+jsFileName;


  var jsFile=fs.openSync(jsFilePath,"w");

  fs.writeSync(jsFile,"exports.processRequest=function(request,response)\r\n");
fs.writeSync(jsFile,"{\r\n");
     var lines=fs.readFileSync(jstFileName).toString().split("\n");
     var line=null;
     for(i in lines)
    {
        line=lines[i].replace(/\r|\n/g,"");
        lines=line.replace(/"/g,"\\\"");
       fs.writeSync(jsFile,"response.close();\r\n");
       

     }
     fs.writeSync(jsFile,"}\r\n");
       fs.closeSync(jsFile);
       //return name of js file
       return "jst/"+jsFileName;

}
