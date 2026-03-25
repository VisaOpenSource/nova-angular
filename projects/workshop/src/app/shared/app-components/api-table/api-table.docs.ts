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
import { Component, effect, inject, signal } from '@angular/core';
import { WorkshopService } from '../../../shared/services/workshop.service';
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaChevronDownTiny,
  VisaChevronRightTiny,
  VisaCodeForkAltTiny,
  VisaInformationTiny,
} from '@visa/nova-icons-angular';
import { MarkdownModule } from 'ngx-markdown';
import { RouterModule } from '@angular/router';
import {
  APITypes,
  ReturnAPI,
} from '../../../shared/services/workshop.constants';
import { OnThisPageComponent } from '../on-this-page-alm/on-this-page-alm.docs';
import { SafeHtmlDirective } from '../safe-html/safe-html.directive';

@Component({
  selector: 'nova-workshop-api-table',
  templateUrl: './api-table.docs.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NovaLibModule,
    MarkdownModule,
    VisaCodeForkAltTiny,
    VisaInformationTiny,
    VisaChevronDownTiny,
    VisaChevronRightTiny,
    OnThisPageComponent,
    SafeHtmlDirective,
  ],

  styleUrl: './api-table.docs.scss',
})
export class APITableDocsComponent {
  readonly APITypes = APITypes;
  readonly APIData = signal<ReturnAPI[]>([]);
  readonly almData = signal<{ name: string; id: string }[]>([]);

  readonly workshopService = inject(WorkshopService);
  constructor() {
    effect(() => {
      this.APIData.set([]);
      this.almData.set([]);
      if (this.workshopService.libJsonDataReady()) {
        this.workshopService.neededAPI()?.forEach((api) => {
          const result = this.workshopService.getAPI(
            api['name'],
            api['type'] ? api['type'] : APITypes.DIRECTIVE,
          );
          if (result) {
            this.APIData.update((prevResult) => [...prevResult, result]);
            const name = result.component ? result.component : result.name;
            this.almData.update((prev) => [...prev, { name: name, id: name }]);
          }
        });
      }
    });
  }

  readonly neededAPI = this.workshopService.neededAPI;
}
