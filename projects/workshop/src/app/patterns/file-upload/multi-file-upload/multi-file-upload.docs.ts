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
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  signal,
  viewChild,
  viewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovaLibModule } from '@visa/nova-angular';

import { UploadFile } from '../shared/types';
import { UploadCardComponent } from '../shared/upload-card/upload-card.docs';
import { FileStatusButtonComponent } from '../shared/file-status-button';
import { mockUpload } from '../shared/mock-upload';
import { FILE_SIZE_25MB, ACCEPTED_FILE_TYPES_IMAGES } from '../shared/file-upload.constants';
import { validateFile } from '../shared/file-upload.utils';
import { UploadSuccessFlagComponent } from '../shared/upload-success-flag/upload-success-flag.docs';
import { VisaErrorLow, VisaCloseTiny, VisaDeleteTiny } from '@visa/nova-icons-angular';

/**
 * Multi-file upload interface with drag-and-drop support.
 * Manages file validation, upload progress, error handling, and success feedback.
 * Displays files as cards with individual retry and delete actions.
 * #patterns
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NovaLibModule,
    UploadCardComponent,
    FileStatusButtonComponent,
    UploadSuccessFlagComponent,
    VisaErrorLow,
    VisaCloseTiny,
    VisaDeleteTiny
  ],
  standalone: true,
  selector: 'nova-workshop-multi-file-upload',
  templateUrl: './multi-file-upload.docs.html'
})
export class MultiFileUploadComponent {
  readonly selectFilesButtonRef = viewChild.required<ElementRef<HTMLButtonElement>>('selectFilesButton');
  readonly fileInputRef = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
  readonly retryButtons = viewChildren(FileStatusButtonComponent);

  readonly uploadedFiles = signal<UploadFile[]>([]);
  readonly sectionMessageDismissed = signal(false);
  readonly flagDismissed = signal(false);
  readonly isDragging = signal(false);

  /**
   * Error message section is visible when errors exist without active uploads
   */
  readonly showSectionMessage = computed(() => {
    console.log('SHOW SECTION MESSAGE: DISMISSED? ', this.sectionMessageDismissed());
    const hasErrors = this.erroredFiles().length > 0 && this.uploadingFiles().length === 0;
    return hasErrors && !this.sectionMessageDismissed();
  });

  /**
   * Success flag is visible when all files uploaded successfully
   */
  readonly showFlag = computed(() => {
    return this.allFilesUploaded() && !this.flagDismissed();
  });

  /**
   * Validates and uploads files from a FileList.
   * Filters out duplicates and initiates upload for each new file.
   * Updates file state based on upload success or failure.
   * @param files - Files selected by user
   */
  processFiles(files: FileList): void {
    const filesArray = Array.from(files);
    const validatedFiles: UploadFile[] = filesArray.map((f) => validateFile(f, ACCEPTED_FILE_TYPES_IMAGES));

    this.uploadedFiles.update((prevValidatedFiles: UploadFile[]) => {
      const newlyValidatedFiles = validatedFiles
        .filter((file) => !prevValidatedFiles.some((f) => f.id === file.id))
        .map((f) => ({ ...f, uploading: true }));

      newlyValidatedFiles.forEach((newFileItem) => {
        mockUpload(newFileItem, {
          maxFileSize: FILE_SIZE_25MB,
          acceptedFileTypes: ACCEPTED_FILE_TYPES_IMAGES.map((t) => t.type)
        })
          .then(() => {
            this.uploadedFiles.update((current) =>
              current.map((f) =>
                f.file === newFileItem.file ? { ...f, uploading: false, uploaded: true, error: undefined } : f
              )
            );
            this.flagDismissed.set(false);
          })
          .catch((err: Error) => {
            this.uploadedFiles.update((current) =>
              current.map((f) =>
                f.file === newFileItem.file
                  ? {
                      ...f,
                      uploading: false,
                      uploaded: false,
                      error: err?.message || 'Failed to upload file. Please try again.'
                    }
                  : f
              )
            );
            this.sectionMessageDismissed.set(false);
          });
      });

      return [...prevValidatedFiles, ...newlyValidatedFiles];
    });
  }

  /**
   * Triggers the hidden file input element.
   * Opens the native file picker dialog for user selection.
   */
  handleSelectFilesClick(): void {
    const fileInput = this.fileInputRef();
    if (fileInput) {
      fileInput.nativeElement.click();
    }
  }

  /**
   * Handles file selection from native input element.
   * Processes selected files and resets input to allow reselection.
   * @param event - Change event from file input
   */
  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      this.processFiles(files);
    }

    // Reset the input value so the same file can be selected again
    input.value = '';
  }

  /**
   * Removes a file from the upload list.
   * @param fileToDelete - File to remove
   */
  handleDeleteFile(fileToDelete: UploadFile): void {
    this.uploadedFiles.update((files) => files.filter((file) => file.id !== fileToDelete.id));
  }

  /**
   * Retries upload for all files with errors.
   * Calls handleRetryFile for each failed file.
   */
  handleRetryAll(): void {
    this.sectionMessageDismissed.set(false);
    this.erroredFiles().forEach((f) => this.handleRetryFile(f));
  }

  /**
   * Re-validates and retries upload for a failed file.
   * Resets file to uploading state and attempts upload again.
   * Updates file state based on retry success or failure.
   * @param fileToRetry - File with previous upload error
   */
  handleRetryFile(fileToRetry: UploadFile): void {
    const validatedFile = validateFile(fileToRetry.file, ACCEPTED_FILE_TYPES_IMAGES);

    this.uploadedFiles.update((files) =>
      files.map((f) => (f.id === fileToRetry.id ? { ...validatedFile, uploading: true } : f))
    );
    this.sectionMessageDismissed.set(false);

    mockUpload(fileToRetry, {
      maxFileSize: FILE_SIZE_25MB,
      acceptedFileTypes: ACCEPTED_FILE_TYPES_IMAGES.map((t) => t.type)
    })
      .then(() => {
        this.uploadedFiles.update((files) =>
          files.map((f) =>
            f.file.name === fileToRetry.file.name && f.file.size === fileToRetry.file.size
              ? { ...f, uploading: false, uploaded: true, error: undefined }
              : f
          )
        );
        this.flagDismissed.set(false);
      })
      .catch((err: Error) => {
        this.uploadedFiles.update((files) =>
          files.map((f) =>
            f.file.name === fileToRetry.file.name && f.file.size === fileToRetry.file.size
              ? {
                  ...f,
                  uploading: false,
                  uploaded: false,
                  error: err?.message || 'Failed to upload file. Please try again.'
                }
              : f
          )
        );
      });
  }

  /**
   * Dismisses the error summary message.
   */
  handleSectionMessageClose(): void {
    this.sectionMessageDismissed.set(true);
  }

  /**
   * Dismisses the success flag notification.
   */
  handleFlagClose(): void {
    this.flagDismissed.set(true);
  }

  /**
   * Moves focus to retry button for a specific file.
   * Used when user clicks on error message link.
   * @param event - Click event
   * @param fileId - Unique identifier of the file
   */
  handleErrorFileClick(event: Event, fileId: string): void {
    event.preventDefault();
    this.focusRetryButton(fileId);
  }

  /**
   * Finds and focuses the retry button for a specific file.
   * @param fileId - Unique identifier of the file
   */
  focusRetryButton(fileId: string): void {
    const buttons = this.retryButtons();
    const targetButton = buttons.find((btn) => btn.uploadFile().id === fileId);
    if (targetButton) {
      targetButton.focus();
    }
  }

  /**
   * Handles file drop from drag-and-drop operation.
   * Processes dropped files and resets drag state.
   * @param event - Drag event containing files
   */
  handleDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFiles(files);
    }
    this.isDragging.set(false);
  }

  /**
   * Handles drag over event for drag-and-drop zone.
   * Sets dragging state for visual feedback.
   * @param event - Drag event
   */
  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  /**
   * Handles drag leave event for drag-and-drop zone.
   * Resets dragging state to remove visual feedback.
   * @param event - Drag event
   */
  handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
  }

  /**
   * Files with upload errors
   */
  readonly erroredFiles = computed(() => this.uploadedFiles().filter((f) => !!f.error));

  /**
   * Files currently uploading
   */
  readonly uploadingFiles = computed(() => this.uploadedFiles().filter((f) => !!f.uploading));

  /**
   * All files uploaded successfully
   */
  readonly allFilesUploaded = computed(() => {
    const files = this.uploadedFiles();
    return files.length > 0 && files.filter((f) => f.uploaded).length === files.length;
  });
}
