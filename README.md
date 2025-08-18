# TypeScript Koans 🧘‍♂️

**Learn TypeScript through test-driven development with two learning paths**

Learn TypeScript through test-driven development, inspired by the famous [Ruby Koans](https://github.com/edgecase/ruby_koans). This repository offers **two distinct learning experiences**:

- **Basic Koans** (`basic_koans/` directory) - Core TypeScript concepts for beginners  
- **Advanced Koans** (`advanced_koans/` directory) - Professional-grade, comprehensive learning

The TypeScript Koans walk you along the path to enlightenment in order to learn TypeScript. The goal is to learn the TypeScript language, syntax, structure, and development practices through test-driven development.

## 🎯 Two Learning Paths

### 📚 Basic TypeScript Koans (`basic_koans/` Directory)
**Perfect for beginners and those learning core TypeScript concepts**

- **12 fundamental modules** covering essential TypeScript features
- **Clear, focused learning** of basic concepts
- **Straightforward explanations** of core language features  
- **Beginner-friendly progression** from basics to intermediate concepts

### 🚀 Advanced TypeScript Koans (`advanced_koans/` Directory)
**Comprehensive, professional-grade learning experience**

- **11,313+ lines of educational content** (5.5x expansion from basic)
- **86+ detailed tests** with comprehensive concept explanations
- **50+ CONCEPT headers** explaining WHY, not just HOW
- **500+ real-world patterns** used in production systems
- **Expert-level coverage** from basics to advanced type-level programming

**→ [Jump to Advanced Koans](./advanced_koans/)** for the comprehensive learning experience.

## The Structure (Basic Koans)

The basic koans (in `basic_koans/` directory) are broken out into focused modules, each containing core TypeScript concepts:

- **`about-asserts.ts`** - Assertions and basic testing concepts
- **`about-types.ts`** - TypeScript's type system fundamentals  
- **`about-strings.ts`** - String manipulation and template literals
- **`about-arrays.ts`** - Array operations and methods
- **`about-functions.ts`** - Functions, arrow functions, and basic patterns
- **`about-objects.ts`** - Object literals and basic object operations
- **`about-classes.ts`** - Classes, inheritance, and basic OOP
- **`about-interfaces.ts`** - Interface definitions and structural typing
- **`about-enums-unions.ts`** - Enums and union types
- **`about-generics.ts`** - Generic functions and classes
- **`about-async-await.ts`** - Promises and async/await basics
- **`about-advanced-types.ts`** - More sophisticated TypeScript features

They are presented in order in the `path-to-enlightenment.ts` file.

### For Advanced Learning

If you want comprehensive, production-ready TypeScript knowledge with detailed concept explanations, real-world patterns, and expert-level coverage, check out the **[Advanced TypeScript Koans](./advanced_koans/)** directory.

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

## 🚀 Getting Started

**Ready to master TypeScript? This repository has been restructured into two learning paths. Follow these simple steps to begin your journey to enlightenment!**

### 1. Clone the Repository

```bash
git clone https://github.com/yangtheman/ts_koans.git
cd ts_koans
```

### 2. Choose Your Learning Path and Install Dependencies

**For Basic Koans (beginners):**
```bash
cd basic_koans
yarn install
```

**For Advanced Koans (comprehensive learning):**
```bash
cd advanced_koans  
yarn install
```

### 3. Generate the Student Koans

**For Basic Koans:**
```bash
# From basic_koans/ directory
yarn generate
yarn install:koans  # Installs dependencies in koans/ subdirectory
```

**For Advanced Koans:**
```bash  
# From advanced_koans/ directory
yarn generate
yarn install:koans  # Installs dependencies in koans/ subdirectory
```

This creates a `koans/` directory within your chosen path with the student version of the files (with solutions removed and blanks to fill in).

### 4. Start Your Journey to TypeScript Mastery! 🧘‍♂️

**For Basic Koans:**
```bash
# From basic_koans/ directory
yarn test:koans     # Begin your path to enlightenment
```

**For Advanced Koans:**
```bash
# From advanced_koans/ directory  
yarn test:koans     # Begin your comprehensive journey
```

**🎯 You're now ready to learn TypeScript! Choose your path:**

- **Basic Koans**: 12 fundamental modules for solid foundations
- **Advanced Koans**: 86+ comprehensive tests across 12 enhanced modules with detailed explanations!

The first test will fail, showing you exactly what to fix. Each failure is a step closer to mastery.

## The Path To Enlightenment

You can run the tests using `yarn test` from the appropriate koans directory (`basic_koans/koans/` or `advanced_koans/koans/`).

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

Your path thus far [░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 0/86 (0%)

"Mountains are merely mountains" 🏔️
```

You have come to your first stage. Open the `about-asserts.ts` file and look at the first test:

```typescript
// Learn: Assertions are the foundation of understanding in koans
// assert() checks if a condition is true and fails the test if it's false
// This is your first step: make the assertion pass by changing __() to true
// The path to enlightenment begins with acknowledging truth
test_assert_truth(): void {
  this.assert(this.__()); // Fill in the blank with true
}
```

Replace the `this.__()` with `true` and re-run the test. After you are done, think about what you are learning. Each test includes detailed CONCEPT explanations that teach you not just what to do, but WHY TypeScript works the way it does.

In this case the goal is for you to see that if you pass a value to the `assert` method, it will either ensure it is `true` and continue on, or fail if the statement is `false`.

## Running the Koans

The normal path to enlightenment looks like this:

**For Basic Koans:**
```bash
cd basic_koans
yarn test:koans
# edit the koans files
yarn test:koans
# edit the koans files
yarn test:koans
# etc
```

**For Advanced Koans:**
```bash
cd advanced_koans
yarn test:koans
# edit the koans files  
yarn test:koans
# edit the koans files
yarn test:koans
# etc
```

## Available Scripts

### In basic_koans/ directory:

- `yarn build` - Compile TypeScript source files
- `yarn generate` - Generate student koans from source
- `yarn test` - Build and run the complete (solution) version
- `yarn clean` - Remove generated files
- `yarn reset` - Clean and regenerate koans
- `yarn watch` - Watch for changes and auto-run tests
- `yarn install:koans` - Install dependencies in student koans directory
- `yarn build:koans` - Build the student koans
- `yarn test:koans` - Run the student koans tests
- `yarn clean:koans` - Clean student koans compiled files

### In advanced_koans/ directory:

- `yarn build` - Compile TypeScript source files  
- `yarn generate` - Generate student koans from source
- `yarn test` - Build and run the complete (solution) version
- `yarn clean` - Remove generated files
- `yarn reset` - Clean and regenerate koans
- `yarn watch` - Watch for changes and auto-run tests
- `yarn install:koans` - Install dependencies in student koans directory
- `yarn build:koans` - Build the student koans
- `yarn test:koans` - Run the student koans tests
- `yarn clean:koans` - Clean student koans compiled files

### In the student koans directories (basic_koans/koans/ or advanced_koans/koans/):

- `yarn build` - Compile the student koans
- `yarn test` - Run the koans (this is your main learning command!)
- `yarn clean` - Remove compiled files

## Project Structure

```
typescript-koans/
├── basic_koans/               # Basic learning path
│   ├── src/                   # Source files with solutions
│   │   ├── koan.ts           # Base koan framework
│   │   ├── about-asserts.ts  # Basic assertions
│   │   ├── about-types.ts    # Basic type system
│   │   ├── ... (other koans)
│   │   ├── path-to-enlightenment.ts  # Main runner
│   │   └── generate-koans.ts # Generator script
│   ├── koans/                # Generated student files
│   │   ├── *.ts             # Koan files with blanks to fill
│   │   ├── package.json     # Student dependencies
│   │   └── tsconfig.json    # Student TypeScript config
│   ├── lib/                 # Compiled JavaScript (generated)
│   ├── package.json         # Basic koans configuration
│   └── tsconfig.json        # Basic koans TypeScript config
├── advanced_koans/           # Advanced learning path
│   ├── src/                 # Comprehensive source files
│   │   ├── koan.ts         # Enhanced koan framework
│   │   ├── about-asserts.ts # Advanced assertions (1,244 lines)
│   │   ├── about-types.ts  # Comprehensive types (449 lines)
│   │   ├── ... (enhanced koans with detailed concepts)
│   │   ├── path-to-enlightenment.ts  # Main runner
│   │   └── generate-koans.ts # Generator script
│   ├── koans/              # Generated student files
│   ├── lib/                # Compiled JavaScript (generated)
│   ├── package.json        # Advanced koans configuration
│   ├── tsconfig.json       # Advanced koans TypeScript config
│   └── README.md           # Advanced koans specific guide
├── lib/                    # Root compiled JavaScript (legacy)
├── package.json           # Root project configuration  
├── tsconfig.json          # Root TypeScript configuration
└── README.md              # This file (main guide)
```

## What You'll Learn (Basic Koans)

By completing the basic koans, you'll gain solid understanding of core TypeScript concepts:

### 🌱 TypeScript Fundamentals
- Type annotations and type inference
- Primitive types: `string`, `number`, `boolean`, `bigint`, `symbol`
- Arrays, objects, and basic data structures
- Functions, arrow functions, and parameter patterns

### 🌿 Core Concepts
- Classes, inheritance, and access modifiers
- Interfaces and structural typing
- Enums, union types, and basic type manipulation
- Generic functions and classes
- Async/await and Promise handling

### 🌳 Intermediate Features
- Advanced types and utility types
- Type guards and type assertions
- Module systems and namespaces
- Basic error handling patterns

### 🚀 Ready for More?

**For comprehensive, professional-level TypeScript mastery**, including:
- Advanced type-level programming
- Real-world architectural patterns  
- Production-ready development practices
- Expert-level debugging and validation techniques
- 11,313+ lines of detailed educational content

**→ Continue with the [Advanced TypeScript Koans](./advanced_koans/)**

## Tips for Success

1. **Read the comments carefully** - Each test includes explanations of core concepts
2. **Use `__()` and `___()` as placeholders** - Replace these with the correct values
3. **Take your time** - Understanding is more important than speed
4. **Experiment beyond the tests** - Try different solutions and explore edge cases
5. **Read the TypeScript handbook** - [typescriptlang.org](https://www.typescriptlang.org/docs/)
6. **Study the source files** - Complete solutions in `src/` show the answers

### 🎯 Learning Approach
- **Focus on core concepts** - Build a solid foundation
- **Practice regularly** - Consistent practice builds understanding
- **Move to advanced koans** - For comprehensive, professional-level learning

### For Advanced Learning
Ready for production-level TypeScript mastery? The **[Advanced TypeScript Koans](./advanced_koans/)** provide:
- Comprehensive concept explanations (WHY, not just HOW)
- Real-world architectural patterns
- Expert-level debugging and validation techniques
- 11,313+ lines of detailed educational content

## Troubleshooting

### Common Issues

**"Cannot find module" errors:**
Make sure you've run `yarn install` in the appropriate directories:
- Basic koans: `cd basic_koans && yarn install`  
- Advanced koans: `cd advanced_koans && yarn install`
- Student koans: Use `yarn install:koans` from the basic_koans or advanced_koans directory, OR manually `cd basic_koans/koans && yarn install` / `cd advanced_koans/koans && yarn install`

**TypeScript compilation errors:**
The koans are designed to fail initially. Follow the error messages to understand what needs to be fixed.

**Tests not running:**
Ensure you're in the correct koans directory:
- Basic: `basic_koans/koans/` 
- Advanced: `advanced_koans/koans/`

### Getting Help

- Check the [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- Review the source files in `src/` for complete solutions
- Look at the error messages - they often contain the answer

## Contributing

This project offers both basic and advanced learning paths. If you'd like to contribute:

1. Fork the repository
2. **For basic koans**: Focus on clear, fundamental concepts
3. **For advanced koans**: Maintain the educational quality standard with detailed CONCEPT headers
4. Test your changes thoroughly
5. Submit a pull request

## Inspiration

A special thanks to Jim Weirich and Joe O'Brien for creating the original Ruby Koans, which inspired this TypeScript version.

### Two Learning Paths
- **Basic Koans** (`basic_koans/` directory): Core TypeScript concepts for beginners
- **[Advanced Koans](./advanced_koans/)**: Comprehensive, professional-grade learning with 11,313+ lines of content

### Resources
- **Original Ruby Koans**: [github.com/edgecase/ruby_koans](https://github.com/edgecase/ruby_koans)
- **TypeScript Handbook**: [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
- **TypeScript Deep Dive**: [basarat.gitbook.io/typescript](https://basarat.gitbook.io/typescript/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### 🛤️ Choose Your Path

**🌱 New to TypeScript?** Start with **[Basic TypeScript Koans](./basic_koans/)** for solid fundamentals.

**🚀 Ready for mastery?** Jump to **[Advanced TypeScript Koans](./advanced_koans/)** for comprehensive, professional-level learning.

---

**"The path of the TypeScript developer begins with a single test."** 🧘‍♂️

*Your journey to TypeScript enlightenment starts here!* ✨
