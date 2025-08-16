import { Koan, Sensei } from "./koan";

// Import all koan classes
import { AboutAsserts } from "./about-asserts";
import { AboutTypes } from "./about-types";
import { AboutStrings } from "./about-strings";
import { AboutArrays } from "./about-arrays";
import { AboutFunctions } from "./about-functions";
import { AboutObjects } from "./about-objects";
import { AboutClasses } from "./about-classes";
import { AboutInterfaces } from "./about-interfaces";
import { AboutEnumsAndUnions } from "./about-enums-unions";
import { AboutGenerics } from "./about-generics";
import { AboutAsyncAwait } from "./about-async-await";

// The path to TypeScript enlightenment starts with the following:
const koansInOrder: Array<new () => Koan> = [
  AboutAsserts,
  AboutTypes,
  AboutStrings,
  AboutArrays,
  AboutFunctions,
  AboutObjects,
  AboutClasses,
  AboutInterfaces,
  AboutEnumsAndUnions,
  AboutGenerics,
  AboutAsyncAwait,
];

export class PathToEnlightenment {
  private sensei: Sensei;

  constructor() {
    this.sensei = new Sensei();
  }

  walk(): void {
    console.log("🚀 Welcome to TypeScript Koans!");
    console.log("The path to TypeScript enlightenment begins...\n");

    let totalTests = 0;
    const allKoans: Koan[] = [];

    // First pass: create all koans and count tests
    for (const KoanClass of koansInOrder) {
      const koan = new KoanClass();
      allKoans.push(koan);
      totalTests += koan.getTestMethods().length;
    }

    this.sensei.setTotalTests(totalTests);

    // Second pass: run all individual tests
    for (const koan of allKoans) {
      const testMethods = koan.getTestMethods();

      for (const testMethod of testMethods) {
        // Run individual test method
        const error = koan.meditateOnSingle(testMethod);
        this.sensei.observe(error, testMethod, koan.file);

        if (error) {
          // Stop at first failure
          this.sensei.instruct();
          return;
        }
      }
    }

    // If we reach here, all koans passed
    this.sensei.instruct();
  }
}

// Run the path if this file is executed directly
if (require.main === module) {
  const path = new PathToEnlightenment();
  path.walk();
}
