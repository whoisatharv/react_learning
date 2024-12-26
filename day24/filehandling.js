///In this part we will learn file handling
//jab bhi data hume kisi file me addd krna ho toh append file function ka use krna he

const fs=require('fs');
fs.appendFile("somefile.d","God is great\n","utf-8",function(error){
    if (error){
        console.log(error);
    }
    else{
        console.log("Data written to file")
    }
})
//"somefile.d": Name of the file to write/append to.
//"God is great\n": String to append, followed by a newline (\n).
//"utf-8": Character encoding for the string.
//Callback function: Handles the success or failure of the operation.


///READ fILE///////
const fs=require('fs');
fs.readFile("somefile.d","utf-8",function(error,data){
    if(error)
    {
        console.log("Problem:",error);
    }
    else{
        console.log(data);
    }
});