/**
 *              © 2026 Visa
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

import { AcceptedFileType } from './types';

/**
 * File size limit of 10 megabytes in bytes
 */
export const FILE_SIZE_10MB = 10 * 1024 * 1024;

/**
 * File size limit of 25 megabytes in bytes
 */
export const FILE_SIZE_25MB = 25 * 1024 * 1024;

/**
 * Default icon identifier for unrecognized file types
 */
export const DEFAULT_FILE_ICON = 'visa-document-low';

/**
 * Image file types with associated icons for display
 */
export const ACCEPTED_FILE_TYPES_IMAGES: AcceptedFileType[] = [
  { type: 'application/pdf', icon: 'visa-document-pdf-low' },
  { type: 'image/png', icon: 'visa-document-png-low' },
  { type: 'image/jpeg', icon: 'visa-document-jpg-low' }
];

/**
 * Extended set of file types with associated icons for display
 */
export const ACCEPTED_FILE_TYPES_EXTENDED: AcceptedFileType[] = [
  { type: 'image/jpeg', icon: 'visa-document-jpg-low' },
  { type: 'application/pdf', icon: 'visa-document-pdf-low' },
  { type: 'application/msword', icon: 'visa-document-low' },
  { type: 'application/vnd.ms-excel', icon: 'visa-document-xls-low' }
];

/**
 * Available sort directions
 */
export const SortType = {
  NONE: 'none',
  ASC: 'ascending',
  DESC: 'descending'
} as const;

export type SortType = (typeof SortType)[keyof typeof SortType];

/**
 * Sort configuration for a column
 * @property column - Column identifier to sort
 * @property direction - Sort direction
 */
export interface SortKeyType {
  column: string;
  direction: SortType;
}
