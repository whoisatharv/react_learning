const pth = require('path');
const fs = require('fs');
const pathSept = pth.sep;
function walkPath(folderpath){
    let files = fs.readdirSync(folderpath); // always declare variable using let or var else it will become global variable and in case of recursion it will
    // reassign the value to global variable in place on local one.
    let file = null;
    let i = 0;
    let stat =null;
    while(i < files.length) {
        file = files[i];
        stat = fs.statSync(folderpath+ pathSept +file);
        if(stat.isFile()){
            console.log("File :" + folderpath+ pathSept +file)
        }
        if(stat.isDirectory()){
            console.log("Directory :"+ folderpath + pathSept + file);
            walkPath(folderpath+ pathSept +file);
        }
        i++;
    }
}

walkPath('kkk');
walkPath('.')