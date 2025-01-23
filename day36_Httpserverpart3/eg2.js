//very important concepts in context to file upload/download
const fs=require('fs');
var bufferSize=10;// ek baar me 10-10 byte badege  example ke liye yeh use kr rhe nhi toh 1024 use krege
var buffer=Buffer.alloc(bufferSize);
file="index.html";
console.log('Opening file:'+file);
var fileDescriptor=fs.openSync(file,"r");
var data;
var bytesExtracted;

while(true)
{
    var bytesExtracted=fs.readSync(fileDescriptor,buffer,0,bufferSize,);
    if(bytesExtracted==0)
    {
        fs.closeSync(fileDescriptor);
        break;
    }
    if(bytesExtracted<bufferSize)
    {
        data=buffer.slice(0,bytesExtracted);
    }
    else{
        data=buffer;
    }
   // console.log(data.toString);
   process.stdout.write(data.toString());
}