//Composite pattern is a structural pattern that allows you to treat groups of objects in a uniform manner.
//It allows you to compose objects into tree structures to represent part-whole hierarchies.
//This pattern is useful when you want to treat both single objects and composition (groups of objects) in the same way

//Key concepts
//- An abstract class or interface that defines the common operations for both leaf and composite nodes
//- Leaf: A class that represents individual objects (the objects in the hierarchy)
//- Composite: A class that represents a composition of Leaf objects or other Composite objects, allowing nesting

// Step 1: Component Interface
interface FileSystemItem {
    // getSize(): number // Common operation for both files and folders
    isDirectory(): boolean
    display(): void
}

//Step 2: Leaf Class (File)
class FileLeaf implements FileSystemItem {
    private name: string
    private size: number

    constructor(name: string, size: number) {
        this.name = name
        this.size = size
    }

    isDirectory(): boolean {
        return false
    }

    display(): void {
        console.log(`File: ${this.name} (${this.size} bytes)`)
    }
}

//Step 3: Composite class (Folder)
class DirectoryComposite implements FileSystemItem {
    private name: string
    private items: FileSystemItem[] = [] // Can contain files or other folders

    constructor(name: string) {
        this.name = name
    }

    // add(item: FileSystemItem){
    //     this.items.push(item) // Add files or folders to the folder
    // }

    // getSize(): number {
    //     return this.items.reduce((totalSize, item) => totalSize + item.getSize(),0)
    // }

    private children: FileSystemItem[]

    isDirectory(): boolean {
        return true
    }

    addChild(item: FileSystemItem): void {
        this.children.push(item)
    }

    removeChild(item: FileSystemItem): void {
        const index = this.children.indexOf(item)
        if (index !== -1) {
            this.children.splice(index, 1)
        }
    }

    getChildren(): FileSystemItem[] {
        return this.children
    }

    display(): void {
        console.log(`Directory: ${this.name}`)
        for (const child of this.children) {
            child.display()
        }
    }
}

// Usage:
const rootDirectory = new DirectoryComposite("Root")
const documentsDirectory = new DirectoryComposite("Documents")
const picturesDirectory = new DirectoryComposite("Pictures")
const textFile = new FileLeaf("report.txt", 1024)
const imageFile = new FileLeaf("photo.jpg", 5120)

rootDirectory.addChild(documentsDirectory)
rootDirectory.addChild(picturesDirectory)
documentsDirectory.addChild(textFile)
picturesDirectory.addChild(imageFile)

rootDirectory.display()
