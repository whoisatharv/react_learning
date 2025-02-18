const fs= require('fs');
exports.getConfigurations= function(){
    if(fs.existsSync('conf.json'))
    {
        let jsonstring=fs.readFileSync('conf.json');
        return JSON.parse(jsonstring);

    }
    else return JSON.parse('{"paths":[]')
}