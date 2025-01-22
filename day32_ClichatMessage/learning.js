//var a="send ramesh hello everybody"
//if(a.startsWith("send"))

//{
   // var b=a.trim().split(" ")//The split(" ") method then splits the string into an array of words, using spaces (" ") as the delimiter. The resulting array b will be:
    
    
    //console.log(b.length);
   // for(var i=0;i<b.length;i++){
  //      console.log(b[i]);
 //   }
//}


var a="send   ramesh"
if(a.startsWith("send"))
{
    var b=a.trim();
    while(true)
    {
        i=b.indexOf(" ");
        console.log(i);
        if(b.indexOf(" "))break;
        b=b.replace(" "," ");
    }
    console.log(b);
    var c=b.split(" ")
    console.log(c.length);
    for(var i=0;i<c.length;i++)
    {
        console.log(c[i]);
    }
}

