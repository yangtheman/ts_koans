import * as fs from "fs";
import * as path from "path";

interface KoanFile {
  name: string;
  sourcePath: string;
  destPath: string;
}

export class KoanGenerator {
  private srcDir = "src";
  private koansDir = "koans";

  private koanFiles: KoanFile[] = [
    { name: "koan.ts", sourcePath: "src/koan.ts", destPath: "koans/koan.ts" },
    {
      name: "about-asserts.ts",
      sourcePath: "src/about-asserts.ts",
      destPath: "koans/about-asserts.ts",
    },
    {
      name: "about-types.ts",
      sourcePath: "src/about-types.ts",
      destPath: "koans/about-types.ts",
    },
    {
      name: "about-strings.ts",
      sourcePath: "src/about-strings.ts",
      destPath: "koans/about-strings.ts",
    },
    {
      name: "about-arrays.ts",
      sourcePath: "src/about-arrays.ts",
      destPath: "koans/about-arrays.ts",
    },
    {
      name: "about-functions.ts",
      sourcePath: "src/about-functions.ts",
      destPath: "koans/about-functions.ts",
    },
    {
      name: "about-objects.ts",
      sourcePath: "src/about-objects.ts",
      destPath: "koans/about-objects.ts",
    },
    {
      name: "about-classes.ts",
      sourcePath: "src/about-classes.ts",
      destPath: "koans/about-classes.ts",
    },
    {
      name: "about-interfaces.ts",
      sourcePath: "src/about-interfaces.ts",
      destPath: "koans/about-interfaces.ts",
    },
    {
      name: "about-enums-unions.ts",
      sourcePath: "src/about-enums-unions.ts",
      destPath: "koans/about-enums-unions.ts",
    },
    {
      name: "about-generics.ts",
      sourcePath: "src/about-generics.ts",
      destPath: "koans/about-generics.ts",
    },
    {
      name: "about-async-await.ts",
      sourcePath: "src/about-async-await.ts",
      destPath: "koans/about-async-await.ts",
    },
    {
      name: "about-advanced-types.ts",
      sourcePath: "src/about-advanced-types.ts",
      destPath: "koans/about-advanced-types.ts",
    },
    {
      name: "path-to-enlightenment.ts",
      sourcePath: "src/path-to-enlightenment.ts",
      destPath: "koans/path-to-enlightenment.ts",
    },
  ];

  generate(): void {
    console.log("🔄 Generating TypeScript koans...");

    // Create koans directory if it doesn't exist
    if (!fs.existsSync(this.koansDir)) {
      fs.mkdirSync(this.koansDir, { recursive: true });
    }

    // Generate each koan file
    for (const koanFile of this.koanFiles) {
      this.generateKoanFile(koanFile);
    }

    // Create a simple tsconfig for the koans directory
    this.createKoansConfig();

    console.log("✅ Koans generated successfully!");
    console.log(
      '📖 Run "cd koans && npm run test" to start your journey to enlightenment!'
    );
  }

  private generateKoanFile(koanFile: KoanFile): void {
    if (!fs.existsSync(koanFile.sourcePath)) {
      console.warn(`⚠️  Source file not found: ${koanFile.sourcePath}`);
      return;
    }

    const content = fs.readFileSync(koanFile.sourcePath, "utf8");

    // Special handling for koan.ts - copy as-is (it's the framework)
    if (koanFile.name === "koan.ts") {
      fs.writeFileSync(koanFile.destPath, content);
      console.log(`📝 Copied framework: ${koanFile.name}`);
      return;
    }

    const processedContent = this.removeSolutions(content);
    fs.writeFileSync(koanFile.destPath, processedContent);
    console.log(`🎯 Generated koan: ${koanFile.name}`);
  }

  private removeSolutions(content: string): string {
    let processed = content;

    // Remove solution comments that show the answers
    processed = processed.replace(
      /\/\/ What is .+\?$/gm,
      "// Fill in the blank"
    );
    processed = processed.replace(
      /\/\/ What does .+\?$/gm,
      "// Fill in the blank"
    );
    processed = processed.replace(
      /\/\/ How many .+\?$/gm,
      "// Fill in the blank"
    );
    processed = processed.replace(/\/\/ Which .+\?$/gm, "// Fill in the blank");
    processed = processed.replace(/\/\/ Does .+\?$/gm, "// Fill in the blank");
    processed = processed.replace(/\/\/ Where .+\?$/gm, "// Fill in the blank");
    processed = processed.replace(
      /\/\/ Contains .+\?$/gm,
      "// Fill in the blank"
    );
    processed = processed.replace(/\/\/ Is .+\?$/gm, "// Fill in the blank");

    // Keep the placeholder methods intact
    // this.__() and this.___() should remain as-is for students to replace

    return processed;
  }

  private createKoansConfig(): void {
    const koansConfig = {
      compilerOptions: {
        target: "ES2020",
        module: "CommonJS",
        outDir: "./lib",
        rootDir: ".",
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        removeComments: false,
      },
      include: ["**/*.ts"],
      exclude: ["lib"],
    };

    fs.writeFileSync(
      path.join(this.koansDir, "tsconfig.json"),
      JSON.stringify(koansConfig, null, 2)
    );

    const packageJson = {
      name: "typescript-koans-student",
      version: "1.0.0",
      description: "Learn TypeScript by fixing failing tests",
      scripts: {
        build: "tsc",
        test: "npm run build && node lib/path-to-enlightenment.js",
        clean: "rm -rf lib",
      },
      devDependencies: {
        typescript: "^5.3.0",
        "@types/node": "^20.0.0",
      },
    };

    fs.writeFileSync(
      path.join(this.koansDir, "package.json"),
      JSON.stringify(packageJson, null, 2)
    );

    console.log("📦 Created configuration files for koans directory");
  }

  clean(): void {
    if (fs.existsSync(this.koansDir)) {
      fs.rmSync(this.koansDir, { recursive: true, force: true });
      console.log("🧹 Cleaned koans directory");
    }
  }
}

// Run generator if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  const generator = new KoanGenerator();

  const command = process.argv[2];

  if (command === "clean") {
    generator.clean();
  } else {
    generator.generate();
  }
}
