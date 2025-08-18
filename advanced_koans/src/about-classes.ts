import { Koan } from "./koan";

export class AboutClasses extends Koan {
  constructor() {
    super("AboutClasses", "about-classes.ts");
  }

  // CONCEPT: Classes - Object-Oriented Programming in TypeScript
  //
  // Classes are blueprints for creating objects that encapsulate data (properties)
  // and behavior (methods). They are fundamental to object-oriented programming (OOP)
  // and provide a way to model real-world entities or abstract concepts in code.
  //
  // TypeScript classes extend JavaScript's ES6 class syntax with:
  // - Static type checking for properties and methods
  // - Access modifiers (public, private, protected)
  // - Abstract classes and methods
  // - Decorators (experimental)
  // - Interface implementation
  // - Advanced inheritance patterns
  //
  // Key OOP Principles in Classes:
  // - Encapsulation: bundling data and methods, controlling access
  // - Inheritance: extending functionality from parent classes
  // - Polymorphism: same interface, different implementations
  // - Abstraction: hiding complexity behind simple interfaces
  //
  // Class Components:
  // - Properties: data stored in instances
  // - Methods: functions that operate on the data
  // - Constructor: special method for creating instances
  // - Static members: belong to the class, not instances
  // - Access modifiers: public, private, protected

  test_class_definition_and_instantiation(): void {
    // CONCEPT: Class Definition and Object Instantiation
    //
    // Classes serve as templates for creating objects. The 'new' keyword
    // creates instances by calling the constructor. Each instance has its
    // own copy of properties but shares methods. Understanding the difference
    // between the class (template) and instance (object) is fundamental.
    //
    // Constructor function is called automatically when 'new' is used.
    // Properties can be initialized with default values or through constructor.
    // The 'instanceof' operator checks the prototype chain for inheritance.

    class Person {
      name: string;
      age: number;
      private id: string; // Private property for internal use

      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.id = Math.random().toString(36).substr(2, 9); // Generate unique ID
      }

      // Method to get person info
      getInfo(): string {
        return `${this.name} is ${this.age} years old`;
      }

      // Method demonstrating private property access
      getId(): string {
        return this.id;
      }
    }

    const alice = new Person("Alice", 30);
    const bob = new Person("Bob", 25);

    // Each instance has its own property values
    this.assertEqual(this.___(), alice.name); // "Alice"
    this.assertEqual(30, alice.age);
    this.assertEqual(this.___(), bob.name); // "Bob"
    this.assertEqual(25, bob.age);

    // Instances share the same class methods
    this.assertEqual("function", typeof alice.getInfo);
    this.assertEqual(this.___(), alice.getInfo()); // "Alice is 30 years old"

    // Each instance has unique private properties
    const aliceId = alice.getId();
    const bobId = bob.getId();
    this.assertEqual(this.___(), aliceId !== bobId); // true - unique IDs

    // Type checking with instanceof
    this.assertEqual(true, alice instanceof Person);
    this.assertEqual(this.___(), alice instanceof Object); // true - inheritance chain
    this.assertEqual("object", typeof alice);

    // Constructor function properties
    this.assertEqual("Person", Person.name);
    this.assertEqual(this.___(), Person.length); // 2 - number of constructor parameters
  }

  test_class_methods_and_this_binding(): void {
    // CONCEPT: Class Methods and 'this' Context
    //
    // Methods are functions that belong to a class and operate on instance data.
    // The 'this' keyword refers to the current instance. Method chaining (fluent
    // interface) is enabled by returning 'this'. Understanding 'this' binding
    // is crucial for proper method behavior, especially with callbacks.
    //
    // Types of methods:
    // - Instance methods: operate on specific instance data
    // - Chainable methods: return 'this' for method chaining
    // - Arrow function methods: lexical 'this' binding
    // - Bound methods: preserving 'this' context for callbacks

    class Calculator {
      private result: number = 0;
      private history: string[] = [];

      // Chainable instance method
      add(value: number): Calculator {
        this.result += value;
        this.history.push(`+${value}`);
        return this;
      }

      subtract(value: number): Calculator {
        this.result -= value;
        this.history.push(`-${value}`);
        return this;
      }

      multiply(value: number): Calculator {
        this.result *= value;
        this.history.push(`*${value}`);
        return this;
      }

      divide(value: number): Calculator {
        if (value !== 0) {
          this.result /= value;
          this.history.push(`/${value}`);
        }
        return this;
      }

      // Non-chainable query methods
      getResult(): number {
        return this.result;
      }

      getHistory(): string[] {
        return [...this.history]; // Return copy to prevent mutation
      }

      // Method with side effects
      clear(): Calculator {
        this.result = 0;
        this.history = [];
        return this;
      }

      // Arrow function method - lexical 'this' binding
      delayedAdd = (value: number): Promise<Calculator> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            this.add(value); // 'this' always refers to the instance
            resolve(this);
          }, 10);
        });
      };
    }

    const calc = new Calculator();

    // Method chaining demonstration
    const result = calc.add(10).multiply(2).subtract(5).getResult();
    this.assertEqual(this.___(), result); // 15

    // History tracking
    const history = calc.getHistory();
    this.assertEqual(this.___(), history.length); // 3
    this.assertEqual(["+10", "*2", "-5"], history);

    // Clear and reuse
    calc.clear().add(100).divide(4);
    this.assertEqual(this.___(), calc.getResult()); // 25
    this.assertEqual(2, calc.getHistory().length);

    // Method as callback - 'this' binding issue with regular methods
    const add5 = calc.add;
    // add5(5); // Would lose 'this' context - avoid this pattern

    // Arrow function method preserves 'this'
    const delayedAdd = calc.delayedAdd;
    this.assertEqual("function", typeof delayedAdd);

    // Demonstration of method types
    this.assertEqual(this.___(), typeof calc.add); // "function"
    this.assertEqual("function", typeof calc.getResult);
    this.assertEqual("function", typeof calc.delayedAdd);
  }

  test_inheritance_and_polymorphism(): void {
    // CONCEPT: Inheritance and Polymorphism in Action
    //
    // Inheritance allows classes to extend other classes, inheriting their
    // properties and methods. Child classes can override parent methods to
    // provide specialized behavior (polymorphism). The 'super' keyword accesses
    // parent class functionality. This enables code reuse and hierarchical
    // organization of related classes.
    //
    // Inheritance patterns:
    // - Single inheritance: one parent class
    // - Method overriding: child replaces parent behavior
    // - Method extension: child calls super then adds behavior
    // - Property inheritance: child gets parent properties
    // - Constructor chaining: super() calls parent constructor

    abstract class Animal {
      protected name: string;
      protected species: string;
      private energy: number = 100;

      constructor(name: string, species: string) {
        this.name = name;
        this.species = species;
      }

      // Abstract method - must be implemented by children
      abstract makeSound(): string;

      // Concrete method - can be inherited or overridden
      move(): string {
        this.energy -= 10;
        return `${this.name} is moving`;
      }

      // Protected method - accessible to children
      protected consumeEnergy(amount: number): void {
        this.energy = Math.max(0, this.energy - amount);
      }

      // Public getter for private property
      getEnergy(): number {
        return this.energy;
      }

      // Method that uses abstract method (template method pattern)
      greet(): string {
        return `${this.name} says: ${this.makeSound()}`;
      }
    }

    class Dog extends Animal {
      private breed: string;

      constructor(name: string, breed: string) {
        super(name, "Canis lupus"); // Call parent constructor
        this.breed = breed;
      }

      // Implement abstract method
      makeSound(): string {
        return "Woof!";
      }

      // Override parent method with additional behavior
      move(): string {
        const parentResult = super.move(); // Call parent method
        this.consumeEnergy(5); // Additional energy consumption for dogs
        return `${parentResult} (tail wagging)`;
      }

      // Additional method specific to dogs
      fetch(): string {
        this.consumeEnergy(15);
        return `${this.name} fetched the ball!`;
      }

      // Getter for breed
      getBreed(): string {
        return this.breed;
      }
    }

    class Cat extends Animal {
      private lives: number = 9;

      constructor(name: string) {
        super(name, "Felis catus");
      }

      makeSound(): string {
        return "Meow!";
      }

      // Different movement behavior
      move(): string {
        this.consumeEnergy(5); // Cats are more energy efficient
        return `${this.name} stalks silently`;
      }

      // Cat-specific behavior
      purr(): string {
        return `${this.name} is purring contentedly`;
      }

      getLives(): number {
        return this.lives;
      }
    }

    const buddy = new Dog("Buddy", "Golden Retriever");
    const whiskers = new Cat("Whiskers");

    // Polymorphic behavior - same method, different implementations
    this.assertEqual(this.___(), buddy.makeSound()); // "Woof!"
    this.assertEqual("Meow!", whiskers.makeSound());

    // Method overriding in action
    this.assertEqual(this.___(), buddy.move().includes("tail wagging")); // true
    this.assertEqual(this.___(), whiskers.move().includes("stalks")); // true

    // Template method pattern - parent uses child's implementation
    this.assertEqual("Buddy says: Woof!", buddy.greet());
    this.assertEqual(this.___(), whiskers.greet()); // "Whiskers says: Meow!"

    // Inheritance chain verification
    this.assertEqual(true, buddy instanceof Dog);
    this.assertEqual(this.___(), buddy instanceof Animal); // true
    this.assertEqual(true, whiskers instanceof Cat);
    this.assertEqual(this.___(), whiskers instanceof Animal); // true

    // Accessing inherited and own methods
    buddy.fetch();
    this.assertEqual(this.___(), buddy.getEnergy() < 85); // true (energy consumed)

    // Child-specific methods
    this.assertEqual("Golden Retriever", buddy.getBreed());
    this.assertEqual(this.___(), whiskers.getLives()); // 9

    // Energy management through inheritance
    const initialEnergy = whiskers.getEnergy();
    whiskers.move();
    this.assertEqual(this.___(), whiskers.getEnergy() < initialEnergy); // true
  }

  test_access_modifiers_and_encapsulation(): void {
    // CONCEPT: Access Modifiers and Data Encapsulation
    //
    // Access modifiers control visibility and accessibility of class members,
    // enforcing encapsulation principles. They help create clean interfaces
    // while hiding implementation details. Understanding access control is
    // essential for designing maintainable and secure class hierarchies.
    //
    // Access Levels:
    // - public: accessible everywhere (default)
    // - protected: accessible within class and subclasses
    // - private: accessible only within the defining class
    // - readonly: property can only be set during initialization
    //
    // Benefits of encapsulation:
    // - Data integrity through controlled access
    // - Implementation hiding for flexibility
    // - Interface stability across versions
    // - Security through access restriction

    class BankAccount {
      public readonly accountNumber: string;
      protected accountType: string;
      private balance: number;
      private transactionHistory: string[] = [];
      private static nextAccountNumber: number = 1000;

      constructor(initialBalance: number, accountType: string = "checking") {
        this.accountNumber = `ACC-${BankAccount.nextAccountNumber++}`;
        this.accountType = accountType;
        this.balance = initialBalance;
        this.addTransaction(`Account opened with $${initialBalance}`);
      }

      // Public interface methods
      public deposit(amount: number): boolean {
        if (this.validateAmount(amount)) {
          this.balance += amount;
          this.addTransaction(`Deposited $${amount}`);
          return true;
        }
        return false;
      }

      public withdraw(amount: number): boolean {
        if (this.validateAmount(amount) && this.hasSufficientFunds(amount)) {
          this.balance -= amount;
          this.addTransaction(`Withdrew $${amount}`);
          return true;
        }
        return false;
      }

      public getBalance(): number {
        return this.balance;
      }

      public getTransactionHistory(): string[] {
        return [...this.transactionHistory]; // Return copy for security
      }

      // Protected methods - accessible to subclasses
      protected addTransaction(description: string): void {
        const timestamp = new Date().toISOString();
        this.transactionHistory.push(`${timestamp}: ${description}`);
      }

      protected getAccountType(): string {
        return this.accountType;
      }

      // Private methods - internal implementation
      private validateAmount(amount: number): boolean {
        return amount > 0 && isFinite(amount);
      }

      private hasSufficientFunds(amount: number): boolean {
        return this.balance >= amount;
      }

      // Static method for account validation
      static isValidAccountNumber(accountNumber: string): boolean {
        return /^ACC-\d{4,}$/.test(accountNumber);
      }
    }

    class SavingsAccount extends BankAccount {
      private interestRate: number;
      private minimumBalance: number = 100;

      constructor(initialBalance: number, interestRate: number = 0.02) {
        super(initialBalance, "savings"); // Call parent constructor
        this.interestRate = interestRate;
      }

      // Override withdraw to enforce minimum balance
      public withdraw(amount: number): boolean {
        if (this.getBalance() - amount >= this.minimumBalance) {
          return super.withdraw(amount);
        }
        return false; // Insufficient funds considering minimum balance
      }

      // Additional functionality for savings accounts
      public addInterest(): void {
        const interest = this.getBalance() * this.interestRate;
        if (interest > 0) {
          // Can access protected method from parent
          this.addTransaction(`Interest earned: $${interest.toFixed(2)}`);
          // But cannot directly access private balance - must use public method
          this.deposit(interest);
        }
      }

      public getMinimumBalance(): number {
        return this.minimumBalance;
      }
    }

    const checking = new BankAccount(500);
    const savings = new SavingsAccount(1000, 0.03);

    // Test public interface
    this.assertEqual(this.___(), checking.getBalance()); // 500
    this.assertEqual(true, checking.deposit(100));
    this.assertEqual(600, checking.getBalance());

    // Test readonly property
    this.assertEqual(this.___(), checking.accountNumber.startsWith("ACC-")); // true
    // checking.accountNumber = "123"; // Would cause compilation error

    // Test access modifier enforcement
    this.assertEqual(this.___(), savings.getBalance()); // 1000
    this.assertEqual(false, savings.withdraw(950)); // Would violate minimum balance
    this.assertEqual(true, savings.withdraw(850)); // Valid withdrawal

    // Test protected method access through public interface
    savings.addInterest();
    this.assertEqual(this.___(), savings.getBalance() > 150); // true (original + interest)

    // Test transaction history (private field accessed through public method)
    const history = checking.getTransactionHistory();
    this.assertEqual(this.___(), history.length >= 2); // true (open + deposit)
    this.assertEqual(this.___(), history[0].includes("opened")); // true

    // Test static methods
    this.assertEqual(
      true,
      BankAccount.isValidAccountNumber(checking.accountNumber)
    );
    this.assertEqual(this.___(), BankAccount.isValidAccountNumber("INVALID")); // false

    // These would cause compilation errors:
    // checking.balance; // private
    // checking.validateAmount(100); // private
    // checking.accountType; // protected (not accessible outside class hierarchy)
  }

  test_static_members_and_class_properties(): void {
    // CONCEPT: Static Members and Class-Level Properties
    //
    // Static members belong to the class itself rather than to instances.
    // They're useful for utility functions, constants, factory methods,
    // and shared data across all instances. Static members can be accessed
    // without creating an instance and provide class-level functionality.
    //
    // Use cases for static members:
    // - Utility functions related to the class
    // - Class constants and configuration
    // - Factory methods for object creation
    // - Singleton patterns and instance counting
    // - Validation and type checking utilities

    class MathUtils {
      // Static constants
      static readonly PI: number = 3.14159265359;
      static readonly E: number = 2.71828182846;

      // Static properties for tracking
      private static calculationCount: number = 0;

      // Instance property for demonstration
      private lastResult: number = 0;

      // Static methods - utility functions
      static circleArea(radius: number): number {
        this.calculationCount++; // Access static property
        return this.PI * radius * radius;
      }

      static circleCircumference(radius: number): number {
        this.calculationCount++;
        return 2 * this.PI * radius;
      }

      static max(...numbers: number[]): number {
        this.calculationCount++;
        return Math.max(...numbers);
      }

      static min(...numbers: number[]): number {
        this.calculationCount++;
        return Math.min(...numbers);
      }

      // Static factory method
      static createCalculator(initialValue: number = 0): MathUtils {
        const calc = new MathUtils();
        calc.lastResult = initialValue;
        return calc;
      }

      // Static getter for private static property
      static getCalculationCount(): number {
        return this.calculationCount;
      }

      static resetCounter(): void {
        this.calculationCount = 0;
      }

      // Instance method for comparison
      add(value: number): number {
        this.lastResult += value;
        return this.lastResult;
      }

      getLastResult(): number {
        return this.lastResult;
      }

      // Static validation method
      static isValidNumber(value: any): value is number {
        return typeof value === "number" && isFinite(value);
      }
    }

    // Using static constants
    this.assertEqual(this.___(), MathUtils.PI > 3.1 && MathUtils.PI < 3.2); // true
    this.assertEqual(this.___(), MathUtils.E > 2.7 && MathUtils.E < 2.8); // true

    // Using static methods without creating instances
    const area = MathUtils.circleArea(5);
    this.assertEqual(this.___(), area > 78 && area < 79); // true (~78.54)

    const maxValue = MathUtils.max(10, 25, 5, 30);
    this.assertEqual(30, maxValue);

    // Tracking static property changes
    const initialCount = MathUtils.getCalculationCount();
    MathUtils.min(1, 2, 3);
    this.assertEqual(
      this.___(),
      MathUtils.getCalculationCount() > initialCount
    ); // true

    // Static factory method
    const calc1 = MathUtils.createCalculator(100);
    const calc2 = MathUtils.createCalculator(200);

    this.assertEqual(100, calc1.getLastResult());
    this.assertEqual(this.___(), calc2.getLastResult()); // 200

    // Instance methods work independently
    calc1.add(50);
    calc2.add(25);

    this.assertEqual(150, calc1.getLastResult());
    this.assertEqual(this.___(), calc2.getLastResult()); // 225

    // Static validation method
    this.assertEqual(true, MathUtils.isValidNumber(42));
    this.assertEqual(this.___(), MathUtils.isValidNumber("not a number")); // false
    this.assertEqual(false, MathUtils.isValidNumber(NaN));

    // Accessing static members through class name (not instances)
    this.assertEqual("number", typeof MathUtils.PI);
    this.assertEqual(this.___(), typeof MathUtils.circleArea); // "function"

    // Static members are shared across all instances
    MathUtils.resetCounter();
    this.assertEqual(0, MathUtils.getCalculationCount());
  }

  test_abstract_classes_and_template_methods(): void {
    // CONCEPT: Abstract Classes and Template Method Pattern
    //
    // Abstract classes define partial implementations that cannot be instantiated
    // directly. They provide a template for subclasses, defining which methods
    // must be implemented (abstract) and which are provided (concrete). This
    // enables the Template Method pattern - a behavioral design pattern where
    // the abstract class defines the algorithm structure and subclasses fill
    // in specific steps.
    //
    // Abstract class benefits:
    // - Enforce implementation contracts
    // - Share common code across related classes
    // - Define algorithm templates with customizable steps
    // - Provide default implementations for some functionality

    abstract class DatabaseConnection {
      protected connectionString: string;
      protected isConnected: boolean = false;

      constructor(connectionString: string) {
        this.connectionString = connectionString;
      }

      // Template method - defines the algorithm
      public connect(): boolean {
        try {
          this.validateConnectionString();
          this.establishConnection();
          this.authenticateConnection();
          this.initializeConnection();
          this.isConnected = true;
          this.onConnectionEstablished();
          return true;
        } catch (error) {
          this.onConnectionError(error as Error);
          return false;
        }
      }

      // Abstract methods - must be implemented by subclasses
      protected abstract establishConnection(): void;
      protected abstract authenticateConnection(): void;
      protected abstract executeQuery(query: string): any;

      // Concrete methods - shared implementation
      protected validateConnectionString(): void {
        if (!this.connectionString || this.connectionString.trim() === "") {
          throw new Error("Invalid connection string");
        }
      }

      protected initializeConnection(): void {
        console.log("Connection initialized");
      }

      protected onConnectionEstablished(): void {
        console.log("Connection established successfully");
      }

      protected onConnectionError(error: Error): void {
        console.error("Connection failed:", error.message);
        this.isConnected = false;
      }

      // Public interface methods
      public isConnectionActive(): boolean {
        return this.isConnected;
      }

      public query(sql: string): any {
        if (!this.isConnected) {
          throw new Error("Not connected to database");
        }
        return this.executeQuery(sql);
      }

      public disconnect(): void {
        this.isConnected = false;
        console.log("Disconnected from database");
      }
    }

    class MySQLConnection extends DatabaseConnection {
      private port: number;

      constructor(host: string, port: number = 3306, database: string) {
        super(`mysql://${host}:${port}/${database}`);
        this.port = port;
      }

      protected establishConnection(): void {
        console.log(`Connecting to MySQL on port ${this.port}`);
        // MySQL-specific connection logic would go here
      }

      protected authenticateConnection(): void {
        console.log("Authenticating with MySQL");
        // MySQL authentication logic
      }

      protected executeQuery(query: string): any {
        console.log(`Executing MySQL query: ${query}`);
        // Return mock result for demonstration
        return { rows: [], affectedRows: 0 };
      }

      // Additional MySQL-specific methods
      public showTables(): string[] {
        return ["users", "products", "orders"];
      }
    }

    class PostgreSQLConnection extends DatabaseConnection {
      private schema: string;

      constructor(host: string, database: string, schema: string = "public") {
        super(`postgresql://${host}/${database}`);
        this.schema = schema;
      }

      protected establishConnection(): void {
        console.log("Connecting to PostgreSQL");
      }

      protected authenticateConnection(): void {
        console.log("Authenticating with PostgreSQL");
      }

      protected executeQuery(query: string): any {
        console.log(
          `Executing PostgreSQL query in schema ${this.schema}: ${query}`
        );
        return { rows: [], rowCount: 0 };
      }

      // PostgreSQL-specific functionality
      public listSchemas(): string[] {
        return ["public", "admin", "reporting"];
      }
    }

    const mysql = new MySQLConnection("localhost", 3306, "testdb");
    const postgres = new PostgreSQLConnection("localhost", "testdb", "public");

    // Template method in action - same algorithm, different implementations
    this.assertEqual(this.___(), mysql.connect()); // true
    this.assertEqual(true, postgres.connect());

    // Verify connection state
    this.assertEqual(true, mysql.isConnectionActive());
    this.assertEqual(this.___(), postgres.isConnectionActive()); // true

    // Polymorphic query execution
    const mysqlResult = mysql.query("SELECT * FROM users");
    const postgresResult = postgres.query("SELECT * FROM users");

    this.assertEqual(this.___(), typeof mysqlResult); // "object"
    this.assertEqual("object", typeof postgresResult);

    // Database-specific methods
    const tables = mysql.showTables();
    const schemas = postgres.listSchemas();

    this.assertEqual(this.___(), tables.includes("users")); // true
    this.assertEqual(3, schemas.length);

    // Abstract class cannot be instantiated
    // const db = new DatabaseConnection('test'); // Compilation error

    // Inheritance verification
    this.assertEqual(true, mysql instanceof MySQLConnection);
    this.assertEqual(this.___(), mysql instanceof DatabaseConnection); // true
    this.assertEqual(true, postgres instanceof PostgreSQLConnection);
    this.assertEqual(this.___(), postgres instanceof DatabaseConnection); // true
  }

  test_getters_setters_and_computed_properties(): void {
    // CONCEPT: Getters, Setters, and Computed Properties
    //
    // Getters and setters provide controlled access to object properties,
    // enabling data validation, computed values, and encapsulation. They
    // look like properties but execute code when accessed or modified.
    // This allows for reactive data, validation logic, and derived values
    // while maintaining a clean interface.
    //
    // Use cases:
    // - Data validation and transformation
    // - Computed/derived properties
    // - Property access logging and debugging
    // - Lazy evaluation and caching
    // - Legacy API compatibility

    class Rectangle {
      private _width: number = 0;
      private _height: number = 0;
      private _cachedArea: number | null = null;

      constructor(width: number, height: number) {
        this.width = width; // Use setter for validation
        this.height = height;
      }

      // Getter with validation and caching
      get width(): number {
        return this._width;
      }

      // Setter with validation and cache invalidation
      set width(value: number) {
        if (value < 0) {
          throw new Error("Width cannot be negative");
        }
        this._width = value;
        this._cachedArea = null; // Invalidate cache
      }

      get height(): number {
        return this._height;
      }

      set height(value: number) {
        if (value < 0) {
          throw new Error("Height cannot be negative");
        }
        this._height = value;
        this._cachedArea = null; // Invalidate cache
      }

      // Computed property with caching
      get area(): number {
        if (this._cachedArea === null) {
          this._cachedArea = this._width * this._height;
          console.log("Area calculated");
        }
        return this._cachedArea;
      }

      // Read-only computed property
      get perimeter(): number {
        return 2 * (this._width + this._height);
      }

      // Computed property with more complex logic
      get aspectRatio(): number {
        if (this._height === 0) return 0;
        return this._width / this._height;
      }

      get orientation(): "square" | "landscape" | "portrait" {
        if (this._width === this._height) return "square";
        return this._width > this._height ? "landscape" : "portrait";
      }

      // Method using computed properties
      scale(factor: number): void {
        this.width *= factor; // Uses setters
        this.height *= factor;
      }

      // Factory method using getters/setters
      static createSquare(side: number): Rectangle {
        return new Rectangle(side, side);
      }
    }

    class Temperature {
      private _celsius: number = 0;

      constructor(celsius: number = 0) {
        this.celsius = celsius;
      }

      get celsius(): number {
        return this._celsius;
      }

      set celsius(value: number) {
        if (value < -273.15) {
          throw new Error("Temperature cannot be below absolute zero");
        }
        this._celsius = value;
      }

      // Computed temperature conversions
      get fahrenheit(): number {
        return (this._celsius * 9) / 5 + 32;
      }

      set fahrenheit(value: number) {
        this.celsius = ((value - 32) * 5) / 9;
      }

      get kelvin(): number {
        return this._celsius + 273.15;
      }

      set kelvin(value: number) {
        this.celsius = value - 273.15;
      }

      // Computed descriptive properties
      get state(): "frozen" | "liquid" | "gas" {
        if (this._celsius <= 0) return "frozen";
        if (this._celsius >= 100) return "gas";
        return "liquid";
      }

      get isComfortable(): boolean {
        return this._celsius >= 18 && this._celsius <= 24;
      }
    }

    // Rectangle tests
    const rect = new Rectangle(10, 5);

    this.assertEqual(10, rect.width);
    this.assertEqual(this.___(), rect.height); // 5

    // Computed properties
    this.assertEqual(50, rect.area);
    this.assertEqual(this.___(), rect.perimeter); // 30
    this.assertEqual(2, rect.aspectRatio);
    this.assertEqual(this.___(), rect.orientation); // "landscape"

    // Setter validation
    rect.width = 15;
    this.assertEqual(15, rect.width);
    this.assertEqual(this.___(), rect.area); // 75 (recalculated)

    // Square creation
    const square = Rectangle.createSquare(8);
    this.assertEqual(8, square.width);
    this.assertEqual(this.___(), square.height); // 8
    this.assertEqual("square", square.orientation);

    // Scaling
    square.scale(2);
    this.assertEqual(16, square.width);
    this.assertEqual(this.___(), square.area); // 256

    // Temperature tests
    const temp = new Temperature(25);

    this.assertEqual(25, temp.celsius);
    this.assertEqual(this.___(), temp.fahrenheit); // 77
    this.assertEqual(this.___(), temp.kelvin > 298 && temp.kelvin < 299); // true (~298.15)

    // Temperature conversion through setters
    temp.fahrenheit = 68;
    this.assertEqual(this.___(), temp.celsius === 20); // true
    this.assertEqual(true, temp.isComfortable);

    temp.kelvin = 373.15;
    this.assertEqual(100, temp.celsius);
    this.assertEqual(this.___(), temp.state); // "gas"

    // Validation in setters
    try {
      temp.celsius = -300; // Below absolute zero
      this.assertEqual("should not reach", "this point"); // Should not execute
    } catch (error) {
      this.assertEqual(
        this.___(),
        (error as Error).message.includes("absolute zero")
      ); // true
    }

    // State computation
    temp.celsius = -5;
    this.assertEqual("frozen", temp.state);
    this.assertEqual(this.___(), temp.isComfortable); // false
  }

  test_class_mixins_and_composition(): void {
    // CONCEPT: Mixins and Composition Patterns
    //
    // While TypeScript classes support single inheritance, mixins allow
    // combining multiple behaviors into a single class. Composition is often
    // preferred over inheritance for flexibility. Mixins are implemented
    // using functions that return classes, enabling multiple inheritance-like
    // behavior while maintaining type safety.
    //
    // Benefits of mixins:
    // - Multiple behavior composition
    // - Code reuse across unrelated hierarchies
    // - Flexible trait-based programming
    // - Avoiding diamond inheritance problems

    // Base class
    class Vehicle {
      constructor(public brand: string, public model: string) {}

      getInfo(): string {
        return `${this.brand} ${this.model}`;
      }
    }

    // Mixin function type
    type Constructor<T = {}> = new (...args: any[]) => T;

    // Flyable mixin
    function Flyable<TBase extends Constructor<Vehicle>>(Base: TBase) {
      return class extends Base {
        private altitude: number = 0;

        takeOff(): string {
          this.altitude = 1000;
          return `${this.getInfo()} is taking off`;
        }

        land(): string {
          this.altitude = 0;
          return `${this.getInfo()} is landing`;
        }

        getAltitude(): number {
          return this.altitude;
        }
      };
    }

    // Drivable mixin
    function Drivable<TBase extends Constructor<Vehicle>>(Base: TBase) {
      return class extends Base {
        private speed: number = 0;
        private gear: number = 1;

        accelerate(increment: number): string {
          this.speed += increment;
          return `${this.getInfo()} accelerating to ${this.speed} mph`;
        }

        brake(decrement: number): string {
          this.speed = Math.max(0, this.speed - decrement);
          return `${this.getInfo()} slowing to ${this.speed} mph`;
        }

        shiftGear(gear: number): void {
          this.gear = gear;
        }

        getSpeed(): number {
          return this.speed;
        }
      };
    }

    // Submersible mixin
    function Submersible<TBase extends Constructor<Vehicle>>(Base: TBase) {
      return class extends Base {
        private depth: number = 0;

        dive(meters: number): string {
          this.depth += meters;
          return `${this.getInfo()} diving to ${this.depth}m depth`;
        }

        surface(): string {
          this.depth = 0;
          return `${this.getInfo()} surfacing`;
        }

        getDepth(): number {
          return this.depth;
        }
      };
    }

    // Create specialized vehicle classes using mixins
    class Airplane extends Flyable(Vehicle) {
      constructor(
        brand: string,
        model: string,
        public passengerCapacity: number
      ) {
        super(brand, model);
      }
    }

    class Car extends Drivable(Vehicle) {
      constructor(brand: string, model: string, public doors: number) {
        super(brand, model);
      }
    }

    // Flying car - combines multiple mixins
    class FlyingCar extends Flyable(Drivable(Vehicle)) {
      constructor(brand: string, model: string) {
        super(brand, model);
      }

      // Can use both flying and driving capabilities
      switchToFlightMode(): string {
        return `${this.getInfo()} switching to flight mode`;
      }
    }

    // Submarine - uses submersible mixin
    class Submarine extends Submersible(Vehicle) {
      constructor(brand: string, model: string, public crewSize: number) {
        super(brand, model);
      }
    }

    // Amphibious vehicle - combines driving and submersible
    class AmphibiousVehicle extends Submersible(Drivable(Vehicle)) {
      constructor(brand: string, model: string) {
        super(brand, model);
      }
    }

    // Test individual vehicles
    const plane = new Airplane("Boeing", "747", 400);
    const car = new Car("Toyota", "Camry", 4);
    const flyingCar = new FlyingCar("Future Motors", "AeroX");
    const sub = new Submarine("Naval Systems", "Deep Sea", 20);
    const amphibious = new AmphibiousVehicle("Marine Corp", "Amphi-1");

    // Test airplane (flyable)
    this.assertEqual(this.___(), plane.getInfo()); // "Boeing 747"
    plane.takeOff();
    this.assertEqual(1000, plane.getAltitude());

    // Test car (drivable)
    car.accelerate(60);
    this.assertEqual(this.___(), car.getSpeed()); // 60
    car.brake(20);
    this.assertEqual(40, car.getSpeed());

    // Test flying car (both flyable and drivable)
    flyingCar.accelerate(100);
    flyingCar.takeOff();
    this.assertEqual(100, flyingCar.getSpeed());
    this.assertEqual(this.___(), flyingCar.getAltitude()); // 1000

    // Test submarine (submersible)
    sub.dive(50);
    this.assertEqual(this.___(), sub.getDepth()); // 50
    sub.surface();
    this.assertEqual(0, sub.getDepth());

    // Test amphibious vehicle (drivable and submersible)
    amphibious.accelerate(30);
    amphibious.dive(10);
    this.assertEqual(30, amphibious.getSpeed());
    this.assertEqual(this.___(), amphibious.getDepth()); // 10

    // Type checking - instances have all mixed-in methods
    this.assertEqual("function", typeof plane.takeOff);
    this.assertEqual(this.___(), typeof car.accelerate); // "function"
    this.assertEqual("function", typeof flyingCar.takeOff);
    this.assertEqual(this.___(), typeof flyingCar.accelerate); // "function"
    this.assertEqual("function", typeof sub.dive);
    this.assertEqual(this.___(), typeof amphibious.dive); // "function"
    this.assertEqual("function", typeof amphibious.accelerate);

    // Inheritance chain verification
    this.assertEqual(true, plane instanceof Vehicle);
    this.assertEqual(this.___(), car instanceof Vehicle); // true
    this.assertEqual(true, flyingCar instanceof Vehicle);
    this.assertEqual(this.___(), sub instanceof Vehicle); // true

    // Mixin methods are properly bound
    const takeOffMethod = plane.takeOff;
    // takeOffMethod(); // Would work if properly bound, but context is important

    this.assertEqual(this.___(), plane.passengerCapacity); // 400
    this.assertEqual(4, car.doors);
    this.assertEqual(20, sub.crewSize);
  }
}
