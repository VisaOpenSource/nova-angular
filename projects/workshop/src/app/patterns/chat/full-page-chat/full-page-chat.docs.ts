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
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaPinOutlineTiny,
  VisaOptionHorizontalTiny,
  VisaEditTiny,
  VisaSearchTiny,
  VisaFileDownloadTiny,
  VisaIdeaTiny,
  VisaDeleteTiny
} from '@visa/nova-icons-angular';
import { UserChatBubbleComponent } from '../shared/user-chat-bubble/user-chat-bubble.docs';
import { ResponseChatBubbleComponent } from '../shared/response-chat-bubble/response-chat-bubble.docs';
import { ChatInputComponent } from '../shared/chat-input/chat-input.docs';
import { ChatSuggestionsComponent } from '../shared/chat-suggestions/chat-suggestions.docs';
import { FullPageNavigationComponent } from '../shared/full-page-navigation/full-page-navigation.docs';
import { CHATS_MESSAGES } from '../shared/shared.constants';

/**
 * Full-page chat pattern example that demonstrates a complete chat interface.
 * Includes collapsible navigation, chat history, message bubbles, suggestions, and auto-scrolling.
 * Starts with an empty chat displaying welcome content and suggestion chips.
 *
 * #patterns
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-full-page-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NovaLibModule,
    ChatInputComponent,
    ChatSuggestionsComponent,
    UserChatBubbleComponent,
    ResponseChatBubbleComponent,
    FullPageNavigationComponent,
    VisaPinOutlineTiny,
    VisaOptionHorizontalTiny,
    VisaEditTiny,
    VisaSearchTiny,
    VisaFileDownloadTiny,
    VisaIdeaTiny,
    VisaDeleteTiny
  ],
  templateUrl: "./full-page-chat.docs.html",
  styleUrls: ["./full-page-chat.docs.scss"]
})
export class FullPageChatComponent {
  /**
   * Reference to the scrollable chat messages container.
   */
  readonly chatContainer = viewChild<ElementRef, ElementRef<HTMLDivElement>>('chatContainer', {
    read: ElementRef
  });

  /**
   * Reference to the chat input component for managing input state.
   */
  readonly chatInput = viewChild(ChatInputComponent);

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
   * Whether the dropdown menu is currently open.
   */
  readonly dropdownOpen = signal(false);

  /**
   * Collection of all available chat conversations.
   */
  readonly chats = signal(CHATS_MESSAGES);

  /**
   * Currently active chat conversation with messages and metadata.
   * Initialized as an empty chat to display welcome content and suggestions.
   */
  readonly currentChat = signal({
    id: crypto.randomUUID(),
    title: 'New Chat',
    unreadCount: 0,
    lastMessage: '',
    lastMessageTimeStamp: new Date(),
    isPinned: false,
    messages: [] as Array<{
      id: string;
      role: string;
      message: string;
      code?: string;
      timeStamp: string;
    }>
  });

  /**
   * Current user message text being composed.
   */
  userMessage = '';

  /**
   * Messages from the current chat conversation.
   */
  readonly responses = computed(() => this.currentChat().messages || []);

  /**
   * Whether to display the welcome content and suggestion chips (when no messages exist).
   */
  readonly shouldShowWelcomeContent = computed(() => this.currentChat().messages.length === 0);

  /**
   * Handles selection of a suggestion chip.
   * Adds the suggestion as a user message, resets input validation state, and triggers an automatic response.
   * @param newMessages - Array of messages to add to the conversation
   */
  onSuggestionSelected(newMessages: any[]): void {
    this.chatInput()?.resetInvalidState();

    this.currentChat.update((chat) => ({
      ...chat,
      messages: [...chat.messages, ...newMessages]
    }));

    this.addChatbotResponse();
  }

  /**
   * Handles submission of a user message from the chat input.
   * Creates a new message with timestamp and triggers an automatic chatbot response.
   * @param message - The message text submitted by the user
   */
  onChatInputSubmitted(message: string): void {
    if (message.trim()) {
      const newMessage = {
        id: crypto.randomUUID(),
        timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: message,
        role: 'User 1'
      };

      this.currentChat.update((chat) => ({
        ...chat,
        messages: [...chat.messages, newMessage]
      }));

      this.addChatbotResponse();
    }
  }

  /**
   * Adds an automatic chatbot response message with example code to the current chat.
   * Should be replaced with your own implementation to return intended responses.
   */
  private addChatbotResponse(): void {
    const chatbotMessage = {
      id: crypto.randomUUID(),
      timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: `Here is the code for the default horizontal navigation from VPDS Nova CSS:`,
      code: `
<header class="v-nav v-nav-horizontal v-alternate v-icon-two-color v-justify-content-between">
 <button aria-label="open menu" class="v-button v-button-icon v-button-tertiary v-button-large v-desktop-container-hide" type="button">
 <VisaMenuLow />
 </button>
 </header>`,
      role: 'User 2'
    };

    this.currentChat.update((chat) => ({
      ...chat,
      messages: [...chat.messages, chatbotMessage]
    }));
  }

  /**
   * Starts a new chat conversation by resetting to an empty messages array.
   * The empty state triggers the UI to display welcome content and suggestions.
   */
  onNewChatStarted(): void {
    this.currentChat.set({
      id: crypto.randomUUID(),
      title: 'New Chat',
      unreadCount: 0,
      lastMessage: '',
      lastMessageTimeStamp: new Date(),
      isPinned: false,
      messages: []
    });
  }
}
