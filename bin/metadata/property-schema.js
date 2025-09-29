/**
 *              © 2025 Visa
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
 * EXAMPLE SCHEMA
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

const getNameAlias = (defaultValue) => {
  /* START GENAI@CHATGPT-4 */
  // Extract alias value from defaultValue string if present
  // only input signals have alias
  let alias = null;
  const aliasMatch = defaultValue && defaultValue.match(/alias:\s*['"`]([^'"`]+)['"`]/);
  if (aliasMatch) {
    alias = aliasMatch[1];
  }
  return alias;
  /* END GENAI@CHATGPT-4 */
};

const extractExplicitType = (defaultValue, type) => {
  /* START GENAI@CHATGPT-4 */

  let fullType = null;
  const value = defaultValue || '';
  const fullTypeMatch = value.match(/<([\s\S]*?)>/);
  if (fullTypeMatch && fullTypeMatch[1]) {
    // Split on first comma, take the part before the comma, and trim
    fullType = fullTypeMatch[1].split(',')[0].trim();
  }
  if (!fullType) {
    fullType = type || '';
    const fullTypeMatch = fullType.match(/<([\s\S]*?)>/);
    if (fullTypeMatch && fullTypeMatch[1]) {
      // Split on first comma, take the part before the comma, and trim
      fullType = fullTypeMatch[1].split(',')[0].trim();
    }
  }
  return fullType;
  /* END GENAI@CHATGPT-4 */
};

const componentID = () => {
  return null;
};

const libraryID = () => {
  return null;
};

const getPropertyData = (prop, name, type, bindingtype) => {
  /** tags are probably not needed, but leaving logic */
  // let tags = [];
  // prop['jsdoctags']?.forEach((tag) => {
  //   tags.push({
  //     tagName: tag['tagName']['escapedText'],
  //     value: tag['comment']
  //   });
  // });

  let defaultValue = null;
  const tag = prop['jsdoctags']?.find(
    (tag) => tag['tagName']['escapedText'] === 'default' || tag['tagName']['escapedText'] === 'defaultValue'
  );
  if (tag && tag['comment'] !== prop['defaultValue']) {
    defaultValue = tag['comment'];
  }
  defaultValue = defaultValue ? defaultValue : prop['defaultValue'];

  defaultValue = type.toLowerCase().includes('emit') || type.toLowerCase().includes('event') ? '' : defaultValue; // emit signals do not have default values
  // Extract actual default value from patterns like input<TYPE>(VALUE, ...) or model<TYPE>(VALUE)
  if (typeof defaultValue === 'string' && defaultValue !== '') {
    const match = defaultValue.match(/(?:input|model)<[^>]*>\(([^,)\n]+)/);
    if (match && match[1] !== undefined) {
      defaultValue = match[1].trim();
    }
  }

  let builtIn = false;
  const tag2 = prop['jsdoctags']?.find(
    (tag) => tag['tagName']['escapedText'] === 'builtin' || tag['tagName']['escapedText'] === 'builtIn'
  );
  builtIn = tag2 ? tag2['comment'] : false;

  return {
    name: name,
    'binding type': bindingtype, // input, output, or null
    'property type': type + 'signal',
    default: removeHTMLCode(defaultValue),
    description: removeHTMLCode(prop['description']),
    builtIn: removeHTMLCode(builtIn + '')
    // tags: tags,
  };
};

/**
 * create example object, depends on both the result of sections-schema.js and the docs json
 * @param {*} item
 * @param {*} type
 * @returns
 */
const createExampleProperty = (libProperty, sectionName) => {
  const type = libProperty.type ? libProperty.type.toLowerCase() : null;
  if (!type) return;
  // return input signals, outputs, and model signals
  const isInputSignal = type.includes('inputsignal');
  const isModelSignal = type.includes('model');
  const isOutputSignal = type.includes('emit') || type.includes('event');
  if (type && (isInputSignal || isModelSignal || isOutputSignal)) {
    let name = libProperty.name; // store name
    let type = libProperty.type; // store type
    if (isInputSignal || isModelSignal) {
      name = getNameAlias(libProperty.defaultValue) || libProperty.name;
      type = extractExplicitType(libProperty.defaultValue, libProperty.type) || libProperty.type;
    }
    const bindingType = isInputSignal ? 'Input' : isModelSignal ? 'Model' : isOutputSignal ? 'Output' : null;
    return {
      name: name,
      section: sectionName,
      componentId: componentID(),
      libraryId: libraryID(),
      data: getPropertyData(libProperty, name, type, bindingType)
    };
  }
};

const getDirectiveProps = (component, name) => {
  let examples = [];
  component.inputsClass.forEach((libProperty) => {
    examples.push(createExampleProperty(libProperty, name));
  });
  component.outputsClass.forEach((libProperty) => {
    examples.push(createExampleProperty(libProperty, name));
  });
  component.propertiesClass.forEach((libProperty) => {
    // Check if a property with the same name already exists in examples
    if (examples.some((example) => example && example.name === libProperty.name)) return;
    examples.push(createExampleProperty(libProperty, name));
  });
  return examples.filter((example) => example);
};

const createExampleEnumConst = (option, section) => {
  const options = option.split(':');
  return {
    name: options[0].trim(),
    section: section,
    componentId: componentID(),
    libraryId: libraryID(),
    data: {
      'property name': options[0].trim(),
      value: options[1].trim().replace("',", "'") // ie "EXPANDED: 'chevron-down',", => "EXPANDED: 'chevron-down'"
    }
  };
};

const getLiteralConstant = (filePath, name) => {
  // Read the file and extract the value assigned to libProperty.name
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

const getConstantProps = (libProperty) => {
  let constants = [];
  let options = libProperty.rawtype ?? libProperty.defaultValue;
  if (options?.includes('as const')) {
    options = options.split('\n').slice(1, -1); // transform into key-value pairs like MEDIUM - 'medium'
    options.forEach((option) => {
      constants.push(createExampleEnumConst(option, libProperty.name));
    });
  } else if (options.includes('literal type')) {
    const file = libProperty.file;
    const filePath = path.resolve(file);
    const literalConstant = getLiteralConstant(filePath, libProperty.name);
    if (literalConstant) {
      constants.push(literalConstant);
    }
  } else {
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

const createServiceProperties = (prop, sectionName) => {
  let defaultValue = null;
  const tag = prop['jsdoctags']?.find(
    (tag) => tag['tagName']['escapedText'] === 'default' || tag['tagName']['escapedText'] === 'defaultValue'
  );
  if (tag && tag['comment'] !== prop['defaultValue']) {
    defaultValue = tag['comment'];
  }
  defaultValue = defaultValue ? defaultValue : prop['defaultValue'];
  defaultValue = removeHTMLCode(defaultValue);
  const name = getNameAlias(defaultValue) || prop['name'];
  const type = extractExplicitType(defaultValue, prop['type']) || prop['type'];
  return {
    name: name,
    section: sectionName,
    libraryId: libraryID(),
    componentId: componentID(),
    serviceUsage: 'property',
    data: {
      name: name,
      type: type,
      default: defaultValue,
      description: removeHTMLCode(prop['description'])
    }
  };
};

const createServiceMethods = (method, sectionName) => {
  let args = [];
  method['args']?.forEach((argument) => {
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

const getServiceProps = (service, name) => {
  let services = [];
  service['properties']?.forEach((prop) => {
    services.push(createServiceProperties(prop, name));
  });
  service['methods']?.forEach((method) => {
    services.push(createServiceMethods(method, name));
  });
  return services;
};

const removeHTMLCode = (str) => {
  if (str === undefined || str === '') {
    return '';
  }
  return str.replace(/<\/?[^>]+(>|$)/g, '');
};

const getProperties = (name, type, component) => {
  examples = [];
  if (!component) return examples;
  if (type === 'directives') {
    examples = getDirectiveProps(component, name);
  } else if (type === 'constants') {
    examples = getConstantProps(component);
  } else if (type === 'services') {
    examples = getServiceProps(component, name.service ? name.service : name);
  }
  return examples;
};

module.exports = {
  getProperties,
  getServiceProps,
  removeHTMLCode
};
