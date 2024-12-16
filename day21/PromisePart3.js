function calculateSquare(x) {
    return x * x;
}

function calculate(y) {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(calculateSquare(y));
        }, 5000);
    });
    return promise;
}


// var p1 = calculate(5);
// p1.then(function(square) {
//     console.log("Square of 5 is: " + square);
// });
// p1.then(function(square) {
//     console.log("Square of 5 is: " + square); // Chaining
// });
// console.log("whatever");

async function main() {
    // When using 'await', the function will execute in a synchronous fashion.
    var square1 = await calculate(5);
    console.log("Square of 5 is: " + square1);

    var square2 = await calculate(10);
    console.log("Square of 10 is: " + square2);
}

// Call the main function
main();

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
