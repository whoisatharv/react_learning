const fs = require('fs');

exports.prepareJS = function (jstFileName, request) {
 // if folder private/jst does not exist, create then
	var privateFolder = "./private";
	if (!fs.existsSync(privateFolder)) fs.mkdirSync(privateFolder);
	var jstFolder = "./private/jst";

	if(!fs.existsSync(jstFolder)) fs.mkdirSync(jstFolder);
	// open file and create new filename with extension js in place of jst

	var jsFileName = jstFileName.substring(0,jstFileName.length - 3);
	jsFileName = jsFileName + "js";

	var jsFilePath = "./private/jst/" +jsFileName;

	// read from jst and write in js

	var jsFile = fs.openSync(jsFilePath, "w");

	fs.writeSync(jsFile, "exports.processRequest = function (request, response)\r\n");
	fs.writeSync(jsFile,"{\r\n");
	var lines = fs.readFileSync(jstFileName).toString().split("\n");
	var line = null;
	for (i in lines) {
		line = lines[i].replace(/\r|\n/g,"");
		line = line.replace(/"/g, "\\\"");
		line = line.replace(/\$\$\$\{.*?\}/g, function (k) {
			
			k = k.substring(4, k.length -1);
			var v = request.data[k];
			console.log("Data:"+ v);

			if(v) return v; else return "";
		});
		fs.writeSync(jsFile, "response.write(\""+line+"\");\r\n");
	}
	fs.writeSync(jsFile, "response.close();\r\n");
	fs.writeSync(jsFile,"}\r\n");
	fs.closeSync(jsFile);
		// return name of jsfile
	return "jst/"+jsFileName;
}