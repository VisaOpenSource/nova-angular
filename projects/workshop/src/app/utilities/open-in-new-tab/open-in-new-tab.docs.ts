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
import { VisaWarningLow } from '@visa/nova-icons-angular';
import { MarkdownModule } from 'ngx-markdown';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { OpensInNewTabButtonComponent } from './as-button/as-button.docs';
import { OpensInNewTabLinkComponent } from './link/link.docs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VisaWarningLow,
    NovaLibModule,
    NovaSharedModule,
    MarkdownModule,
    OpensInNewTabLinkComponent,
    OpensInNewTabButtonComponent
  ],
  standalone: true,
  selector: 'nova-workshop-open-in-new-tab',
  templateUrl: './open-in-new-tab.docs.html'
})
export class OpensInNewTabComponent {
  readonly workshopService = inject(WorkshopService);

  constructor() {
    this.workshopService.componentName.set('Open in new tab');
    this.workshopService.neededAPI.set([{ name: 'OpensInNewTabDirective' }]);
  }
}
