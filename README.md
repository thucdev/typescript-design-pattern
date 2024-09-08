-   Creational Pattens: These patterns deal with creation of objects

*   Simple Factory
*   Factory Method
*   Abstract Factory
*   Builder
*   Singleton

-   Structural patterns: These patterns deal with how classes and objects are composed to form larger structures

*   Adapter
*   Facade
*   Proxy
*   Composite

-   Behavioral patterns: These patterns deal with how objects interact and communicate with each other

*   Strategy
*   Observer
*   Command
*   Iterator
*   Template method

*   Creational Design pattern abstract the instantiation process. They help in making a system independent
    of how its objects are created, composed and represented

*   Structural Design pattern are concerned with how classes and objects are composed form larger structures.
    Structural class pattern use inheritance to compose interfaces or implementations

*   Behavioral Patterns are concerned with algorithms and the assignment of responsibilities between objects.
    Behavioral patterns describe not just patterns of objects or classes but also the patterns of communication between them.
    These patterns characterize complex control flow that's difficult to follow at run-time

# Memory

1. Strategy Pattern

-   Use case: When you need to choose between different algorithms at runtime without changing the client code.
    Example: Payment processing where you can select between different payment methods (credit card, PayPal, etc.).

2. Observer Pattern

-   Use case: When one object needs to notify multiple objects about state changes without being tightly coupled to them.
    Example: A news platform where subscribers are notified when a new article is published.

3. Simple Factory Pattern

-   Use case: When you want to encapsulate object creation logic without complex subclassing.
    Example: A pizza store that makes different types of pizzas but uses a single function to decide which one to make.

4. Factory Method Pattern

-   Use case: When you want subclasses to decide which object to instantiate.
    Example: An app where different product creators (e.g., digital and physical products) use a method to create their respective product.

5. Abstract Factory Pattern

-   Use case: When you need to create families of related objects without specifying their concrete classes.
    Example: A UI framework where you can switch between MacOS and Windows UI components without changing the client code.

6. Adapter Pattern

-   Use case: When you want to allow incompatible interfaces to work together.
    Example: Integrating a legacy system's API with a new system through an adapter to translate the data formats.

7. Facade Pattern

-   Use case: When you want to provide a simplified interface to a complex system.
    Example: A library management system with a facade that offers simple methods for borrowing, returning, and searching for books.

8. Proxy Pattern

-   Use case: When you want to control access to an object or add functionality like lazy initialization, logging, or caching.
    Example: A virtual proxy that only loads heavy resources (like images) when they are needed.

9. Command Pattern

-   Use case: When you want to encapsulate a request as an object to parameterize clients or log requests.
    Example: A remote control system where each button press (command) can undo, redo, or log actions.

10. Iterator Pattern

-   Use case: When you need a way to access the elements of an aggregate object sequentially without exposing its underlying structure.
    Example: A collection of items in a shopping cart that can be iterated over without exposing its internal representation.

11. Singleton Pattern

-   Use case: When you need to ensure a class has only one instance and provide a global access point to it.
    Example: A configuration manager that should have only one instance in an application to manage app-wide settings.

12. Composite Pattern

-   Use case: When you want to treat individual objects and compositions of objects uniformly.
    Example: A file system where both files and directories (which can contain files and other directories) are treated the same way.

13. Template Method Pattern

-   Use case: When you want to define the skeleton of an algorithm in a base class but let subclasses override specific steps.
    Example: A data processing framework where the overall process is the same, but specific steps like data parsing can be customized by subclasses.

14. Builder Pattern

-   Use case: When you want to construct complex objects step by step and ensure that the construction process is separate from the object’s representation.
    Example: Creating a house with multiple configurations (e.g., different numbers of rooms, windows, and doors) where the construction process is detailed and flexible.

## Memory Aid

-   Strategy: Flexible choices, like payment methods.
-   Observer: Notify multiple subscribers, like a newsfeed.
-   Simple Factory: Centralized object creation, like making pizzas.
-   Factory Method: Subclass-specific creation, like digital vs. physical products.
-   Abstract Factory: Related object families, like UI components.
-   Adapter: Compatibility fix, like integrating legacy systems.
-   Facade: Simplified interface, like a library system.
-   Proxy: Controlled access, like a virtual image loader.
-   Command: Encapsulate actions, like a remote control.
-   Iterator: Sequential access, like a shopping cart.
-   Singleton: One instance, like configuration management.
-   Composite: Uniform structure, like a file system.
-   Template Method: Algorithm skeleton, like a data processor.
-   Builder: Step-by-step construction, like building a house.
