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
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';

import { VisaCloseTiny, VisaDeleteTiny, VisaErrorLow } from '@visa/nova-icons-angular';
import { FileStatusButtonComponent } from '../shared/file-status-button';
import { ACCEPTED_FILE_TYPES_IMAGES, FILE_SIZE_25MB } from '../shared/file-upload.constants';
import { validateFile } from '../shared/file-upload.utils';
import { mockUpload } from '../shared/mock-upload';
import { UploadFile } from '../shared/types';
import { UploadCardComponent } from '../shared/upload-card/upload-card.docs';
import { UploadSuccessFlagComponent } from '../shared/upload-success-flag/upload-success-flag.docs';

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
  selector: 'nova-workshop-single-file-upload',
  templateUrl: './single-file-upload.docs.html'
})
export class SingleFileUploadComponent {
  readonly fileInputRef = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  readonly uploadedFile = signal<UploadFile | undefined>(undefined);
  readonly sectionMessageDismissed = signal(false);
  readonly flagDismissed = signal(false);

  readonly showSectionMessage = computed(() => {
    const file = this.uploadedFile();
    return !!file?.error && !this.sectionMessageDismissed();
  });

  readonly showFlag = computed(() => {
    const file = this.uploadedFile();
    return !!file?.uploaded && !this.flagDismissed();
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
      const file = files[0];
      const uploadFile = validateFile(file, ACCEPTED_FILE_TYPES_IMAGES);

      this.uploadedFile.set({ ...uploadFile, uploading: true });

      mockUpload(uploadFile, {
        maxFileSize: FILE_SIZE_25MB,
        acceptedFileTypes: ACCEPTED_FILE_TYPES_IMAGES.map((t) => t.type)
      })
        .then(() => {
          this.uploadedFile.update((previousFile) => {
            if (!previousFile) {
              return undefined;
            }
            if (previousFile.id !== uploadFile.id) {
              return previousFile;
            }
            return {
              ...uploadFile,
              uploading: false,
              uploaded: true,
              error: undefined
            };
          });
          this.flagDismissed.set(false);
        })
        .catch((err: Error) => {
          this.uploadedFile.update((previousFile) => {
            if (!previousFile) {
              return undefined;
            }
            if (previousFile.id !== uploadFile.id) {
              return previousFile;
            }
            return {
              ...uploadFile,
              uploading: false,
              uploaded: false,
              error: err?.message || 'Failed to upload file. Please try again.'
            };
          });
          this.sectionMessageDismissed.set(false);
        });
    }

    // Reset the input value so the same file can be selected again
    input.value = '';
  }

  handleDeleteFile(): void {
    this.uploadedFile.set(undefined);
  }

  handleRetryFile(fileToRetry: UploadFile): void {
    const validatedFile = validateFile(fileToRetry.file, ACCEPTED_FILE_TYPES_IMAGES);

    this.uploadedFile.set({ ...validatedFile, uploading: true });
    this.sectionMessageDismissed.set(false);

    mockUpload(fileToRetry, {
      maxFileSize: FILE_SIZE_25MB,
      acceptedFileTypes: ACCEPTED_FILE_TYPES_IMAGES.map((t) => t.type)
    })
      .then(() => {
        this.uploadedFile.update((previousFile) => {
          if (!previousFile) {
            return undefined;
          }
          if (previousFile.id !== fileToRetry.id) {
            return previousFile;
          }
          return {
            ...fileToRetry,
            uploading: false,
            uploaded: true,
            error: undefined
          };
        });
        this.flagDismissed.set(false);
      })
      .catch((err: Error) => {
        this.uploadedFile.update((previousFile) => {
          if (!previousFile) {
            return undefined;
          }
          if (previousFile.id !== fileToRetry.id) {
            return previousFile;
          }
          return {
            ...fileToRetry,
            uploading: false,
            uploaded: false,
            error: err?.message || 'Failed to upload file. Please try again.'
          };
        });
      });
  }

  handleSectionMessageClose(): void {
    this.sectionMessageDismissed.set(true);
  }

  handleFlagClose(): void {
    this.flagDismissed.set(true);
  }
}
