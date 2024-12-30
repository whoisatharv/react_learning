//buffer are fixed size chunks of memory used for binary data manipulation
//they are particulary useful in handling  stream, files, or data that needs encoding decoding
//buffer works with raw binary data./
// buffer contents are shown in hexadecimal format
//the buffer.alloc(size) method creates a new buffer instance of the specified size in bytes
var b=Buffer.alloc(10);
 console.log(b);
 b[0]=65;
 b[1]=66;
 b[2]=97;
 console.log(b);
 var c=[10,20,30,40,50,60];
 var d=Buffer.from(c);
 console.log(d); 
  var s=Buffer.from("ABCD");
  console.log(s);
  var s2=Buffer.from("abcd");
  console.log(s2);
  var ss=s.toString();
  console.log(ss);
  var k=s.toString("hex");// here we  have specified encoding as hex
  console.log(k);


  /////////////////////////////
   var c=Buffer.alloc(10,1);// initializing buffer with 1
   console.log(c);
   c.fill(0);
   console.log(c);

console.log("***********************************************************************************")
   ///////////////////////////////////////
    var c=Buffer.alloc(10,1);
    c[0]=255;
    console.log(c);
    c[1]=256;
    console.log(c);
    c[2]=258;
    console.log(c);
    
console.log("*****************************************************************************")
 var c=Buffer.from("God is Great");
 console.log(c);
 var d=c.toString("base64");
 console.log(d);
 var e=Buffer.from(d,"base64");
 var f=e.toString("utf8")
 console.log(f);
 console.log("*****************************************************************************")
 

 const fs=require("fs");
 vard=fs.readFileSync("eg1.exe");
 console.log(Buffer.isBuffer(d));
 var e=fs.readFileSync("eg1.c","utf-8");
 console.log(Buffer.isBuffer(e));
 console.log(d);
 console.log("**************************************")

 const fs=require("fs");
 var d=fs.readFileSync("eg1.exe");
 var file=fs.openSync("cool,exe","w");//create a blank new file and overrwrite existing
 fs.writeSync(file,d,0,d.length);
 fs.closeSync(file)