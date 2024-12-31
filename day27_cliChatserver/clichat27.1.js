//we will pass data to the server in the JSON format.
//var k={
   // "from":"ramesh",
//    "to":"suresh",
//"message":"hello"
//};
class PostCard
{
    constructor(from,to,message)
    {
        this.from=from;
        this.to=to;
        this.message=message;
    }
}
var k=new PostCard("ramesh Ji","suresh ji","hello ji");
console.log(k);
var a=JSON.stringify(k);
//var a='{"from":"ramesh","to":"suresh","message":"hello"};
console.log(a);
var b=JSON.parse(a);
    console.log(b);
console.log(b.from);
console.log(b.to);
console.log(b.message);
