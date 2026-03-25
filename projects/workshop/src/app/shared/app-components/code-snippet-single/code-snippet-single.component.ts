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
import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaCloseTiny, VisaCopyTiny } from '@visa/nova-icons-angular';
import { ClipboardService } from 'ngx-clipboard';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'nova-workshop-code-snippet-single',
  templateUrl: './code-snippet-single.component.html',
  standalone: true,
  imports: [NovaLibModule, MarkdownModule, VisaCopyTiny, VisaCloseTiny],
  host: {
    class: 'w-code-snippet v-mt-12',

    '(document:click)': 'clickOut($event)'
  },
  styleUrls: ['./code-snippet-single.component.scss']
})
export class CodeSnippetSingleComponent {
  readonly $gaService = inject(GoogleAnalyticsService);
  readonly _clipboardService = inject(ClipboardService);
  readonly el = inject(ElementRef);
  readonly copyData = input<string>('');
  readonly analyticsCategory = input<string>('Nova Angular');
  readonly analyticsLabel = input<string>();
  readonly ariaLabelText = input<string>('');
  readonly codeLanguage = input<string>('html');

  /**
   * Add your own styling class.
   */
  readonly class = input<string>('');
  readonly copyButton = viewChild.required('copyButton', { read: ElementRef });
  readonly closeButton = viewChild('copyFlagClose', { read: ElementRef });

  clickOut(event: Event) {
    // listen for document click and close flag if click is outside of component
    if (this.copyFlagOpen && !this.el.nativeElement.contains(event.target)) {
      this.copyFlagOpen = false;
    }
  }

  onCopyToClipboard(event: Event) {
    this.copyFlagOpen = true;
    setTimeout(() => {
      this.closeButton()?.nativeElement.focus();
    });
    this._clipboardService.copy(this.copyData());
    this.copyButton().nativeElement.focus();
    this.$gaService.event('copy_code', this.analyticsCategory(), this.analyticsLabel());
  }

  copyFlagOpen: boolean = false;
  closeCopiedFlag() {
    this.copyFlagOpen = false;
    this.copyButton()?.nativeElement.focus();
  }
}
