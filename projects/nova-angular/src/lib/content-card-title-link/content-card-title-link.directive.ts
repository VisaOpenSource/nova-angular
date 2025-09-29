/**
 *              © 2025 Visa
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
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  InputSignalWithTransform,
  Signal
} from '@angular/core';
import { ContentCardDirective } from '../content-card/content-card.directive';

@Directive({
  host: {
    class: 'v-content-card-title-link',

    '[attr.aria-disabled]': 'disabled()',

    '(click)': 'handleClick($event)'
  },
  selector: '[v-content-card-title-link]',
  standalone: true
})
export class ContentCardTitleLinkDirective {
  private readonly el: ElementRef<HTMLLinkElement> = inject(ElementRef);
  private readonly contentCard: ContentCardDirective | null = inject(ContentCardDirective, { optional: true });

  /**
   * Disables link and sets content card to disabled when true.
   * @default false
   */
  readonly disabledInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'disabled',
    transform: booleanAttribute
  });
  readonly disabled: Signal<boolean | null> = computed(
    () => this.disabledInput() ?? this.contentCard?.disabled() ?? null
  );

  readonly handleClick = (event: Event): void => {
    if (this.disabled()) event.preventDefault();
  };

  public handleParentClick(): void {
    const link = this.el.nativeElement;
    if (!link || this.disabled()) return;
    link.click();
  } // Used in content card directive to propagate click event
}
