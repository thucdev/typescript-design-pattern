//The observer pattern is a behavioral pattern that defines a a one-to-many dependency between object,
//when one object changes state, all its dependents are notified and updated automatically

//Key component:
//- Subject: The object being observed. It maintains a list of observers and notifies them when its state change
//- Observer: The object that observe the subject. It receives notification from the subject

//Observer.ts
export interface Observer {
    update(news: string): void
}

//Subject
export interface Subject {
    subscribe(observer: Observer): void
    unsubscribe(observer: Observer): void
    notify(news: string): void
}

//Implement the concrete object
class NewsAgency implements Subject {
    private observers: Observer[] = []

    subscribe(observer: Observer): void {
        this.observers.push(observer)
    }

    unsubscribe(observer: Observer): void {
        this.observers = this.observers.filter((obs) => obs !== observer)
    }

    notify(news: string): void {
        for (const observer of this.observers) {
            observer.update(news)
        }
    }

    publishNews(news: string): void {
        console.log(`NewsAgency: Publishing news - ${news}`)
        this.notify(news)
    }
}

//Implement the concrete Observers
class NewsChannel implements Observer {
    private name: string
    constructor(name: string) {
        this.name = name
    }

    update(news: string): void {
        console.log(`${this.name} received news: ${news}`)
    }
}

//Usage
const newsAgency = new NewsAgency() //concrete subject maintain a list of observers and notifies them

const cnn = new NewsChannel("CNN") //observer
const bbc = new NewsChannel("BBC")
const fox = new NewsChannel("FOX")

newsAgency.subscribe(cnn)
newsAgency.subscribe(bbc)

newsAgency.publishNews("New tax policy")
// Output:
// NewsAgency: Publishing news - New tax policy announced.
// CNN received news: New tax policy announced.
// BBC received news: New tax policy announced.

newsAgency.unsubscribe(bbc)

newsAgency.publishNews("Sports team wins championship.")
// Output:
// NewsAgency: Publishing news - Sports team wins championship.
// CNN received news: Sports team wins championship.

newsAgency.subscribe(fox)

newsAgency.publishNews("New movie released.")
// Output:
// NewsAgency: Publishing news - New movie released.
// CNN received news: New movie released.
// Fox News received news: New movie released.
