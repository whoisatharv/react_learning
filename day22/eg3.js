//jab hum synchronous fashion me reject krna he toh use handle krna niche batayagya he
var fs=require("fs");
fs.stat("sdfsf",function(e,s){
    if(e)
    {
        console.log(e);
    }
    else{
        console.log(s)
    }
    console.log(s.isFile());
    console.log(s.isDirectory());
});