const fs=require('fs');
exports.getConfiguration= function()
{
    if(fs.existsSync("conf.json")){
        let jsonString=fs.readFileSync("conf.json");
        return JSON.parse(jsonString);//converting into javascript object
    }
    else{
        return JSON.parse('{"path":[]}');
    }
}

//other files can import this to moduleto use getconfiguration function