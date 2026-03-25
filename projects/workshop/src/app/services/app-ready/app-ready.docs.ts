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
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaLibModule } from '@visa/nova-angular';
import { MarkdownModule } from 'ngx-markdown';
import { NovaSharedModule } from '../../shared/nova-shared.module';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaLibModule, NovaSharedModule, MarkdownModule],
  standalone: true,
  selector: 'nova-workshop-app-ready-service',
  templateUrl: './app-ready.docs.html'
})
export class AppReadyServiceDocsComponent {
  readonly workshopService = inject(WorkshopService);
  constructor() {
    this.workshopService.componentName.set('App Ready Check Service');
    this.workshopService.neededAPI.set([{ name: 'AppReadyService', type: 'service' }]);
  }
}
