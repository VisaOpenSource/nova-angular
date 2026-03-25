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
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  InputSignalWithTransform,
  Signal,
  ViewEncapsulation,
  WritableSignal,
  booleanAttribute,
  computed,
  contentChild,
  forwardRef,
  inject,
  input,
  signal
} from '@angular/core';
import { AccordionDetailsDirective } from '../accordion-item/accordion-item.directive';
import { ButtonDirective } from '../button/button.directive';
import { IconToggleDefaultTemplateDirective } from '../icon-toggle-default/icon-toggle-default.directive';
import { IconToggleRotatedTemplateDirective } from '../icon-toggle-rotated/icon-toggle-rotated.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'v-icon v-icon-tiny',

    '[class.v-accordion-toggle-icon]': '!!accordion',
    '[class.v-tab-suffix]': 'tabSuffix()',
    '[style.align-items]': 'alignment()',
    '[style.justify-content]': 'alignment()',
    '[style.pointer-events]': 'pointerEvents()',
    '[style.--v-icon-primary]': 'color()',
    '[style.--v-icon-secondary]': 'color()'
  },
  selector: 'v-icon-visa-toggle',
  standalone: true,
  templateUrl: './icon-toggle.component.html'
})
export class IconToggleComponent {
  private readonly button: ButtonDirective | null = inject(ButtonDirective, { optional: true, host: true });
  public readonly accordion: AccordionDetailsDirective | null = inject(AccordionDetailsDirective, {
    optional: true,
    host: true
  });

  readonly defaultTemplate: Signal<IconToggleDefaultTemplateDirective | undefined> = contentChild(
    forwardRef(() => IconToggleDefaultTemplateDirective)
  );
  readonly rotatedTemplate: Signal<IconToggleRotatedTemplateDirective | undefined> = contentChild(
    IconToggleRotatedTemplateDirective
  );

  readonly tabSuffix: Signal<boolean | null> = computed(() =>
    this.defaultTemplate()?.tabSuffix() || this.rotatedTemplate()?.tabSuffix() ? true : null
  );

  /** @ignore */
  readonly alignment: InputSignal<string> = input<HTMLElement['style']['alignItems']>('center');

  // don't allow this component to be styled with colors
  // "pass" the colors to the child svg
  /** @ignore */
  readonly color: InputSignal<string> = input<HTMLElement['style']['color']>('inherit');

  /** @ignore */
  readonly pointerEvents: InputSignal<string> = input<HTMLElement['style']['pointerEvents']>('none');

  /**
   * Shows the rotated template when true and the default template when false.
   * @default false
   **/
  readonly rotatedInput: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    alias: 'rotated',
    transform: booleanAttribute
  });
  readonly rotatedInternal: WritableSignal<boolean | null> = signal<boolean | null>(null); // used in floating-ui-container
  protected readonly rotated: Signal<boolean | null | string> = computed(
    () =>
      this.rotatedInput() ?? this.button?.ariaExpanded() ?? this.accordion?.expanded() ?? this.rotatedInternal() ?? null
  );
}
