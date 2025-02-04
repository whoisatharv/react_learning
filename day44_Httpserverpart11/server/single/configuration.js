const fs= require('fs');
exports.getConfigurations=function(){
 if(fs.existsSync('conf.json')){
    let jsonString= fs.readFileSync('conf.json')
    return JSON.parse(jsonString);
  } else return JSON.parse('{"paths": []}');

 }


