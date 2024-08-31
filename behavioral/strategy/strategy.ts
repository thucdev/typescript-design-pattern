//With strategy pattern, an array of algorithms is defined,
//each encapsulated and interchangeable. This mirrors selecting a strategy for
// a particular game

//Key component
//- Strategy: The interface that defines the common method
//- Concrete strategies: The class that implement the strategy interface
//- Context: The class that uses the strategy

//Step 1: Define the strategy interface
interface PaymentStrategy {
    pay(amount: number): void
}

// Step 2: Create concrete strategy class
class CreditCardPayment implements PaymentStrategy {
    private cardNumber: string
    private cvv: string
    constructor(cardNumber: string, cvv: string) {
        this.cardNumber = cardNumber
        this.cvv = cvv
    }
    pay(amount: number) {
        console.log(`Paying ${amount} using credit card ${this.cardNumber} and cvv ${this.cvv}`)
    }
}

class PayPalPayment implements PaymentStrategy {
    private email: string
    constructor(email: string) {
        this.email = email
    }

    pay(amount: number): void {
        console.log(`Paying ${amount} using PayPal ${this.email}`)
    }
}

//Step 3: Context class that uses the strategy
class ShoppingCart {
    private paymentStrategy: PaymentStrategy

    constructor(paymentStrategy: PaymentStrategy) {
        this.paymentStrategy = paymentStrategy
    }

    setPaymentStrategy(paymentStrategy: PaymentStrategy) {
        this.paymentStrategy = paymentStrategy
    }

    checkout(amount: number): void {
        this.paymentStrategy.pay(amount)
    }
}

//Usage
const creditCardStrategy = new CreditCardPayment("972441242341428", "332")
const paypalStrategy = new PayPalPayment("thucidol2012@gmail.com")

const cart = new ShoppingCart(creditCardStrategy)
cart.checkout(300)

cart.setPaymentStrategy(paypalStrategy)
cart.checkout(220)
