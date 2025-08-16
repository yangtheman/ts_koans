import { Koan } from "./koan";

export class AboutAsserts extends Koan {
  constructor() {
    super("AboutAsserts", "about-asserts.ts");
  }

  // Learn: Assertions are the foundation of understanding in koans
  // assert() checks if a condition is true and fails the test if it's false
  // This is your first step: make the assertion pass by changing false to true
  // The path to enlightenment begins with acknowledging truth
  // Example: assert(true) passes, assert(false) fails
  // We shall contemplate truth by testing reality, via asserts.
  test_assert_truth(): void {
    this.assert(false); // This should be true
  }

  // Learn: Assertions can include custom messages to explain what went wrong
  // The second parameter to assert() provides a helpful error message
  // Good messages make debugging easier when tests fail
  // This helps you understand what the test was trying to verify
  // Example: assert(condition, "Expected user to be logged in")
  test_assert_with_message(): void {
    this.assert(false, "This should be true"); // This should be true
  }

  // Learn: assertEqual() checks if two values are exactly the same
  // First parameter is the expected value, second is the actual value
  // Use assertEqual() instead of assert() when comparing specific values
  // This provides better error messages showing expected vs actual values
  // Example: assertEqual(5, 2 + 3) checks that 2 + 3 equals 5
  test_assert_equality(): void {
    const expected_value = 2;
    this.assertEqual(expected_value, 1 + this.__()); // Fill in the blank
  }

  // Learn: Sometimes you need to figure out what the expected value should be
  // Instead of hardcoding expected values, fill in the blanks with ___()
  // This teaches you to predict what expressions will evaluate to
  // Think about what 1 + 1 equals, then fill in that value
  // Example: assertEqual(4, 2 * 2) - you predict the result and verify it
  test_a_better_way_of_asserting_equality(): void {
    const expected_value = 2;
    this.assertEqual(this.___(), 1 + 1); // Fill in the blank
  }

  // Learn: assertNotEqual() verifies that two values are different
  // It passes when the values are NOT the same
  // Useful for testing that changes actually occurred or values are distinct
  // Think of a value that is definitely NOT equal to 1
  // Example: assertNotEqual(5, 3) passes because 5 ≠ 3
  test_assert_not_equal(): void {
    this.assertNotEqual(1, this.__()); // Fill in the blank
  }
}
