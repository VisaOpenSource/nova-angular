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
import { TemplateRef } from '@angular/core';

/**
 * File type with associated icon for display
 * @property type - MIME type of the file
 * @property icon - Icon identifier for the file type
 */
export interface AcceptedFileType {
  type: string;
  icon: string;
}

/**
 * Representation of a file in the upload process
 * @property file - Native File object
 * @property id - Unique identifier for the file
 * @property icon - Icon identifier for display
 * @property uploaded - File upload completion status
 * @property uploading - File upload in-progress status
 * @property error - Error message if upload failed
 * @property uploadDate - Timestamp of successful upload
 */
export interface UploadFile {
  file: File;
  id: string;
  icon?: string;
  uploaded?: boolean;
  uploading?: boolean;
  error?: string;
  uploadDate?: Date;
}

/**
 * Configuration for upload dialog component
 * @property isOpen - Dialog visibility state
 * @property title - Dialog heading text
 * @property description - Dialog explanatory text
 * @property queuedFiles - Files waiting to be uploaded
 * @property onSelectFiles - Callback when user selects files
 * @property onUpload - Callback when user initiates upload
 * @property onClose - Callback when user closes dialog
 * @property onDeleteQueuedFile - Callback when user removes a file from queue
 * @property dialogId - Unique identifier for the dialog element
 */
export interface UploadDialogProps {
  isOpen: boolean;
  title?: string;
  description: string;
  queuedFiles: UploadFile[];
  onSelectFiles: () => void;
  onUpload: () => void;
  onClose: () => void;
  onDeleteQueuedFile: (file: UploadFile) => void;
  dialogId?: string;
}

/**
 * Configuration for upload card component
 * @property file - File data to display
 * @property renderActions - Template for action buttons with error context
 */
export interface UploadCardProps {
  file: UploadFile;
  renderActions: TemplateRef<{ errorId: string }>;
}

/**
 * Configuration for upload row component
 * @property file - File data to display
 * @property onRetry - Callback when user retries upload
 * @property onDelete - Callback when user deletes file
 */
export interface UploadRowProps {
  file: UploadFile;
  onRetry: () => void;
  onDelete: () => void;
}

/**
 * Configuration for file status button component
 * @property uploadFile - File data for status display
 * @property onRetry - Callback when user retries upload
 * @property errorId - Element ID for error message association
 */
export interface FileStatusButtonProps {
  uploadFile: UploadFile;
  onRetry: () => void;
  errorId: string;
}
