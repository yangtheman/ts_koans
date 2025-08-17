# TypeScript Koans 🧘‍♂️

Learn TypeScript through test-driven development, inspired by the famous [Ruby Koans](https://github.com/edgecase/ruby_koans).

The TypeScript Koans walk you along the path to enlightenment in order to learn TypeScript. The goal is to learn the TypeScript language, syntax, structure, and some common functions and libraries. We also teach you culture by basing the koans on tests. Testing is not just something we pay lip service to, but something we live. Testing is essential in your quest to learn and do great things in TypeScript.

## The Structure

The koans are broken out into areas by file:
- `about-asserts.ts` - Learn about assertions and testing fundamentals
- `about-types.ts` - Basic TypeScript type system
- `about-strings.ts` - String manipulation and template literals
- `about-arrays.ts` - Array operations and methods
- `about-functions.ts` - Functions, arrow functions, and higher-order functions
- `about-objects.ts` - Object literals, destructuring, and manipulation
- `about-classes.ts` - Class definitions, inheritance, and access modifiers
- `about-interfaces.ts` - Interface definitions and implementation
- `about-enums-unions.ts` - Enums, union types, and discriminated unions
- `about-generics.ts` - Generic functions, classes, and utility types
- `about-async-await.ts` - Promises, async/await, and asynchronous programming
- `about-advanced-types.ts` - **NEW!** Advanced TypeScript features and type-level programming

They are presented in order in the `path-to-enlightenment.ts` file.

Each koan builds up your knowledge of TypeScript and builds upon itself. It will stop at the first place you need to correct.

Some koans simply need to have the correct answer substituted for an incorrect one. Some, however, require you to supply your own answer. If you see the method `__()` or `___()`, it is a hint to you to supply your own code in order to make it work correctly.

## Prerequisites

- **Node.js** - Version 16 or later
- **Yarn** - Package manager (recommended over npm for this project)

To check your installations:

```bash
node --version  # Should be 16.0.0 or later
yarn --version  # Any recent version
```

If you don't have Yarn installed:

```bash
npm install -g yarn
```

## Getting Started

### 1. Clone or Download

```bash
git clone <your-repo-url>
cd typescript-koans
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Generate the Koans

```bash
yarn generate
```

This creates a `koans/` directory with the student version of the files (with solutions removed).

### 4. Start Your Journey to Enlightenment

```bash
cd koans
yarn install  # Install dependencies for the student version
yarn test
```

## The Path To Enlightenment

You can run the tests using `yarn test` from the koans directory.

### Red, Green, Refactor

In test-driven development the mantra has always been **red, green, refactor**. Write a failing test and run it (*red*), make the test pass (*green*), then look at the code and consider if you can make it any better (*refactor*).

While walking the path to TypeScript enlightenment you will need to run the koan and see it fail (*red*), make the test pass (*green*), then take a moment and reflect upon the test to see what it is teaching you and improve the code to better communicate its intent (*refactor*).

### Your First Koan

The very first time you run the koans you will see the following output:

```
🚀 Welcome to TypeScript Koans!
The path to TypeScript enlightenment begins...

==================================================
❌ about-asserts.ts has damaged your karma.

The TypeScript Master says:
You have not yet reached enlightenment.

The answers you seek...
Assertion failed

Please meditate on the following code:
about-asserts.ts

Your path thus far [░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 0/94 (0%)

"Mountains are merely mountains" 🏔️
```

You have come to your first stage. Open the `about-asserts.ts` file and look at the first test:

```typescript
// We shall contemplate truth by testing reality, via asserts.
test_assert_truth(): void {
  this.assert(false); // This should be true
}
```

Change the `false` to `true` and re-run the test. After you are done, think about what you are learning. In this case, ignore everything except the method name (`test_assert_truth`) and the parts inside the method.

In this case the goal is for you to see that if you pass a value to the `assert` method, it will either ensure it is `true` and continue on, or fail if the statement is `false`.

## Running the Koans

The normal path to enlightenment looks like this:

```bash
cd koans
yarn test
# edit the files
yarn test
# edit the files
yarn test
# etc
```

## Available Scripts

### In the main project directory:

- `yarn build` - Compile TypeScript source files
- `yarn generate` - Generate student koans from source
- `yarn test` - Build and run the complete (solution) version
- `yarn clean` - Remove generated files
- `yarn reset` - Clean and regenerate koans
- `yarn watch` - Watch for changes and auto-run tests
- `yarn watch:nodemon` - Alternative watch mode using nodemon

### In the koans directory:

- `yarn build` - Compile the student koans
- `yarn test` - Run the koans (this is your main command)
- `yarn clean` - Remove compiled files

## Project Structure

```
typescript-koans/
├── src/                    # Source files with solutions
│   ├── koan.ts            # Base koan framework
│   ├── about-asserts.ts   # First koan about assertions
│   ├── about-types.ts     # TypeScript type system
│   ├── ... (other koans)
│   ├── path-to-enlightenment.ts  # Main runner
│   └── generate-koans.ts  # Generator script
├── koans/                 # Generated student files
│   ├── *.ts              # Koan files with blanks to fill
│   ├── package.json      # Student dependencies
│   └── tsconfig.json     # Student TypeScript config
├── lib/                  # Compiled JavaScript (generated)
├── package.json          # Main project configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## What You'll Learn

By completing these koans, you'll gain understanding of:

### Basic TypeScript Concepts
- Type annotations and type inference
- Primitive types: `string`, `number`, `boolean`
- Arrays and objects
- Functions and arrow functions

### Intermediate Concepts
- Classes and inheritance
- Interfaces and type definitions
- Access modifiers (`public`, `private`, `protected`)
- Static methods and properties

### Advanced Features
- Generic functions and classes
- Utility types (`Partial`, `Pick`, `Omit`)
- Conditional and mapped types
- Type constraints and inference

### **NEW!** Expert-Level TypeScript
- Template literal types and string manipulation
- Recursive types for complex data structures
- The `infer` keyword and advanced type inference
- Branded types for type-safe primitives
- Function overloads and abstract classes
- Module augmentation and mixins
- Index signatures and key remapping
- Distributive conditional types

### Best Practices
- Test-driven development
- Type safety and error prevention
- Code organization and modularity

## Tips for Success

1. **Read the error messages carefully** - TypeScript provides excellent error messages
2. **Use `__()` and `___()` as placeholders** - Replace these with the correct values
3. **Take your time** - Understanding is more important than speed
4. **Experiment** - Try different solutions and see what happens
5. **Read the TypeScript handbook** - [typescriptlang.org](https://www.typescriptlang.org/docs/)

## Troubleshooting

### Common Issues

**"Cannot find module" errors:**
Make sure you've run `yarn install` in both the main directory and the koans directory.

**TypeScript compilation errors:**
The koans are designed to fail initially. Follow the error messages to understand what needs to be fixed.

**Tests not running:**
Ensure you're in the `koans/` directory when running `yarn test`.

### Getting Help

- Check the [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- Review the source files in `src/` for complete solutions
- Look at the error messages - they often contain the answer

## Contributing

This project is based on the excellent Ruby Koans by EdgeCase. If you'd like to contribute:

1. Fork the repository
2. Add new koans or improve existing ones
3. Test your changes thoroughly
4. Submit a pull request

## Inspiration

A special thanks to Jim Weirich and Joe O'Brien for creating the original Ruby Koans, which inspired this TypeScript version. The Ruby Koans taught us the value of learning through testing and short questions with simple answers.

- **Original Ruby Koans**: [github.com/edgecase/ruby_koans](https://github.com/edgecase/ruby_koans)
- **TypeScript Handbook**: [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**"The path of the TypeScript developer is paved with types and tests."** 🚀

Happy coding! 🧘‍♂️
