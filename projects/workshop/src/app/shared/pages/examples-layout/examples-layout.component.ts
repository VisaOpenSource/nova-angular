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
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { WorkshopService } from '../../services/workshop.service';

@Component({
  imports: [RouterModule, NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-examples-layout',
  templateUrl: './examples-layout.component.html',
})
export class ExampleLayoutComponent {
  readonly workshopService = inject(WorkshopService);
  readonly router = inject(Router);

  get backgroundClass(): string {
    return this.router.url.includes('/examples/patterns')
      ? 'patterns-background'
      : 'checkerboard';
  }

  constructor() {
    if (!this.workshopService.docsJsonData) {
      fetch('./app/workshop/documentation.json')
        .then((res) => res.json())
        .then((data) => {
          this.workshopService.docsJsonData = data.components; // only load data on app init
          this.workshopService.docsJsonDataReady.set(true);
        });
    }
  }
}
