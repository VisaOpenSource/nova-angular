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
  booleanAttribute,
  computed,
  contentChild,
  Directive,
  forwardRef,
  input,
  InputSignalWithTransform,
  Signal
} from '@angular/core';
import { ContentCardTitleLinkDirective } from '../content-card-title-link/content-card-title-link.directive';

@Directive({
  host: {
    class: 'v-content-card',

    '[attr.aria-disabled]': 'disabled()',
    '[class.v-content-card-border-block-end]': 'indicator()',

    '(click)': 'handleClick()',
    '(keydown.space)': 'handleSpaceKeydown($event)'
  },
  selector: '[v-content-card]',
  standalone: true
})
export class ContentCardDirective {
  private readonly titleLink: Signal<ContentCardTitleLinkDirective | undefined> = contentChild(
    forwardRef(() => ContentCardTitleLinkDirective)
  );

  /**
   * Transforms card into a clickable card when true.
   * @default false
   */
  readonly clickable: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Displays indicator line at the bottom of the card when true.
   * @default false
   */
  readonly indicator: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets component as disabled when true.
   * @default false
   */
  readonly disabledInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'disabled',
    transform: booleanAttribute
  });
  public readonly disabled: Signal<boolean | null | undefined> = computed(
    () => this.disabledInput() ?? this.titleLink()?.disabledInput()
  );

  handleClick(): void {
    if (!this.clickable()) return;
    this.titleLink()?.handleParentClick();
  }

  handleSpaceKeydown(event: Event): void {
    if (!this.clickable()) return;
    //to prevent unnecessary scrolling
    event.preventDefault();
  }
}
