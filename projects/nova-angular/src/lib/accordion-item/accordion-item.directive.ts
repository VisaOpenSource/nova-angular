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
  Directive,
  ElementRef,
  InputSignal,
  ModelSignal,
  OnInit,
  OutputEmitterRef,
  Signal,
  computed,
  contentChild,
  forwardRef,
  inject,
  input,
  model,
  output
} from '@angular/core';
import { AccordionHeadingDirective } from '../accordion-heading/accordion-heading.directive';
import { AccordionDirective } from '../accordion/accordion.directive';

@Directive({
  host: {
    class: 'v-accordion',

    '[attr.name]': 'name()',
    '[attr.open]': 'expanded() ? "open" : null',
    '[attr.tabindex]': 'heading()?.hostButton?.disabled() ? "-1" : null',

    '(toggle)': 'toggle($event)'
  },
  selector: '[v-accordion-item]',
  standalone: true
})
export class AccordionDetailsDirective implements OnInit {
  ngOnInit(): void {
    // only on initial load, if the user sets 'open' (<details v-accordion-item open ...>, update this.expanded
    if (this.el.nativeElement.open) {
      this.expanded.set(true);
    }
  }
  private readonly el: ElementRef = inject(ElementRef);
  private readonly accordion: AccordionDirective | null = inject(
    forwardRef(() => AccordionDirective),
    { optional: true, host: true }
  );

  protected readonly heading: Signal<AccordionHeadingDirective> = contentChild(
    forwardRef(() => AccordionHeadingDirective)
  );

  /**
   *
   * Sets expanded state ('open' or 'closed') of component. <br />
   * Because 'open' is a native attribute of <details>, it can only be set false by using [open]="false", not open="false" <br />
   * Use [open] when you want to handle the expanded state of the accordion item.
   * Use (openChange) when you want the library to handle the expanded state of the accordion item, but get notified of changes.
   * Use [(open)] when you want the expanded state to reflect changes by both you and the library.
   */
  readonly expanded: ModelSignal<boolean | null | string> = model<boolean | null | string>(null, { alias: 'open' });

  /** @ignore */
  readonly nameInput: InputSignal<string | null> = input<string | null>(null, { alias: 'name' });
  readonly name: Signal<string | null> = computed(
    () =>
      this.nameInput() ?? (!this.accordion?.multiselect() ? (this.accordion?.singleSelectItemsName() ?? null) : null)
  );

  /**
   * Emits expanded state of item when toggled.
   */
  readonly toggled: OutputEmitterRef<boolean> = output<boolean>();

  toggle(event: Event): void {
    const { newState } = event as ToggleEvent;
    const expanded = newState === 'open';
    this.expanded.set(expanded);
    this.toggled.emit(expanded);
  }
}
