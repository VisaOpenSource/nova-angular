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
  input,
  output,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdGenerator, NovaLibModule } from '@visa/nova-angular';
import {
  VisaDeleteTiny,
  VisaErrorTiny,
  VisaReloadTiny,
  VisaSuccessTiny,
} from '@visa/nova-icons-angular';
import { UploadFile } from '../types';

/**
 * Table row component displaying file upload status with retry and delete actions.
 * Shows file name, size, upload date, and current status indicator.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NovaLibModule,
    VisaDeleteTiny,
    VisaErrorTiny,
    VisaReloadTiny,
    VisaSuccessTiny,
  ],
  standalone: true,
  selector: 'tr[nova-upload-row]',
  templateUrl: './upload-row.docs.html',
})
export class UploadRowComponent {
  private readonly idGenerator = inject(IdGenerator);
  private readonly baseId = this.idGenerator.newId('file-upload-row');

  /**
   * File data to display in the row
   */
  readonly file = input.required<UploadFile>();

  /**
   * Emits when user retries upload
   */
  readonly onRetry = output<void>();

  /**
   * Emits when user deletes file
   */
  readonly onDelete = output<void>();

  private readonly statusRef =
    viewChild<ElementRef<HTMLDivElement>>('statusRef');

  /**
   * Unique element ID for error message
   */
  readonly errorId = computed(
    () => `${this.baseId}-file-list-error-${this.file().id}`,
  );

  /**
   * Formatted error message text
   */
  readonly errorMessage = computed(() =>
    this.file().error ? `Error: ${this.file().error}` : '',
  );

  /**
   * Upload date formatted as locale string
   */
  readonly uploadDateString = computed(() => {
    const uploadDate = this.file().uploadDate;
    return uploadDate ? uploadDate.toLocaleString() : '';
  });

  /**
   * Moves focus to status element and triggers retry
   */
  focusStatusAndRetry(): void {
    const ref = this.statusRef();
    if (ref?.nativeElement) {
      ref.nativeElement.focus();
    }
    this.onRetry.emit();
  }

  /**
   * Emits event to retry file upload
   */
  handleRetry(): void {
    this.onRetry.emit();
  }

  /**
   * Emits event to delete file from list
   */
  handleDelete(): void {
    this.onDelete.emit();
  }
}
