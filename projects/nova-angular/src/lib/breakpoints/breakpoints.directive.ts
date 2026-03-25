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
import { booleanAttribute, computed, Directive, input, InputSignalWithTransform, Signal } from '@angular/core';

export const BreakpointType = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XXL: 'xxl',
  MOBILE: 'mobile',
  DESKTOP: 'desktop'
} as const;

export type BreakpointType = (typeof BreakpointType)[keyof typeof BreakpointType];

export const coerceBreakpoint = (
  type: 'container' | 'media',
  classes: BreakpointType | BreakpointType[] | null
): string | null => {
  if (!classes) return null;
  if (Array.isArray(classes)) return classes.map((bp) => `v-${bp}-${type}-hide`).join(' ');
  return `v-${classes}-${type}-hide`;
};

@Directive({
  host: {
    '[class]': 'classes()',
    '[class.v-hide]': 'vHide()'
  },
  selector: '[vContainerHide], [vMediaHide], [vHide]',
  standalone: true
})
export class BreakpointsDirective {
  protected readonly classes: Signal<string> = computed(() => [this.vContainerHide(), this.vMediaHide()].join(' '));

  /**
   * Hides element when within given _container_ breakpoint.
   */
  readonly vContainerHide: InputSignalWithTransform<string | null, BreakpointType | BreakpointType[] | null> = input<
    null | string,
    BreakpointType | BreakpointType[] | null
  >(null, {
    transform: (v) => coerceBreakpoint('container', v)
  });

  /**
   * Hides element when true.
   */
  readonly vHide: InputSignalWithTransform<boolean | null, unknown> = input<boolean | null, unknown>(null, {
    transform: booleanAttribute
  });

  /**
   * Hides element when within given _media_ breakpoint.
   */
  readonly vMediaHide: InputSignalWithTransform<string | null, BreakpointType | BreakpointType[] | null> = input<
    null | string,
    BreakpointType | BreakpointType[] | null
  >(null, {
    transform: (v) => coerceBreakpoint('media', v)
  });
}
