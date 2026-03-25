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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdGenerator, NovaLibModule } from '@visa/nova-angular';

import { UploadFile } from '../shared/types';
import { UploadDialogComponent } from '../shared/upload-dialog/upload-dialog.docs';
import { UploadRowComponent } from '../shared/upload-row/upload-row.docs';
import { mockUpload } from '../shared/mock-upload';
import { SharedSortButtonComponent } from '../shared/sort-button/sort-button.docs';
import {
  FILE_SIZE_10MB,
  ACCEPTED_FILE_TYPES_IMAGES,
  SortType,
  SortKeyType,
} from '../shared/file-upload.constants';
import { validateFile } from '../shared/file-upload.utils';
import { UploadSuccessFlagComponent } from '../shared/upload-success-flag/upload-success-flag.docs';
import { VisaErrorLow, VisaCloseTiny } from '@visa/nova-icons-angular';

const UPLOAD_DIALOG_TITLE = 'Upload Files';
const UPLOAD_DIALOG_DESCRIPTION =
  'Upload one or more files, up to 10 MB each. Accepted file types are .jpg, .pdf, .docx, and .xlsx. Only files that meet these requirements will be uploaded.';

function getFileStatusRank(file: UploadFile): number {
  if (file.uploading) return 1;
  if (file.uploaded && !file.error) return 2;
  return 3;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NovaLibModule,
    UploadDialogComponent,
    UploadRowComponent,
    SharedSortButtonComponent,
    UploadSuccessFlagComponent,
    VisaErrorLow,
    VisaCloseTiny,
  ],
  standalone: true,
  selector: 'nova-workshop-file-upload-with-alternate-display',
  templateUrl: './file-upload-with-alternate-display.docs.html',
})
export class FileUploadWithAlternateDisplayComponent {
  private readonly idGenerator = inject(IdGenerator);

  readonly fileInputRef =
    viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  readonly uploadedFiles = signal<UploadFile[]>([]);
  readonly queuedFiles = signal<UploadFile[]>([]);
  readonly sectionMessageDismissed = signal(false);
  readonly flagDismissed = signal(false);
  readonly sortKey = signal<SortKeyType>({
    column: 'name',
    direction: SortType.ASC,
  });

  readonly uploadQueueDialogId = this.idGenerator.newId(
    'file-upload-alternate-dialog',
  );
  readonly uploadDialogTitle = UPLOAD_DIALOG_TITLE;
  readonly uploadDialogDescription = UPLOAD_DIALOG_DESCRIPTION;

  readonly showSectionMessage = computed(() => {
    const hasErrors =
      this.erroredFiles().length > 0 && this.uploadingFiles().length === 0;
    return hasErrors && !this.sectionMessageDismissed();
  });

  readonly showFlag = computed(() => {
    return this.allFilesUploaded() && !this.flagDismissed();
  });

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
        validateFile(f, ACCEPTED_FILE_TYPES_IMAGES),
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

  handleUploadClick(): void {
    const filesToUpload = this.queuedFiles();
    this.handleCloseDialog();

    this.uploadedFiles.update((oldUploadFiles: UploadFile[]) => {
      const newUploadFiles = filesToUpload
        .filter((file) => !oldUploadFiles.some((f) => f.id === file.id))
        .map((f) => ({
          ...f,
          uploading: true,
          uploadDate: new Date(),
        }));

      newUploadFiles.forEach((newFileItem) => {
        mockUpload(newFileItem, {
          maxFileSize: FILE_SIZE_10MB,
          acceptedFileTypes: ACCEPTED_FILE_TYPES_IMAGES.map((t) => t.type),
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
            this.uploadedFiles.update((files) =>
              files.map((f) =>
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

  handleDeleteFile(fileToDelete: UploadFile): void {
    this.uploadedFiles.update((files) =>
      files.filter((file) => file.id !== fileToDelete.id),
    );
  }

  handleDeleteQueuedFile(fileToDelete: UploadFile): void {
    this.queuedFiles.update((files) =>
      files.filter((file) => file.id !== fileToDelete.id),
    );
  }

  handleRetryAll(): void {
    this.sectionMessageDismissed.set(false);
    this.erroredFiles().forEach((f) => this.handleRetryFile(f));
  }

  handleRetryFile(fileToRetry: UploadFile): void {
    this.uploadedFiles.update((files) =>
      files.map((f) =>
        f.id === fileToRetry.id
          ? { ...fileToRetry, error: undefined, uploading: true }
          : f,
      ),
    );
    this.sectionMessageDismissed.set(false);

    mockUpload(fileToRetry, {
      maxFileSize: FILE_SIZE_10MB,
      acceptedFileTypes: ACCEPTED_FILE_TYPES_IMAGES.map((t) => t.type),
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

  handleCloseDialog(): void {
    this.queuedFiles.set([]);
  }

  handleSort(column: string, direction: SortType): void {
    this.sortKey.set({ column: column, direction: direction });
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

  readonly sortedFiles = computed(() => {
    const files = [...this.uploadedFiles()];
    const column = this.sortKey().column;
    const direction = this.sortKey().direction;

    if (!column || direction === SortType.NONE) return files;

    return files.sort((a, b) => {
      if (column === 'name') {
        const result = a.file.name.localeCompare(b.file.name);
        return direction === SortType.ASC ? result : -result;
      }

      if (column === 'type') {
        const result = a.file.type.localeCompare(b.file.type);
        return direction === SortType.ASC ? result : -result;
      }

      if (column === 'status') {
        const result = getFileStatusRank(a) - getFileStatusRank(b);
        return direction === SortType.ASC ? result : -result;
      }

      if (column === 'uploadDate') {
        const aDate = a.uploadDate ? a.uploadDate.getTime() : 0;
        const bDate = b.uploadDate ? b.uploadDate.getTime() : 0;
        return direction === SortType.ASC ? aDate - bDate : bDate - aDate;
      }

      return 0;
    });
  });
}
