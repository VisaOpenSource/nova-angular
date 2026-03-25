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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { DefaultResponsivePanelComponent } from './responsive-default/responsive-default.docs';
import { ResponsiveExpandedTabbedPanelComponent } from './responsive-expanded-tabbed/responsive-expanded-tabbed.docs';
import { ResposniveExpandedWithCustomPlacementPanelComponent } from './responsive-expanded-with-custom-placement/responsive-expanded-with-custom-placement.docs';
import { ResponsiveExpandedPanelComponent } from './responsive-expanded/responsive-expanded.docs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NovaLibModule,
    NovaSharedModule,
    FormsModule,
    ReactiveFormsModule,
    ResponsiveExpandedPanelComponent,
    ResposniveExpandedWithCustomPlacementPanelComponent,
    ResponsiveExpandedTabbedPanelComponent,
    DefaultResponsivePanelComponent
  ],
  standalone: true,
  selector: 'vds-docs-panel',
  templateUrl: './panel.docs.html'
})
export class PanelDocsComponent {
  readonly workshopService = inject(WorkshopService);
  constructor() {
    this.workshopService.componentName.set('Panel');
    this.workshopService.neededAPI.set([
      { name: 'PanelComponent', type: 'component' },
      { name: 'PanelBodyDirective', type: 'directive' },
      { name: 'PanelContentDirective', type: 'directive' },
      { name: 'PanelToggleDirective', type: 'directive' },
      { name: 'IdGenerator', type: 'service-source' }
    ]);
  }
}
