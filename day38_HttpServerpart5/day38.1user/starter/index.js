function clock()
{
 var now=new Date();
 var clockDivison=document.getElementById("clock");
 clockDivison.innerHTML=now.getHours()+":"+now .getMinutes()+";"+now.getSeconds();

 setTimeout(clock,1000);
};
window.addEventListener("load",clock);