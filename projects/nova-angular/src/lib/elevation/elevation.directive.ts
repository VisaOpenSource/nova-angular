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
import { Directive, input, InputSignal } from '@angular/core';

export const ElevationType = {
  NONE: 'none',
  INSET: 'inset',
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XXL: 'xxl'
} as const;

export type ElevationType = (typeof ElevationType)[keyof typeof ElevationType];

@Directive({
  host: {
    '[class.v-elevation-none]': 'vElevation() === "none"',
    '[class.v-elevation-inset]': 'vElevation() === "inset"',
    '[class.v-elevation-xsmall]': 'vElevation() === "xs"',
    '[class.v-elevation-small]': 'vElevation() === "sm"',
    '[class.v-elevation-medium]': 'vElevation() === "md"',
    '[class.v-elevation-large]': 'vElevation() === "lg"',
    '[class.v-elevation-xlarge]': 'vElevation() === "xl"',
    '[class.v-elevation-xxlarge]': 'vElevation() === "xxl"'
  },
  selector: '[vElevation]',
  standalone: true
})
export class ElevationDirective {
  /**
   * Applies elevation given.
   */
  readonly vElevation: InputSignal<ElevationType | undefined> = input<ElevationType>();
}
