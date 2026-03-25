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
import { ChangeDetectionStrategy, Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaCheckmarkTiny, VisaCopyTiny } from '@visa/nova-icons-angular';
import { ClipboardService } from 'ngx-clipboard';
import { MarkdownModule } from 'ngx-markdown';

/**
 * Chat code snippet component that displays formatted code with syntax highlighting and copy functionality.
 * Shows a copy button that displays a confirmation flag when activated, and automatically closes when clicking outside the component.
 * Replace with your choice of syntax/code highlighter.
 * #patterns #isShared
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-chat-code-snippet-single',
  templateUrl: './chat-code-snippet-single.docs.html',
  standalone: true,
  imports: [NovaLibModule, MarkdownModule, VisaCopyTiny, VisaCheckmarkTiny],
  host: {
    class: 'v-mt-12',

    '(document:click)': 'clickOut($event)'
  },
  styleUrls: ['./chat-code-snippet-single.docs.scss']
})
export class ChatCodeSnippetSingleComponent {
  readonly clipboardService = inject(ClipboardService);
  readonly el = inject(ElementRef);

  /**
   * Code text to be copied to clipboard when the copy button is activated.
   * @default ''
   */
  readonly copyData = input<string>('');

  /**
   * Analytics category for tracking copy actions.
   * @default 'Nova Angular'
   */
  readonly analyticsCategory = input<string>('Nova Angular');

  /**
   * Analytics label for tracking copy actions.
   */
  readonly analyticsLabel = input<string>();

  /**
   * Accessible label text for the copy button.
   * @default ''
   */
  readonly ariaLabelText = input<string>('');

  /**
   * Programming language of the code snippet for syntax highlighting.
   * @default 'html'
   */
  readonly codeLanguage = input<string>('html');

  /**
   * Additional CSS class names to apply to the component.
   * @default ''
   */
  readonly class = input<string>('');

  /**
   * Reference to the copy button element.
   */
  readonly copyButton = viewChild.required('copyButton', { read: ElementRef });

  /**
   * Reference to the close button element in the confirmation flag.
   */
  readonly closeButton = viewChild('copyFlagClose', { read: ElementRef });

  /**
   * Handles clicks outside the component. Closes the confirmation flag if it is open.
   * @param event - The click event from the document
   */
  clickOut(event: Event) {
    if (this.copyFlagOpen && !this.el.nativeElement.contains(event.target)) {
      this.copyFlagOpen = false;
    }
  }

  /**
   * Copies the code to the clipboard and displays a confirmation flag.
   * Sets focus to the close button after the flag appears.
   * @param event - The click event from the copy button
   */
  onCopyToClipboard() {
    this.copyFlagOpen = true;
    setTimeout(() => {
      this.closeButton()?.nativeElement.focus();
    });
    this.clipboardService.copy(this.copyData());
    this.copyButton().nativeElement.focus();
  }

  /**
   * Tracks whether the copy confirmation flag is currently displayed.
   */
  copyFlagOpen: boolean = false;

  /**
   * Closes the copy confirmation flag and returns focus to the copy button.
   */
  closeCopiedFlag() {
    this.copyFlagOpen = false;
    this.copyButton()?.nativeElement.focus();
  }
}
