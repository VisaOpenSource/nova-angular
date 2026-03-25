#!/usr/bin/env node
/**
 *              © 2026 Visa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * Recursively checks that all workshop files follow the .docs naming convention
 * (.docs.ts or .docs.html)
 *
 * When run as a pre-commit hook, it only checks staged files.
 * Otherwise, it checks all files in the workshop directory.
 */

const WORKSHOP_DIR = path.resolve(__dirname, "../../projects/workshop/src/app");

// Files that are allowed to not have .docs extension
const ALLOWED_EXCEPTIONS = [
  "app.component.ts",
  "app.component.html",
  ".DS_Store",
  "index.ts", // Barrel exports
  "models.ts", // Type definitions
];

// Directories to skip entirely
const SKIP_DIRS = ["node_modules", ".git", "dist", "coverage"];

const filesWithoutDocs = [];
const scannedFiles = [];

/**
 * Check if a filename should have .docs extension
 */
function shouldHaveDocsExtension(filename, relativePath) {
  // Skip the entire shared folder
  if (relativePath.startsWith("shared/") || relativePath.includes("/shared/")) {
    return false;
  }

  // Skip if it's in the allowed list
  if (ALLOWED_EXCEPTIONS.includes(filename)) {
    return false;
  }

  // Skip spec files
  if (filename.includes(".spec.")) {
    return false;
  }

  // Skip if already has .docs or .doc
  if (filename.includes(".docs.") || filename.includes(".doc.")) {
    return false;
  }

  // Only check .ts and .html files
  if (!filename.endsWith(".ts") && !filename.endsWith(".html")) {
    return false;
  }

  // Skip infrastructure files (routes, services, utilities, etc.)
  const INFRASTRUCTURE_SUFFIXES = [
    "routes.ts",
    "service.ts",
    "pipe.ts",
    "providers.ts",
    "module.ts",
    "config.ts",
    "constants.ts",
    "util.ts",
    "utils.ts",
  ];

  if (INFRASTRUCTURE_SUFFIXES.some((suffix) => filename.endsWith(suffix))) {
    return false;
  }

  // If it passed all exclusions, it's an example/demo file that should have .docs
  return true;
}

/**
 * Recursively scan directory for files
 */
function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip certain directories
      if (SKIP_DIRS.includes(entry.name)) {
        continue;
      }
      scanDirectory(fullPath);
    } else if (entry.isFile()) {
      const relativePath = path.relative(WORKSHOP_DIR, fullPath);
      scannedFiles.push(relativePath);

      if (shouldHaveDocsExtension(entry.name, relativePath)) {
        filesWithoutDocs.push({
          path: relativePath,
          fullPath: fullPath,
          name: entry.name,
        });
      }
    }
  }
}

/**
 * Get staged files from git
 */
function getStagedFiles() {
  try {
    const output = execSync(
      "git diff --cached --name-only --diff-filter=ACMR",
      {
        encoding: "utf8",
        cwd: path.resolve(__dirname, "../.."),
      },
    );
    return output
      .split("\n")
      .filter(Boolean)
      .filter((file) => file.startsWith("projects/workshop/src/app/"))
      .map((file) => path.resolve(__dirname, "../..", file));
  } catch (error) {
    // Not in a git repo or no staged files
    return null;
  }
}

/**
 * Check specific files
 */
function checkFiles(files) {
  for (const fullPath of files) {
    if (!fs.existsSync(fullPath)) continue;

    const relativePath = path.relative(WORKSHOP_DIR, fullPath);
    const filename = path.basename(fullPath);

    scannedFiles.push(relativePath);

    if (shouldHaveDocsExtension(filename, relativePath)) {
      filesWithoutDocs.push({
        path: relativePath,
        fullPath: fullPath,
        name: filename,
      });
    }
  }
}

/**
 * Main execution
 */
function main() {
  console.log("🔍 Scanning workshop files for .docs naming convention...\n");

  const stagedFiles = getStagedFiles();

  if (stagedFiles && stagedFiles.length > 0) {
    console.log(`📝 Checking ${stagedFiles.length} staged file(s)...\n`);
    checkFiles(stagedFiles);
  } else {
    console.log(`📁 Checking all files in: ${WORKSHOP_DIR}\n`);
    scanDirectory(WORKSHOP_DIR);
  }

  console.log(`✅ Scanned ${scannedFiles.length} files\n`);

  if (filesWithoutDocs.length === 0) {
    console.log("✨ All files follow the .docs naming convention!\n");
    process.exit(0);
  }

  console.log(
    `⚠️  Found ${filesWithoutDocs.length} file(s) without .docs extension:\n`,
  );

  filesWithoutDocs.forEach((file) => {
    console.log(`  - ${file.path}`);
  });

  console.log(
    "\n💡 These files should be renamed to include .docs before the extension",
  );
  console.log("   Example: component.ts → component.docs.ts\n");

  process.exit(1);
}

main();
