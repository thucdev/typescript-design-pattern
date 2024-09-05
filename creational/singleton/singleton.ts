//Singleton is a pattern that ensures that a class has only one instance and provides a global point of access to it.


//Key component
//1. Single instance: Only one instance of the class can exist
//2. Global access: The single instance can be accessed globally
//3. Lazt initialization: The instance is created only when it is needed


class Singleton {
    //Hold the single instance of the class
    private static instance: Singleton

    //Private constructor to prevent direct instantiation
    private constructor(){}

    //Method to get the single instance of the class
    static getInstance(): Singleton{
        if(!Singleton.instance){
            Singleton.instance = new Singleton()
        }
        return Singleton.instance
    }

    //Example
    showMessage(){
        console.log("Singleton instance method invoked!");   
    }

}

//Usage
const singleton1 = Singleton.getInstance()
const singleton2 = Singleton.getInstance()

singleton1.showMessage()
// Check if both variables hold the same instance
console.log(singleton1 === singleton2); // Output: true
