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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaOptionHorizontalTiny } from '@visa/nova-icons-angular';

/**
 * Chat actions component that provides a dropdown menu with action options for chat messages.
 * Displays a button with a horizontal options icon that opens a menu when activated.
 *
 * #patterns #isShared
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'chat-actions',
  templateUrl: './chat-actions.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaOptionHorizontalTiny]
})
export class ChatActionsComponent {}
