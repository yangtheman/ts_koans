import { Koan } from "./koan";

/**
 * About Async/Await - A Comprehensive Guide to Asynchronous Programming
 *
 * This koan focuses on practical understanding of async/await patterns rather than
 * just asking "what's the constructor name?" repeatedly. Students will learn:
 *
 * - How promises resolve to actual values, not just Promise objects
 * - Practical error handling patterns with promises and async/await
 * - Real differences between promise chains and async/await syntax
 * - Promise concurrency patterns (all, allSettled, race) with meaningful examples
 * - Real-world async patterns: retry logic, caching, batching, validation
 *
 * Each test demonstrates concepts through working code examples that students
 * can understand and apply in real projects.
 */

export class AboutAsyncAwait extends Koan {
  constructor() {
    super("AboutAsyncAwait", "about-async-await.ts");
  }

  /**
   * Understanding Promise Values and Resolution
   *
   * Promises wrap values and make them available asynchronously. Understanding
   * how promises resolve, what they contain, and how to extract their values
   * is fundamental to async programming.
   */
  async test_promise_values_and_resolution(): Promise<void> {
    // Promises resolve to actual values, not just "Promise" objects
    const numberPromise = Promise.resolve(42);
    const stringPromise = Promise.resolve("Hello World");
    const objectPromise = Promise.resolve({ name: "Alice", age: 30 });
    const arrayPromise = Promise.resolve([1, 2, 3, 4, 5]);

    // We can extract values using await
    const extractedNumber: number = await numberPromise;
    const extractedString: string = await stringPromise;
    const extractedObject: { name: string; age: number } = await objectPromise;
    const extractedArray: number[] = await arrayPromise;

    // What values do the promises resolve to?
    this.assertEqual(this.___(), extractedNumber);
    this.assertEqual(this.___(), extractedString);
    this.assertEqual(this.___(), extractedObject.name);
    this.assertEqual(this.___(), extractedObject.age);
    this.assertEqual(this.___(), extractedArray.length);
    this.assertEqual(this.___(), extractedArray[2]); // Third element

    // Promise.resolve() vs new Promise()
    const quickResolve = Promise.resolve("immediate");
    const delayedResolve = new Promise<string>((resolve) => {
      resolve("eventual"); // Resolves on next tick
    });

    const quickValue = await quickResolve;
    const delayedValue = await delayedResolve;

    this.assertEqual(this.___(), quickValue);
    this.assertEqual(this.___(), delayedValue);

    // Chaining transforms values
    const mathChain = Promise.resolve(5)
      .then((x) => x * 2) // 10
      .then((x) => x + 3) // 13
      .then((x) => x ** 2); // 169

    const finalMathResult = await mathChain;
    this.assertEqual(this.___(), finalMathResult);

    // Type transformations in chains
    const typeChain = Promise.resolve(100)
      .then((num) => `Number: ${num}`) // number → string
      .then((str) => str.length) // string → number
      .then((len) => len > 10) // number → boolean
      .then((bool) => ({ isLong: bool })); // boolean → object

    const chainResult: { isLong: boolean } = await typeChain;
    this.assertEqual(this.___(), chainResult.isLong);
  }

  /**
   * Error Handling Patterns with Promises
   *
   * Understanding how errors propagate through promise chains and how to
   * handle them effectively is crucial for robust applications.
   */
  async test_promise_error_handling(): Promise<void> {
    // Basic error catching
    const throwingPromise = Promise.resolve("start")
      .then(() => {
        throw new Error("Something went wrong");
      })
      .catch((err) => `Caught: ${err.message}`)
      .then((result) => `Final: ${result}`);

    const errorResult = await throwingPromise;
    this.assertEqual(this.___(), errorResult); // What's the final result?

    // Errors skip .then() handlers until caught
    let step1Called = false;
    let step2Called = false;
    let catchCalled = false;
    let finalCalled = false;

    await Promise.reject("initial error")
      .then(() => {
        step1Called = true;
        return "step 1";
      })
      .then(() => {
        step2Called = true;
        return "step 2";
      })
      .catch((err) => {
        catchCalled = true;
        return `recovered from: ${err}`;
      })
      .then((result) => {
        finalCalled = true;
        return result;
      });

    this.assertEqual(this.___(), step1Called); // Did step 1 run?
    this.assertEqual(this.___(), step2Called); // Did step 2 run?
    this.assertEqual(this.___(), catchCalled); // Did catch run?
    this.assertEqual(this.___(), finalCalled); // Did final then run?

    // Multiple error handling strategies
    function parseJSON(jsonString: string): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const result = JSON.parse(jsonString);
          resolve(result);
        } catch (error) {
          reject(new Error(`Invalid JSON: ${jsonString}`));
        }
      });
    }

    const validResult = await parseJSON('{"name": "Alice"}');
    let invalidResult: string = "";

    try {
      await parseJSON("invalid json");
    } catch (err) {
      invalidResult = (err as Error).message;
    }

    this.assertEqual(this.___(), validResult?.name); // What name was parsed?
    this.assertEqual(true, invalidResult.includes("Invalid JSON")); // Fill in the blank

    // Promise.finally() for cleanup - always runs
    let cleanupCount = 0;

    const successfulCleanup = await Promise.resolve("success")
      .finally(() => {
        cleanupCount++;
      })
      .then((result) => result);

    const failedCleanup = await Promise.reject("error")
      .finally(() => {
        cleanupCount++;
      })
      .catch((err) => `handled: ${err}`);

    // Both promises will increment cleanup counter
    this.assertEqual(this.___(), cleanupCount); // Fill in the blank
  }

  /**
   * Async/Await vs Promises Comparison
   *
   * Understanding the difference between Promise chains and async/await syntax
   * helps you choose the right approach for different scenarios.
   */
  async test_async_await_vs_promises(): Promise<void> {
    // Promise chain approach
    function fetchUserDataWithPromises(userId: string): Promise<string> {
      return Promise.resolve(`user-${userId}`)
        .then((id) => Promise.resolve({ id, profile: `Profile for ${id}` }))
        .then((user) =>
          Promise.resolve({ settings: "dark mode" }).then((settings) => ({
            user,
            settings,
          }))
        )
        .then(
          ({ user, settings }) =>
            `User: ${user.profile}, Settings: ${settings.settings}`
        );
    }

    // Async/await approach - same logic, different syntax
    async function fetchUserDataWithAsync(userId: string): Promise<string> {
      const id = await Promise.resolve(`user-${userId}`);
      const user = await Promise.resolve({ id, profile: `Profile for ${id}` });
      const settings = await Promise.resolve({ settings: "dark mode" });

      return `User: ${user.profile}, Settings: ${settings.settings}`;
    }

    const promiseChainResult = await fetchUserDataWithPromises("123");
    const asyncAwaitResult = await fetchUserDataWithAsync("123");

    // Both approaches should produce the same result
    this.assertEqual(this.___(), promiseChainResult === asyncAwaitResult);

    // Error handling comparison
    function handleErrorsWithPromises(): Promise<string> {
      return Promise.resolve("start")
        .then(() => {
          throw new Error("Something failed");
        })
        .catch((err) => `Promise caught: ${err.message}`)
        .then((result) => `Promise final: ${result}`);
    }

    async function handleErrorsWithAsync(): Promise<string> {
      try {
        await Promise.resolve("start");
        throw new Error("Something failed");
      } catch (err) {
        const caught = `Async caught: ${(err as Error).message}`;
        return `Async final: ${caught}`;
      }
    }

    const promiseErrorResult = await handleErrorsWithPromises();
    const asyncErrorResult = await handleErrorsWithAsync();

    this.assertEqual(true, promiseErrorResult.includes("Promise caught"));
    this.assertEqual(true, asyncErrorResult.includes("Async caught"));

    // Concurrent operations - Promises vs async/await
    async function sequentialAsync(): Promise<number> {
      const first = await Promise.resolve(10); // Wait for first
      const second = await Promise.resolve(20); // Then wait for second
      const third = await Promise.resolve(30); // Then wait for third
      return first + second + third;
    }

    async function parallelAsync(): Promise<number> {
      const [first, second, third] = await Promise.all([
        Promise.resolve(10), // All three start simultaneously
        Promise.resolve(20),
        Promise.resolve(30),
      ]);
      return first + second + third;
    }

    const sequentialResult = await sequentialAsync();
    const parallelResult = await parallelAsync();

    // Both should have the same final result
    this.assertEqual(this.___(), sequentialResult);
    this.assertEqual(this.___(), parallelResult);

    // Async function always returns a Promise
    async function returnNumber(): Promise<number> {
      return 42; // Automatically wrapped in Promise.resolve()
    }

    async function returnPromise(): Promise<string> {
      return Promise.resolve("wrapped"); // Promise is not double-wrapped
    }

    const numResult = returnNumber();
    const stringResult = returnPromise();

    // What type do async functions always return?
    this.assertEqual(this.___(), numResult.constructor.name);
    this.assertEqual(this.___(), stringResult.constructor.name);
  }

  /**
   * Promise Concurrency Patterns
   *
   * Different Promise static methods solve different concurrency problems.
   * Understanding when to use each pattern is key to building efficient apps.
   */
  async test_promise_concurrency_patterns(): Promise<void> {
    // Promise.all() - All must succeed, fail fast on first error
    const promise1 = Promise.resolve("Task 1 done");
    const promise2 = Promise.resolve("Task 2 done");
    const promise3 = Promise.resolve("Task 3 done");

    const allResults = await Promise.all([promise1, promise2, promise3]);

    this.assertEqual(this.___(), allResults.length); // Fill in the blank
    this.assertEqual(this.___(), allResults[1]); // What's the second result?

    // Promise.all() with mixed success/failure
    const successTask = Promise.resolve("success");
    const failingTask = Promise.reject("failed");
    const anotherTask = Promise.resolve("another");

    // Promise.allSettled() - Wait for all, regardless of success/failure
    const allSettledResults = await Promise.allSettled([
      successTask,
      failingTask,
      anotherTask,
    ]);

    // Promise.all() - Fails if any promise fails
    let allFailedResults: string = "";
    try {
      await Promise.all([successTask, failingTask, anotherTask]);
    } catch (error) {
      allFailedResults = error as string;
    }

    this.assertEqual(this.___(), allSettledResults.length); // Fill in the blank
    this.assertEqual(this.___(), allFailedResults); // What error was caught?

    // Promise.race() - First to finish wins
    const slowTask = new Promise<string>((resolve) => {
      // In real code: setTimeout(() => resolve("slow"), 1000)
      resolve("slow");
    });
    const fastTask = Promise.resolve("fast");
    const mediumTask = new Promise<string>((resolve) => {
      // In real code: setTimeout(() => resolve("medium"), 500)
      resolve("medium");
    });

    const raceWinner = await Promise.race([slowTask, fastTask, mediumTask]);

    this.assertEqual(this.___(), raceWinner); // Fill in the blank

    // Real-world example: API with timeout
    function fetchWithTimeout<T>(
      dataPromise: Promise<T>,
      timeoutMs: number
    ): Promise<T> {
      const timeoutPromise = new Promise<never>((_, reject) => {
        // In real code: setTimeout(() => reject(new Error('Timeout')), timeoutMs)
        reject(new Error("Timeout"));
      });

      return Promise.race([dataPromise, timeoutPromise]);
    }

    const apiCall = Promise.resolve({ data: "API response" });
    let timedResult = "";
    let timeoutError = "";

    try {
      const result = await fetchWithTimeout(apiCall, 5000);
      timedResult = result.data;
    } catch (error) {
      timeoutError = (error as Error).message;
    }

    // Since apiCall resolves immediately, it should win the race
    this.assertEqual(this.___(), timedResult);
    this.assertEqual(this.___(), timeoutError); // Should be empty since no timeout

    // Parallel vs Sequential execution patterns
    async function processItemsSequentially(
      items: number[]
    ): Promise<number[]> {
      const results: number[] = [];
      for (const item of items) {
        const processed = await Promise.resolve(item * 2); // Simulate async work
        results.push(processed);
      }
      return results;
    }

    async function processItemsInParallel(items: number[]): Promise<number[]> {
      const promises = items.map((item) => Promise.resolve(item * 2));
      return Promise.all(promises);
    }

    const sequentialResults = await processItemsSequentially([1, 2, 3]);
    const parallelResults = await processItemsInParallel([1, 2, 3]);

    // Both should produce the same results
    this.assertEqual(this.___(), sequentialResults[0]); // First sequential result?
    this.assertEqual(this.___(), parallelResults[2]); // Third parallel result?
    this.assertEqual(this.___(), sequentialResults.length === parallelResults.length);
  }

  /**
   * Real-World Async Patterns
   *
   * Common async patterns you'll encounter in real applications.
   * These examples focus on practical scenarios and useful techniques.
   */
  async test_real_world_async_patterns(): Promise<void> {
    // Retry pattern with exponential backoff
    async function retryWithBackoff<T>(
      operation: () => Promise<T>,
      maxRetries: number = 3,
      baseDelay: number = 1000
    ): Promise<T> {
      let lastError: Error;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          return await operation();
        } catch (error) {
          lastError = error as Error;

          if (attempt === maxRetries) {
            throw lastError;
          }

          // Exponential backoff: 1s, 2s, 4s, etc.
          const delay = baseDelay * Math.pow(2, attempt - 1);
          // In real code: await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      throw lastError!;
    }

    let attemptCount = 0;
    const unstableOperation = async (): Promise<string> => {
      attemptCount++;
      if (attemptCount < 3) {
        throw new Error(`Attempt ${attemptCount} failed`);
      }
      return "Success after retries!";
    };

    const retryResult = await retryWithBackoff(unstableOperation);

    this.assertEqual(this.___(), retryResult);
    this.assertEqual(this.___(), attemptCount); // Fill in the blank

    // Caching async results
    class AsyncCache<K, V> {
      private cache = new Map<K, Promise<V>>();

      async get(key: K, factory: (key: K) => Promise<V>): Promise<V> {
        // If we have a cached promise, return it
        if (this.cache.has(key)) {
          return this.cache.get(key)!;
        }

        // Create and cache the promise
        const promise = factory(key);
        this.cache.set(key, promise);

        try {
          const result = await promise;
          return result;
        } catch (error) {
          // Remove failed promises from cache so they can be retried
          this.cache.delete(key);
          throw error;
        }
      }

      clear(): void {
        this.cache.clear();
      }
    }

    const cache = new AsyncCache<string, string>();
    let fetchCallCount = 0;

    const mockFetch = async (id: string): Promise<string> => {
      fetchCallCount++;
      return `Data for ${id}`;
    };

    // Both calls should use the same cached promise
    const firstCall = await cache.get("user1", mockFetch);
    const secondCall = await cache.get("user1", mockFetch);

    this.assertEqual(this.___(), fetchCallCount); // Fill in the blank
    this.assertEqual(this.___(), firstCall); // What data was returned?
    this.assertEqual(this.___(), firstCall === secondCall); // Same result?

    // Batch processing with concurrency limit
    async function processBatch<T, R>(
      items: T[],
      processor: (item: T) => Promise<R>,
      concurrency: number = 3
    ): Promise<R[]> {
      const results: R[] = [];

      for (let i = 0; i < items.length; i += concurrency) {
        const batch = items.slice(i, i + concurrency);
        const batchPromises = batch.map(processor);
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
      }

      return results;
    }

    const numbers = [1, 2, 3, 4, 5, 6, 7];
    const doubler = async (n: number): Promise<number> => n * 2;

    const batchResults = await processBatch(numbers, doubler, 3);

    this.assertEqual(this.___(), batchResults.length); // Fill in the blank
    this.assertEqual(this.___(), batchResults[3]); // What's the 4th result (index 3)?

    // Async validation with early termination
    async function validateAsync<T>(
      data: T,
      validators: Array<(data: T) => Promise<string | null>>
    ): Promise<{ isValid: boolean; errors: string[] }> {
      const errors: string[] = [];

      for (const validator of validators) {
        const error = await validator(data);
        if (error) {
          errors.push(error);
        }
      }

      return { isValid: errors.length === 0, errors };
    }

    const user = { name: "", email: "invalid-email" };
    type User = { name: string; email: string };

    const nameValidator = async (user: User): Promise<string | null> => {
      return user.name.length === 0 ? "Name is required" : null;
    };

    const emailValidator = async (user: User): Promise<string | null> => {
      return user.email.includes("@") ? null : "Invalid email format";
    };

    const validationResult = await validateAsync(user, [
      nameValidator,
      emailValidator,
    ]);

    this.assertEqual(this.___(), validationResult.isValid); // Fill in the blank
    this.assertEqual(this.___(), validationResult.errors.length); // Fill in the blank
    this.assertEqual(this.___(), validationResult.errors[0]); // What's the first error?

    // Async pipeline with transformation
    class AsyncPipeline<T> {
      constructor(private data: T) {}

      async pipe<U>(
        transform: (data: T) => Promise<U>
      ): Promise<AsyncPipeline<U>> {
        const result = await transform(this.data);
        return new AsyncPipeline(result);
      }

      async getValue(): Promise<T> {
        return this.data;
      }
    }

    // Create pipeline step by step to avoid chaining promises
    async function createPipeline(): Promise<string> {
      const step1 = new AsyncPipeline(5);
      const step2 = await step1.pipe(async (x: number) => x * 2); // 10
      const step3 = await step2.pipe(async (x: number) => x + 3); // 13
      const step4 = await step3.pipe(async (x: number) => `Result: ${x}`); // "Result: 13"
      return await step4.getValue();
    }

    const pipelineResult = await createPipeline();

    this.assertEqual(this.___(), pipelineResult);

    // Async factory with dependency injection
    class AsyncFactory {
      private instances = new Map<string, Promise<any>>();

      async create<T>(
        name: string,
        factory: () => Promise<T>,
        dependencies: string[] = []
      ): Promise<T> {
        if (this.instances.has(name)) {
          return this.instances.get(name)!;
        }

        const instancePromise = this.createWithDependencies(
          factory,
          dependencies
        );
        this.instances.set(name, instancePromise);

        return instancePromise;
      }

      private async createWithDependencies<T>(
        factory: () => Promise<T>,
        dependencies: string[]
      ): Promise<T> {
        // Wait for all dependencies to be ready
        await Promise.all(dependencies.map((dep) => this.instances.get(dep)));
        return factory();
      }
    }

    const factory = new AsyncFactory();

    let createdServices: string[] = [];

    // Create services with dependencies
    await factory.create("database", async () => {
      createdServices.push("database");
      return { type: "database" };
    });

    await factory.create(
      "cache",
      async () => {
        createdServices.push("cache");
        return { type: "cache" };
      },
      ["database"]
    );

    await factory.create(
      "api",
      async () => {
        createdServices.push("api");
        return { type: "api" };
      },
      ["database", "cache"]
    );

    // The factory should handle dependency ordering
    this.assertEqual(this.___(), createdServices[0]); // What service was created first?
    this.assertEqual(this.___(), createdServices.length); // Fill in the blank
  }
}
