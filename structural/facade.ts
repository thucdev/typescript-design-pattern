//Facade is a structural pattern that provides a simplified interface to a complex subsystem

//Key component
//1. Facade: The facade class provides a simplified interface to the complex subsystem. It delegates the client requests to the appropriate subsystem objects
//2. Subsystem classes: These are the complex classes that facade hides.
//3. Client: the client interacts with the facade instead of directly interacting with subsystem classes


//Step 1: Define the Subsystem Classes
class FlightSearch {
    search(from:string, to:string): string[]{
        console.log(`Searching flights from ${from} to ${to}`);
        return ["Flight 1", "Flight 2", "Flight 3"];
    }
}

class SeatBooking {
    book(seatNumber: number):void {
        console.log(`Booking seat number ${seatNumber}`);
    }
}

class PaymentProcessing {
    processPayment(amount: number): void {
        console.log(`Processing payment of $${amount}`);
    }
}

//Step 2: Create the Facade Class
class FlightBookingFacade {
    private flightSearch: FlightSearch
    private seatBooking: SeatBooking
    private paymentProcessing: PaymentProcessing

    constructor() {
        this.flightSearch = new FlightSearch()
        this.seatBooking = new SeatBooking()
        this.paymentProcessing = new PaymentProcessing()
    }

    bookFlight(from: string, to: string, seatNumber: number, amount: number): void {
        const flights = this.flightSearch.search(from, to);
        console.log("Available flights:", flights);
        
        if (flights.length > 0) {
          this.seatBooking.book(seatNumber);
          this.paymentProcessing.processPayment(amount);
          console.log("Flight booking completed!");
        } else {
          console.log("No flights available.");
        }
      }

}

//Client code
const facade = new FlightBookingFacade();
facade.bookFlight("New York", "Los Angeles", 12, 300);