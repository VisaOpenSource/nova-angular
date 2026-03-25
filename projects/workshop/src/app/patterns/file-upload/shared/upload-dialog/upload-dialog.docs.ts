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
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdGenerator, NovaLibModule } from '@visa/nova-angular';
import { VisaCloseTiny, VisaDeleteTiny } from '@visa/nova-icons-angular';
import { UploadFile } from '../types';
import { UploadCardComponent } from '../upload-card/upload-card.docs';

/**
 * Modal dialog for file selection and upload queue management.
 * Uses native HTML dialog element for accessibility and modal behavior.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NovaLibModule,
    VisaCloseTiny,
    VisaDeleteTiny,
    UploadCardComponent,
  ],
  standalone: true,
  selector: 'nova-upload-dialog',
  templateUrl: './upload-dialog.docs.html',
})
export class UploadDialogComponent {
  private readonly idGenerator = inject(IdGenerator);

  /**
   * Dialog visibility state
   */
  readonly isOpen = input<boolean>(false);

  /**
   * Dialog heading text
   */
  readonly title = input<string>('Upload files');

  /**
   * Dialog explanatory text
   */
  readonly description = input<string>('');

  /**
   * Files waiting to be uploaded
   */
  readonly queuedFiles = input<UploadFile[]>([]);

  /**
   * Unique identifier for the dialog element
   */
  readonly dialogId = input<string>(this.idGenerator.newId('upload-dialog'));

  /**
   * Emits when user selects files
   */
  readonly onSelectFiles = output<void>();

  /**
   * Emits when user initiates upload
   */
  readonly onUpload = output<void>();

  /**
   * Emits when user closes dialog
   */
  readonly onClose = output<void>();

  /**
   * Emits when user removes a file from queue
   */
  readonly onDeleteQueuedFile = output<UploadFile>();

  private readonly dialogRef =
    viewChild<ElementRef<HTMLDialogElement>>('dialog');

  /**
   * Unique element ID for dialog title
   */
  readonly titleId = computed(() => `${this.dialogId()}-title`);

  /**
   * Unique element ID for dialog description
   */
  readonly descriptionId = computed(() => `${this.dialogId()}-description`);

  /**
   * Opens or closes dialog when isOpen input changes
   */
  readonly dialogOpenEffect = effect(() => {
    const dialog = this.dialogRef();
    const isOpen = this.isOpen();

    if (!dialog?.nativeElement) return;

    if (isOpen) {
      this.openDialog();
    } else {
      this.closeDialog();
    }
  });

  /**
   * Opens the native dialog element as modal
   */
  private openDialog(): void {
    const dialog = this.dialogRef();
    if (
      dialog?.nativeElement &&
      typeof dialog.nativeElement.showModal === 'function'
    ) {
      dialog.nativeElement.showModal();
    }
  }

  /**
   * Closes the native dialog element
   */
  private closeDialog(): void {
    const dialog = this.dialogRef();
    if (
      dialog?.nativeElement &&
      typeof dialog.nativeElement.close === 'function'
    ) {
      dialog.nativeElement.close();
    }
  }

  /**
   * Emits event to trigger file selection dialog
   */
  handleSelectFiles(): void {
    this.onSelectFiles.emit();
  }

  /**
   * Emits event to initiate upload of queued files
   */
  handleUpload(): void {
    this.onUpload.emit();
  }

  /**
   * Emits event to close the dialog
   */
  handleClose(): void {
    this.onClose.emit();
  }

  /**
   * Emits event to remove a file from the upload queue
   * @param file - File to remove from queue
   */
  handleDeleteQueuedFile(file: UploadFile): void {
    this.onDeleteQueuedFile.emit(file);
  }

  /**
   * Handles keyboard events for the dialog.
   * Closes dialog when Escape key is pressed.
   * @param event - Keyboard event
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.handleClose();
    }
  }
}
