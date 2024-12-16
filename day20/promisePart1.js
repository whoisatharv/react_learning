//asynchronus programming: such as waiting for a response from a server or a computational process.
//this code will give output after 5 sec because of delay added to simulate some thing that produce result after sometime
const readline = require("readline");

var a = 10;
var b = 0;

function divide(division, divisor, onSuccess, onError) {
    setTimeout(function() {
        if (divisor == 0) {
            onError("Cannot divide by zero");
        } else {
            var value = Math.floor(division / divisor);
            var remainder = division % divisor;
            onSuccess(value, remainder);
        }
    }, 5000);
}

// Creating interface
var iointerface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var a = 0;
var b = 0;

iointerface.question("Enter dividend: ", function(answer) {
    a = parseInt(answer, 10); // Convert input to number
    iointerface.question("Enter divisor: ", function(answer) {
        b = parseInt(answer, 10); // Convert input to number
        iointerface.close();
        divide(a, b, processSuccess, processError);
    });
});

function processSuccess(q, r) {
    console.log(
        `The division of 2 numbers ${a} and ${b} gives quotient ${q} and remainder ${r}`
    );
}

function processError(e) {
    console.log(`Problem: ${e}`);
}
