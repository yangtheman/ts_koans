import { Koan } from "./koan";

export class AboutGenerics extends Koan {
  constructor() {
    super("AboutGenerics", "about-generics.ts");
  }

  // Learn: Generic functions allow you to write reusable code that works with multiple types
  // <T> is a type parameter that represents any type
  // The function preserves the type relationship between input and output
  // TypeScript can infer the type parameter from usage (type inference)
  // Example: identity<number>(42) returns number, identity<string>('hi') returns string
  test_generic_functions(): void {
    function identity<T>(arg: T): T {
      return arg;
    }

    const numberResult = identity<number>(42);
    const stringResult = identity<string>("Hello");
    const booleanResult = identity(true); // Type inference

    this.assertEqual(this.__(), numberResult); // Fill in the blank
    this.assertEqual(this.___(), stringResult); // Fill in the blank
    this.assertEqual(true, booleanResult);
  }

  // Learn: Generic interfaces and classes can work with different types
  // Type parameters make interfaces and classes flexible and reusable
  // You specify the concrete type when creating instances
  // The same interface/class can store different types safely
  // Example: Container<number> stores numbers, Container<string> stores strings
  test_generic_interfaces(): void {
    interface Container<T> {
      value: T;
      getValue(): T;
    }

    class Box<T> implements Container<T> {
      constructor(public value: T) {}

      getValue(): T {
        return this.value;
      }
    }

    const numberBox = new Box<number>(123);
    const stringBox = new Box<string>("TypeScript");

    this.assertEqual(this.__(), numberBox.getValue()); // Fill in the blank
    this.assertEqual(this.___(), stringBox.getValue()); // Fill in the blank
  }

  // Learn: Generic constraints limit what types can be used with generics
  // 'T extends SomeType' means T must have all properties of SomeType
  // Constraints ensure generic functions can safely use specific properties or methods
  // This provides type safety while maintaining flexibility
  // Example: T extends HasLength means T must have a length property
  test_generic_constraints(): void {
    interface HasLength {
      length: number;
    }

    function logLength<T extends HasLength>(arg: T): T {
      console.log(`Length: ${arg.length}`);
      return arg;
    }

    const stringResult = logLength("Hello World");
    const arrayResult = logLength([1, 2, 3, 4, 5]);

    this.assertEqual(this.___(), stringResult); // What string is returned?
    this.assertEqual(this.__(), arrayResult.length); // Fill in the blank

    // This would cause a compilation error:
    // logLength(123); // Number doesn't have length property
  }

  // Learn: Generic classes can have multiple type parameters
  // Each type parameter can represent a different aspect of the data
  // Methods within generic classes can use all the type parameters
  // This enables creation of flexible data structures like maps, dictionaries, etc.
  // Example: KeyValuePair<K, V> can store any key type with any value type
  test_generic_classes(): void {
    class KeyValuePair<K, V> {
      private items: Array<{ key: K; value: V }> = [];

      add(key: K, value: V): void {
        this.items.push({ key, value });
      }

      get(key: K): V | undefined {
        const item = this.items.find((item) => item.key === key);
        return item ? item.value : undefined;
      }

      size(): number {
        return this.items.length;
      }
    }

    const stringToNumber = new KeyValuePair<string, number>();
    stringToNumber.add("age", 30);
    stringToNumber.add("score", 95);

    this.assertEqual(this.__(), stringToNumber.get("age")); // Fill in the blank
    this.assertEqual(95, stringToNumber.get("score"));
    this.assertEqual(this.___(), stringToNumber.get("name")); // What if key doesn't exist?
    this.assertEqual(this.__(), stringToNumber.size()); // Fill in the blank
  }

  // Learn: Utility types are built-in generic types that transform existing types
  // Partial<T> makes all properties optional, Pick<T, K> selects specific properties
  // Omit<T, K> excludes specific properties, Required<T> makes all properties required
  // These help create variations of existing types without redefining them
  // Example: Partial<User> allows creating a user object with only some properties filled
  test_utility_types(): void {
    interface User {
      id: number;
      name: string;
      email: string;
      age: number;
    }

    // Partial - makes all properties optional
    const partialUser: Partial<User> = {
      name: "Alice",
    };

    // Pick - select only specific properties
    const userSummary: Pick<User, "id" | "name"> = {
      id: 1,
      name: "Bob",
    };

    // Omit - exclude specific properties
    const userWithoutId: Omit<User, "id"> = {
      name: "Charlie",
      email: "charlie@example.com",
      age: 25,
    };

    this.assertEqual(this.___(), partialUser.name); // Fill in the blank
    this.assertEqual(this.___(), partialUser.email); // What about email?

    this.assertEqual(1, userSummary.id);
    this.assertEqual(this.___(), userSummary.name); // Fill in the blank

    this.assertEqual("Charlie", userWithoutId.name);
    this.assertEqual(this.__(), userWithoutId.age); // Fill in the blank
  }

  // Learn: Conditional types choose between types based on a condition
  // T extends U ? X : Y means: if T extends U, then X, otherwise Y
  // These create type-level logic for advanced type transformations
  // Useful for creating types that behave differently based on input types
  // Example: IsArray<T> returns true for array types, false for others
  test_conditional_types(): void {
    type IsArray<T> = T extends any[] ? true : false;

    type StringIsArray = IsArray<string>; // false
    type NumberArrayIsArray = IsArray<number[]>; // true
    type ObjectIsArray = IsArray<{}>; // false

    // We can't directly test types at runtime, but we can use them in functions
    function checkIfArray<T>(value: T): IsArray<T> {
      return Array.isArray(value) as IsArray<T>;
    }

    this.assertEqual(this.___(), checkIfArray("hello")); // Fill in the blank
    this.assertEqual(true, checkIfArray([1, 2, 3]));
    this.assertEqual(this.___(), checkIfArray({ key: "value" })); // Fill in the blank
  }

  // Learn: Mapped types transform each property in a type
  // [P in keyof T] iterates over all property names in type T
  // You can add modifiers like readonly, optional (?), or transform the property types
  // This enables creating variations of existing types programmatically
  // Example: ReadonlyVersion<T> makes all properties readonly
  test_mapped_types(): void {
    type ReadonlyVersion<T> = {
      readonly [P in keyof T]: T[P];
    };

    type OptionalVersion<T> = {
      [P in keyof T]?: T[P];
    };

    interface Person {
      name: string;
      age: number;
    }

    const readonlyPerson: ReadonlyVersion<Person> = {
      name: "Alice",
      age: 30,
    };

    const optionalPerson: OptionalVersion<Person> = {
      name: "Bob",
      // age is optional now
    };

    this.assertEqual(this.___(), readonlyPerson.name); // Fill in the blank
    this.assertEqual(30, readonlyPerson.age);

    this.assertEqual("Bob", optionalPerson.name);
    this.assertEqual(this.___(), optionalPerson.age); // Fill in the blank

    // This would cause a compilation error:
    // readonlyPerson.age = 31; // Cannot assign to 'age' because it is a read-only property
  }
}
