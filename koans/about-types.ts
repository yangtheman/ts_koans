import { Koan } from "./koan";

export class AboutTypes extends Koan {
  constructor() {
    super("AboutTypes", "about-types.ts");
  }

  // Learn: TypeScript's number type represents both integers and floating-point numbers
  // Unlike some languages, TypeScript doesn't distinguish between int, float, double, etc.
  // All numbers are IEEE 754 double-precision floating-point values
  // Example: Both 42 and 3.14 are of type 'number'
  test_number_types(): void {
    const integer: number = 42;
    const float: number = 3.14;

    this.assertEqual("number", typeof integer);
    this.assertEqual(this.___(), typeof float); // What type is float?
  }

  // Learn: TypeScript's string type represents textual data
  // Strings can be created with single quotes (''), double quotes (""), or backticks (``)
  // The typeof operator always returns 'string' for string values
  // Example: 'Hello TypeScript' has type 'string' and length 15
  test_string_types(): void {
    const message: string = "Hello TypeScript";

    this.assertEqual(this.___(), typeof message); // What type is message?
    this.assertEqual(15, message.length);
  }

  // Learn: TypeScript's boolean type has only two values: true and false
  // The typeof operator returns 'boolean' for both true and false values
  // Booleans are commonly used in conditional statements and logical operations
  // Example: Both true and false have the same type: 'boolean'
  test_boolean_types(): void {
    const isTrue: boolean = true;
    const isFalse: boolean = false;

    this.assertEqual("boolean", typeof isTrue);
    this.assertEqual(this.___(), typeof isFalse); // What type is isFalse?
  }

  // Learn: undefined represents a variable that has been declared but not assigned a value
  // The typeof operator returns 'undefined' for undefined values
  // This is different from null - undefined means "no value assigned yet"
  // Example: let x; (without assignment) makes x have value and type undefined
  test_undefined_type(): void {
    let uninitialized: undefined;

    this.assertEqual(this.___(), typeof uninitialized); // What type is uninitialized?
    this.assertEqual(undefined, uninitialized);
  }

  // Learn: null represents an intentional absence of any value
  // JavaScript quirk: typeof null returns 'object' (this is a known bug in JavaScript)
  // This behavior is inherited by TypeScript for compatibility
  // Example: const x = null; typeof x === 'object' (not 'null'!)
  test_null_type(): void {
    const nothing: null = null;

    // null has a quirky typeof behavior in JavaScript
    this.assertEqual(this.___(), typeof nothing); // Fill in the blank
    this.assertEqual(null, nothing);
  }

  // Learn: Arrays in TypeScript can be typed with element type followed by []
  // The typeof operator returns 'object' for arrays (arrays are objects in JavaScript)
  // Use Array.isArray() to check if something is specifically an array
  // Example: number[] means "array of numbers", string[] means "array of strings"
  test_array_types(): void {
    const numbers: number[] = [1, 2, 3];
    const fruits: string[] = ["apple", "banana", "orange"];

    this.assertEqual(this.___(), typeof numbers); // What type is an array?
    this.assertEqual(true, Array.isArray(numbers));
    this.assertEqual(this.__(), fruits.length); // Fill in the blank
  }

  // Learn: Objects in TypeScript can have their structure defined with type annotations
  // The typeof operator returns 'object' for object literals
  // Object properties are accessed with dot notation: object.property
  // Example: { name: string; age: number } defines an object with name and age properties
  test_object_types(): void {
    const person: { name: string; age: number } = {
      name: "Alice",
      age: 30,
    };

    this.assertEqual(this.___(), typeof person); // What type is an object?
    this.assertEqual("Alice", person.name);
    this.assertEqual(this.__(), person.age); // Fill in the blank
  }
}
