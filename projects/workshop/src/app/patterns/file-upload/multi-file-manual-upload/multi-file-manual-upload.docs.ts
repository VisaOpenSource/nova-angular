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
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdGenerator, NovaLibModule } from '@visa/nova-angular';

import { UploadFile } from '../shared/types';
import { UploadCardComponent } from '../shared/upload-card/upload-card.docs';
import { UploadDialogComponent } from '../shared/upload-dialog/upload-dialog.docs';
import { FileStatusButtonComponent } from '../shared/file-status-button';
import { mockUpload } from '../shared/mock-upload';
import {
  FILE_SIZE_10MB,
  ACCEPTED_FILE_TYPES_EXTENDED,
} from '../shared/file-upload.constants';
import { validateFile } from '../shared/file-upload.utils';
import { UploadSuccessFlagComponent } from '../shared/upload-success-flag/upload-success-flag.docs';
import {
  VisaErrorLow,
  VisaCloseTiny,
  VisaDeleteTiny,
} from '@visa/nova-icons-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NovaLibModule,
    UploadCardComponent,
    UploadDialogComponent,
    FileStatusButtonComponent,
    UploadSuccessFlagComponent,
    VisaErrorLow,
    VisaCloseTiny,
    VisaDeleteTiny,
  ],
  standalone: true,
  selector: 'nova-workshop-multi-file-manual-upload',
  templateUrl: './multi-file-manual-upload.docs.html',
})
export class MultiFileManualUploadComponent {
  private readonly idGenerator = inject(IdGenerator);

  readonly selectFilesButtonRef =
    viewChild.required<ElementRef<HTMLButtonElement>>('selectFilesButton');
  readonly fileInputRef =
    viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
  readonly retryButtons = viewChildren(FileStatusButtonComponent);

  readonly uploadedFiles = signal<UploadFile[]>([]);
  readonly queuedFiles = signal<UploadFile[]>([]);
  readonly sectionMessageDismissed = signal(false);
  readonly flagDismissed = signal(false);

  readonly uploadQueueDialogId = this.idGenerator.newId(
    'file-upload-manual-dialog',
  );
  readonly uploadDialogTitle = 'Upload files';
  readonly uploadDialogDescription =
    'Upload one or more files, up to 10 MB each. Accepted file types are .jpg, .pdf, .docx, and .xlsx. Only files that meet these requirements will be uploaded.';

  readonly showSectionMessage = computed(() => {
    const hasErrors =
      this.erroredFiles().length > 0 && this.uploadingFiles().length === 0;
    return hasErrors && !this.sectionMessageDismissed();
  });

  readonly showFlag = computed(() => {
    return this.allFilesUploaded() && !this.flagDismissed();
  });

  processFiles(files: FileList): void {
    const filesArray = Array.from(files);
    const validatedFiles: UploadFile[] = filesArray.map((f) =>
      validateFile(f, ACCEPTED_FILE_TYPES_EXTENDED),
    );

    this.uploadedFiles.update((prevValidatedFiles: UploadFile[]) => {
      const newlyValidatedFiles = validatedFiles
        .filter((file) => !prevValidatedFiles.some((f) => f.id === file.id))
        .map((f) => ({ ...f, uploading: true }));

      newlyValidatedFiles.forEach((newFileItem) => {
        mockUpload(newFileItem, {
          maxFileSize: FILE_SIZE_10MB,
          acceptedFileTypes: ACCEPTED_FILE_TYPES_EXTENDED.map((t) => t.type),
        })
          .then(() => {
            this.uploadedFiles.update((current) =>
              current.map((f) =>
                f.file === newFileItem.file
                  ? { ...f, uploading: false, uploaded: true, error: undefined }
                  : f,
              ),
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
                      error:
                        err?.message ||
                        'Failed to upload file. Please try again.',
                    }
                  : f,
              ),
            );
          });
      });

      return [...prevValidatedFiles, ...newlyValidatedFiles];
    });
  }

  handleSelectFilesClick(): void {
    const fileInput = this.fileInputRef();
    if (fileInput) {
      fileInput.nativeElement.click();
    }
  }

  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      const uploadFiles: UploadFile[] = filesArray.map((f) =>
        validateFile(f, ACCEPTED_FILE_TYPES_EXTENDED),
      );

      this.queuedFiles.update((prevQueuedFiles: UploadFile[]) => {
        const newlyQueuedFiles = uploadFiles.filter(
          (file) => !prevQueuedFiles.some((f) => f.id === file.id),
        );

        return [...prevQueuedFiles, ...newlyQueuedFiles];
      });

      // Reset the input value so the same file can be selected again
      input.value = '';
    }
  }

  handleDeleteFile(fileToDelete: UploadFile): void {
    this.uploadedFiles.update((files) =>
      files.filter((file) => file.id !== fileToDelete.id),
    );
  }

  handleRetryAll(): void {
    this.sectionMessageDismissed.set(false);
    this.erroredFiles().forEach((f) => this.handleRetryFile(f));
  }

  handleRetryFile(fileToRetry: UploadFile): void {
    const validatedFile = validateFile(
      fileToRetry.file,
      ACCEPTED_FILE_TYPES_EXTENDED,
    );

    this.uploadedFiles.update((files) =>
      files.map((f) =>
        f.id === fileToRetry.id ? { ...validatedFile, uploading: true } : f,
      ),
    );
    this.sectionMessageDismissed.set(false);

    mockUpload(fileToRetry, {
      maxFileSize: FILE_SIZE_10MB,
      acceptedFileTypes: ACCEPTED_FILE_TYPES_EXTENDED.map((t) => t.type),
    })
      .then(() => {
        this.uploadedFiles.update((files) =>
          files.map((f) =>
            f.file.name === fileToRetry.file.name &&
            f.file.size === fileToRetry.file.size
              ? { ...f, uploading: false, uploaded: true, error: undefined }
              : f,
          ),
        );
        this.flagDismissed.set(false);
      })
      .catch((err: Error) => {
        this.uploadedFiles.update((files) =>
          files.map((f) =>
            f.file.name === fileToRetry.file.name &&
            f.file.size === fileToRetry.file.size
              ? {
                  ...f,
                  uploading: false,
                  uploaded: false,
                  error:
                    err?.message || 'Failed to upload file. Please try again.',
                }
              : f,
          ),
        );
      });
  }

  handleSectionMessageClose(): void {
    this.sectionMessageDismissed.set(true);
  }

  handleFlagClose(): void {
    this.flagDismissed.set(true);
  }

  handleErrorFileClick(event: Event, fileId: string): void {
    event.preventDefault();
    this.focusRetryButton(fileId);
  }

  focusRetryButton(fileId: string): void {
    const buttons = this.retryButtons();
    const targetButton = buttons.find((btn) => btn.uploadFile().id === fileId);
    if (targetButton) {
      targetButton.focus();
    }
  }

  handleUploadClick(): void {
    const filesToUpload = this.queuedFiles();
    this.handleCloseDialog();

    this.uploadedFiles.update((oldUploadFiles: UploadFile[]) => {
      const newUploadFiles = filesToUpload
        .filter((file) => !oldUploadFiles.some((f) => f.id === file.id))
        .map((f) => ({
          ...f,
          uploading: true,
        }));

      newUploadFiles.forEach((newFileItem) => {
        mockUpload(newFileItem, {
          maxFileSize: FILE_SIZE_10MB,
          acceptedFileTypes: ACCEPTED_FILE_TYPES_EXTENDED.map((t) => t.type),
        })
          .then(() => {
            this.uploadedFiles.update((oldUploadFiles) =>
              oldUploadFiles.map((f) =>
                f.file === newFileItem.file
                  ? { ...f, uploading: false, uploaded: true, error: undefined }
                  : f,
              ),
            );
            this.flagDismissed.set(false);
          })
          .catch((err: Error) => {
            this.uploadedFiles.update((oldUploadFiles) =>
              oldUploadFiles.map((f) =>
                f.file === newFileItem.file
                  ? {
                      ...f,
                      uploading: false,
                      uploaded: false,
                      error:
                        err?.message ||
                        'Failed to upload file. Please try again.',
                    }
                  : f,
              ),
            );
            this.sectionMessageDismissed.set(false);
          });
      });

      return [...oldUploadFiles, ...newUploadFiles];
    });
  }

  handleDeleteQueuedFile(fileToDelete: UploadFile): void {
    this.queuedFiles.update((files) =>
      files.filter((file) => file.id !== fileToDelete.id),
    );
  }

  handleCloseDialog(): void {
    this.queuedFiles.set([]);
  }

  readonly erroredFiles = computed(() =>
    this.uploadedFiles().filter((f) => !!f.error),
  );

  readonly uploadingFiles = computed(() =>
    this.uploadedFiles().filter((f) => !!f.uploading),
  );

  readonly allFilesUploaded = computed(() => {
    const files = this.uploadedFiles();
    return (
      files.length > 0 &&
      files.filter((f) => f.uploaded).length === files.length
    );
  });

  readonly isDialogOpen = computed(() => this.queuedFiles().length > 0);
}
