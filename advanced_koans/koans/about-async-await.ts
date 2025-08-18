import { Koan } from "./koan";

export class AboutAsyncAwait extends Koan {
  constructor() {
    super("AboutAsyncAwait", "about-async-await.ts");
  }

  /**
   * Promise Fundamentals and Creation Patterns
   *
   * Promises are the foundation of asynchronous JavaScript, representing values
   * that may not be available yet. Understanding promise states, creation patterns,
   * and basic operations is crucial for effective asynchronous programming.
   *
   * Key Concepts:
   * - Promise states: pending, fulfilled, rejected
   * - Promise constructors and factory methods
   * - Promise type annotations in TypeScript
   * - Synchronous promise creation vs async operations
   * - Promise immutability and functional composition
   *
   * Advanced patterns:
   * - Custom promise implementations
   * - Promise cancellation patterns
   * - Promise memoization and caching
   * - Lazy evaluation with promises
   * - Promise monitoring and debugging
   */
  test_promise_fundamentals_and_creation(): void {
    // Basic promise creation and states
    const resolvedPromise = Promise.resolve("Hello Promise");
    const rejectedPromise = Promise.reject("Error occurred").catch(
      (err) => `Caught: ${err}`
    );
    const pendingPromise = new Promise<string>((resolve) => {
      // In real code, this would be async operation like setTimeout
      resolve("Eventually resolved");
    });

    this.assertEqual("Promise", resolvedPromise.constructor.name);
    this.assertEqual(this.___(), rejectedPromise.constructor.name);
    this.assertEqual("Promise", pendingPromise.constructor.name);

    // Promise with explicit typing
    const typedPromise: Promise<number> = Promise.resolve(42);
    const stringPromise: Promise<string> = Promise.resolve("TypeScript");
    const booleanPromise: Promise<boolean> = Promise.resolve(true);

    this.assertEqual("Promise", typedPromise.constructor.name);
    this.assertEqual(this.___(), typeof typedPromise); // Runtime type

    // Promise constructor pattern
    const customPromise = new Promise<{ data: string; status: number }>(
      (resolve, reject) => {
        const success = true; // Simulated condition

        if (success) {
          resolve({ data: "Success!", status: 200 });
        } else {
          reject(new Error("Failed to process"));
        }
      }
    );

    this.assertEqual(this.___(), customPromise.constructor.name);

    // Promise factory functions
    function createDataPromise<T>(data: T): Promise<T> {
      return Promise.resolve(data);
    }

    function createErrorPromise(message: string): Promise<never> {
      return Promise.reject(new Error(message));
    }

    const dataPromise = createDataPromise({ id: 1, name: "Alice" });
    const errorPromise = createErrorPromise("Not found").catch(
      (err) => err.message
    );

    this.assertEqual("Promise", dataPromise.constructor.name);
    this.assertEqual(this.___(), errorPromise.constructor.name);

    // Promise.resolve behavior with different inputs
    const immediateValue = Promise.resolve(100);
    const existingPromise = Promise.resolve(immediateValue); // Doesn't double-wrap
    const thenable = Promise.resolve({
      then: (onResolve: Function) => onResolve("thenable"),
    });

    this.assertEqual("Promise", immediateValue.constructor.name);
    this.assertEqual(this.___(), existingPromise.constructor.name);
    this.assertEqual("Promise", thenable.constructor.name);

    // Promise chaining basics
    const chainedPromise = Promise.resolve(10)
      .then((x) => x * 2) // 20
      .then((x) => x + 5) // 25
      .then((x) => `Result: ${x}`); // "Result: 25"

    this.assertEqual(this.___(), chainedPromise.constructor.name);

    // Error handling in chains
    const errorChain = Promise.resolve("start")
      .then((x) => {
        throw new Error("Something went wrong");
      })
      .catch((err) => `Recovered: ${err.message}`)
      .then((x) => `Final: ${x}`);

    this.assertEqual(this.___(), errorChain.constructor.name);

    // Promise.finally() for cleanup
    let cleanupCalled = false;
    const finallyPromise = Promise.resolve("data")
      .finally(() => {
        cleanupCalled = true;
        return "cleanup"; // This value is ignored
      })
      .then((value) => value); // Still "data"

    this.assertEqual("Promise", finallyPromise.constructor.name);
    this.assertEqual(this.___(), cleanupCalled); // Finally runs synchronously in this case
  }

  /**
   * Async Functions and Await Syntax
   *
   * Async functions provide a cleaner, more readable way to work with promises.
   * The await keyword allows writing asynchronous code that looks synchronous,
   * while maintaining all the benefits of non-blocking operations.
   *
   * Key Concepts:
   * - Async function declarations and expressions
   * - Await keyword for promise resolution
   * - Error handling with try/catch in async functions
   * - Return type inference and explicit typing
   * - Async function composition and patterns
   *
   * Advanced patterns:
   * - Async generators and iterators
   * - Top-level await in modules
   * - Async function overloading
   * - Performance considerations with async/await
   * - Memory management in async operations
   */
  test_async_functions_and_await_syntax(): void {
    // Basic async function declarations
    async function greet(name: string): Promise<string> {
      return `Hello, ${name}!`; // Automatically wrapped in Promise
    }

    async function calculate(): Promise<number> {
      const a = 10;
      const b = 20;
      return a + b; // Returns Promise<number>
    }

    async function processData(): Promise<void> {
      console.log("Processing...");
      // No return value = Promise<void>
    }

    const greetResult = greet("TypeScript");
    const calcResult = calculate();
    const processResult = processData();

    this.assertEqual(this.___(), greetResult.constructor.name);
    this.assertEqual("Promise", calcResult.constructor.name);
    this.assertEqual(this.___(), processResult.constructor.name);

    // Async arrow functions
    const fetchData = async (): Promise<{ id: number; name: string }> => {
      return { id: 1, name: "User" };
    };

    const multiply = async (a: number, b: number): Promise<number> => a * b;

    const getData = async (id: number): Promise<string | null> => {
      if (id > 0) {
        return `Data for ID ${id}`;
      }
      return null;
    };

    this.assertEqual("AsyncFunction", fetchData.constructor.name);
    this.assertEqual(this.___(), multiply.constructor.name);
    this.assertEqual("AsyncFunction", getData.constructor.name);

    // Simulated await behavior (for educational purposes)
    // In real code, these would be actual async operations
    async function simulateAsync<T>(value: T, delay: number = 0): Promise<T> {
      // Simulate async operation without actual delay in tests
      return Promise.resolve(value);
    }

    async function demonstrateAwait(): Promise<string> {
      const step1 = await simulateAsync("First step");
      const step2 = await simulateAsync("Second step");
      const step3 = await simulateAsync("Third step");

      return `Completed: ${step1}, ${step2}, ${step3}`;
    }

    const awaitResult = demonstrateAwait();
    this.assertEqual(this.___(), awaitResult.constructor.name);

    // Error handling with async/await
    async function mightFail(shouldFail: boolean): Promise<string> {
      if (shouldFail) {
        throw new Error("Operation failed");
      }
      return "Success!";
    }

    async function handleErrors(): Promise<string> {
      try {
        const result1 = await mightFail(false);
        const result2 = await mightFail(true); // This will throw
        return `${result1} and ${result2}`;
      } catch (error) {
        return `Caught error: ${(error as Error).message}`;
      }
    }

    const errorHandlingResult = handleErrors();
    this.assertEqual(this.___(), errorHandlingResult.constructor.name);

    // Async function with multiple awaits
    async function sequentialOperations(): Promise<number> {
      const first = await simulateAsync(10);
      const second = await simulateAsync(20);
      const third = await simulateAsync(30);

      return first + second + third;
    }

    async function parallelOperations(): Promise<number> {
      const [first, second, third] = await Promise.all([
        simulateAsync(10),
        simulateAsync(20),
        simulateAsync(30),
      ]);

      return first + second + third;
    }

    this.assertEqual("Promise", sequentialOperations().constructor.name);
    this.assertEqual(this.___(), parallelOperations().constructor.name);

    // Async functions in object methods
    const apiClient = {
      async get(endpoint: string): Promise<{ data: any; status: number }> {
        return { data: `Data from ${endpoint}`, status: 200 };
      },

      async post(endpoint: string, data: any): Promise<{ success: boolean }> {
        return { success: true };
      },

      async handleRequest(
        method: "GET" | "POST",
        endpoint: string
      ): Promise<string> {
        try {
          if (method === "GET") {
            const response = await this.get(endpoint);
            return `GET ${endpoint}: ${response.status}`;
          } else {
            const response = await this.post(endpoint, {});
            return `POST ${endpoint}: ${response.success}`;
          }
        } catch (error) {
          return `Error: ${error}`;
        }
      },
    };

    const getRequest = apiClient.get("/users");
    const postRequest = apiClient.post("/users", { name: "Alice" });
    const handleRequest = apiClient.handleRequest("GET", "/profile");

    this.assertEqual(this.___(), getRequest.constructor.name);
    this.assertEqual("Promise", postRequest.constructor.name);
    this.assertEqual(this.___(), handleRequest.constructor.name);

    // Class methods with async
    class DataService {
      private cache = new Map<string, any>();

      async fetchUser(
        id: string
      ): Promise<{ id: string; name: string } | null> {
        if (this.cache.has(id)) {
          return this.cache.get(id);
        }

        const user = { id, name: `User ${id}` };
        this.cache.set(id, user);
        return user;
      }

      async batchFetch(
        ids: string[]
      ): Promise<Array<{ id: string; name: string }>> {
        const users = await Promise.all(ids.map((id) => this.fetchUser(id)));

        return users.filter((user) => user !== null) as Array<{
          id: string;
          name: string;
        }>;
      }

      async clearCache(): Promise<void> {
        this.cache.clear();
      }
    }

    const service = new DataService();
    const userPromise = service.fetchUser("1");
    const batchPromise = service.batchFetch(["1", "2", "3"]);
    const clearPromise = service.clearCache();

    this.assertEqual("Promise", userPromise.constructor.name);
    this.assertEqual(this.___(), batchPromise.constructor.name);
    this.assertEqual("Promise", clearPromise.constructor.name);
  }

  // Learn: Promises have three possible states throughout their lifecycle
  // Pending: initial state, neither fulfilled nor rejected
  // Fulfilled (resolved): operation completed successfully
  // Rejected: operation failed with an error
  // Promise.resolve() creates a fulfilled Promise, Promise.reject() creates a rejected one
  // Example: Both resolved and rejected promises are still Promise objects
  test_promise_states(): void {
    const resolved = Promise.resolve("success");
    const rejected = Promise.reject("error").catch(() => "handled error");

    // Promises have three states: pending, fulfilled (resolved), rejected
    this.assertEqual("Promise", resolved.constructor.name);
    this.assertEqual(this.___(), rejected.constructor.name); // What constructor name?
  }

  /**
   * Promise Concurrency and Advanced Patterns
   *
   * Understanding Promise concurrency patterns is essential for building
   * performant applications. Different patterns solve different problems:
   * parallel execution, sequential processing, racing, and complex coordination.
   *
   * Key Concepts:
   * - Promise.all() for parallel execution
   * - Promise.allSettled() for handling mixed results
   * - Promise.race() for timeout and fallback patterns
   * - Promise.any() for first successful result
   * - Sequential vs parallel processing patterns
   *
   * Advanced patterns:
   * - Promise batching and throttling
   * - Recursive promise patterns
   * - Promise cancellation strategies
   * - Error handling in concurrent operations
   * - Memory management in promise chains
   */
  test_promise_concurrency_and_advanced_patterns(): void {
    // Promise.all() - waits for all promises to resolve
    const promise1 = Promise.resolve(1);
    const promise2 = Promise.resolve(2);
    const promise3 = Promise.resolve(3);

    const allPromises = Promise.all([promise1, promise2, promise3]);
    this.assertEqual(this.___(), allPromises.constructor.name);

    // Promise.allSettled() - waits for all promises to settle (resolve OR reject)
    const successPromise = Promise.resolve("success");
    const failPromise = Promise.reject("error").catch((err) => ({
      error: err,
    }));

    const settledPromises = Promise.allSettled([successPromise, failPromise]);
    this.assertEqual(this.___(), settledPromises.constructor.name);

    // Promise.race() - resolves with first settled promise
    const slowPromise = new Promise((resolve) => {
      // In real code: setTimeout(() => resolve("slow"), 1000);
      resolve("slow");
    });
    const fastPromise = Promise.resolve("fast");

    const raceResult = Promise.race([slowPromise, fastPromise]);
    this.assertEqual(this.___(), raceResult.constructor.name);

    // Complex concurrency patterns
    async function processInParallel<T>(
      items: T[],
      processor: (item: T) => Promise<string>
    ): Promise<string[]> {
      return Promise.all(items.map(processor));
    }

    async function processSequentially<T>(
      items: T[],
      processor: (item: T) => Promise<string>
    ): Promise<string[]> {
      const results: string[] = [];
      for (const item of items) {
        const result = await processor(item);
        results.push(result);
      }
      return results;
    }

    // Mock processor function
    const mockProcessor = async (item: number): Promise<string> => {
      return `Processed ${item}`;
    };

    const parallelResult = processInParallel([1, 2, 3], mockProcessor);
    const sequentialResult = processSequentially([1, 2, 3], mockProcessor);

    this.assertEqual("Promise", parallelResult.constructor.name);
    this.assertEqual(this.___(), sequentialResult.constructor.name);

    // Batch processing pattern
    async function processBatches<T, R>(
      items: T[],
      batchSize: number,
      processor: (batch: T[]) => Promise<R[]>
    ): Promise<R[]> {
      const results: R[] = [];

      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await processor(batch);
        results.push(...batchResults);
      }

      return results;
    }

    const batchProcessor = async (batch: number[]): Promise<string[]> => {
      return batch.map((n) => `Batch item ${n}`);
    };

    const batchResult = processBatches([1, 2, 3, 4, 5], 2, batchProcessor);
    this.assertEqual(this.___(), batchResult.constructor.name);

    // Promise with timeout pattern
    function withTimeout<T>(
      promise: Promise<T>,
      timeoutMs: number
    ): Promise<T> {
      const timeoutPromise = new Promise<never>((_, reject) => {
        // In real code: setTimeout(() => reject(new Error('Timeout')), timeoutMs);
        // For testing, we'll just create the promise structure
      });

      return Promise.race([promise, timeoutPromise]);
    }

    const timedPromise = withTimeout(Promise.resolve("data"), 5000);
    this.assertEqual(this.___(), timedPromise.constructor.name);

    // Retry pattern
    async function retryOperation<T>(
      operation: () => Promise<T>,
      maxRetries: number = 3,
      delay: number = 1000
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
          // In real code: await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      throw lastError!;
    }

    let attemptCount = 0;
    const flakyOperation = async (): Promise<string> => {
      attemptCount++;
      if (attemptCount < 2) {
        throw new Error("Temporary failure");
      }
      return "Success!";
    };

    const retryResult = retryOperation(flakyOperation, 3);
    this.assertEqual(this.___(), retryResult.constructor.name);

    // Promise memoization pattern
    class PromiseMemoizer<K, V> {
      private cache = new Map<K, Promise<V>>();

      async get(key: K, factory: (key: K) => Promise<V>): Promise<V> {
        if (this.cache.has(key)) {
          return this.cache.get(key)!;
        }

        const promise = factory(key);
        this.cache.set(key, promise);

        try {
          const result = await promise;
          return result;
        } catch (error) {
          this.cache.delete(key); // Remove failed promises from cache
          throw error;
        }
      }

      clear(): void {
        this.cache.clear();
      }
    }

    const memoizer = new PromiseMemoizer<string, string>();
    const factory = async (key: string): Promise<string> => `Value for ${key}`;

    const memoizedResult1 = memoizer.get("test", factory);
    const memoizedResult2 = memoizer.get("test", factory); // Should reuse cached promise

    this.assertEqual("Promise", memoizedResult1.constructor.name);
    this.assertEqual(this.___(), memoizedResult2.constructor.name);
    this.assertEqual(true, memoizedResult1 === memoizedResult2); // Same promise instance

    // Circuit breaker pattern
    class CircuitBreaker {
      private failureCount = 0;
      private state: "CLOSED" | "OPEN" | "HALF_OPEN" = "CLOSED";
      private nextAttempt = Date.now();

      constructor(
        private threshold: number = 5,
        private timeout: number = 60000
      ) {}

      async execute<T>(operation: () => Promise<T>): Promise<T> {
        if (this.state === "OPEN") {
          if (Date.now() < this.nextAttempt) {
            throw new Error("Circuit breaker is OPEN");
          }
          this.state = "HALF_OPEN";
        }

        try {
          const result = await operation();
          this.onSuccess();
          return result;
        } catch (error) {
          this.onFailure();
          throw error;
        }
      }

      private onSuccess(): void {
        this.failureCount = 0;
        this.state = "CLOSED";
      }

      private onFailure(): void {
        this.failureCount++;
        if (this.failureCount >= this.threshold) {
          this.state = "OPEN";
          this.nextAttempt = Date.now() + this.timeout;
        }
      }
    }

    const circuitBreaker = new CircuitBreaker(3, 30000);
    const protectedOperation = () => Promise.resolve("Protected result");

    const circuitResult = circuitBreaker.execute(protectedOperation);
    this.assertEqual(this.___(), circuitResult.constructor.name);
  }

  /**
   * Real-World Async Patterns and Error Handling
   *
   * Real applications require robust error handling, resource management,
   * and sophisticated async patterns. This section covers practical patterns
   * used in production systems for API calls, data processing, and user interactions.
   *
   * Key Concepts:
   * - Comprehensive error handling strategies
   * - Resource cleanup with async operations
   * - API client patterns and response handling
   * - Data transformation pipelines
   * - User interface async patterns
   *
   * Advanced patterns:
   * - Async middleware and interceptors
   * - Event-driven async architectures
   * - Stream processing with async iterators
   * - Performance monitoring and metrics
   * - Testing strategies for async code
   */
  test_real_world_async_patterns_and_error_handling(): void {
    // Comprehensive API client pattern
    class ApiClient {
      private baseUrl: string;
      private defaultHeaders: Record<string, string>;

      constructor(
        baseUrl: string,
        defaultHeaders: Record<string, string> = {}
      ) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
          "Content-Type": "application/json",
          ...defaultHeaders,
        };
      }

      async get<T>(
        endpoint: string,
        headers?: Record<string, string>
      ): Promise<ApiResponse<T>> {
        return this.request<T>("GET", endpoint, undefined, headers);
      }

      async post<T, D = any>(
        endpoint: string,
        data?: D,
        headers?: Record<string, string>
      ): Promise<ApiResponse<T>> {
        return this.request<T>("POST", endpoint, data, headers);
      }

      async put<T, D = any>(
        endpoint: string,
        data?: D,
        headers?: Record<string, string>
      ): Promise<ApiResponse<T>> {
        return this.request<T>("PUT", endpoint, data, headers);
      }

      async delete<T>(
        endpoint: string,
        headers?: Record<string, string>
      ): Promise<ApiResponse<T>> {
        return this.request<T>("DELETE", endpoint, undefined, headers);
      }

      private async request<T>(
        method: string,
        endpoint: string,
        data?: any,
        headers?: Record<string, string>
      ): Promise<ApiResponse<T>> {
        try {
          // Simulated HTTP request
          const response: ApiResponse<T> = {
            data: `${method} ${endpoint}` as unknown as T,
            status: 200,
            headers: { ...this.defaultHeaders, ...headers },
            success: true,
          };

          return response;
        } catch (error) {
          throw new ApiError(
            `Request failed: ${method} ${endpoint}`,
            500,
            error as Error
          );
        }
      }
    }

    interface ApiResponse<T> {
      data: T;
      status: number;
      headers: Record<string, string>;
      success: boolean;
    }

    class ApiError extends Error {
      constructor(
        message: string,
        public status: number,
        public originalError?: Error
      ) {
        super(message);
        this.name = "ApiError";
      }
    }

    const apiClient = new ApiClient("https://api.example.com");
    const getResult = apiClient.get<{ id: number; name: string }>("/users/1");
    const postResult = apiClient.post("/users", {
      name: "Alice",
      email: "alice@example.com",
    });

    this.assertEqual(this.___(), getResult.constructor.name);
    this.assertEqual("Promise", postResult.constructor.name);

    // Data transformation pipeline
    async function createDataPipeline<T, U, R>(
      data: T[],
      transformers: Array<(item: T) => Promise<U>>,
      finalTransform: (items: U[]) => Promise<R>
    ): Promise<R> {
      let currentData: any[] = [...data];

      // Apply each transformer sequentially to all items
      for (const transformer of transformers) {
        currentData = await Promise.all(currentData.map(transformer));
      }

      return finalTransform(currentData);
    }

    // Example transformers
    const validateUser = async (user: {
      name: string;
      email: string;
    }): Promise<{ name: string; email: string }> => {
      if (!user.name || !user.email) {
        throw new Error("Invalid user data");
      }
      return user;
    };

    const enrichUser = async (user: {
      name: string;
      email: string;
    }): Promise<{ name: string; email: string; id: number }> => {
      return { ...user, id: Math.random() };
    };

    const aggregateUsers = async (
      users: Array<{ name: string; email: string; id: number }>
    ): Promise<{ total: number; names: string[] }> => {
      return {
        total: users.length,
        names: users.map((u) => u.name),
      };
    };

    const userData = [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
    ];

    // Create a pipeline that handles type transformations properly
    const validatedData = userData.map(validateUser);
    const enrichedData = Promise.all(validatedData)
      .then((users) => Promise.all(users.map(enrichUser)))
      .then(aggregateUsers);

    this.assertEqual(this.___(), enrichedData.constructor.name);

    // Resource management with async operations
    class ResourceManager {
      private resources = new Map<string, any>();

      async acquireResource<T>(
        key: string,
        factory: () => Promise<T>
      ): Promise<T> {
        if (this.resources.has(key)) {
          return this.resources.get(key);
        }

        try {
          const resource = await factory();
          this.resources.set(key, resource);
          return resource;
        } catch (error) {
          throw new Error(`Failed to acquire resource '${key}': ${error}`);
        }
      }

      async releaseResource(key: string): Promise<void> {
        const resource = this.resources.get(key);
        if (resource && typeof resource.cleanup === "function") {
          await resource.cleanup();
        }
        this.resources.delete(key);
      }

      async releaseAll(): Promise<void> {
        const cleanupPromises = Array.from(this.resources.entries())
          .filter(([_, resource]) => typeof resource.cleanup === "function")
          .map(([_, resource]) => resource.cleanup());

        await Promise.allSettled(cleanupPromises);
        this.resources.clear();
      }
    }

    const resourceManager = new ResourceManager();
    const dbConnectionFactory = async () => ({
      query: async (sql: string) => `Result for: ${sql}`,
      cleanup: async () => console.log("Connection closed"),
    });

    const resourcePromise = resourceManager.acquireResource(
      "db",
      dbConnectionFactory
    );
    this.assertEqual(this.___(), resourcePromise.constructor.name);

    // Event-driven async pattern
    class AsyncEventEmitter {
      private listeners = new Map<
        string,
        Array<(...args: any[]) => Promise<any>>
      >();

      on(event: string, listener: (...args: any[]) => Promise<any>): void {
        if (!this.listeners.has(event)) {
          this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(listener);
      }

      async emit(event: string, ...args: any[]): Promise<any[]> {
        const eventListeners = this.listeners.get(event) || [];
        return Promise.all(eventListeners.map((listener) => listener(...args)));
      }

      async emitSequential(event: string, ...args: any[]): Promise<any[]> {
        const eventListeners = this.listeners.get(event) || [];
        const results: any[] = [];

        for (const listener of eventListeners) {
          const result = await listener(...args);
          results.push(result);
        }

        return results;
      }
    }

    const eventEmitter = new AsyncEventEmitter();

    eventEmitter.on("user:created", async (user: any) => {
      return `Email sent to ${user.email}`;
    });

    eventEmitter.on("user:created", async (user: any) => {
      return `Analytics tracked for ${user.name}`;
    });

    const emitResult = eventEmitter.emit("user:created", {
      name: "Alice",
      email: "alice@example.com",
    });
    const sequentialResult = eventEmitter.emitSequential("user:created", {
      name: "Bob",
      email: "bob@example.com",
    });

    this.assertEqual("Promise", emitResult.constructor.name);
    this.assertEqual(this.___(), sequentialResult.constructor.name);

    // Async state machine pattern
    class AsyncStateMachine<T extends string> {
      private currentState: T;
      private transitions = new Map<
        T,
        Map<string, { target: T; action?: () => Promise<void> }>
      >();

      constructor(initialState: T) {
        this.currentState = initialState;
      }

      addTransition(
        from: T,
        event: string,
        to: T,
        action?: () => Promise<void>
      ): void {
        if (!this.transitions.has(from)) {
          this.transitions.set(from, new Map());
        }
        this.transitions.get(from)!.set(event, { target: to, action });
      }

      async trigger(event: string): Promise<boolean> {
        const stateTransitions = this.transitions.get(this.currentState);
        if (!stateTransitions?.has(event)) {
          return false;
        }

        const transition = stateTransitions.get(event)!;

        if (transition.action) {
          await transition.action();
        }

        this.currentState = transition.target;
        return true;
      }

      getState(): T {
        return this.currentState;
      }
    }

    type OrderState =
      | "pending"
      | "processing"
      | "shipped"
      | "delivered"
      | "cancelled";

    const orderStateMachine = new AsyncStateMachine<OrderState>("pending");

    orderStateMachine.addTransition(
      "pending",
      "process",
      "processing",
      async () => {
        console.log("Processing order...");
      }
    );

    orderStateMachine.addTransition(
      "processing",
      "ship",
      "shipped",
      async () => {
        console.log("Shipping order...");
      }
    );

    const transitionResult = orderStateMachine.trigger("process");
    this.assertEqual(this.___(), transitionResult.constructor.name);
    this.assertEqual("pending", orderStateMachine.getState()); // Still pending until promise resolves

    // Performance monitoring for async operations
    class AsyncPerformanceMonitor {
      private metrics = new Map<
        string,
        { count: number; totalTime: number; errors: number }
      >();

      async monitor<T>(
        operationName: string,
        operation: () => Promise<T>
      ): Promise<T> {
        const startTime = Date.now();
        let error: Error | null = null;

        try {
          const result = await operation();
          this.recordMetric(operationName, Date.now() - startTime, false);
          return result;
        } catch (err) {
          error = err as Error;
          this.recordMetric(operationName, Date.now() - startTime, true);
          throw error;
        }
      }

      private recordMetric(
        operationName: string,
        duration: number,
        isError: boolean
      ): void {
        if (!this.metrics.has(operationName)) {
          this.metrics.set(operationName, {
            count: 0,
            totalTime: 0,
            errors: 0,
          });
        }

        const metric = this.metrics.get(operationName)!;
        metric.count++;
        metric.totalTime += duration;
        if (isError) metric.errors++;
      }

      getMetrics(operationName: string): {
        avgTime: number;
        errorRate: number;
        totalCalls: number;
      } {
        const metric = this.metrics.get(operationName);
        if (!metric) return { avgTime: 0, errorRate: 0, totalCalls: 0 };

        return {
          avgTime: metric.totalTime / metric.count,
          errorRate: metric.errors / metric.count,
          totalCalls: metric.count,
        };
      }
    }

    const monitor = new AsyncPerformanceMonitor();
    const monitoredOperation = async () => "Operation completed";

    const monitorResult = monitor.monitor("test-operation", monitoredOperation);
    this.assertEqual(this.___(), monitorResult.constructor.name);

    // Final comprehensive example: Async job processor
    class AsyncJobProcessor<T, R> {
      private queue: Array<{
        id: string;
        data: T;
        resolve: (result: R) => void;
        reject: (error: Error) => void;
      }> = [];
      private processing = false;
      private concurrency = 3;

      constructor(
        private processor: (data: T) => Promise<R>,
        concurrency: number = 3
      ) {
        this.concurrency = concurrency;
      }

      async process(data: T): Promise<R> {
        return new Promise<R>((resolve, reject) => {
          const jobId = Math.random().toString(36).substring(7);
          this.queue.push({ id: jobId, data, resolve, reject });
          this.startProcessing();
        });
      }

      private async startProcessing(): Promise<void> {
        if (this.processing) return;
        this.processing = true;

        const activeJobs: Promise<void>[] = [];

        while (this.queue.length > 0 || activeJobs.length > 0) {
          // Start new jobs up to concurrency limit
          while (
            activeJobs.length < this.concurrency &&
            this.queue.length > 0
          ) {
            const job = this.queue.shift()!;
            const jobPromise = this.processJob(job);
            activeJobs.push(jobPromise);
          }

          // Wait for at least one job to complete
          if (activeJobs.length > 0) {
            await Promise.race(activeJobs);
            // Remove completed jobs
            const completedJobs = await Promise.allSettled(activeJobs);
            activeJobs.length = 0; // Clear array
          }
        }

        this.processing = false;
      }

      private async processJob(job: {
        id: string;
        data: T;
        resolve: (result: R) => void;
        reject: (error: Error) => void;
      }): Promise<void> {
        try {
          const result = await this.processor(job.data);
          job.resolve(result);
        } catch (error) {
          job.reject(error as Error);
        }
      }
    }

    const jobProcessor = new AsyncJobProcessor<number, string>(
      async (num: number) => `Processed: ${num}`,
      2
    );

    const job1 = jobProcessor.process(1);
    const job2 = jobProcessor.process(2);
    const job3 = jobProcessor.process(3);

    this.assertEqual("Promise", job1.constructor.name);
    this.assertEqual(this.___(), job2.constructor.name);
    this.assertEqual("Promise", job3.constructor.name);
  }
}
