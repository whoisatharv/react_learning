function sam(e)
{
    if(e==4) return;
    sam(e+1);
    console.log(e);
}
 sam(1);

 console.log("*********************************************")

 function ram(n)
 {
    if(n==1) return 1;
    var m=ram(n-1)*n;
    return m;
 }
 var x=ram(5);
 console.log(x);
 console.log("***********************************")


 //const pth=require('path')
 //console.log(pth.sep) ;//underlying os folders ko separate krne ke liye  konse symbol ka use krta he yeh hume sep se pata chlega
 console.log("*****************************************")
 const pth=require('path');
 const fs=require('fs');
 let files=fs.readdirSync(".")  //fs.readdirSync("."): Reads all the contents (files and folders) of the current directory (denoted by ".")
 let i=0;
 let file=null;
 while(i<files.length)
 {
    file=files[i];
    st=fs.statSync(file);  //fs.statSync(file) will return an object with details like:
  //  Is it a file?
   // Is it a directory?
    //When was it last modified? (and more)
    if(st.isFile())
    {
        console.log("File:"+file);
    }
    if(st.isDirectory())
    {
        console.log("Directory:"+file);
    }
    i++;
 }


 

 