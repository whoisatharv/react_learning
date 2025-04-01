var k={
    "module":"goa"
};
var a="/student/aaa"
console.log(a.indexOf("/"))
console.log(a.indexOf("/",1)) // next / 
console.log(a.substring(a.indexOf("/",1)))
if(k.module){
    console.log("module attribte exists");

}
else{
    console.log("module attribute does not exist")
}