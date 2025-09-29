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
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';

export const TypographyColor = {
  Default: 'default',
  Active: 'active',
  Subtle: 'subtle',
  OnActive: 'on-active'
} as const;

export type TypographyColor = (typeof TypographyColor)[keyof typeof TypographyColor];

export const TypographyType = {
  Display1: 'display-1',
  Display2: 'display-2',
  Headline1: 'headline-1',
  Headline2: 'headline-2',
  Headline3: 'headline-3',
  Headline4: 'headline-4',
  Subtitle1: 'subtitle-1',
  Subtitle2: 'subtitle-2',
  Subtitle3: 'subtitle-3',
  Overline: 'overline',
  Body1: 'body-1',
  Body2: 'body-2',
  Body2Bold: 'body-2-bold',
  Body2Link: 'body-2-link',
  Body2Medium: 'body-2-medium',
  Body3: 'body-3',
  ButtonSmall: 'button-small',
  ButtonMedium: 'button-medium',
  ButtonLarge: 'button-large',
  Label: 'label',
  LabelSmall: 'label-small',
  LabelActive: 'label-active',
  LabelLarge: 'label-large',
  LabelLargeActive: 'label-large-active',
  LabelSmallActive: 'label-small-active'
} as const;

export type TypographyType = (typeof TypographyType)[keyof typeof TypographyType];

@Directive({
  host: {
    '[class]': 'classes()'
  },
  selector: '[vTypography], [vFont], [vTypographyColor], [vFontColor]',
  standalone: true
})
export class TypographyDirective {
  protected readonly classes: Signal<string> = computed(() =>
    [
      this.vTypography() && `v-typography-${this.vTypography()}`,
      this.vTypographyColor() && `v-typography-color-${this.vTypographyColor()}`
    ].join(' ')
  );

  /**
   * Applies given typography class, alias for <code>vTypography</code>.
   */
  readonly vFont: InputSignal<'' | TypographyType | null> = input<TypographyType | '' | null>(null); // This was added at the request of devs for a shorter alias.
  /**
   * Applies given typography color class, alias for <code>vTypographyColor</code>.
   */
  readonly vFontColor: InputSignal<'' | TypographyColor | null> = input<TypographyColor | '' | null>(null); // This was added at the request of devs for a shorter alias.

  /**
   * Applies given typography class. <br>
   * Can be used as a more succinct alias for <code>vTypography</code>.
   */
  readonly vTypographyInput: InputSignal<'' | TypographyType | null> = input<TypographyType | '' | null>(null, {
    alias: 'vTypography'
  });
  private readonly vTypography: Signal<'' | TypographyType | null> = computed(
    () => this.vTypographyInput() ?? this.vFont()
  );

  /**
   * Applies given typography color class. <br>
   * Can be used as a more succinct alias for <code>vTypographyColor</code>.
   */
  readonly vTypographyColorInput: InputSignal<'' | TypographyColor | null> = input<TypographyColor | '' | null>(null, {
    alias: 'vTypographyColor'
  });
  private readonly vTypographyColor: Signal<'' | TypographyColor | null> = computed(
    () => this.vTypographyColorInput() || this.vFontColor()
  );
}
