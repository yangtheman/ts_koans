import { Koan } from "./koan";

export class AboutArrays extends Koan {
  constructor() {
    super("AboutArrays", "about-arrays.ts");
  }

  // Learn: Arrays are collections of elements that can be accessed by index
  // Empty arrays start with length 0, arrays with elements have length equal to element count
  // Arrays in TypeScript can be typed: number[] contains only numbers, any[] can contain anything
  // Example: const nums: number[] = [1, 2, 3] has length 3
  test_creating_arrays(): void {
    const empty_array: any[] = [];
    this.assertEqual(this.__(), empty_array.length); // Fill in the blank

    const numbers: number[] = [1, 2, 3];
    this.assertEqual(3, numbers.length);
  }

  // Learn: Array literals can contain mixed types (numbers, strings, booleans, etc.)
  // Elements are accessed using zero-based indexing: array[0] is first, array[1] is second
  // Arrays automatically track their length based on the number of elements
  // Example: [1, 'two', true] has 3 elements with different types
  test_array_literals(): void {
    const array = [1, "two", 3.0, true];

    this.assertEqual(this.__(), array.length); // Fill in the blank
    this.assertEqual(1, array[0]);
    this.assertEqual(this.___(), array[1]); // Fill in the blank
    this.assertEqual(3.0, array[2]);
    this.assertEqual(true, array[3]);
  }

  // Learn: Array elements are accessed using bracket notation and zero-based indices
  // The first element is at index 0, second at index 1, etc.
  // Accessing an invalid index returns undefined
  // Example: ['a', 'b', 'c'][0] returns 'a', ['a', 'b', 'c'][2] returns 'c'
  test_accessing_array_elements(): void {
    const fruits = ["apple", "banana", "orange"];

    this.assertEqual(this.___(), fruits[0]); // First fruit?
    this.assertEqual("banana", fruits[1]);
    this.assertEqual(this.___(), fruits[2]); // Last fruit?
  }

  // Learn: The slice() method returns a portion of an array without modifying the original
  // slice(start, end) - start is inclusive, end is exclusive
  // slice(start) returns from start to the end of the array
  // Negative indices count from the end: slice(-2) gets the last 2 elements
  // Example: [0,1,2,3,4].slice(1,3) returns [1,2]
  test_array_slicing(): void {
    const numbers = [0, 1, 2, 3, 4, 5];

    this.assertEqual([1, 2], numbers.slice(1, 3));
    this.assertEqual(this.___(), numbers.slice(2, 4)); // What slice is this?
    this.assertEqual([3, 4, 5], numbers.slice(3));
    this.assertEqual(this.___(), numbers.slice(-2)); // Last two elements?
  }

  // Learn: Array.from() creates arrays from array-like objects or iterables
  // {length: n} creates an array-like object with n undefined elements
  // The second parameter is a mapping function: (value, index) => newValue
  // This pattern creates ranges of numbers: [0, 1, 2, 3, 4]
  // Example: Array.from({length: 3}, (_, i) => i) creates [0, 1, 2]
  test_arrays_and_ranges(): void {
    // TypeScript doesn't have built-in ranges, but we can create them
    const range = Array.from({ length: 5 }, (_, i) => i);

    this.assertEqual(this.___(), range); // Fill in the blank
    this.assertEqual(5, range.length);
    this.assertEqual(0, range[0]);
    this.assertEqual(4, range[4]);
  }

  // Learn: push() adds elements to the end, pop() removes the last element
  // push() modifies the original array and returns the new length
  // pop() modifies the original array and returns the removed element
  // These methods implement a "stack" (Last In, First Out) data structure
  // Example: [1,2].push(3) makes the array [1,2,3] and returns 3 (new length)
  test_pushing_and_popping_arrays(): void {
    const stack = ["bottom"];

    stack.push("middle");
    stack.push("top");

    this.assertEqual(this.__(), stack.length); // Fill in the blank
    this.assertEqual(["bottom", "middle", "top"], stack);

    const popped = stack.pop();
    this.assertEqual(this.___(), popped); // What was popped?
    this.assertEqual(["bottom", "middle"], stack);
  }

  // Learn: shift() removes the first element, unshift() adds to the beginning
  // shift() returns the removed element, unshift() returns the new length
  // These methods implement a "queue" (First In, First Out) data structure
  // Note: These operations are slower than push/pop because all elements must be repositioned
  // Example: [1,2,3].shift() returns 1 and leaves [2,3]
  test_shifting_arrays(): void {
    const queue = ["first", "middle", "last"];

    const shifted = queue.shift();
    this.assertEqual(this.___(), shifted); // What was shifted?
    this.assertEqual(["middle", "last"], queue);

    queue.unshift("new_first");
    this.assertEqual(this.___(), queue); // Fill in the blank
  }

  // Learn: concat() combines arrays into a new array without modifying the originals
  // It creates a shallow copy with elements from all provided arrays
  // Original arrays remain unchanged (immutable operation)
  // Alternative modern syntax: [...array1, ...array2] (spread operator)
  // Example: [1,2].concat([3,4]) returns [1,2,3,4] but original arrays stay [1,2] and [3,4]
  test_array_concatenation(): void {
    const first = [1, 2];
    const second = [3, 4];
    const combined = first.concat(second);

    this.assertEqual(this.___(), combined); // Fill in the blank
    this.assertEqual([1, 2], first); // Original array unchanged
    this.assertEqual([3, 4], second); // Original array unchanged
  }

  // Learn: includes() checks if an array contains a specific element (returns boolean)
  // indexOf() finds the first index of an element, returns -1 if not found
  // Both methods use strict equality (===) for comparison
  // includes() is more readable for existence checks, indexOf() gives position
  // Example: ['a','b','c'].includes('b') is true, ['a','b','c'].indexOf('b') is 1
  test_array_includes(): void {
    const colors = ["red", "green", "blue"];

    this.assertEqual(this.___(), colors.includes("red")); // Fill in the blank
    this.assertEqual(false, colors.includes("yellow"));
    this.assertEqual(this.__(), colors.indexOf("green")); // Fill in the blank
    this.assertEqual(-1, colors.indexOf("purple"));
  }
}
