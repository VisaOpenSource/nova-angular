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
  Directive,
  forwardRef,
  inject,
  input,
  InputSignalWithTransform,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { FlexDirective } from '../flex/flex.directive';
import { IdGenerator } from '../id-generator/id-generator.service';

@Directive({
  host: {
    '[class.v-flex]': '!removeDefaultFlex()',
    '[class.v-flex-col]': '!removeDefaultFlex()',
    '[class.v-gap-6]': '!removeDefaultGap()'
  },
  selector: '[v-accordion]',
  standalone: true
})
export class AccordionDirective {
  private readonly flex: FlexDirective | null = inject(FlexDirective, { optional: true, host: true });
  private readonly idGenerator: IdGenerator = inject<IdGenerator>(forwardRef(() => IdGenerator));
  public readonly singleSelectItemsName: WritableSignal<string> = signal<string>(
    this.idGenerator.newId('accordion-details-')
  );

  protected readonly removeDefaultFlex: Signal<boolean | undefined> = computed<boolean | undefined>(
    () => !!(this.flex && this.flex?.vFlexRow())
  );
  protected readonly removeDefaultGap: Signal<boolean | undefined | null | any> = computed<
    boolean | undefined | null | any
  >(() => this.flex && this.flex.vGap());

  /**
   * Allows multiple accordion items to be expanded when true.
   * @default false
   */
  readonly multiselect: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Applies subtle accordion styling when true.
   * @default false
   */
  readonly subtle: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });
}
