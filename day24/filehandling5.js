const fs= require('fs')
var readableStream=fs.createReadStream("abcd.d",{"flags":"r","encoding":"utf-8"});
//readableStream.on('data',function(p){
 //   console.log('data fetched :',p);
//});


//readableStream.pipe(process.stdout);//ek ka output dusre ka input, iske use  se hum  ek file se pad kr dusri file me bhi daal sakte he 
 var writableStream=fs.createWriteStream("pqr.d",{"flags":"a","encoding":"utf-8"});
 readableStream.pipe(writableStream);