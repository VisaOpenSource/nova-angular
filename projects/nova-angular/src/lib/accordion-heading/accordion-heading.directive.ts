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
import { AfterContentInit, Directive, inject } from '@angular/core';
import { AccordionDirective } from '../accordion/accordion.directive';
import { ButtonColor, ButtonSize } from '../button/button.constants';
import { ButtonDirective } from '../button/button.directive';

@Directive({
  host: {
    class: 'v-accordion-heading',

    '[style.--v-button-default-background]': 'accordion?.subtle() ? "transparent" : null',
    '[style.--v-accordion-background]': 'accordion?.subtle() ? "transparent" : null',
    '[style.--v-button-default-gap]': 'accordion?.subtle() ? "2px" : null',
    '[style.--v-accordion-items-gap]': 'accordion?.subtle() ? "2px" : null',
    '[style.--v-accordion-foreground-initial]':
      'accordion?.subtle() && !(hostButton?.disabled() || hostButton?.ariaDisabled()) ? "var(--palette-default-active)" : null' // only apply subtle foreground color if the button is not disabled
  },
  selector: '[v-accordion-heading]',
  standalone: true
})
export class AccordionHeadingDirective implements AfterContentInit {
  readonly accordion: AccordionDirective | null = inject(AccordionDirective, { optional: true, host: true });
  public readonly hostButton: ButtonDirective | null = inject(ButtonDirective, { optional: true });

  ngAfterContentInit(): void {
    // [v-button][v-accordion-heading] instance
    if (!this.hostButton) return;
    this.hostButton.buttonSizeInternal.set(ButtonSize.LARGE);
    this.hostButton.buttonColorInternal.set(this.accordion?.subtle() ? ButtonColor.TERTIARY : ButtonColor.SECONDARY);
  }
}
