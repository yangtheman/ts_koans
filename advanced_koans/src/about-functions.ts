import { Koan } from "./koan";

export class AboutFunctions extends Koan {
  constructor() {
    super("AboutFunctions", "about-functions.ts");
  }

  // CONCEPT: Functions as First-Class Citizens in TypeScript
  //
  // Functions in TypeScript are first-class citizens, meaning they can be:
  // - Assigned to variables and stored in data structures
  // - Passed as arguments to other functions (higher-order functions)
  // - Returned from other functions (function factories)
  // - Created at runtime with dynamic behavior
  // - Have properties and methods like any other object
  //
  // TypeScript adds static type checking to JavaScript's flexible function system,
  // providing compile-time safety while maintaining JavaScript's functional programming
  // capabilities. Understanding functions deeply is crucial because they're the building
  // blocks of modern JavaScript/TypeScript applications, used in everything from
  // event handling to async programming to architectural patterns.
  //
  // Function Categories in TypeScript:
  // - Function declarations: function name() {} (hoisted, named)
  // - Function expressions: const name = function() {} (not hoisted, can be anonymous)
  // - Arrow functions: const name = () => {} (lexical 'this', concise syntax)
  // - Method definitions: { method() {} } (object methods)
  // - Constructor functions: function Constructor() {} (legacy class pattern)
  // - Generator functions: function* generator() {} (iterators)
  // - Async functions: async function() {} (Promise-based)

  test_function_declarations_and_hoisting(): void {
    // CONCEPT: Function Declarations and JavaScript Hoisting Behavior
    //
    // Function declarations are "hoisted" to the top of their containing scope,
    // meaning they can be called before they appear in the code. This is different
    // from function expressions and arrow functions, which follow normal variable
    // hoisting rules. Understanding hoisting is crucial for avoiding temporal
    // dead zone errors and understanding JavaScript's execution model.
    //
    // Hoisting behavior:
    // - Function declarations: fully hoisted (definition + implementation)
    // - var declarations: hoisted but initialized to undefined
    // - let/const declarations: hoisted but not initialized (temporal dead zone)
    // - Function expressions: follow variable hoisting rules

    // This works due to hoisting - function can be called before definition
    const result = hoistedFunction();
    this.assertEqual(this.___(), result); // "I'm hoisted!"

    function hoistedFunction(): string {
      return "I'm hoisted!";
    }

    // Function declaration characteristics
    this.assertEqual("function", typeof hoistedFunction);
    this.assertEqual(this.___(), hoistedFunction.name); // "hoistedFunction"

    // Hoisting vs block scope
    if (true) {
      function blockScoped(): string {
        return "block function";
      }
      this.assertEqual(this.___(), blockScoped()); // "block function"
    }

    // Function declarations create named functions
    function namedDeclaration(): string {
      return "I have a name";
    }

    this.assertEqual(this.___(), namedDeclaration.name); // "namedDeclaration"
    this.assertEqual(0, namedDeclaration.length); // Number of parameters
  }

  test_function_expressions_and_timing(): void {
    // CONCEPT: Function Expressions and Temporal Dead Zone
    //
    // Function expressions are not hoisted like declarations. The variable
    // is hoisted but not its assignment, creating a "temporal dead zone"
    // where the variable exists but is uninitialized. This difference is
    // crucial for understanding JavaScript's execution model and avoiding
    // common runtime errors.
    //
    // Types of function expressions:
    // - Anonymous: const fn = function() {}
    // - Named: const fn = function namedFn() {}
    // - Immediately Invoked (IIFE): (function() {})()

    // This would throw: Cannot access 'functionExpression' before initialization
    // functionExpression(); // ReferenceError!

    const functionExpression = function (): string {
      return "I'm an expression!";
    };

    this.assertEqual(this.___(), functionExpression()); // "I'm an expression!"

    // Anonymous vs named function expressions
    const anonymousExpr = function (): string {
      return "anonymous";
    };
    const namedExpr = function namedFunction(): string {
      return "named";
    };

    this.assertEqual(this.___(), anonymousExpr.name); // ""
    this.assertEqual("namedFunction", namedExpr.name);

    // Named function expressions provide benefits:
    // - Better stack traces for debugging
    // - Self-reference within the function
    // - More descriptive in profiling tools
    const factorial = function fact(n: number): number {
      if (n <= 1) return 1;
      return n * fact(n - 1); // Can call itself by name
    };

    this.assertEqual(this.___(), factorial(4)); // 24
    this.assertEqual("fact", factorial.name);

    // Immediately Invoked Function Expression (IIFE)
    const immediateResult = (function (x: number): number {
      return x * 2;
    })(5);

    this.assertEqual(this.___(), immediateResult); // 10

    // IIFE for creating private scope
    const modulePattern = (function () {
      let privateVar = "secret";
      return {
        getSecret: () => privateVar,
        setSecret: (newSecret: string) => {
          privateVar = newSecret;
        },
      };
    })();

    this.assertEqual(this.___(), modulePattern.getSecret()); // "secret"
    modulePattern.setSecret("new secret");
    this.assertEqual("new secret", modulePattern.getSecret());
  }

  test_arrow_functions_comprehensive(): void {
    // CONCEPT: Arrow Functions - Lexical 'this' and Modern Syntax
    //
    // Arrow functions, introduced in ES6, provide more than just concise syntax.
    // Their key difference is lexical 'this' binding - they inherit 'this'
    // from their enclosing scope rather than having their own 'this' binding.
    // This makes them ideal for callbacks and event handlers where 'this'
    // context needs to be preserved.
    //
    // Arrow function characteristics:
    // - Lexical 'this' binding (inherits from enclosing scope)
    // - Cannot be used as constructors (no 'new')
    // - No 'arguments' object (use rest parameters instead)
    // - Concise syntax for simple functions
    // - Implicit return for single expressions

    // Single expression - implicit return
    const add = (a: number, b: number) => a + b;
    this.assertEqual(this.___(), add(2, 3)); // 5

    // Block body - explicit return needed
    const multiply = (a: number, b: number) => {
      const result = a * b;
      return result;
    };
    this.assertEqual(12, multiply(3, 4));

    // Single parameter - parentheses optional (but recommended for consistency)
    const square = (x: number) => x * x;
    const cube = (x: number) => x * x * x;

    this.assertEqual(25, square(5));
    this.assertEqual(this.___(), cube(3)); // 27

    // No parameters - parentheses required
    const getMessage = () => "Hello TypeScript!";
    const getRandom = () => Math.random();

    this.assertEqual(this.___(), getMessage()); // "Hello TypeScript!"
    this.assertEqual("number", typeof getRandom());

    // Arrow functions and array methods
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map((x) => x * 2);
    const evens = numbers.filter((x) => x % 2 === 0);
    const sum = numbers.reduce((acc, x) => acc + x, 0);

    this.assertEqual(this.___(), doubled); // [2, 4, 6, 8, 10]
    this.assertEqual([2, 4], evens);
    this.assertEqual(this.___(), sum); // 15

    // Lexical 'this' demonstration with classes
    class Counter {
      private count = 0;

      // Arrow function method - inherits 'this' from class instance
      increment = () => {
        this.count++;
        return this.count;
      };

      // Regular method - has dynamic 'this'
      getCount(): number {
        return this.count;
      }

      // Method returning arrow function
      createIncrementer() {
        return () => {
          this.count++;
          return this.count;
        };
      }
    }

    const counter = new Counter();
    this.assertEqual(this.___(), counter.increment()); // 1
    this.assertEqual(2, counter.increment());

    const incrementer = counter.createIncrementer();
    this.assertEqual(this.___(), incrementer()); // 3
    this.assertEqual(4, incrementer());
  }

  test_advanced_parameter_patterns(): void {
    // CONCEPT: Advanced Parameter Handling for Robust Functions
    //
    // Modern TypeScript provides sophisticated parameter handling that goes
    // far beyond simple required parameters. These patterns enable creation
    // of flexible, user-friendly APIs while maintaining type safety. Understanding
    // these patterns is essential for designing good function interfaces.
    //
    // Parameter Types:
    // - Required parameters: function(param: type)
    // - Optional parameters: function(param?: type)
    // - Default parameters: function(param: type = default)
    // - Rest parameters: function(...params: type[])
    // - Destructured parameters: function({prop}: {prop: type})

    // Optional parameters with type narrowing
    function greet(name?: string): string {
      if (name) {
        // TypeScript narrows type from string | undefined to string
        return `Hello, ${name}!`;
      }
      return "Hello, stranger!";
    }

    this.assertEqual(this.___(), greet()); // "Hello, stranger!"
    this.assertEqual("Hello, Alice!", greet("Alice"));

    // Default parameters with complex expressions
    function createUser(
      name: string,
      age: number = new Date().getFullYear() - 1990,
      roles: string[] = ["user"]
    ): { name: string; age: number; roles: string[] } {
      return { name, age, roles };
    }

    const user1 = createUser("Bob");
    const user2 = createUser("Alice", 25, ["admin", "user"]);

    this.assertEqual("Bob", user1.name);
    this.assertEqual(this.___(), Array.isArray(user1.roles)); // true
    this.assertEqual(["user"], user1.roles);
    this.assertEqual(this.___(), user2.roles.length); // 2

    // Rest parameters with type safety
    function sum(...numbers: number[]): number {
      return numbers.reduce((total, num) => total + num, 0);
    }

    function concat(...strings: string[]): string {
      return strings.join(" ");
    }

    this.assertEqual(this.___(), sum(1, 2, 3, 4, 5)); // 15
    this.assertEqual(0, sum()); // Empty sum
    this.assertEqual(this.___(), concat("Hello", "TypeScript", "World")); // "Hello TypeScript World"

    // Destructuring parameters with defaults
    function configureServer({
      port = 3000,
      host = "localhost",
      ssl = false,
    }: {
      port?: number;
      host?: string;
      ssl?: boolean;
    } = {}): string {
      return `${ssl ? "https" : "http"}://${host}:${port}`;
    }

    this.assertEqual(this.___(), configureServer()); // "http://localhost:3000"
    this.assertEqual(
      "https://example.com:8080",
      configureServer({
        port: 8080,
        host: "example.com",
        ssl: true,
      })
    );

    // Mixed destructuring and regular parameters
    function processPoint(
      label: string,
      { x, y }: { x: number; y: number },
      { precision = 2 }: { precision?: number } = {}
    ): string {
      const distance = Math.sqrt(x * x + y * y);
      return `${label}: (${x}, ${y}) distance=${distance.toFixed(precision)}`;
    }

    const result = processPoint("Point A", { x: 3, y: 4 });
    this.assertEqual(this.___(), result.includes("5.00")); // true (distance is 5)
  }

  test_function_type_annotations(): void {
    // CONCEPT: Function Type Annotations and Type Safety
    //
    // TypeScript's function type annotations provide precise control over
    // function interfaces, enabling type-safe function composition, callback
    // patterns, and higher-order functions. These type annotations help prevent
    // common runtime errors and enable better IDE support with autocomplete
    // and refactoring capabilities.
    //
    // Function Type Syntax:
    // - Type annotation: (param1: Type1, param2: Type2) => ReturnType
    // - Type alias: type FnType = (param: Type) => ReturnType
    // - Interface method: interface { method(param: Type): ReturnType }
    // - Generic functions: <T>(param: T) => T

    // Explicit function type annotation
    const calculator: (a: number, b: number) => number = (a, b) => a + b;
    this.assertEqual(this.___(), calculator(10, 5)); // 15

    // Function type aliases for reusability
    type BinaryOperation = (left: number, right: number) => number;
    type UnaryOperation = (value: number) => number;
    type Predicate<T> = (item: T) => boolean;

    const add: BinaryOperation = (a, b) => a + b;
    const subtract: BinaryOperation = (a, b) => a - b;
    const negate: UnaryOperation = (x) => -x;
    const isEven: Predicate<number> = (n) => n % 2 === 0;

    this.assertEqual(8, add(3, 5));
    this.assertEqual(this.___(), subtract(10, 3)); // 7
    this.assertEqual(-5, negate(5));
    this.assertEqual(this.___(), isEven(4)); // true

    // Higher-order function types
    type Mapper<T, U> = (item: T) => U;
    type Filter<T> = (item: T) => boolean;

    function processArray<T, U>(
      items: T[],
      mapper: Mapper<T, U>,
      filter?: Filter<U>
    ): U[] {
      const mapped = items.map(mapper);
      return filter ? mapped.filter(filter) : mapped;
    }

    const numbers = [1, 2, 3, 4, 5];
    const doubled = processArray(numbers, (x) => x * 2);
    const evenDoubled = processArray(
      numbers,
      (x) => x * 2,
      (x) => x % 4 === 0
    );

    this.assertEqual(this.___(), doubled); // [2, 4, 6, 8, 10]
    this.assertEqual([4, 8], evenDoubled);

    // Complex callback patterns
    type EventHandler<T> = (event: T) => void | Promise<void>;
    type EventMap = {
      click: { x: number; y: number };
      keypress: { key: string; ctrlKey: boolean };
      load: {};
    };

    function addEventListener<K extends keyof EventMap>(
      event: K,
      handler: EventHandler<EventMap[K]>
    ): void {
      // Simulated event registration
      console.log(`Registered ${event} handler`);
    }

    // TypeScript ensures type safety for event handlers
    addEventListener("click", (event) => {
      // TypeScript knows event is { x: number; y: number }
      console.log(`Clicked at ${event.x}, ${event.y}`);
    });

    // Function signatures with union types and overloads
    function processor(value: string): string;
    function processor(value: number): number;
    function processor(value: string | number): string | number {
      if (typeof value === "string") return value.toUpperCase();
      return value * 2;
    }

    this.assertEqual(this.___(), processor("hello")); // "HELLO"
    this.assertEqual(10, processor(5));
  }

  test_function_overloads(): void {
    // CONCEPT: Function Overloads - Multiple Signatures, Single Implementation
    //
    // Function overloads allow you to define multiple type signatures for a
    // single function implementation. This is useful when a function behaves
    // differently based on the number or types of arguments, providing better
    // type safety and IntelliSense while maintaining a single implementation.
    //
    // Overload Structure:
    // - Multiple overload signatures (declarations only)
    // - Single implementation signature (must be compatible with all overloads)
    // - Implementation must handle all overload cases
    // - More specific overloads should come first

    // Basic overloads with different parameter types
    function combine(a: string, b: string): string;
    function combine(a: number, b: number): number;
    function combine(a: string[], b: string[]): string[];
    function combine(a: any, b: any): any {
      if (typeof a === "string" && typeof b === "string") {
        return a + " " + b;
      }
      if (typeof a === "number" && typeof b === "number") {
        return a + b;
      }
      if (Array.isArray(a) && Array.isArray(b)) {
        return [...a, ...b];
      }
      throw new Error("Invalid arguments");
    }

    this.assertEqual(this.___(), combine("Hello", "World")); // "Hello World"
    this.assertEqual(15, combine(7, 8));
    this.assertEqual(this.___(), combine(["a", "b"], ["c", "d"])); // ["a", "b", "c", "d"]

    // Overloads with different arities (number of parameters)
    function createElement(tag: string): HTMLElement;
    function createElement(tag: string, text: string): HTMLElement;
    function createElement(tag: string, children: HTMLElement[]): HTMLElement;
    function createElement(
      tag: string,
      textOrChildren?: string | HTMLElement[]
    ): HTMLElement {
      const element = document.createElement(tag);
      if (typeof textOrChildren === "string") {
        element.textContent = textOrChildren;
      } else if (Array.isArray(textOrChildren)) {
        textOrChildren.forEach((child) => element.appendChild(child));
      }
      return element;
    }

    const div1 = createElement("div");
    const div2 = createElement("div", "Hello");

    this.assertEqual("DIV", div1.tagName);
    this.assertEqual(this.___(), div2.textContent); // "Hello"

    // Generic overloads
    interface Container<T> {
      value: T;
    }

    function createContainer(value: string): Container<string>;
    function createContainer(value: number): Container<number>;
    function createContainer<T>(value: T): Container<T>;
    function createContainer<T>(value: T): Container<T> {
      return { value };
    }

    const stringContainer = createContainer("hello");
    const numberContainer = createContainer(42);
    const objectContainer = createContainer({ key: "value" });

    this.assertEqual("hello", stringContainer.value);
    this.assertEqual(this.___(), numberContainer.value); // 42
    this.assertEqual("value", objectContainer.value.key);

    // Conditional overloads based on parameters
    function processData(data: string, format: "json"): object;
    function processData(data: string, format: "text"): string;
    function processData(data: string, format: "number"): number;
    function processData(
      data: string,
      format: "json" | "text" | "number"
    ): object | string | number {
      switch (format) {
        case "json":
          return JSON.parse(data);
        case "text":
          return data.toUpperCase();
        case "number":
          return parseFloat(data);
        default:
          throw new Error("Unknown format");
      }
    }

    const jsonResult = processData('{"name":"Alice"}', "json") as {
      name: string;
    };
    const textResult = processData("hello", "text");
    const numberResult = processData("42.5", "number");

    this.assertEqual(this.___(), jsonResult.name); // "Alice"
    this.assertEqual("HELLO", textResult);
    this.assertEqual(this.___(), numberResult); // 42.5
  }

  test_closures_and_lexical_scope(): void {
    // CONCEPT: Closures - Functions Remembering Their Environment
    //
    // Closures are one of JavaScript's most powerful features. A closure is
    // created when a function has access to variables from its outer (enclosing)
    // scope even after the outer function has finished executing. This enables
    // data privacy, factory functions, module patterns, and functional programming
    // techniques. Understanding closures is crucial for advanced JavaScript patterns.
    //
    // Closure Characteristics:
    // - Inner function has access to outer function's variables
    // - Variables in closure scope are not garbage collected
    // - Each closure instance has its own copy of outer variables
    // - Closures can modify variables in outer scope
    // - Foundation for many design patterns (module, factory, observer)

    // Basic closure example
    function createMultiplier(multiplier: number): (x: number) => number {
      // This variable is captured in the closure
      return function (x: number): number {
        return x * multiplier; // 'multiplier' is accessed from outer scope
      };
    }

    const double = createMultiplier(2);
    const triple = createMultiplier(3);

    this.assertEqual(this.___(), double(5)); // 10
    this.assertEqual(15, triple(5));

    // Each closure gets its own copy of variables
    this.assertEqual(this.___(), double(7)); // 14
    this.assertEqual(21, triple(7));

    // Counter with private state using closure
    function createCounter(initialValue: number = 0) {
      let count = initialValue; // Private variable

      return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count,
        reset: () => {
          count = initialValue;
        },
        add: (value: number) => (count += value),
      };
    }

    const counter1 = createCounter(10);
    const counter2 = createCounter(100);

    this.assertEqual(this.___(), counter1.increment()); // 11
    this.assertEqual(101, counter2.increment());

    counter1.add(5);
    this.assertEqual(this.___(), counter1.getValue()); // 16
    this.assertEqual(101, counter2.getValue()); // Independent counters

    // Complex closure with multiple nested scopes
    function createCalculator(initialValue: number) {
      let memory = initialValue;
      let history: string[] = [];

      function logOperation(operation: string, value: number) {
        history.push(`${operation}: ${value} (result: ${memory})`);
      }

      return {
        add: (value: number) => {
          memory += value;
          logOperation("ADD", value);
          return memory;
        },
        multiply: (value: number) => {
          memory *= value;
          logOperation("MULTIPLY", value);
          return memory;
        },
        getMemory: () => memory,
        getHistory: () => [...history], // Return copy to prevent mutation
        clear: () => {
          memory = initialValue;
          history = [];
        },
      };
    }

    const calc = createCalculator(0);
    calc.add(10);
    calc.multiply(3);

    this.assertEqual(this.___(), calc.getMemory()); // 30
    this.assertEqual(2, calc.getHistory().length);
    this.assertEqual(this.___(), calc.getHistory()[0].includes("ADD")); // true

    // Module pattern with closure (IIFE + closure)
    const mathModule = (function () {
      // Private variables and functions
      let precision = 2;

      function round(value: number): number {
        return (
          Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)
        );
      }

      // Public API
      return {
        square: (x: number) => round(x * x),
        cube: (x: number) => round(x * x * x),
        setPrecision: (p: number) => {
          precision = Math.max(0, Math.min(10, p));
        },
        getPrecision: () => precision,
      };
    })();

    this.assertEqual(this.___(), mathModule.square(1.414)); // 2 (rounded)
    mathModule.setPrecision(4);
    this.assertEqual(this.___(), mathModule.square(1.414)); // 1.9995

    // Closure performance considerations and memory management
    function createLargeClosureDemo() {
      const largeArray = new Array(1000000).fill(0);
      let counter = 0;

      // This closure captures the entire outer scope, including largeArray
      return function () {
        counter++;
        return counter; // Only uses counter, but largeArray is still in scope
      };
    }

    // In real applications, be mindful of what variables closures capture
    const incrementer = createLargeClosureDemo();
    this.assertEqual(this.___(), incrementer()); // 1
    this.assertEqual(2, incrementer());
  }

  test_recursive_functions_and_patterns(): void {
    // CONCEPT: Recursive Functions - Self-Calling Functions and Patterns
    //
    // Recursion occurs when a function calls itself to solve smaller instances
    // of the same problem. It's a fundamental programming technique especially
    // useful for tree traversal, mathematical computations, and problems with
    // recursive structure. TypeScript provides excellent type safety for
    // recursive functions, but care must be taken to avoid stack overflow errors.
    //
    // Recursion Components:
    // - Base case: condition that stops recursion
    // - Recursive case: function calls itself with modified parameters
    // - Progress toward base case: ensures termination
    //
    // Types of Recursion:
    // - Direct recursion: function calls itself
    // - Indirect recursion: functions call each other in cycle
    // - Tail recursion: recursive call is last operation (optimizable)

    // Classic factorial example
    function factorial(n: number): number {
      // Base case
      if (n <= 1) return 1;
      // Recursive case
      return n * factorial(n - 1);
    }

    this.assertEqual(this.___(), factorial(5)); // 120
    this.assertEqual(1, factorial(0)); // Edge case
    this.assertEqual(this.___(), factorial(4)); // 24

    // Tail-recursive version (more efficient in engines that optimize)
    function factorialTailRec(n: number, accumulator: number = 1): number {
      if (n <= 1) return accumulator;
      return factorialTailRec(n - 1, n * accumulator);
    }

    this.assertEqual(120, factorialTailRec(5));
    this.assertEqual(this.___(), factorialTailRec(6)); // 720

    // Tree traversal with recursion
    interface TreeNode<T> {
      value: T;
      children: TreeNode<T>[];
    }

    function traverseTree<T>(
      node: TreeNode<T>,
      visit: (value: T) => void
    ): void {
      visit(node.value);
      node.children.forEach((child) => traverseTree(child, visit));
    }

    const tree: TreeNode<string> = {
      value: "root",
      children: [
        { value: "child1", children: [] },
        {
          value: "child2",
          children: [{ value: "grandchild", children: [] }],
        },
      ],
    };

    const visited: string[] = [];
    traverseTree(tree, (value) => visited.push(value));

    this.assertEqual(this.___(), visited); // ["root", "child1", "child2", "grandchild"]

    // Recursive array flattening
    function flatten<T>(arr: (T | (T | T[])[])[]): T[] {
      const result: T[] = [];
      for (const item of arr) {
        if (Array.isArray(item)) {
          result.push(...flatten(item));
        } else {
          result.push(item);
        }
      }
      return result;
    }

    const nestedArray = [1, [2, 3], [4, [5, 6]], 7];
    this.assertEqual(this.___(), flatten(nestedArray)); // [1, 2, 3, 4, 5, 6, 7]

    // Mutual recursion (functions calling each other)
    function isEven(n: number): boolean {
      if (n === 0) return true;
      return isOdd(n - 1);
    }

    function isOdd(n: number): boolean {
      if (n === 0) return false;
      return isEven(n - 1);
    }

    this.assertEqual(this.___(), isEven(8)); // true
    this.assertEqual(false, isEven(5));
    this.assertEqual(this.___(), isOdd(7)); // true
    this.assertEqual(false, isOdd(4));

    // Fibonacci with memoization (avoiding redundant calculations)
    function createFibonacci() {
      const cache = new Map<number, number>();

      function fibonacci(n: number): number {
        if (n <= 1) return n;

        if (cache.has(n)) {
          return cache.get(n)!;
        }

        const result = fibonacci(n - 1) + fibonacci(n - 2);
        cache.set(n, result);
        return result;
      }

      return fibonacci;
    }

    const fibonacci = createFibonacci();
    this.assertEqual(this.___(), fibonacci(10)); // 55
    this.assertEqual(13, fibonacci(7));

    // Deep object traversal
    function deepClone<T>(obj: T): T {
      if (obj === null || typeof obj !== "object") {
        return obj;
      }

      if (obj instanceof Array) {
        return obj.map((item) => deepClone(item)) as unknown as T;
      }

      const cloned = {} as T;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          cloned[key] = deepClone(obj[key]);
        }
      }
      return cloned;
    }

    const original = { a: 1, b: { c: 2, d: [3, 4] } };
    const cloned = deepClone(original);
    cloned.b.c = 999;

    this.assertEqual(2, original.b.c); // Original unchanged
    this.assertEqual(this.___(), cloned.b.c); // 999
  }

  test_async_functions_and_promises(): void {
    // CONCEPT: Async Functions and Promise Integration
    //
    // Async functions are syntactic sugar over Promises, making asynchronous
    // code look and behave more like synchronous code. They always return a
    // Promise, regardless of what you explicitly return. Understanding async/await
    // is crucial for modern JavaScript/TypeScript development, especially for
    // API calls, file operations, and any non-blocking operations.
    //
    // Async Function Characteristics:
    // - Always return a Promise (automatically wrapped)
    // - Can use 'await' keyword to pause execution
    // - Error handling with try-catch blocks
    // - Sequential vs parallel execution patterns
    // - Integration with Promise-based APIs

    // Basic async function
    async function fetchData(): Promise<string> {
      return "data fetched"; // Automatically wrapped in Promise.resolve()
    }

    // TypeScript understands the return type
    const promise = fetchData();
    this.assertEqual(this.___(), promise instanceof Promise); // true

    // Async function with await (simulated with immediate resolution)
    async function processData(): Promise<number> {
      const data = await Promise.resolve("hello world");
      return data.length;
    }

    // Error handling in async functions
    async function riskyOperation(shouldFail: boolean): Promise<string> {
      if (shouldFail) {
        throw new Error("Operation failed");
      }
      return "success";
    }

    // Async function with try-catch
    async function safeOperation(shouldFail: boolean = false): Promise<string> {
      try {
        const result = await riskyOperation(shouldFail);
        return result;
      } catch (error) {
        return `Error: ${(error as Error).message}`;
      }
    }

    // For koan testing, we'll verify function types and basic structure
    this.assertEqual("function", typeof processData);
    this.assertEqual(this.___(), typeof safeOperation); // "function"

    // Promise combinators and async patterns
    async function parallelOperations(): Promise<number[]> {
      // Parallel execution - all start at the same time
      const promises = [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
      ];

      return Promise.all(promises);
    }

    async function sequentialOperations(): Promise<number> {
      // Sequential execution - each waits for previous
      let total = 0;
      total += await Promise.resolve(1);
      total += await Promise.resolve(2);
      total += await Promise.resolve(3);
      return total;
    }

    // Generic async utilities
    type AsyncFunction<T> = () => Promise<T>;
    type AsyncMapper<T, U> = (item: T) => Promise<U>;

    async function asyncMap<T, U>(
      items: T[],
      mapper: AsyncMapper<T, U>
    ): Promise<U[]> {
      const promises = items.map(mapper);
      return Promise.all(promises);
    }

    // Timeout utility function
    function delay(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
      return Promise.race([
        promise,
        delay(ms).then(() => Promise.reject(new Error("Timeout"))),
      ]);
    }

    // Retry pattern
    async function retry<T>(
      operation: () => Promise<T>,
      maxAttempts: number = 3
    ): Promise<T> {
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await operation();
        } catch (error) {
          if (attempt === maxAttempts) throw error;
          await delay(attempt * 100); // Exponential backoff
        }
      }
      throw new Error("Max attempts reached");
    }

    // Async generators and iterators
    async function* asyncGenerator(): AsyncGenerator<number, void, unknown> {
      for (let i = 1; i <= 3; i++) {
        await delay(10); // Simulate async work
        yield i;
      }
    }

    // Type verification for async functions
    this.assertEqual(this.___(), typeof parallelOperations); // "function"
    this.assertEqual("function", typeof sequentialOperations);
    this.assertEqual("function", typeof asyncMap);

    // Promise states and characteristics
    const resolvedPromise = Promise.resolve(42);
    const rejectedPromise = Promise.reject(new Error("failed"));

    this.assertEqual(this.___(), resolvedPromise instanceof Promise); // true
    this.assertEqual(true, rejectedPromise instanceof Promise);

    // Async function error propagation
    async function chainedOperations(): Promise<string> {
      try {
        await riskyOperation(false);
        await riskyOperation(false);
        return "all operations succeeded";
      } catch (error) {
        throw new Error(`Chain failed: ${(error as Error).message}`);
      }
    }

    this.assertEqual("function", typeof chainedOperations);
  }

  test_function_composition_and_currying(): void {
    // CONCEPT: Function Composition and Currying - Building Complex from Simple
    //
    // Function composition is combining simple functions to create more complex
    // behavior. It promotes code reuse, testability, and understanding by breaking
    // complex operations into simple, testable steps. Currying transforms functions
    // with multiple parameters into a sequence of functions with single parameters,
    // enabling partial application and more flexible function reuse.
    //
    // Functional Programming Concepts:
    // - Composition: f(g(x)) - combining functions
    // - Currying: f(a,b) becomes f(a)(b) - partial application
    // - Point-free style: using functions without explicitly naming parameters
    // - Pure functions: same input always produces same output, no side effects
    // - Higher-order functions: functions that operate on other functions

    // Simple composition examples
    const addOne = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const square = (x: number) => x * x;

    // Manual composition
    const composed = (x: number) => square(double(addOne(x)));
    this.assertEqual(this.___(), composed(3)); // square(double(4)) = square(8) = 64

    // Generic compose function (right-to-left)
    function compose<T, U, V>(f: (x: U) => V, g: (x: T) => U): (x: T) => V {
      return (x: T) => f(g(x));
    }

    // Multi-argument compose
    function composeMany<T>(...functions: Array<(x: T) => T>): (x: T) => T {
      return (x: T) => functions.reduceRight((acc, fn) => fn(acc), x);
    }

    const doubleAndSquare = compose(square, double);
    const pipeline = composeMany(square, double, addOne);

    this.assertEqual(this.___(), doubleAndSquare(4)); // square(8) = 64
    this.assertEqual(64, pipeline(3)); // Same as composed above

    // Pipe function (left-to-right composition) - more intuitive reading order
    function pipe<T>(...functions: Array<(x: T) => T>): (x: T) => T {
      return (x: T) => functions.reduce((acc, fn) => fn(acc), x);
    }

    const leftToRight = pipe(addOne, double, square);
    this.assertEqual(this.___(), leftToRight(3)); // Same result: 64

    // Currying - transforming multi-parameter functions
    function curry<T, U, V>(fn: (a: T, b: U) => V): (a: T) => (b: U) => V {
      return (a: T) => (b: U) => fn(a, b);
    }

    // Three-parameter curry
    function curry3<T, U, V, W>(
      fn: (a: T, b: U, c: V) => W
    ): (a: T) => (b: U) => (c: V) => W {
      return (a: T) => (b: U) => (c: V) => fn(a, b, c);
    }

    const add = (a: number, b: number) => a + b;
    const multiply3 = (a: number, b: number, c: number) => a * b * c;

    const curriedAdd = curry(add);
    const curriedMultiply = curry3(multiply3);

    const add5 = curriedAdd(5);
    const multiplyBy2 = curriedMultiply(2);
    const multiplyBy2And3 = multiplyBy2(3);

    this.assertEqual(this.___(), add5(3)); // 8
    this.assertEqual(12, add5(7));
    this.assertEqual(this.___(), multiplyBy2And3(4)); // 2 * 3 * 4 = 24

    // Partial application (similar to currying but more flexible)
    function partial<T extends any[], U>(
      fn: (...args: T) => U,
      ...partialArgs: Partial<T>
    ): (...remainingArgs: any[]) => U {
      return (...remainingArgs: any[]) =>
        fn(...(partialArgs.concat(remainingArgs) as T));
    }

    const subtract = (a: number, b: number, c: number) => a - b - c;
    const subtractFrom10 = partial(subtract, 10);
    const subtractFrom10And5 = partial(subtract, 10, 5);

    this.assertEqual(this.___(), subtractFrom10And5(2)); // 10 - 5 - 2 = 3

    // Point-free style (tacit programming) - functions without explicitly naming parameters
    const numbers = [1, 2, 3, 4, 5];

    // Instead of: numbers.map(x => double(x))
    const doubled = numbers.map(double); // Point-free style
    const processed = numbers.map(addOne).map(double).map(square);

    this.assertEqual(this.___(), doubled); // [2, 4, 6, 8, 10]
    this.assertEqual([4, 16, 36, 64, 100], processed);

    // Function composition with predicates and filters
    const isEven = (n: number): boolean => n % 2 === 0;
    const isPositive = (n: number): boolean => n > 0;
    const isLarge = (n: number): boolean => n > 5;

    // Compose predicates
    function and<T>(
      ...predicates: Array<(x: T) => boolean>
    ): (x: T) => boolean {
      return (x: T) => predicates.every((predicate) => predicate(x));
    }

    function or<T>(...predicates: Array<(x: T) => boolean>): (x: T) => boolean {
      return (x: T) => predicates.some((predicate) => predicate(x));
    }

    const isEvenAndLarge = and(isEven, isLarge);
    const isEvenOrNegative = or(isEven, (n: number) => n < 0);

    const testNumbers = [-2, 3, 6, 8, 10];
    const evenAndLarge = testNumbers.filter(isEvenAndLarge);
    const evenOrNegative = testNumbers.filter(isEvenOrNegative);

    this.assertEqual(this.___(), evenAndLarge); // [6, 8, 10]
    this.assertEqual([-2, 6, 8, 10], evenOrNegative);

    // Monadic patterns (simplified)
    type Maybe<T> = T | null | undefined;

    function map<T, U>(fn: (x: T) => U): (maybe: Maybe<T>) => Maybe<U> {
      return (maybe: Maybe<T>) =>
        maybe != null ? fn(maybe) : (null as Maybe<U>);
    }

    const safeDivide = (x: number) => (x !== 0 ? 10 / x : null);
    const safeSquare = map(square);
    const safeDouble = map(double);

    const result1 = safeDouble(safeSquare(safeDivide(2))); // 2 -> 5 -> 25 -> 50
    const result2 = safeDouble(safeSquare(safeDivide(0))); // 0 -> null -> null -> null

    this.assertEqual(this.___(), result1); // 50
    this.assertEqual(null, result2);

    // Function memoization for performance
    function memoize<T extends any[], U>(
      fn: (...args: T) => U
    ): (...args: T) => U {
      const cache = new Map<string, U>();
      return (...args: T) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
          return cache.get(key)!;
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
      };
    }

    let expensiveCallCount = 0;
    const expensiveFunction = (n: number): number => {
      expensiveCallCount++;
      return n * n;
    };

    const memoizedExpensive = memoize(expensiveFunction);

    memoizedExpensive(5);
    memoizedExpensive(5); // Should use cache
    memoizedExpensive(3);
    memoizedExpensive(5); // Should use cache again

    this.assertEqual(this.___(), expensiveCallCount); // 2 (only computed twice)
    this.assertEqual(25, memoizedExpensive(5)); // Still works correctly
  }
}
