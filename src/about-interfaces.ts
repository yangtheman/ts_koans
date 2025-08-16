import { Koan } from "./koan";

export class AboutInterfaces extends Koan {
  constructor() {
    super("AboutInterfaces", "about-interfaces.ts");
  }

  // Learn: Interfaces define the structure/contract that objects must follow
  // They specify what properties and methods an object should have
  // Optional properties are marked with ? and may be omitted
  // Interfaces are compile-time only - they don't exist at runtime
  // Example: Person interface ensures objects have name, age, and optionally email
  test_interface_definition(): void {
    interface Person {
      name: string;
      age: number;
      email?: string; // Optional property
    }

    const alice: Person = {
      name: "Alice",
      age: 30,
    };

    const bob: Person = {
      name: "Bob",
      age: 25,
      email: "bob@example.com",
    };

    this.assertEqual(this.___(), alice.name); // Fill in the blank
    this.assertEqual(30, alice.age);
    this.assertEqual(this.___(), alice.email); // Fill in the blank

    this.assertEqual("Bob", bob.name);
    this.assertEqual(this.___(), bob.email); // Fill in the blank
  }

  // Learn: Interfaces can define method signatures that objects must implement
  // Method signatures specify the parameter types and return type
  // Objects implementing the interface can use any valid function syntax
  // This ensures consistent API across different implementations
  // Example: Calculator interface guarantees add and subtract methods exist
  test_interface_methods(): void {
    interface Calculator {
      add(a: number, b: number): number;
      subtract(a: number, b: number): number;
    }

    const basicCalc: Calculator = {
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
    };

    this.assertEqual(this.__(), basicCalc.add(5, 3)); // Fill in the blank
    this.assertEqual(2, basicCalc.subtract(5, 3));
  }

  // Learn: Interfaces can extend other interfaces using the 'extends' keyword
  // Child interfaces inherit all properties and methods from parent interfaces
  // Child interfaces can add new properties and methods
  // This creates hierarchical relationships between interface definitions
  // Example: Dog extends Animal, so Dog must have all Animal properties plus its own
  test_extending_interfaces(): void {
    interface Animal {
      name: string;
      age: number;
    }

    interface Dog extends Animal {
      breed: string;
      bark(): string;
    }

    const buddy: Dog = {
      name: "Buddy",
      age: 3,
      breed: "Golden Retriever",
      bark: () => "Woof!",
    };

    this.assertEqual("Buddy", buddy.name);
    this.assertEqual(this.___(), buddy.breed); // Fill in the blank
    this.assertEqual(this.___(), buddy.bark()); // Fill in the blank
  }

  // Learn: Classes can implement interfaces using the 'implements' keyword
  // A class can implement multiple interfaces (multiple inheritance of contracts)
  // The class must provide implementations for all interface methods and properties
  // This ensures the class conforms to the expected API contract
  // Example: Duck implements both Flyable and Swimmable interfaces
  test_interface_implementation_in_classes(): void {
    interface Flyable {
      fly(): string;
      maxAltitude: number;
    }

    interface Swimmable {
      swim(): string;
      maxDepth: number;
    }

    class Duck implements Flyable, Swimmable {
      maxAltitude: number = 1000;
      maxDepth: number = 10;

      fly(): string {
        return "Flying like a duck!";
      }

      swim(): string {
        return "Swimming like a duck!";
      }
    }

    const duck = new Duck();

    this.assertEqual(this.___(), duck.fly()); // How does a duck fly?
    this.assertEqual("Swimming like a duck!", duck.swim());
    this.assertEqual(this.__(), duck.maxAltitude); // Fill in the blank
  }

  // Learn: Function interfaces define the signature for functions
  // Specifies parameter types and return type for function variables
  // Functions assigned to variables with function interfaces must match the signature
  // Useful for callback functions and function parameters
  // Example: StringProcessor defines functions that take a string and return a string
  test_function_interfaces(): void {
    interface StringProcessor {
      (input: string): string;
    }

    const upperCase: StringProcessor = (input) => input.toUpperCase();
    const addPrefix: StringProcessor = (input) => `Hello, ${input}!`;

    this.assertEqual(this.___(), upperCase("typescript")); // Fill in the blank
    this.assertEqual(this.___(), addPrefix("World")); // Fill in the blank
  }

  // Learn: Index signatures allow objects to have dynamic property names
  // [key: string]: type means any string key can map to the specified type
  // You can also specify known properties alongside the index signature
  // Useful for dictionaries, maps, and objects with unknown property names
  // Example: StringDictionary allows any string key with string values
  test_index_signatures(): void {
    interface StringDictionary {
      [key: string]: string;
    }

    interface NumberDictionary {
      [key: string]: number;
      length: number; // You can have known properties too
    }

    const colors: StringDictionary = {
      red: "#FF0000",
      green: "#00FF00",
      blue: "#0000FF",
    };

    const scores: NumberDictionary = {
      length: 3,
      alice: 95,
      bob: 87,
      charlie: 92,
    };

    this.assertEqual(this.___(), colors.red); // Fill in the blank
    this.assertEqual("#00FF00", colors["green"]);

    this.assertEqual(this.__(), scores.length); // Fill in the blank
    this.assertEqual(95, scores.alice);
    this.assertEqual(this.__(), scores["charlie"]); // Fill in the blank
  }

  // Learn: readonly properties cannot be modified after object creation
  // The readonly modifier prevents assignment after initialization
  // Only applies to the property itself, not nested objects (shallow readonly)
  // Useful for creating immutable data contracts
  // Example: id and name cannot be changed, but age can be modified
  test_readonly_properties(): void {
    interface ReadonlyPerson {
      readonly id: number;
      readonly name: string;
      age: number; // Not readonly
    }

    const person: ReadonlyPerson = {
      id: 1,
      name: "Alice",
      age: 30,
    };

    person.age = 31; // This is allowed

    this.assertEqual(1, person.id);
    this.assertEqual("Alice", person.name);
    this.assertEqual(this.__(), person.age); // Fill in the blank

    // These would cause compilation errors:
    // person.id = 2; // Cannot assign to 'id' because it is a read-only property
    // person.name = 'Bob'; // Cannot assign to 'name' because it is a read-only property
  }

  // Learn: Interface merging combines multiple interface declarations with the same name
  // All properties and methods from different declarations are merged together
  // This is useful for extending third-party library interfaces
  // Declaration merging only works with interfaces, not with type aliases
  // Example: Three User interface declarations merge into one combined interface
  test_interface_merging(): void {
    // Interface declarations with the same name are merged
    interface User {
      name: string;
    }

    interface User {
      age: number;
    }

    interface User {
      email: string;
    }

    const user: User = {
      name: "John",
      age: 25,
      email: "john@example.com",
    };

    this.assertEqual(this.___(), user.name); // Fill in the blank
    this.assertEqual(25, user.age);
    this.assertEqual(this.___(), user.email); // Fill in the blank
  }
}
