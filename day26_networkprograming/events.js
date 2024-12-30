//Event handling and object oriented programming
const events=require("events");// the events module in Node.js provides a way to create and handle custom events.THis import events module,allow the use of the EventEmitter class to create custom event-handling logic
class BulbEvent
{
    constructor(oldWattage,newWattage,bulb){
        this._oldWattage=oldWattage;
        this._newWattage=newWattage;
        this._bulb=bulb;//refrence to the bulb instance that will emits an event

    }
    get oldWattage()
    {
        return this._oldWattage;
    }
    get newWattage()
    {
        return this._newWattage;
    }
    get bulb()
    {
        return this._bulb;
    }
}
class Bulb extends events.EventEmitter //the Bulb class represents a light bulb and extends the EventEmitter class
{
    constructor()
    {
        super();// this invokes the constructor of  parent class (eventEmitter)
        this._wattage=0;
    }
    set wattage(value)
    {
        console.log("Setter got called");
        if(this._wattage==value) return;
        let oldWattage=this._wattage;
        this._wattage=value;
         var bulbEvent=new BulbEvent(oldWattage,this._wattage,this);
         super.emit("wattageChanged",bulbEvent);
    }
    get wattage()
    {
        console.log('getter got callled');
        return this._wattage;
    }
}
    var b1= new Bulb();
    var b2=new Bulb();
//This  function handles wattage changed event for both b1 and b2.

     function wattageChangedHandler(bulbEvent){
        if(bulbEvent.bulb==b1){
            console.log(`Bulb1:Wattage has changed from ${bulbEvent.oldWattage}`)
        }
        if(bulbEvent.bulb==b2)
        {
            console.log(`Bulb2:Wattage has changed from ${bulbEvent.oldWattage}`)
        }
     }
     b1.on("wattageChanged",wattageChangedHandler);
     b2.on("wattageChanged",wattageChangedHandler);
     b1.wattage=100;
     console.log(b1.wattage);
     b2.wattage=40;
     console.log(b2.wattage);