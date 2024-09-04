//abstract factory is a creational pattern that provides an interface for creating families of related
//or dependent objects without specifying their concrete class

//key components

//1. Abstract Product interface
//2. Concrete Product classes
//3. Abstract factory interface
//4. Concrete Factory classes
//5. Client code

//Step 1: Define the Abstract Product Interfaces
interface Button {
    click():void
}

interface Checkbox {
    check():void 
}

//Step 2: Create Concrete Product Classes
class WindowButton implements Button {
    click(): void {
        console.log("Windows Button clicked!");
    }
}

class MacOSButton implements Button {
    click(): void {
        console.log("MacOS Button clicked!");
    }
}

class WindowsCheckbox implements Checkbox {
    check(): void {
      console.log("Windows Checkbox checked!");
    }
  }
  
  class MacOSCheckbox implements Checkbox {
    check(): void {
      console.log("MacOS Checkbox checked!");
    }
}

//Step 3: Define the Abstract Factory Interface
interface GUIFactory {
    createButton():Button
    createCheckBox():Checkbox
}

//Step 4: Create Concrete Factory Classes
class WindowFactory implements GUIFactory {
    createButton(): Button {
        return new WindowButton()
    }
    createCheckBox(): Checkbox {
        return new WindowsCheckbox
    }
}

class MacOSFactory implements GUIFactory {
    createButton(): Button {
        return new MacOSButton()
    }
    createCheckBox(): Checkbox {
        return new MacOSCheckbox()
    }
}

//Client code
class Application {
    private button:Button
    private checkbox: Checkbox

    constructor(factory: GUIFactory){
        this.button = factory.createButton()
        this.checkbox = factory.createCheckBox()
    }

    run():void {
        this.button.click()
        this.checkbox.check()
    }
}

//Usage
function configureApplication(osType:string):Application {
    let factory: GUIFactory

    if(osType === 'Window'){
        factory = new WindowFactory()
    }else if(osType ==='MacOS'){
        factory = new MacOSFactory()
    }else {
        throw new Error("Unsupported OS type");
    }

    return new Application(factory)
}

const app = configureApplication('Window')
app.run()