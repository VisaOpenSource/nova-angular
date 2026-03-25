#!/usr/bin/env node
/**
 *              © 2025-2026 Visa
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

/**
 * Script to tag pattern components with #patterns and #isShared tags
 *
 * This script:
 * - Finds all .ts files in projects/workshop/src/app/patterns/
 * - Adds /** #patterns **\/ comment if the file is in a patterns folder
 * - Adds #isShared if the file is in a shared subfolder
 * - Skips files that already have the tags
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { resolve } from 'path';

const PATTERNS_PATH = 'projects/workshop/src/app/patterns';
const TAG_PATTERN = /\/\*\*\s*#patterns(?:\s+#isShared)?(?:\s+#isSubComponent)?\s*\*\*\//;

/**
 * Check if file path is in a shared folder
 */
function isInSharedFolder(filePath) {
  return filePath.includes('/shared/');
}

/**
 * Check if file already has pattern tags
 */
function hasPatternTags(content) {
  return TAG_PATTERN.test(content);
}

/**
 * Generate the appropriate tag comment
 */
function generateTagComment(isShared = false, isSubComponent = false) {
  if (isShared) {
    return '/** #patterns #isShared **/';
  } else if (isSubComponent) {
    return '/** #patterns #isSubComponent **/';
  }
  return '/** #patterns **/';
}

/**
 * Add tags to a TypeScript file
 */
function addTagsToFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');

    // Skip if already has tags
    if (hasPatternTags(content)) {
      console.log(`⏭️  Skipping (already tagged): ${filePath}`);
      return false;
    }

    // Skip if no @Component decorator found
    if (!content.includes('@Component')) {
      console.log(`⏭️  Skipping (no @Component): ${filePath}`);
      return false;
    }

    const isShared = isInSharedFolder(filePath);
    const isSubComponent = filePath.split('/patterns/')[1]?.split('/').length > 3;
    const tagComment = generateTagComment(isShared, isSubComponent);

    // Find the line before @Component decorator
    const lines = content.split('\n');
    let componentLineIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('@Component')) {
        componentLineIndex = i;
        break;
      }
    }

    if (componentLineIndex === -1) {
      console.log(`⚠️  Warning: @Component not found in ${filePath}`);
      return false;
    }

    // Insert the tag comment right before @Component
    lines.splice(componentLineIndex, 0, tagComment);

    const newContent = lines.join('\n');
    writeFileSync(filePath, newContent, 'utf-8');

    console.log(`✅ Tagged ${isShared ? '(shared)' : isSubComponent ? '(subcomponent)' : '(pattern)'}: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🏷️  Starting pattern tagging script...\n');

  // Find all TypeScript component files in patterns directory
  const pattern = resolve(PATTERNS_PATH, '**/*.docs.ts');
  const files = await glob(pattern, {
    ignore: ['**/node_modules/**', '**/*.spec.ts'],
    absolute: true
  });

  console.log(`Found ${files.length} component files in patterns directory\n`);

  let taggedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const wasTagged = addTagsToFile(file);
    if (wasTagged) {
      taggedCount++;
    } else {
      skippedCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Tagged: ${taggedCount}`);
  console.log(`   ⏭️  Skipped: ${skippedCount}`);
  console.log(`   📁 Total: ${files.length}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
