//Factory method is a creational pattern that defines an interface for creating object,
//but lets subclasses decide which class to instantiate

//Key component:
//- Product: The interface that defines the product to be created
//- Creator: The abstract class that declares the factory method
//- Concrete Creator: The subclasses that implement the factory method and return specific product instances

//Product interface
interface Vehicle {
    drive(): void
}

//Concrete Products
class Car implements Vehicle {
    drive(): void {
        console.log("Driving a car")
    }
}

class Motorcycle implements Vehicle {
    drive(): void {
        console.log("Riding a motorcycle...")
    }
}

//Creator (abstract class)
abstract class VehicleFactory {
    //Factory Method
    abstract createVehicle(): Vehicle

    //Operation that uses the factory method
    deliverVehicle() {
        const vehicle = this.createVehicle()
        console.log("Delivering the vehicle:")
        vehicle.drive()
    }
}

//Concrete Creators
class CarFactory extends VehicleFactory {
    createVehicle(): Vehicle {
        return new Car()
    }
}

class MotorcycleFactory extends VehicleFactory {
    createVehicle(): Vehicle {
        return new Motorcycle()
    }
}

//Client code
function clientCode(factory: VehicleFactory) {
    console.log("Client doesn't know the specific factory class")
    factory.deliverVehicle()
}

//Usage
console.log("App launched with the CarFactory")
clientCode(new CarFactory())

console.log("App launched with the MotorcycleFactory")
clientCode(new MotorcycleFactory())

// Output:
// App: Launched with the CarFactory.
// Client doesn't know the specific factory class.
// Delivering the vehicle:
// Driving a car...
//
// App: Launched with the MotorcycleFactory.
// Client doesn't know the specific factory class.
// Delivering the vehicle:
// Riding a motorcycle...
