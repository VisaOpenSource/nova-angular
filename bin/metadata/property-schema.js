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
const fs = require('fs');
const { get } = require('http');
const path = require('path');

/**
 * PROPERTY SCHEMA
 *
 * | property     | description                                                   | required | type      |
 * |--------------|---------------------------------------------------------------|----------|-----------|
 * | name         | Property name.                                                | true     | String    |
 * | description  | Property description, if available.                           | false    | String    |
 * | type         | Property type,                                                | true     | String    |
 * |              | IE/ class, variable, function, boolean, string, number, etc.  |          |           |
 * | default      | Default value for this property, if available.                | false    | String    |
 * | required     | Boolean that identifies whether this property is required.    | false    | Boolean   |
 * | section      | Parent section to which this property corresponds.            | false    | String    |
 * |              | This value matches the propertySections[i].name property.     |          |           |
 * | componentId  | Null                                                          | true     | Null      |
 * | libraryId    | Null                                                          | true     | Null      |
 */

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Extracts alias value from a defaultValue string if present.
 * Input signals can have an alias defined like: alias: 'myAlias'
 *
 * @param {string} defaultValue - The default value string to parse
 * @returns {string|null} The extracted alias or null if not found
 */
const getNameAlias = (defaultValue) => {
  /* START GENAI@CHATGPT-4 */
  let alias = null;
  const aliasMatch = defaultValue && defaultValue.match(/alias:\s*['"`]([^'"`]+)['"`]/);
  if (aliasMatch) {
    alias = aliasMatch[1];
  }
  return alias;
  /* END GENAI@CHATGPT-4 */
};

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

/**
 * Removes HTML tags from a string.
 *
 * @param {string} str - The string to clean
 * @returns {string} The string with HTML tags removed
 */
const removeHTMLCode = (str) => {
  if (str === undefined || str === '') {
    return '';
  }
  return str.replace(/<\/?[^>]+(>|$)/g, '');
};

// ============================================================================
// PROPERTY DATA BUILDERS
// ============================================================================

/**
 * Extracts and formats property data from JSDoc tags and property metadata.
 *
 * @param {Object} prop - The property object from library data
 * @param {string} name - The property name
 * @param {string} type - The property type
 * @param {string} bindingtype - The binding type: 'input', 'output', or null
 * @returns {Object} Formatted property data object
 */
const getPropertyData = (prop, name, type, bindingtype) => {
  // Extract default value from JSDoc tags (@default or @defaultValue)
  let defaultValue = null;
  const defaultTag = prop['jsdoctags']?.find(
    (tag) => tag['tagName']['escapedText'] === 'default' || tag['tagName']['escapedText'] === 'defaultValue'
  );
  if (defaultTag && defaultTag['comment'] !== prop['defaultValue']) {
    defaultValue = defaultTag['comment'];
  }
  defaultValue = defaultValue ? defaultValue : prop['defaultValue'];

  // Extract builtIn flag from JSDoc tags (@builtin or @builtIn)
  let builtIn = false;
  const builtInTag = prop['jsdoctags']?.find(
    (tag) => tag['tagName']['escapedText'] === 'builtin' || tag['tagName']['escapedText'] === 'builtIn'
  );
  builtIn = builtInTag ? builtInTag['comment'] : false;

  return {
    name: name,
    'binding type': bindingtype, // input, output, or null
    'property type': type,
    default: removeHTMLCode(defaultValue),
    description: removeHTMLCode(prop['description']),
    builtIn: removeHTMLCode(builtIn + '')
  };
};

/**
 * Creates a property object for documentation examples.
 * Handles alias extraction for input signals and properties.
 *
 * @param {Object} libProperty - The library property object
 * @param {string} binding - The binding type: 'input', 'output', or 'property'
 * @param {string} sectionName - The name of the section this property belongs to
 * @returns {Object} Property object with name, section, and data
 */
const createExampleProperty = (libProperty, binding, sectionName) => {
  // Clean up the type (remove ', unknown' suffix if present)
  const type = libProperty.type ? libProperty.type.toLowerCase().replace(', unknown', '') : null;

  // For inputs and properties, check if there's an alias defined
  let name = libProperty.name;
  if (binding === 'input' || binding === 'property') {
    name = getNameAlias(libProperty.defaultValue) || libProperty.name;
  }

  return {
    name: name,
    section: sectionName,
    componentId: componentID(),
    libraryId: libraryID(),
    data: getPropertyData(libProperty, name, type, binding)
  };
};

// ============================================================================
// DIRECTIVE PROPERTIES HANDLERS
// ============================================================================

/**
 * Extracts all properties from a directive/component including inputs, outputs, and properties.
 * Removes duplicates (inputs/properties with same name are deduplicated).
 *
 * @param {Object} component - The component/directive object from library data
 * @param {string} name - The component/directive name
 * @returns {Array} Array of property objects
 */
const getDirectiveProps = (component, name) => {
  let properties = [];

  // Add input properties (skip duplicates)
  component.inputsClass.forEach((libProperty) => {
    if (properties.some((example) => example && example.name === libProperty.name)) return;
    properties.push(createExampleProperty(libProperty, 'input', name));
  });

  // Add output properties (EventEmitters)
  component.outputsClass.forEach((libProperty) => {
    properties.push(createExampleProperty(libProperty, name));
  });
  component.propertiesClass.forEach((libProperty) => {
    // Check if a property with the same name already exists in properties
    if (properties.some((example) => example && example.name === libProperty.name)) return;
    properties.push(createExampleProperty(libProperty, name));
  });
  return properties.filter((example) => example);
};

// ============================================================================
// CONSTANT PROPERTIES HANDLERS
// ============================================================================

/**
 * Creates a constant object from an enum-style option string.
 * Parses strings like "EXPANDED: 'chevron-down'," into property objects.
 *
 * @param {string} option - The option string to parse (e.g., "MEDIUM: 'medium',")
 * @param {string} section - The section name this constant belongs to
 * @returns {Object} Constant property object
 */
const createExampleEnumConst = (option, section) => {
  const options = option.split(':');
  return {
    name: options[0].trim(),
    section: section,
    componentId: componentID(),
    libraryId: libraryID(),
    data: {
      'property name': options[0].trim(),
      value: options[1].trim().replace("',", "'") // Remove trailing comma: "EXPANDED: 'chevron-down',"
    }
  };
};

/**
 * Reads a source file to extract literal constant values.
 * Uses regex to find variable assignments in the format: name = value;
 *
 * @param {string} filePath - Path to the source file
 * @param {string} name - Name of the constant to find
 * @returns {Object|undefined} Constant object or undefined if not found
 */
const getLiteralConstant = (filePath, name) => {
  // START GENAI@CHATGPT-4
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    // Match: <name> = <value> (until a line ending with a semicolon, but allow semicolons inside value)
    // This regex captures everything after '=' up to the first semicolon at the end of a line
    const regex = new RegExp(`${name}\\s*=\\s*([\\s\\S]*?);\\s*$`, 'm');
    const match = fileContent.match(regex);
    if (match && match[1]) {
      const value = match[1].trim();
      return {
        name: name,
        section: name,
        componentId: componentID(),
        libraryId: libraryID(),
        data: {
          name: name,
          type: value
        }
      };
    }
  } catch (err) {
    console.error('Error reading file for literal type:', err);
  }
  // END GENAI@CHATGPT-4
};

/**
 * Extracts properties from constant definitions.
 * Handles three types: 'as const' objects, literal types, and regular constants.
 *
 * @param {Object} libProperty - The library property representing a constant
 * @returns {Array} Array of constant property objects
 */
const getConstantProps = (libProperty) => {
  let constants = [];
  let options = libProperty.rawtype ?? libProperty.defaultValue;

  // Handle 'as const' objects (enum-like structures)
  if (options?.includes('as const')) {
    // Split into lines and remove first/last (declaration/closing)
    options = options.split('\n').slice(1, -1);
    options.forEach((option) => {
      constants.push(createExampleEnumConst(option, libProperty.name));
    });
  }
  // Handle literal types (need to read from source file)
  else if (options.includes('literal type')) {
    const file = libProperty.file;
    const filePath = path.resolve(file);
    const literalConstant = getLiteralConstant(filePath, libProperty.name);
    if (literalConstant) {
      constants.push(literalConstant);
    }
  }
  // Handle regular constants
  else {
    constants.push({
      name: libProperty.name,
      section: libProperty.name,
      componentId: componentID(),
      libraryId: libraryID(),
      data: {
        name: libProperty.name,
        type: options
      }
    });
  }

  return constants;
};

// ============================================================================
// SERVICE PROPERTIES HANDLERS
// ============================================================================

/**
 * Creates a property object for a service property.
 * Extracts default values from JSDoc tags and handles aliases.
 *
 * @param {Object} prop - The service property object
 * @param {string} sectionName - The section name this property belongs to
 * @returns {Object} Service property object
 */
const createServiceProperties = (prop, sectionName) => {
  // Extract default value from JSDoc tags
  let defaultValue = null;
  const tag = prop['jsdoctags']?.find(
    (tag) => tag['tagName']['escapedText'] === 'default' || tag['tagName']['escapedText'] === 'defaultValue'
  );
  if (tag && tag['comment'] !== prop['defaultValue']) {
    defaultValue = tag['comment'];
  }
  defaultValue = defaultValue ? defaultValue : prop['defaultValue'];
  defaultValue = removeHTMLCode(defaultValue);

  // Check for alias or use property name
  const name = getNameAlias(defaultValue) || prop['name'];

  return {
    name: name,
    section: sectionName,
    libraryId: libraryID(),
    componentId: componentID(),
    serviceUsage: 'property',
    data: {
      name: name,
      type: prop['type'],
      default: defaultValue,
      description: removeHTMLCode(prop['description'])
    }
  };
};

/**
 * Creates a method object for a service method.
 * Extracts method arguments and their descriptions from JSDoc tags.
 *
 * @param {Object} method - The service method object
 * @param {string} sectionName - The section name this method belongs to
 * @returns {Object} Service method object with arguments
 */
const createServiceMethods = (method, sectionName) => {
  let args = [];

  // Process each method argument
  method['args']?.forEach((argument) => {
    // Find JSDoc comment for this argument
    let comment = method['jsdoctags']?.find((tag) => {
      return tag['name']?.['escapedText'] === argument['name'];
    });
    comment = comment ? comment['comment'] : '';
    comment = removeHTMLCode(comment);

    args.push({
      name: argument['name'],
      data: {
        name: argument['name'],
        type: argument['type'],
        description: comment
      }
    });
  });

  return {
    name: method['name'],
    section: sectionName,
    libraryId: libraryID(),
    componentId: componentID(),
    description: removeHTMLCode(method['description']),
    returnType: method['returnType'],
    arguments: args,
    serviceUsage: 'method'
  };
};

/**
 * Extracts all properties and methods from a service.
 *
 * @param {Object} service - The service object from library data
 * @param {string} name - The service name
 * @returns {Array} Array of service property and method objects
 */
const getServiceProps = (service, name) => {
  let services = [];

  // Add all service properties
  service['properties']?.forEach((prop) => {
    services.push(createServiceProperties(prop, name));
  });

  // Add all service methods
  service['methods']?.forEach((method) => {
    services.push(createServiceMethods(method, name));
  });

  return services;
};

// ============================================================================
// MAIN EXPORT FUNCTION
// ============================================================================

/**
 * Gets properties for a component, directive, constant, or service.
 *
 * @param {string} name - The name of the component/directive/constant/service
 * @param {string} type - The type: 'directives', 'constants', or 'services'
 * @param {Object} component - The library component data
 * @returns {Array} Array of property objects
 */
const getProperties = (name, type, component) => {
  let properties = [];

  // Return empty array if no component data
  if (!component) return properties;

  // Route to appropriate handler based on type
  if (type === 'directives') {
    properties = getDirectiveProps(component, name);
  } else if (type === 'constants') {
    properties = getConstantProps(component);
  } else if (type === 'services') {
    properties = getServiceProps(component, name.service ? name.service : name);
  }
  return properties;
};

module.exports = {
  getProperties,
  getServiceProps,
  removeHTMLCode
};
