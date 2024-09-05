//Command is a behavioral pattern that turns a request into a stand-alone object that contains all information about the request.
//This allows you to parameterize method with different requests, queue or log requests, and support undoable operation

//Key component
//1. Command: An interface or abstract class defining the execute method
//2. Concrete commands: Classes that implement the Command interface and define the specific actions
//3. Invoker: A class that triggers the commands
//4. Receiver: The object that knows how to perform the operations associated with a command.

//Command interface
interface Command {
    execute(): void
    undo(): void
}

//Receiver class (The actual implementation of the commands)
class Light {
    turnOn(): void {
        console.log("Light is ON")
    }

    turnOff(): void {
        console.log("Light is OFF")
    }
}

//Concrete command to turn the light on
class LightOnCommand implements Command {
    private light: Light

    constructor(light: Light) {
        this.light = light
    }
    execute(): void {
        this.light.turnOn()
    }

    undo(): void {
        this.light.turnOff()
    }
}

//Concrete command to turn the light off
class LightOffCommand implements Command {
    private light: Light

    constructor(light: Light) {
        this.light = light
    }

    execute(): void {
        this.light.turnOff()
    }

    undo(): void {
        this.light.turnOn()
    }
}

//Invoker (Remote control)
class RemoteControl {
    private command: Command | null = null

    setCommand(command: Command) {
        this.command = command
    }

    pressButton(): void {
        if (this.command) {
            this.command.execute()
        }
    }

    pressUndo(): void {
        if (this.command) {
            this.command.undo()
        }
    }
}

//Client code
const light = new Light() //Receiver

const lightOnCommand = new LightOnCommand(light)
const lightOffCommand = new LightOffCommand(light)

const remote = new RemoteControl()

console.log("Turning the light on:")
remote.setCommand(lightOnCommand)
remote.pressButton()

console.log("\nUndoing the last action:")
remote.pressUndo()

console.log("\nTurning the light off:")
remote.setCommand(lightOffCommand)
remote.pressButton()

console.log("\nUndoing the last action:")
remote.pressUndo()
