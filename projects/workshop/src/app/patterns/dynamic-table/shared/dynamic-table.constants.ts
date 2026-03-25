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
 * Constants and types for dynamic table pattern
 */

import { BadgeType } from '@visa/nova-angular';

/**
 * Row data structure for basic dynamic tables
 */
export type RowData = Record<string, string>;

/**
 * Row data structure for tables with multiple action buttons per row
 */
export type RowDataMultiActions = Record<string, string | ActionButtons[]>;

/**
 * Column configuration for dynamic tables
 * @property badge - Whether the column renders badge components
 * @property compact - Whether the column uses compact layout
 * @property component - Custom component type for rendering cell content
 * @property genericHeaderActions - Whether generic header actions are enabled for this column
 * @property headerActions - Filter configuration containing available options and currently selected values
 * @property hidden - Whether the column is currently hidden from view
 * @property identifier - Whether this column serves as the primary identifier for its row (required for accessibility)
 * @property name - Display name of the column
 * @property sortable - Whether the column supports sorting
 */
export interface ColData {
  badge?: boolean;
  compact?: boolean;
  component?: any;
  genericHeaderActions?: boolean;
  headerActions?: { options: string[]; selectedOptions: string[] };
  hidden?: boolean;
  identifier?: boolean;
  name: string;
  sortable: boolean;
}

/**
 * Sort configuration for a table column
 * @property column - Name of the column to sort by
 * @property direction - Sort direction (ascending, descending, or none)
 */
export interface SortKeyType {
  column: string;
  direction: SortType;
}

/**
 * State object for tables with sorting and filtering capabilities
 * @property column - Name of the currently sorted column
 * @property direction - Current sort direction
 * @property filters - Active filters mapped by column name to arrays of selected filter values
 */
export interface FilterableTableState {
  column: string;
  direction: SortType;
  filters: Record<string, string[]>;
}

/**
 * Available action button types for table rows
 */
export enum ActionButtons {
  EDIT = 'edit',
  DELETE = 'delete'
}

/**
 * Maps status labels to their corresponding badge types
 */
export const badgeLabelMap: Record<string, BadgeType> = {
  Approved: 'stable',
  'On hold': 'warning',
  Declined: 'negative',
  'In progress': 'neutral'
};

/**
 * Sort direction constants
 */
export const SortType = {
  NONE: 'none',
  ASC: 'ascending',
  DESC: 'descending'
} as const;

export type SortType = (typeof SortType)[keyof typeof SortType];
