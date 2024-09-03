//Simple factory is a creational pattern that encapsulates the object creation process,
//making it easier to manage and change

//Characteristics
//- Centralize object creation logic in one place
//- Returns an instance of a class based on the provided input
//- Simplifies client code by decoupling object creation from its usage

//1. Define interface or Base Class:
interface Transport {
    deliver(): void
}

class Truck implements Transport {
    deliver(): void {
        console.log("Delivering  by land using the truck")
    }
}

class Ship implements Transport {
    deliver(): void {
        console.log("Delivering by sea using the ship")
    }
}

//2. Create simple factory
class TransportFactory {
    static createTransport(type: string): Transport {
        switch (type) {
            case "truck":
                return new Truck()

            case "ship":
                return new Ship()

            default:
                throw new Error("Invalid transport type")

                break
        }
    }
}

//3. Usage
const transport1 = TransportFactory.createTransport("truck")
transport1.deliver() // Output: Delivering by land using a truck.

const transport2 = TransportFactory.createTransport("ship")
transport2.deliver() // Output: Delivering by sea using a ship.

// Benefits:
// Simplifies Object Creation: The client code does not need to worry about the details of object creation.
// Centralized Creation Logic: If a new type of transport needs to be added, you can easily extend the factory without changing the client code.
