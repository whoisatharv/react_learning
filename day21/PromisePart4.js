//taking input///////
 var readline=require('readline');
 var ioInterface=readline.createInterface({
"input":process.stdin,
"output":process.stdout
 });
 function Question(q){
    var promise=new Promise(function(resolve,reject){
        ioInterface.question(q,function(answer){
            resolve(answer);
        });
    });
    return promise;
 }


 async function main ()
 {
    var name=await Question("Enter name:");
    var city= await Question("Enter city name:");
    var age=parseInt(await Question("Enter you age:"));
    console.log("Data accepted ");
    console.log("City :"+city);
    console.log("AgE:"+age);
    ioInterface.close();
 }
 main();
