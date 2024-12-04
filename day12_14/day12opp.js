//for each loop always returns undefined value
 const coding =["js","ruby","java","python"]
  const values=coding.forEach((item)=>{
    console.log(item);
    return item
  })
  console.log(values)
  console.log("**********************")
  // whenever we open scope in filter function we have to return the values.
  //Map function 
   const myNumers=[1,2,3,4,5,6,,8,9,10]
    const newNums= myNumers.map((num)=>{return num +10});
    console.log(newNums)
console.log("**********************")
    // Reduce function
    const myNums=[1,2,3]
  const mytotal=myNums.reduce(function(acc,currval){
    return acc+currval
  },0)
   console.log(mytotal);

   console.log("**********************")
   function reduceToMax(intialorlastGeneratedValue,currentValue,index, arra) {
    console.log("reducer : ", intialorlastGeneratedValue, currentValue, index,arra );
    if (currentValue > intialorlastGeneratedValue) return currentValue;
     else  return intialorlastGeneratedValue;
    }
    
    var el = [1,2,33,-2,3, -4, 0, 222,12344,2342342, 34,23,0, 5]
    
    var largest = el.reduce(reduceToMax) // if no value passed its initial value will be array first element 
    // and loop start from index 1 and current value will be value of index
    //var bl = el.reduce(reduceToMax, el[0]) //if we pass initial value as first element of array then loop start from index 0
    // and current value will be value of index // if array is empty it will give error
    console.log("Collection reduce to max value")
    console.log(largest)
    
    console.log("********** Reduce from Right *************")
    
    function reduceToMax(intialorlastGeneratedValue,currentValue,index, arra) {
    console.log("reducer : ", intialorlastGeneratedValue, currentValue, index,arra );
    if (currentValue > intialorlastGeneratedValue) return currentValue;
     else  return intialorlastGeneratedValue;
    }
    
    var el = [1,2,33,-2,3, -4, 0, 222,12344,2342342, 34,23,0, 5]
    
    var largest = el.reduceRight(reduceToMax) // if no value passed its initial value will be array last element 
    // and loop start from array length and current value will be value of index
    //var bl = el.reduceRight(reduceToMax, el[el.lenght - 1]) //if we pass initial value as first element of array then loop start from index 
    // length -1 and current value will be value of index // if array is empty it will give error
    console.log("Collection reduce to max value")
    console.log(largest)


    /// .some() method checks if at least oone element in the array satisfies the condition specified in the   function if a match is found,it immediatly returns true or otherwise it will return false.]
    function isAnyIndian(obj){
        console.log("Value of the obj");
        return obj.country.toUpperCase()==="INDIA"
    }
    var value = [
        {"name" : "Hob", "country" : "Srilanka"},
        {"name" : "Abdul", "country" : "Pak"},
        {"name" : "Hussam", "country" : "Bangladesh"},
        {"name" : "Sha", "country" : "Russia"},
        {"name" : "Rahul", "country" : "India"},
        {"name" : "ROb", "country" : "Usa"},
        {"name" : "john", "country" : "UK"},
        {"name" : "che", "country" : "China"}
        ]
        var element = value.some(isAnyIndian) // Loop will break imedately after the item is found
if (element) console.log("Yes, Indians found")
else console.log("No, Indians doesn't exist")

console.log("**********  Object *************")
/// object///
// if we do not use this keyword while assigning or accessning a variable , it wont be part of the object  instead it will be treated as a global variable
 function Bulb(wat){
    this.w=wat; //public var w
    this.setwattage=function(wattage){
        w= wattage //this will set w from gloobal object
    };
    this.getWattage =  function () {
		return w  //it will get w from global object
	};
 }
  var bulb = new Bulb(100)
  console.log(bulb)
  console.log( bulb.setwattage(10))


  console.log("********** Prototype or Blue print of object *************")


  //The prototype object is used as a blueprint to define methods or properties that will be shared among all objects created using that constructor.
  //Methods added to the prototype are not copied into each object individually. Instead, they are shared, saving memory.

  Bulb.prototype.getBrand=function(){
    console.log("Build of wattage"+this.w+"is of brand philps")
  }
  var bulb1=new Bulb(60)
  console.log(bulb1)
  console.log(bulb1.getBrand())
  

  console.log("**************************")
  //private variables in java script are defined using var key words inside the class constructor and is not attached with this
  //privileged methods are functions defined inside the constructor that have access to private variable
  //prototype methods  do not have access to private variables directly but can call privileged methods to interact with them.
  function MyBulb(w) {
    var wattage = w; // Private variable, not accessible directly from outside
    this.setWattage = function(w) { // Privileged method
        wattage = w; // Updates the private variable
    };
    this.getWattage = function() { // Privileged method
        return wattage; // Returns the private variable's value
    };
}
MyBulb.prototype.getBrand = function() {
    // wattage is private, so this will throw an error:
    console.log("Bulb of wattage " + wattage + " is of brand phils");

    // This works because it uses the privileged method `getWattage`:
    console.log("Bulb of wattage " + this.getWattage() + " is of brand phils");
};
    //Getter(get):A method that is automatically called when try to read the property of an object.
    //setter (set): A method that is automatically called when you try to assign the value to the property
    //Object.defineProperty:This method allows you to define or customize properties of an object, including adding special behaviors for getters and settters
    console.log("************************************************");
    function YourBulb() {
        this._wattage = 0;
    }
     Object.defineProperty(YourBulb.prototype,'wattage',{
         get: function(){
            console.log("Getter is get callled")

         },
         set: function(w){
            console.log("Setter is get called")
            if(w){
                if((typeof w )==' number' && w >60&& w<=240)
                    this._wattage=w;
                else
                   this._wattage=0;
            }else this._wattage=w;
         }
     });
     var bt = new YourBulb();
bt.wattage = 200;
console.log(bt.wattage)

bt.wattage = -1;
console.log(bt.wattage)

bt.wattage = "hello";
console.log(bt.wattage)
