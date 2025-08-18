import { Koan } from "./koan";

export class AboutStrings extends Koan {
  constructor() {
    super("AboutStrings", "about-strings.ts");
  }

  /**
   * String Literals and Type System Integration
   *
   * TypeScript's string type system extends beyond simple primitives to include
   * literal types, template literal types, and sophisticated pattern matching.
   * Understanding these concepts is essential for building type-safe APIs and
   * leveraging TypeScript's advanced string manipulation capabilities.
   *
   * Key Concepts:
   * - String literal types create specific, exact string values as types
   * - Template literal types enable type-level string manipulation
   * - Union types with string literals provide controlled vocabularies
   * - Type narrowing with string literals enables precise type inference
   *
   * Real-world applications:
   * - API endpoint typing and validation
   * - Configuration key management
   * - Event name type safety
   * - CSS property and value validation
   * - Database column name type safety
   */
  test_string_literal_types(): void {
    // String literal types - exact string values as types
    type Theme = "light" | "dark" | "auto";
    type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    type LogLevel = "debug" | "info" | "warn" | "error";

    // Template literal types for pattern construction
    type EventName<T extends string> = `on${Capitalize<T>}`;
    type CSSProperty<T extends string> = `--${T}`;
    type DatabaseTable<T extends string> = `${T}_table`;

    // Function demonstrating literal type constraints
    function setTheme(theme: Theme): string {
      return `Theme set to ${theme}`;
    }

    function makeHttpRequest<M extends HttpMethod>(method: M, url: string): M {
      console.log(`${method} request to ${url}`);
      return method;
    }

    function createEvent<T extends string>(eventType: T): EventName<T> {
      return `on${eventType.charAt(0).toUpperCase()}${eventType.slice(
        1
      )}` as EventName<T>;
    }

    // Test literal type usage
    const currentTheme: Theme = "dark";
    const httpMethod: HttpMethod = "POST";
    const logLevel: LogLevel = "info";

    const themeMessage = setTheme(currentTheme);
    const requestMethod = makeHttpRequest("GET", "/api/users");
    const clickEvent = createEvent("click");
    const focusEvent = createEvent("focus");

    this.assertEqual(this.___(), currentTheme);
    this.assertEqual("Theme set to dark", themeMessage);
    this.assertEqual(this.___(), requestMethod);
    this.assertEqual("onClick", clickEvent);
    this.assertEqual(this.___(), focusEvent);

    // Type narrowing with string literals
    function processLogLevel(level: LogLevel): number {
      switch (level) {
        case "debug":
          return 0;
        case "info":
          return 1;
        case "warn":
          return 2;
        case "error":
          return 3;
        default:
          // TypeScript knows this is never reached
          const exhaustiveCheck: never = level;
          return exhaustiveCheck;
      }
    }

    this.assertEqual(1, processLogLevel("info"));
    this.assertEqual(this.___(), processLogLevel("error"));
  }

  /**
   * Template Literals and String Interpolation
   *
   * Template literals provide powerful string composition capabilities that go
   * far beyond simple concatenation. They enable complex string interpolation,
   * multi-line strings, and when combined with TypeScript's type system,
   * sophisticated compile-time string validation.
   *
   * Key Concepts:
   * - Template literals use backticks and ${} for expression embedding
   * - Support multi-line strings with preserved formatting
   * - Enable complex expression evaluation within strings
   * - Can be used with tagged template literals for custom processing
   * - Form the basis for advanced TypeScript string type manipulation
   *
   * Advanced patterns:
   * - Dynamic query building
   * - Localization and internationalization
   * - Code generation and template processing
   * - HTML/CSS generation with type safety
   * - Configuration file generation
   */
  test_template_literals_and_interpolation(): void {
    // Basic template literal usage
    const user = {
      name: "Alice Johnson",
      age: 28,
      role: "Senior Developer",
      department: "Engineering",
    };

    const greeting = `Hello, ${user.name}! Welcome to the ${user.department} team.`;
    const userInfo = `
      User Profile:
      Name: ${user.name}
      Age: ${user.age}
      Role: ${user.role}
      Department: ${user.department}
    `;

    // Complex expressions in templates
    const isAdult = `Age Status: ${user.age >= 18 ? "Adult" : "Minor"}`;
    const nameLength = `Name has ${user.name.length} characters`;
    const roleUpper = `Role: ${user.role.toUpperCase()}`;

    // Mathematical expressions
    const calculation = `Result: ${
      user.age * 2 + 10
    } years in 10 years if age doubles`;
    const comparison = `${
      user.age > 25 ? "Experienced" : "Early Career"
    } professional`;

    // Function calls within templates
    function formatDate(date: Date): string {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    const today = new Date(2024, 0, 15); // January 15, 2024
    const dateMessage = `Today is ${formatDate(today)}`;

    // Nested template literals
    const complexMessage = `
      ${greeting}
      
      Additional Info:
      ${isAdult}
      ${nameLength}
      ${roleUpper}
    `.trim();

    this.assertEqual(this.___(), greeting.includes("Alice Johnson"));
    this.assertEqual(true, greeting.includes("Engineering"));
    this.assertEqual(this.___(), userInfo.includes("28"));
    this.assertEqual(true, isAdult.includes("Adult"));
    this.assertEqual(this.___(), nameLength.split(" ")[2]); // "Alice Johnson".length
    this.assertEqual("ROLE: SENIOR DEVELOPER", roleUpper);
    this.assertEqual(this.___(), 66); // (28 * 2) + 10
    this.assertEqual(true, comparison.includes("Experienced"));
    this.assertEqual(this.___(), dateMessage.includes("January"));
    this.assertEqual(true, complexMessage.includes("SENIOR DEVELOPER"));
  }

  /**
   * Advanced String Methods and Manipulation
   *
   * JavaScript's string methods provide powerful text processing capabilities.
   * Understanding these methods is essential for data transformation, validation,
   * formatting, and text analysis in real-world applications.
   *
   * Key Concepts:
   * - Immutability: String methods return new strings, don't modify originals
   * - Method chaining enables complex transformations in readable pipelines
   * - Regular expressions integrate with string methods for pattern matching
   * - Unicode support enables internationalization and emoji handling
   * - Performance considerations for large string operations
   *
   * Advanced patterns:
   * - Text normalization and sanitization
   * - Data parsing and extraction
   * - Format conversion and standardization
   * - Search and replace with patterns
   * - String validation and cleaning
   */
  test_advanced_string_methods(): void {
    const rawText = "  Hello, TypeScript World!  ";
    const emailList = "alice@test.com; bob@example.org, charlie@demo.net";
    const csvData = "Name,Age,City\nAlice,28,New York\nBob,32,London";
    const phoneNumber = "+1 (555) 123-4567";
    const htmlContent = "<p>Hello <strong>World</strong>!</p>";

    // Basic string cleaning and formatting
    const cleanText = rawText.trim();
    const upperText = cleanText.toUpperCase();
    const lowerText = cleanText.toLowerCase();
    const titleCase = cleanText
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    this.assertEqual(this.___(), cleanText);
    this.assertEqual("HELLO, TYPESCRIPT WORLD!", upperText);
    this.assertEqual(this.___(), lowerText);
    this.assertEqual(this.___(), titleCase);

    // String searching and position methods
    const searchText =
      "The TypeScript language is a typed superset of JavaScript";
    const firstScript = searchText.indexOf("Script");
    const lastScript = searchText.lastIndexOf("Script");
    const includesTyped = searchText.includes("typed");
    const startsWithThe = searchText.startsWith("The");
    const endsWithScript = searchText.endsWith("Script");

    this.assertEqual(this.__(), firstScript);
    this.assertEqual(48, lastScript); // Position of 'Script' in 'JavaScript'
    this.assertEqual(this.___(), includesTyped);
    this.assertEqual(true, startsWithThe);
    this.assertEqual(this.___(), endsWithScript);

    // String extraction and slicing
    const text = "TypeScript Programming";
    const substring = text.substring(4, 10); // 'Script'
    const slice = text.slice(0, 4); // 'Type'
    const sliceNegative = text.slice(-11); // 'Programming'
    const charAt = text.charAt(4); // 'S'
    const charCodeAt = text.charCodeAt(4); // ASCII code for 'S'

    this.assertEqual(this.___(), substring);
    this.assertEqual("Type", slice);
    this.assertEqual(this.___(), sliceNegative);
    this.assertEqual("S", charAt);
    this.assertEqual(this.__(), charCodeAt); // ASCII code for 'S' is 83

    // String splitting with different patterns
    const emails = emailList.split(/[;,]\s*/);
    const lines = csvData.split("\n");
    const phoneDigits = phoneNumber.replace(/\D/g, ""); // Remove non-digits
    const htmlText = htmlContent.replace(/<[^>]*>/g, ""); // Remove HTML tags

    this.assertEqual(3, emails.length);
    this.assertEqual(this.___(), emails[0]);
    this.assertEqual("charlie@demo.net", emails[2]);
    this.assertEqual(this.___(), lines.length);
    this.assertEqual("15551234567", phoneDigits);
    this.assertEqual(this.___(), htmlText);

    // Advanced string transformations
    const sentence = "the quick brown fox jumps over the lazy dog";
    const words = sentence.split(" ");
    const reversedWords = words.reverse().join(" ");
    const capitalizedWords = sentence.replace(/\b\w/g, (c) => c.toUpperCase());
    const uniqueLetters = [...new Set(sentence.replace(/\s/g, ""))]
      .sort()
      .join("");

    this.assertEqual(9, words.length);
    this.assertEqual(this.___(), reversedWords.startsWith("dog"));
    this.assertEqual(
      "The Quick Brown Fox Jumps Over The Lazy Dog",
      capitalizedWords
    );
    this.assertEqual(this.___(), uniqueLetters.includes("a"));
  }

  /**
   * Regular Expressions and Pattern Matching
   *
   * Regular expressions provide powerful pattern matching and text processing
   * capabilities. They're essential for validation, parsing, and complex string
   * transformations in real-world applications.
   *
   * Key Concepts:
   * - Pattern matching with metacharacters and quantifiers
   * - Capturing groups for data extraction
   * - Flags for global, case-insensitive, and multiline matching
   * - Lookahead and lookbehind assertions for complex patterns
   * - Integration with string methods for search and replace operations
   *
   * Real-world applications:
   * - Email and phone number validation
   * - Data parsing and extraction
   * - Text sanitization and cleaning
   * - URL parsing and validation
   * - Log file analysis and processing
   */
  test_regular_expressions_and_pattern_matching(): void {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern =
      /^\+?1?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
    const urlPattern =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    const hexColorPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    // Email validation
    const validEmail = "user@example.com";
    const invalidEmail = "user@invalid";
    const isValidEmail = emailPattern.test(validEmail);
    const isInvalidEmail = emailPattern.test(invalidEmail);

    this.assertEqual(this.___(), isValidEmail);
    this.assertEqual(false, isInvalidEmail);

    // Phone number extraction with groups
    const phoneText = "Call me at +1 (555) 123-4567 or (555) 987-6543";
    const phoneMatches = phoneText.match(
      /\+?1?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/g
    );
    const firstPhoneMatch = phoneText.match(phonePattern);

    this.assertEqual(2, phoneMatches?.length || 0);
    this.assertEqual(this.___(), firstPhoneMatch?.[1]); // First capture group (area code)
    this.assertEqual("123", firstPhoneMatch?.[2]); // Second capture group
    this.assertEqual(this.___(), firstPhoneMatch?.[3]); // Third capture group

    // URL validation and parsing
    const urls = [
      "https://www.example.com",
      "http://example.com/path?param=value",
      "not-a-url",
      "https://subdomain.example.org/path/to/resource",
    ];

    const validUrls = urls.filter((url) => urlPattern.test(url));
    this.assertEqual(this.___(), validUrls.length);
    this.assertEqual(true, validUrls.includes("https://www.example.com"));

    // Text processing with regex
    const htmlText =
      '<p>Hello <strong>world</strong>! Visit <a href="http://example.com">our site</a>.</p>';
    const textOnly = htmlText.replace(/<[^>]*>/g, "");
    const links = htmlText.match(/href="([^"]*)"/g);

    this.assertEqual(this.___(), textOnly);
    this.assertEqual(1, links?.length || 0);

    // Advanced pattern matching
    const logLine =
      "[2024-01-15 10:30:45] ERROR: Database connection failed (connection_id: 12345)";
    const logPattern =
      /^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (\w+): (.+) \(connection_id: (\d+)\)$/;
    const logMatch = logLine.match(logPattern);

    this.assertEqual(this.___(), logMatch?.[1]); // Date/time
    this.assertEqual("ERROR", logMatch?.[2]); // Log level
    this.assertEqual(this.___(), logMatch?.[3]); // Message
    this.assertEqual("12345", logMatch?.[4]); // Connection ID
  }

  /**
   * String Encoding, Unicode, and Internationalization
   *
   * Modern applications must handle diverse character sets, emojis, and
   * international text. Understanding Unicode, character encoding, and
   * internationalization features is crucial for global applications.
   *
   * Key Concepts:
   * - UTF-16 encoding and surrogate pairs for extended Unicode
   * - Character codes vs code points for proper character handling
   * - Normalization forms for consistent text comparison
   * - Locale-aware string operations and sorting
   * - Emoji and special character handling
   *
   * Real-world applications:
   * - International user input validation
   * - Multi-language text processing
   * - Emoji handling in social applications
   * - Search and sorting in global contexts
   * - Text normalization for database storage
   */
  test_unicode_and_internationalization(): void {
    // Basic Unicode handling
    const emoji = "👋🌍";
    const chinese = "你好世界"; // "Hello World" in Chinese
    const arabic = "مرحبا بالعالم"; // "Hello World" in Arabic
    const japanese = "こんにちは世界"; // "Hello World" in Japanese

    // String length vs visual characters
    const complexEmoji = "👨‍👩‍👧‍👦"; // Family emoji (composite)
    const simpleEmoji = "😀";

    this.assertEqual(this.___(), emoji.length); // UTF-16 code units, not visual chars
    this.assertEqual(2, simpleEmoji.length); // Still 2 due to surrogate pairs
    this.assertEqual(this.___(), complexEmoji.length); // Composite emoji

    // Character code handling
    const charA = "A";
    const charCodeA = charA.charCodeAt(0);
    const codePointA = charA.codePointAt(0);
    const fromCharCode = String.fromCharCode(65);
    const fromCodePoint = String.fromCodePoint(0x1f44d); // 👍

    this.assertEqual(this.__(), charCodeA);
    this.assertEqual(65, codePointA || 0);
    this.assertEqual(this.___(), fromCharCode);
    this.assertEqual("👍", fromCodePoint);

    // Text normalization
    const accented1 = "café"; // Single character é
    const accented2 = "cafe\u0301"; // e + combining acute accent
    const normalized1 = accented1.normalize("NFC");
    const normalized2 = accented2.normalize("NFC");

    this.assertEqual(this.___(), accented1.length === accented2.length); // Different representations
    this.assertEqual(true, normalized1 === normalized2); // Same after normalization
    this.assertEqual(4, normalized1.length);

    // Locale-aware operations
    const names = ["Åse", "Zebra", "Älice", "Bob"];
    const sortedEnglish = [...names].sort();
    const sortedSwedish = [...names].sort((a, b) => a.localeCompare(b, "sv"));

    // Case conversion with locale
    const turkish = "İstanbul";
    const turkishLower = turkish.toLowerCase();
    const turkishLowerLocale = turkish.toLocaleLowerCase("tr-TR");

    this.assertEqual(this.___(), sortedEnglish[0]); // English sort order
    this.assertEqual("Älice", sortedSwedish[0]); // Swedish sort order
    this.assertEqual(this.___(), turkishLower !== turkishLowerLocale); // Different results

    // Working with surrogate pairs
    const mathSymbol = "𝕿𝖞𝖕𝖊𝖘𝖈𝖗𝖎𝖕𝖙"; // Mathematical script TypeScript
    const symbolArray = [...mathSymbol]; // Proper character iteration
    const properLength = symbolArray.length;

    this.assertEqual(this.___(), mathSymbol.length > properLength); // More code units than chars
    this.assertEqual(10, properLength); // Actual character count
  }

  /**
   * Advanced String Processing Patterns
   *
   * Real-world applications require sophisticated string processing techniques
   * for data transformation, parsing, and analysis. These patterns demonstrate
   * professional-grade text handling and processing capabilities.
   *
   * Key Concepts:
   * - Parser implementation for structured data
   * - String interpolation and template processing
   * - Text analysis and metrics calculation
   * - Performance optimization for large text operations
   * - Error handling in string processing pipelines
   *
   * Advanced patterns:
   * - CSV/TSV parsing with edge case handling
   * - Template engine implementation
   * - Text similarity and diff algorithms
   * - Stream processing for large texts
   * - Fuzzy matching and search algorithms
   */
  test_advanced_string_processing(): void {
    // CSV parsing with edge cases
    const csvData = `name,age,city,notes
    "Smith, John",30,"New York","Likes ""coding"""
    Jane Doe,25,London,"Has
    multiline notes"
    "Bob",35,"San Francisco",Regular notes`;

    function parseCSV(csv: string): Array<Record<string, string>> {
      const lines = csv.trim().split("\n");
      const headers = lines[0].split(",").map((h) => h.trim());
      const rows: Array<Record<string, string>> = [];

      for (let i = 1; i < lines.length; i++) {
        const row: Record<string, string> = {};
        const values = parseCSVLine(lines[i]);

        for (let j = 0; j < headers.length && j < values.length; j++) {
          row[headers[j]] = values[j];
        }
        rows.push(row);
      }

      return rows;
    }

    function parseCSVLine(line: string): string[] {
      const values: string[] = [];
      let current = "";
      let inQuotes = false;
      let i = 0;

      while (i < line.length) {
        const char = line[i];

        if (char === '"' && (i === 0 || line[i - 1] === ",")) {
          inQuotes = true;
        } else if (char === '"' && inQuotes && line[i + 1] === '"') {
          current += '"';
          i++; // Skip next quote
        } else if (char === '"' && inQuotes) {
          inQuotes = false;
        } else if (char === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += char;
        }
        i++;
      }

      values.push(current.trim());
      return values;
    }

    const parsed = parseCSV(csvData);
    this.assertEqual(3, parsed.length);
    this.assertEqual(this.___(), parsed[0].name);
    this.assertEqual("30", parsed[0].age);
    this.assertEqual(this.___(), parsed[1].notes.includes("multiline"));

    // Template processing engine
    const template =
      'Hello {{name}}, you have {{count}} {{item}}{{count !== 1 ? "s" : ""}}!';

    function processTemplate(
      template: string,
      data: Record<string, any>
    ): string {
      return template.replace(/\{\{([^}]+)\}\}/g, (match, expression) => {
        const trimmed = expression.trim();

        // Simple variable substitution
        if (data.hasOwnProperty(trimmed)) {
          return String(data[trimmed]);
        }

        // Basic conditional expression (simplified)
        if (trimmed.includes("?")) {
          const [condition, outcomes] = trimmed
            .split("?")
            .map((s: string) => s.trim());
          const [truthy, falsy] = outcomes
            .split(":")
            .map((s: string) => s.trim().replace(/"/g, ""));

          // Very basic condition evaluation
          if (condition.includes("!==")) {
            const [variable, value] = condition
              .split("!==")
              .map((s: string) => s.trim());
            return data[variable] !== parseInt(value) ? truthy : falsy;
          }
        }

        return match;
      });
    }

    const processed1 = processTemplate(template, {
      name: "Alice",
      count: 1,
      item: "message",
    });
    const processed2 = processTemplate(template, {
      name: "Bob",
      count: 3,
      item: "notification",
    });

    this.assertEqual(this.___(), processed1);
    this.assertEqual("Hello Bob, you have 3 notifications!", processed2);

    // Text analysis and metrics
    const article = `
      TypeScript is a programming language developed by Microsoft.
      It is a strict syntactical superset of JavaScript and adds
      optional static type checking to the language. TypeScript
      is designed for the development of large applications.
    `;

    function analyzeText(text: string) {
      const cleaned = text.replace(/\s+/g, " ").trim();
      const words = cleaned.split(" ");
      const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

      const wordFrequency = new Map<string, number>();
      words.forEach((word) => {
        const lower = word.toLowerCase().replace(/[^\w]/g, "");
        if (lower) {
          wordFrequency.set(lower, (wordFrequency.get(lower) || 0) + 1);
        }
      });

      return {
        wordCount: words.length,
        sentenceCount: sentences.length,
        averageWordsPerSentence: Math.round(words.length / sentences.length),
        mostFrequentWord: [...wordFrequency.entries()].sort(
          (a, b) => b[1] - a[1]
        )[0],
        uniqueWords: wordFrequency.size,
      };
    }

    const analysis = analyzeText(article);

    this.assertEqual(this.___(), analysis.wordCount > 30);
    this.assertEqual(4, analysis.sentenceCount);
    this.assertEqual(this.___(), analysis.averageWordsPerSentence);
    this.assertEqual("typescript", analysis.mostFrequentWord[0]);
    this.assertEqual(2, analysis.mostFrequentWord[1]); // Appears twice
  }
}
