Object.defineProperty(Bulb.prototype,'wattage', {
    get: function() {
        console.log("Getter");
       // console.log(brand);
        return this._wattage;
    },
    set: function(watt) {
        console.log("Setter");
        //console.log(brand); // this will give error
       this._wattage = watt;
    }
})

var b = new Bulb();
b.wattage = 100;
console.log(b.wattage);


console.log("*************** Small version of above code ********************************");

function Bulb1() {
    var brand = "Philips";
    this.aFunction = function() {
        console.log(brand)
    }
}

Bulb1.prototype.bFunction = function() {
    console.log(this.brand);
}

var blb = new Bulb1()
blb.aFunction();
blb.bFunction();
