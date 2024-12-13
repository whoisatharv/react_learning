//bug correction and discussion
{/* var bulb={
    _wattage:0,
    set wattage(w)
    {
        if(w>=0 &&w<=240) _wattage=w;
        else __wattage=0;
    },
    get wattage(){
        return_wattage;
    }
}
console.log(bulb.wattage);*/}
//this  code will not work  as according to this code _wattage is considered as global variable ,we have to use this this  keyword in setter and getter function  in case of object literal.
// new code
var bulb={
    _wattage:0,
    set wattage(w)
    {
        if(w>=0 &&w<=240) this._wattage=w;
        else this.__wattage=0;
    },
    get wattage(){
        return this._wattage;
    }
}
console.log(bulb.wattage);


//using fat arrrow function
aaa= (someClass)=>class extends someClass
{
    constructor(){
        super();
        this.x=10;
    }
}
bbb=(someClass)=>class extends someClass
{
    constructor(){
        super();
        this.y=20;
    }
}

class ccc extends bbb(aaa(Object))
{
    constructor(){
        super();
        this.z=40;
    }
}

class ddd extends bbb(Object){
    constructor(){
        super();
        this.z=50;
    }
}
var c=new ccc();
console.log(c);
var d=new ddd();
console.log(d);  

console.log('****************************************************************************')
//hr.js
 class Designation
 {
    constructor(code,title){
        this.code=code;
        this.title=title;
    }
 }
 class DesignationManager{
    constructor(){
        this._designations=[]
    }
    add(designation)
    {
      this._designations.push(designation);
    }
    getAll()
    {
        return this._designation;
    }
    }
    exports.Designation=Designation;
    exports.DesignationManager=DesignationManager


//using the above hr.js file in the below file
//eg1.js
// code below shows use of the hr.js file

var hr=require("./hr")
var d1=new hr.Designation(101,"Clerk");
var d2=new hr.Designation(102,"Manager")
var dm=new hr.DesignationManagr();
dm.add(d1);
dm.add(d2);
var designations=dm.getAll();
var e=0;
while(e<designation.length){
    console.log(designations[e].code,designations[e].title);
e++;

}
//availing commands of command line
console.log(process.argv)
//////////////////////////////////

 const readline=require("readline");
 const lineReader=readline.createInterface({
    input:process.stdin,
    output:process.stdout
 });
 lineReader.question("Enter your name:",function(line){
    console.log(line);//yha par hum question naam ke function ko do arguments pass kr rhe he  firstly input lena he, input me joh line milegi use agle parameter function ko dena he
 });
 console.log("this is really a cool thing")//this code is running asynchronously
    
 //### Asynchronous function###//
  ///////////////////////////////                   
  function someFunction(){
    console.log("coool");

  } 
  setTimeout(someFunction,2000);
  console.log("Great");
  //////////////////////////////////
  function someFunction(a,b,c){
    console.log("Cool",a,b,c);
  }
  setTimeout(someFunction,2000,10,20,"Good");
  console.log("great");
  //////////////////////////////////////

  /// try-catch-finallly block///
  var a=process.argv[2]
  try{
    if(a=="Good") b=20;
    console.log(b);
  } catch(error){
    console.log(error.message);
  }
  //problem nahi aayi tab bhi finally ka code chalega aur problem aagyi tbh bhi finally ka code chalega.
  finally{
    console.log("The end");
  }

  //////////////////////
   function divide(a,b)
   {
    if(b==0) throw new Error("Cannnot divide by zero");
    return a/b;
    
   }
   try{
    var x= divide(Number(process.argv[2]),Number(process.argv[3]));
    console.log(x);
   } catch (error){
    console.log(error.message);
   }