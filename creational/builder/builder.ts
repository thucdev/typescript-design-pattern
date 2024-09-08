//Builder is a creational pattern that separates the construction of a complex object from its representation,
//allowing the same construction process create different representations.
//It is useful when an object has many optional parameters or complex construction logic

//Key concepts
//1. Builder: A separate object that constructs the final object step by step
//2. Director: (Optional) Orchestrates the construction using the builder
//3. Product: The complex object that is being constructed

//Step 1: Product (Car)
class Car {
    engine: string
    seats: number
    GPS: boolean

    showCarDetails() {
        console.log(
            `Car details: Engine - ${this.engine}, Seats - ${this.seats}, GPS - ${
                this.GPS ? "Yes" : "No"
            }`
        )
    }
}

// Step 2: Builder Interface
interface CarBuilder {
    setEngine(engine: string): this
    setSeats(seats: number): this
    setGPS(gps: boolean): this
    build(): Car
}

// Step 3: Concrete Builder (CarBuilderImpl)
class CarBuilderImpl implements CarBuilder {
    private car: Car
    constructor() {
        this.car = new Car() // Create a new Car instance
    }

    setEngine(engine: string): this {
        this.car.engine = engine
        return this //Return this for method chaining
    }

    setSeats(seats: number): this {
        this.car.seats = seats
        return this
    }

    setGPS(gps: boolean): this {
        this.car.GPS = gps
        return this
    }

    build(): Car {
        return this.car // Return the constructed Car object
    }
}

// Step 4: Director (Optional)
class CarDirector {
    private builder: CarBuilder

    constructor(builder: CarBuilder) {
        this.builder = builder
    }

    //Director can define a standard build process for different types of cars
    constructSportCar(): Car {
        return this.builder.setEngine("V8").setSeats(2).setGPS(true).build()
    }

    constructSUV(): Car {
        return this.builder.setEngine("V6").setSeats(7).setGPS(false).build()
    }
}

//Usage
//You can build a car step by step
const builder = new CarBuilderImpl()
const customCar = builder.setEngine("V4").setSeats(4).setGPS(true).build()
customCar.showCarDetails() // Output: Car details: Engine - V4, Seats - 4, GPS - Yes

//Or you can use a director to construct a predefined types of cars:
const director = new CarDirector(new CarBuilderImpl())
const sportsCar = director.constructSportCar()
sportsCar.showCarDetails() // Output: Car details: Engine - V8, Seats - 2, GPS - Yes
