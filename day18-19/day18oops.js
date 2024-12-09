 function someFunction(g){
    console.log(g);
 }

 var k= someFunction.bind(undefined,'great')// here it will create bound function and assigned it k which have a  function pointer someFunction which it binds
 console.log(k);//it wil will print object in k
 k();
 console.log("***********************************************")
 function printSum(x,y){
    let z= x+y;
    console.log(x,y);
    console.log("sum:" +z);
    return z;
 }
 add5 = printSum.bind(undefined,5)
 let value = add5(10);
 console.log(value);

 console.log("******************Object Spread*********")
 let a={x:10 ,y:20};
 let b ={a:10,z:30};
 let c={
    ...a ,...b
 };
  console.log(c);


  let aa={x:0,y:20};
  let bb={x:100,z:30};


  let cc={...aa,...bb};//here it will take the value 100 which means object which is coming later
  console.log(cc);

  console.log("*****************Freeze Object***************")
  //Freeze the object so no one can change the value of object propertise
  var ab={x:10,y:20};
  console.log("Value:",ab)
  ab.x=100;
  console.log(ab)


  var ba=Object.freeze({x:20,y:40});//Freeeze the object
  console.log("value",ba)
  ba.x=100;
  console.log(ba);

  console.log("*************** Anonymous class ***********************")

  ai = class {
      constructor() {
          console.log("Anonymous class")
          this.x =100;
          this.y =200;
      }
  }
  console.log(ai);
  let bi = new ai();
  console.log(bi)

  console.log("*************** Anonymous class with name ***********************")

  //Even though the class is given an internal name AudioBufferSourceNode, it is not tied to the global or outer scope because it is assigned directley to the variable an. this means the class can only be referebced using an and not abcd outside its defination 

  let an= class abcd {
    constructor(){
        console.log("Anonymous class")
        this.x=100;
        this.y=200;
    }
  }


  let ann= new an();
  console.log(ann);
  //let naa= new abcd();/// this line will give error we cant create object like this we define class as above
  class abcd1 {
    constructor() {
        console.log("Normal class")
        this.x =100;
        this.y =200;
    }
}

let baa = new abcd1() // this will work
console.log(baa)



console.log("***********Object using object cosntructor")
 class Employee{
          constructor(nm){
            this.name=nm
          }
 }

 let aao=new Employee("suresh");
 console.log(aao.name)


 let bao= new aao.constructor("ramesh");//object using object constructor
 console.log(bao.name);
 console.log(aao==bao);
 console.log(aao instanceof Employee);
console.log(bao instanceof Employee);



console.log("********* super keyword is necessary*******")
class AAA1
{
    constructor(){
        this.x=10;
    }
}
class BBB1 extends AAA1 {
    constructor(){
        super() // call to super here is mandatory
        this.y;
    }
}
var tt = new BBB1();
console.log(tt);

console.log("*************** Return Anonymous class ***********************")

function someFunction() { // factory function
    return class {
        constructor(){
                this.x = 10;
        }
    };
}

var tt = someFunction();
console.log(new tt());

class fff extends someFunction() { // magic is here
    constructor() {
        super()
        this.y =90;
    }
}

var dd = new fff();
console.log(dd);

console.log("***********Multiple inheritance not possible***********")
class sss{
    constructor(){

    }
}
class ddd{
    constructor(){

    }
}
//class zzz extends sss,ddd { // this will give error as multiple inheritance not possible
//    constructor(){
//
//    }
//}
console.log("*************** How try to achieve Multiple inhertiance ***********************")
class eee {
    constructor(){
        this.x = 10;
    }
}
 function afunction(someclass){
    return class extends someclass{
        constructor(){
            super();
            this.y= 80;
        }
    }
 }
 class vv extends afunction(eee){
    constructor(){
        super();
        this.z=70;
    }
 }
 var gg = new vv();
console.log(gg);

console.log("**************Multiple inheritance")


class element{
    constructor(){
        this.x=100;
    }
}
//this finction return the element class 
//console.log(new sx()); create a new instance of the element class resulting inelement { x: 100 }
 function oneAFunction(){
    return element;
 }
 var sx=oneAFunction();
 console.log(new sx());


 function oneBFunction(someClass) {
    return class extends someClass {
        constructor() {
            super(); // Calls the constructor of the passed class
            this.y = 800; // Adds a new property `y`
        }
    }
}
class CCCC extends oneBFunction(oneAFunction()) {
    constructor() {
        super(); // Calls the constructor from `oneBFunction`
        this.z = 900; // Adds a new property `z`
    }
}
//oneAFunction() returns the element class.
//oneBFunction(oneAFunction()) creates a subclass of element that has:
//x from element.
//y = 800 from oneBFunction.
//CCCC extends this generated class and adds:
//z = 900.
var ccc = new CCCC();
console.log(ccc);


