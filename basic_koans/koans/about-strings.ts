import { Koan } from "./koan";

export class AboutStrings extends Koan {
  constructor() {
    super("AboutStrings", "about-strings.ts");
  }

  // Learn: TypeScript has three ways to create string literals
  // Single quotes (''), double quotes (""), and backticks (``) all create strings
  // All three methods result in the same 'string' type
  // Example: 'Hello', "Hello", and `Hello` are all equivalent strings
  test_string_literals(): void {
    const singleQuotes = "Hello";
    const doubleQuotes = "World";
    const backticks = `TypeScript`;

    this.assertEqual(this.___(), typeof singleQuotes); // What type?
    this.assertEqual("string", typeof doubleQuotes);
    this.assertEqual("string", typeof backticks);
  }

  // Learn: String concatenation combines two or more strings into one
  // The + operator is used to join strings together
  // Spaces and other characters must be explicitly added
  // Example: 'Hello' + ' ' + 'World' results in 'Hello World'
  test_string_concatenation(): void {
    const hello = "Hello";
    const world = "World";
    const greeting = hello + " " + world;

    this.assertEqual(this.___(), greeting); // Fill in the blank
  }

  // Learn: Template literals (backticks) allow embedding expressions with ${}
  // Variables and expressions inside ${} are evaluated and inserted into the string
  // This is more readable than string concatenation for complex strings
  // Example: `Hello ${name}` is equivalent to 'Hello ' + name
  test_template_literals(): void {
    const name = "TypeScript";
    const version = "5.3";
    const message = `Learning ${name} version ${version}`;

    this.assertEqual(this.___(), message); // Fill in the blank
  }

  // Learn: Strings have built-in methods for manipulation and information
  // .length property returns the number of characters in the string
  // .toUpperCase() converts all letters to uppercase, .toLowerCase() to lowercase
  // .charAt(index) returns the character at the specified position (0-based)
  // Example: 'TypeScript'.length is 10, 'TypeScript'.charAt(0) is 'T'
  test_string_methods(): void {
    const text = "TypeScript";

    this.assertEqual(this.__(), text.length); // How long is 'TypeScript'?
    this.assertEqual(this.___(), text.toUpperCase()); // Fill in the blank
    this.assertEqual("typescript", text.toLowerCase());
    this.assertEqual(this.___(), text.charAt(0)); // Fill in the blank
    this.assertEqual("t", text.charAt(9));
  }

  // Learn: Strings can be accessed like arrays using bracket notation
  // Each character has an index starting from 0
  // string[0] gets the first character, string[length-1] gets the last
  // Example: 'Hello'[0] is 'H', 'Hello'[4] is 'o'
  test_string_indexing(): void {
    const word = "Hello";

    this.assertEqual(this.___(), word[0]); // Fill in the blank
    this.assertEqual("e", word[1]);
    this.assertEqual(this.___(), word[4]); // Fill in the blank
  }

  // Learn: Searching within strings using includes() and indexOf()
  // .includes(substring) returns true if the string contains the substring
  // .indexOf(substring) returns the index of the first occurrence, or -1 if not found
  // Both methods are case-sensitive
  // Example: 'Hello World'.includes('World') is true, 'Hello World'.indexOf('World') is 6
  test_string_includes_and_search(): void {
    const sentence = "TypeScript is awesome";

    this.assertEqual(this.___(), sentence.includes("Script")); // Fill in the blank
    this.assertEqual(false, sentence.includes("Python"));
    this.assertEqual(this.__(), sentence.indexOf("Script")); // Fill in the blank
    this.assertEqual(-1, sentence.indexOf("Java"));
  }

  // Learn: The split() method divides a string into an array of substrings
  // It takes a delimiter (separator) as an argument
  // The delimiter is not included in the resulting array elements
  // Example: 'a,b,c'.split(',') results in ['a', 'b', 'c']
  test_string_splitting(): void {
    const csv = "apple,banana,orange";
    const words = csv.split(",");

    this.assertEqual(this.__(), words.length); // Fill in the blank
    this.assertEqual("apple", words[0]);
    this.assertEqual(this.___(), words[1]); // Fill in the blank
    this.assertEqual("orange", words[2]);
  }

  // Learn: Escape characters allow special characters to be included in strings
  // \" for double quotes inside double-quoted strings
  // \' for single quotes inside single-quoted strings
  // \n for newline, \t for tab character
  // Example: 'Don\'t' allows a single quote inside a single-quoted string
  test_escape_characters(): void {
    const quote = 'She said, "Hello"';
    const apostrophe = "Don't worry";
    const newline = "Line 1\nLine 2";
    const tab = "Column 1\tColumn 2";

    this.assertEqual(this.___(), quote.includes('"')); // Fill in the blank
    this.assertEqual(true, apostrophe.includes("'"));
    this.assertEqual(this.___(), newline.includes("\n")); // Fill in the blank
    this.assertEqual(true, tab.includes("\t"));
  }
}
