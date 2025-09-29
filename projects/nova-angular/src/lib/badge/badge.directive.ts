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
import { booleanAttribute, Directive, inject, input, InputSignal, InputSignalWithTransform } from '@angular/core';
import { IdGenerator } from '../id-generator/id-generator.service';

export const BadgeType = {
  ACTIVE: 'active',
  CRITICAL: 'critical',
  DEFAULT: 'default',
  NEGATIVE: 'negative',
  NEUTRAL: 'neutral',
  NUMBER: 'number',
  STABLE: 'stable',
  SUBTLE: 'subtle',
  WARNING: 'warning'
} as const;

export type BadgeType = (typeof BadgeType)[keyof typeof BadgeType];

@Directive({
  host: {
    class: 'v-badge',

    '[attr.id]': 'id()',
    '[class.v-badge-active]': 'badgeType() === "active"',
    '[class.v-badge-clear]': 'noBackground()',
    '[class.v-badge-critical]': 'badgeType() === "critical" || badgeType() === "negative"',
    '[class.v-badge-default]': 'badgeType() === "default"',
    '[class.v-badge-icon]': 'icon()',
    '[class.v-badge-neutral]': 'badgeType() === "neutral"',
    '[class.v-badge-number]': 'number() || badgeType() === "number"',
    '[class.v-badge-stable]': 'badgeType() === "stable"',
    '[class.v-badge-subtle]': 'badgeType() === "subtle"',
    '[class.v-badge-warning]': 'badgeType() === "warning"'
  },
  standalone: true,
  selector: '[v-badge]'
})
export class BadgeDirective {
  private readonly idGenerator = inject(IdGenerator);

  /**
   * Sets badge type.
   * @default 'default' | BadgeType.DEFAULT
   * @options 'default' | BadgeType.DEFAULT | <br> 'neutral' | BadgeType.NEUTRAL | <br> 'critical' | BadgeType.CRITICAL | <br> 'stable' | BadgeType.STABLE | <br> 'warning' | BadgeType.WARNING | <br> 'subtle' | BadgeType.SUBTLE | <br> 'number' | BadgeType.NUMBER
   */
  readonly badgeType: InputSignal<BadgeType> = input<BadgeType>(BadgeType.DEFAULT);

  /**
   * Whether or not badge contains an icon.
   * @default false
   */
  readonly icon: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets custom id.
   * @default uuidService.getUUID('v-badge-')
   * @builtin true
   */
  readonly id: InputSignal<string> = input(this.idGenerator.newId('v-badge'));

  /**
   * Removes background color from badge when true.
   */
  readonly noBackground: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  /**
   * Sets badge to number variant when true. <br />
   * Using this flag rather than <code>badgeType="number"</code> allows for number badges with other badge types.
   * @default false
   */
  readonly number: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });
}
