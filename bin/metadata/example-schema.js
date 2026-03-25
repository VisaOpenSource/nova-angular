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
 * EXAMPLE SCHEMA
 *
 * | property     | description                                                | required | type      |
 * |--------------|----------------------------------------------------------- |----------|-----------|
 * | componentId  | Null                                                       | true     | Null      |
 * | description  | Example description, if available.                         | true     | String    |
 * | libraryId    | Null                                                       | true     | Null      |
 * | name         | Example name                                               | true     | String    |
 * | order        | Order specified from content design review                 | false    | Number    |
 * | section      | Parent section to which this example corresponds           | false    | String    |
 * | snippets     | Code snippets. Object with keys as language or extension,  | true     | Object    |
 * | ...          | value as the actual code snippet.                          |          |           |
 * | ...          | Note multiple code snippets per example possible.          |          |           |
 * | tags         | Array of strings. IE/ docs, custom, alternate, etc         | false    | [String]  |
 * | url          | URL path. Assumes domain name and any versioned directory. | false    | String    |
 */

const fs = require('fs');
const path = require('path');
const { removeHTMLCode } = require('./property-schema');

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Returns null for component ID (placeholder for future implementation).
 * @returns {null}
 */
const componentID = () => {
  return null;
};

/**
 * Returns null for library ID (placeholder for future implementation).
 * @returns {null}
 */
const libraryID = () => {
  return null;
};

// ============================================================================
// SNIPPET AND METADATA EXTRACTORS
// ============================================================================

/**
 * Extracts code snippets (HTML, TypeScript, CSS) from an example.
 * For pattern examples and reusable component examples, includes full file paths.
 * For regular examples, returns simple html/ts object.
 *
 * @param {Object} example - The example object from documentation JSON
 * @returns {Object} Object with code snippets keyed by filename or type
 */
const exampleSnippets = (example) => {
  const html = example.templateData;
  const ts = example.sourceCode;
  const styles = example.styleUrlsData;
  const isPattern = example.file.includes('/patterns/');
  const isReusable = example.file.includes('/reusable/');

  // Handle pattern examples and reusable examples (need full file paths)
  if (isPattern || isReusable) {
    const pathParts = example.file.split('/');
    const startIndex = isPattern
      ? pathParts.findIndex((part) => part === 'patterns')
      : pathParts.findIndex((part) => part === 'components');
    const basePath = pathParts.slice(startIndex, -1).join('/');
    const filename = pathParts[pathParts.length - 1];

    // Build CSS object from style URLs (array format)
    let css = Object.fromEntries(
      (Array.isArray(styles) ? styles : []).map((style) => [
        `${basePath}/${style.styleUrl.replace('./', '')}`,
        style.data
      ])
    );

    // If no styles from array, try single styleUrl string
    // @TODO: remove this when compodocs support single string `styleUrl` in addition to array `styleUrls`
    if (Object.keys(css).length === 0 && example.styleUrl) {
      const folderPath = pathParts.slice(startIndex, -2).join('/');
      const relativeStylePath = folderPath + example.styleUrl.replace('../', '/');
      const fullStylePath = path.join(process.cwd(), 'projects/workshop/src/app/', relativeStylePath);

      // Store the data if the file exists
      if (fs.existsSync(fullStylePath)) {
        const styleData = fs.readFileSync(fullStylePath, 'utf-8');
        css = { [relativeStylePath]: styleData };
      } else {
        console.warn(`Style file not found: ${fullStylePath}`);
      }
    }

    return {
      [`${basePath}/${filename}`]: ts,
      [`${basePath}/${filename.replace('.ts', '.html')}`]: html,
      ...css
    };
  }

  // Handle regular component examples (simple structure)
  return {
    html,
    ts
  };
};

/**
 * Extracts tags from example description by parsing hashtags.
 * Tags in descriptions use format: #tagname (e.g., #custom, #alternate)
 * Defaults to ['docs'] if no tags found.
 *
 * @param {Object} example - The example object from documentation JSON
 * @returns {Array<string>} Array of tag strings without the # prefix
 */
const exampleTags = (example) => {
  let tags = [];

  if (example.description) {
    // Match hashtags like #custom, #alternate, #a11y, etc.
    const match = example.description?.match(/#[a-zA-Z|\-]*/g);
    if (match) {
      tags = match.map((tag) => tag.replace('#', ''));
    }
  }

  // Default to 'docs' tag if no tags found
  if (tags.length === 0) tags = ['docs'];

  return tags;
};

/**
 * Constructs URL path for an example from its file path.
 * Takes the last 4 path segments (excluding filename) and fixes 'surfaces' -> 'surface'.
 *
 * @param {Object} example - The example object from documentation JSON
 * @returns {string} URL path for the example (e.g., 'components/button/basic')
 */
const exampleUrl = (example) => {
  // Extract relevant path segments (4 levels up from filename)
  let link = example.file.split('/').slice(-4, -1).join('/');

  // Fix plural 'surfaces' to singular 'surface' in URL
  link = link.replace('surfaces/', 'surface/');

  return link;
};

// ============================================================================
// EXAMPLE OBJECT BUILDERS
// ============================================================================

/**
 * Creates a complete example object from content and documentation data.
 * Combines metadata from api-content with code snippets from documentation JSON.
 * Filters out GlobalBannerComponent (returns undefined for it).
 *
 * @param {Object} contentExample - Example metadata from api-content (name, order, description, selector)
 * @param {string} sectionName - The section name this example belongs to
 * @param {Object} docsJsonExample - Example data from documentation JSON (code, templates, styles)
 * @param {Array} docsData - Documentation data array to find sub-component and shared examples
 * @param {string} patternName - The pattern name for finding shared components (optional)
 * @returns {Object|undefined} Complete example object or undefined if filtered out
 */
const createExampleObject = (contentExample, sectionName, docsJsonExample, docsData, patternName) => {
  // Filter out GlobalBannerComponent
  if (docsJsonExample.name === 'GlobalBannerComponent') return;

  // Get base snippets from the main example
  const baseSnippets = exampleSnippets(docsJsonExample);

  // Get additional snippets from sub-components (if any)
  const subComponentSnippets = docsData ? getSubComponentSnippets(docsJsonExample, docsData) : {};

  // Get snippets from shared components (if pattern and only those actually used)
  const sharedSnippets =
    docsData && patternName ? getSharedComponentSnippets(docsJsonExample, patternName, docsData) : {};

  // Merge all snippets together
  const allSnippets = {
    ...baseSnippets,
    ...subComponentSnippets,
    ...sharedSnippets
  };

  return {
    componentId: componentID(),
    description: removeHTMLCode(docsJsonExample.description || ''),
    libraryId: libraryID(),
    name: contentExample.name,
    order: contentExample.order,
    section: sectionName,
    snippets: allSnippets,
    tags: exampleTags(docsJsonExample),
    url: {
      iframe: exampleUrl(docsJsonExample),
      github: `projects/workshop/src/app/` + exampleUrl(docsJsonExample)
    }
  };
};

/**
 * Extracts code snippets with file paths to avoid key conflicts.
 * Used for sub-components in both patterns and regular components.
 *
 * @param {Object} example - The example object from documentation JSON
 * @returns {Object} Object with code snippets keyed by file path
 */
const exampleSnippetsWithPaths = (example) => {
  const html = example.templateData;
  const ts = example.sourceCode;
  const styles = example.styleUrlsData;

  // Determine the base path (patterns/ or components/)
  const pathParts = example.file.split('/');
  const appIndex = pathParts.findIndex((part) => part === 'app');
  const relativePath = pathParts.slice(appIndex + 1, -1).join('/');
  const filename = pathParts[pathParts.length - 1];

  // Build CSS object from style URLs (array format)
  let css = Object.fromEntries(
    (Array.isArray(styles) ? styles : []).map((style) => [
      `${relativePath}/${style.styleUrl.replace('./', '')}`,
      style.data
    ])
  );

  // If no styles from array, try single styleUrl string
  if (Object.keys(css).length === 0 && example.styleUrl) {
    const folderPath = pathParts.slice(appIndex + 1, -2).join('/');
    const relativeStylePath = folderPath + example.styleUrl.replace('../', '/');
    const fullStylePath = path.join(process.cwd(), 'projects/workshop/src/app/', relativeStylePath);

    if (fs.existsSync(fullStylePath)) {
      const styleData = fs.readFileSync(fullStylePath, 'utf-8');
      css = { [relativeStylePath]: styleData };
    }
  }

  return {
    [`${relativePath}/${filename}`]: ts,
    [`${relativePath}/${filename.replace('.ts', '.html')}`]: html,
    ...css
  };
};

/**
 * Retrieves snippets from sub-components specific to an example.
 * Sub-components are located in subdirectories under the example's directory,
 * excluding the 'shared' directory which is handled separately.
 * Works for both patterns and regular component examples.
 *
 * @param {Object} docsJsonExample - The main example object from documentation JSON
 * @param {Array} docsData - Documentation data array to find sub-component examples
 * @returns {Object} Object with additional code snippets from sub-components
 */
const getSubComponentSnippets = (docsJsonExample, docsData) => {
  const snippets = {};

  // Extract the directory path from the file path
  const filePath = docsJsonExample.file;
  const pathParts = filePath.split('/');
  const dirPath = pathParts.slice(0, -1).join('/');

  // Convert to absolute path
  const absoluteDirPath = path.join(process.cwd(), dirPath);

  // Return empty object if directory doesn't exist
  if (!fs.existsSync(absoluteDirPath)) return snippets;

  // Get all subdirectories, excluding 'shared'
  const subDirs = fs
    .readdirSync(absoluteDirPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name !== 'shared')
    .map((dirent) => dirent.name);

  // For each subdirectory, find its component in docsData and extract snippets
  subDirs.forEach((dir) => {
    const subComponentExample = docsData.find((example) => example.file.includes(`${dirPath}/${dir}/`));

    if (subComponentExample) {
      // Extract snippets with file paths to avoid key conflicts
      const subSnippets = exampleSnippetsWithPaths(subComponentExample);
      Object.assign(snippets, subSnippets);
    }
  });

  return snippets;
};

/**
 * Retrieves snippets from shared components used by a specific example.
 * Shared components are located in the pattern's 'shared' subdirectory.
 * Only includes shared components that are actually referenced in the example.
 * Recursively includes shared components used by other shared components.
 *
 * @param {Object} docsJsonExample - The main example object from documentation JSON
 * @param {string} patternName - The name of the pattern (e.g., 'application-layouts')
 * @param {Array} docsData - Documentation data array to find shared component examples
 * @returns {Object} Object with code snippets from used shared components
 */
const getSharedComponentSnippets = (docsJsonExample, patternName, docsData) => {
  const snippets = {};
  const sharedPath = path.join(process.cwd(), 'projects/workshop/src/app/patterns', patternName, 'shared');

  // Return empty object if no shared directory exists
  if (!fs.existsSync(sharedPath)) return snippets;

  // Track processed components to avoid infinite loops
  const processedComponents = new Set();

  // Get all subdirectories in the shared folder
  const sharedDirs = fs
    .readdirSync(sharedPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // Build a map of all shared components for quick lookup
  const sharedComponentsMap = new Map();
  sharedDirs.forEach((dir) => {
    const sharedExample = docsData.find((example) => example.file.includes(`patterns/${patternName}/shared/${dir}`));
    if (sharedExample) {
      sharedComponentsMap.set(dir, sharedExample);
    }
  });

  /**
   * Recursively processes a component and its dependencies
   * @param {string} template - Template to check for component usage
   * @param {string} sourceCode - Source code to check for component usage
   */
  const processComponentDependencies = (template, sourceCode) => {
    sharedComponentsMap.forEach((sharedExample, dir) => {
      // Skip if already processed
      if (processedComponents.has(dir)) return;

      // Check if this shared component is used
      const selector = sharedExample.selector;
      const componentName = sharedExample.name;

      const isUsedInTemplate = selector && template.includes(selector);
      const isImported = componentName && sourceCode.includes(componentName);

      if (isUsedInTemplate || isImported) {
        // Mark as processed
        processedComponents.add(dir);

        // Add its snippets
        const sharedSnippets = exampleSnippets(sharedExample);
        Object.assign(snippets, sharedSnippets);

        // Recursively check if this shared component uses other shared components
        const sharedTemplate = sharedExample.templateData || '';
        const sharedSourceCode = sharedExample.sourceCode || '';
        processComponentDependencies(sharedTemplate, sharedSourceCode);
      }
    });
  };

  // Start with the main example's template and source
  const template = docsJsonExample.templateData || '';
  const sourceCode = docsJsonExample.sourceCode || '';
  processComponentDependencies(template, sourceCode);

  return snippets;
};

// ============================================================================
// MAIN EXPORT FUNCTION
// ============================================================================

/**
 * Retrieves all examples for a specific component or pattern.
 * Matches examples from content data with documentation JSON data by selector.
 * Automatically includes sub-component and shared component snippets for pattern examples.
 *
 * @param {string} name - The component/pattern name to get examples for
 * @param {Array} docsData - Documentation JSON data array with code snippets
 * @param {Array} examplesData - Api-content examples data array with metadata
 * @returns {Array} Array of complete example objects
 */
const getExamples = (name, docsData, examplesData) => {
  const examples = [];

  // Find the component in examples data
  let component = examplesData.find((comp) => comp.name === name);

  if (component) {
    // Iterate through all sections and their examples
    component.sections.forEach((section) => {
      section.examples.forEach((contentExample) => {
        // Match content example with docs JSON by selector
        const docsJsonExample = docsData.find((example) => example.selector === contentExample.selector.trim());

        if (docsJsonExample) {
          // Extract pattern name if this is a pattern example
          let patternName = null;
          if (docsJsonExample.file.includes('/patterns/')) {
            const pathParts = docsJsonExample.file.split('/');
            const patternIndex = pathParts.findIndex((part) => part === 'patterns');
            patternName = pathParts[patternIndex + 1];
          }

          const example = createExampleObject(contentExample, section.name, docsJsonExample, docsData, patternName);

          if (example) {
            examples.push(example);
          }
        }
      });
    });
  }

  return examples;
};

module.exports = {
  getExamples
};
