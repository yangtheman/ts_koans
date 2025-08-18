import { Koan } from "./koan";

export class AboutClasses extends Koan {
  constructor() {
    super("AboutClasses", "about-classes.ts");
  }

  // Learn: Classes are blueprints for creating objects with shared properties and methods
  // The constructor method is called when creating a new instance with 'new'
  // Properties are declared at the class level and initialized in the constructor
  // instanceof operator checks if an object was created from a specific class
  // Example: class Person creates objects that all have name and age properties
  test_class_definition(): void {
    class Person {
      name: string;
      age: number;

      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }
    }

    const alice = new Person("Alice", 30);

    this.assertEqual(this.___(), alice.name); // Fill in the blank
    this.assertEqual(30, alice.age);
    this.assertEqual(true, alice instanceof Person);
  }

  // Learn: Class methods are functions that belong to the class
  // Methods can access and modify the object's properties using 'this'
  // Returning 'this' enables method chaining (fluent interface pattern)
  // Private properties (marked with 'private') can only be accessed within the class
  // Example: calc.add(5).multiply(2) chains operations together
  test_class_methods(): void {
    class Calculator {
      private result: number = 0;

      add(value: number): Calculator {
        this.result += value;
        return this;
      }

      multiply(value: number): Calculator {
        this.result *= value;
        return this;
      }

      getResult(): number {
        return this.result;
      }
    }

    const calc = new Calculator();
    const result = calc.add(5).multiply(2).getResult();

    this.assertEqual(this.__(), result); // Fill in the blank
  }

  // Learn: Inheritance allows classes to extend other classes using 'extends'
  // Child classes inherit properties and methods from parent classes
  // 'super()' calls the parent class constructor and must be called first
  // Child classes can override parent methods to provide specialized behavior
  // instanceof checks the entire inheritance chain, not just the immediate class
  // Example: Dog extends Animal, so Dog instances are also Animal instances
  test_class_inheritance(): void {
    class Animal {
      name: string;

      constructor(name: string) {
        this.name = name;
      }

      makeSound(): string {
        return "Some generic animal sound";
      }
    }

    class Dog extends Animal {
      breed: string;

      constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
      }

      makeSound(): string {
        return "Woof!";
      }
    }

    const buddy = new Dog("Buddy", "Golden Retriever");

    this.assertEqual("Buddy", buddy.name);
    this.assertEqual(this.___(), buddy.breed); // Fill in the blank
    this.assertEqual(this.___(), buddy.makeSound()); // What sound does a dog make?
    this.assertEqual(true, buddy instanceof Dog);
    this.assertEqual(this.___(), buddy instanceof Animal); // Fill in the blank
  }

  // Learn: Access modifiers control who can access class members
  // 'public' - accessible everywhere (default if not specified)
  // 'private' - only accessible within the same class
  // 'protected' - accessible within the class and its subclasses
  // These enforce encapsulation and hide internal implementation details
  // Example: balance is private so it can only be changed through controlled methods
  test_access_modifiers(): void {
    class BankAccount {
      public accountNumber: string;
      private balance: number;
      protected accountType: string;

      constructor(accountNumber: string, initialBalance: number) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.accountType = "checking";
      }

      public getBalance(): number {
        return this.balance;
      }

      private validateAmount(amount: number): boolean {
        return amount > 0;
      }

      public deposit(amount: number): void {
        if (this.validateAmount(amount)) {
          this.balance += amount;
        }
      }
    }

    const account = new BankAccount("12345", 100);

    this.assertEqual("12345", account.accountNumber); // Public property accessible
    this.assertEqual(this.__(), account.getBalance()); // Fill in the blank

    account.deposit(50);
    this.assertEqual(this.__(), account.getBalance()); // After deposit?

    // These would cause compilation errors:
    // account.balance; // private
    // account.validateAmount(10); // private
    // account.accountType; // protected
  }

  // Learn: Static methods and properties belong to the class itself, not instances
  // Access static members using the class name: ClassName.staticMember
  // Static methods cannot access instance properties (no 'this' context for instances)
  // Useful for utility functions and constants that relate to the class concept
  // Example: Math.PI is a static property, Math.max() is a static method
  test_static_methods_and_properties(): void {
    class MathUtils {
      static PI: number = 3.14159;

      static circleArea(radius: number): number {
        return this.PI * radius * radius;
      }

      static max(a: number, b: number): number {
        return a > b ? a : b;
      }
    }

    this.assertEqual(this.___(), MathUtils.PI); // Fill in the blank
    this.assertEqual(this.__(), MathUtils.max(10, 5)); // Fill in the blank

    const area = MathUtils.circleArea(2);
    this.assertEqual(true, area > 12 && area < 13); // Approximately π * 4
  }

  // Learn: Abstract classes cannot be instantiated directly, only extended
  // Abstract methods must be implemented by child classes
  // Abstract classes can contain both abstract and concrete methods
  // Use abstract classes to define a common interface with some shared implementation
  // Example: Shape defines the contract, Rectangle provides the specific implementation
  test_abstract_classes(): void {
    abstract class Shape {
      abstract getArea(): number;

      describe(): string {
        return `This shape has an area of ${this.getArea()}`;
      }
    }

    class Rectangle extends Shape {
      constructor(private width: number, private height: number) {
        super();
      }

      getArea(): number {
        return this.width * this.height;
      }
    }

    const rect = new Rectangle(4, 5);

    this.assertEqual(this.__(), rect.getArea()); // Fill in the blank
    this.assertEqual(this.___(), rect.describe().includes("20")); // Fill in the blank

    // This would cause a compilation error:
    // const shape = new Shape(); // Cannot instantiate abstract class
  }

  // Learn: Getters and setters provide controlled access to private properties
  // 'get' defines a property that can be read (called without parentheses)
  // 'set' defines a property that can be written to (assigned with =)
  // They allow data validation, computed properties, and encapsulation
  // Example: temperature.fahrenheit looks like a property but runs conversion logic
  test_getters_and_setters(): void {
    class Temperature {
      private celsius: number = 0;

      get fahrenheit(): number {
        return (this.celsius * 9) / 5 + 32;
      }

      set fahrenheit(value: number) {
        this.celsius = ((value - 32) * 5) / 9;
      }

      get celsius_value(): number {
        return this.celsius;
      }

      set celsius_value(value: number) {
        this.celsius = value;
      }
    }

    const temp = new Temperature();
    temp.celsius_value = 100; // Boiling point of water

    this.assertEqual(this.__(), temp.celsius_value); // Fill in the blank
    this.assertEqual(this.__(), temp.fahrenheit); // Fill in the blank

    temp.fahrenheit = 68; // Room temperature
    this.assertEqual(this.__(), temp.celsius_value); // Fill in the blank
  }
}
