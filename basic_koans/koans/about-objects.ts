import { Koan } from "./koan";

export class AboutObjects extends Koan {
  constructor() {
    super("AboutObjects", "about-objects.ts");
  }

  // Learn: Object literals are created using curly braces {} with key-value pairs
  // Keys can be strings or identifiers, values can be any type
  // Properties are separated by commas
  // Example: { name: 'Alice', age: 30 } creates an object with two properties
  test_object_literals(): void {
    const person = {
      name: "Alice",
      age: 30,
      city: "New York",
    };

    this.assertEqual(this.___(), person.name); // Fill in the blank
    this.assertEqual(30, person.age);
    this.assertEqual("New York", person.city);
  }

  // Learn: Object properties can be accessed in two ways
  // Dot notation: object.property (property name must be a valid identifier)
  // Bracket notation: object['property'] (property name can be any string)
  // Bracket notation allows dynamic property access and properties with special characters
  // Example: car.make and car['make'] are equivalent
  test_object_property_access(): void {
    const car = {
      make: "Toyota",
      model: "Camry",
      year: 2020,
    };

    // Dot notation
    this.assertEqual("Toyota", car.make);
    this.assertEqual(this.___(), car.model); // Fill in the blank

    // Bracket notation
    this.assertEqual(2020, car["year"]);
    this.assertEqual(this.___(), car["make"]); // Fill in the blank
  }

  // Learn: Objects can contain methods (functions as properties)
  // The 'this' keyword refers to the object that the method belongs to
  // Methods can access and modify other properties of the same object
  // Example: An object with a counter that can increment itself
  test_object_methods(): void {
    const calculator = {
      result: 0,
      add(value: number): number {
        this.result += value;
        return this.result;
      },
      reset(): void {
        this.result = 0;
      },
    };

    this.assertEqual(this.__(), calculator.add(5)); // Fill in the blank
    this.assertEqual(15, calculator.add(10));
    calculator.reset();
    this.assertEqual(this.__(), calculator.result); // After reset?
  }

  // Learn: Object destructuring extracts properties into individual variables
  // const { prop1, prop2 } = object creates variables prop1 and prop2
  // You can rename extracted properties: { prop: newName }
  // This is a concise way to access multiple object properties
  // Example: const { name, age } = person extracts name and age into variables
  test_object_destructuring(): void {
    const book = {
      title: "TypeScript Handbook",
      author: "Microsoft",
      pages: 200,
      year: 2023,
    };

    const { title, author } = book;
    const { pages: pageCount } = book;

    this.assertEqual(this.___(), title); // Fill in the blank
    this.assertEqual("Microsoft", author);
    this.assertEqual(this.__(), pageCount); // Fill in the blank
  }

  // Learn: Objects can contain other objects as properties (nested objects)
  // Access nested properties using multiple dots: obj.prop1.prop2
  // This creates hierarchical data structures
  // Example: company.address.city accesses the city property of the address object
  test_nested_objects(): void {
    const company = {
      name: "TechCorp",
      address: {
        street: "123 Main St",
        city: "San Francisco",
        state: "CA",
      },
      employees: 100,
    };

    this.assertEqual(this.___(), company.name); // Company name?
    this.assertEqual("123 Main St", company.address.street);
    this.assertEqual(this.___(), company.address.city); // Fill in the blank
    this.assertEqual("CA", company.address.state);
  }

  // Learn: Object.keys() returns an array of property names, Object.values() returns values
  // These methods help iterate over object properties
  // Object.keys() is useful for checking what properties exist
  // Both return arrays that can be used with array methods
  // Example: Object.keys({a: 1, b: 2}) returns ['a', 'b']
  test_object_keys_and_values(): void {
    const colors = {
      red: "#FF0000",
      green: "#00FF00",
      blue: "#0000FF",
    };

    const keys = Object.keys(colors);
    const values = Object.values(colors);

    this.assertEqual(this.__(), keys.length); // Fill in the blank
    this.assertEqual(true, keys.includes("red"));
    this.assertEqual(this.___(), keys.includes("yellow")); // Fill in the blank

    this.assertEqual(3, values.length);
    this.assertEqual(this.___(), values.includes("#FF0000")); // Fill in the blank
  }

  // Learn: The spread operator (...) copies all properties from one object to another
  // Creates a new object without modifying the original
  // Later properties override earlier ones (right-most wins)
  // Useful for creating modified copies of objects
  // Example: { ...obj, newProp: value } copies obj and adds/overrides newProp
  test_object_spread_operator(): void {
    const original = { a: 1, b: 2 };
    const extended = { ...original, c: 3, d: 4 };
    const overridden = { ...original, b: 20, c: 30 };

    this.assertEqual(this.__(), Object.keys(extended).length); // Fill in the blank
    this.assertEqual(1, extended.a);
    this.assertEqual(this.__(), extended.c); // Fill in the blank

    this.assertEqual(1, overridden.a);
    this.assertEqual(this.__(), overridden.b); // Fill in the blank
    this.assertEqual(30, overridden.c);
  }

  // Learn: Object.freeze() makes an object immutable (cannot be changed)
  // Attempts to modify frozen objects fail silently or throw errors in strict mode
  // Only makes the object itself immutable, not nested objects (shallow freeze)
  // Useful for creating constants and preventing accidental modifications
  // Example: Object.freeze({x: 1}) creates an unchangeable object
  test_object_freeze_and_mutability(): void {
    const mutable = { value: 10 };
    const frozen = Object.freeze({ value: 20 });

    mutable.value = 15;
    this.assertEqual(this.__(), mutable.value); // Fill in the blank

    // This will fail silently in non-strict mode, throw in strict mode
    try {
      (frozen as any).value = 25;
    } catch (e) {
      // Expected in strict mode
    }

    this.assertEqual(this.__(), frozen.value); // Fill in the blank
  }
}
