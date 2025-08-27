import { Koan } from "./koan";

export class AboutEnumsAndUnions extends Koan {
  constructor() {
    super("AboutEnumsAndUnions", "about-enums-unions.ts");
  }

  /**
   * Enum Fundamentals and Numeric Enums
   *
   * Enums are a fundamental TypeScript feature for defining named constants.
   * They provide a way to define a set of related named constants, making code
   * more readable and maintainable. Understanding different enum types and their
   * behavior is crucial for effective TypeScript development.
   *
   * Key Concepts:
   * - Numeric enums and auto-incrementing values
   * - Explicit numeric enum values and heterogeneous enums
   * - Reverse mapping in numeric enums
   * - Computed and constant members
   * - Enum member types and literal enums
   *
   * Advanced patterns:
   * - Enum as types and values
   * - Const enums for compile-time inlining
   * - Ambient enums for external constants
   * - Enum merging and declaration merging
   * - Performance considerations and tree-shaking
   */
  test_enum_fundamentals_and_numeric_enums(): void {
    // Basic numeric enum with auto-incrementing values
    enum Status {
      Pending, // 0
      Approved, // 1
      Rejected, // 2
      Archived, // 3
    }

    this.assertEqual(this.___(), Status.Pending);
    this.assertEqual(this.___(), Status.Approved);
    this.assertEqual(this.___(), Status.Rejected);
    this.assertEqual(this.___(), Status.Archived);

    // Reverse mapping - numeric enums support reverse lookup
    this.assertEqual(this.___(), Status[0]);
    this.assertEqual(this.___(), Status[1]);
    this.assertEqual(this.___(), Status[2]);

    // Explicit numeric values
    enum Priority {
      Low = 1,
      Medium = 5,
      High = 10,
      Critical = 100,
    }

    this.assertEqual(this.___(), Priority.Low);
    this.assertEqual(this.___(), Priority.Medium);
    this.assertEqual(this.___(), Priority.High);
    this.assertEqual(this.___(), Priority.Critical);

    // Mixed auto and explicit values
    enum ResponseCode {
      Success = 200,
      NotFound = 404,
      ServerError, // 405 (continues from previous)
      BadGateway, // 406
    }

    this.assertEqual(this.___(), ResponseCode.Success);
    this.assertEqual(this.___(), ResponseCode.NotFound);
    this.assertEqual(this.___(), ResponseCode.ServerError);
    this.assertEqual(this.___(), ResponseCode.BadGateway);

    // Computed enum members
    enum FileAccess {
      None,
      Read = 1 << 1, // 2
      Write = 1 << 2, // 4
      ReadWrite = Read | Write, // 6
    }

    this.assertEqual(this.___(), FileAccess.None);
    this.assertEqual(this.___(), FileAccess.Read);
    this.assertEqual(this.___(), FileAccess.Write);
    this.assertEqual(this.___(), FileAccess.ReadWrite);

    // Using enums in functions
    function getStatusMessage(status: Status): string {
      switch (status) {
        case Status.Pending:
          return "Waiting for review";
        case Status.Approved:
          return "Request approved";
        case Status.Rejected:
          return "Request denied";
        case Status.Archived:
          return "Request archived";
        default:
          return "Unknown status";
      }
    }

    this.assertEqual(this.___(), getStatusMessage(Status.Pending));
    this.assertEqual("Request approved", getStatusMessage(Status.Approved));
    this.assertEqual(this.___(), getStatusMessage(Status.Rejected));

    // Enum as object keys
    const statusColors = {
      [Status.Pending]: "yellow",
      [Status.Approved]: "green",
      [Status.Rejected]: "red",
      [Status.Archived]: "gray",
    };

    this.assertEqual(this.___(), statusColors[Status.Pending]);
    this.assertEqual(this.___(), statusColors[Status.Approved]);
    this.assertEqual(this.___(), statusColors[Status.Rejected]);

    // Heterogeneous enums (mixed string and numeric)
    enum Mixed {
      No = 0,
      Yes = "YES",
      Unknown = 1,
    }

    this.assertEqual(this.___(), Mixed.No);
    this.assertEqual(this.___(), Mixed.Yes);
    this.assertEqual(this.___(), Mixed.Unknown);
  }

  /**
   * String Enums and Literal Types
   *
   * String enums provide better debugging experience and more semantic meaning
   * than numeric enums. They're especially useful for representing states, themes,
   * or any categorical data that benefits from meaningful string values.
   *
   * Key Concepts:
   * - String enum definition and usage
   * - String literal types for union constraints
   * - Template literal types for dynamic string patterns
   * - Const assertions for readonly literal types
   * - Branded types for stronger type safety
   *
   * Advanced patterns:
   * - String enum serialization and API integration
   * - Literal type inference and widening
   * - Discriminated unions with literal types
   * - Exhaustiveness checking with never type
   * - Performance considerations of string vs numeric enums
   */
  test_string_enums_and_literal_types(): void {
    // String enums with explicit string values
    enum Theme {
      Light = "light",
      Dark = "dark",
      Auto = "auto",
      HighContrast = "high-contrast",
    }

    this.assertEqual(this.___(), Theme.Light);
    this.assertEqual(this.___(), Theme.Dark);
    this.assertEqual(this.___(), Theme.Auto);
    this.assertEqual(this.___(), Theme.HighContrast);

    // String literal types
    type Direction = "north" | "south" | "east" | "west";
    type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

    const move: Direction = "north";
    const apiCall: HttpMethod = "GET";

    this.assertEqual(this.___(), move);
    this.assertEqual(this.___(), apiCall);

    // Function with literal type parameters
    function navigate(direction: Direction): string {
      return `Moving ${direction}`;
    }

    function makeRequest(method: HttpMethod, url: string): string {
      return `${method} request to ${url}`;
    }

    this.assertEqual(this.___(), navigate("north"));
    this.assertEqual(
      "POST request to /api/users",
      makeRequest("POST", "/api/users")
    );

    // Template literal types (TypeScript 4.1+)
    type EventName<T extends string> = `on${Capitalize<T>}`;
    type EventHandler<T extends string> = EventName<T> extends `on${infer U}`
      ? U
      : never;

    type ClickEvent = EventName<"click">; // "onClick"
    type MouseEvent = EventName<"mouseMove">; // "onMouseMove"

    // We can demonstrate this with simpler template literals
    type ApiEndpoint = `api/${string}`;
    type Version = `v${number}`;

    const endpoint: ApiEndpoint = "api/users";
    const version: Version = "v1";

    this.assertEqual(this.___(), endpoint);
    this.assertEqual(this.___(), version);

    // Const assertions for literal types
    const colors = ["red", "green", "blue"] as const;
    type Color = (typeof colors)[number]; // "red" | "green" | "blue"

    const config = {
      theme: "dark",
      language: "en",
      debug: true,
    } as const;

    // colors is now readonly ["red", "green", "blue"]
    // config properties are now literal types

    this.assertEqual(this.___(), colors[0]);
    this.assertEqual(this.___(), colors[1]);
    this.assertEqual(this.___(), colors.length);

    // Using const assertion in function returns
    function getThemeOptions() {
      return ["light", "dark", "auto"] as const;
    }

    type ThemeOption = ReturnType<typeof getThemeOptions>[number];
    const themeOptions = getThemeOptions();
    const selectedTheme: ThemeOption = themeOptions[1];

    this.assertEqual(this.___(), themeOptions.length);
    this.assertEqual(this.___(), selectedTheme);

    // Branded types for stronger type safety
    type UserId = string & { readonly brand: unique symbol };
    type EmailAddress = string & { readonly brand: unique symbol };

    function createUserId(id: string): UserId {
      return id as UserId;
    }

    function createEmail(email: string): EmailAddress {
      return email as EmailAddress;
    }

    function sendEmail(to: EmailAddress, from: EmailAddress): string {
      return `Email sent from ${from} to ${to}`;
    }

    const userId = createUserId("user-123");
    const userEmail = createEmail("user@example.com");
    const adminEmail = createEmail("admin@example.com");

    // This would cause a compile error if uncommented:
    // sendEmail(userId, adminEmail); // UserId is not assignable to EmailAddress

    this.assertEqual(this.___(), sendEmail(userEmail, adminEmail));

    // Enum-like object with const assertion
    const Status = {
      IDLE: "idle",
      LOADING: "loading",
      SUCCESS: "success",
      ERROR: "error",
    } as const;

    type StatusType = (typeof Status)[keyof typeof Status];

    function handleStatus(status: StatusType): string {
      switch (status) {
        case Status.IDLE:
          return "Ready to start";
        case Status.LOADING:
          return "Processing...";
        case Status.SUCCESS:
          return "Completed successfully";
        case Status.ERROR:
          return "An error occurred";
        default:
          // Exhaustiveness check - should never reach here
          const _exhaustive: never = status;
          return _exhaustive;
      }
    }

    this.assertEqual("Ready to start", handleStatus(Status.IDLE));
    this.assertEqual(this.___(), handleStatus(Status.LOADING));
    this.assertEqual("Completed successfully", handleStatus(Status.SUCCESS));
    this.assertEqual(this.___(), handleStatus(Status.ERROR));
  }

  /**
   * Union Types and Type Narrowing
   *
   * Union types are fundamental to TypeScript's type system, allowing values
   * to be one of several types. Effective use of union types and type narrowing
   * techniques enables writing flexible yet type-safe code.
   *
   * Key Concepts:
   * - Basic union type syntax and usage
   * - Type narrowing with typeof, instanceof, and in operators
   * - Control flow analysis and type guards
   * - Common type inference from union members
   * - Conditional types with unions
   *
   * Advanced patterns:
   * - Complex union type compositions
   * - Union type distribution in mapped types
   * - Exhaustive checking with discriminated unions
   * - Tagged unions for better type safety
   * - Performance implications of union types
   */
  test_union_types_and_narrowing(): void {
    // Basic union types
    type StringOrNumber = string | number;
    type BooleanOrNull = boolean | null;
    type Result<T> = T | Error;

    let value: StringOrNumber = 42;
    this.assertEqual(this.___(), value);
    this.assertEqual(this.___(), typeof value);

    value = "Hello";
    this.assertEqual(this.___(), value);
    this.assertEqual(this.___(), typeof value);

    let flag: BooleanOrNull = true;
    this.assertEqual(this.___(), flag);

    flag = null;
    this.assertEqual(this.___(), flag);

    // Type narrowing with typeof
    function processValue(input: string | number | boolean): string {
      if (typeof input === "string") {
        return input.toUpperCase(); // TypeScript knows input is string here
      } else if (typeof input === "number") {
        return input.toFixed(2); // TypeScript knows input is number here
      } else {
        return input ? "true" : "false"; // TypeScript knows input is boolean here
      }
    }

    this.assertEqual(this.___(), processValue("hello"));
    this.assertEqual("42.00", processValue(42));
    this.assertEqual(this.___(), processValue(true));
    this.assertEqual("false", processValue(false));

    // Union of complex types
    interface Cat {
      type: "cat";
      meow(): string;
      purr(): string;
    }

    interface Dog {
      type: "dog";
      bark(): string;
      wagTail(): string;
    }

    interface Bird {
      type: "bird";
      chirp(): string;
      fly(): string;
    }

    type Animal = Cat | Dog | Bird;

    function makeSound(animal: Animal): string {
      // Type narrowing with discriminant property
      switch (animal.type) {
        case "cat":
          return animal.meow(); // TypeScript knows this is Cat
        case "dog":
          return animal.bark(); // TypeScript knows this is Dog
        case "bird":
          return animal.chirp(); // TypeScript knows this is Bird
        default:
          // Exhaustiveness check
          const _exhaustive: never = animal;
          return _exhaustive;
      }
    }

    const cat: Cat = {
      type: "cat",
      meow: () => "Meow!",
      purr: () => "Purr...",
    };

    const dog: Dog = {
      type: "dog",
      bark: () => "Woof!",
      wagTail: () => "Tail wagging",
    };

    this.assertEqual(this.___(), makeSound(cat));
    this.assertEqual("Woof!", makeSound(dog));

    // Type narrowing with 'in' operator
    function getCapabilities(animal: Animal): string[] {
      const capabilities: string[] = [];

      if ("meow" in animal) {
        capabilities.push("meowing", "purring");
      }

      if ("bark" in animal) {
        capabilities.push("barking", "tail wagging");
      }

      if ("fly" in animal) {
        capabilities.push("chirping", "flying");
      }

      return capabilities;
    }

    this.assertEqual(2, getCapabilities(cat).length);
    this.assertEqual(this.___(), getCapabilities(cat)[0]);
    this.assertEqual("purring", getCapabilities(cat)[1]);

    // Union with literal types
    type HttpStatusCode = 200 | 404 | 500;
    type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

    function makeRequest(
      method: HttpMethod,
      url: string
    ): { status: HttpStatusCode; method: HttpMethod } {
      // Simplified mock implementation
      const statusMap: Record<HttpMethod, HttpStatusCode> = {
        GET: 200,
        POST: 200,
        PUT: 200,
        DELETE: 404,
      };

      return {
        status: statusMap[method],
        method,
      };
    }

    const getRequest = makeRequest("GET", "/api/users");
    const deleteRequest = makeRequest("DELETE", "/api/users/1");

    this.assertEqual(this.___(), getRequest.status);
    this.assertEqual(this.___(), getRequest.method);
    this.assertEqual(this.___(), deleteRequest.status);
    this.assertEqual(this.___(), deleteRequest.method);

    // Optional chaining with union types
    type User = {
      name: string;
      email?: string;
      profile?: {
        age?: number;
        location?: string;
      };
    };

    function getUserInfo(user: User): string {
      const email = user.email ?? "No email provided";
      const age = user.profile?.age ?? "Unknown";
      const location = user.profile?.location ?? "Unknown";

      return `${user.name} (${email}) - Age: ${age}, Location: ${location}`;
    }

    const user1: User = {
      name: "Alice",
      email: "alice@example.com",
      profile: { age: 30, location: "NYC" },
    };

    const user2: User = {
      name: "Bob",
      // No optional properties
    };

    this.assertEqual(this.___(), getUserInfo(user1));
    this.assertEqual(
      "Bob (No email provided) - Age: Unknown, Location: Unknown",
      getUserInfo(user2)
    );

    // Union type distribution
    type Arrayify<T> = T extends any ? T[] : never;
    type StringOrNumberArray = Arrayify<string | number>; // string[] | number[]

    // This demonstrates how conditional types distribute over unions
    function createArrays(value: string | number): string[] | number[] {
      if (typeof value === "string") {
        return [value]; // string[]
      } else {
        return [value]; // number[]
      }
    }

    const stringArray = createArrays("hello");
    const numberArray = createArrays(42);

    this.assertEqual(this.___(), stringArray.length);
    this.assertEqual(this.___(), numberArray.length);
    this.assertEqual(this.___(), stringArray[0]);
    this.assertEqual(this.___(), numberArray[0]);
  }

  /**
   * Discriminated Unions and Advanced Type Guards
   *
   * Discriminated unions are a powerful pattern for modeling data that can be
   * in one of several states, each with different properties. Combined with
   * advanced type guards, they enable robust state management and API modeling.
   *
   * Key Concepts:
   * - Tagged unions with discriminant properties
   * - Exhaustiveness checking and the never type
   * - Custom type guard functions
   * - Type predicates and assertion functions
   * - State machines and complex state modeling
   *
   * Advanced patterns:
   * - Nested discriminated unions
   * - Generic discriminated unions
   * - Redux-style action patterns
   * - Result types for error handling
   * - Event sourcing with discriminated unions
   */
  test_discriminated_unions_and_type_guards(): void {
    // Basic discriminated union
    interface Loading {
      status: "loading";
    }

    interface Success {
      status: "success";
      data: string;
    }

    interface Error {
      status: "error";
      message: string;
    }

    type ApiResponse = Loading | Success | Error;

    function handleResponse(response: ApiResponse): string {
      switch (response.status) {
        case "loading":
          return "Loading...";
        case "success":
          return response.data;
        case "error":
          return `Error: ${response.message}`;
        default:
          // Exhaustiveness check - ensures all cases are handled
          const _exhaustive: never = response;
          return _exhaustive;
      }
    }

    const loading: ApiResponse = { status: "loading" };
    const success: ApiResponse = { status: "success", data: "Hello World" };
    const error: ApiResponse = { status: "error", message: "Failed to fetch" };

    this.assertEqual(this.___(), handleResponse(loading));
    this.assertEqual("Hello World", handleResponse(success));
    this.assertEqual(this.___(), handleResponse(error));

    // Complex discriminated union for UI components
    interface ButtonComponent {
      type: "button";
      text: string;
      onClick: () => void;
      variant: "primary" | "secondary";
    }

    interface InputComponent {
      type: "input";
      placeholder: string;
      value: string;
      onChange: (value: string) => void;
    }

    interface SelectComponent {
      type: "select";
      options: Array<{ label: string; value: string }>;
      selected: string;
      onSelect: (value: string) => void;
    }

    type UIComponent = ButtonComponent | InputComponent | SelectComponent;

    function renderComponent(component: UIComponent): string {
      switch (component.type) {
        case "button":
          return `<button class="${component.variant}">${component.text}</button>`;
        case "input":
          return `<input placeholder="${component.placeholder}" value="${component.value}" />`;
        case "select":
          const options = component.options
            .map((opt) => `<option value="${opt.value}">${opt.label}</option>`)
            .join("");
          return `<select>${options}</select>`;
        default:
          const _exhaustive: never = component;
          return _exhaustive;
      }
    }

    const button: ButtonComponent = {
      type: "button",
      text: "Click me",
      onClick: () => console.log("clicked"),
      variant: "primary",
    };

    const input: InputComponent = {
      type: "input",
      placeholder: "Enter text",
      value: "",
      onChange: (value) => console.log(value),
    };

    this.assertEqual(this.___(), renderComponent(button));
    this.assertEqual(
      true,
      renderComponent(input).includes('placeholder="Enter text"')
    );

    // Generic discriminated union for Result types
    type Result<T, E = Error> =
      | { success: true; data: T }
      | { success: false; error: E };

    function parseJSON<T>(jsonString: string): Result<T, string> {
      try {
        const data = JSON.parse(jsonString) as T;
        return { success: true, data };
      } catch (e) {
        return { success: false, error: "Invalid JSON" };
      }
    }

    function handleResult<T>(result: Result<T, string>): string {
      if (result.success) {
        return `Success: ${JSON.stringify(result.data)}`;
      } else {
        return `Error: ${result.error}`;
      }
    }

    const validResult = parseJSON<{ name: string }>('{"name": "Alice"}');
    const invalidResult = parseJSON<{ name: string }>("invalid json");

    this.assertEqual(this.___(), validResult.success);
    this.assertEqual(this.___(), invalidResult.success);
    this.assertEqual(true, handleResult(validResult).includes("Alice"));
    this.assertEqual(this.___(), handleResult(invalidResult));

    // Custom type guards
    type Fish = {
      species: string;
      swim: () => void;
      gills: boolean;
    };

    type Bird = {
      species: string;
      fly: () => void;
      wings: boolean;
    };

    type Animal = Fish | Bird;

    // Type predicate function
    function isFish(animal: Animal): animal is Fish {
      return "swim" in animal && "gills" in animal;
    }

    function isBird(animal: Animal): animal is Bird {
      return "fly" in animal && "wings" in animal;
    }

    const fish: Fish = {
      species: "Salmon",
      swim: () => console.log("swimming"),
      gills: true,
    };

    const bird: Bird = {
      species: "Eagle",
      fly: () => console.log("flying"),
      wings: true,
    };

    this.assertEqual(this.___(), isFish(fish));
    this.assertEqual(false, isFish(bird));
    this.assertEqual(true, isBird(bird));
    this.assertEqual(this.___(), isBird(fish));

    function describeAnimal(animal: Animal): string {
      if (isFish(animal)) {
        // TypeScript knows animal is Fish here
        return `${animal.species} can swim and has ${
          animal.gills ? "gills" : "no gills"
        }`;
      } else {
        // TypeScript knows animal is Bird here
        return `${animal.species} can fly and has ${
          animal.wings ? "wings" : "no wings"
        }`;
      }
    }

    this.assertEqual(this.___(), describeAnimal(fish));
    this.assertEqual("Eagle can fly and has wings", describeAnimal(bird));

    // Assertion functions
    function assertIsNumber(value: unknown): asserts value is number {
      if (typeof value !== "number") {
        throw new Error("Expected number");
      }
    }

    function assertIsString(value: unknown): asserts value is string {
      if (typeof value !== "string") {
        throw new Error("Expected string");
      }
    }

    function processUnknownValue(value: unknown): string {
      try {
        assertIsString(value);
        // TypeScript knows value is string after assertion
        return value.toUpperCase();
      } catch {
        try {
          assertIsNumber(value);
          // TypeScript knows value is number after assertion
          return value.toFixed(2);
        } catch {
          return "Unknown type";
        }
      }
    }

    this.assertEqual(this.___(), processUnknownValue("hello"));
    this.assertEqual("42.00", processUnknownValue(42));
    this.assertEqual(this.___(), processUnknownValue(true));

    // Redux-style action pattern
    interface AddAction {
      type: "ADD";
      payload: number;
    }

    interface SubtractAction {
      type: "SUBTRACT";
      payload: number;
    }

    interface ResetAction {
      type: "RESET";
    }

    type CounterAction = AddAction | SubtractAction | ResetAction;

    interface CounterState {
      count: number;
    }

    function counterReducer(
      state: CounterState,
      action: CounterAction
    ): CounterState {
      switch (action.type) {
        case "ADD":
          return { count: state.count + action.payload };
        case "SUBTRACT":
          return { count: state.count - action.payload };
        case "RESET":
          return { count: 0 };
        default:
          const _exhaustive: never = action;
          return state;
      }
    }

    let state: CounterState = { count: 0 };

    state = counterReducer(state, { type: "ADD", payload: 5 });
    this.assertEqual(this.___(), state.count);

    state = counterReducer(state, { type: "SUBTRACT", payload: 2 });
    this.assertEqual(this.___(), state.count);

    state = counterReducer(state, { type: "RESET" });
    this.assertEqual(this.___(), state.count);

    // Nested discriminated unions
    interface UserProfile {
      type: "profile";
      user: {
        id: string;
        name: string;
        status: "online" | "offline" | "away";
      };
    }

    interface SystemMessage {
      type: "system";
      message: {
        level: "info" | "warning" | "error";
        text: string;
        timestamp: number;
      };
    }

    type AppNotification = UserProfile | SystemMessage;

    function formatNotification(notification: AppNotification): string {
      switch (notification.type) {
        case "profile":
          const { user } = notification;
          return `User ${user.name} is ${user.status}`;
        case "system":
          const { message } = notification;
          return `[${message.level.toUpperCase()}] ${message.text}`;
        default:
          const _exhaustive: never = notification;
          return _exhaustive;
      }
    }

    const profileNotification: UserProfile = {
      type: "profile",
      user: { id: "1", name: "Alice", status: "online" },
    };

    const systemNotification: SystemMessage = {
      type: "system",
      message: {
        level: "warning",
        text: "Low disk space",
        timestamp: Date.now(),
      },
    };

    this.assertEqual(this.___(), formatNotification(profileNotification));
    this.assertEqual(
      "[WARNING] Low disk space",
      formatNotification(systemNotification)
    );
  }
}
