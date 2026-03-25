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
 * This script automatically maintains documentation by marking unused component examples with an '@ignore' JSDoc tag.
 */
const fs = require('fs');
const path = require('path');

function updateDocs() {
  const componentsDir = path.resolve('projects/workshop/src/app/components');

  // Check if the components directory exists
  fs.readdir(componentsDir, (err, components) => {
    if (err) {
      console.error('Error reading components directory:', err);
      return;
    }

    // Process each component directory
    components.forEach((component) => {
      const componentDir = path.join(componentsDir, component);
      const docsHtmlPath = path.join(componentDir, `${component}.docs.html`);

      // Check if the docs.html file exists for the component
      if (!fs.existsSync(docsHtmlPath)) {
        if (component !== 'components.routes.ts') {
          console.warn(`docs.html not found for component: ${component}`);
        }
        return;
      }

      const docsHtmlContent = fs.readFileSync(docsHtmlPath, 'utf-8');

      // Read the examples directory for the component
      fs.readdir(componentDir, (err, examples) => {
        if (err) {
          console.error(`Error reading examples directory for component ${component}:`, err);
          return;
        }

        // Process each example directory
        examples.forEach((example) => {
          const exampleDir = path.join(componentDir, example);
          const docsTsPath = path.join(exampleDir, `${example}.docs.ts`);

          // Check if the docs.ts file exists for the example
          if (!fs.existsSync(docsTsPath)) {
            return;
          }

          // Extract the selector from the docs.ts file
          const docsTsContent = fs.readFileSync(docsTsPath, 'utf-8');
          const selectorMatch = docsTsContent.match(/selector:\s*'([^']+)'/);
          const exampleSelector = selectorMatch ? selectorMatch[1] : `nova-workshop-${example}`;

          // If the example selector is not found in the docs.html content and the example is not in a reusable directory...
          if (!docsHtmlContent.includes(exampleSelector) && !docsTsPath.includes('reusable')) {
            const docsTsContent = fs.readFileSync(docsTsPath, 'utf-8');
            // add the @ignore tag to the docs.ts file if it doesn't already exist
            if (!docsTsContent.includes('/** @ignore */')) {
              const componentIndex = docsTsContent.indexOf('@Component');
              const importEndIndex =
                docsTsContent.lastIndexOf('import', componentIndex) +
                docsTsContent.substring(docsTsContent.lastIndexOf('import', componentIndex)).indexOf(';') +
                1;
              const insertIndex = componentIndex !== -1 ? componentIndex : importEndIndex;
              const updatedDocsTsContent = `${docsTsContent.slice(0, insertIndex)}/** @ignore */\n${docsTsContent.slice(insertIndex)}`;
              fs.writeFileSync(docsTsPath, updatedDocsTsContent, 'utf-8');
              console.log(`Added /** @ignore */ to ${docsTsPath}`);
            }
          }
        });
      });
    });
  });
}

module.exports = updateDocs;
