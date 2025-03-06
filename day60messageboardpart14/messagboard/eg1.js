var a = "I live in $$${Ujjain}. $$${Indore is}, $$${distance} Km from $$${Ujjain}";
var vals = ["COOL CITY", "Big City", 45, "Cool Cool City"];
var x = 0;

var b = a.replace(/\$\$\$\{.*?\}/g, function (m) {
    console.log(m); // Logs the matched placeholder
    return vals[x++]; // Replaces it with the next value from vals
});

console.log(b);
