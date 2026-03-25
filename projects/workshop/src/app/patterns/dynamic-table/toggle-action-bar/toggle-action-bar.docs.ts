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
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaFilterAltTiny,
  VisaMapLow,
  VisaViewGridLow
} from '@visa/nova-icons-angular';

/**
 * Action bar with toggle buttons and filter controls
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-dynamic-table-toggle-action-bar',
  templateUrl: './toggle-action-bar.docs.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  styleUrl: '../shared/dynamic-table.scss',
  imports: [
    CommonModule,
    NovaLibModule,
    VisaViewGridLow,
    VisaMapLow,
    VisaFilterAltTiny,
    VisaChevronDownTiny,
    VisaChevronUpTiny
  ]
})
export class ToggleActionBarDynamicTableComponent {}
