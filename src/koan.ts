export interface KoanProgress {
  total: number;
  current: number;
  percentage: number;
}

export class KoanError extends Error {
  constructor(message: string, public line?: number, public file?: string) {
    super(message);
    this.name = "KoanError";
  }
}

export class AssertionError extends KoanError {
  constructor(message: string, expected?: any, actual?: any) {
    super(message);
    this.name = "AssertionError";
  }
}

export abstract class Koan {
  protected failures: KoanError[] = [];
  public readonly name: string;
  public readonly file: string;

  constructor(name: string, file: string) {
    this.name = name;
    this.file = file;
  }

  // Test assertion methods
  protected assert(
    condition: boolean,
    message: string = "Assertion failed"
  ): void {
    if (!condition) {
      throw new AssertionError(message);
    }
  }

  protected assertEqual<T>(expected: T, actual: T, message?: string): void {
    if (!this.deepEqual(expected, actual)) {
      const msg =
        message ||
        `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(
          actual
        )}`;
      throw new AssertionError(msg, expected, actual);
    }
  }

  // Deep equality comparison for arrays and objects
  private deepEqual(a: any, b: any): boolean {
    if (a === b) return true;

    if (a == null || b == null) return a === b;

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!this.deepEqual(a[i], b[i])) return false;
      }
      return true;
    }

    if (typeof a === "object" && typeof b === "object") {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;

      for (const key of keysA) {
        if (!keysB.includes(key)) return false;
        if (!this.deepEqual(a[key], b[key])) return false;
      }
      return true;
    }

    return false;
  }

  protected assertNotEqual<T>(expected: T, actual: T, message?: string): void {
    if (expected === actual) {
      const msg =
        message ||
        `Expected values to be different, but both were ${JSON.stringify(
          expected
        )}`;
      throw new AssertionError(msg);
    }
  }

  protected assertThrows(fn: () => any, message?: string): void {
    let threw = false;
    try {
      fn();
    } catch (error) {
      threw = true;
    }
    if (!threw) {
      throw new AssertionError(
        message || "Expected function to throw an error"
      );
    }
  }

  // Placeholder methods for students to fill in
  protected __(): any {
    throw new KoanError(
      "__ placeholder needs to be replaced with the correct answer"
    );
  }

  protected ___(value?: any): any {
    throw new KoanError(
      "___ placeholder needs to be replaced with the correct answer"
    );
  }

  // Run all test methods in this koan
  public meditate(): KoanError | null {
    const methods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this)
    ).filter(
      (name) =>
        name.startsWith("test_") && typeof (this as any)[name] === "function"
    );

    for (const methodName of methods) {
      try {
        (this as any)[methodName]();
      } catch (error) {
        if (error instanceof KoanError) {
          return error;
        } else {
          const message =
            error instanceof Error ? error.message : String(error);
          return new KoanError(`Unexpected error: ${message}`);
        }
      }
    }
    return null;
  }

  // Run a single test method in this koan
  public meditateOnSingle(methodName: string): KoanError | null {
    try {
      (this as any)[methodName]();
      return null;
    } catch (error) {
      if (error instanceof KoanError) {
        return error;
      } else {
        const message = error instanceof Error ? error.message : String(error);
        return new KoanError(`Unexpected error: ${message}`);
      }
    }
  }

  // Get all test method names
  public getTestMethods(): string[] {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(
      (name) =>
        name.startsWith("test_") && typeof (this as any)[name] === "function"
    );
  }
}

export class Sensei {
  private totalTests: number = 0;
  private currentTest: number = 0;
  private passedTests: number = 0;
  private failure: KoanError | null = null;

  observe(error: KoanError | null, testName: string, koanName: string): void {
    this.currentTest++;
    if (error) {
      if (!this.failure) {
        this.failure = error;
        this.failure.file = koanName;
      }
    } else {
      this.passedTests++;
    }
  }

  setTotalTests(total: number): void {
    this.totalTests = total;
  }

  instruct(): void {
    if (this.failure) {
      console.log("\n" + "=".repeat(50));
      console.log(`❌ ${this.failure.file} has damaged your karma.`);
      console.log("\nThe TypeScript Master says:");
      console.log("You have not yet reached enlightenment.\n");
      console.log("The answers you seek...");
      console.log(`${this.failure.message}\n`);
      console.log("Please meditate on the following code:");
      console.log(`${this.failure.file}\n`);

      this.showProgress();
    } else {
      console.log("\n" + "🎉".repeat(20));
      console.log("🏆 CONGRATULATIONS! 🏆");
      console.log("\nYou have achieved TypeScript enlightenment!");
      console.log("You have completed all the koans and learned:");
      console.log("• TypeScript type system fundamentals");
      console.log("• Functions, classes, and interfaces");
      console.log("• Advanced types and generics");
      console.log("• Error handling and async programming");
      console.log(
        "\nNow you are ready to build amazing TypeScript applications!"
      );
      console.log("🎉".repeat(20));
    }
  }

  private showProgress(): void {
    const progress = this.passedTests;
    const percentage = Math.floor((progress / this.totalTests) * 100);
    const filled = Math.floor((progress / this.totalTests) * 50);
    const empty = 50 - filled;

    const bar = "█".repeat(filled) + "░".repeat(empty);
    console.log(
      `Your path thus far [${bar}] ${progress}/${this.totalTests} (${percentage}%)`
    );

    if (percentage < 25) {
      console.log('\n"Mountains are merely mountains" 🏔️');
    } else if (percentage < 50) {
      console.log('\n"The path becomes clearer" 🌄');
    } else if (percentage < 75) {
      console.log('\n"Understanding dawns" 🌅');
    } else {
      console.log('\n"Enlightenment approaches" ✨');
    }
  }

  hasFailure(): boolean {
    return this.failure !== null;
  }
}
