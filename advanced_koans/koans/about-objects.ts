import { Koan } from "./koan";

export class AboutObjects extends Koan {
  constructor() {
    super("AboutObjects", "about-objects.ts");
  }

  /**
   * Object Fundamentals and Creation Patterns
   *
   * Objects are the foundation of JavaScript and TypeScript, serving as containers
   * for data and behavior. Understanding different creation patterns and property
   * access methods is crucial for effective programming.
   *
   * Key Concepts:
   * - Object literal syntax and property definition
   * - Dynamic property names and computed properties
   * - Property access patterns (dot vs bracket notation)
   * - Object creation patterns and constructor functions
   * - Property descriptors and meta-programming
   *
   * Modern patterns:
   * - Object.create() for prototype-based inheritance
   * - Factory functions and object builders
   * - Property shorthand and method definitions
   * - Symbol properties for unique keys
   * - WeakMap and WeakSet for memory management
   */
  test_object_fundamentals_and_creation(): void {
    // Basic object creation and property access
    const person = {
      name: "Alice",
      age: 30,
      city: "New York",
      "special-key": "value with spaces", // Keys with special characters need quotes
      123: "numeric key", // Numeric keys are converted to strings
    };

    this.assertEqual(this.___(), person.name);
    this.assertEqual(this.___(), person.age);
    this.assertEqual(this.___(), person.city);
    this.assertEqual(this.___(), person["special-key"]);
    this.assertEqual(this.___(), person[123]); // Accessing numeric key

    // Dynamic property access
    const propertyName = "age";
    const dynamicAccess = person[propertyName];
    this.assertEqual(this.___(), dynamicAccess);

    // Computed property names (ES6+)
    const prefix = "user";
    const dynamicObject = {
      [prefix + "Name"]: "Bob",
      [prefix + "Age"]: 25,
      [`${prefix}_email`]: "bob@example.com",
    };

    this.assertEqual(this.___(), dynamicObject.userName);
    this.assertEqual(this.___(), dynamicObject.userAge);
    this.assertEqual(this.___(), dynamicObject.user_email);

    // Property shorthand (when variable name matches property name)
    const name = "Charlie";
    const age = 35;
    const shorthandObject = { name, age, city: "Boston" }; // name: name, age: age

    this.assertEqual(this.___(), shorthandObject.name);
    this.assertEqual(this.___(), shorthandObject.age);
    this.assertEqual(this.___(), shorthandObject.city);

    // Method definitions (ES6+ syntax)
    const calculator = {
      value: 0,
      add(num: number) {
        // Method definition syntax
        this.value += num;
        return this;
      },
      multiply: function (num: number) {
        // Traditional function syntax
        this.value *= num;
        return this;
      },
      getValue: () => {
        // Arrow function (lexical this)
        // Note: Arrow functions don't have their own 'this'
        return "Cannot access this.value in arrow function";
      },
    };

    calculator.add(10).multiply(2);
    this.assertEqual(this.___(), calculator.value);
    this.assertEqual(
      "Cannot access this.value in arrow function",
      calculator.getValue()
    );

    // Symbol properties (unique keys)
    const sym1 = Symbol("description");
    const sym2 = Symbol("description"); // Different symbol even with same description
    const symbolObject = {
      [sym1]: "symbol value 1",
      [sym2]: "symbol value 2",
      regularProperty: "regular value",
    };

    this.assertEqual(this.___(), symbolObject[sym1]);
    this.assertEqual(this.___(), symbolObject[sym2]);

    // Symbols are always unique, even with same description
    const symbolsAreUnique =
      sym1.toString() === sym2.toString() &&
      symbolObject[sym1] !== symbolObject[sym2];
    this.assertEqual(this.___(), symbolsAreUnique);

    // Object.create() for prototype-based creation
    const prototypeObject = {
      greet() {
        return `Hello, I'm ${(this as any).name}`;
      },
    };

    const createdObject = Object.create(prototypeObject);
    createdObject.name = "Dave";

    this.assertEqual(this.___(), createdObject.greet());
    this.assertEqual(true, prototypeObject.isPrototypeOf(createdObject));
  }

  /**
   * Object Methods and 'this' Context
   *
   * Understanding the 'this' keyword and method binding is crucial for object-oriented
   * programming in JavaScript and TypeScript. Different function types have different
   * 'this' binding behaviors, which affects how objects interact with their methods.
   *
   * Key Concepts:
   * - Method definitions and 'this' binding
   * - Arrow functions and lexical 'this'
   * - Function binding and call/apply/bind methods
   * - Method chaining and fluent interfaces
   * - Context loss and preservation techniques
   *
   * Advanced patterns:
   * - Mixins and method borrowing
   * - Higher-order functions with objects
   * - Method decorators and meta-programming
   * - Prototype methods vs instance methods
   * - Memory optimization techniques
   */
  test_object_methods_and_this_context(): void {
    // Basic methods and 'this' context
    interface Calculator {
      result: number;
      add(value: number): number;
      multiply(value: number): Calculator;
      reset(): void;
      getValue(): number;
    }

    const calculator: Calculator = {
      result: 0,
      add(value: number): number {
        this.result += value;
        return this.result;
      },
      multiply(value: number): Calculator {
        this.result *= value;
        return this; // Return 'this' for method chaining
      },
      reset(): void {
        this.result = 0;
      },
      getValue(): number {
        return this.result;
      },
    };

    this.assertEqual(this.___(), calculator.add(5));
    calculator.multiply(3);
    this.assertEqual(this.___(), calculator.result);
    calculator.reset();
    this.assertEqual(this.___(), calculator.result);

    // Method chaining - need to reset first
    calculator.reset();
    calculator.add(10);
    const chainResult = calculator.multiply(2).multiply(3);
    this.assertEqual(this.___(), chainResult.getValue());

    // Context loss and preservation
    const counter = {
      count: 0,
      increment() {
        this.count++;
        return this.count;
      },
      incrementAsync() {
        // Arrow function preserves 'this' context
        return new Promise((resolve) => {
          setTimeout(() => {
            this.count++;
            resolve(this.count);
          }, 0);
        });
      },
      // Traditional function loses 'this' context in async operations
      incrementAsyncTraditional() {
        const self = this; // Common pattern to preserve context
        return new Promise((resolve) => {
          setTimeout(function () {
            self.count++;
            resolve(self.count);
          }, 0);
        });
      },
    };

    this.assertEqual(this.___(), counter.increment());
    this.assertEqual(2, counter.increment());

    // Call, apply, and bind methods
    const obj1 = { value: 10 };
    const obj2 = { value: 20 };

    function multiplyBy(
      this: { value: number },
      multiplier: number,
      addend: number = 0
    ): number {
      return this.value * multiplier + addend;
    }

    // call() - invoke with specific 'this' and individual arguments
    const result1 = multiplyBy.call(obj1, 2, 5); // (10 * 2) + 5
    const result2 = multiplyBy.call(obj2, 3, 1); // (20 * 3) + 1

    this.assertEqual(this.___(), result1);
    this.assertEqual(this.___(), result2);

    // apply() - invoke with specific 'this' and arguments array
    const result3 = multiplyBy.apply(obj1, [4, 2]); // (10 * 4) + 2
    this.assertEqual(this.___(), result3);

    // bind() - create new function with bound 'this'
    const boundFunction = multiplyBy.bind(obj2, 2); // Partially applied
    const result4 = boundFunction(10); // (20 * 2) + 10
    this.assertEqual(this.___(), result4);

    // Advanced: Method borrowing
    const arrayLike = {
      0: "a",
      1: "b",
      2: "c",
      length: 3,
    };

    // Borrow Array methods
    const joined = Array.prototype.join.call(arrayLike, "-");
    const mapped = Array.prototype.map.call(arrayLike, (x: string) =>
      x.toUpperCase()
    );

    this.assertEqual(this.___(), joined);
    this.assertEqual(["A", "B", "C"], mapped);

    // Fluent interface pattern
    class FluentCalculator {
      private value = 0;

      add(num: number): this {
        this.value += num;
        return this;
      }

      subtract(num: number): this {
        this.value -= num;
        return this;
      }

      multiply(num: number): this {
        this.value *= num;
        return this;
      }

      divide(num: number): this {
        this.value /= num;
        return this;
      }

      result(): number {
        return this.value;
      }
    }

    const fluentResult = new FluentCalculator()
      .add(10)
      .multiply(2)
      .subtract(5)
      .divide(3)
      .result();

    this.assertEqual(this.___(), Math.round(fluentResult));
  }

  /**
   * Object Destructuring and Advanced Property Access
   *
   * Destructuring is a powerful feature that allows extracting multiple properties
   * from objects in a single statement. It supports renaming, default values, and
   * nested destructuring, making it essential for modern JavaScript development.
   *
   * Key Concepts:
   * - Basic destructuring assignment
   * - Property renaming during destructuring
   * - Default values for missing properties
   * - Nested destructuring for complex objects
   * - Rest operator (...) for collecting remaining properties
   *
   * Advanced patterns:
   * - Function parameter destructuring
   * - Array destructuring vs object destructuring
   * - Destructuring in loops and iterations
   * - Computed property destructuring
   * - Mixed destructuring patterns
   */
  test_object_destructuring_and_advanced_access(): void {
    const book = {
      title: "TypeScript Handbook",
      author: "Microsoft",
      pages: 200,
      year: 2023,
      publisher: {
        name: "Microsoft Press",
        location: "Redmond, WA",
      },
      reviews: [
        { rating: 5, comment: "Excellent!" },
        { rating: 4, comment: "Very helpful" },
      ],
    };

    // Basic destructuring
    const { title, author } = book;
    const { pages: pageCount } = book; // Rename during destructuring

    this.assertEqual(this.___(), title);
    this.assertEqual(this.___(), author);
    this.assertEqual(this.___(), pageCount);

    // Default values for missing properties (using type assertion for demonstration)
    const bookWithOptionals = book as typeof book & {
      isbn?: string;
      edition?: number;
      language?: string;
    };
    const {
      isbn = "Not available",
      edition = 1,
      language = "English",
    } = bookWithOptionals;

    this.assertEqual(this.___(), isbn);
    this.assertEqual(this.___(), edition);
    this.assertEqual(this.___(), language);

    // Nested destructuring
    const {
      publisher: { name: publisherName, location: publisherLocation },
      reviews: [firstReview, secondReview],
    } = book;

    this.assertEqual(this.___(), publisherName);
    this.assertEqual(this.___(), publisherLocation);
    this.assertEqual(this.___(), firstReview.rating);
    this.assertEqual(this.___(), secondReview.comment);

    // Rest operator to collect remaining properties
    const { title: bookTitle, author: bookAuthor, ...otherProperties } = book;

    this.assertEqual(this.___(), bookTitle);
    this.assertEqual(this.___(), Object.keys(otherProperties).length);
    this.assertEqual(this.___(), "pages" in otherProperties);
    this.assertEqual(this.___(), "title" in otherProperties);

    // Destructuring in function parameters
    function displayBook({
      title,
      author,
      pages = 0,
    }: {
      title: string;
      author: string;
      pages?: number;
    }): string {
      return `"${title}" by ${author} (${pages} pages)`;
    }

    const bookDescription = displayBook(book);
    this.assertEqual(this.___(), bookDescription);

    // Destructuring with computed properties
    const propertyName = "year";
    const { [propertyName]: publicationYear } = book;

    this.assertEqual(this.___(), publicationYear);

    // Advanced: Swapping variables with destructuring
    let a = 1;
    let b = 2;
    [a, b] = [b, a]; // Array destructuring for swapping

    this.assertEqual(this.___(), a);
    this.assertEqual(this.___(), b);

    // Destructuring in loops
    const employees = [
      { name: "Alice", role: "Developer", salary: 75000 },
      { name: "Bob", role: "Designer", salary: 65000 },
      { name: "Charlie", role: "Manager", salary: 85000 },
    ];

    const roles: string[] = [];
    for (const { name, role } of employees) {
      roles.push(`${name}: ${role}`);
    }

    this.assertEqual(this.___(), roles.length);
    this.assertEqual(this.___(), roles[0]);
    this.assertEqual(this.___(), roles[2]);

    // Mixed destructuring with arrays and objects
    const complexData = {
      metadata: {
        version: "1.0",
        tags: ["important", "draft", "review"],
      },
      content: [
        { type: "heading", text: "Introduction" },
        { type: "paragraph", text: "This is the content..." },
      ],
    };

    const {
      metadata: {
        version,
        tags: [firstTag, ...remainingTags],
      },
      content: [{ text: headingText }, ...restContent],
    } = complexData;

    this.assertEqual(this.___(), version);
    this.assertEqual(this.___(), firstTag);
    this.assertEqual(this.___(), remainingTags.length);
    this.assertEqual(this.___(), headingText);
    this.assertEqual(this.___(), restContent.length);
  }

  /**
   * Object Iteration, Inspection, and Manipulation
   *
   * Modern JavaScript provides powerful methods for working with object properties,
   * iteration patterns, and data transformation. Understanding these methods is
   * essential for effective data processing and object manipulation.
   *
   * Key Concepts:
   * - Object.keys(), Object.values(), Object.entries() for iteration
   * - Object.fromEntries() for constructing objects from key-value pairs
   * - Object.assign() for object merging and cloning
   * - Property enumeration and for...in loops
   * - Object.hasOwnProperty() and property ownership
   *
   * Advanced patterns:
   * - Object transformation pipelines
   * - Dynamic property manipulation
   * - Object filtering and mapping
   * - Property descriptor manipulation
   * - Proxy objects for advanced meta-programming
   */
  test_object_iteration_and_manipulation(): void {
    const company = {
      name: "TechCorp",
      founded: 2010,
      address: {
        street: "123 Main St",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
      },
      employees: 150,
      departments: ["Engineering", "Sales", "Marketing"],
      isPublic: true,
    };

    // Basic object inspection methods
    const keys = Object.keys(company);
    const values = Object.values(company);
    const entries = Object.entries(company);

    this.assertEqual(this.___(), company.name);
    this.assertEqual(this.___(), company.address.city);
    this.assertEqual(this.___(), company.address.state);

    this.assertEqual(this.___(), keys.length);
    this.assertEqual(this.___(), keys.includes("employees"));
    this.assertEqual(true, keys.includes("address"));
    this.assertEqual(this.___(), keys.includes("revenue")); // Not present

    this.assertEqual(this.___(), values.length);
    this.assertEqual(this.___(), values.includes("TechCorp"));
    this.assertEqual(true, values.includes(150));

    this.assertEqual(this.___(), entries.length);
    this.assertEqual(this.___(), entries[0][0]); // First entry key
    this.assertEqual(this.___(), entries[0][1]); // First entry value

    // Object.fromEntries() - construct object from key-value pairs
    const transformedEntries = entries
      .filter(([key, value]) => typeof value !== "object")
      .map(([key, value]) => [key.toUpperCase(), value]);

    const transformedObject = Object.fromEntries(transformedEntries);

    this.assertEqual(this.___(), transformedObject.NAME);
    this.assertEqual(this.___(), transformedObject.FOUNDED);
    this.assertEqual(this.___(), transformedObject.EMPLOYEES);
    this.assertEqual(this.___(), "ADDRESS" in transformedObject); // Object filtered out

    // Object.assign() for merging and cloning
    const originalSettings = { theme: "dark", language: "en", autoSave: true };
    const userPreferences = { theme: "light", fontSize: 14 };
    const defaultPreferences = { autoSave: false, notifications: true };

    // Merging objects (right-most properties win)
    const finalSettings = Object.assign(
      {},
      defaultPreferences,
      originalSettings,
      userPreferences
    );

    this.assertEqual(this.___(), finalSettings.theme); // userPreferences wins
    this.assertEqual(this.___(), finalSettings.language); // from originalSettings
    this.assertEqual(this.___(), finalSettings.autoSave); // originalSettings wins over default
    this.assertEqual(this.___(), finalSettings.notifications); // from defaultPreferences
    this.assertEqual(this.___(), finalSettings.fontSize); // from userPreferences

    // Shallow cloning with Object.assign
    const original = { a: 1, b: { c: 2 } };
    const cloned = Object.assign({}, original);

    cloned.a = 10;
    cloned.b.c = 20; // Modifies original's nested object (shallow clone!)

    this.assertEqual(this.___(), original.a); // Original unchanged
    this.assertEqual(this.___(), original.b.c); // Original changed (shallow!)
    this.assertEqual(this.___(), cloned.a);
    this.assertEqual(this.___(), cloned.b.c);

    // For...in loop and property enumeration
    const colors = {
      red: "#FF0000",
      green: "#00FF00",
      blue: "#0000FF",
    };

    const colorNames: string[] = [];
    const colorValues: string[] = [];

    for (const colorName in colors) {
      if (colors.hasOwnProperty(colorName)) {
        // Check own properties
        colorNames.push(colorName);
        colorValues.push(colors[colorName as keyof typeof colors]);
      }
    }

    this.assertEqual(this.___(), colorNames.length);
    this.assertEqual(true, colorNames.includes("red"));
    this.assertEqual(this.___(), colorNames.includes("yellow"));
    this.assertEqual(this.___(), colorValues[0]);
    this.assertEqual(this.___(), colorValues.includes("#00FF00"));

    // Object filtering and transformation
    const employees = {
      alice: { department: "Engineering", salary: 75000, years: 3 },
      bob: { department: "Sales", salary: 65000, years: 5 },
      charlie: { department: "Engineering", salary: 85000, years: 7 },
      diana: { department: "Marketing", salary: 60000, years: 2 },
    };

    // Filter employees by department
    const engineeringEmployees = Object.fromEntries(
      Object.entries(employees).filter(
        ([name, info]) => info.department === "Engineering"
      )
    );

    this.assertEqual(2, Object.keys(engineeringEmployees).length);
    this.assertEqual(this.___(), "alice" in engineeringEmployees);
    this.assertEqual(this.___(), "charlie" in engineeringEmployees);
    this.assertEqual(this.___(), "bob" in engineeringEmployees);

    // Transform object values
    const salaryBonuses = Object.fromEntries(
      Object.entries(employees).map(([name, info]) => [
        name,
        info.salary * (info.years >= 5 ? 0.1 : 0.05),
      ])
    );

    this.assertEqual(this.___(), Math.round(salaryBonuses.alice)); // 3 years, 5% bonus
    this.assertEqual(this.___(), salaryBonuses.bob); // 5 years, 10% bonus
    this.assertEqual(this.___(), salaryBonuses.charlie); // 7 years, 10% bonus
    this.assertEqual(this.___(), salaryBonuses.diana); // 2 years, 5% bonus
  }

  /**
   * Object Spread, Immutability, and Advanced Patterns
   *
   * The spread operator and object immutability are fundamental concepts in
   * functional programming and modern JavaScript development. These patterns
   * help create more predictable code and avoid common pitfalls with object mutation.
   *
   * Key Concepts:
   * - Spread operator for object cloning and merging
   * - Object.freeze() for immutability
   * - Deep vs shallow freezing/cloning
   * - Immutable update patterns
   * - Object sealing and property descriptors
   *
   * Advanced patterns:
   * - Nested object updates without mutation
   * - Functional programming with objects
   * - Object factories and builders
   * - Proxy objects for custom behavior
   * - WeakMap and WeakSet for memory management
   */
  test_object_spread_immutability_and_patterns(): void {
    // Basic spread operator usage
    const original = { a: 1, b: 2 };
    const extended = { ...original, c: 3, d: 4 };
    const overridden = { ...original, b: 20, c: 30 };

    this.assertEqual(this.___(), Object.keys(extended).length);
    this.assertEqual(this.___(), extended.a);
    this.assertEqual(this.___(), extended.c);

    this.assertEqual(this.___(), overridden.a);
    this.assertEqual(this.___(), overridden.b); // Overridden value
    this.assertEqual(this.___(), overridden.c);

    // Advanced spread patterns
    const defaults = { color: "blue", size: "medium", enabled: true };
    const userSettings = { color: "red", fontSize: 14 };
    const systemSettings = { performance: "high", enabled: false };

    const finalConfig = { ...defaults, ...userSettings, ...systemSettings };

    this.assertEqual(this.___(), finalConfig.color); // userSettings wins
    this.assertEqual(this.___(), finalConfig.size); // from defaults
    this.assertEqual(this.___(), finalConfig.enabled); // systemSettings wins
    this.assertEqual(this.___(), finalConfig.fontSize); // from userSettings

    // Object immutability with Object.freeze()
    const mutable = { value: 10, nested: { count: 5 } };
    const frozen = Object.freeze({ value: 20, nested: { count: 10 } });

    mutable.value = 15;
    this.assertEqual(this.___(), mutable.value);

    // Attempting to modify frozen object (fails silently in non-strict mode)
    try {
      (frozen as any).value = 25;
      (frozen as any).newProperty = "test";
    } catch (e) {
      // Expected in strict mode
    }

    this.assertEqual(this.___(), frozen.value); // Unchanged
    this.assertEqual(this.___(), "newProperty" in frozen); // Property not added

    // Shallow freeze - nested objects are still mutable
    frozen.nested.count = 15; // This will work - shallow freeze!
    this.assertEqual(this.___(), frozen.nested.count);

    // Deep freeze implementation
    function deepFreeze<T>(obj: T): T {
      Object.getOwnPropertyNames(obj).forEach((prop) => {
        const value = (obj as any)[prop];
        if (value && typeof value === "object") {
          deepFreeze(value);
        }
      });
      return Object.freeze(obj);
    }

    const deepFrozen = deepFreeze({
      level1: {
        level2: {
          value: 100,
        },
      },
    });

    try {
      (deepFrozen.level1.level2 as any).value = 200;
    } catch (e) {
      // Expected - deep freeze prevents modification
    }

    this.assertEqual(this.___(), deepFrozen.level1.level2.value);

    // Immutable update patterns
    const state = {
      user: { name: "Alice", preferences: { theme: "dark" } },
      settings: { autoSave: true },
      data: [1, 2, 3],
    };

    // Update nested property immutably
    const updatedState = {
      ...state,
      user: {
        ...state.user,
        preferences: {
          ...state.user.preferences,
          theme: "light",
        },
      },
    };

    this.assertEqual(this.___(), state.user.name); // Original unchanged
    this.assertEqual(this.___(), state.user.preferences.theme); // Original unchanged
    this.assertEqual(this.___(), updatedState.user.name); // Same name
    this.assertEqual(this.___(), updatedState.user.preferences.theme); // Updated

    // Object.seal() - allows modification but prevents addition/deletion
    const sealedObject = Object.seal({ a: 1, b: 2 });

    sealedObject.a = 10; // Allowed
    try {
      (sealedObject as any).c = 3; // Not allowed
      delete (sealedObject as any).b; // Not allowed
    } catch (e) {
      // Expected in strict mode
    }

    this.assertEqual(this.___(), sealedObject.a); // Modified
    this.assertEqual(this.___(), sealedObject.b); // Not deleted
    this.assertEqual(this.___(), "c" in sealedObject); // Not added

    // Object factory pattern
    function createUser(name: string, email: string) {
      return {
        name,
        email,
        createdAt: new Date().toISOString(),
        getId: () => `${name.toLowerCase()}-${Date.now()}`,
        updateEmail: function (newEmail: string) {
          return createUser(this.name, newEmail); // Returns new object
        },
      };
    }

    const user1 = createUser("Alice", "alice@example.com");
    const user2 = user1.updateEmail("alice.smith@example.com");

    this.assertEqual(this.___(), user1.name);
    this.assertEqual(this.___(), user1.email);
    this.assertEqual(this.___(), user2.name);
    this.assertEqual(this.___(), user2.email);
    this.assertEqual(true, user1.getId() !== user2.getId()); // Different objects

    // WeakMap for private data
    const privateData = new WeakMap();

    class SecureObject {
      constructor(secret: string) {
        privateData.set(this, { secret });
      }

      getSecret(): string {
        const data = privateData.get(this);
        return data ? data.secret : "No access";
      }

      updateSecret(newSecret: string): void {
        const data = privateData.get(this);
        if (data) {
          data.secret = newSecret;
        }
      }
    }

    const secure1 = new SecureObject("top-secret");
    const secure2 = new SecureObject("classified");

    this.assertEqual(this.___(), secure1.getSecret());
    this.assertEqual("classified", secure2.getSecret());

    secure1.updateSecret("updated-secret");
    this.assertEqual(this.___(), secure1.getSecret());
    this.assertEqual("classified", secure2.getSecret()); // Unchanged

    // Proxy for advanced object behavior
    const auditedObject = new Proxy(
      {
        name: "Test",
        value: 42,
      },
      {
        get(target, property) {
          console.log(`Reading property: ${String(property)}`);
          return (target as any)[property];
        },
        set(target, property, value) {
          console.log(`Setting property: ${String(property)} = ${value}`);
          (target as any)[property] = value;
          return true;
        },
      }
    );

    auditedObject.name; // Triggers get trap
    auditedObject.value = 100; // Triggers set trap

    this.assertEqual(this.___(), auditedObject.name);
    this.assertEqual(this.___(), auditedObject.value);
  }
}
