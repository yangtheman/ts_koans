import { Koan } from "./koan";

export class AboutAsyncAwait extends Koan {
  constructor() {
    super("AboutAsyncAwait", "about-async-await.ts");
  }

  // Learn: Promises represent the eventual result of an asynchronous operation
  // Promise.resolve() creates a Promise that immediately resolves with a value
  // Promises have three states: pending, fulfilled (resolved), or rejected
  // .then() is used to handle the resolved value when it becomes available
  // Example: Promise.resolve('hello') creates a Promise containing 'hello'
  test_promises_basic(): void {
    const promise = Promise.resolve("Hello Promise");

    // We'll use a synchronous approach for testing
    let result: string = "";
    promise.then((value) => {
      result = value;
    });

    // In real async code, you'd await or use .then()
    // For testing purposes, we'll check the promise directly
    this.assertEqual("Promise", promise.constructor.name);
  }

  // Learn: async functions automatically return Promises
  // The 'async' keyword makes a function asynchronous
  // Even if you return a plain value, it gets wrapped in a Promise
  // The return type must be Promise<T> where T is the actual return type
  // Example: async function returning string actually returns Promise<string>
  test_async_function_declaration(): void {
    async function greet(name: string): Promise<string> {
      return `Hello, ${name}!`;
    }

    const result = greet("TypeScript");
    this.assertEqual(this.___(), result.constructor.name); // What type is returned?

    // To get the actual value, we'd need to await or use .then()
    // For testing, we'll check that it's a Promise
    this.assertEqual(true, result instanceof Promise);
  }

  // Learn: Arrow functions can also be async
  // Add 'async' before the parameter list: async () => {}
  // Like regular async functions, they return Promises
  // Async arrow functions are useful for callbacks and short operations
  // Example: const asyncFn = async () => 'result' returns Promise<string>
  test_async_arrow_functions(): void {
    const fetchData = async (): Promise<number> => {
      return 42;
    };

    const multiply = async (a: number, b: number): Promise<number> => a * b;

    this.assertEqual("AsyncFunction", fetchData.constructor.name);
    this.assertEqual(this.___(), multiply.constructor.name); // What constructor name?
  }

  // Learn: Promises have three possible states throughout their lifecycle
  // Pending: initial state, neither fulfilled nor rejected
  // Fulfilled (resolved): operation completed successfully
  // Rejected: operation failed with an error
  // Promise.resolve() creates a fulfilled Promise, Promise.reject() creates a rejected one
  // Example: Both resolved and rejected promises are still Promise objects
  test_promise_states(): void {
    const resolved = Promise.resolve("success");
    const rejected = Promise.reject("error");

    // Promises have three states: pending, fulfilled (resolved), rejected
    this.assertEqual("Promise", resolved.constructor.name);
    this.assertEqual(this.___(), rejected.constructor.name); // What constructor name?
  }

  // Learn: Promise chaining allows sequential asynchronous operations
  // Each .then() returns a new Promise with the transformed value
  // The chain passes the result from one .then() to the next
  // This avoids "callback hell" and makes async code more readable
  // Example: value goes through: 5 → 10 → 13 → "13"
  test_promise_chaining(): void {
    const promise = Promise.resolve(5)
      .then((x) => x * 2)
      .then((x) => x + 3)
      .then((x) => x.toString());

    // The chain returns a Promise
    this.assertEqual(this.___(), promise.constructor.name); // Fill in the blank
  }

  // Learn: .catch() handles Promise rejections (errors)
  // It's like a try/catch for asynchronous operations
  // .catch() can return a recovery value or transform the error
  // Even after .catch(), the result is still a Promise
  // Example: rejected promises can be "caught" and handled gracefully
  test_promise_error_handling(): void {
    const safePromise = Promise.resolve("good").catch(
      (error) => "caught error"
    );

    const errorPromise = Promise.reject("bad").catch(
      (error) => `caught: ${error}`
    );

    this.assertEqual("Promise", safePromise.constructor.name);
    this.assertEqual(this.___(), errorPromise.constructor.name); // What constructor name?
  }

  // Learn: Promise.all() waits for all promises to complete
  // It resolves when ALL input promises resolve, with an array of all results
  // If ANY promise rejects, Promise.all() immediately rejects
  // Useful for running multiple async operations concurrently
  // Example: Promise.all([p1, p2, p3]) waits for all three to finish
  test_promise_all(): void {
    const promise1 = Promise.resolve(1);
    const promise2 = Promise.resolve(2);
    const promise3 = Promise.resolve(3);

    const allPromises = Promise.all([promise1, promise2, promise3]);

    this.assertEqual(this.___(), allPromises.constructor.name); // Fill in the blank
  }

  // Learn: Promise.race() resolves with the first promise to settle (resolve OR reject)
  // It doesn't wait for all promises, just the fastest one
  // The result is the value from whichever promise finishes first
  // Useful for implementing timeouts or choosing the fastest data source
  // Example: race between slow and fast promises returns the fast result
  test_promise_race(): void {
    const slow = new Promise((resolve) =>
      setTimeout(() => resolve("slow"), 100)
    );
    const fast = Promise.resolve("fast");

    const race = Promise.race([slow, fast]);

    this.assertEqual(this.___(), race.constructor.name); // Fill in the blank
  }

  // Note: In real applications, you would use async/await like this:
  // async test_real_async_await(): Promise<void> {
  //   const result = await someAsyncFunction();
  //   this.assertEqual(expectedValue, result);
  // }
  //
  // But for educational purposes in koans, we focus on understanding
  // the types and structure rather than actual asynchronous execution.

  // Learn: Async functions always return Promises regardless of what you actually return
  // Promise<string> for functions returning strings
  // Promise<number> for functions returning numbers
  // Promise<void> for functions not returning anything meaningful
  // The Promise wrapper is automatic - you don't manually create it
  // Example: async function returning 42 has return type Promise<number>
  test_async_return_types(): void {
    // Async functions always return Promises
    async function getString(): Promise<string> {
      return "hello";
    }

    async function getNumber(): Promise<number> {
      return 42;
    }

    async function getVoid(): Promise<void> {
      console.log("doing something");
      return;
    }

    const stringPromise = getString();
    const numberPromise = getNumber();
    const voidPromise = getVoid();

    this.assertEqual("Promise", stringPromise.constructor.name);
    this.assertEqual(this.___(), numberPromise.constructor.name); // What constructor name?
    this.assertEqual("Promise", voidPromise.constructor.name);
  }

  // Learn: Async functions can throw errors just like synchronous functions
  // When an async function throws, it returns a rejected Promise
  // In real code, use try/catch with await, or .catch() with promises
  // Both successful and failing async functions return Promise objects
  // Example: async function that throws still returns a Promise (in rejected state)
  test_error_handling_types(): void {
    async function mightFail(shouldFail: boolean): Promise<string> {
      if (shouldFail) {
        throw new Error("Something went wrong");
      }
      return "success";
    }

    // In real code, you'd use try/catch or .catch()
    const successPromise = mightFail(false);
    const failPromise = mightFail(true);

    this.assertEqual(this.___(), successPromise.constructor.name); // Fill in the blank
    this.assertEqual("Promise", failPromise.constructor.name);
  }
}
