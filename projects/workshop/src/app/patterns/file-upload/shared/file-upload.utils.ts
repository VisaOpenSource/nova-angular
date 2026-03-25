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

/**
 * Utility functions for file upload pattern
 */

import { AcceptedFileType, UploadFile } from './types';
import { DEFAULT_FILE_ICON } from './file-upload.constants';

/**
 * Validates a file and returns an UploadFile object with appropriate icon
 * @param file - The File object to validate
 * @param acceptedTypes - Array of accepted file types with their icons
 * @returns UploadFile object with icon, id, and file reference
 */
export function validateFile(
  file: File,
  acceptedTypes: AcceptedFileType[],
): UploadFile {
  let icon = DEFAULT_FILE_ICON;
  const acceptedTypeObj = acceptedTypes.find((t) => t.type === file.type);

  if (acceptedTypeObj) {
    icon = acceptedTypeObj.icon;
  }

  return {
    file,
    id: `${file.name.replace(/[^a-zA-Z0-9-_]/g, '-')}-${file.size}`,
    icon,
  };
}
