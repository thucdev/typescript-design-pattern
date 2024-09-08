//Template method is a behavioral pattern that defines the skeleton of an algorithm in a base class
// but allows subclasses to override certain steps without changing the overall structure of the algorithm.

//This pattern is useful when you want to define the core steps of an algorithm once and allow subclasses to customize certain behaviors

//Key Concepts:
//1. Template method: A method in the base class that outlines the algorithm structure,
//calling abstract or customizable method (hooks) that subclasses can override
//2. Abstract methods: Method that defined in the base class that must be implemented in the subclass
//3. Concrete Methods: Methods defined and implemented in the base class that are common to all subclasses
//4. Hooks (Optional method): Methods that provide default behavior but can be optionally overridden by the subclass

// Abstract Class with Template Method
abstract class Beverage {
    //Template method that defined the steps to prepare a beverage
    prepareRecipe(): void {
        this.boilWater()
        this.brew() //Abstract method for brewing, implemented by subclasses
        this.pourInCup()
        if (this.customerWantsCondiment()) {
            this.addCondiments() // Abstract method for condiments, implemented by subclasses
        }
    }

    //Concrete method
    boilWater() {
        console.log("Boiling water")
    }

    pourInCup() {
        console.log("Pouring into cup")
    }

    // Abstract method to be implemented by subclasses
    protected abstract brew(): void
    protected abstract addCondiments(): void

    //Hook (optional method) that can be overridden
    protected customerWantsCondiment(): boolean {
        return true // Default behavior, can be overridden by subclasses
    }
}

//Subclass for tea
class Tea extends Beverage {
    protected brew(): void {
        console.log("Steeping the tea")
    }

    protected addCondiments(): void {
        console.log("Adding lemon")
    }

    protected customerWantsCondiment(): boolean {
        // Ask the customer if they want condiments (for demonstration, we'll assume yes)
        return true
    }
}

//Subclass for Coffee
class Coffee extends Beverage {
    protected brew(): void {
        console.log("Brewing the coffee")
    }

    protected addCondiments(): void {
        console.log("Adding sugar and milk")
    }

    protected customerWantsCondiment(): boolean {
        // Assume the customer doesn't want condiments
        return false
    }
}

//Client code
const tea = new Tea()
tea.prepareRecipe()
// Output:
// Boiling water
// Steeping the tea
// Pouring into cup
// Adding lemon

const coffee = new Coffee()
coffee.prepareRecipe()
// Output:
// Boiling water
// Brewing the coffee
// Pouring into cup
