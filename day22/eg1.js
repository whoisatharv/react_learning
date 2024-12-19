//files system discussion
var fs = require("fs");

fs.stat("eg1.js", function (e,s) {
    if (e) {
        console.error("Error:", e.message);
    } else {
        console.log("Stats:", s);
    }
});
 console.log("Details of file: eg1.js")//details of file ka pehle preint hona ye show krta he ki upper vala code async mode me chl rha he
 

