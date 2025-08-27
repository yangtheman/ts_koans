import { Koan } from "./koan";

export class AboutAdvancedTypes extends Koan {
  constructor() {
    super("AboutAdvancedTypes", "about-advanced-types.ts");
  }

  /**
   * Template Literal Types: Advanced String Manipulation at the Type Level
   *
   * Template literal types represent the pinnacle of TypeScript's string manipulation
   * capabilities, enabling sophisticated pattern matching, extraction, and construction
   * of string types. They're essential for building type-safe APIs, routing systems,
   * and configuration frameworks.
   *
   * Key Concepts:
   * - Template literal types use backticks and ${} interpolation syntax
   * - Can extract parts of strings using `infer` in pattern matching
   * - Work with utility types like Uppercase, Lowercase, Capitalize, Uncapitalize
   * - Enable recursive string processing and complex pattern matching
   * - Essential for modern framework development and API design
   *
   * Real-world applications:
   * - URL route parameter extraction
   * - CSS-in-JS property generation
   * - Database query builders
   * - Event system type safety
   * - Configuration key validation
   */
  test_template_literal_types(): void {
    // Advanced route parameter extraction with nested patterns
    type ExtractPathParams<T extends string> =
      T extends `${infer Start}:${infer Param}/${infer Rest}`
        ? Record<Param, string> & ExtractPathParams<Rest>
        : T extends `${infer Start}:${infer Param}`
        ? Record<Param, string>
        : {};

    // SQL-like query builder with type safety
    type SQLQuery<
      Table extends string,
      Columns extends string,
      Where extends string = never
    > = `SELECT ${Columns} FROM ${Table}${Where extends never
      ? ""
      : ` WHERE ${Where}`}`;

    // CSS property name transformation
    type CSSPropertyName<T extends string> =
      T extends `${infer First}${infer Rest}`
        ? First extends Uppercase<First>
          ? `-${Lowercase<First>}${CSSPropertyName<Rest>}`
          : `${First}${CSSPropertyName<Rest>}`
        : "";

    // Environment variable type generation
    type EnvVarName<T extends string> = `${Uppercase<T>}_${string}`;

    // Test route parameter extraction
    type UserRouteParams = ExtractPathParams<"/users/:userId/posts/:postId">;
    const userParams: UserRouteParams = { userId: "123", postId: "456" };

    // Test SQL query construction
    type UserQuery = SQLQuery<"users", "id, name, email", "active = 1">;
    const query: UserQuery =
      "SELECT id, name, email FROM users WHERE active = 1";

    // Test CSS property transformation
    type BorderRadius = CSSPropertyName<"borderRadius">; // '-border-radius'

    this.assertEqual(this.___(), userParams.userId);
    this.assertEqual(this.___(), userParams.postId);
    this.assertEqual(this.___(), query.includes("SELECT"));
    this.assertEqual(true, query.includes("WHERE"));

    // Advanced pattern: API endpoint versioning
    type APIVersion = "v1" | "v2" | "v3";
    type APIEndpoint<
      V extends APIVersion,
      Resource extends string
    > = `/api/${V}/${Resource}`;

    type UserEndpoint = APIEndpoint<"v2", "users">;
    const endpoint: UserEndpoint = "/api/v2/users";

    this.assertEqual(this.___(), endpoint.includes("v2"));
    this.assertEqual(this.___(), endpoint);
  }

  /**
   * Recursive Types: Building Self-Referential Type Structures
   *
   * Recursive types are fundamental for modeling hierarchical data structures,
   * nested objects, and complex data patterns. They enable TypeScript to understand
   * and type-check deeply nested structures while maintaining type safety.
   *
   * Key Concepts:
   * - Types that reference themselves to create infinite depth structures
   * - Essential for JSON, DOM trees, file systems, and nested data modeling
   * - TypeScript has recursion depth limits (around 47 levels) for performance
   * - Conditional types control recursion termination and prevent infinite loops
   * - Can be combined with mapped types for powerful transformations
   *
   * Advanced patterns:
   * - Deep partial and deep readonly transformations
   * - Flattening nested structures
   * - Path-based property access
   * - Tree traversal type operations
   * - Recursive validation schemas
   */
  test_recursive_types(): void {
    // Deep partial - makes all nested properties optional recursively
    type DeepPartial<T> = {
      [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    };

    // Deep readonly - makes all nested properties readonly recursively
    type DeepReadonly<T> = {
      readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
    };

    // Path-based property access for nested objects
    type PropertyPath<T, K extends keyof T = keyof T> = K extends string
      ? T[K] extends Record<string, any>
        ? `${K}` | `${K}.${PropertyPath<T[K]>}`
        : `${K}`
      : never;

    // Recursive flatten type for nested structures
    type Flatten<T> = T extends (infer U)[]
      ? Flatten<U>[]
      : T extends object
      ? { [K in keyof T]: Flatten<T[K]> }
      : T;

    interface NestedConfig {
      database: {
        host: string;
        port: number;
        credentials: {
          username: string;
          password: string;
        };
      };
      cache: {
        enabled: boolean;
        ttl: number;
      };
    }

    // Test deep partial
    const partialConfig: DeepPartial<NestedConfig> = {
      database: {
        host: "localhost",
        credentials: {
          username: "admin",
          // password is optional due to DeepPartial
        },
      },
      // cache is completely optional
    };

    // Test deep readonly
    const readonlyConfig: DeepReadonly<NestedConfig> = {
      database: {
        host: "prod-host",
        port: 5432,
        credentials: {
          username: "user",
          password: "secret",
        },
      },
      cache: {
        enabled: true,
        ttl: 3600,
      },
    };

    // Test path-based access
    type ConfigPaths = PropertyPath<NestedConfig>;
    const pathExample: ConfigPaths = "database.credentials.username";

    this.assertEqual(this.___(), partialConfig.database?.host);
    this.assertEqual(this.___(), partialConfig.database?.credentials?.username);
    this.assertEqual(this.___(), partialConfig.database?.credentials?.password);

    this.assertEqual(this.___(), readonlyConfig.database.host);
    this.assertEqual(this.___(), readonlyConfig.database.port);
    this.assertEqual(this.___(), readonlyConfig.cache.enabled);

    this.assertEqual(this.___(), pathExample.includes("database"));
    this.assertEqual(true, pathExample.includes("username"));

    // Recursive tree structure
    interface TreeNode<T> {
      value: T;
      children: TreeNode<T>[];
      metadata?: {
        created: Date;
        modified: Date;
        tags: string[];
      };
    }

    const fileSystem: TreeNode<string> = {
      value: "root",
      children: [
        {
          value: "src",
          children: [
            {
              value: "index.ts",
              children: [],
              metadata: {
                created: new Date(),
                modified: new Date(),
                tags: ["typescript", "main"],
              },
            },
          ],
        },
      ],
    };

    this.assertEqual(this.___(), fileSystem.value);
    this.assertEqual(this.___(), fileSystem.children[0].value);
    this.assertEqual(this.___(), fileSystem.children[0].children[0].value);
    this.assertEqual(
      2,
      fileSystem.children[0].children[0].metadata?.tags.length
    );
  }

  /**
   * Advanced Type Inference with the `infer` Keyword
   *
   * The `infer` keyword is TypeScript's most powerful tool for type extraction
   * and manipulation. It enables sophisticated pattern matching and type
   * transformation that would be impossible with traditional approaches.
   *
   * Key Concepts:
   * - `infer` creates type variables within conditional type expressions
   * - Can infer multiple types in different positions of complex type patterns
   * - Essential for building utility types and advanced type transformations
   * - Enables extraction from functions, arrays, promises, and complex structures
   * - Works recursively for nested type extraction
   *
   * Advanced patterns:
   * - Function signature analysis
   * - Deep property extraction
   * - Generic type argument inference
   * - Tuple manipulation and analysis
   * - Promise chain type inference
   */
  test_advanced_type_inference(): void {
    // Advanced function signature analysis
    type AnalyzeFunction<T> = T extends (...args: infer P) => infer R
      ? {
          parameters: P;
          returnType: R;
          arity: P extends readonly unknown[] ? P["length"] : never;
          isAsync: R extends Promise<any> ? true : false;
        }
      : never;

    // Deep object property extraction
    type DeepExtract<T, Path> = Path extends `${infer Head}.${infer Tail}`
      ? T extends Record<Head, infer U>
        ? DeepExtract<U, Tail>
        : never
      : T extends Record<Path & string, infer U>
      ? U
      : never;

    // Tuple analysis and manipulation
    type TupleAnalysis<T extends readonly unknown[]> = {
      head: T extends readonly [infer H, ...unknown[]] ? H : never;
      tail: T extends readonly [unknown, ...infer Rest] ? Rest : never;
      last: T extends readonly [...unknown[], infer L] ? L : never;
      length: T["length"];
    };

    // Promise chain inference
    type PromiseChain<T> = T extends Promise<Promise<infer U>>
      ? PromiseChain<Promise<U>>
      : T extends Promise<infer U>
      ? U
      : T;

    // Test function analysis
    async function processData(
      id: number,
      name: string
    ): Promise<{ success: boolean }> {
      return { success: true };
    }

    type ProcessDataAnalysis = AnalyzeFunction<typeof processData>;

    // Simulating the extracted types with runtime values
    const analysisResult = {
      parameters: [42, "test"] as [number, string],
      returnType: { success: true },
      arity: 2,
      isAsync: true,
    };

    this.assertEqual(this.___(), analysisResult.arity);
    this.assertEqual(this.___(), analysisResult.isAsync);
    this.assertEqual(this.___(), analysisResult.parameters[0]);
    this.assertEqual(this.___(), analysisResult.parameters[1]);

    // Test deep extraction
    const deepObject = {
      user: {
        profile: {
          settings: {
            theme: "dark" as const,
            notifications: true,
          },
        },
      },
    };

    type ThemeType = DeepExtract<
      typeof deepObject,
      "user.profile.settings.theme"
    >;
    const extractedTheme: ThemeType = "dark";

    this.assertEqual(this.___(), extractedTheme);
    this.assertEqual(this.___(), deepObject.user.profile.settings.theme);

    // Test tuple analysis
    const coordinates = [10, 20, 30] as const;
    type CoordAnalysis = TupleAnalysis<typeof coordinates>;

    const tupleInfo = {
      head: 10,
      tail: [20, 30],
      last: 30,
      length: 3,
    };

    this.assertEqual(this.__(), tupleInfo.head);
    this.assertEqual(this.___(), tupleInfo.last);
    this.assertEqual(this.___(), tupleInfo.length);
    this.assertEqual(this.___(), tupleInfo.tail.length);
  }

  /**
   * Conditional Types and Distributive Behavior
   *
   * Conditional types are TypeScript's mechanism for type-level programming,
   * enabling sophisticated type transformations based on type relationships.
   * Understanding their distributive behavior over union types is crucial
   * for building advanced type utilities.
   *
   * Key Concepts:
   * - Conditional types follow the pattern `T extends U ? X : Y`
   * - Distribute over union types unless wrapped in tuples `[T]`
   * - Enable type filtering, transformation, and complex type logic
   * - Essential for building utility types and type-safe APIs
   * - Can be chained and nested for complex type computations
   *
   * Advanced patterns:
   * - Union type filtering and extraction
   * - Type-level boolean logic
   * - Recursive type processing
   * - Type assertion and validation
   * - Complex type transformations
   */
  test_conditional_types_and_distribution(): void {
    // Advanced union filtering with multiple conditions
    type FilterComplex<T, Condition> = T extends Condition
      ? T extends string
        ? T extends `${string}@${string}`
          ? T // Email-like strings
          : never
        : T extends number
        ? T extends 0
          ? never
          : T // Non-zero numbers
        : never
      : never;

    // Non-distributive conditional for union analysis
    type IsUnion<T> = [T] extends [never]
      ? false
      : T extends any
      ? [Exclude<T, T>] extends [never]
        ? false
        : true
      : false;

    // Type-level boolean operations
    type And<A extends boolean, B extends boolean> = A extends true
      ? B extends true
        ? true
        : false
      : false;

    type Or<A extends boolean, B extends boolean> = A extends true
      ? true
      : B extends true
      ? true
      : false;

    // Complex type validation
    type ValidateUser<T> = T extends {
      id: number;
      email: string;
      name: string;
    }
      ? T["email"] extends `${string}@${string}`
        ? T["name"] extends string
          ? T["name"] extends ""
            ? { valid: false; error: "Name cannot be empty" }
            : { valid: true; data: T }
          : { valid: false; error: "Invalid name type" }
        : { valid: false; error: "Invalid email format" }
      : { valid: false; error: "Missing required fields" };

    // Test union filtering
    type MixedValues =
      | "user@example.com"
      | "invalid-email"
      | 42
      | 0
      | "admin@test.org";
    type FilteredValues = FilterComplex<MixedValues, string | number>;

    const emailValue: FilteredValues = "user@example.com";
    const numberValue: FilteredValues = 42;

    this.assertEqual(this.___(), emailValue.includes("@"));
    this.assertEqual(true, emailValue.includes("example.com"));
    this.assertEqual(this.__(), numberValue);

    // Test union detection
    type SingleType = IsUnion<string>; // false
    type UnionType = IsUnion<string | number>; // true

    const isSingle = false; // Simulating IsUnion<string>
    const isUnion = true; // Simulating IsUnion<string | number>

    this.assertEqual(this.___(), isSingle);
    this.assertEqual(this.___(), isUnion);

    // Test boolean operations
    type TrueAndTrue = And<true, true>; // true
    type TrueAndFalse = And<true, false>; // false
    type FalseOrTrue = Or<false, true>; // true

    const andResult = true; // Simulating And<true, true>
    const andResult2 = false; // Simulating And<true, false>
    const orResult = true; // Simulating Or<false, true>

    this.assertEqual(this.___(), andResult);
    this.assertEqual(this.___(), andResult2);
    this.assertEqual(this.___(), orResult);

    // Test type validation
    const validUser = { id: 1, email: "user@example.com", name: "Alice" };
    const invalidUser = { id: 1, email: "invalid-email", name: "Bob" };

    type ValidUserResult = ValidateUser<typeof validUser>;
    type InvalidUserResult = ValidateUser<typeof invalidUser>;

    const validationResult = { valid: true, data: validUser };
    const invalidationResult = { valid: false, error: "Invalid email format" };

    this.assertEqual(this.___(), validationResult.valid);
    this.assertEqual(validUser, validationResult.data);
    this.assertEqual(this.___(), invalidationResult.valid);
    this.assertEqual(this.___(), invalidationResult.error.includes("email"));
  }

  /**
   * Mapped Types and Key Manipulation
   *
   * Mapped types enable sophisticated transformations of object types by
   * iterating over their properties and applying transformations. Combined
   * with key manipulation techniques, they provide powerful type construction capabilities.
   *
   * Key Concepts:
   * - `[P in keyof T]` iterates over all property keys
   * - Key remapping with `as` clause transforms property names
   * - Template literal types enable complex key transformations
   * - Can add/remove modifiers (readonly, optional) dynamically
   * - Essential for creating related types and API transformations
   *
   * Advanced patterns:
   * - Property filtering and selection
   * - Key transformation and renaming
   * - Nested property manipulation
   * - Dynamic interface generation
   * - Configuration object typing
   */
  test_mapped_types_and_key_manipulation(): void {
    // Advanced property transformation with filtering
    type TransformProperties<T, Condition, Transform> = {
      [K in keyof T as T[K] extends Condition
        ? K extends string
          ? Transform extends "uppercase"
            ? Uppercase<K>
            : Transform extends "prefix"
            ? `get${Capitalize<K>}`
            : Transform extends "suffix"
            ? `${K}Changed`
            : K
          : K
        : never]: T[K];
    };

    // Create event handlers for all properties
    type CreateEventHandlers<T> = {
      [K in keyof T as `on${Capitalize<string & K>}Change`]: (
        newValue: T[K],
        oldValue: T[K]
      ) => void;
    } & {
      [K in keyof T as `validate${Capitalize<string & K>}`]: (
        value: T[K]
      ) => boolean;
    };

    // Deep property path type generation
    type PropertyPaths<T, Prefix extends string = ""> = {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${Prefix}${K}` | PropertyPaths<T[K], `${Prefix}${K}.`>
          : `${Prefix}${K}`
        : never;
    }[keyof T];

    // Flatten nested objects maintaining key paths
    type FlattenObject<T, Prefix extends string = ""> = {
      [K in keyof T as K extends string ? `${Prefix}${K}` : never]: T[K];
    };

    interface User {
      id: number;
      name: string;
      email: string;
      isActive: boolean;
      profile: {
        avatar: string;
        bio: string;
        settings: {
          theme: "light" | "dark";
          notifications: boolean;
        };
      };
    }

    // Test property transformation
    type StringProperties = TransformProperties<User, string, "prefix">;

    const stringProps = {
      getName: "Alice",
      getEmail: "alice@example.com",
    };

    this.assertEqual(this.___(), stringProps.getName);
    this.assertEqual(this.___(), stringProps.getEmail);

    // Test event handlers
    type UserEventHandlers = CreateEventHandlers<Pick<User, "name" | "email">>;

    const handlers: UserEventHandlers = {
      onNameChange: (newValue: string, oldValue: string) => {
        console.log(`Name changed from ${oldValue} to ${newValue}`);
      },
      onEmailChange: (newValue: string, oldValue: string) => {
        console.log(`Email changed from ${oldValue} to ${newValue}`);
      },
      validateName: (value: string) => value.length > 0,
      validateEmail: (value: string) => value.includes("@"),
    };

    const nameValid = handlers.validateName("Alice");
    const emailValid = handlers.validateEmail("alice@example.com");

    this.assertEqual(this.___(), nameValid);
    this.assertEqual(this.___(), emailValid);

    // Test property paths
    type UserPaths = PropertyPaths<User>;
    const userPath: UserPaths = "profile.settings.theme";
    const anotherPath: UserPaths = "name";

    this.assertEqual(this.___(), userPath.includes("profile"));
    this.assertEqual(true, userPath.includes("theme"));
    this.assertEqual(this.___(), anotherPath);

    // Simulate accessing nested properties via paths
    const user: User = {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      isActive: true,
      profile: {
        avatar: "avatar.jpg",
        bio: "Software developer",
        settings: {
          theme: "dark",
          notifications: true,
        },
      },
    };

    this.assertEqual(this.___(), user.profile.settings.theme);
    this.assertEqual(this.___(), user.profile.bio);
  }

  /**
   * Branded Types and Phantom Types: Creating Distinct Types from Primitives
   *
   * Branded types (also called phantom types) solve the problem of primitive
   * obsession by creating distinct types from the same underlying primitive.
   * This prevents accidental mixing of semantically different values and
   * enables more expressive and type-safe APIs.
   *
   * Key Concepts:
   * - Use intersection with unique symbols or literal types to create brands
   * - Prevent accidental mixing of structurally identical but semantically different types
   * - Enable creation of domain-specific type systems
   * - Essential for IDs, measurements, currencies, and other domain values
   * - Can encode invariants and validation rules at the type level
   *
   * Real-world applications:
   * - User IDs vs Product IDs prevention
   * - Currency type safety (USD vs EUR)
   * - Measurement units (meters vs feet)
   * - Email addresses vs regular strings
   * - Validated vs unvalidated data
   */
  test_branded_types(): void {
    // Advanced branded type system with validation
    const __brand = Symbol("brand");
    type Brand<T, TBrand extends string> = T & {
      readonly [__brand]: TBrand;
    };

    // Domain-specific branded types
    type UserId = Brand<number, "UserId">;
    type ProductId = Brand<number, "ProductId">;
    type Email = Brand<string, "Email">;
    type ValidatedPassword = Brand<string, "ValidatedPassword">;
    type Currency<T extends string> = Brand<number, `Currency:${T}`>;
    type USD = Currency<"USD">;
    type EUR = Currency<"EUR">;

    // Smart constructors with validation
    function createUserId(value: number): UserId | null {
      return value > 0 ? (value as UserId) : null;
    }

    function createEmail(value: string): Email | null {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? (value as Email) : null;
    }

    function createValidatedPassword(value: string): ValidatedPassword | null {
      const hasLength = value.length >= 8;
      const hasDigit = /\d/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      return hasLength && hasDigit && hasSpecial
        ? (value as ValidatedPassword)
        : null;
    }

    function createUSD(value: number): USD {
      return (Math.round(value * 100) / 100) as USD; // Round to cents
    }

    function createEUR(value: number): EUR {
      return (Math.round(value * 100) / 100) as EUR; // Round to cents
    }

    // Type-safe operations with branded types
    function getUserById(id: UserId): { id: UserId; name: string } {
      return { id, name: `User ${id}` };
    }

    function sendEmail(to: Email, subject: string): boolean {
      console.log(`Sending email to ${to}: ${subject}`);
      return true;
    }

    function convertCurrency(amount: USD, rate: number): EUR {
      return createEUR((amount as number) * rate);
    }

    // Test branded type creation and validation
    const userId = createUserId(123);
    const invalidUserId = createUserId(-1);

    const email = createEmail("user@example.com");
    const invalidEmail = createEmail("invalid-email");

    const password = createValidatedPassword("SecurePass123!");
    const weakPassword = createValidatedPassword("weak");

    const usdAmount = createUSD(100.456); // Rounds to 100.46
    const eurAmount = convertCurrency(usdAmount, 0.85);

    this.assertEqual(this.___(), userId !== null);
    this.assertEqual(null, invalidUserId);

    this.assertEqual(this.___(), email !== null);
    this.assertEqual(this.___(), invalidEmail);

    this.assertEqual(this.___(), password !== null);
    this.assertEqual(null, weakPassword);

    if (userId && email) {
      const user = getUserById(userId);
      const emailSent = sendEmail(email, "Welcome!");

      this.assertEqual(this.___(), user.id as number);
      this.assertEqual(this.___(), user.name.includes("User"));
      this.assertEqual(this.___(), emailSent);
    }

    this.assertEqual(100.46, usdAmount as number);
    this.assertEqual(this.___(), Math.round((eurAmount as number) * 100)); // 85.39 rounded to cents
  }

  /**
   * Function Overloads and Advanced Function Types
   *
   * Function overloads provide multiple type signatures for the same function,
   * enabling different behavior patterns based on input types. Combined with
   * conditional types and generics, they create powerful, type-safe APIs.
   *
   * Key Concepts:
   * - Multiple function signatures for different parameter combinations
   * - Implementation signature must be compatible with all overloads
   * - TypeScript selects the most specific matching overload
   * - Essential for flexible APIs that handle multiple input patterns
   * - Can be combined with generics for advanced type inference
   *
   * Advanced patterns:
   * - Conditional return types based on parameters
   * - Generic constraint-based overloads
   * - Builder pattern implementations
   * - API method chaining
   * - Configuration object handling
   */
  test_function_overloads(): void {
    // Advanced API client with overloaded methods
    interface ApiResponse<T> {
      data: T;
      status: number;
      headers: Record<string, string>;
    }

    class ApiClient {
      // Overloaded request method
      request<T>(url: string): Promise<ApiResponse<T>>;
      request<T>(url: string, method: "GET"): Promise<ApiResponse<T>>;
      request<T>(
        url: string,
        method: "POST",
        body: unknown
      ): Promise<ApiResponse<T>>;
      request<T>(
        url: string,
        method: "PUT",
        body: unknown
      ): Promise<ApiResponse<T>>;
      request<T>(url: string, method: "DELETE"): Promise<ApiResponse<T>>;
      request<T>(
        url: string,
        method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
        body?: unknown
      ): Promise<ApiResponse<T>> {
        // Implementation would make actual HTTP request
        return Promise.resolve({
          data: {} as T,
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }

      // Overloaded find methods with different return types
      find<T>(collection: string, id: string): Promise<T | null>;
      find<T>(collection: string, query: Record<string, unknown>): Promise<T[]>;
      find<T>(
        collection: string,
        idOrQuery: string | Record<string, unknown>
      ): Promise<T | null | T[]> {
        if (typeof idOrQuery === "string") {
          return Promise.resolve({} as T);
        } else {
          return Promise.resolve([] as T[]);
        }
      }
    }

    // Advanced query builder with method overloading
    class QueryBuilder<T> {
      private conditions: Array<{
        field: keyof T;
        operator: string;
        value: unknown;
      }> = [];
      private selectedFields: Array<keyof T> = [];

      // Overloaded where method for different operator types
      where<K extends keyof T>(field: K, value: T[K]): this;
      where<K extends keyof T>(field: K, operator: "=", value: T[K]): this;
      where<K extends keyof T>(
        field: K,
        operator: "!=" | ">" | "<" | ">=" | "<=",
        value: T[K]
      ): this;
      where<K extends keyof T>(field: K, operator: "in", value: T[K][]): this;
      where<K extends keyof T>(
        field: K,
        operatorOrValue: T[K] | "=" | "!=" | ">" | "<" | ">=" | "<=" | "in",
        value?: T[K] | T[K][]
      ): this {
        if (value === undefined) {
          this.conditions.push({
            field,
            operator: "=",
            value: operatorOrValue,
          });
        } else {
          this.conditions.push({
            field,
            operator: operatorOrValue as string,
            value,
          });
        }
        return this;
      }

      select<K extends keyof T>(...fields: K[]): this {
        this.selectedFields.push(...fields);
        return this;
      }

      build(): {
        conditions: Array<{ field: keyof T; operator: string; value: unknown }>;
        fields: Array<keyof T>;
        conditionCount: number;
        fieldCount: number;
      } {
        return {
          conditions: this.conditions,
          fields: this.selectedFields,
          conditionCount: this.conditions.length,
          fieldCount: this.selectedFields.length,
        };
      }
    }

    interface User {
      id: number;
      name: string;
      email: string;
      age: number;
    }

    // Test overloaded API client
    const client = new ApiClient();

    // These would return different types based on overloads
    const getUserPromise = client.find<User>("users", "123"); // Promise<User | null>
    const searchUsersPromise = client.find<User>("users", { active: true }); // Promise<User[]>

    // Test query builder with overloaded methods
    const query = new QueryBuilder<User>()
      .where("name", "Alice") // Simple equality
      .where("age", ">", 18) // Comparison operator
      .where("email", "in", ["a@test.com", "b@test.com"]) // Array membership
      .select("id", "name", "email")
      .build();

    this.assertEqual(this.___(), query.conditionCount);
    this.assertEqual(this.___(), query.fieldCount);
    this.assertEqual(this.___(), query.conditions[0].field);
    this.assertEqual(this.___(), query.conditions[0].value);
    this.assertEqual(this.___(), query.conditions[1].operator);
    this.assertEqual(this.__(), query.conditions[1].value);
    this.assertEqual(this.___(), query.conditions[2].operator);
    this.assertEqual(2, (query.conditions[2].value as string[]).length);
  }

  /**
   * Module Augmentation and Declaration Merging
   *
   * Module augmentation and declaration merging enable extending existing types
   * and modules, including third-party libraries and built-in TypeScript types.
   * This is essential for creating flexible, extensible type systems.
   *
   * Key Concepts:
   * - `declare module` extends existing module interfaces
   * - Interface merging combines multiple interface declarations
   * - Namespace merging allows extending functionality
   * - Global augmentation affects the global scope
   * - Essential for library extensions and framework plugins
   *
   * Advanced patterns:
   * - Plugin architecture typing
   * - Third-party library extensions
   * - Built-in type enhancements
   * - Framework-specific augmentations
   * - Type-safe monkey patching
   */
  test_module_augmentation(): void {
    // Simulate module augmentation patterns (normally done at module level)

    // Custom utility extensions
    interface ArrayExtensions<T> {
      first(): T | undefined;
      last(): T | undefined;
      isEmpty(): boolean;
      chunk(size: number): T[][];
      unique(): T[];
    }

    interface StringExtensions {
      toTitleCase(): string;
      truncate(length: number, suffix?: string): string;
      isEmail(): boolean;
      stripHtml(): string;
    }

    interface NumberExtensions {
      toOrdinal(): string;
      toCurrency(locale?: string, currency?: string): string;
      isEven(): boolean;
      isOdd(): boolean;
    }

    // Implementation functions (simulating augmented prototypes)
    function implementArrayExtensions<T>(arr: T[]): ArrayExtensions<T> {
      return {
        first: () => arr[0],
        last: () => arr[arr.length - 1],
        isEmpty: () => arr.length === 0,
        chunk: (size: number) => {
          const chunks: T[][] = [];
          for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
          }
          return chunks;
        },
        unique: () => [...new Set(arr)],
      };
    }

    function implementStringExtensions(str: string): StringExtensions {
      return {
        toTitleCase: () =>
          str.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          ),
        truncate: (length: number, suffix = "...") =>
          str.length > length ? str.substring(0, length) + suffix : str,
        isEmail: () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str),
        stripHtml: () => str.replace(/<[^>]*>/g, ""),
      };
    }

    function implementNumberExtensions(num: number): NumberExtensions {
      return {
        toOrdinal: () => {
          const suffixes = ["th", "st", "nd", "rd"];
          const remainder = num % 100;
          return (
            num +
            (suffixes[(remainder - 20) % 10] ||
              suffixes[remainder] ||
              suffixes[0])
          );
        },
        toCurrency: (locale = "en-US", currency = "USD") =>
          new Intl.NumberFormat(locale, { style: "currency", currency }).format(
            num
          ),
        isEven: () => num % 2 === 0,
        isOdd: () => num % 2 !== 0,
      };
    }

    // Plugin system simulation
    interface PluginRegistry {
      plugins: Map<string, unknown>;
      register<T>(name: string, plugin: T): void;
      get<T>(name: string): T | undefined;
      has(name: string): boolean;
    }

    const pluginRegistry: PluginRegistry = {
      plugins: new Map(),
      register<T>(name: string, plugin: T) {
        this.plugins.set(name, plugin);
      },
      get<T>(name: string): T | undefined {
        return this.plugins.get(name) as T | undefined;
      },
      has(name: string): boolean {
        return this.plugins.has(name);
      },
    };

    // Test array extensions
    const numbers = [1, 2, 3, 4, 5, 2, 3];
    const arrayExt = implementArrayExtensions(numbers);

    this.assertEqual(1, arrayExt.first());
    this.assertEqual(this.___(), arrayExt.last());
    this.assertEqual(false, arrayExt.isEmpty());
    this.assertEqual(2, arrayExt.chunk(3).length);
    this.assertEqual(this.___(), arrayExt.unique().length); // [1, 2, 3, 4, 5]

    // Test string extensions
    const text = "hello world <b>HTML</b>";
    const stringExt = implementStringExtensions(text);

    this.assertEqual(this.___(), stringExt.toTitleCase());
    this.assertEqual("hello wo...", stringExt.truncate(8));
    this.assertEqual(false, stringExt.isEmail());
    this.assertEqual(this.___(), stringExt.stripHtml());

    // Test number extensions
    const number = 42;
    const numberExt = implementNumberExtensions(number);

    this.assertEqual(this.___(), numberExt.toOrdinal());
    this.assertEqual(true, numberExt.isEven());
    this.assertEqual(this.___(), numberExt.isOdd());

    // Test plugin system
    pluginRegistry.register("logger", {
      log: (msg: string) => console.log(msg),
    });
    pluginRegistry.register("cache", new Map<string, unknown>());

    this.assertEqual(true, pluginRegistry.has("logger"));
    this.assertEqual(this.___(), pluginRegistry.has("database"));

    const logger = pluginRegistry.get<{ log: (msg: string) => void }>("logger");
    this.assertEqual(this.___(), typeof logger?.log === "function");
  }
}
