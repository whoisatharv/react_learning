//Now trying to run the previous code example in the synchronous mode by using promise and async await
var fs=require("fs")
function getStats(f)
{
    var promise= new Promise(function(resolve,reject){
        fs.stat(f,function(e,s){
            resolve(s);
        })
    })
    return promise;
}

async function main() {
    
    var s=await getStats("eg2.js")
    console.log(s);
    console.log(s.isFile());//check whether the file exist or not
    console.log(s.isDirectory());//check if its a library
    console.log("Details of file:eg2.js");
}
main();