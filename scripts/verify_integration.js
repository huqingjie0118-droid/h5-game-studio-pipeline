#!/usr/bin/env node
/**
 * scripts/verify_integration.js
 * Automated integration checker for H5 Canvas 2D game asset mappings & UI registry.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = process.cwd();

console.log('🚀 Running H5 Game Studio Asset & Registry Integration Checker...');

let warnings = 0;
let errors = 0;

function checkFileExists(relPath, required = false) {
  const fullPath = path.join(PROJECT_ROOT, relPath);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✓ Found asset: ${relPath}`);
    return true;
  } else {
    if (required) {
      console.error(`  ❌ MISSING REQUIRED ASSET: ${relPath}`);
      errors++;
    } else {
      console.warn(`  ⚠️ Missing optional asset (fallback active): ${relPath}`);
      warnings++;
    }
    return false;
  }
}

// 1. Check core game files
console.log('\n▶ 1. Core Framework Files Check');
checkFileExists('index.html', true);
checkFileExists('js/config.js', true);
checkFileExists('css/style.css', true);

// 2. Check asset folders
console.log('\n▶ 2. Asset Directory Check');
checkFileExists('art-app/assets', false);
checkFileExists('assets/weapons', false);

// 3. Check config.js syntax
console.log('\n▶ 3. Engine Configuration Syntax Check');
try {
  const configPath = path.join(PROJECT_ROOT, 'js/config.js');
  if (fs.existsSync(configPath)) {
    const code = fs.readFileSync(configPath, 'utf8');
    new Function(code);
    console.log('  ✓ js/config.js syntax valid');
  }
} catch (e) {
  console.error(`  ❌ js/config.js syntax error: ${e.message}`);
  errors++;
}

console.log('\n================ Check Summary ================');
console.log(`Errors: ${errors}, Warnings: ${warnings}`);

if (errors > 0) {
  console.error('❌ INTEGRATION CHECK FAILED');
  process.exit(1);
} else {
  console.log('✅ INTEGRATION CHECK PASS');
  process.exit(0);
}
