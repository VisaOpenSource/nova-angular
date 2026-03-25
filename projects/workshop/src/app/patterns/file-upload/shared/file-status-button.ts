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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaReloadTiny, VisaSuccessTiny } from '@visa/nova-icons-angular';
import { UploadFile } from './types';

/**
 * Interactive status indicator for file upload progress.
 * Displays success icon when complete, progress indicator during upload,
 * or retry button when error occurs. Element role and keyboard behavior
 * adapt to current upload state.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NovaLibModule, VisaReloadTiny, VisaSuccessTiny],
  standalone: true,
  selector: '[nova-file-status-button]',
  template: `
    @if (isError()) {
      <svg v-icon-visa-reload-tiny aria-hidden="true"></svg>
    } @else {
      <div vMX="11">
        @if (isUploading()) {
          <div
            v-progress-circular
            [style.--v-progress-circular-size]="'16px'"
            [style.--v-progress-bar-thickness]="'2px'"
          >
            <span vSR role="alert">Uploading {{ uploadFile().file.name }}</span>
          </div>
        } @else {
          <svg v-icon-visa-success-tiny aria-hidden="true"></svg>
        }
      </div>
    }
  `,
  host: {
    '[attr.tabIndex]': 'isUploading() ? "-1" : "0"',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-describedby]': 'isError() ? errorId() : null',
    '[attr.role]': 'role()',
    '[class]': 'isError() ? "v-button v-button-tertiary v-button-icon" : ""',
    '[style.outline]': '!isError() ? "none" : null',
    '[style.blockSize]': 'isUploaded() ? "16px" : null',
    '(click)': 'onClick()',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class FileStatusButtonComponent {
  /**
   * File data for status display
   */
  readonly uploadFile = input.required<UploadFile>();

  /**
   * Element ID for error message association
   */
  readonly errorId = input.required<string>();

  /**
   * Emits when user retries upload
   */
  readonly onRetry = output<void>();

  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * File has upload error
   */
  readonly isError = computed(() => !!this.uploadFile().error);

  /**
   * File is currently uploading
   */
  readonly isUploading = computed(
    () => !!this.uploadFile().uploading && !this.uploadFile().error,
  );

  /**
   * File upload completed successfully
   */
  readonly isUploaded = computed(
    () =>
      !!this.uploadFile().uploaded &&
      !this.uploadFile().error &&
      !this.uploadFile().uploading,
  );

  /**
   * Accessible label describing current status and available action
   */
  readonly ariaLabel = computed(() => {
    if (this.isError()) {
      return `Retry uploading ${this.uploadFile().file.name}`;
    } else if (this.isUploading()) {
      return `Uploading ${this.uploadFile().file.name}`;
    } else if (this.isUploaded()) {
      return `Successfully uploaded ${this.uploadFile().file.name}`;
    }
    return '';
  });

  /**
   * Element role based on current state
   */
  readonly role = computed(() => (this.isError() ? 'button' : 'img'));

  /**
   * Handles click events.
   * Emits retry event when in error state.
   */
  onClick(): void {
    if (this.isError()) {
      this.onRetry.emit();
    }
  }

  /**
   * Handles keydown events.
   * Delegates to handleKeyDown when not uploading.
   * @param event - Keyboard event
   */
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isUploading()) {
      this.handleKeyDown(event);
    }
  }

  /**
   * Handles Enter and Space key presses to trigger retry.
   * Prevents default behavior for these keys.
   * @param event - Keyboard event
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onRetry.emit();
    }
  }

  /**
   * Moves keyboard focus to this element
   */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}
