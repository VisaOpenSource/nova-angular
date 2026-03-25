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
import { ChatActionsComponent } from '../chat-actions/chat-actions.docs';
import { NovaLibModule } from '@visa/nova-angular';
import { ResponseChatBubbleType } from '../response-chat-bubble/response-chat-bubble.docs';

/**
 * Represents a user chat message with metadata.
 *
 * @property {string} timeStamp - Time the message was created
 * @property {string} message - Text content of the message
 * @property {string} [code] - Optional code snippet associated with the message
 * @property {string} role - Identifier for the message sender
 * @property {string} id - Unique identifier for the message
 */
export interface UserChatBubbleType {
  timeStamp: string;
  message: string;
  code?: string;
  role: string;
  id: string;
}

/**
 * User chat bubble component that displays messages sent by the user.
 * Includes an avatar, message content, timestamp, and action menu.
 * Supports options to resize or hide/show the avatar, and hide/show timestamp.
 *
 * #patterns #isShared
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'user-chat-bubble',
  templateUrl: './user-chat-bubble.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, ChatActionsComponent]
})
export class UserChatBubbleComponent {
  /**
   * Whether to hide the user avatar.
   * @default false
   */
  readonly hideAvatar = input(false, { transform: booleanAttribute });

  /**
   * Whether to display a smaller avatar size.
   * @default false
   */
  readonly smallAvatar = input(false, { transform: booleanAttribute });

  /**
   * Chat message data containing timestamp, message text, role, and identifier.
   */
  readonly response = input.required<ResponseChatBubbleType>();

  /**
   * Whether to hide the message timestamp.
   * @default false
   */
  readonly hideTimestamp = input(false, { transform: booleanAttribute });
}
