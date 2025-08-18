import { Koan } from "./koan";

export class AboutFunctions extends Koan {
  constructor() {
    super("AboutFunctions", "about-functions.ts");
  }

  // Learn: Function declarations define reusable blocks of code
  // Functions can take parameters (inputs) and return values (outputs)
  // The function keyword, followed by name, parameters, and return type
  // Example: function greet(name: string): string defines a function that takes a string and returns a string
  test_function_declarations(): void {
    function greet(name: string): string {
      return `Hello, ${name}!`;
    }

    this.assertEqual(this.___(), greet("World")); // Fill in the blank
    this.assertEqual("function", typeof greet);
  }

  // Learn: Function expressions assign a function to a variable
  // Uses the 'function' keyword but without a name (anonymous function)
  // The variable name is used to call the function
  // Example: const myFunc = function() { ... } creates a function expression
  test_function_expressions(): void {
    const add = function (a: number, b: number): number {
      return a + b;
    };

    this.assertEqual(this.__(), add(2, 3)); // Fill in the blank
    this.assertEqual("function", typeof add);
  }

  // Learn: Arrow functions provide a shorter syntax for writing functions
  // Uses => instead of the function keyword
  // Can be even shorter for single expressions (no return keyword needed)
  // Example: (x, y) => x + y is equivalent to function(x, y) { return x + y; }
  test_arrow_functions(): void {
    const multiply = (a: number, b: number): number => a * b;
    const square = (x: number) => x * x;
    const sayHello = () => "Hello!";

    this.assertEqual(this.__(), multiply(3, 4)); // Fill in the blank
    this.assertEqual(25, square(5));
    this.assertEqual(this.___(), sayHello()); // Fill in the blank
  }

  // Learn: Optional parameters are marked with ? and can be omitted when calling the function
  // If an optional parameter is not provided, its value is undefined
  // Optional parameters must come after required parameters
  // Example: function greet(name: string, greeting?: string) - greeting can be omitted
  test_optional_parameters(): void {
    function createMessage(name: string, greeting?: string): string {
      return `${greeting || "Hello"}, ${name}!`;
    }

    this.assertEqual(this.___(), createMessage("Alice")); // Default greeting?
    this.assertEqual("Hi, Bob!", createMessage("Bob", "Hi"));
  }

  // Learn: Default parameters have a default value assigned with = in the parameter list
  // If the parameter is not provided, the default value is used
  // Default parameters are automatically optional
  // Example: function greet(name: string = 'World') - name defaults to 'World' if not provided
  test_default_parameters(): void {
    function power(base: number, exponent: number = 2): number {
      return Math.pow(base, exponent);
    }

    this.assertEqual(this.__(), power(3)); // 3 to the default power?
    this.assertEqual(27, power(3, 3));
    this.assertEqual(this.__(), power(4)); // 4 to the default power?
  }

  // Learn: Rest parameters (...param) collect multiple arguments into an array
  // Allows functions to accept any number of arguments
  // The rest parameter must be the last parameter
  // Example: function sum(...numbers) can be called with sum(1, 2, 3, 4, 5)
  test_rest_parameters(): void {
    function sum(...numbers: number[]): number {
      return numbers.reduce((total, num) => total + num, 0);
    }

    this.assertEqual(this.__(), sum(1, 2, 3)); // Sum of 1, 2, 3?
    this.assertEqual(10, sum(1, 2, 3, 4));
    this.assertEqual(this.__(), sum()); // Sum of no numbers?
  }

  // Learn: Function types define the structure of functions using type aliases
  // Specifies parameter types and return type: (param1: type1, param2: type2) => returnType
  // Variables can be typed with function types to ensure they match the expected signature
  // Example: type Calculator = (a: number, b: number) => number
  test_function_types(): void {
    type MathOperation = (a: number, b: number) => number;

    const add: MathOperation = (a, b) => a + b;
    const subtract: MathOperation = (a, b) => a - b;

    this.assertEqual(this.__(), add(5, 3)); // Fill in the blank
    this.assertEqual(2, subtract(5, 3));
  }

  // Learn: Higher-order functions are functions that take other functions as parameters
  // This allows for flexible, reusable code patterns
  // The function parameter can be called inside the higher-order function
  // Example: array.map(fn) applies function fn to each element of the array
  test_higher_order_functions(): void {
    function applyOperation(
      a: number,
      b: number,
      operation: (x: number, y: number) => number
    ): number {
      return operation(a, b);
    }

    const multiply = (x: number, y: number) => x * y;

    this.assertEqual(this.__(), applyOperation(6, 7, multiply)); // Fill in the blank
    this.assertEqual(
      13,
      applyOperation(6, 7, (x, y) => x + y)
    );
  }

  // Learn: Closures allow inner functions to access variables from their outer scope
  // The inner function "closes over" variables from the outer function
  // These variables remain accessible even after the outer function returns
  // Example: A counter function that remembers its count between calls
  test_closures(): void {
    function createCounter(initialValue: number = 0): () => number {
      let count = initialValue;
      return () => ++count;
    }

    const counter = createCounter(5);

    this.assertEqual(this.__(), counter()); // First call?
    this.assertEqual(7, counter());
    this.assertEqual(this.__(), counter()); // Third call?
  }
}
