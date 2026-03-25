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
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BadgeDirective, BadgeType } from '@visa/nova-angular';
import { VisaErrorTiny, VisaInformationTiny, VisaSuccessTiny, VisaWarningTiny } from '@visa/nova-icons-angular';
import { getBadgeLabel } from '../dynamic-table.utils';

/**
 * Shared Badge Component
 * Displays a badge with status based on the provided label
 */
/** #patterns #isShared **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeDirective, VisaInformationTiny, VisaWarningTiny, VisaSuccessTiny, VisaErrorTiny],
  standalone: true,
  selector: 'nova-workshop-dynamic-table-shared-badge',
  templateUrl: './shared-badge.docs.html'
})
export class SharedBadgeDynamicTableComponent {
  /**
   * Status label displayed in the badge
   */
  readonly label = input.required<string>();

  /**
   * Badge type derived from the label
   */
  readonly badgeStatus = computed<BadgeType | null>(() => getBadgeLabel(this.label()));
}
