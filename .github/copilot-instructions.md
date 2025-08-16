# TypeScript Koans Project

A comprehensive TypeScript learning project inspired by Ruby koans, designed to teach TypeScript fundamentals through test-driven development.

## Project Structure

- `src/` - Source koan files with complete solutions
- `koans/` - Generated student files with blanks to fill in
- `lib/` - Compiled JavaScript output
- Core koan framework with assertion methods and test runner
- 11 comprehensive koan modules covering TypeScript concepts
- Automatic koan generation system that removes solutions

## Features Completed

✅ Core koan framework with TypeScript-specific assertions
✅ Comprehensive koan modules covering all major TypeScript concepts:

- Basic types and assertions
- Strings and template literals
- Arrays and array methods
- Functions and arrow functions
- Objects and destructuring
- Classes and inheritance
- Interfaces and implementation
- Enums and union types
- Generics and utility types
- Async/await and Promises
  ✅ Path to enlightenment test runner with progress tracking
  ✅ Koan generation system that creates student versions
  ✅ Build scripts and TypeScript configuration
  ✅ Comprehensive documentation and usage instructions

## Development Guidelines

- Follow TDD principles with failing tests that students fix
- Use `__()` and `___()` placeholders for values students need to provide
- Each koan focuses on one TypeScript concept with progressive difficulty
- Maintain educational flow and clear learning objectives
- Provide meaningful error messages and progress indicators

## Usage

1. `yarn build` - Compile TypeScript source
2. `yarn generate` - Create student koans from source
3. `cd koans && yarn test` - Start the learning journey
4. `yarn watch` - Watch for changes and auto-run tests

Total of 84 individual tests across 11 comprehensive modules covering TypeScript fundamentals through advanced features.
