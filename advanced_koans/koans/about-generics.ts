import { Koan } from "./koan";

export class AboutGenerics extends Koan {
  constructor() {
    super("AboutGenerics", "about-generics.ts");
  }

  /**
   * The Foundation of Generic Programming
   *
   * Generics are TypeScript's mechanism for writing reusable, type-safe code that works with multiple types.
   * Think of them as "type variables" - placeholders that get filled with concrete types when used.
   * This is the foundation of parametric polymorphism in TypeScript.
   *
   * Key Concepts:
   * - Type parameters (<T>) act like function parameters but for types
   * - Generic functions preserve type relationships between inputs and outputs
   * - TypeScript's type inference can often determine generic types automatically
   * - Generics enable code reuse without sacrificing type safety
   *
   * Real-world applications:
   * - Array<T>, Promise<T>, Map<K,V> are all generic types
   * - Database queries, API responses, data transformations
   * - Building flexible libraries and frameworks
   */
  test_generic_function_foundations(): void {
    // The identity function is the "Hello World" of generics
    function identity<T>(arg: T): T {
      return arg;
    }

    // Generic functions with multiple parameters
    function pair<T, U>(first: T, second: U): [T, U] {
      return [first, second];
    }

    // Generic functions with constraints ensure type safety
    function getLength<T extends { length: number }>(item: T): number {
      return item.length;
    }

    const numberResult = identity<number>(42);
    const stringResult = identity("Hello"); // Type inference at work
    const coordinates = pair(10, "North");
    const arrayLength = getLength([1, 2, 3, 4, 5]);
    const stringLength = getLength("TypeScript");

    this.assertEqual(this.__(), numberResult);
    this.assertEqual(this.___(), stringResult);
    this.assertEqual(this.___(), coordinates[0]);
    this.assertEqual("North", coordinates[1]);
    this.assertEqual(5, arrayLength);
    this.assertEqual(this.__(), stringLength);
  }

  /**
   * Generic Interfaces and Classes: Building Flexible Data Structures
   *
   * Generic interfaces and classes are the building blocks of reusable, type-safe data structures.
   * They allow you to define blueprints that work with any type while maintaining type safety.
   * This is how TypeScript's built-in types like Array<T> and Promise<T> are implemented.
   *
   * Key Concepts:
   * - Generic interfaces define contracts that work with multiple types
   * - Generic classes implement these interfaces with concrete behavior
   * - Type parameters are specified when creating instances or implementing interfaces
   * - Multiple type parameters enable complex relationships (e.g., Map<K, V>)
   *
   * Real-world applications:
   * - Collection classes (Stack<T>, Queue<T>, Tree<T>)
   * - Repository pattern in data access layers
   * - Event systems and observers
   * - Configuration objects and dependency injection containers
   */
  test_generic_interfaces_and_classes(): void {
    interface Repository<T> {
      save(entity: T): void;
      findById(id: string): T | null;
      findAll(): T[];
    }

    class InMemoryRepository<T extends { id: string }>
      implements Repository<T>
    {
      private entities: T[] = [];

      save(entity: T): void {
        const index = this.entities.findIndex((e) => e.id === entity.id);
        if (index >= 0) {
          this.entities[index] = entity;
        } else {
          this.entities.push(entity);
        }
      }

      findById(id: string): T | null {
        return this.entities.find((e) => e.id === id) || null;
      }

      findAll(): T[] {
        return [...this.entities];
      }
    }

    interface User {
      id: string;
      name: string;
      email: string;
    }

    const userRepo = new InMemoryRepository<User>();
    userRepo.save({ id: "1", name: "Alice", email: "alice@example.com" });
    userRepo.save({ id: "2", name: "Bob", email: "bob@example.com" });

    const alice = userRepo.findById("1");
    const allUsers = userRepo.findAll();
    const nonexistent = userRepo.findById("999");

    this.assertEqual(this.___(), alice?.name);
    this.assertEqual("alice@example.com", alice?.email);
    this.assertEqual(2, allUsers.length);
    this.assertEqual(this.___(), nonexistent);
  }

  /**
   * Generic Constraints: Adding Boundaries to Type Parameters
   *
   * Generic constraints allow you to specify requirements that type parameters must meet.
   * This provides a balance between flexibility and type safety - you can still work with
   * multiple types, but ensure they have the properties or methods you need to use.
   *
   * Key Concepts:
   * - `T extends SomeType` means T must be assignable to SomeType
   * - Constraints enable safe property/method access within generic functions
   * - You can constrain to interfaces, unions, built-in types, or other type parameters
   * - Multiple constraints can be combined with intersection types (&)
   *
   * Constraint patterns:
   * - `T extends keyof U` - T must be a key of U
   * - `T extends string | number` - T must be string or number
   * - `T extends { length: number }` - T must have a length property
   */
  test_generic_constraints(): void {
    // Constraint to ensure objects have an 'id' property
    function updateEntity<T extends { id: string }>(
      entity: T,
      updates: Partial<T>
    ): T {
      return { ...entity, ...updates };
    }

    // Constraint to work with array-like objects
    function getLastItem<T extends readonly unknown[]>(
      items: T
    ): T[number] | undefined {
      return items[items.length - 1];
    }

    // Constraint to ensure numeric operations
    function add<T extends number | bigint>(a: T, b: T): T {
      return (a as any) + (b as any);
    }

    // Keyof constraint for safe property access
    function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
      return obj[key];
    }

    const user = { id: "123", name: "Alice", age: 30 };
    const updatedUser = updateEntity(user, { age: 31 });

    const numbers = [1, 2, 3, 4, 5];
    const strings = ["a", "b", "c"];
    const lastNumber = getLastItem(numbers);
    const lastString = getLastItem(strings);

    const sum = add(10, 20);
    const userName = getProperty(user, "name");

    this.assertEqual(31, updatedUser.age);
    this.assertEqual(this.___(), updatedUser.name);
    this.assertEqual(5, lastNumber);
    this.assertEqual(this.___(), lastString);
    this.assertEqual(this.__(), sum);
    this.assertEqual(this.___(), userName);
  }

  /**
   * Advanced Generic Classes: Multi-Parameter Generics and Variance
   *
   * Real-world applications often require multiple type parameters working together.
   * Understanding how these parameters interact, their variance, and default values
   * is crucial for building sophisticated generic data structures and APIs.
   *
   * Key Concepts:
   * - Multiple type parameters can represent different aspects of your data
   * - Default type parameters provide sensible defaults while maintaining flexibility
   * - Variance affects how generic types relate to each other in inheritance hierarchies
   * - Generic methods within generic classes provide additional flexibility
   *
   * Advanced patterns:
   * - Builder pattern with generics
   * - Event emitters with typed events
   * - State machines with typed states and events
   * - Fluent APIs with type-safe chaining
   */
  test_advanced_generic_classes(): void {
    class Cache<K, V> {
      private storage = new Map<K, V>();
      private accessTimes = new Map<K, number>();
      private maxSize: number;

      constructor(maxSize = 100) {
        this.maxSize = maxSize;
      }

      set(key: K, value: V): void {
        // Implement LRU eviction if needed
        if (this.storage.size >= this.maxSize && !this.storage.has(key)) {
          const oldestKey = this.findOldestKey();
          if (oldestKey !== undefined) {
            this.storage.delete(oldestKey);
            this.accessTimes.delete(oldestKey);
          }
        }

        this.storage.set(key, value);
        this.accessTimes.set(key, Date.now());
      }

      get(key: K): V | undefined {
        const value = this.storage.get(key);
        if (value !== undefined) {
          this.accessTimes.set(key, Date.now());
        }
        return value;
      }

      has(key: K): boolean {
        return this.storage.has(key);
      }

      size(): number {
        return this.storage.size;
      }

      clear(): void {
        this.storage.clear();
        this.accessTimes.clear();
      }

      private findOldestKey(): K | undefined {
        let oldestKey: K | undefined;
        let oldestTime = Infinity;

        for (const [key, time] of this.accessTimes) {
          if (time < oldestTime) {
            oldestTime = time;
            oldestKey = key;
          }
        }

        return oldestKey;
      }
    }

    const userCache = new Cache<string, { name: string; age: number }>(3);

    userCache.set("user1", { name: "Alice", age: 30 });
    userCache.set("user2", { name: "Bob", age: 25 });
    userCache.set("user3", { name: "Charlie", age: 35 });

    const alice = userCache.get("user1");
    const bob = userCache.get("user2");
    const nonexistent = userCache.get("user999");

    this.assertEqual(this.___(), alice?.name);
    this.assertEqual(30, alice?.age);
    this.assertEqual(this.___(), bob?.name);
    this.assertEqual(true, userCache.has("user1"));
    this.assertEqual(this.___(), userCache.has("user999"));
    this.assertEqual(3, userCache.size());
    this.assertEqual(this.___(), nonexistent);
  }

  /**
   * Built-in Utility Types: TypeScript's Generic Type Library
   *
   * TypeScript provides a rich set of built-in utility types that leverage generics
   * to transform existing types. These are essential tools for type manipulation
   * and are widely used in real-world TypeScript applications.
   *
   * Key Utility Types:
   * - Partial<T> - Makes all properties optional
   * - Required<T> - Makes all properties required
   * - Pick<T, K> - Selects specific properties
   * - Omit<T, K> - Excludes specific properties
   * - Record<K, V> - Creates an object type with keys K and values V
   * - Exclude<T, U> - Excludes types that are assignable to U
   * - Extract<T, U> - Extracts types that are assignable to U
   * - NonNullable<T> - Excludes null and undefined
   *
   * These utility types power many modern TypeScript patterns including
   * form handling, API responses, configuration objects, and more.
   */
  test_utility_types(): void {
    interface User {
      id: number;
      name: string;
      email: string;
      age: number;
      role: "admin" | "user" | "guest";
      lastLogin?: Date;
    }

    // Partial - useful for updates and patches
    type UserUpdate = Partial<User>;
    const userUpdate: UserUpdate = {
      name: "Alice Smith",
      age: 31,
    };

    // Pick - create focused views of data
    type UserProfile = Pick<User, "name" | "email">;
    const profile: UserProfile = {
      name: "Alice",
      email: "alice@example.com",
    };

    // Omit - exclude sensitive or computed fields
    type PublicUser = Omit<User, "id" | "lastLogin">;
    const publicUser: PublicUser = {
      name: "Alice",
      email: "alice@example.com",
      age: 30,
      role: "user",
    };

    // Record - create dictionaries and maps
    type UserPermissions = Record<User["role"], string[]>;
    const permissions: UserPermissions = {
      admin: ["read", "write", "delete"],
      user: ["read", "write"],
      guest: ["read"],
    };

    // Extract and Exclude - work with union types
    type AdminOrUser = Extract<User["role"], "admin" | "user">;
    type NonGuestRoles = Exclude<User["role"], "guest">;

    this.assertEqual(this.___(), userUpdate.name);
    this.assertEqual(31, userUpdate.age);

    this.assertEqual("Alice", profile.name);
    this.assertEqual(this.___(), profile.email);

    this.assertEqual(this.___(), publicUser.role);
    this.assertEqual("alice@example.com", publicUser.email);

    this.assertEqual(3, permissions.admin.length);
    this.assertEqual(this.___(), permissions.guest.length);
    this.assertEqual("read", permissions.user[0]);
  }

  /**
   * Conditional Types: Type-Level Logic and Control Flow
   *
   * Conditional types enable type-level programming by allowing types to make decisions
   * based on other types. They follow the pattern `T extends U ? X : Y` - if T is
   * assignable to U, then the type is X, otherwise Y.
   *
   * Key Concepts:
   * - Conditional types enable type-level branching logic
   * - They're essential for building sophisticated type transformations
   * - Can be distributed over union types for powerful type filtering
   * - Enable creation of type-safe APIs that adapt to their inputs
   * - Used extensively in TypeScript's built-in utility types
   *
   * Advanced patterns:
   * - Type filtering and transformation
   * - Function overload resolution
   * - API response type inference
   * - Template literal type manipulation
   */
  test_conditional_types(): void {
    // Basic conditional type
    type IsString<T> = T extends string ? true : false;

    // More complex conditional with inference
    type GetArrayElementType<T> = T extends (infer U)[] ? U : never;

    // Conditional type for function return types
    type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

    // Distributive conditional types with unions
    type NonNullable<T> = T extends null | undefined ? never : T;

    // Conditional types for API response handling
    type ApiResponse<T> = T extends string
      ? { message: T }
      : T extends number
      ? { count: T }
      : T extends boolean
      ? { success: T }
      : { data: T };

    // Test type aliases (can't test types directly at runtime)
    type StringCheck = IsString<string>; // true
    type NumberCheck = IsString<number>; // false
    type ArrayElement = GetArrayElementType<string[]>; // string
    type FunctionReturn = ReturnTypeOf<() => number>; // number

    // Function to demonstrate the behavior
    function createResponse<T>(value: T): ApiResponse<T> {
      if (typeof value === "string") {
        return { message: value } as ApiResponse<T>;
      } else if (typeof value === "number") {
        return { count: value } as ApiResponse<T>;
      } else if (typeof value === "boolean") {
        return { success: value } as ApiResponse<T>;
      } else {
        return { data: value } as ApiResponse<T>;
      }
    }

    const stringResponse = createResponse("Hello");
    const numberResponse = createResponse(42);
    const booleanResponse = createResponse(true);
    const objectResponse = createResponse({ name: "Alice" });

    this.assertEqual(this.___(), stringResponse.message);
    this.assertEqual(42, numberResponse.count);
    this.assertEqual(this.___(), booleanResponse.success);
    this.assertEqual("Alice", objectResponse.data.name);
  }

  /**
   * Mapped Types: Transforming Types Programmatically
   *
   * Mapped types allow you to create new types by transforming properties of existing types.
   * They iterate over the keys of a type and apply transformations to create new type structures.
   * This is the foundation of many utility types and advanced type manipulations.
   *
   * Key Concepts:
   * - `[P in keyof T]` iterates over all property keys in type T
   * - Can add modifiers like `readonly`, `?` (optional), or `-?` (required)
   * - Can transform property types using conditional types and other type operators
   * - Enable creation of related types without manual duplication
   * - Essential for type-safe state management and form handling
   *
   * Advanced patterns:
   * - Property transformation and validation
   * - Event handler type generation
   * - State transition type safety
   * - Configuration object typing
   */
  test_mapped_types(): void {
    interface User {
      id: number;
      name: string;
      email: string;
      isActive: boolean;
    }

    // Make all properties optional and nullable
    type PartialNullable<T> = {
      [P in keyof T]?: T[P] | null;
    };

    // Create event handler types for all properties
    type EventHandlers<T> = {
      [P in keyof T as `on${Capitalize<string & P>}Change`]: (
        value: T[P]
      ) => void;
    };

    // Create getter functions for all properties
    type Getters<T> = {
      [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
    };

    // Transform properties to their string representations
    type Stringify<T> = {
      [P in keyof T]: string;
    };

    // Create validation result types
    type ValidationResults<T> = {
      [P in keyof T]: { isValid: boolean; error?: string };
    };

    const partialUser: PartialNullable<User> = {
      name: "Alice",
      email: null,
      // id and isActive are optional
    };

    const userHandlers: EventHandlers<User> = {
      onIdChange: (value: number) => console.log(`ID changed to ${value}`),
      onNameChange: (value: string) => console.log(`Name changed to ${value}`),
      onEmailChange: (value: string) =>
        console.log(`Email changed to ${value}`),
      onIsActiveChange: (value: boolean) =>
        console.log(`Active status: ${value}`),
    };

    const stringifiedUser: Stringify<User> = {
      id: "123",
      name: "Alice",
      email: "alice@example.com",
      isActive: "true",
    };

    const validationResults: ValidationResults<User> = {
      id: { isValid: true },
      name: { isValid: false, error: "Name is required" },
      email: { isValid: true },
      isActive: { isValid: true },
    };

    this.assertEqual(this.___(), partialUser.name);
    this.assertEqual(null, partialUser.email);
    this.assertEqual(this.___(), partialUser.id);

    this.assertEqual("123", stringifiedUser.id);
    this.assertEqual(this.___(), stringifiedUser.isActive);

    this.assertEqual(true, validationResults.id.isValid);
    this.assertEqual(this.___(), validationResults.name.isValid);
    this.assertEqual("Name is required", validationResults.name.error);
  }

  /**
   * Template Literal Types and Generic String Manipulation
   *
   * Template literal types combine the power of generics with string manipulation,
   * enabling type-safe string operations and pattern matching at the type level.
   * This is particularly useful for API route typing, CSS-in-JS, and configuration systems.
   *
   * Key Concepts:
   * - Template literal types use backticks and ${} syntax like regular template literals
   * - Can extract and manipulate parts of string literal types
   * - Enable type-safe string pattern matching and construction
   * - Work with utility types like Uppercase, Lowercase, Capitalize, Uncapitalize
   * - Essential for modern TypeScript patterns in frameworks and libraries
   *
   * Real-world applications:
   * - Route parameter extraction
   * - CSS property typing
   * - Event name generation
   * - API endpoint construction
   */
  test_template_literal_types_with_generics(): void {
    // Extract route parameters from URL patterns
    type ExtractRouteParams<T extends string> =
      T extends `${infer Start}:${infer Param}/${infer Rest}`
        ? { [K in Param]: string } & ExtractRouteParams<`/${Rest}`>
        : T extends `${infer Start}:${infer Param}`
        ? { [K in Param]: string }
        : {};

    // Generate event handler names
    type EventName<T extends string> = `on${Capitalize<T>}`;

    // Create CSS property types
    type CSSProperties<T extends string> = {
      [K in T as `${K}Property`]: string;
    };

    // API endpoint builder
    type ApiEndpoint<
      Base extends string,
      Resource extends string
    > = `${Base}/api/${Resource}`;

    // Database operation types
    type DatabaseOp<
      Table extends string,
      Op extends string
    > = `${Op}_${Uppercase<Table>}`;

    // Test template literal types with functions
    function createEventHandler<T extends string>(eventName: T): EventName<T> {
      return `on${eventName.charAt(0).toUpperCase()}${eventName.slice(
        1
      )}` as EventName<T>;
    }

    function buildApiUrl<T extends string>(
      resource: T
    ): ApiEndpoint<"https://api.example.com", T> {
      return `https://api.example.com/api/${resource}` as ApiEndpoint<
        "https://api.example.com",
        T
      >;
    }

    function createDbOperation<T extends string, O extends string>(
      table: T,
      operation: O
    ): DatabaseOp<T, O> {
      return `${operation}_${table.toUpperCase()}` as DatabaseOp<T, O>;
    }

    const clickHandler = createEventHandler("click");
    const userApiUrl = buildApiUrl("users");
    const selectUsersOp = createDbOperation("users", "SELECT");
    const insertPostsOp = createDbOperation("posts", "INSERT");

    // Test the generated strings
    this.assertEqual(this.___(), clickHandler);
    this.assertEqual("onFocus", createEventHandler("focus"));
    this.assertEqual(this.___(), userApiUrl);
    this.assertEqual(
      "https://api.example.com/api/products",
      buildApiUrl("products")
    );
    this.assertEqual(this.___(), selectUsersOp);
    this.assertEqual("INSERT_POSTS", insertPostsOp);
  }

  /**
   * Generic Type Inference and the `infer` Keyword
   *
   * The `infer` keyword enables TypeScript to infer types within conditional types,
   * allowing for sophisticated type extraction and manipulation patterns.
   * This is a powerful tool for creating flexible, reusable type utilities.
   *
   * Key Concepts:
   * - `infer` introduces a type variable within conditional types
   * - Enables extraction of types from complex type structures
   * - Can infer multiple types in different positions
   * - Essential for building advanced utility types
   * - Used extensively in TypeScript's built-in utility types
   *
   * Common patterns:
   * - Function parameter and return type extraction
   * - Array element type extraction
   * - Promise unwrapping
   * - Tuple manipulation
   */
  test_generic_type_inference(): void {
    // Extract function parameter types
    type Parameters<T> = T extends (...args: infer P) => any ? P : never;

    // Extract function return type
    type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

    // Extract Promise type
    type Awaited<T> = T extends Promise<infer U> ? U : T;

    // Extract array element type
    type ElementType<T> = T extends (infer U)[] ? U : never;

    // Extract object property types
    type PropertyTypes<T> = T extends { [K in keyof T]: infer U } ? U : never;

    // Complex nested type extraction
    type DeepExtract<T> = T extends {
      data: {
        items: Array<infer U>;
        meta: { count: infer V };
      };
    }
      ? { item: U; count: V }
      : never;

    // Test functions to demonstrate inference
    function processUser(
      id: number,
      name: string,
      active: boolean
    ): { processed: boolean } {
      return { processed: true };
    }

    async function fetchData(): Promise<{ users: string[]; count: number }> {
      return { users: ["Alice", "Bob"], count: 2 };
    }

    const numbers = [1, 2, 3, 4, 5];
    const users = [{ name: "Alice" }, { name: "Bob" }];

    type ProcessUserParams = Parameters<typeof processUser>; // [number, string, boolean]
    type ProcessUserReturn = ReturnType<typeof processUser>; // { processed: boolean }
    type FetchDataResult = Awaited<ReturnType<typeof fetchData>>; // { users: string[]; count: number }
    type NumberElement = ElementType<typeof numbers>; // number
    type UserElement = ElementType<typeof users>; // { name: string }

    // We can't test types directly, but we can test behavior
    const params: ProcessUserParams = [123, "Alice", true];
    const result: ProcessUserReturn = { processed: true };

    // Test with actual values that would match the inferred types
    this.assertEqual(123, params[0]);
    this.assertEqual(this.___(), params[1]);
    this.assertEqual(true, params[2]);
    this.assertEqual(this.___(), result.processed);

    // Test array operations that use element types
    const firstNumber = numbers[0];
    const firstUser = users[0];

    this.assertEqual(1, firstNumber);
    this.assertEqual(this.___(), firstUser.name);
  }

  /**
   * Advanced Generic Patterns and Real-World Applications
   *
   * This test explores sophisticated generic patterns used in production TypeScript
   * applications. These patterns combine multiple generic concepts to create
   * powerful, type-safe APIs and data structures.
   *
   * Key Concepts:
   * - Higher-order generics (generics that take generic types as parameters)
   * - Generic type factories and builders
   * - Recursive generic types for tree structures
   * - Generic constraints with multiple bounds
   * - Covariance and contravariance in generic types
   *
   * Real-world patterns:
   * - State management systems
   * - Form validation libraries
   * - Database ORM systems
   * - API client libraries
   * - Plugin architectures
   */
  test_advanced_generic_patterns(): void {
    // Higher-order generic - a generic that works with other generics
    type Apply<F, T> = F extends (arg: infer A) => infer R
      ? T extends A
        ? R
        : never
      : never;

    // Generic state machine
    interface StateMachine<S, E, C = {}> {
      currentState: S;
      context: C;
      transition(event: E): StateMachine<S, E, C>;
      canTransition(event: E): boolean;
    }

    // Recursive generic type for tree structures
    interface TreeNode<T> {
      value: T;
      children: TreeNode<T>[];
      parent?: TreeNode<T>;
    }

    // Generic builder pattern with fluent interface
    class QueryBuilder<T, Selected = never> {
      private conditions: string[] = [];
      private selectedFields: string[] = [];

      where<K extends keyof T>(
        field: K,
        value: T[K]
      ): QueryBuilder<T, Selected> {
        this.conditions.push(`${String(field)} = ${value}`);
        return this;
      }

      select<K extends keyof T>(...fields: K[]): QueryBuilder<T, Selected | K> {
        this.selectedFields.push(...fields.map(String));
        return this;
      }

      build(): {
        conditions: string[];
        fields: string[];
        hasSelection: Selected extends never ? false : true;
      } {
        return {
          conditions: this.conditions,
          fields: this.selectedFields,
          hasSelection: (this.selectedFields.length > 0) as any,
        };
      }
    }

    // Generic plugin system
    interface Plugin<T, M = {}> {
      name: string;
      install(target: T): T & M;
      uninstall(target: T & M): T;
    }

    // Test the advanced patterns
    interface User {
      id: number;
      name: string;
      email: string;
      age: number;
    }

    // Tree structure test
    const userTree: TreeNode<User> = {
      value: { id: 1, name: "Root", email: "root@example.com", age: 0 },
      children: [
        {
          value: { id: 2, name: "Alice", email: "alice@example.com", age: 30 },
          children: [],
        },
        {
          value: { id: 3, name: "Bob", email: "bob@example.com", age: 25 },
          children: [],
        },
      ],
    };

    // Query builder test
    const query = new QueryBuilder<User>()
      .where("name", "Alice")
      .where("age", 30)
      .select("id", "name", "email")
      .build();

    this.assertEqual(this.___(), userTree.value.name);
    this.assertEqual(2, userTree.children.length);
    this.assertEqual(this.___(), userTree.children[0].value.name);
    this.assertEqual("bob@example.com", userTree.children[1].value.email);

    this.assertEqual(2, query.conditions.length);
    this.assertEqual(this.___(), query.fields.length);
    this.assertEqual("name = Alice", query.conditions[0]);
    this.assertEqual(this.___(), query.hasSelection);
  }
}
