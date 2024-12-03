 // pushing elements in the array. The following exaample  showing behaviour of array as stack 
 var x=new Array();
 x.push(10);
  x.push(10);
   x.push(10);
    x.push(10);
     x.push(10);
      x.push(10);
      for(var i=0; i<x.length; i++) console.log(x[i]);
      console.log("Length:"+x.length);
      var a=x.pop();
      console.log("Length:"+x.length);

      //if you want to insert something inside the the array we will use splice function
      var x=[100,200,300,400,500,600,700];
      var j=x.splice(3,1,666,777);
      console.log(x);
      console.log(j);


      // day 10 // //copy within function
       var x=[10,20,30,40,50,60,70,80,90,100];
       x.copyWithin(4,7);
       console.log(x);
       //////////////////using every commmand

  var t=[10,20,30,40,50,60,70,80,90,100];
  function doSomething(n)
  {
    console.log('doSomething got called with argument:'+n);
    return n%2==0;
  }
  console.log(t.every(doSomething));

  //using filter command/function
  var x=[10,20,30,40,50,60,70,80,90];
  function abcd(n){
    return n>50 ;
  }
   
  var y= x.filter(abcd);
  console.log(x);
  console.log(y);


  //day11//
function sam (num,index,arr){
	console.log(num);
	console.log(index);
	console.log(arr);
	console.log("-----------");
	if(num==40){
		arr[index]=540;
		return true;
	}
	return false;
}
 var a= [10,20,30,40,50,60,70,80,90,100]
 var y=a.find(sam);


 //whenever we need to travel internal datastructures like array we will use for each loop
 //whenever a function run (but its not for object ) then it means it is running for global object .

 function sam (){
    this.a= 100;
    console.log(this);
 }
 this.xxxxx=10000;
 console.log(this);
 sam();
 console.log()
 ///
  var b={
    w:0,
    setWattage:function(wattage){
        w=wattage;

    }
    get Wattage()
    {
        return this.w;
    }
  };
   console.log(b.w);
   b.setWattage(100);
   console.log(b.w);
   console.log(b.getWattage());