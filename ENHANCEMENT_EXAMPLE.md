# Enhancement Example: about-functions.ts

This document shows how to apply the Elixir koans approach to enhance the `about-functions.ts` module, following the pattern established in the enhanced `about-types.ts`.

## Current State Analysis

**Current `about-functions.ts`:**
- 10 basic tests
- Simple explanations (2-3 lines each)
- Covers basic function concepts
- Missing advanced patterns, best practices, and real-world scenarios

## Enhanced Version Structure

### Proposed Test Organization:

```typescript
export class AboutFunctions extends Koan {
  // CONCEPT: Functions as First-Class Citizens in TypeScript
  //
  // Functions in TypeScript are first-class citizens, meaning they can be:
  // - Assigned to variables
  // - Passed as arguments to other functions
  // - Returned from other functions
  // - Created at runtime
  // - Have properties and methods
  //
  // TypeScript adds static type checking to JavaScript's flexible function system,
  // providing safety while maintaining JavaScript's functional programming capabilities.
  //
  // Function Categories in TypeScript:
  // - Function declarations: function name() {}
  // - Function expressions: const name = function() {}
  // - Arrow functions: const name = () => {}
  // - Method definitions: { method() {} }
  // - Constructor functions: function Constructor() {}
  // - Generator functions: function* generator() {}
  // - Async functions: async function() {}

  test_01_function_declarations_and_hoisting(): void {
    // CONCEPT: Function Declarations and Hoisting Behavior
    //
    // Function declarations are "hoisted" to the top of their scope, meaning
    // they can be called before they're defined in the code. This is different
    // from function expressions and arrow functions.
    
    // This works due to hoisting
    const result = hoistedFunction();
    this.assertEqual(this.___(), result); // "I'm hoisted!"
    
    function hoistedFunction(): string {
      return "I'm hoisted!";
    }
    
    // Function declaration characteristics:
    // - Hoisted to the top of their scope
    // - Can be called before definition
    // - Creates a named function
    // - 'this' binding depends on call site
    
    this.assertEqual("function", typeof hoistedFunction);
    this.assertEqual(this.___(), hoistedFunction.name); // "hoistedFunction"
  }

  test_02_function_expressions_and_timing(): void {
    // CONCEPT: Function Expressions and Temporal Dead Zone
    //
    // Function expressions are not hoisted. Variables are hoisted but not
    // their assignments, creating a "temporal dead zone" where the variable
    // exists but is undefined.

    // This would throw: Cannot access 'functionExpression' before initialization
    // functionExpression(); // ReferenceError!

    const functionExpression = function(): string {
      return "I'm an expression!";
    };

    this.assertEqual(this.___(), functionExpression()); // "I'm an expression!"
    
    // Anonymous vs named function expressions
    const anonymousExpr = function(): string { return "anonymous"; };
    const namedExpr = function namedFunction(): string { return "named"; };
    
    this.assertEqual(this.___(), anonymousExpr.name); // ""
    this.assertEqual("namedFunction", namedExpr.name);
    
    // Named function expressions benefits:
    // - Better stack traces for debugging
    // - Self-reference within the function
    // - More descriptive in profiling tools
  }

  test_03_arrow_functions_comprehensive(): void {
    // CONCEPT: Arrow Functions - Lexical 'this' and Concise Syntax
    //
    // Arrow functions were introduced in ES6 with key differences:
    // - Lexical 'this' binding (inherits from enclosing scope)
    // - Cannot be used as constructors
    // - No 'arguments' object
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

    // Single parameter - parentheses optional
    const square = (x: number) => x * x;
    const squareWithParens = (x: number) => x * x;
    
    this.assertEqual(25, square(5));
    this.assertEqual(this.___(), squareWithParens(6)); // 36

    // No parameters - parentheses required
    const getMessage = () => "Hello TypeScript!";
    this.assertEqual(this.___(), getMessage()); // "Hello TypeScript!"

    // Lexical 'this' demonstration
    class Counter {
      private count = 0;

      // Arrow function inherits 'this' from class instance
      increment = () => {
        this.count++;
        return this.count;
      }

      // Regular method has dynamic 'this'
      getCount(): number {
        return this.count;
      }
    }

    const counter = new Counter();
    this.assertEqual(this.___(), counter.increment()); // 1
    this.assertEqual(2, counter.increment());
    this.assertEqual(this.___(), counter.getCount()); // 2
  }

  test_04_advanced_parameter_patterns(): void {
    // CONCEPT: Advanced Parameter Handling Patterns
    //
    // TypeScript provides sophisticated parameter handling that goes beyond
    // basic required parameters, including optional parameters, default values,
    // rest parameters, and destructuring patterns.

    // Optional parameters with type narrowing
    function greet(name?: string): string {
      if (name) {
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
    ): object {
      return { name, age, roles };
    }

    const user = createUser("Bob");
    this.assertEqual("Bob", user.name);
    this.assertEqual(this.___(), Array.isArray(user.roles)); // true
    this.assertEqual(["user"], user.roles);

    // Rest parameters with type safety
    function sum(...numbers: number[]): number {
      return numbers.reduce((total, num) => total + num, 0);
    }

    this.assertEqual(this.___(), sum(1, 2, 3, 4, 5)); // 15
    this.assertEqual(0, sum()); // Empty sum

    // Destructuring parameters
    function processPoint({ x, y }: { x: number; y: number }): number {
      return Math.sqrt(x * x + y * y);
    }

    this.assertEqual(5, processPoint({ x: 3, y: 4 })); // Pythagorean theorem

    // Complex destructuring with defaults
    function configureServer({
      port = 3000,
      host = "localhost",
      ssl = false
    }: {
      port?: number;
      host?: string;
      ssl?: boolean;
    } = {}): string {
      return `${ssl ? "https" : "http"}://${host}:${port}`;
    }

    this.assertEqual(this.___(), configureServer()); // "http://localhost:3000"
    this.assertEqual("https://example.com:8080", configureServer({
      port: 8080,
      host: "example.com",
      ssl: true
    }));
  }

  test_05_function_type_annotations(): void {
    // CONCEPT: Function Type Annotations and Type Safety
    //
    // TypeScript's function type annotations provide precise control over
    // function interfaces, enabling type-safe function composition and
    // helping prevent common runtime errors.

    // Explicit function type annotation
    const calculator: (a: number, b: number) => number = (a, b) => a + b;
    this.assertEqual(this.___(), calculator(10, 5)); // 15

    // Function type aliases for reusability
    type BinaryOperation = (left: number, right: number) => number;
    type UnaryOperation = (value: number) => number;

    const add: BinaryOperation = (a, b) => a + b;
    const subtract: BinaryOperation = (a, b) => a - b;
    const negate: UnaryOperation = (x) => -x;

    this.assertEqual(8, add(3, 5));
    this.assertEqual(this.___(), subtract(10, 3)); // 7
    this.assertEqual(-5, negate(5));

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
    const doubled = processArray(numbers, x => x * 2);
    const evenDoubled = processArray(numbers, x => x * 2, x => x % 4 === 0);

    this.assertEqual(this.___(), doubled); // [2, 4, 6, 8, 10]
    this.assertEqual([4, 8], evenDoubled);

    // Complex function signatures
    type EventHandler<T> = (event: T) => void | Promise<void>;
    type EventMap = {
      click: { x: number; y: number };
      keypress: { key: string; ctrlKey: boolean };
    };

    function addEventListener<K extends keyof EventMap>(
      event: K,
      handler: EventHandler<EventMap[K]>
    ): void {
      // Event registration logic would go here
      console.log(`Registered ${event} handler`);
    }

    addEventListener("click", (event) => {
      // TypeScript knows event is { x: number; y: number }
      console.log(`Clicked at ${event.x}, ${event.y}`);
    });
  }

  test_06_function_overloads(): void {
    // CONCEPT: Function Overloads - Multiple Function Signatures
    //
    // Function overloads allow you to define multiple type signatures for a
    // single function implementation. This is useful when a function behaves
    // differently based on the number or types of arguments.

    // Overload signatures
    function combine(a: string, b: string): string;
    function combine(a: number, b: number): number;
    function combine(a: string[], b: string[]): string[];
    
    // Implementation signature (must be compatible with all overloads)
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
  }

  test_07_closures_and_scope(): void {
    // CONCEPT: Closures - Functions Remembering Their Environment
    //
    // Closures are functions that have access to variables from their outer
    // (enclosing) scope even after the outer function has returned. This is
    // fundamental to many JavaScript patterns and TypeScript preserves this.

    // Basic closure example
    function createMultiplier(multiplier: number): (x: number) => number {
      return (x: number) => x * multiplier;
    }

    const double = createMultiplier(2);
    const triple = createMultiplier(3);

    this.assertEqual(this.___(), double(5)); // 10
    this.assertEqual(15, triple(5));

    // Counter with private state
    function createCounter(initialValue: number = 0) {
      let count = initialValue;

      return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count,
        reset: () => { count = initialValue; }
      };
    }

    const counter = createCounter(10);
    this.assertEqual(this.___(), counter.increment()); // 11
    this.assertEqual(12, counter.increment());
    this.assertEqual(this.___(), counter.decrement()); // 11
    this.assertEqual(11, counter.getValue());

    // Module pattern with closure
    const calculator = (function() {
      let memory = 0;

      return {
        add: (value: number) => { memory += value; },
        subtract: (value: number) => { memory -= value; },
        multiply: (value: number) => { memory *= value; },
        divide: (value: number) => { memory /= value; },
        getMemory: () => memory,
        clear: () => { memory = 0; }
      };
    })();

    calculator.add(10);
    calculator.multiply(3);
    this.assertEqual(this.___(), calculator.getMemory()); // 30
    
    calculator.clear();
    this.assertEqual(0, calculator.getMemory());

    // Closure performance considerations:
    // - Variables in closure scope are not garbage collected
    // - Can lead to memory leaks if not handled properly
    // - Useful for data privacy and encapsulation
    // - Foundation for many design patterns
  }

  test_08_recursive_functions(): void {
    // CONCEPT: Recursive Functions and Stack Safety
    //
    // Recursion is when a function calls itself. TypeScript provides excellent
    // type safety for recursive functions, but care must be taken to avoid
    // stack overflow errors.

    // Classic factorial example
    function factorial(n: number): number {
      if (n <= 1) return 1;
      return n * factorial(n - 1);
    }

    this.assertEqual(this.___(), factorial(5)); // 120
    this.assertEqual(1, factorial(0));

    // Tail-recursive optimization (conceptual - JS engines may optimize)
    function factorialTailRec(n: number, accumulator: number = 1): number {
      if (n <= 1) return accumulator;
      return factorialTailRec(n - 1, n * accumulator);
    }

    this.assertEqual(120, factorialTailRec(5));

    // Tree traversal with recursion
    interface TreeNode<T> {
      value: T;
      children: TreeNode<T>[];
    }

    function traverseTree<T>(node: TreeNode<T>, visit: (value: T) => void): void {
      visit(node.value);
      node.children.forEach(child => traverseTree(child, visit));
    }

    const tree: TreeNode<string> = {
      value: "root",
      children: [
        { value: "child1", children: [] },
        { value: "child2", children: [
          { value: "grandchild", children: [] }
        ]}
      ]
    };

    const visited: string[] = [];
    traverseTree(tree, value => visited.push(value));

    this.assertEqual(this.___(), visited); // ["root", "child1", "child2", "grandchild"]

    // Mutual recursion
    function isEven(n: number): boolean {
      if (n === 0) return true;
      return isOdd(n - 1);
    }

    function isOdd(n: number): boolean {
      if (n === 0) return false;
      return isEven(n - 1);
    }

    this.assertEqual(this.___(), isEven(4)); // true
    this.assertEqual(false, isEven(5));
    this.assertEqual(this.___(), isOdd(3)); // true
    this.assertEqual(false, isOdd(2));
  }

  test_09_async_functions_and_promises(): void {
    // CONCEPT: Async Functions and Promise Integration
    //
    // Async functions are syntactic sugar over Promises, making asynchronous
    // code look and behave more like synchronous code. They always return
    // a Promise, regardless of what you explicitly return.

    // Basic async function
    async function fetchData(): Promise<string> {
      return "data fetched";
    }

    // TypeScript understands the return type
    const promise = fetchData();
    this.assertEqual(this.___(), promise instanceof Promise); // true

    // Async function with await
    async function processData(): Promise<number> {
      const data = await fetchData();
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
    async function safeOperation(): Promise<string> {
      try {
        const result = await riskyOperation(false);
        return result;
      } catch (error) {
        return `Error: ${error.message}`;
      }
    }

    // These tests would need to be async in a real scenario
    // For demonstration, we'll check the types and structure
    this.assertEqual("function", typeof processData);
    this.assertEqual(this.___(), typeof safeOperation); // "function"

    // Promise-based patterns
    type AsyncFunction<T> = () => Promise<T>;
    type AsyncMapper<T, U> = (item: T) => Promise<U>;

    async function asyncMap<T, U>(
      items: T[],
      mapper: AsyncMapper<T, U>
    ): Promise<U[]> {
      const promises = items.map(mapper);
      return Promise.all(promises);
    }

    // Generic async utilities
    type PromiseResolver<T> = (value: T) => void;
    type PromiseRejecter = (reason: any) => void;

    function delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
      return Promise.race([
        promise,
        delay(ms).then(() => Promise.reject(new Error("Timeout")))
      ]);
    }
  }

  test_10_function_composition_patterns(): void {
    // CONCEPT: Function Composition - Building Complex from Simple
    //
    // Function composition is combining simple functions to create more
    // complex behavior. This promotes code reuse, testability, and
    // understanding by breaking complex operations into simple steps.

    // Simple composition
    const addOne = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const square = (x: number) => x * x;

    const composed = (x: number) => square(double(addOne(x)));
    this.assertEqual(this.___(), composed(3)); // square(double(4)) = square(8) = 64

    // Generic compose function
    function compose<T, U, V>(
      f: (x: U) => V,
      g: (x: T) => U
    ): (x: T) => V {
      return (x: T) => f(g(x));
    }

    const doubleAndSquare = compose(square, double);
    this.assertEqual(this.___(), doubleAndSquare(4)); // square(8) = 64

    // Pipe function (left-to-right composition)
    function pipe<T>(...functions: Array<(x: T) => T>): (x: T) => T {
      return (x: T) => functions.reduce((acc, fn) => fn(acc), x);
    }

    const pipeline = pipe(addOne, double, square);
    this.assertEqual(64, pipeline(3)); // Same as composed above

    // Currying for partial application
    function curry<T, U, V>(
      fn: (a: T, b: U) => V
    ): (a: T) => (b: U) => V {
      return (a: T) => (b: U) => fn(a, b);
    }

    const add = (a: number, b: number) => a + b;
    const curriedAdd = curry(add);
    const add5 = curriedAdd(5);

    this.assertEqual(this.___(), add5(3)); // 8
    this.assertEqual(12, add5(7));

    // Point-free style (tacit programming)
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(double); // Point-free: no need for x => double(x)
    
    this.assertEqual(this.___(), doubled); // [2, 4, 6, 8, 10]

    // Function composition with async
    type AsyncTransform<T, U> = (x: T) => Promise<U>;

    async function composeAsync<T, U, V>(
      f: AsyncTransform<U, V>,
      g: AsyncTransform<T, U>
    ): Promise<AsyncTransform<T, V>> {
      return async (x: T) => f(await g(x));
    }
  }
}
```

## Key Enhancements Demonstrated

### 1. **Comprehensive Concept Headers**
- Each test group starts with detailed concept explanation
- Explains "why" not just "how"
- Includes real-world context and use cases

### 2. **Progressive Complexity**
- Tests build from basic to advanced
- Each test introduces new concepts while reinforcing previous ones
- Clear learning progression

### 3. **Real-World Patterns**
- Closure patterns for data privacy
- Function composition for reusability
- Async patterns for modern JavaScript
- Type-safe higher-order functions

### 4. **Advanced TypeScript Features**
- Function overloads
- Generic function types
- Complex type constraints
- Integration with TypeScript's type system

### 5. **Best Practices Integration**
- Shows both good and problematic patterns
- Explains performance implications
- Demonstrates modern JavaScript/TypeScript idioms

### 6. **Comprehensive Coverage**
- All major function concepts covered
- Edge cases and gotchas included
- Practical applications demonstrated

This approach transforms a basic function tutorial into a comprehensive exploration of functions in TypeScript, suitable for both learning the language and understanding advanced patterns used in real-world applications.
