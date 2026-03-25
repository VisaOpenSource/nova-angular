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
  input,
  InputSignal,
  InputSignalWithTransform,
  Signal
} from '@angular/core';
import { SpacingProperties } from '../nova-lib.constants';

@Directive({
  host: {
    '[class.v-align-content-around]': 'vAlignContentAround()',
    '[class.v-align-content-between]': 'vAlignContentBetween()',
    '[class.v-align-content-center]': 'vAlignContentCenter()',
    '[class.v-align-content-end]': 'vAlignContentEnd()',
    '[class.v-align-content-evenly]': 'vAlignContentEvenly()',
    '[class.v-align-content-start]': 'vAlignContentStart()',

    '[class.v-align-items-baseline]': 'vAlignItemsBaseline()',
    '[class.v-align-items-center]': 'vAlignItemsCenter()',
    '[class.v-align-items-end]': 'vAlignItemsEnd()',
    '[class.v-align-items-start]': 'vAlignItemsStart()',
    '[class.v-align-items-stretch]': 'vAlignItemsStretch()',

    '[class.v-align-self-auto]': 'vAlignSelfAuto()',
    '[class.v-align-self-baseline]': 'vAlignSelfBaseline()',
    '[class.v-align-self-center]': 'vAlignSelfCenter()',
    '[class.v-align-self-end]': 'vAlignSelfEnd()',
    '[class.v-align-self-start]': 'vAlignSelfStart()',
    '[class.v-align-self-stretch]': 'vAlignSelfStretch()',

    '[class.v-flex]': 'vFlex() || vFlexCol() || vFlexRow()',
    '[class.v-flex-col]': 'vFlexCol()',
    '[class.v-flex-col-reverse]': 'vFlexColReverse()',
    '[class.v-flex-grow]': 'vFlexGrow()',
    '[class.v-flex-grow-0]': 'vFlexGrow0()',
    '[class.v-flex-inline]': 'vFlexInline()',
    '[class.v-flex-nowrap]': 'vFlexNoWrap()',
    '[class.v-flex-row]': 'vFlexRow() || (vFlex() && (!vFlexCol() && !vFlexColReverse() && !vFlexRowReverse()))',
    '[class.v-flex-row-reverse]': 'vFlexRowReverse()',
    '[class.v-flex-shrink]': 'vFlexShrink()',
    '[class.v-flex-shrink-0]': 'vFlexShrink0()',
    '[class.v-flex-wrap]': 'vFlexWrap()',
    '[class.v-flex-wrap-reverse]': 'vFlexWrapReverse()',

    '[class.v-justify-content-around]': 'vJustifyContentAround()',
    '[class.v-justify-content-between]': 'vJustifyContentBetween()',
    '[class.v-justify-content-center]': 'vJustifyContentCenter()',
    '[class.v-justify-content-end]': 'vJustifyContentEnd()',
    '[class.v-justify-content-evenly]': 'vJustifyContentEvenly()',
    '[class.v-justify-content-start]': 'vJustifyContentStart()',

    '[class]': 'classes()',

    '[style.flex-basis]': 'vFlexBasis()'
  },
  selector: `[vFlex], [vFlexInline], [vGap], [vFlexGrow], [vFlexGrow0],
  [vFlexShrink], [vFlexShrink0], [vFlexBasis], [vAlignSelfStart], [vAlignSelfEnd],
  [vAlignSelfCenter], [vAlignSelfStretch], [vAlignSelfAuto], [vAlignSelfBaseline],`,
  standalone: true
})
export class FlexDirective {
  protected readonly classes: Signal<string> = computed(() =>
    [
      this.vColGap() ? `v-col-gap-${this.vColGap()}` : null, // vGap="4"
      this.vGap() ? `v-gap-${this.vGap()}` : null, // vGap="4"
      this.vRowGap() ? `v-row-gap-${this.vRowGap()}` : null // vGap="4"
    ].join(' ')
  );

  /**
 /**
   * Sets property <code>align-content: space-around</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vAlignContentAround: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-content: space-between</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vAlignContentBetween: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-content: center</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above)
   */
  readonly vAlignContentCenter: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-content: end</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vAlignContentEnd: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-content: start</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above)
   */
  readonly vAlignContentStart: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-content: space-evenly</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vAlignContentEvenly: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-items: baseline</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vAlignItemsBaseline: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-content: center</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vAlignItemsCenter: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-content: end</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vAlignItemsEnd: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-content: start</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vAlignItemsStart: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-items: stretch</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vAlignItemsStretch: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-self: auto</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  readonly vAlignSelfAuto: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-self: baseline</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  readonly vAlignSelfBaseline: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-self: center</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  readonly vAlignSelfCenter: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-self: end</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  readonly vAlignSelfEnd: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-self: start</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  readonly vAlignSelfStart: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>align-self: stretch</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  readonly vAlignSelfStretch: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>column-gap</code>. <br>Accepts gap: 0 - 48 and SpacingProperties.
   */
  readonly vColGap: InputSignal<null | number | SpacingProperties | string | undefined> = input<
    null | number | SpacingProperties | string | undefined
  >(null);

  /**
   * Sets property <code>display: flex</code>. <br>
   * This property is also a selector and can be used by itself on a flex element.
   */
  readonly vFlex: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>flex-basis: &lt;value&gt;</code>. <br>
   * Accepts a string that should be in the form of a percentage or CSS unit. <br />
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  readonly vFlexBasis: InputSignal<null | string> = input<null | string>(null);

  /**
   * Sets property <code>flex-direction: column</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vFlexCol: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>flex-direction: column-reverse</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vFlexColReverse: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>flex-grow: 1</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  readonly vFlexGrow: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>flex-grow: 0</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  readonly vFlexGrow0: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>display: inline-flex</code>. <br>
   * This property is also a selector and can be used by itself on a flex element.
   */
  readonly vFlexInline: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>flex-wrap: no-wrap</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vFlexNoWrap: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>flex-direction: row</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vFlexRow: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>flex-direction: row-reverse</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vFlexRowReverse: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>flex-shrink: 1</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  readonly vFlexShrink: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>flex-shrink: 0</code>. <br>
   * This property is also a selector and can be used by itself on the <i>child</i> of a flex element.
   */
  readonly vFlexShrink0: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>flex-wrap: wrap</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vFlexWrap: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>flex-wrap: wrap-reverse</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vFlexWrapReverse: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>gap</code>. <br>Accepts gap: 0 - 48 and SpacingProperties.
   */
  readonly vGap: InputSignal<null | number | SpacingProperties | string | undefined> = input<
    null | number | SpacingProperties | string | undefined
  >(null);

  /**
   * Sets property <code>justify-content: space-around</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vJustifyContentAround: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>justify-content: space-between</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vJustifyContentBetween: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>justify-content: center</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vJustifyContentCenter: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>justify-content: end</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vJustifyContentEnd: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>justify-content: space-evenly</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vJustifyContentEvenly: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>justify-content: start</code>. <br>
   * This property should be used alongside a FlexDirective selector (see selectors above).
   */
  readonly vJustifyContentStart: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets property <code>row-gap</code>. <br>Accepts gap: 0 - 48 and SpacingProperties.
   */
  readonly vRowGap: InputSignal<null | number | SpacingProperties | string | undefined> = input<
    null | number | SpacingProperties | string | undefined
  >(null);
}
