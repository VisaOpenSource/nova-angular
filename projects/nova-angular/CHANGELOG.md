<!--
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
 -->

### [7.0.0](Learn more at: https://design.visa.com/developing/angular/changelog) (2026-03-20)
This release adds Angular 21 support and drops Angular 18 support. It introduces new workshop patterns including a comprehensive dynamic-table pattern with filtering, pagination, and expandable rows, a file-upload pattern, and a chat pattern. Several component bug fixes improve combobox reliability, floating UI focus management, and toggle button state handling.
  
  
#### BREAKING CHANGES
- **Angular:** Drop Angular 18 support; library now requires Angular 19, 20, or 21

#### Features
- **Surface:** Add surface variant classes for styling flexibility
- **Dynamic Table:** Add comprehensive patterns with sorting, filtering, pagination, expandable rows, and action bars
- **File Upload:** Add patterns with drag-and-drop, progress tracking, and validation
- **Chat:** Add dialog-based, panel-based, and full-page chat patterns

#### Bug Fixes
- **Combobox:** Reinstate automatic selection functionality
- **Combobox:** Handle runtime undefined list case to prevent errors
- **Floating UI:** Restore focus to trigger element when floating UI closes
- **Floating UI:** Close menu on child click and properly bind disabled property
- **Tab:** Fix disclosure tab bug when both expanded prop and disclosureTabToggled event are present
- **Toggle Button:** Allow multiselect toggle group to return to empty state
- **Toggle Button:** Fix initial state handling for multiselect mode
- **Progress:** Allow indeterminate circular progress to be customized
- **Pagination Control:** Prevent duplicate pages from appearing in start and end blocks
- **File Upload:** Fix live region behavior for edge cases improving screen reader announcements
- **Application Layouts:** Correct footer background color in layout patterns

### [6.0.2](Learn more at: https://design.visa.com/developing/angular/changelog) (2025-09-26)

Learn more about the latest Nova Angular version in our article, [Meet Nova Angular 6](https://design.visa.com/what's-new/latest-news/fy25-nova-angular-6).

For step-by-step instructions on upgrading from Nova Angular 5.x to 6.x, refer to the [Migration guide](https://github.com/visa/nova-angular/blob/main/MIGRATION_GUIDE.md).


### Added

- **Library:** Nova Angular now supports Angular 18, 19, and 20
- **Component:** List item
- **Pattern:** Application layouts
- **Pattern:** Wizard

### [5.1.3](Learn more at: https://design.visa.com/developing/angular/changelog) (2025-04-11)

### Added

Initial release of the component library.

- Added a collection of components, utilities, and services.
  - Components
    - Accordion
    - Anchor link menu
    - Avatar
    - Badge
    - Banner
    - Breadcrumbs
    - Button
    - Checkbox
    - Chip
    - Color selector
    - Combobox
    - Content card
    - Date and time selectors
    - Dialog
    - Divider
    - Dropdown menu
    - Flag
    - Footer
    - Horizontal navigation
    - Icon
    - Input
    - Link
    - Listbox
    - Multiselect
    - Navigation drawer
    - Pagination
    - Panel
    - Progress
    - Radio
    - Section message
    - Select
    - Switch
    - Table
    - Tabs
    - Toggle
    - Tooltip
    - Vertical navigation
    - Wizard
  - Services
    - Accordion
    - App-ready
    - Combobox
    - Floating-ui
    - Id generator
    - Listbox
    - Nova lib
    - Pagination
  - Utilities
    - A11y
    - Breakpoints
    - Elevation
    - Flex
    - Open-in-new-tab
    - Spacing
    - Surface
    - Typography
