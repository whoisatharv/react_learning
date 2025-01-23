const m=require('mime-types');
file="index.html";
console.log(m.lookup(file));
file="HttpServer.js";
console.log(m.lookup(file));
file="pqr.txt";
console.log(m.lookup(file));