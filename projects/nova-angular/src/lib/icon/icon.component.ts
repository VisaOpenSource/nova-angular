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
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  InputSignalWithTransform,
  Signal,
  signal,
  ViewEncapsulation,
  WritableSignal,
} from '@angular/core';
import { IconToggleDirective } from '../icon-toggle/icon-toggle.directive';
import { IconLibrary, IconSize } from './icon.constants';

/**
 * <code>IconComponent</code> is intended <i>only</i> for use with icons used with an icon sprite. <br />
 * <strong>Standalone icons from @visa/nova-icons-angular is recommended over using the <code>IconComponent</code>.</strong>. <br />
 * Icon component for displaying icons from VPDS' [Icon Library](https://design.visa.com/components/icons-illustrations/). <br />
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'v-icon',
    focusable: 'false',
    hidden: 'true',

    '[attr.height]': 'computedSize()',
    '[attr.viewBox]': "'0 0 ' + computedSize() + ' ' + computedSize()",
    '[attr.width]': 'computedSize()',
    '[class.v-badge-ellipse]': 'isBadgeEllipse()',
    '[class.v-icon-generic]': 'library() === "generic"',
    '[class.v-icon-high]': 'iconSize() === "high"',
    '[class.v-icon-low]': 'iconSize() === "low"',
    '[class.v-icon-rtl]': 'rtl()',
    '[class.v-icon-tiny]': 'iconSize() === "tiny"',
    '[class.v-icon-visa]': 'library() === "visa"',
    '[class.v-tab-suffix]': 'tabSuffix()',
    '[style.--v-icon-height]':
      'isBadgeEllipse() ? "var(--size-scalable-" + customHeight() + ")" : null',
    '[style.--v-icon-primary]':
      'isBadgeEllipse() ? "var(--v-badge-ellipse-color)" : null',
    '[style.--v-icon-secondary]':
      'isBadgeEllipse() ? "var(--v-badge-ellipse-color)" : null',
    '[style.--v-icon-width]':
      'isBadgeEllipse() ? "var(--size-scalable-" + customWidth() + ")" : null',
  },
  selector: '[v-icon]',
  standalone: true,
  templateUrl: './icon.component.html',
})
export class IconComponent {
  /**
   * Set CSS variable <code>--v-icon-height</code> which customizes icon height. <code>isBadgeEllipse</code> must be true for this to have an affect. <br />
   * @default '8'
   */
  readonly customHeight: InputSignal<string> = input<string>('8');

  /**
   * Name of <strong>custom</strong> icon reference. <br />
   * Should refer to an icon within an icon sprite in your application. <br />
   * The href will reference the string provided directly. No library or iconSize will be added.
   */
  readonly customIcon: InputSignal<string | undefined> = input<string>();

  /**
   * Set CSS variable <code>--v-icon-width</code> which customizes icon width. <code>isBadgeEllipse</code> must be true for this to have an affect. <br />
   * @default '8'
   */
  readonly customWidth: InputSignal<string> = input<string>('8');

  /**
   * Name of icon to display. <br />
   * Should refer to an icon in VPDS' [Icon Library](https://design.visa.com/components/icons-illustrations/).
   */
  readonly iconInput: InputSignal<string | null> = input<null | string>(null, {
    alias: 'icon',
  });
  private readonly icon: Signal<string | null> = computed(
    () =>
      this.iconInput() ??
      (this.iconToggle !== undefined
        ? ((this.iconToggle?.expanded()
            ? this.iconToggle?.expandedIcon()
            : this.iconToggle?.collapsedIcon()) as string)
        : null),
  );

  private readonly iconToggle: IconToggleDirective | null = inject(
    IconToggleDirective,
    { optional: true, host: true },
  );

  /**
   * Sets icon resolution/size.
   * @default 'tiny' / IconSize.TINY
   * @options 'tiny' | IconSize.TINY | <br> 'low' | IconSize.LOW | <br> 'high' | IconSize.HIGH
   */
  // default of tiny chosen because it is the default for majority of buttons
  readonly iconSize: InputSignal<IconSize> = input<IconSize>('tiny');

  /**
   * Sets icon to badge-ellipse variant when true. <br />
   * Intended for use in badges with an indicator.
   * @default false
   */
  readonly isBadgeEllipse: InputSignalWithTransform<boolean, unknown> = input<
    boolean,
    unknown
  >(false, {
    transform: booleanAttribute,
  });

  /**
   * Tells icon which library to reference.
   * @default 'visa' / IconLibrary.VISA
   * @options 'visa' | IconLibrary.VISA | <br> 'generic' | IconLibrary.GENERIC
   */
  readonly library: InputSignal<IconLibrary> = input<IconLibrary>('visa');

  /**
   * Flips icon from right to left when true and <code>dir="rtl" is present on a parent element.
   * @default false
   */
  readonly rtl: InputSignalWithTransform<boolean, unknown> = input<
    boolean,
    unknown
  >(false, {
    transform: booleanAttribute,
  });

  readonly tabSuffix: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly computedSize: Signal<number> = computed<number>(() =>
    this.iconSize() === 'low' ? 24 : this.iconSize() === 'high' ? 48 : 16,
  );

  protected readonly iconRef: Signal<string | null> = computed(
    () =>
      this.customIcon() ??
      (this.icon() && `${this.library()}-${this.icon()}-${this.iconSize()}`),
  );
}
