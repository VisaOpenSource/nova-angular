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
  afterNextRender,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';

@Directive({
  host: {
    rel: 'noopener noreferrer',
    target: 'blank',

    '[attr.aria-label]': 'ariaLabel()'
  },
  selector: '[vOpensInNewTab], ',
  standalone: true
})
export class OpensInNewTabDirective {
  constructor() {
    afterNextRender({
      read: () => {
        // Ensure the textContent is trimmed to avoid leading/trailing whitespace issues
        this.textContent.set(this.el.nativeElement.textContent?.trim() || null);
      }
    });
  }

  private readonly el: ElementRef<HTMLAnchorElement> = inject(ElementRef);
  private readonly textContent: WritableSignal<string | null> = signal(null);

  /**
   * Allows user to set custom aria-label attribute.
   * @default '&lt;inner-text-of-link&gt; (opens in new tab)'
   */
  readonly ariaLabelInput: InputSignal<string | null> = input<string | null>(null, { alias: 'aria-label' });
  readonly ariaLabel: Signal<string | null> = computed(() => {
    const textContent = this.textContent();
    // If ariaLabelInput is set, use it; otherwise, construct a default label
    const customLabel = textContent ? `${textContent} (opens in new tab)` : null;
    return this.ariaLabelInput() ?? customLabel;
  });
}
