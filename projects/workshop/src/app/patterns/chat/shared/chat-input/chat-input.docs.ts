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
import { Component, output, signal, computed, input, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaAttachmentTiny, VisaErrorTiny, VisaMicrophoneTiny, VisaSendTiny } from '@visa/nova-icons-angular';

/**
 * Chat input component that provides a text input field with character counting and validation.
 * Displays validation messages when the input is empty or exceeds the character limit.
 *
 * #patterns #isShared
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'chat-input',
  templateUrl: './chat-input.docs.html',
  standalone: true,
  imports: [NovaLibModule, FormsModule, VisaMicrophoneTiny, VisaAttachmentTiny, VisaSendTiny, VisaErrorTiny]
})
export class ChatInputComponent {
  /**
   * Current text content of the input field.
   */
  readonly userMessage = signal('');

  /**
   * Maximum number of characters allowed in the input field.
   * @default 100000
   */
  readonly maxCharacters = input(100000);

  /**
   * Whether to display the character count message below the input field.
   * @default true
   */
  readonly showCharacterCount = input(true);

  /**
   * Internal validation state indicating whether the input has failed validation.
   */
  private readonly invalid = signal(false);

  /**
   * Emits the trimmed message text when the input is submitted.
   */
  readonly messageSubmitted = output<string>();

  /**
   * Current number of characters in the input field.
   */
  readonly characterCount = computed(() => this.userMessage()?.length ?? 0);

  /**
   * Whether the character count exceeds the maximum allowed characters.
   */
  readonly characterCountInvalid = computed(() => this.characterCount() > this.maxCharacters());

  /**
   * Whether the input field has an error state (invalid or over character limit).
   */
  readonly messageIsError = computed(() => this.characterCountInvalid() || this.invalid());

  /**
   * Validation feedback message displayed below the input field.
   * Returns an error message if the input is invalid, an over-limit message if the character count is exceeded,
   * or a remaining character count message otherwise.
   */
  readonly message = computed(() => {
    if (this.invalid()) return "Input field can't be empty. Please enter a message to continue.";
    if (!this.showCharacterCount()) return '';

    if (this.characterCountInvalid()) {
      const overCount = this.characterCount() - this.maxCharacters();
      return `${overCount.toLocaleString()} character${overCount !== 1 ? 's' : ''} over limit`;
    }

    const remainingCount = this.maxCharacters() - this.characterCount();
    return `${remainingCount.toLocaleString()} character${remainingCount !== 1 ? 's' : ''} remaining`;
  });

  /**
   * Validates and submits the message.
   * Emits the trimmed message through messageSubmitted if validation passes.
   * Clears the input field after successful submission.
   */
  onSubmit(): void {
    const trimmedMessage = this.userMessage().trim();
    this.invalid.set(trimmedMessage.length === 0);

    if (trimmedMessage.length === 0 || this.characterCountInvalid()) return;

    this.messageSubmitted.emit(trimmedMessage);
    this.userMessage.set('');
    this.invalid.set(false);
  }

  /**
   * Clears the invalid state when the input text changes.
   */
  onTextChange(): void {
    this.invalid.set(false);
  }

  /**
   * Clears the invalid state when focus moves away from the input field.
   */
  onBlur(): void {
    this.invalid.set(false);
  }

  /**
   * Clears both the invalid state and the input field content.
   */
  onReset(): void {
    this.invalid.set(false);
    this.userMessage.set('');
  }

  /**
   * Clears the invalid state without affecting the input field content.
   */
  resetInvalidState(): void {
    this.invalid.set(false);
  }

  /**
   * Handles keyboard input. Submits the message when Enter is pressed without the Shift key.
   * @param event - The keyboard event
   */
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSubmit();
    }
  }
}
