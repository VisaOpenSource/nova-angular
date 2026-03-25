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
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BadgeDirective, IconComponent, ScreenreaderOnlyDirective } from '@visa/nova-angular';

/**
 * Notification Indicator Component
 * Displays a visual indicator for notifications with optional count badge
 */
/** #patterns #isSubComponent **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-notification-indicator',
  templateUrl: './notification-indicator.docs.html',
  standalone: true,
  imports: [BadgeDirective, IconComponent, ScreenreaderOnlyDirective]
})
export class NotificationIndicatorComponent {
  // Input for if there is a notification
  readonly notification = input.required<string>();
}
