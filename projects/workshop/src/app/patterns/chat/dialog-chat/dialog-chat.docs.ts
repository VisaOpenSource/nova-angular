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
import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { DialogDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaMinimizeLow, VisaCloseLow } from '@visa/nova-icons-angular';
import { CHATS_MESSAGES } from '../shared/shared.constants';
import { UserChatBubbleComponent } from '../shared/user-chat-bubble/user-chat-bubble.docs';
import { ResponseChatBubbleComponent } from '../shared/response-chat-bubble/response-chat-bubble.docs';
import { ChatInputComponent } from '../shared/chat-input/chat-input.docs';

/**
 * Dialog chat pattern example that displays a chat interface within a modal dialog.
 * Demonstrates a chat conversation that can be opened, minimized, and closed.
 *
 * #patterns
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dialog-chat',
  standalone: true,
  imports: [
    NovaLibModule,
    ChatInputComponent,
    ResponseChatBubbleComponent,
    UserChatBubbleComponent,
    VisaCloseLow,
    VisaMinimizeLow
  ],
  templateUrl: './dialog-chat.docs.html'
})
export class DialogChatComponent {
  /**
   * Reference to the dialog element.
   */
  readonly dialog = viewChild.required<DialogDirective, ElementRef<HTMLDialogElement>>('dialogChat', {
    read: ElementRef
  });

  /**
   * Reference to the chat input component for resetting input state.
   */
  readonly chatInput = viewChild(ChatInputComponent);

  /**
   * Collection of all available chat conversations.
   */
  readonly chats = signal(CHATS_MESSAGES);

  /**
   * Currently active chat conversation displayed in the dialog.
   */
  readonly currentChat = signal(this.chats()[0]);

  /**
   * Opens the chat dialog as a modal.
   */
  showModal() {
    this.dialog().nativeElement.showModal();
  }

  /**
   * Closes the chat dialog and resets the input field.
   */
  closeModal() {
    if (!this.chatInput()) return;
    this.chatInput()?.onReset();
    this.dialog().nativeElement.close();
  }
}
