//jab bhi function divide chalega  uske computation me time lagega isliye voh immediatly promise type k object ka address return krdega
 //promise me hume actually use functionality ko wrap kr rkha aur functionality bhi ek function me wrap kr rkhi he.
 // Promise ko hum jis function ka address denge uske do parameter hone chaiye .
 //pehla paramtere ek function ka address hoga joh appko tab return krna he jab koi gadbadi nhi he humko joh act krna tha humne use shi trike se  krliya he aur usko return krna he.
 // dusre parameter me  ek function ka address hoga joh aapko tab returh krna he jab processing me kuch error aaye tab.
 // var promise=divide(a,b) yha hume promise type ke object ka address mila he.
 //promise type ke object ke liye fir humne then method call kri he aur do functions k address pass krdiye he.
 //pehla function  tab chalega jab done notifier jisko point kr rha he voh chalega.
 //dusra function tab chalega  jab errorNotifier  jisko point kr rha he voh chalega.
 //Note -Abhi yeh dimag me nhi lana he ki pehle function ka address done notifier me aur dusre ka error me .


 function divide(dividend, divisor) {
    var p = new Promise(function(doneNotifier, errorNotifier) {
        setTimeout(function() {
            if (divisor === 0) {
                errorNotifier('Cannot divide by zero');
            } else {
                var r = {           
                    quotient: Math.floor(dividend / divisor),
                    remainder: dividend % divisor // deriving multiple values via an object                  
                };
                doneNotifier(r);
            }
        }, 5000);
    });
    return p;
}

var a = 10;
var b = 3;

var promise = divide(a, b);

promise.then(
    function(result) {
        var quotient = result.quotient;
        var remainder = result.remainder;
        console.log(`After dividing ${a} by ${b}, the quotient is ${quotient} and the remainder is ${remainder}`);
    }, 
    function(error) {
        console.log(`Problem: ${error}`);
    }
);
