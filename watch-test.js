#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class TestWatcher {
  constructor(directory = './koans') {
    this.directory = directory;
    this.isRunning = false;
    this.lastRun = 0;
    this.debounceDelay = 500; // ms
  }

  runTests() {
    if (this.isRunning) return;
    
    const now = Date.now();
    if (now - this.lastRun < this.debounceDelay) return;
    
    this.isRunning = true;
    this.lastRun = now;
    
    console.clear();
    console.log('🧘 Running TypeScript Koans...\n');
    
    const testProcess = spawn('yarn', ['test'], {
      cwd: this.directory,
      stdio: 'inherit'
    });
    
    testProcess.on('close', (code) => {
      this.isRunning = false;
      console.log(`\n👁️  Watching for changes... (Press Ctrl+C to exit)`);
    });
  }

  watchFiles() {
    const watchExtensions = ['.ts'];
    
    const watchRecursive = (dir) => {
      try {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory() && item !== 'node_modules' && item !== 'lib') {
            watchRecursive(fullPath);
          } else if (stat.isFile() && watchExtensions.some(ext => item.endsWith(ext))) {
            fs.watchFile(fullPath, { interval: 100 }, () => {
              console.log(`📝 Changed: ${path.relative(process.cwd(), fullPath)}`);
              setTimeout(() => this.runTests(), 100);
            });
          }
        });
      } catch (err) {
        console.error(`Error watching ${dir}:`, err.message);
      }
    };
    
    watchRecursive(this.directory);
  }

  start() {
    console.log(`🚀 Starting TypeScript Koans watcher...`);
    console.log(`📁 Watching directory: ${this.directory}`);
    
    // Initial test run
    this.runTests();
    
    // Watch for file changes
    this.watchFiles();
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n\n👋 Thanks for practicing TypeScript Koans!');
      process.exit(0);
    });
  }
}

// Start the watcher
const watcher = new TestWatcher();
watcher.start();
