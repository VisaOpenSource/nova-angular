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

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaDisabledOffSwitchDocsComponent } from './disabled-off/disabled-off.docs';
import { NovaDisabledSelectedSwitchDocsComponent } from './disabled-selected/disabled-selected.docs';
import { NovaOptionalTextSwitchDocsComponent } from './optional-text/optional-text.docs';
import { ReusableSwitchDemo } from './reusable/reusable.docs';
import { NovaStandardSwitchComponent } from './standard/standard.docs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NovaLibModule,
    NovaSharedModule,
    NovaStandardSwitchComponent,
    NovaDisabledOffSwitchDocsComponent,
    NovaDisabledSelectedSwitchDocsComponent,
    NovaOptionalTextSwitchDocsComponent,
    ReusableSwitchDemo
  ],
  standalone: true,
  selector: 'nova-workshop-switch',
  templateUrl: './switch.docs.html'
})
export class SwitchDocsComponent {
  readonly workshopService = inject(WorkshopService);
  constructor() {
    this.workshopService.componentName.set('Switch');
    this.workshopService.neededAPI.set([
      { name: 'SwitchDirective' },
      { name: 'SwitchLabelDirective' },
      { name: 'LabelDirective' },
      { name: 'InputMessageDirective' },
      { name: 'AppReadyService', type: 'service-source' },
      { name: 'IdGenerator', type: 'service-source' }
    ]);
  }
}
