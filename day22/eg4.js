//creating folder
var fs= require("fs");
fs.mkdir("kkk",{},function(e){
    if(e){
        console.log(e);
    }
    else{
        console.log("folder created");
    }
});
console.log("directory created");
//creating folder insidefolder  
var fs=require("fs");
fs.mkdir("bkc/pqr/lmn",{recursive:true},function(e){// yha pr hum lmn folder create krne ki baat kr aur esa maan rhe ki bkc//pqr exist krte he 
    if(e){
        console.log(e);
    }
    else{
        console.log("folder created")
    }
});// agr hum json ke ander recursive true krege toh hum jesa chate he vesa hojaega bkc ke andr pqr banega fir uske andr lmn.


//agar hum yeh vala code likhege toh lmn vala folder fat jaega.
 var fs=require("fs");
 fs.rmdir("bkc/pqr/lmn",{},function(e){
    if(e){
        console.log(e);
    }
    else{
        console.log ("folder created");
    }
 });