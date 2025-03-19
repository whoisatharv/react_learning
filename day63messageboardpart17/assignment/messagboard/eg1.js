class Student {
    constructor() {
        console.log("constructor of class student");
    }
}

class Customer {
    constructor() {
        console.log("constructor of class customer");
    }

    doSomething(a, b) {
        return a + b;
    }
}

// Factory pattern
class Factory {
    constructor() {
        this.items = {
            "student": Student,
            "customer": Customer
        };
    }

    createItem(itemName) {
        if (this.items[itemName.toLowerCase()]) {
            return new this.items[itemName.toLowerCase()]();
        } else {
            throw new Error("Invalid item name: " + itemName);
        }
    }
}

var factoryInstance = new Factory();
var obj = factoryInstance.createItem("customer"); // Using lowercase "customer"
var methodName = "doSomething";

if (typeof obj[methodName] === "function") {
    console.log(obj[methodName](10, 20));
} else {
    console.log(`Method ${methodName} does not exist on the created object.`);
}
