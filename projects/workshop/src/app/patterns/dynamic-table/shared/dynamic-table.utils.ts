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
 * Utility functions for dynamic table pattern
 */
import { BadgeType } from '@visa/nova-angular';
import { ColData, RowData, RowDataMultiActions, SortKeyType, SortType, badgeLabelMap } from './dynamic-table.constants';

/**
 * Retrieves the badge type for a given status label
 * @param badgeType - Status label to look up
 * @returns Corresponding badge type, defaulting to 'stable' if not found
 */
export const getBadgeLabel = (badgeType: string): BadgeType => {
  return badgeLabelMap[badgeType] || 'stable';
};

/**
 * Sorts table data by a specified column and direction
 * @param sortKey - Column name and sort direction
 * @param currentColumnData - Column configuration array
 * @param currentSortedData - Current table data
 * @returns Sorted array of row data
 */
export const sortTableData = (
  sortKey: SortKeyType,
  currentColumnData: ColData[],
  currentSortedData: RowData[]
): RowData[] => {
  const columnName = sortKey.column;
  const columnToSort = currentColumnData.find((c) => c.name === columnName);
  if (!columnToSort || !columnToSort.sortable) return currentSortedData;

  // Sort the data based on column type
  const preSortedData = [...currentSortedData].sort((item1, item2) => {
    const a = item1[columnName];
    const b = item2[columnName];
    if (columnToSort.badge) {
      // Badge sorting uses badge type priority
      const aType = getBadgeLabel(a as string);
      const bType = getBadgeLabel(b as string);
      return sortBadgeItems(aType, bType);
    } else if (typeof a === 'string' && typeof b === 'string') {
      return sortStringItems(a as string, b as string);
    } else if (typeof a === 'boolean' && typeof b === 'boolean') {
      return sortBoolItems(a as boolean, b as boolean);
    }
    return 0;
  });

  // Return sorted data based on direction
  if (sortKey.direction === SortType.ASC) {
    return preSortedData;
  } else {
    const reversedData = [...preSortedData].reverse();
    return reversedData;
  }
};

/**
 * Compares two boolean values for sorting
 * @param a - First boolean value
 * @param b - Second boolean value
 * @returns Numeric comparison result (-1, 0, or 1)
 */
export const sortBoolItems = (a: boolean, b: boolean): number => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
};

/**
 * Compares two strings for sorting using locale-aware comparison
 * Handles numeric substrings and is case-insensitive
 * @param a - First string value
 * @param b - Second string value
 * @returns Numeric comparison result
 */
export const sortStringItems = (a: string, b: string): number => {
  // START GENAI@CHATGPT5
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  // END GENAI@CHATGPT5
};

/**
 * Compares two badge types for sorting by priority (most critical first)
 * @param a - First badge type
 * @param b - Second badge type
 * @returns Numeric comparison result based on badge priority
 */
export const sortBadgeItems = (a: string, b: string): number => {
  const badgeOrder = ['negative', 'warning', 'stable', 'neutral', 'subtle'];
  const indexA = badgeOrder.indexOf(a);
  const indexB = badgeOrder.indexOf(b);

  if (indexA < indexB) {
    return -1;
  } else if (indexA > indexB) {
    return 1;
  }
  return 0;
};

/**
 * Generates input properties for a table cell component
 * Compact columns receive the row identifier as their label for accessibility
 * @param col - Column configuration
 * @param row - Row data
 * @param identifyingColName - Name of the column that identifies the row
 * @returns Object containing component inputs
 */
export const getComponentInputs = (
  col: ColData,
  row: RowData | RowDataMultiActions,
  identifyingColName: string
): Record<string, any> => {
  const inputs: Record<string, any> = {};
  if (col.compact) {
    inputs['label'] = row[identifyingColName];
  } else {
    inputs['label'] = row[col.name];
  }
  return inputs;
};

/**
 * Converts a column name to kebab-case format
 * @param columnName - Column name to convert
 * @returns Kebab-cased column name
 */
export const toKebabCase = (columnName: string): string => {
  return columnName.replace(/ /g, '-').toLowerCase();
};

/**
 * Updates the selected filter options for a column
 * @param col - Column being filtered
 * @param filter - Filter value being toggled
 * @param isChecked - Whether the filter is being selected or deselected
 * @returns Updated array of selected filter options
 */
export const onFilterToggle = (col: ColData, filter: string, isChecked: boolean): string[] => {
  if (!col.headerActions) return [];
  const selectedOptions = new Set(col.headerActions.selectedOptions);
  if (isChecked) {
    selectedOptions.add(filter);
  } else {
    selectedOptions.delete(filter);
  }
  return [...Array.from(selectedOptions)];
};
