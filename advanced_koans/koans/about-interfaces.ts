import { Koan } from "./koan";

export class AboutInterfaces extends Koan {
  constructor() {
    super("AboutInterfaces", "about-interfaces.ts");
  }

  // CONCEPT: Interfaces - Structural Type System and Contracts
  //
  // Interfaces define the shape of objects using structural typing - if an object
  // has the right structure, it satisfies the interface. This is different from
  // nominal typing where types are matched by name. Interfaces are compile-time
  // constructs that disappear at runtime, serving as contracts for code structure.
  //
  // Key Interface Concepts:
  // - Structural typing: shape matters, not name
  // - Compile-time only: no runtime overhead
  // - Extensibility: interfaces can extend and merge
  // - Flexibility: optional properties, method signatures, index signatures
  // - Implementation contracts: classes can implement interfaces
  //
  // Interface vs Type Aliases:
  // - Interfaces can be merged and extended
  // - Type aliases can represent unions, primitives, computed types
  // - Interfaces are better for object shapes and contracts
  // - Type aliases are better for utility types and complex types
  //
  // Use Cases:
  // - API contracts and data transfer objects
  // - Component props and configuration objects
  // - Plugin architectures and extensible systems
  // - Library and framework interfaces

  test_interface_definition_and_structural_typing(): void {
    // CONCEPT: Interface Definition and Structural Typing
    //
    // TypeScript uses structural typing - if an object has the required properties
    // with correct types, it satisfies the interface regardless of how it was created.
    // This enables duck typing: "If it walks like a duck and quacks like a duck,
    // it's a duck." Optional properties provide flexibility in object creation.

    interface Person {
      name: string;
      age: number;
      email?: string; // Optional property
      readonly id: number; // Cannot be modified after creation
    }

    interface Contact {
      name: string;
      email?: string;
    }

    // Direct object creation
    const alice: Person = {
      id: 1,
      name: "Alice",
      age: 30,
    };

    const bob: Person = {
      id: 2,
      name: "Bob",
      age: 25,
      email: "bob@example.com",
    };

    // Structural typing - objects with extra properties still match
    const employee = {
      id: 3,
      name: "Charlie",
      age: 28,
      email: "charlie@company.com",
      department: "Engineering", // Extra property
      salary: 75000, // Extra property
    };

    const personEmployee: Person = employee; // Valid due to structural typing

    this.assertEqual(this.___(), alice.name); // "Alice"
    this.assertEqual(this.___(), alice.age);
    this.assertEqual(this.___(), alice.email); // undefined

    this.assertEqual(this.___(), bob.name);
    this.assertEqual(this.___(), bob.email); // "bob@example.com"

    // Structural compatibility
    this.assertEqual(this.___(), personEmployee.name);
    this.assertEqual(this.___(), personEmployee.age); // 28

    // Objects can satisfy multiple interfaces if they have the right shape
    const contact: Contact = alice; // Alice satisfies Contact interface too
    this.assertEqual(this.___(), contact.name);

    // Function that accepts any object with Person structure
    function greetPerson(p: Person): string {
      return `Hello, ${p.name} (age ${p.age})`;
    }

    this.assertEqual(this.___(), greetPerson(alice)); // "Hello, Alice (age 30)"
    this.assertEqual("Hello, Charlie (age 28)", greetPerson(employee));

    // Readonly property demonstration
    // alice.id = 999; // Would cause compilation error

    this.assertEqual(this.___(), alice.id);
    this.assertEqual(this.___(), bob.id); // 2
  }

  test_method_signatures_and_callable_interfaces(): void {
    // CONCEPT: Method Signatures and Callable Interfaces
    //
    // Interfaces can define method signatures, creating contracts for behavior.
    // Methods can be defined in multiple ways: method syntax, property syntax,
    // or callable interfaces. This flexibility allows for different implementation
    // styles while maintaining type safety.

    interface Calculator {
      // Method signature syntax
      add(a: number, b: number): number;
      subtract(a: number, b: number): number;

      // Property function syntax (equivalent)
      multiply: (a: number, b: number) => number;

      // Optional method
      divide?(a: number, b: number): number;

      // Method with overloads
      calculate(operation: "add", a: number, b: number): number;
      calculate(operation: "subtract", a: number, b: number): number;
      calculate(operation: string, a: number, b: number): number;
    }

    // Callable interface (function interface)
    interface StringTransformer {
      (input: string): string; // Call signature
      description: string; // Properties on function object
      version: number;
    }

    // Generic interface for functions
    interface Mapper<T, U> {
      (item: T): U;
    }

    const basicCalc: Calculator = {
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
      multiply: (a, b) => a * b,
      divide: (a, b) => (b !== 0 ? a / b : 0),
      calculate(operation: string, a: number, b: number): number {
        switch (operation) {
          case "add":
            return this.add(a, b);
          case "subtract":
            return this.subtract(a, b);
          default:
            return 0;
        }
      },
    };

    this.assertEqual(this.___(), basicCalc.add(5, 3)); // 8
    this.assertEqual(2, basicCalc.subtract(5, 3));
    this.assertEqual(this.___(), basicCalc.multiply(4, 3)); // 12
    this.assertEqual(3, basicCalc.divide!(9, 3)); // Non-null assertion since it's optional

    // Overloaded method
    this.assertEqual(this.___(), basicCalc.calculate("add", 10, 5)); // 15
    this.assertEqual(5, basicCalc.calculate("subtract", 10, 5));

    // Callable interface implementation
    const upperCaseTransformer: StringTransformer = Object.assign(
      (input: string) => input.toUpperCase(),
      { description: "Converts to uppercase", version: 1 }
    );

    this.assertEqual(this.___(), upperCaseTransformer("hello")); // "HELLO"
    this.assertEqual(this.___(), upperCaseTransformer.description);
    this.assertEqual(this.___(), upperCaseTransformer.version); // 1

    // Generic mapper interface
    const numberToString: Mapper<number, string> = (n) => n.toString();
    const stringToLength: Mapper<string, number> = (s) => s.length;

    this.assertEqual("42", numberToString(42));
    this.assertEqual(this.___(), stringToLength("TypeScript")); // 10
  }

  test_interface_inheritance_and_composition(): void {
    // CONCEPT: Interface Inheritance and Composition Patterns
    //
    // Interface inheritance allows building complex contracts from simpler ones.
    // Multiple inheritance is supported, enabling composition of behaviors.
    // This promotes code reuse and creates flexible, hierarchical type systems.

    // Base interfaces
    interface Identifiable {
      id: string;
      createdAt: Date;
    }

    interface Nameable {
      name: string;
      displayName?: string;
    }

    interface Timestamped {
      createdAt: Date;
      updatedAt: Date;
    }

    interface Auditable {
      createdBy: string;
      updatedBy: string;
      version: number;
    }

    // Single inheritance
    interface Person extends Nameable {
      age: number;
      email: string;
    }

    // Multiple inheritance
    interface User extends Identifiable, Nameable, Auditable, Timestamped {
      email: string;
      isActive: boolean;
      permissions: string[];
    }

    // Complex inheritance chain
    interface AdminUser extends User {
      adminLevel: "basic" | "advanced" | "super";
      canAccessAllUsers: boolean;
    }

    // Document interface with composition
    interface Document extends Identifiable, Timestamped, Auditable {
      title: string;
      content: string;
      tags: string[];
      isPublished: boolean;
    }

    const person: Person = {
      name: "Alice Johnson",
      displayName: "Alice",
      age: 30,
      email: "alice@example.com",
    };

    const user: User = {
      id: "user-123",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-15"), // Add missing updatedAt property
      name: "Bob Smith",
      email: "bob@company.com",
      isActive: true,
      permissions: ["read", "write"],
      createdBy: "system",
      updatedBy: "admin",
      version: 1,
    };

    const admin: AdminUser = {
      id: "admin-456",
      createdAt: new Date("2023-06-01"),
      updatedAt: new Date("2023-12-01"),
      name: "Charlie Admin",
      email: "charlie@company.com",
      isActive: true,
      permissions: ["read", "write", "delete", "admin"],
      createdBy: "super-admin",
      updatedBy: "super-admin",
      version: 3,
      adminLevel: "advanced",
      canAccessAllUsers: true,
    };

    this.assertEqual(this.___(), person.name); // "Alice Johnson"
    this.assertEqual(this.___(), person.displayName);
    this.assertEqual(this.___(), person.age); // 30

    this.assertEqual(this.___(), user.id);
    this.assertEqual(this.___(), user.permissions.length); // 2
    this.assertEqual(this.___(), user.isActive);

    this.assertEqual(this.___(), admin.adminLevel);
    this.assertEqual(this.___(), admin.canAccessAllUsers); // true
    this.assertEqual(this.___(), admin.permissions.length);

    // Document example
    const doc: Document = {
      id: "doc-789",
      createdAt: new Date("2024-02-01"),
      updatedAt: new Date("2024-02-15"),
      title: "TypeScript Interfaces Guide",
      content: "A comprehensive guide...",
      tags: ["typescript", "programming", "tutorial"],
      isPublished: true,
      createdBy: "author-123",
      updatedBy: "editor-456",
      version: 2,
    };

    this.assertEqual(this.___(), doc.title);
    this.assertEqual(this.___(), doc.tags.length); // 3
    this.assertEqual(this.___(), doc.isPublished);
    this.assertEqual(this.___(), doc.version); // 2

    // Function accepting multiple interface types
    function getCreationInfo(item: Identifiable & Timestamped): string {
      return `Created: ${item.id} at ${item.createdAt.toISOString()}`;
    }

    const userInfo = getCreationInfo(user);
    const docInfo = getCreationInfo(doc);

    this.assertEqual(this.___(), userInfo.includes("user-123")); // true
    this.assertEqual(true, docInfo.includes("doc-789"));
  }

  test_class_implementation_and_contracts(): void {
    // CONCEPT: Class Implementation and Interface Contracts
    //
    // Classes can implement interfaces to guarantee they provide specific
    // functionality. A class can implement multiple interfaces, enabling
    // flexible design patterns. This ensures classes conform to expected
    // contracts while allowing different implementations.

    interface Drawable {
      draw(): string;
      getBounds(): { width: number; height: number };
    }

    interface Moveable {
      x: number;
      y: number;
      move(deltaX: number, deltaY: number): void;
      getPosition(): { x: number; y: number };
    }

    interface Resizable {
      width: number;
      height: number;
      resize(newWidth: number, newHeight: number): void;
    }

    interface Colorable {
      color: string;
      setColor(color: string): void;
    }

    // Class implementing single interface
    class Circle implements Drawable {
      constructor(private radius: number) {}

      draw(): string {
        return `Drawing a circle with radius ${this.radius}`;
      }

      getBounds() {
        const diameter = this.radius * 2;
        return { width: diameter, height: diameter };
      }

      // Additional methods not in interface
      getArea(): number {
        return Math.PI * this.radius * this.radius;
      }
    }

    // Class implementing multiple interfaces
    class Rectangle implements Drawable, Moveable, Resizable, Colorable {
      x: number = 0;
      y: number = 0;
      color: string = "black";

      constructor(public width: number, public height: number) {}

      draw(): string {
        return `Drawing a ${this.color} rectangle (${this.width}x${this.height}) at (${this.x}, ${this.y})`;
      }

      getBounds() {
        return { width: this.width, height: this.height };
      }

      move(deltaX: number, deltaY: number): void {
        this.x += deltaX;
        this.y += deltaY;
      }

      getPosition() {
        return { x: this.x, y: this.y };
      }

      resize(newWidth: number, newHeight: number): void {
        this.width = newWidth;
        this.height = newHeight;
      }

      setColor(color: string): void {
        this.color = color;
      }
    }

    // Abstract class implementing interface
    abstract class Shape implements Drawable, Moveable {
      x: number = 0;
      y: number = 0;

      abstract draw(): string;
      abstract getBounds(): { width: number; height: number };

      move(deltaX: number, deltaY: number): void {
        this.x += deltaX;
        this.y += deltaY;
      }

      getPosition() {
        return { x: this.x, y: this.y };
      }

      // Template method using interface methods
      describe(): string {
        const bounds = this.getBounds();
        const pos = this.getPosition();
        return `Shape at (${pos.x}, ${pos.y}) with bounds ${bounds.width}x${bounds.height}`;
      }
    }

    class Triangle extends Shape {
      constructor(private base: number, private height: number) {
        super();
      }

      draw(): string {
        return `Drawing a triangle (base: ${this.base}, height: ${this.height})`;
      }

      getBounds() {
        return { width: this.base, height: this.height };
      }
    }

    const circle = new Circle(5);
    const rectangle = new Rectangle(10, 8);
    const triangle = new Triangle(6, 8);

    // Test Circle implementation
    this.assertEqual(this.___(), circle.draw()); // "Drawing a circle with radius 5"
    const circleBounds = circle.getBounds();
    this.assertEqual(this.___(), circleBounds.width);

    // Test Rectangle implementation (multiple interfaces)
    rectangle.move(5, 10);
    rectangle.setColor("blue");
    rectangle.resize(12, 6);

    this.assertEqual(this.___(), rectangle.x); // 5
    this.assertEqual(this.___(), rectangle.y);
    this.assertEqual(this.___(), rectangle.color);
    this.assertEqual(this.___(), rectangle.width); // 12

    const rectDraw = rectangle.draw();
    this.assertEqual(this.___(), rectDraw.includes("blue")); // true
    this.assertEqual(true, rectDraw.includes("(12x6)"));

    // Test Triangle (abstract class implementation)
    triangle.move(2, 3);
    const triangleDesc = triangle.describe();

    this.assertEqual(this.___(), triangle.getPosition().x); // 2
    this.assertEqual(3, triangle.getPosition().y);
    this.assertEqual(this.___(), triangleDesc.includes("6x8")); // true

    // Polymorphic usage through interfaces
    const drawables: Drawable[] = [circle, rectangle, triangle];
    const moveables: Moveable[] = [rectangle, triangle];

    this.assertEqual(this.___(), drawables.length);
    this.assertEqual(this.___(), moveables.length); // 2

    // Interface segregation - functions accept specific interfaces
    function renderDrawable(drawable: Drawable): string {
      return drawable.draw();
    }

    function moveShape(moveable: Moveable, dx: number, dy: number): void {
      moveable.move(dx, dy);
    }

    const circleRender = renderDrawable(circle);
    this.assertEqual(this.___(), circleRender.includes("circle")); // true

    moveShape(rectangle, 1, 1);
    this.assertEqual(this.___(), rectangle.x);
    this.assertEqual(this.___(), rectangle.y); // 11
  }

  test_index_signatures_and_dynamic_properties(): void {
    // CONCEPT: Index Signatures and Dynamic Properties
    //
    // Index signatures allow interfaces to describe objects with dynamic
    // property names. They're essential for dictionaries, maps, and objects
    // where property names aren't known at compile time. TypeScript supports
    // string, number, and symbol index signatures.

    // Basic index signatures
    interface StringDictionary {
      [key: string]: string;
    }

    interface NumberDictionary {
      [key: string]: number;
      length: number; // Known properties must be compatible with index signature
    }

    // Multiple index signatures
    interface FlexibleDictionary {
      [key: string]: string | number; // String keys
      [key: number]: number; // Number keys (must be compatible with string signature)
    }

    // Generic dictionary
    interface Dictionary<T> {
      [key: string]: T;
    }

    // Complex interface with index signature
    interface APIResponse<T> {
      success: boolean;
      message: string;
      data: T;
      [metadata: string]: any; // Additional metadata properties
    }

    const colors: StringDictionary = {
      red: "#FF0000",
      green: "#00FF00",
      blue: "#0000FF",
      primary: "#007BFF",
    };

    const scores: NumberDictionary = {
      length: 4,
      alice: 95,
      bob: 87,
      charlie: 92,
      diana: 98,
    };

    this.assertEqual(this.___(), colors.red); // "#FF0000"
    this.assertEqual(this.___(), colors["green"]);
    this.assertEqual(this.___(), colors.primary); // "#007BFF"

    this.assertEqual(this.___(), scores.length);
    this.assertEqual(this.___(), scores.alice); // 95
    this.assertEqual(this.___(), scores["charlie"]);

    // Generic dictionary usage
    const userProfiles: Dictionary<{ name: string; age: number }> = {
      user1: { name: "Alice", age: 30 },
      user2: { name: "Bob", age: 25 },
      admin: { name: "Admin User", age: 35 },
    };

    this.assertEqual(this.___(), userProfiles.user1.name);
    this.assertEqual(this.___(), userProfiles.user2.age); // 25
    this.assertEqual(this.___(), userProfiles.admin.name);

    // API response with metadata
    const apiResponse: APIResponse<string[]> = {
      success: true,
      message: "Data retrieved successfully",
      data: ["item1", "item2", "item3"],
      timestamp: new Date().toISOString(),
      requestId: "req-123",
      version: "v1.0",
    };

    this.assertEqual(this.___(), apiResponse.success);
    this.assertEqual(this.___(), apiResponse.data.length); // 3
    this.assertEqual(this.___(), apiResponse.requestId);

    // Flexible dictionary with mixed types
    const config: FlexibleDictionary = {
      0: 8080, // Number key
      1: 3000, // Number key
      name: "MyApp",
      version: "1.0.0",
      debug: "false", // String value for string key
      port: 8080, // Number value for string key
    };

    this.assertEqual(this.___(), config[0]);
    this.assertEqual(this.___(), config.name); // "MyApp"
    this.assertEqual(this.___(), config.version);

    // Function working with index signatures
    function getProperty<T>(obj: Dictionary<T>, key: string): T | undefined {
      return obj[key];
    }

    function setProperty<T>(obj: Dictionary<T>, key: string, value: T): void {
      obj[key] = value;
    }

    const settings: Dictionary<string> = {};
    setProperty(settings, "theme", "dark");
    setProperty(settings, "language", "en");

    this.assertEqual(this.___(), getProperty(settings, "theme")); // "dark"
    this.assertEqual("en", getProperty(settings, "language"));
    this.assertEqual(undefined, getProperty(settings, "nonexistent"));

    // Computed property names
    const dynamicKey = "computed";
    const dynamicObject: StringDictionary = {
      static: "value",
      [dynamicKey]: "dynamic value",
      [`${dynamicKey}2`]: "another dynamic value",
    };

    this.assertEqual(this.___(), dynamicObject.static);
    this.assertEqual(this.___(), dynamicObject.computed); // "dynamic value"
    this.assertEqual(this.___(), dynamicObject.computed2);
  }

  test_advanced_interface_patterns(): void {
    // CONCEPT: Advanced Interface Patterns and Type Manipulation
    //
    // Advanced interface patterns enable sophisticated type definitions
    // including conditional types, mapped types, template literal types,
    // and utility type patterns. These patterns are essential for creating
    // flexible, reusable, and type-safe APIs.

    // Conditional interface properties
    interface ConditionalConfig<T extends boolean> {
      enabled: T;
      options: T extends true ? { host: string; port: number } : never;
    }

    // Mapped type interfaces
    interface BaseUser {
      id: string;
      name: string;
      email: string;
    }

    // Make all properties optional (using type alias instead of interface)
    type PartialUser = {
      [K in keyof BaseUser]?: BaseUser[K];
    };

    // Make all properties readonly (using type alias instead of interface)
    type ReadonlyUser = {
      readonly [K in keyof BaseUser]: BaseUser[K];
    };

    // Template literal type interface
    interface EventMap {
      "user:created": { userId: string; timestamp: Date };
      "user:updated": { userId: string; changes: string[] };
      "user:deleted": { userId: string };
    }

    interface EventEmitter<T extends Record<string, any>> {
      on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void;
      emit<K extends keyof T>(event: K, data: T[K]): void;
      off<K extends keyof T>(event: K): void;
    }

    // Utility type interfaces
    interface Repository<T, K extends keyof T> {
      findById(id: T[K]): Promise<T | null>;
      findAll(): Promise<T[]>;
      create(data: Omit<T, K>): Promise<T>;
      update(id: T[K], data: Partial<T>): Promise<T | null>;
      delete(id: T[K]): Promise<boolean>;
    }

    // Function overload interface
    interface QueryBuilder {
      where(field: string, value: any): QueryBuilder;
      where(conditions: Record<string, any>): QueryBuilder;
      orderBy(field: string, direction?: "asc" | "desc"): QueryBuilder;
      limit(count: number): QueryBuilder;
      build(): string;
    }

    // Brand type interface for nominal typing
    interface Branded<T, Brand> {
      readonly _brand: Brand;
      readonly value: T;
    }

    type UserId = Branded<string, "UserId">;
    type Email = Branded<string, "Email">;

    // Test conditional interfaces
    const enabledConfig: ConditionalConfig<true> = {
      enabled: true,
      options: { host: "localhost", port: 3000 },
    };

    const disabledConfig: ConditionalConfig<false> = {
      enabled: false,
      options: undefined as never, // Required by conditional type
    };

    this.assertEqual(this.___(), enabledConfig.enabled);
    this.assertEqual(this.___(), enabledConfig.options.host); // "localhost"
    this.assertEqual(this.___(), enabledConfig.options.port);
    this.assertEqual(this.___(), disabledConfig.enabled);

    // Test mapped type interfaces
    const partialUser: PartialUser = {
      name: "John Doe",
      // id and email are optional
    };

    const readonlyUser: ReadonlyUser = {
      id: "user-123",
      name: "Jane Doe",
      email: "jane@example.com",
    };

    this.assertEqual(this.___(), partialUser.name); // "John Doe"
    this.assertEqual(undefined, partialUser.id);
    this.assertEqual(this.___(), readonlyUser.id);
    this.assertEqual(this.___(), readonlyUser.email); // "jane@example.com"
    // readonlyUser.name = "New Name"; // Would cause compilation error

    // Test event emitter interface
    class SimpleEventEmitter<T extends Record<string, any>>
      implements EventEmitter<T>
    {
      private handlers: Map<keyof T, Function[]> = new Map();

      on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
        if (!this.handlers.has(event)) {
          this.handlers.set(event, []);
        }
        this.handlers.get(event)!.push(handler);
      }

      emit<K extends keyof T>(event: K, data: T[K]): void {
        const eventHandlers = this.handlers.get(event);
        if (eventHandlers) {
          eventHandlers.forEach((handler) => handler(data));
        }
      }

      off<K extends keyof T>(event: K): void {
        this.handlers.delete(event);
      }
    }

    const eventEmitter = new SimpleEventEmitter<EventMap>();
    let userCreatedData: EventMap["user:created"] | null = null;

    eventEmitter.on("user:created", (data) => {
      userCreatedData = data;
    });

    eventEmitter.emit("user:created", {
      userId: "user-456",
      timestamp: new Date("2024-01-01"),
    });

    this.assertEqual(this.___(), userCreatedData!.userId); // "user-456"
    this.assertEqual(this.___(), userCreatedData!.timestamp instanceof Date);

    // Test repository interface
    class UserRepository implements Repository<BaseUser, "id"> {
      private users: BaseUser[] = [];

      async findById(id: string): Promise<BaseUser | null> {
        return this.users.find((user) => user.id === id) || null;
      }

      async findAll(): Promise<BaseUser[]> {
        return [...this.users];
      }

      async create(data: Omit<BaseUser, "id">): Promise<BaseUser> {
        const user: BaseUser = {
          id: Math.random().toString(36),
          ...data,
        };
        this.users.push(user);
        return user;
      }

      async update(
        id: string,
        data: Partial<BaseUser>
      ): Promise<BaseUser | null> {
        const index = this.users.findIndex((user) => user.id === id);
        if (index >= 0) {
          this.users[index] = { ...this.users[index], ...data };
          return this.users[index];
        }
        return null;
      }

      async delete(id: string): Promise<boolean> {
        const index = this.users.findIndex((user) => user.id === id);
        if (index >= 0) {
          this.users.splice(index, 1);
          return true;
        }
        return false;
      }
    }

    const userRepo = new UserRepository();

    // Test repository usage
    const createdUser = userRepo.create({
      name: "Test User",
      email: "test@example.com",
    });

    this.assertEqual(this.___(), typeof createdUser); // "object" (Promise)
    this.assertEqual(this.___(), typeof userRepo.findById);
    this.assertEqual(this.___(), typeof userRepo.update); // "function"
  }

  test_interface_merging_and_module_augmentation(): void {
    // CONCEPT: Interface Merging and Module Augmentation
    //
    // Interface merging allows multiple interface declarations with the same name
    // to be combined into a single interface. Module augmentation extends
    // interfaces from external libraries. These features enable flexible
    // extension of existing type definitions.

    // Declaration merging - same interface name multiple times
    interface MergeableInterface {
      property1: string;
      method1(): void;
    }

    interface MergeableInterface {
      property2: number;
      method2(param: string): string;
    }

    interface MergeableInterface {
      property3: boolean;
      method3: (x: number) => number;
    }

    // The merged interface contains all properties and methods
    const mergedObject: MergeableInterface = {
      property1: "value1",
      property2: 42,
      property3: true,
      method1(): void {
        console.log("Method 1 called");
      },
      method2(param: string): string {
        return `Method 2: ${param}`;
      },
      method3: (x: number) => x * 2,
    };

    this.assertEqual(this.___(), mergedObject.property1); // "value1"
    this.assertEqual(this.___(), mergedObject.property2);
    this.assertEqual(this.___(), mergedObject.property3); // true
    this.assertEqual("Method 2: test", mergedObject.method2("test"));
    this.assertEqual(20, mergedObject.method3(10));

    // Configurable item example without namespace
    interface ConfigurableItem {
      name: string;
      configure(): void;
    }

    function createConfigurableItem(name: string): ConfigurableItem {
      return {
        name,
        configure() {
          console.log(`Configuring ${this.name}`);
        },
      };
    }

    function validateConfigurableItem(item: ConfigurableItem): boolean {
      return item.name.length > 0;
    }

    const configItem = createConfigurableItem("test-item");
    const isValid = validateConfigurableItem(configItem);

    this.assertEqual(this.___(), configItem.name);
    this.assertEqual(this.___(), isValid); // true
    this.assertEqual(this.___(), typeof createConfigurableItem);

    // Generic interface merging
    interface Container<T> {
      value: T;
      getValue(): T;
    }

    interface Container<T> {
      setValue(value: T): void;
      transform<U>(fn: (value: T) => U): Container<U>;
    }

    class SimpleContainer<T> implements Container<T> {
      constructor(public value: T) {}

      getValue(): T {
        return this.value;
      }

      setValue(value: T): void {
        this.value = value;
      }

      transform<U>(fn: (value: T) => U): Container<U> {
        return new SimpleContainer(fn(this.value));
      }
    }

    const stringContainer = new SimpleContainer("hello");
    const numberContainer = stringContainer.transform((s) => s.length);

    this.assertEqual("hello", stringContainer.getValue());
    this.assertEqual(this.___(), numberContainer.getValue()); // 5

    stringContainer.setValue("world");
    this.assertEqual(this.___(), stringContainer.getValue()); // "world"

    // Function interface merging with overloads
    interface Processor {
      process(input: string): string;
    }

    interface Processor {
      process(input: number): number;
      process(input: boolean): boolean;
    }

    interface Processor {
      process(input: string[]): string[];
    }

    const processor: Processor = {
      process(input: any): any {
        if (typeof input === "string") return input.toUpperCase();
        if (typeof input === "number") return input * 2;
        if (typeof input === "boolean") return !input;
        if (Array.isArray(input)) return input.map((s) => s.toUpperCase());
        return input;
      },
    };

    this.assertEqual("HELLO", processor.process("hello"));
    this.assertEqual(this.___(), processor.process(21)); // 42
    this.assertEqual(false, processor.process(true));
    this.assertEqual(this.___(), processor.process(["hi", "bye"])); // ["HI", "BYE"]

    // Conditional merging based on generics
    interface ResponseHandler<T> {
      handle(data: T): void;
    }

    interface ResponseHandler<T> {
      validate(data: T): boolean;
      transform?: T extends string ? (data: T) => string : never;
    }

    const stringHandler: ResponseHandler<string> = {
      handle(data: string): void {
        console.log(`Handling: ${data}`);
      },
      validate(data: string): boolean {
        return data.length > 0;
      },
      transform(data: string): string {
        return data.trim();
      },
    };

    const numberHandler: ResponseHandler<number> = {
      handle(data: number): void {
        console.log(`Handling: ${data}`);
      },
      validate(data: number): boolean {
        return !isNaN(data);
      },
      // No transform property for number type
    };

    this.assertEqual(true, stringHandler.validate("test"));
    this.assertEqual(this.___(), stringHandler.transform!("  trimmed  ")); // "trimmed"
    this.assertEqual(true, numberHandler.validate(42));
    this.assertEqual(this.___(), typeof stringHandler.transform); // "function"
  }
}
