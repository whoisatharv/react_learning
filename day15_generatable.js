// A map is a collection of key value pair
//set method is use to add key value pairs to the  map.
 var mm= new Map();
 mm.set(101,"Deva");
 mm.set(102,"pushkal");
 mm.set(103,"kush");
 mm.set(104,"Rohan");

  for (var ele of mm){
    console.log(ele);//this for ...of loop iterates ver the map by default each element of the map is an array

  }

  var element=mm.values(); //values  function returns iterator that containes all the values of the map
  var item=element.next();//next method retrieves the next value from the iterator.


  console.log("***************** Generator Function ************************")

// the * after the function makes it a generator function
//A generator is a special function that can pause its execution and resume from where it left off.
//yeild keyword act like pause point in the  generator function, when the generator function reaches yield, it stops and returns the value to the caller 
// when you call .next(). the generator resumes from the last yield.


function* generatorFun(){
    console.log("Do something")
    yield 10;
    yield 20;
    yield 30;
     console.log("End of the function")
}
// Generator function will run till it find yield so with every next call till it find yield it will run and done will be false
// Once after next yield is not found done will be true.
var aa = generatorFun();
var index = aa.next();
console.log(index);
index = aa.next();
console.log(index);
index = aa.next();
console.log(index);
index = aa.next();
console.log(index);


console.log("************How to create generator function1**********")
function* myGenerator(s,e){
    while(s<=e){
        yield s;
        s++;
    }
    
}
 var gen = myGenerator(10,20);
 item=gen.next();
 while(item.done==false){
    console.log(item);
    item= gen.next()
 }
  console.log("**********  create Iterator Function Function *********")
   function MyCollection(){
    var collection =[];
    this.add =function (num){
        collection.push (num);

    }
    this.iterator=function*(){
        index=0;
        while(index<collection.length){
            yield collection[index];
            index++;
        }
    }
}
var k = new MyCollection();
k.add(10);
k.add(20);
k.add(30);
k.add(40);
k.add(50);

var elemt = k.iterator();

for(var itm of elemt) {
    console.log(itm);
}

console.log("************computed Propertise*********")
var k="cool";
var m={//the property in m is dynamically set using k
    [k]:"Great"//the value of  k will become the property in object
};
 console.log (m)
 console.log(m.cool);

 //Now same thing is done in the function
 function doSomething(){
    //same thing in the function
    this [k]= "MindBlowing";
 }
  var d= new doSomething()
  console.log(d)
  console.log(d.cool)
