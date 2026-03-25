/**
 *              © 2026 Visa
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
import { BadgeType } from '@visa/nova-angular';
import { ButtonColor, ButtonSize } from '@visa/nova-angular';
import { MessageType } from '@visa/nova-angular';
import { IconSize } from '@visa/nova-angular';

/**
 * Convert a library enum object to select dropdown options
 *
 * Usage:
 * ```typescript
 * import { BadgeType } from '@visa/nova-angular';
 * import { toSelectOptions } from './enum-options';
 *
 * const options = toSelectOptions(BadgeType);
 * // Returns: [
 * //   { label: 'Active', value: 'active' },
 * //   { label: 'Critical', value: 'critical' },
 * //   ...
 * // ]
 * ```
 */
export function toSelectOptions(enumObj: Record<string, string>): { label: string; value: string }[] {
  return Object.entries(enumObj).map(([key, value]) => ({
    label: formatLabel(key),
    value: value
  }));
}

/**
 * Format enum constant name for display
 * ACTIVE -> Active, DEFAULT -> Default, NEGATIVE -> Negative
 */
function formatLabel(name: string): string {
  return name.charAt(0) + name.slice(1).toLowerCase();
}

/**
 * Registry of available enums for easy lookup by name
 * This is optional - you can also import the enums directly
 */
export const ENUM_REGISTRY = {
  BadgeType,
  ButtonColor,
  ButtonSize,
  MessageType,
  IconSize
} as const;

/**
 * Get select options by enum name (convenience method)
 *
 * Usage:
 * ```typescript
 * const options = getEnumOptions('BadgeType');
 * ```
 */
export function getEnumOptions(enumName: keyof typeof ENUM_REGISTRY): { label: string; value: string }[] {
  const enumObj = ENUM_REGISTRY[enumName];
  if (!enumObj) {
    console.warn(`No enum found for type: ${enumName}`);
    return [];
  }
  return toSelectOptions(enumObj);
}
