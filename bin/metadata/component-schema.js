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
 * COMPONENT SCHEMA
 *
 * | property         | description                                         | required | type     |
 * |------------------|-----------------------------------------------------|----------|----------|
 * | name             | component name                                      | true     | String   |
 * | version          | component version, if available                     | true     | String   |
 * | description      | component description, if available                 | true     | String   |
 * | category         | component category, if available.                   | false    | String   |
 * |                  | IE/ abstract, component, hook, directive            |          |          |
 * | libraryId        | Null                                                | true     | Null     |
 * | exampleSections  | Array of content-defined example sections.          | false    | [Object] |
 * | examples         | Array of examples.                                  | false    | [Object] |
 * | propertySections | Array of content-defined property sections.         | false    | [Object] |
 * | properties       | Array of properties.                                | false    | [Object] |
 */
const fs = require('fs');
const { DOCS_JSON, EXAMPLES_HIERARCHY, API_CONTENT, LIB_JSON } = require('./meta-data.constants');
const { getSections } = require('./example-sections-schema');
const { getExamples } = require('./example-schema');
const { getPropertySections } = require('./property-sections-schema');

/**
 * traverse the docs json and grab the first-level docs pages to get names and orders
 */
const getTopLevelPages = (docsData) => {
  const topLevel = docsData.filter((component) => {
    // ie projects/workshop/src/app/components/button/button.docs.html
    // but not projects/workshop/src/app/patterns/chat/shared/chat-message/message.docs.html
    return component.file.replace('projects/workshop/src/app/', '').split('/').length <= 3;
  });
  return topLevel;
};

/**
 * retrieve component name
 */
const componentName = (component) => {
  // ie projects/workshop/src/app/components/button/button.docs.html => button
  let componentName = component.file.replace('projects/workshop/src/app/', '').split('/')[1];
  if (!componentName) return;
  return componentName;
};

/**
 * placeholder component version
 */
const componentVersion = () => {
  // ATM, this is not updated. It is a placeholder for future use.
  return '0.0.1';
};

const libraryID = () => {
  return null;
};

/**
 * create component object
 * See table at top of file for full schema
 */
const createComponentObject = (item, type) => {
  const name = type === 'services' ? item.name : componentName(item);
  const { sections, props, description } = getPropertySections(name, apiContentData, fullLibData, type);
  if (type === 'services' && props.length === 0) return; // don't add component-level services (they'll be added with the component)
  return {
    name: name === 'screenreader-only' ? 'accessibility' : name === 'surfaces' ? 'surface' : name,
    version: componentVersion(),
    description: description,
    category: type, // ie 'foundations', 'utilities', 'components', 'services', 'patterns'
    libraryId: libraryID(),
    exampleSections: type === 'services' ? [] : getSections(name, examplesData),
    examples: type === 'services' ? [] : getExamples(name, docsData, examplesData),
    propertySections: sections,
    properties: props
  };
};

let docsData;
let fullLibData;
let examplesData;
let apiContentData;
const getComponentData = () => {
  let data = [];

  // read in app (workshop) files
  docsData = fs.readFileSync(DOCS_JSON, 'utf-8');
  docsData = JSON.parse(docsData);
  // combine components and directives
  docsData = docsData.components.concat(docsData.directives);

  // read in library files
  fullLibData = fs.readFileSync(LIB_JSON, 'utf-8');
  fullLibData = JSON.parse(fullLibData);
  // combine components and directives
  libData = fullLibData.components.concat(fullLibData.directives);

  // read in examples hierarchy. This is defined by content and used to create example sections
  examplesData = fs.readFileSync(EXAMPLES_HIERARCHY, 'utf-8');
  examplesData = JSON.parse(examplesData);

  // read in api content data. This categorizes components, services, etc.
  apiContentData = fs.readFileSync(API_CONTENT, 'utf-8');
  apiContentData = JSON.parse(apiContentData);

  // get top-level docs pages, which define components, foundations, utilities, patterns, services
  const topLevelPages = getTopLevelPages(docsData);

  let components = [];
  let services = [];
  let utilities = [];
  let foundations = [];
  let patterns = [];

  // distribute top-level pages into their respective categories
  topLevelPages.forEach((page) => {
    if (page.file.includes('components')) {
      components.push(page);
    } else if (page.file.includes('utilities')) {
      utilities.push(page);
    } else if (page.file.includes('foundations')) {
      foundations.push(page);
    } else if (page.file.includes('patterns')) {
      patterns.push(page);
    }
  });

  // also get services from api content data
  apiContentData.forEach((section) => {
    if (section.type === 'services') {
      section.content.forEach((service) => {
        services.push(service);
      });
    }
  });

  /**
   * create component objects for each category
   */
  const categories = [
    { items: components, type: 'components' },
    { items: services, type: 'services' },
    { items: utilities, type: 'utilities' },
    { items: foundations, type: 'foundations' },
    { items: patterns, type: 'patterns' }
  ];

  categories.forEach(({ items, type }) => {
    items.forEach((item) => {
      const component = createComponentObject(item, type);
      if (component) {
        data.push(component);
      }
    });
  });

  return data;
};

module.exports = {
  getComponentData,
  getTopLevelPages,
  componentName
};
