const fs=require('fs')
var writeableStream= fs.createWriteStream("abcd.d",{"flags":"a","encoding":"utf-8"});
writeableStream.write("computer science\n");
writeableStream.write("programmming languages\n");
writeableStream.end();