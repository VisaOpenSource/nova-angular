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
import { NovaLibModule } from '@visa/nova-angular';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { HorizontalApplicationLayoutComponent } from './horizontal-application-layout/horizontal-application-layout.docs';
import { MixedApplicationLayoutComponent } from './mixed-application-layout/mixed-application-layout.docs';
import { StackedHorizontalApplicationLayoutComponent } from './stacked-horizontal-application-layout/stacked-horizontal-application-layout.docs';
import { VerticalApplicationLayoutComponent } from './vertical-application-layout/vertical-application-layout.docs';

/**
 * Documentation page displaying all application layout patterns.
 * Includes horizontal, vertical, stacked, and mixed navigation examples.
 * #patterns
 **/
@Component({
  imports: [
    NovaSharedModule,
    NovaLibModule,
    HorizontalApplicationLayoutComponent,
    VerticalApplicationLayoutComponent,
    StackedHorizontalApplicationLayoutComponent,
    MixedApplicationLayoutComponent
  ],
  standalone: true,
  selector: 'nova-workshop-layouts',
  templateUrl: './application-layouts.docs.html'
})
export class ApplicationLayoutsDocsComponent {
  public readonly workshopService = inject(WorkshopService);
  constructor() {
    this.workshopService.componentName.set('Layouts');
    this.workshopService.neededAPI.set([]);
  }
}
