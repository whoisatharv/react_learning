//Here ,Movie is a base (or parent) class, and Junglebook is a derived (or child) class.
//Inheritance- A class can inherit propertise and methodsfrom another class.
//class Junglebook inherits movie, meaning it gets all methods of movie by default.
//Method Overriding: A child class can redefine  a method from the parent class.
///Junugleboook overrides the interval method of movie.


class Movie{
    start(){
        console.log("welcome!!Movie started please keep silence");

    }
    interval(){
        console.log("Interval: hAVE  A SAMOSA FOR rs 50");

    }
    end(){
        console.log("Thank you:Come again !!")
    }
}

class JungleBook extends Movie{
    realOne(){
        console.log("Moglie enter the Jungle");
    }
    interval(){
        //DERIVED CLASS OVERRIDES BASE CLASS METHODS
        console.log("and Have a coffee for rs 20")
    }
    realTwo(){
        console.log("Moglie kills Sher khan")
    }
}

var movie= new JungleBook();
movie.start();
movie.realOne();
movie.interval();
movie.realTwo();
movie.end();
console.log("**************** Static Properties ***************************")

//static Property and Method: static propertise and methods belong to the class itself, not to any specific object(or instance) of the class
//only one copy of the static propertise is  maintained
//Instance propertise and methods belong to individual objects(instances) created from the class
//each object  maintains its own copy of instance propertise.

class AAA{
    static aa;//only one copy of aa is maintained
    value="hh";
    constructor(a,b){
        AAA.aa=a;
        this.value=b;
    }
     static sam()
     {
        console.log("i am static method")
     }

    tom(){
        console.log("i am instance method");
    }

}
var vl = new AAA(10, "Good");
console.log(vl);
var vg= new AAA(20,"Hurrai"); 
console.log(vg);
console.log(AAA.aa);
AAA.sam();
vl.tom();
console.log("**************************Static Methods*******")

class BBB {
    static bb;
    constructor(a,b){
        BBB.bb=a;
        this.y=500;
    }

    static sam(){
        console.log("GREAT");
        console.log(BBB.bb);//class variable
        console.log(this.y);//instance variable
        console.log(this); //class
    }
    tom() {
        console.log("Cool")
        console.log(BBB.bb); //class variable
        console.log(this.y); // instance variable
        console.log(this); // class
    }
}
var tt = new BBB(10,20);
BBB.sam();
tt.tom();
var aa = {
    value: 60,
    someFunction() { 
        console.log("Some function is called")
    }
}

console.log(aa.value);
console.log(aa);
aa.someFunction()


console.log("***********Object extends propertise using spread************ ")
let rect ={
    length:10,
    breadth:20
}
 var box= {
    ...rect, //spreading the object
    health:100
 }
 console.log(box)
 let box2 = box; //reference to same object
 box2.height=100;
 
 console.log(box);
 console.log(box2);

 var box3={...box}//this willl create the new object
 box3.height=50;
 console.log(box);
console.log(box2);
console.log(box3);

console.log("******Object spread*******")


let va={
    a:10,
    b:20,
};

let vr={
    p:2,
    q:3
}

let rr={...va,...vr};


console.log(rr);

console.log("*******call************")
let d={
    somefunction(g){
        console.log(g);

    }
}
 console.log(d.somefunction("Great"));
 d.somefunction.call(d,"cool")//d is pointing to an object  having somefunction as a pointer pointing to an object of type function which has call function,

 console.log("**************** bind ***************************")


 let val = {
    someFunction(g) {
        console.log(g);
    }
}

console.log(val.someFunction("Great"));
var k= val.someFunction.bind(val,"cool")
k();//k  having object refrence  which is bound to a functionn that function will run


//if you simply assign var k = val.someFunction; and then call k(), the this context would be lost because k() would not be tied to val.
//The this  binding val to someFunction, this is explicitly set to val, ensuring the correct behavior of the function when called
//the this inside someFunction would refer to the global object (window in browsers, undefined in strict mode).

