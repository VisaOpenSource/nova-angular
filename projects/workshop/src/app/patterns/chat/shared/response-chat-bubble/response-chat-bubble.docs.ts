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
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovaLibModule } from '@visa/nova-angular';
import { ChatActionsComponent } from '../chat-actions/chat-actions.docs';
import { MarkdownModule } from 'ngx-markdown';
import { VisaChatAiTiny, VisaFlagTiny } from '@visa/nova-icons-angular';
import { ChatCodeSnippetSingleComponent } from '../chat-code-snippet-single/chat-code-snippet-single.docs';

/**
 * Represents a response chat message with metadata.
 *
 * @property {string} timeStamp - Time the message was created
 * @property {string} message - Text content of the message, supports markdown formatting
 * @property {string} [code] - Optional code snippet associated with the message
 * @property {string} role - Identifier for the message sender (typically AI or system)
 * @property {string} id - Unique identifier for the message
 */
export interface ResponseChatBubbleType {
  timeStamp: string;
  message: string;
  code?: string;
  role: string;
  id: string;
}

/**
 * Response chat bubble component that displays messages from the AI or system.
 * Supports markdown rendering, code snippets, and includes an avatar, timestamp, and action menu.
 * Supports options to resize or hide/show the avatar, and hide/show timestamp.
 *
 * #patterns #isShared
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'response-chat-bubble',
  templateUrl: './response-chat-bubble.docs.html',
  standalone: true,
  imports: [
    CommonModule,
    ChatActionsComponent,
    ChatCodeSnippetSingleComponent,
    NovaLibModule,
    MarkdownModule,
    VisaFlagTiny,
    VisaChatAiTiny
  ]
})
export class ResponseChatBubbleComponent {
  /**
   * Whether to hide the AI avatar.
   * @default false
   */
  readonly hideAvatar = input(false, { transform: booleanAttribute });

  /**
   * Whether to display a smaller avatar size.
   * @default false
   */
  readonly smallAvatar = input(false, { transform: booleanAttribute });

  /**
   * Chat message data containing timestamp, message text, optional code, role, and identifier.
   */
  readonly response = input.required<ResponseChatBubbleType>();

  /**
   * Whether to hide the message timestamp.
   * @default false
   */
  readonly hideTimestamp = input(false, { transform: booleanAttribute });
}
