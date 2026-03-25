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
 * Utility functions for filtering and managing dynamic table data
 * These are applied specifically to the filterable examples
 */
import { FloatingUIContainer } from '@visa/nova-angular';
import { ColData, RowData } from './dynamic-table.constants';

/**
 * Filters table data based on active column filters
 * @param sortedData - Sorted table data to filter
 * @param filters - Active filters mapped by column name
 * @returns Filtered row data
 */
export const deriveFilteredData = (sortedData: RowData[], filters: Record<string, string[]>): RowData[] => {
  let filtered = sortedData;

  // Apply each active filter to the data
  Object.keys(filters).forEach((column) => {
    const selectedFilters = filters[column];
    if (selectedFilters.length > 0) {
      // Special handling for "Added by" column - normalize periods in names
      if (column === 'Added by') {
        filtered = filtered.filter((row) => {
          if (typeof row[column] !== 'string') return false;
          const normalizedValue = (row[column] as string).replaceAll('.', '');
          return selectedFilters.some((filter) => filter.replaceAll('.', '') === normalizedValue);
        });
      }
      // Special handling for "File size" column - parse and compare numeric ranges
      else if (column === 'File size') {
        filtered = filtered.filter((row) => {
          if (typeof row[column] !== 'string') return false;
          const sizeStr = row[column] as string;
          const sizeValue = parseFloat(sizeStr.replace(' KB', ''));
          const returnVar = selectedFilters.some((option) => {
            if (option === '< 300 KB') return sizeValue < 300;
            if (option === '300-600 KB') return sizeValue >= 300 && sizeValue <= 600;
            if (option === '> 600 KB') return sizeValue > 600;
            return false;
          });
          return returnVar;
        });
      }
      // Standard string matching for other columns
      else {
        filtered = filtered.filter(
          (row) => typeof row[column] === 'string' && selectedFilters.includes(row[column] as string)
        );
      }
    }
  });
  return filtered;
};

/**
 * Applies selected filter options for a specific column
 * @param columnName - Name of the column being filtered
 * @param columnData - Column configuration array
 * @param filters - Current filters object
 * @returns Updated filters object
 */
export const applyColumnFilters = (
  columnName: string,
  columnData: ColData[],
  filters: Record<string, string[]>
): Record<string, string[]> => {
  const columnToFilter = columnData.find((c) => c.name === columnName);
  if (!columnToFilter || !columnToFilter.headerActions) return filters;

  const selectedFilterKeys: string[] = columnToFilter.headerActions.selectedOptions;

  const currentFilters = filters;
  currentFilters[columnName] = selectedFilterKeys;
  return { ...currentFilters };
};

/**
 * Clears all filters for a specific column
 * @param columnName - Name of the column to clear
 * @param columnData - Column configuration array
 * @param filters - Current filters object
 * @returns Updated column data and filters objects
 */
export const clearColumnFilters = (
  columnName: string,
  columnData: ColData[],
  filters: Record<string, string[]>
): {
  updatedColumnData: ColData[];
  updatedFilters: Record<string, string[]>;
} => {
  const columnToFilter = columnData.find((c) => c.name === columnName);
  if (!columnToFilter || !columnToFilter.headerActions)
    return { updatedColumnData: columnData, updatedFilters: filters };

  columnToFilter.headerActions.selectedOptions = [];
  const currentFilters = filters;
  currentFilters[columnName] = [];
  return { updatedColumnData: [...columnData], updatedFilters: { ...currentFilters } };
};

/**
 * Removes a single filter value from a column
 * @param column - Name of the column
 * @param filter - Specific filter value to remove
 * @param columnData - Column configuration array
 * @param filters - Current filters object
 * @returns Updated column data and filters objects
 */
export const clearSingleFilter = (
  column: string,
  filter: string,
  columnData: ColData[],
  filters: Record<string, string[]>
): {
  updatedColumnData: ColData[];
  updatedFilters: Record<string, string[]>;
} => {
  const columnToFilter = columnData.find((c) => c.name === column);
  if (!columnToFilter || !columnToFilter.headerActions)
    return { updatedColumnData: columnData, updatedFilters: filters };

  const currentFilters = filters;
  const updatedFilters = currentFilters[column]?.filter((f) => f !== filter) || [];
  currentFilters[column] = updatedFilters;

  columnToFilter.headerActions.selectedOptions = updatedFilters;

  return { updatedColumnData: [...columnData], updatedFilters: { ...currentFilters } };
};

/**
 * Clears all filters from all columns
 * @param columnData - Column configuration array
 * @returns Updated column data and empty filters object
 */
export const clearAllFilters = (
  columnData: ColData[]
): {
  updatedColumnData: ColData[];
  updatedFilters: Record<string, string[]>;
} => {
  columnData.forEach((col) => (col.headerActions ? (col.headerActions.selectedOptions = []) : null));

  return { updatedColumnData: [...columnData], updatedFilters: {} };
};

/**
 * Applies all selected filters across all columns
 * @param columnData - Column configuration array
 * @param filters - Current filters object
 * @returns Updated column data and filters objects
 */
export const applyFilters = (
  columnData: ColData[],
  filters: Record<string, string[]>
): {
  updatedColumnData: ColData[];
  updatedFilters: Record<string, string[]>;
} => {
  const newFilters: Record<string, string[]> = { ...filters };
  columnData.forEach((col) => {
    if (!col.headerActions) return;
    const selectedFilterKeys: string[] = col.headerActions.selectedOptions;
    newFilters[col.name] = selectedFilterKeys;
  });
  const newColumnData = [...columnData];
  return { updatedColumnData: newColumnData, updatedFilters: newFilters };
};

/**
 * Toggles visibility for a specific column
 * @param columnName - Name of the column to toggle
 * @param columnData - Column configuration array
 * @param columnVisibility - Visibility state for all columns
 * @returns Updated column data array
 */
export const toggleColumnVisibility = (
  columnName: string,
  columnData: ColData[],
  columnVisibility: Record<string, boolean>
): ColData[] => {
  const columnToHide = columnData.find((c) => c.name === columnName);
  if (!columnToHide) return columnData;
  columnToHide.hidden = !columnToHide.hidden;
  columnVisibility[columnName] = !columnToHide.hidden;
  return [...columnData];
};

/**
 * Updates all column visibility states based on the visibility map
 * @param columnVisibility - Visibility state for all columns
 * @param columnData - Column configuration array
 * @returns Updated column data array
 */
export const toggleAllColVisibility = (columnVisibility: Record<string, boolean>, columnData: ColData[]): ColData[] => {
  columnData.forEach((col) => {
    col.hidden = !columnVisibility[col.name];
  });
  return [...columnData];
};

/**
 * Resets all columns to their default state (visible with no filters)
 * @param columnData - Column configuration array
 * @returns Updated column data and empty filters object
 */
export const resetColumnData = (
  columnData: ColData[]
): {
  updatedColumnData: ColData[];
  updatedFilters: Record<string, string[]>;
} => {
  clearAllFilters(columnData);
  columnData.forEach((col) => {
    col.hidden = false;
  });
  return { updatedColumnData: [...columnData], updatedFilters: {} };
};

/**
 * Moves focus to the filter button
 * @param filterButton - Button element to focus
 */
export const focusFilterButton = (filterButton: HTMLButtonElement) => {
  filterButton.focus();
};

/**
 * Closes a dropdown and restores focus to its trigger
 * @param floatingContainer - Floating UI container to close
 */
export const dropdownCloseAndFocus = (floatingContainer: FloatingUIContainer | undefined) => {
  if (!floatingContainer) return;
  floatingContainer.floatingUIService?.hidefloatingUI();
  floatingContainer.floatingUIService?.restoreFocus();
};
