import { Koan } from "./koan";

export class AboutAdvancedTypes extends Koan {
  constructor() {
    super("AboutAdvancedTypes", "about-advanced-types.ts");
  }

  // Learn: Template literal types create new string types by combining string literals
  // Use ${T} syntax to insert type variables into template strings
  // Useful for creating type-safe APIs with dynamic string construction
  // Can extract and manipulate parts of string types
  // Example: `user-${number}` creates types like "user-1", "user-2", etc.
  test_template_literal_types(): void {
    type EventName<T extends string> = `on${Capitalize<T>}`;
    type ButtonEvents = EventName<"click" | "hover" | "focus">;
    // ButtonEvents = "onClick" | "onHover" | "onFocus"

    function addEventListener<T extends string>(
      event: EventName<T>,
      handler: () => void
    ): void {
      // Implementation would attach the handler
    }

    // Type-safe event names
    addEventListener("onClick", () => console.log("clicked"));

    const eventName: ButtonEvents = "onClick";
    this.assertEqual(this.___(), eventName); // Fill in the blank

    // Template literal pattern matching
    type ExtractRouteParams<T extends string> =
      T extends `${string}/:${infer P}/${infer R}`
        ? P | ExtractRouteParams<`/${R}`>
        : T extends `${string}/:${infer P}`
        ? P
        : never;

    type RouteParams = ExtractRouteParams<"/users/:userId/posts/:postId">;
    // RouteParams = "userId" | "postId"

    const paramName: RouteParams = "userId";
    this.assertEqual(this.___(), paramName); // Fill in the blank
  }

  // Learn: Recursive types reference themselves to create tree-like or nested structures
  // Essential for modeling JSON, DOM trees, linked lists, and nested data
  // TypeScript has recursion depth limits to prevent infinite loops
  // Use conditional types to control recursion termination
  // Example: JSON type can represent any valid JSON value including nested objects/arrays
  test_recursive_types(): void {
    type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

    interface JsonObject {
      [key: string]: JsonValue;
    }

    interface JsonArray extends Array<JsonValue> {}

    const validJson: JsonValue = {
      name: "TypeScript",
      version: 4.9,
      features: ["generics", "union types"],
      config: {
        strict: true,
        target: "ES2020",
      },
    };

    // Tree structure using recursion
    type TreeNode<T> = {
      value: T;
      children: TreeNode<T>[];
    };

    const fileTree: TreeNode<string> = {
      value: "root",
      children: [
        {
          value: "src",
          children: [
            { value: "index.ts", children: [] },
            { value: "utils.ts", children: [] },
          ],
        },
      ],
    };

    this.assertEqual(this.___(), fileTree.value); // Fill in the blank
    this.assertEqual(this.__(), fileTree.children.length); // Fill in the blank
    this.assertEqual(this.___(), fileTree.children[0].value); // Fill in the blank
  }

  // Learn: The infer keyword extracts types from other types in conditional types
  // Only usable within the extends clause of conditional types
  // Creates type variables that can be used in the true branch
  // Essential for building advanced utility types and type manipulation
  // Example: Extract return type from function signatures
  test_infer_keyword(): void {
    // Extract return type from function
    type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

    type StringFunction = () => string;
    type NumberFunction = (x: number) => number;

    type StringReturn = ReturnType<StringFunction>; // string
    type NumberReturn = ReturnType<NumberFunction>; // number

    function getString(): string {
      return "hello";
    }

    function getNumber(x: number): number {
      return x * 2;
    }

    const stringResult: StringReturn = "world";
    const numberResult: NumberReturn = 42;

    this.assertEqual(this.___(), stringResult); // Fill in the blank
    this.assertEqual(this.__(), numberResult); // Fill in the blank

    // Extract array element type
    type ArrayElement<T> = T extends (infer U)[] ? U : never;

    type StringArrayElement = ArrayElement<string[]>; // string
    type NumberArrayElement = ArrayElement<number[]>; // number

    const stringElement: StringArrayElement = "element";
    const numberElement: NumberArrayElement = 123;

    this.assertEqual(this.___(), stringElement); // Fill in the blank
    this.assertEqual(this.__(), numberElement); // Fill in the blank

    // Extract promise value type
    type PromiseValue<T> = T extends Promise<infer V> ? V : never;

    type StringPromiseValue = PromiseValue<Promise<string>>; // string

    const promiseValue: StringPromiseValue = "async result";
    this.assertEqual(this.___(), promiseValue); // Fill in the blank
  }

  // Learn: Advanced utility types provide powerful type transformations
  // NonNullable removes null and undefined, Extract/Exclude filter union types
  // Parameters extracts function parameter types, ReturnType gets return type
  // These enable sophisticated type-level programming and API design
  // Example: Create type-safe wrappers and transformations of existing types
  test_advanced_utility_types(): void {
    // NonNullable - removes null and undefined
    type MaybeString = string | null | undefined;
    type DefiniteString = NonNullable<MaybeString>; // string

    const definiteValue: DefiniteString = "not null";
    this.assertEqual(this.___(), definiteValue); // Fill in the blank

    // Extract - extract types from union that are assignable to another type
    type Colors = "red" | "green" | "blue" | "yellow";
    type PrimaryColors = Extract<Colors, "red" | "blue" | "yellow">; // "red" | "blue" | "yellow"

    const primaryColor: PrimaryColors = "red";
    this.assertEqual(this.___(), primaryColor); // Fill in the blank

    // Exclude - exclude types from union
    type SecondaryColors = Exclude<Colors, "red" | "blue" | "yellow">; // "green"

    const secondaryColor: SecondaryColors = "green";
    this.assertEqual(this.___(), secondaryColor); // Fill in the blank

    // Parameters - extract function parameter types as tuple
    function greet(name: string, age: number): void {
      console.log(`Hello ${name}, you are ${age} years old`);
    }

    type GreetParams = Parameters<typeof greet>; // [string, number]

    const params: GreetParams = ["Alice", 30];
    this.assertEqual(this.___(), params[0]); // Fill in the blank
    this.assertEqual(this.__(), params[1]); // Fill in the blank

    // ReturnType - extract function return type
    function calculate(): { sum: number; product: number } {
      return { sum: 10, product: 20 };
    }

    type CalculateReturn = ReturnType<typeof calculate>; // { sum: number; product: number }

    const result: CalculateReturn = { sum: 15, product: 30 };
    this.assertEqual(this.__(), result.sum); // Fill in the blank
    this.assertEqual(this.__(), result.product); // Fill in the blank
  }

  // Learn: Index signatures allow dynamic property access with specific key types
  // Key remapping transforms property names during type operations
  // Useful for creating flexible APIs and data transformation types
  // Combines mapped types with template literal types for powerful patterns
  // Example: Transform object keys to create new interfaces
  test_index_signatures_and_key_remapping(): void {
    // Index signatures for dynamic properties
    interface StringDictionary {
      [key: string]: string;
    }

    const config: StringDictionary = {
      host: "localhost",
      port: "3000",
      env: "development",
    };

    this.assertEqual(this.___(), config.host); // Fill in the blank
    this.assertEqual(this.___(), config["port"]); // Fill in the blank

    // Key remapping with mapped types
    type Getters<T> = {
      [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
    };

    type User = {
      name: string;
      age: number;
    };

    type UserGetters = Getters<User>;
    // { getName: () => string; getAge: () => number; }

    const userGetters: UserGetters = {
      getName: () => "John",
      getAge: () => 25,
    };

    this.assertEqual(this.___(), userGetters.getName()); // Fill in the blank
    this.assertEqual(this.__(), userGetters.getAge()); // Fill in the blank

    // Remove prefix from keys
    type RemovePrefix<T, P extends string> = {
      [K in keyof T as K extends `${P}${infer R}` ? R : K]: T[K];
    };

    type APIResponse = {
      api_name: string;
      api_version: number;
      data: unknown;
    };

    type CleanResponse = RemovePrefix<APIResponse, "api_">;
    // { name: string; version: number; data: unknown; }

    const cleanData: CleanResponse = {
      name: "Users API",
      version: 1,
      data: {},
    };

    this.assertEqual(this.___(), cleanData.name); // Fill in the blank
    this.assertEqual(this.___(), cleanData.version); // Fill in the blank
  }

  // Learn: Branded types create distinct types from the same underlying primitive type
  // Use intersection with unique symbol or literal type to create brands
  // Prevents accidental mixing of semantically different but structurally same types
  // Essential for creating type-safe APIs with IDs, currencies, measurements
  // Example: UserId and ProductId are both numbers but cannot be mixed
  test_branded_types(): void {
    // Create branded types using intersection with unique symbols
    const UserIdBrand = Symbol("UserId");
    const ProductIdBrand = Symbol("ProductId");

    type UserId = number & { readonly __brand: typeof UserIdBrand };
    type ProductId = number & { readonly __brand: typeof ProductIdBrand };

    // Helper functions to create branded types
    function createUserId(value: number): UserId {
      return value as UserId;
    }

    function createProductId(value: number): ProductId {
      return value as ProductId;
    }

    const userId = createUserId(123);
    const productId = createProductId(456);

    // These would cause compilation errors:
    // const wrongUserId: UserId = 123; // Cannot assign number to UserId
    // const mixedId: UserId = productId; // Cannot assign ProductId to UserId

    function getUserData(id: UserId): string {
      return `User data for ID: ${id}`;
    }

    function getProductData(id: ProductId): string {
      return `Product data for ID: ${id}`;
    }

    this.assertEqual(this.___(), getUserData(userId).includes("123")); // Fill in the blank
    this.assertEqual(this.___(), getProductData(productId).includes("456")); // Fill in the blank

    // String-based branded types
    type Email = string & { readonly __brand: "Email" };
    type URL = string & { readonly __brand: "URL" };

    function isValidEmail(value: string): value is Email {
      return value.includes("@");
    }

    function createEmail(value: string): Email | null {
      return isValidEmail(value) ? (value as Email) : null;
    }

    const email = createEmail("user@example.com");
    const invalidEmail = createEmail("invalid-email");

    this.assertEqual(this.___(), email !== null); // Fill in the blank
    this.assertEqual(this.___(), invalidEmail === null); // Fill in the blank
  }

  // Learn: Function overloads provide multiple signatures for the same function
  // TypeScript chooses the most specific matching overload at compile time
  // Implementation signature must be compatible with all overload signatures
  // Useful for functions that behave differently based on parameter types
  // Example: A function that accepts either a string or config object
  test_function_overloads(): void {
    // Function overloads for different parameter combinations
    function createUser(name: string): { name: string; id: number };
    function createUser(config: { name: string; email: string }): {
      name: string;
      email: string;
      id: number;
    };
    function createUser(
      nameOrConfig: string | { name: string; email: string }
    ) {
      if (typeof nameOrConfig === "string") {
        return { name: nameOrConfig, id: Math.floor(Math.random() * 1000) };
      } else {
        return { ...nameOrConfig, id: Math.floor(Math.random() * 1000) };
      }
    }

    const user1 = createUser("Alice");
    const user2 = createUser({ name: "Bob", email: "bob@example.com" });

    this.assertEqual(this.___(), user1.name); // Fill in the blank
    this.assertEqual(this.___(), user2.name); // Fill in the blank
    this.assertEqual(this.___(), "email" in user2); // Fill in the blank
    this.assertEqual(this.___(), "email" in user1); // Fill in the blank

    // Method overloads in classes
    class DataProcessor {
      process(data: string): string;
      process(data: number[]): number;
      process(data: string | number[]): string | number {
        if (typeof data === "string") {
          return data.toUpperCase();
        } else {
          return data.reduce((sum, num) => sum + num, 0);
        }
      }
    }

    const processor = new DataProcessor();
    const stringResult = processor.process("hello");
    const numberResult = processor.process([1, 2, 3, 4, 5]);

    this.assertEqual(this.___(), stringResult); // Fill in the blank
    this.assertEqual(this.__(), numberResult); // Fill in the blank
  }

  // Learn: Abstract classes cannot be instantiated but provide base functionality
  // Abstract methods must be implemented by concrete subclasses
  // Mixins allow multiple inheritance-like patterns using intersection types
  // Useful for creating extensible frameworks and shared behavior patterns
  // Example: Abstract Shape class with concrete Circle and Rectangle implementations
  test_abstract_classes_and_mixins(): void {
    // Abstract class with abstract and concrete methods
    abstract class Shape {
      protected name: string;

      constructor(name: string) {
        this.name = name;
      }

      // Concrete method available to all subclasses
      getName(): string {
        return this.name;
      }

      // Abstract method that must be implemented
      abstract getArea(): number;
      abstract getPerimeter(): number;
    }

    class Circle extends Shape {
      private radius: number;

      constructor(radius: number) {
        super("Circle");
        this.radius = radius;
      }

      getArea(): number {
        return Math.PI * this.radius * this.radius;
      }

      getPerimeter(): number {
        return 2 * Math.PI * this.radius;
      }
    }

    class Rectangle extends Shape {
      private width: number;
      private height: number;

      constructor(width: number, height: number) {
        super("Rectangle");
        this.width = width;
        this.height = height;
      }

      getArea(): number {
        return this.width * this.height;
      }

      getPerimeter(): number {
        return 2 * (this.width + this.height);
      }
    }

    const circle = new Circle(5);
    const rectangle = new Rectangle(4, 6);

    this.assertEqual(this.___(), circle.getName()); // Fill in the blank
    this.assertEqual(this.___(), rectangle.getName()); // Fill in the blank
    this.assertEqual(this.__(), Math.round(circle.getArea())); // Fill in the blank (π * 5²)
    this.assertEqual(this.__(), rectangle.getArea()); // Fill in the blank

    // Mixin pattern using intersection types
    type Constructor<T = {}> = new (...args: any[]) => T;

    function Timestamped<TBase extends Constructor>(Base: TBase) {
      return class extends Base {
        timestamp = Date.now();

        getTimestamp() {
          return this.timestamp;
        }
      };
    }

    function Identifiable<TBase extends Constructor>(Base: TBase) {
      return class extends Base {
        id = Math.random().toString(36);

        getId() {
          return this.id;
        }
      };
    }

    class User {
      constructor(public name: string) {}
    }

    // Apply multiple mixins
    const TimestampedUser = Timestamped(User);
    const FullUser = Identifiable(TimestampedUser);

    const user = new FullUser("Alice");

    this.assertEqual(this.___(), user.name); // Fill in the blank
    this.assertEqual(this.___(), typeof user.getId() === "string"); // Fill in the blank
    this.assertEqual(this.___(), typeof user.getTimestamp() === "number"); // Fill in the blank
  }

  // Learn: Module augmentation extends existing modules with new functionality
  // Use declare module to add properties to existing module interfaces
  // Useful for extending third-party libraries or built-in types
  // Enables type-safe monkey patching and plugin architectures
  // Example: Add custom methods to Array prototype with proper typing
  test_module_augmentation(): void {
    // In a real scenario, module augmentation would be done at the top level
    // For testing purposes, we'll demonstrate the concepts without actual declarations

    // This is how you would augment the Array interface:
    // declare global {
    //   interface Array<T> {
    //     first(): T | undefined;
    //     last(): T | undefined;
    //     isEmpty(): boolean;
    //   }
    // }

    const numbers = [1, 2, 3, 4, 5];

    // Simulating the extended methods
    function first<T>(arr: T[]): T | undefined {
      return arr[0];
    }

    function last<T>(arr: T[]): T | undefined {
      return arr[arr.length - 1];
    }

    function isEmpty<T>(arr: T[]): boolean {
      return arr.length === 0;
    }

    this.assertEqual(this.___(), first(numbers)); // Fill in the blank
    this.assertEqual(this.___(), last(numbers)); // Fill in the blank
    this.assertEqual(this.___(), isEmpty(numbers)); // Fill in the blank

    // Custom namespace merging pattern
    const CustomMathSquare = {
      square(n: number): number {
        return n * n;
      },
    };

    const CustomMathCube = {
      cube(n: number): number {
        return n * n * n;
      },
    };

    // Merge the functionality
    const CustomMath = { ...CustomMathSquare, ...CustomMathCube };

    const squared = CustomMath.square(4);
    const cubed = CustomMath.cube(3);

    this.assertEqual(this.__(), squared); // Fill in the blank
    this.assertEqual(this.__(), cubed); // Fill in the blank
  }

  // Learn: Conditional types with distributive behavior over union types
  // When T is a union type, conditional types distribute over each member
  // Use [] around T to prevent distribution when needed
  // Essential for advanced type manipulation and filtering operations
  // Example: Filter out function types from a union
  test_distributive_conditional_types(): void {
    // Distributive conditional type
    type NonFunction<T> = T extends (...args: any[]) => any ? never : T;

    type MixedTypes = string | number | (() => void) | boolean;
    type FilteredTypes = NonFunction<MixedTypes>; // string | number | boolean

    const stringValue: FilteredTypes = "hello";
    const numberValue: FilteredTypes = 42;
    const booleanValue: FilteredTypes = true;

    this.assertEqual(this.___(), stringValue); // Fill in the blank
    this.assertEqual(this.__(), numberValue); // Fill in the blank
    this.assertEqual(this.___(), booleanValue); // Fill in the blank

    // Non-distributive conditional type (using tuple to prevent distribution)
    type IsUnion<T> = [T] extends [never]
      ? false
      : T extends any
      ? [Exclude<T, T>] extends [never]
        ? false
        : true
      : false;

    type StringIsUnion = IsUnion<string>; // false
    type UnionIsUnion = IsUnion<string | number>; // true

    // We can't directly test types, but we can use them in functions
    function checkUnion<T>(): IsUnion<T> {
      // Implementation would be complex, this is just for type demonstration
      return true as IsUnion<T>;
    }

    const singleTypeCheck = false; // Simulating IsUnion<string>
    const unionTypeCheck = true; // Simulating IsUnion<string | number>

    this.assertEqual(this.___(), singleTypeCheck); // Fill in the blank
    this.assertEqual(this.___(), unionTypeCheck); // Fill in the blank

    // Extract specific types from union
    type ExtractStrings<T> = T extends string ? T : never;

    type AllTypes = "hello" | 42 | "world" | true | "typescript";
    type OnlyStrings = ExtractStrings<AllTypes>; // "hello" | "world" | "typescript"

    const extractedString: OnlyStrings = "hello";
    this.assertEqual(this.___(), extractedString); // Fill in the blank
  }
}
