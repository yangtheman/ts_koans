import { Koan } from "./koan";

export class AboutEnumsAndUnions extends Koan {
  constructor() {
    super("AboutEnumsAndUnions", "about-enums-unions.ts");
  }

  // Learn: String literal types restrict values to specific string constants
  // Use the union operator | to combine multiple literal types
  // This provides compile-time checking that only valid values are used
  // TypeScript will prevent assignment of invalid string values
  // Example: Direction can only be 'north', 'south', 'east', or 'west'
  test_string_literal_types(): void {
    type Direction = "north" | "south" | "east" | "west";

    const move: Direction = "north";
    // const invalid: Direction = 'northeast'; // This would cause a compilation error

    this.assertEqual(this.___(), move); // What direction is move?

    function getDirection(): Direction {
      return "south";
    }

    this.assertEqual("south", getDirection());
  }

  // Learn: Numeric enums automatically assign incremental numbers starting from 0
  // Each enum member gets a numeric value: first = 0, second = 1, third = 2, etc.
  // You can access both the name and the numeric value
  // Enums are useful for representing a set of related constants
  // Example: Status.Pending = 0, Status.Approved = 1, Status.Rejected = 2
  test_numeric_enums(): void {
    enum Status {
      Pending,
      Approved,
      Rejected,
    }

    this.assertEqual(this.__(), Status.Pending); // Fill in the blank
    this.assertEqual(1, Status.Approved);
    this.assertEqual(this.__(), Status.Rejected); // Fill in the blank

    const currentStatus: Status = Status.Approved;
    this.assertEqual(Status.Approved, currentStatus);
  }

  // Learn: String enums use explicit string values for each member
  // Each member must be assigned a string value manually
  // String enums are more readable and debuggable than numeric enums
  // The string values are preserved at runtime, making debugging easier
  // Example: Theme.Light = 'light', Theme.Dark = 'dark'
  test_string_enums(): void {
    enum Theme {
      Light = "light",
      Dark = "dark",
      Auto = "auto",
    }

    this.assertEqual(this.___(), Theme.Light); // Fill in the blank
    this.assertEqual("dark", Theme.Dark);
    this.assertEqual(this.___(), Theme.Auto); // Fill in the blank
  }

  // Learn: Union types allow a variable to hold one of several possible types
  // Use the | operator to combine types: string | number means string OR number
  // The variable can be assigned any of the union's member types
  // TypeScript tracks which type is currently stored through type narrowing
  // Example: StringOrNumber can hold either a string or a number value
  test_union_types(): void {
    type StringOrNumber = string | number;
    type BooleanOrNull = boolean | null;

    let value: StringOrNumber = 42;
    this.assertEqual(this.__(), value); // Fill in the blank
    this.assertEqual("number", typeof value);

    value = "Hello";
    this.assertEqual(this.___(), value); // Fill in the blank
    this.assertEqual("string", typeof value);

    let flag: BooleanOrNull = true;
    this.assertEqual(true, flag);

    flag = null;
    this.assertEqual(this.___(), flag); // Fill in the blank
  }

  // Learn: Discriminated unions use a common property to distinguish between types
  // Each type in the union has a shared property with different literal values
  // TypeScript uses this property to determine which specific type you're working with
  // This enables type-safe handling of different states or variants
  // Example: ApiResponse uses 'status' property to differentiate loading/success/error
  test_discriminated_unions(): void {
    interface Loading {
      status: "loading";
    }

    interface Success {
      status: "success";
      data: string;
    }

    interface Error {
      status: "error";
      message: string;
    }

    type ApiResponse = Loading | Success | Error;

    function handleResponse(response: ApiResponse): string {
      switch (response.status) {
        case "loading":
          return "Loading...";
        case "success":
          return response.data;
        case "error":
          return `Error: ${response.message}`;
      }
    }

    const loading: ApiResponse = { status: "loading" };
    const success: ApiResponse = { status: "success", data: "Hello World" };
    const error: ApiResponse = { status: "error", message: "Failed to fetch" };

    this.assertEqual(this.___(), handleResponse(loading)); // Fill in the blank
    this.assertEqual("Hello World", handleResponse(success));
    this.assertEqual(this.___(), handleResponse(error)); // Fill in the blank
  }

  // Learn: Type guards are functions that help TypeScript determine specific types
  // 'animal is Fish' is a type predicate that tells TypeScript the return type meaning
  // The 'in' operator checks if a property exists on an object
  // Type guards enable safe access to type-specific properties after the check
  // Example: isFish() lets TypeScript know when we have a Fish vs Bird
  test_type_guards(): void {
    type Fish = { swim: () => void };
    type Bird = { fly: () => void };

    function isFish(animal: Fish | Bird): animal is Fish {
      return "swim" in animal;
    }

    const fish: Fish = { swim: () => console.log("swimming") };
    const bird: Bird = { fly: () => console.log("flying") };

    this.assertEqual(this.___(), isFish(fish)); // Fill in the blank
    this.assertEqual(false, isFish(bird));

    function move(animal: Fish | Bird) {
      if (isFish(animal)) {
        return "swimming";
      } else {
        return "flying";
      }
    }

    this.assertEqual("swimming", move(fish));
    this.assertEqual(this.___(), move(bird)); // How does bird move?
  }
}
