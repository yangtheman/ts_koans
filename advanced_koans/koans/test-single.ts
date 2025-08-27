// Simple test runner for just one async/await test at a time
import { AboutAsyncAwait } from "./about-async-await";

async function runSingleTest() {
  const koan = new AboutAsyncAwait();
  
  try {
    // Change this to test different methods:
    // - test_promise_values_and_resolution  
    // - test_promise_error_handling
    // - test_async_await_vs_promises
    // - test_promise_concurrency_patterns  
    // - test_real_world_async_patterns
    
    await koan.test_promise_values_and_resolution();
    console.log("✅ Test passed!");
  } catch (error: any) {
    console.log(`❌ Test failed: ${error.message}`);
    console.log("👉 Check your placeholders in about-async-await.ts");
  }
}

runSingleTest();