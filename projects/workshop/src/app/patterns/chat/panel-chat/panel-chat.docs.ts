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
import { ChangeDetectionStrategy, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import { NovaLibModule, PanelDirective } from '@visa/nova-angular';
import {
  VisaEditTiny,
  VisaIdeaTiny,
  VisaSearchTiny,
  VisaOptionHorizontalTiny,
  VisaFileDownloadTiny,
  VisaDeleteTiny
} from '@visa/nova-icons-angular';
import { CHATS_MESSAGES } from '../shared/shared.constants';
import { UserChatBubbleComponent } from '../shared/user-chat-bubble/user-chat-bubble.docs';
import { ResponseChatBubbleComponent } from '../shared/response-chat-bubble/response-chat-bubble.docs';
import { ChatInputComponent } from '../shared/chat-input/chat-input.docs';

/**
 * Panel chat pattern example that displays a chat interface within a side panel.
 * Includes message bubbles, auto-scrolling, and automatic panel toggling based on open state.
 *
 * #patterns
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-panel-chat',
  standalone: true,
  imports: [
    ChatInputComponent,
    NovaLibModule,
    UserChatBubbleComponent,
    ResponseChatBubbleComponent,
    VisaOptionHorizontalTiny,
    VisaEditTiny,
    VisaIdeaTiny,
    VisaFileDownloadTiny,
    VisaSearchTiny,
    VisaDeleteTiny
  ],
  templateUrl: './panel-chat.docs.html',
  styleUrls: ['./panel-chat.docs.scss']
})
export class PanelChatComponent {
  /**
   * Reference to the panel element.
   */
  readonly panel = viewChild<PanelDirective, ElementRef<HTMLDialogElement>>(PanelDirective, {
    read: ElementRef
  });

  /**
   * Reference to the scrollable chat messages container.
   */
  readonly chatContainer = viewChild<ElementRef, ElementRef<HTMLDivElement>>('chatContainer', {
    read: ElementRef
  });

  /**
   * Whether the panel is currently open.
   */
  readonly panelOpen = signal(false);

  /**
   * Effect that automatically opens or closes the panel dialog when panelOpen state changes.
   */
  readonly panelOpenEffect = effect(() => {
    this.panelOpen() ? this.panel()?.nativeElement.showModal() : this.panel()?.nativeElement.close?.();
  });

  /**
   * Effect that automatically scrolls to the bottom of the chat container when new messages are added.
   */
  readonly autoScrollEffect = effect(() => {
    const messages = this.currentChat().messages;
    const container = this.chatContainer()?.nativeElement;
    if (container && messages.length > 0) {
      setTimeout(() => {
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 0);
    }
  });

  /**
   * Collection of all available chat conversations.
   */
  readonly chats = signal(CHATS_MESSAGES);

  /**
   * Currently active chat conversation displayed in the panel.
   */
  readonly currentChat = signal(this.chats()[0]);

  /**
   * Current user message text being composed.
   */
  userMessage = '';

  /**
   * Toggles the panel between open and closed states.
   */
  togglePanel() {
    this.panelOpen.update((open) => !open);
  }

  /**
   * Sends the current user message to the chat.
   * Creates a new message with timestamp and updates the chat history.
   */
  handleSendMessage() {
    if (this.userMessage.trim()) {
      const newMessage = {
        id: crypto.randomUUID(),
        role: 'User 1',
        message: this.userMessage,
        timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      this.currentChat.update((chat) => {
        chat.messages.push(newMessage);
        chat.lastMessage = this.userMessage;
        chat.lastMessageTimeStamp = new Date();
        return chat;
      });
      this.userMessage = '';
    }
  }
}
