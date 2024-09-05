//The Iterator is a behavioral pattern that provides away to access the element of an aggregate object sequentially
//without exposing its underlying representation.
//It allows traversing through a collection (array or lists) in standard way

//Key component
//1. Iterator interface: Define method traverse a collection (next(), hasNext())
//2. Concrete iterator: Implements the iterator interface to provide a way to iterate over a specific collection
//3. Aggregate (collection): Defines an interface for creating an iterator
//4. Concrete Aggregate: Implements the aggregate interface and returns a concrete iterator for its collection

//Interface iterator
interface IteratorPattern<T> {
    current(): T | null
    next(): T | null
    hasNext(): boolean
}

//Aggregate interface
interface IterableCollection<T> {
    createIterator(): IteratorPattern<T>
}

//Concrete Iterator for a NumbersCollection
class NumbersIterator implements IteratorPattern<number> {
    private collection: NumbersCollection
    private position: number = 0

    constructor(collection: NumbersCollection) {
        this.collection = collection
    }

    current(): number | null {
        if (this.position < this.collection.getCount()) {
            return this.collection.getItem(this.position)
        }
        return null
    }

    next(): number | null {
        if (this.position < this.collection.getCount()) {
            return this.collection.getItem(this.position++)
        }
        return null
    }
    hasNext(): boolean {
        return this.position < this.collection.getCount()
    }
}

//Concrete Collection (Aggregate)
class NumbersCollection implements IterableCollection<number> {
    private items: number[] = []

    addItem(item: number) {
        this.items.push(item)
    }

    getItem(index: number) {
        return this.items[index]
    }

    getCount() {
        return this.items.length
    }

    createIterator(): IteratorPattern<number> {
        return new NumbersIterator(this)
    }
}

//Client code
const collection = new NumbersCollection()
collection.addItem(10)
collection.addItem(11)
collection.addItem(12)

const iterator = collection.createIterator()

console.log("Iterating over the collection:")
while (iterator.hasNext()) {
    console.log(iterator.next())
}
