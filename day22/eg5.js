///////////////////////////////////////////////////// reading files of the current directory
var fs=require("fs");
fs.readdir(".",function(e,files){ //"." dot will always represent the current  working directory 
    console.log(files);// `
});

