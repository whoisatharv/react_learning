module.exports= class StudentManager{
    
    constructor(){
        console.log("constructer of class student manager")
    }
     add(student) {
        console.log("add got callled with data as: ");
        console.log(student);

        //logic to check of roll number exists
        var responseJSON={};
        if(exists)
    {
     responseJSON.success=false;
     responseJSON.exception="Roll number exists";
     return responseJSON;
    }

    //code to add a record to data file
    responseJSON.success=true;
    return responseJSON
    }
     delete(student){
        console.log("delete student got called with data as: ");
        console.log(student);
    }

}