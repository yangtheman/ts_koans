import { Koan } from "./koan";

export class AboutTypes extends Koan {
  constructor() {
    super("AboutTypes", "about-types.ts");
  }

  // CONCEPT: Primitive Types and Their Runtime Characteristics
  //
  // TypeScript's type system is built on JavaScript's runtime types, but provides
  // compile-time safety and enhanced tooling. Understanding the relationship between
  // TypeScript's static types and JavaScript's dynamic types is fundamental.
  //
  // TypeScript Type Categories:
  // - Primitive types: number, string, boolean, undefined, null, symbol, bigint
  // - Object types: object literals, arrays, functions, classes
  // - Special types: any, unknown, never, void
  // - Literal types: specific values as types
  // - Union and intersection types
  //
  // Key Insight: TypeScript types are erased at compile-time, so typeof operates
  // on JavaScript's runtime representation, not TypeScript's static types.

  test_number_type_fundamentals(): void {
    // CONCEPT: The Number Type - Unified Numeric Representation
    //
    // Unlike languages like Java or C#, TypeScript/JavaScript has only one numeric type.
    // All numbers are IEEE 754 double-precision floating-point values, which means:
    // - Integers and decimals share the same type
    // - There are precision limitations for very large integers
    // - Special values like Infinity, -Infinity, and NaN are all 'number' type

    const integer: number = 42;
    const float: number = 3.14159;
    const scientific: number = 1.23e-4;
    const hex: number = 0xff;
    const binary: number = 0b1010;
    const octal: number = 0o755;

    this.assertEqual(this.___(), typeof integer);
    this.assertEqual(this.___(), typeof float); // All numbers share the same runtime type
    this.assertEqual(this.___(), typeof scientific);
    this.assertEqual(this.___(), typeof hex); // Hex literals are still numbers

    // Special number values
    const infinity: number = Infinity;
    const notANumber: number = NaN;

    this.assertEqual(this.___(), typeof infinity); // Even infinity is a number
    this.assertEqual(this.___(), typeof notANumber);

    // Number precision and limits
    this.assertEqual(this.___(), Number.MAX_SAFE_INTEGER); // 9007199254740991
    this.assertEqual(this.___(), Number.isInteger(42)); // Check if a number is an integer
    this.assertEqual(false, Number.isInteger(3.14));

    // NaN peculiarity - NaN !== NaN (this is a JavaScript quirk from IEEE 754 standard)
    // We demonstrate this by showing the correct way to check for NaN
    const testValue = NaN;
    const nanComparison = testValue === testValue; // This will be false for NaN only
    this.assertEqual(this.___(), nanComparison); // false! Use Number.isNaN() instead
    this.assertEqual(true, Number.isNaN(testValue));
  }

  test_string_type_and_template_literals(): void {
    // CONCEPT: String Types and Modern JavaScript String Features
    //
    // Strings in TypeScript can be created with three different quote styles,
    // each with different capabilities and use cases:
    // - Single quotes: Basic strings, no interpolation
    // - Double quotes: Basic strings, no interpolation
    // - Template literals (backticks): Interpolation, multiline, tagged templates

    const singleQuote: string = "Hello World";
    const doubleQuote: string = "Hello World";
    const templateLiteral: string = `Hello World`;

    this.assertEqual(this.___(), typeof singleQuote); // All string literals have same type
    this.assertEqual(this.___(), typeof doubleQuote);
    this.assertEqual(this.___(), typeof templateLiteral);

    // Template literal interpolation
    const name: string = "TypeScript";
    const version: number = 5.0;
    const message: string = `Learning ${name} version ${version}!`;

    this.assertEqual(this.___(), message); // Fill in the interpolated result

    // Multiline strings with template literals
    const multiline: string = `
      This is a multiline string
      that preserves whitespace and
      line breaks.
    `;

    this.assertEqual(this.___(), multiline.includes("\n")); // Contains newlines

    // String methods and properties
    this.assertEqual(this.___(), "Hello TypeScript".length);
    this.assertEqual(this.___(), "HELLO".toLowerCase()); // String methods return new strings
    this.assertEqual("HELLO", "hello".toUpperCase());

    // Escape sequences
    const escaped: string = 'Quote: "Hello"\nNew line here\tTab here';
    this.assertEqual(this.___(), escaped.includes("\n")); // Contains actual newline
    this.assertEqual(this.___(), escaped.includes("\t")); // Contains actual tab
  }

  test_boolean_type_and_truthiness(): void {
    // CONCEPT: Boolean Type vs. Truthiness in JavaScript
    //
    // The boolean type has exactly two values: true and false. However,
    // JavaScript's concept of "truthiness" means many values can be coerced
    // to boolean in conditional contexts. Understanding this distinction
    // is crucial for writing reliable TypeScript code.

    const isTrue: boolean = true;
    const isFalse: boolean = false;

    this.assertEqual(this.___(), typeof isTrue);
    this.assertEqual(this.___(), typeof isFalse); // Both true and false are 'boolean'

    // Boolean() constructor for explicit conversion
    this.assertEqual(this.___(), Boolean(1)); // Truthy number becomes true
    this.assertEqual(false, Boolean(0));
    this.assertEqual(this.___(), Boolean("hello")); // Non-empty string is truthy
    this.assertEqual(false, Boolean(""));

    // Falsy values in JavaScript (all become false when coerced):
    // false, 0, -0, 0n, "", null, undefined, NaN
    this.assertEqual(this.___(), Boolean(null)); // false
    this.assertEqual(false, Boolean(undefined));
    this.assertEqual(this.___(), Boolean(NaN)); // false

    // Everything else is truthy
    this.assertEqual(this.___(), Boolean([])); // Empty array is truthy!
    this.assertEqual(true, Boolean({})); // Empty object is truthy!
    this.assertEqual(this.___(), Boolean(-1)); // Negative numbers are truthy

    // Logical operators don't always return booleans - they return values
    const truthyValue = "hello";
    const falsyValue = "";
    const result1 = truthyValue || "world"; // Returns first truthy value
    const result2 = falsyValue || 42; // Returns first truthy value
    const result3 = true && "success"; // Returns last evaluated value

    this.assertEqual(this.___(), result1); // "hello"
    this.assertEqual(this.___(), result2);
    this.assertEqual(this.___(), result3); // "success"
  }

  test_null_and_undefined_distinction(): void {
    // CONCEPT: null vs undefined - Intentional vs Unintentional Absence
    //
    // Both null and undefined represent absence of value, but with different semantics:
    // - undefined: Variable declared but not assigned, missing object properties
    // - null: Intentional absence, explicit "no value"
    //
    // JavaScript Quirk: typeof null returns "object" due to a historical bug
    // that cannot be fixed without breaking backward compatibility.

    let uninitialized: undefined;
    const intentionallyEmpty: null = null;

    this.assertEqual(this.___(), typeof uninitialized); // "undefined"
    this.assertEqual(this.___(), typeof intentionallyEmpty); // "object" - the famous bug!

    // Equality comparisons
    this.assertEqual(this.___(), null == undefined); // true - loose equality
    this.assertEqual(this.___(), null === undefined); // false - strict equality

    // Object property access patterns - using any to demonstrate runtime behavior
    const person: any = {
      name: "Alice",
      age: undefined, // Explicitly set to undefined
      // email property is missing entirely
    };

    this.assertEqual(this.___(), person.age); // undefined (explicitly set)
    this.assertEqual(undefined, person.email); // undefined (missing property)
    this.assertEqual(this.___(), typeof person.email); // "undefined"

    // Checking for null/undefined safely
    this.assertEqual(this.___(), person.email == null); // true (catches both null and undefined)
    this.assertEqual(this.___(), person.email === null); // false (only matches null)
    this.assertEqual(this.___(), person.email === undefined);

    // Optional chaining (TypeScript 3.7+) for safe access
    const user: { profile: { bio?: string } | null } = {
      profile: null,
    };

    // This would throw: user.profile.bio
    // Optional chaining returns undefined if any part is null/undefined
    this.assertEqual(this.___(), user.profile?.bio); // undefined
  }

  test_symbol_type(): void {
    // CONCEPT: Symbols - Unique Identifiers
    //
    // Symbols are a primitive type introduced in ES6 that represent unique identifiers.
    // Every symbol is unique, even with the same description. They're commonly used
    // for object property keys that should be unique and non-enumerable.

    const sym1: symbol = Symbol();
    const sym2: symbol = Symbol("description");
    const sym3: symbol = Symbol("description");

    this.assertEqual(this.___(), typeof sym1); // "symbol"
    this.assertEqual(this.___(), typeof sym2);

    // Each symbol is unique
    this.assertEqual(this.___(), sym2 === sym3); // false - even same description
    this.assertEqual(this.___(), sym1 === sym2); // false

    // Symbol usage in objects
    const uniqueKey = Symbol("unique");
    const obj = {
      [uniqueKey]: "secret value",
      normalProp: "normal value",
    };

    this.assertEqual(this.___(), obj[uniqueKey]); // Access with symbol key
    this.assertEqual(this.___(), obj.normalProp);

    // Symbols don't appear in normal iteration
    const keys = Object.keys(obj);
    this.assertEqual(this.___(), keys.length); // 1 (only normalProp)
    this.assertEqual(this.___(), keys.includes("normalProp")); // true
  }

  test_bigint_type(): void {
    // CONCEPT: BigInt - Arbitrary Precision Integers
    //
    // BigInt allows representation of integers larger than Number.MAX_SAFE_INTEGER.
    // BigInts and regular numbers are distinct types and cannot be mixed in operations
    // without explicit conversion.

    const bigIntLiteral: bigint = 123456789012345678901234567890n; // 'n' suffix
    const bigIntConstructor: bigint = BigInt("123456789012345678901234567890");

    this.assertEqual(this.___(), typeof bigIntLiteral); // "bigint"
    this.assertEqual(this.___(), typeof bigIntConstructor);

    this.assertEqual(this.___(), bigIntLiteral === bigIntConstructor); // true

    // BigInt vs Number comparison - using loose equality which allows coercion
    const regularNumber: number = 123;
    const bigintNumber: bigint = 123n;

    this.assertEqual(this.___(), typeof regularNumber); // "number"
    this.assertEqual(this.___(), typeof bigintNumber);

    // Using explicit conversion to demonstrate the concept
    this.assertEqual(this.___(), Number(bigintNumber) === regularNumber); // true when converted
    this.assertEqual(this.___(), regularNumber === Number(bigintNumber)); // true

    // BigInt operations
    const sum: bigint = 100n + 200n;
    this.assertEqual(this.___(), sum); // 300n

    // Mixed operations require conversion
    // This would error: 100n + 200
    const mixedSum: bigint = 100n + BigInt(200);
    this.assertEqual(this.___(), mixedSum); // 300n
  }

  test_literal_types(): void {
    // CONCEPT: Literal Types - Values as Types
    //
    // TypeScript can use specific literal values as types, not just general types.
    // This enables precise type constraints and better API design by restricting
    // values to specific allowed options.

    // String literal types
    let direction: "north" | "south" | "east" | "west";
    direction = "north";
    this.assertEqual(this.___(), direction); // "north"

    // This would cause a type error:
    // direction = "northeast"; // Error: not assignable

    // Numeric literal types
    let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;
    diceRoll = 4;
    this.assertEqual(this.___(), diceRoll); // 4

    // Boolean literal types
    let strictlyTrue: true = true;
    // let alsoTrue: true = false; // Error: false is not assignable to true

    this.assertEqual(this.___(), strictlyTrue); // true

    // Literal types in function parameters
    function setStatus(status: "loading" | "success" | "error"): string {
      return `Status is ${status}`;
    }

    this.assertEqual(this.___(), setStatus("loading")); // "Status is loading"
    // setStatus("pending"); // Error: not in allowed values

    // Template literal types (TypeScript 4.1+)
    type Greeting = `hello ${string}`;
    const greeting1: Greeting = "hello world";
    const greeting2: Greeting = "hello TypeScript";

    this.assertEqual(this.___(), greeting1); // "hello world"
    this.assertEqual(this.___(), greeting2);
  }

  test_union_types(): void {
    // CONCEPT: Union Types - Multiple Type Possibilities
    //
    // Union types allow a value to be one of several types, expressed with the | operator.
    // This is essential for handling values that legitimately could be different types
    // while maintaining type safety through type narrowing.

    let stringOrNumber: string | number;

    stringOrNumber = "hello";
    this.assertEqual(this.___(), typeof stringOrNumber); // "string"

    stringOrNumber = 42;
    this.assertEqual(this.___(), typeof stringOrNumber); // "number"

    // Type narrowing with typeof
    function processValue(value: string | number): string {
      if (typeof value === "string") {
        // TypeScript knows value is string here
        return value.toUpperCase();
      } else {
        // TypeScript knows value is number here
        return value.toString();
      }
    }

    this.assertEqual(this.___(), processValue("hello")); // "HELLO"
    this.assertEqual("42", processValue(42));

    // Union with literal types
    let status: "idle" | "loading" | "success" | "error" = "idle";
    this.assertEqual(this.___(), status); // "idle"

    // Arrays with union types
    const mixedArray: (string | number)[] = ["hello", 42, "world", 100];
    this.assertEqual(this.___(), mixedArray.length); // 4
    this.assertEqual(this.___(), mixedArray[0]);
    this.assertEqual(this.___(), mixedArray[1]); // 42

    // Discriminated unions (tagged unions)
    type Shape =
      | { kind: "circle"; radius: number }
      | { kind: "rectangle"; width: number; height: number };

    function getArea(shape: Shape): number {
      switch (shape.kind) {
        case "circle":
          return Math.PI * shape.radius * shape.radius;
        case "rectangle":
          return shape.width * shape.height;
      }
    }

    const circle: Shape = { kind: "circle", radius: 5 };
    const rectangle: Shape = { kind: "rectangle", width: 10, height: 20 };

    this.assertEqual(this.___(), getArea(circle) > 78 && getArea(circle) < 79); // ~78.54
    this.assertEqual(200, getArea(rectangle));
  }

  test_type_assertions_and_narrowing(): void {
    // CONCEPT: Type Assertions and Type Narrowing
    //
    // Type assertions tell TypeScript to treat a value as a specific type,
    // while type narrowing uses runtime checks to refine types automatically.
    // Understanding when to use each is crucial for type-safe code.

    // Type assertions (angle bracket syntax and 'as' syntax)
    const someValue: unknown = "hello world";

    const strLength1: number = (<string>someValue).length; // Angle bracket syntax
    const strLength2: number = (someValue as string).length; // 'as' syntax (preferred)

    this.assertEqual(this.___(), strLength1); // 11
    this.assertEqual(this.___(), strLength2);

    // Type narrowing with instanceof
    class Dog {
      bark(): string {
        return "woof";
      }
    }

    class Cat {
      meow(): string {
        return "meow";
      }
    }

    function makeNoise(animal: Dog | Cat): string {
      if (animal instanceof Dog) {
        // TypeScript knows animal is Dog here
        return animal.bark();
      } else {
        // TypeScript knows animal is Cat here
        return animal.meow();
      }
    }

    this.assertEqual(this.___(), makeNoise(new Dog())); // "woof"
    this.assertEqual("meow", makeNoise(new Cat()));

    // Type narrowing with 'in' operator
    type Fish = { swim: () => void };
    type Bird = { fly: () => void };

    function move(animal: Fish | Bird): string {
      if ("swim" in animal) {
        // TypeScript knows animal is Fish here
        return "swimming";
      } else {
        // TypeScript knows animal is Bird here
        return "flying";
      }
    }

    const fish: Fish = { swim: () => {} };
    const bird: Bird = { fly: () => {} };

    this.assertEqual(this.___(), move(fish)); // "swimming"
    this.assertEqual("flying", move(bird));

    // Custom type guards
    function isString(value: unknown): value is string {
      return typeof value === "string";
    }

    function processUnknownValue(value: unknown): string {
      if (isString(value)) {
        // TypeScript knows value is string here
        return value.toUpperCase();
      }
      return "not a string";
    }

    this.assertEqual(this.___(), processUnknownValue("hello")); // "HELLO"
    this.assertEqual("not a string", processUnknownValue(42));
  }
}
