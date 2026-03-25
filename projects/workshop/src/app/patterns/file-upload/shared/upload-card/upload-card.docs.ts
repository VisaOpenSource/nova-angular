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
import { ChangeDetectionStrategy, Component, computed, inject, input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdGenerator, NovaLibModule } from '@visa/nova-angular';
import {
  VisaDocumentPdfLow,
  VisaDocumentLow,
  VisaDocumentPngLow,
  VisaDocumentJpgLow,
  VisaErrorTiny
} from '@visa/nova-icons-angular';
import { UploadFile } from '../types';

/**
 * Card component displaying file information with icon, name, size, and actions.
 * Shows error state with message when upload fails.
 * #patterns #isShared
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NovaLibModule,
    VisaDocumentPdfLow,
    VisaDocumentLow,
    VisaDocumentPngLow,
    VisaDocumentJpgLow,
    VisaErrorTiny
  ],
  standalone: true,
  selector: 'li[nova-upload-card]',
  templateUrl: './upload-card.docs.html'
})
export class UploadCardComponent {
  private readonly idGenerator = inject(IdGenerator);
  private readonly baseId = this.idGenerator.newId('file-upload-card');

  /**
   * File data to display in the card
   */
  readonly file = input.required<UploadFile>();

  /**
   * Template for action buttons with error context
   */
  readonly actionsTemplate = input.required<TemplateRef<{ errorId: string }>>();

  /**
   * Unique element ID for error message
   */
  readonly errorId = computed(() => `${this.baseId}-file-list-error-${this.file().id}`);

  /**
   * Unique element ID for file name
   */
  readonly fileNameId = computed(() => `${this.baseId}-${this.file().id}-name`);

  /**
   * Unique element ID for file size
   */
  readonly fileSizeId = computed(() => `${this.baseId}-${this.file().id}-size`);

  /**
   * Formatted error message text
   */
  readonly errorMessage = computed(() => (this.file().error ? `Error: ${this.file().error}` : ''));

  /**
   * File size formatted in megabytes
   */
  readonly fileSize = computed(() => `${(this.file().file.size / (1024 * 1024)).toFixed(2)} MB`);

  /**
   * Icon identifier for the file type
   */
  readonly fileIcon = computed(() => this.file().icon);
}
