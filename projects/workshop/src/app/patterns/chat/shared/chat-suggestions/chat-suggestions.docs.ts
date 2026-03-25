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
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovaLibModule } from '@visa/nova-angular';

/**
 * Represents a chat message with timestamp, content, and role information.
 *
 * @property {string} timeStamp - Time the message was created, formatted as a string
 * @property {string} message - Text content of the message
 * @property {string} role - Identifier for the message sender
 */
interface ChatMessage {
  timeStamp: string;
  message: string;
  role: string;
}

/**
 * Chat suggestions component that displays clickable suggestion chips.
 * When a suggestion is selected, it emits a chat message with the suggestion text.
 *
 * #patterns #isShared
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-chat-suggestions',
  standalone: true,
  imports: [CommonModule, NovaLibModule],
  templateUrl: './chat-suggestions.docs.html'
})
export class ChatSuggestionsComponent {
  /**
   * Element ID for the suggestions container.
   */
  readonly id = 'chat-suggestion';

  /**
   * Array of suggestion text strings displayed as chips.
   */
  readonly chips = ['How do I reset my password?', 'Summarize a document', 'Find a report'];

  /**
   * Emits an array containing the selected suggestion as a chat message.
   */
  readonly suggestionSelected = output<ChatMessage[]>();

  /**
   * Handles suggestion chip selection. Creates a chat message from the suggestion text and emits it.
   * @param suggestion - The suggestion text that was selected
   */
  onSuggestionClick(suggestion: string): void {
    const newMessage: ChatMessage = {
      timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: suggestion,
      role: 'User 1'
    };

    this.suggestionSelected.emit([newMessage]);
  }
}
