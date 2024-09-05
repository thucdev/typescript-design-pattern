//The proxy is a structural pattern that provides a surrogate or placeholder for another object to control access to it.
//The proxy acts as an intermediary between the client and the actual object, adding additional behavior like
//lazy initialization, access control, logging, caching... without changing the original object

//Types of proxies
//Remote Proxy: Accesses a remote object over a network
//Virtual Proxy: Manage the access and creation of an expensive resource
//Protection Proxy: Controls access to an object based on certain conditions
//Caching Proxy: Adds caching mechanism to prevent redundant operation

interface Resource {
    request(): string
}

class RealSubject implements Resource {
    request(): string {
        return "RealSubject: Handling request"
    }
}

class ProxySubject implements Resource {
    private realSubject: Resource
    constructor() {
        this.realSubject = new RealSubject()
    }
    request(): string {
        if (this.checkAccess()) {
            return this.realSubject.request()
        }
        return "Proxy: No access"
    }
    private checkAccess(): boolean {
        console.log("Proxy: Checking access prior to firing a real request.")
        return true
    }
}

function clientCode(subject: Resource) {
    console.log(subject.request())
}

//Usage
const proxy = new ProxySubject()
clientCode(proxy)
