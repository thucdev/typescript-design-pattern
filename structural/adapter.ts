//Adapter is a structural pattern that allow incompatiple interfaces to work together
//It acts as a bridge between two imcompatiple interfaces by wrapping an existing class (adaptee) with a new interface that the client expects

//Key component
//1. Client: The object that interacts with the target interface
//2. Target interface: the interface that the client expects
//3. Adaptee: The exsiting class that needs to be adapted
//4. Adapter: The class that implements the target interface and wraps the adaptee, converting its interface into the expected target interface

//Step 1: Define the Target Interface
interface Logger {
    log(message:string): void 
}

//Step 2: Define the Adaptee (the incompatible interface)
class ThirdPartyLogger {
    logToFile(message:string):void {
        console.log(`Logging to file: ${message}`);
    }
}

//Step 3: Create the Adapter
class LoggerAdapter implements Logger {
    private adaptee: ThirdPartyLogger
    
    constructor(adaptee:ThirdPartyLogger){
        this.adaptee = adaptee
    }

    log(message: string): void {
        // Translate the call to the adaptee's method
        this.adaptee.logToFile(message);
    }
}

//Step 4: Implement the Client Code

class ApplicationAdapter {
    private logger:Logger

    constructor(logger:Logger){
        this.logger = logger
    }

    run():void{
        this.logger.log("Application has started.");
    }
}

//Usage
const thirdPartyLogger = new ThirdPartyLogger()
const loggerAdapter = new LoggerAdapter(thirdPartyLogger)
const appAdapter = new ApplicationAdapter(loggerAdapter)
appAdapter.run()