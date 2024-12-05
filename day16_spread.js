function abcd(a,b,c,d){
    console.log(a,b,c,d);

}
abcd(10,20,30,40);
var m=[100,200,300,400];
abcd(...m); //it will spread the value
console.log("**************************");
var mm=[10,20,30,40];
var k=mm;
k[0]=1000;
console.log(mm);
console.log(k);
console.log("***********Spread to create new object********")
var t=[1,2,3,4];
var j=[...t] //this will create a new object
console.log(t)
console.log(j)
j[0]=101;
console.log(t);
console.log(j);// proof of editing only to new object
  

console.log("**********88iterator by creator new object************")
var cool ="kite";
var m={}//object literal
m["good"]="bad";
m[cool]= "very good"//dynamically creating  property in object 
console.log(m.kite);
m[Symbol.iterator] = function* () { // what ever retrun by Symbol.iterator will be assigned the iterator function
    yield 10;
    yield 20;
    yield 30;
}

for (var i of m) {
    console.log(i)
}
var jk = [...m];
console.log(jk);
console.log("************** Iterator by function ******************");

function abcd() {
    this[Symbol.iterator] = function* () {
        yield 101;
        yield 201;
        yield 301;
        yield 401;
    }
}

var a = new abcd();
for (i of a) {
    console.log(i)
}
var jk = [...m];
console.log(jk);
//It’s a built-in property in JavaScript.
//When an object has a [Symbol.iterator] method, it becomes iterable.
//This method defines what values will be returned when the object is looped over.


