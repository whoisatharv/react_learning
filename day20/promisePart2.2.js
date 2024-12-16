//ab hum then function me sirf ek hi function ka address pass krege, error ko captre krne ke liye catch block ka use krege is chainning kehte he 
function divide(dividend, divisor) {
    var p = new Promise(function(doneNotifier, errorNotifier) {
        setTimeout(function() {
            if (divisor === 0) {
                errorNotifier('Cannot divide by zero');
            } else {
                doneNotifier([Math.floor(dividend/divisor),dividend%divisor]);
            }
        }, 5000);
    });
    return p;
}

var a = 10;
var b = 3;

var promise = divide(a, b);

promise.then(
    function([quotient,remainder]) {
        
        console.log(`After dividing ${a} by ${b}, the quotient is ${quotient} and the remainder is ${remainder}`);
    }, 
   
).catch(function(error){
    console.log(`Problem:${error}`);
}).then(function(){
    console.log("Very Cool")
}).then(function(){
    console.log("Great")
})
// feature -hum object bana kr wrap krne ki jgh iss feature ka use krskate he 
 function abcd([a,b]){
    console.log(a);
    console.log(b);

 }
 var b=[100,400]
 abcd(b);