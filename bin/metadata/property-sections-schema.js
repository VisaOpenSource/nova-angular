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
 * PROPERTY SECTION SCHEMA
 *   | property    | description                                           | required | type   |
 *   |-------------|-------------------------------------------------------|----------|--------|
 *   | name        | section name                                          | true     | String |
 *   | order       | Order specified from content design review            | false    | Number |
 *   |             | or current HX guidelines implementation/design.       |          |        |
 *   | description | Example section description, if available.            | false    | String |
 */
const { getProperties, removeHTMLCode } = require('./property-schema');

/**
 * Retrieves property sections for a given component, directive, or service.
 *
 * @param {string} name - The name of the component/directive/service to find
 * @param {Array} apiContentData - The parsed API content data containing component definitions
 * @param {Object} libData - The library documentation data containing components, directives, injectables, etc.
 * @param {string} type - The type to search for: 'components', 'directives', 'services', etc.
 * @returns {Object} Object containing sections array, props array, and description string
 */
const getPropertySections = (name, apiContentData, libData, type = 'components') => {
  // Initialize return values
  let sections = [];
  let order = 1;
  let props = [];
  let description = '';

  // ============================================================================
  // SERVICES HANDLING
  // ============================================================================
  if (type === 'services') {
    // Find the service in api-content data
    const service = apiContentData
      .find((section) => section.type === 'services')
      ?.content?.find((service) => service.name === name);

    if (service) {
      // Services can exist as injectables or classes, so check both locations
      const libComponent =
        libData.injectables.find((comp) => comp.name === service.service) ??
        libData.classes.find((comp) => comp.name === service.service);

      // Extract properties and description from the library component
      props = getProperties(service, 'services', libComponent);
      description = removeHTMLCode(libComponent?.description) || '';
    }
  }
  // ============================================================================
  // COMPONENTS/DIRECTIVES/ETC. HANDLING
  // ============================================================================
  else {
    // Find the component in api-content data
    const component = apiContentData
      .find((section) => section.type === type)
      ?.content?.find((component) => component.name === name);

    if (component) {
      // Iterate through all properties of the component (directives, related, services, etc.)
      Object.entries(component).forEach(([type, list]) => {
        // Skip the 'name' property and empty arrays
        if (type !== 'name' && list.length > 0) {
          list.forEach((value) => {
            // --- Find the library component based on type ---
            let libComponent = findLibraryComponent(type, value, libData);

            // --- Handle component naming variations (Directive <-> Component) ---
            if (!libComponent && (type === 'directives' || type === 'related')) {
              libComponent = handleComponentNameVariations(value, libData);
            }

            // --- Add section entry ---
            sections.push({
              name: value,
              order: order++,
              type: type,
              selector: libComponent?.selector,
              description: removeHTMLCode(libComponent?.description) || ''
            });

            // --- Aggregate properties and description ---
            props = props.concat(getProperties(value, type, libComponent));
            description = removeHTMLCode(libComponent?.description) || '';
          });
        }
      });
    }
  }

  // Clean up description and return all collected data
  description = removeHTMLCode(description);
  return { sections, props, description };
};

/**
 * Finds a library component based on its type.
 *
 * @param {string} type - The component type (directives, related, services, etc.)
 * @param {string} value - The component name to find
 * @param {Object} libData - The library documentation data
 * @returns {Object|undefined} The found library component or undefined
 */
function findLibraryComponent(type, value, libData) {
  // Check if it's a directive or related component
  if (type === 'directives' || type === 'related') {
    return libData.components.concat(libData.directives).find((comp) => comp.name === value);
  }

  // Check if it's a service
  if (type === 'services') {
    return libData.injectables.find((comp) => comp.name === value);
  }

  // Otherwise, search in miscellaneous variables or type aliases
  return (
    libData.miscellaneous.variables.find((comp) => comp.name === value) ??
    libData.miscellaneous.typealiases.find((comp) => comp.name === value)
  );
}

/**
 * Handles component naming variations (e.g., 'Directive' <-> 'Component').
 * Some components may be named as Directive but stored as Component or vice versa.
 *
 * @param {string} value - The original component name
 * @param {Object} libData - The library documentation data
 * @returns {Object|undefined} The found library component or undefined
 */
function handleComponentNameVariations(value, libData) {
  // Try swapping 'Directive' with 'Component' or vice versa
  const renamedValue = value.includes('Directive')
    ? value.replace('Directive', 'Component')
    : value.includes('Component')
      ? value.replace('Component', 'Directive')
      : value;

  return libData.miscellaneous.variables.find((comp) => comp.name === renamedValue);
}

module.exports = {
  getPropertySections
};
