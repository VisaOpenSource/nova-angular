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
 * This file generates demo data for the dynamic table component.
 * You will typically not need to use these functions in a production application.
 * They are provided here for convenience in the workshop demo.
 */

import { ActionsButtonDynamicTableComponent } from './actions-button/actions-button.docs';
import { SharedBadgeDynamicTableComponent } from './badge/shared-badge.docs';
import { ColData, RowData } from './dynamic-table.constants';

/** === BADGE DATA ===  */

export const badgeLabelOptions: string[] = ['Approved', 'On hold', 'Declined', 'In progress'];

/**
 * Generates a badge status label based on a cyclic pattern
 * @param index - Index value for determining the badge (typically the row index)
 * @returns Badge status label
 */
export const generateBadgeStatus = (index: number): string => {
  return badgeLabelOptions[index % badgeLabelOptions.length];
};

/** === DEFAULT DATA === */

/**
 * Creates a default column configuration for demo tables
 * @param actions - Whether to include an actions column
 * @returns Array of column definitions
 */
export const getDefaultColumnData = (actions = true): ColData[] => {
  const data = [
    { name: 'Column A', sortable: true, identifier: true },
    { name: 'Column B', sortable: true },
    ...(actions
      ? [
          { name: 'Column C', sortable: true, badge: true, component: SharedBadgeDynamicTableComponent },
          {
            name: 'Actions',
            sortable: false,
            compact: true,
            component: ActionsButtonDynamicTableComponent
          }
        ]
      : [
          { name: 'Column C', sortable: true },
          { name: 'Column D', sortable: true, badge: true, component: SharedBadgeDynamicTableComponent }
        ])
  ];
  return data;
};

/**
 * Generates sample row data for demo tables
 * @param numRows - Number of rows to generate
 * @param columnData - Column definitions for determining cell content types
 * @returns Array of row data objects
 */
export const generateBasicData = (numRows: number, columnData: ColData[]): RowData[] => {
  const rows: RowData[] = [];
  for (let i = 0; i < numRows; i++) {
    const row: RowData = {};
    columnData.forEach((col) => {
      // Badge columns use cyclic status values
      if (col.badge) {
        row[col.name] = generateBadgeStatus(i);
      }
      // Compact columns (like action columns) are left empty
      else if (col.compact) {
        row[col.name] = '';
      }
      // Regular columns get letter-number combinations (A1, B2, etc.)
      else {
        row[col.name] = `${String.fromCharCode(65 + columnData.indexOf(col))}${i + 1}`;
      }
    });
    rows.push(row);
  }
  return rows;
};

/** === FILTER DATA === */

/**
 * Predefined filter options for the filterable columns, used for demo purposes
 */
export const filterOptions = {
  addedBy: ['A. Miller', 'S. Taylor', 'R. Jones'],
  region: ['North America', 'Asia Pacific', 'Europe', 'South America'],
  fileTypes: ['BMP', 'CSV', 'DOCX', 'GIF', 'JPG', 'PDF', 'PNG', 'PPTX', 'SVG', 'TXT', 'ZIP'],
  fileSizes: ['< 300 KB', '300-600 KB', '> 600 KB']
};

/**
 * Returns a fresh copy of the default filter column data
 * This function returns a new instance each time to avoid shared state between components
 */
export function getDefaultFilterColumnData(): ColData[] {
  return [
    { name: 'File name', sortable: true, identifier: true },
    {
      name: 'Added by',
      sortable: true,
      headerActions: { options: filterOptions.addedBy, selectedOptions: [] }
    },
    { name: 'File size', sortable: true, headerActions: { options: filterOptions.fileSizes, selectedOptions: [] } },
    {
      name: 'File type',
      sortable: true,
      headerActions: { options: filterOptions.fileTypes, selectedOptions: [] }
    },
    {
      name: 'Status',
      sortable: true,
      headerActions: { options: badgeLabelOptions, selectedOptions: [] },
      component: SharedBadgeDynamicTableComponent
    },
    {
      name: 'Region',
      sortable: true,
      headerActions: { options: filterOptions.region, selectedOptions: [] }
    },
    {
      name: 'Actions',
      sortable: false,
      compact: true,
      component: ActionsButtonDynamicTableComponent
    }
  ];
}

/**
 * Creates a seeded pseudo-random number generator using the Mulberry32 algorithm
 * Produces deterministic results for consistent test snapshots
 * @param seed - Seed value for the generator
 * @returns Function that returns a pseudo-random number between 0 and 1
 */
export const pseudoRandomGenerator = (seed: number) => {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * Generates sample data with filterable columns for demo tables
 * Uses a deterministic approach for consistent test snapshots
 * @param numRows - Number of rows to generate
 * @returns Array of row data objects with filter-compatible values
 */
export const generateFilterData = (numRows: number): RowData[] => {
  const rows: RowData[] = [];
  const fileNames = ['A1', 'B2', 'C3', 'D4', 'E5', 'F6', 'G7'];
  // Use a seeded pseudo-random generator for deterministic results
  const seed = 42;
  for (let i = 0; i < numRows; i++) {
    const rand = pseudoRandomGenerator(seed + i);
    rows.push({
      'File name': fileNames[i % fileNames.length] + '-' + (i + 100),
      'Added by': filterOptions.addedBy[i % filterOptions.addedBy.length],
      'File size': `${Math.floor(rand() * 900) + 100} KB`,
      'File type': filterOptions.fileTypes[i % filterOptions.fileTypes.length],
      Status: generateBadgeStatus(i),
      Region: filterOptions.region[i % filterOptions.region.length],
      Actions: ''
    });
  }
  return rows;
};
