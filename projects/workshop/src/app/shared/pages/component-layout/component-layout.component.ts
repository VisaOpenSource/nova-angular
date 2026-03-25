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
import { AfterViewInit, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { WorkshopService } from '../../../shared/services/workshop.service';
import { PageHeroComponent } from '../../app-components/page-hero/page-hero.docs';
import { APITableDocsComponent } from '../../app-components/api-table/api-table.docs';
import { OnThisPageComponent } from '../../app-components/on-this-page-alm/on-this-page-alm.docs';

@Component({
  imports: [NovaLibModule, APITableDocsComponent, PageHeroComponent, RouterModule, OnThisPageComponent],
  standalone: true,
  host: { class: 'w-component-layout' },
  selector: 'nova-workshop-component-layout',
  templateUrl: './component-layout.component.html',
  styleUrl: './component-layout.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ComponentLayoutComponent implements AfterViewInit {
  readonly workshopService = inject(WorkshopService);

  readonly selectedTab = this.workshopService.selectedHeroTab;
  readonly examples = computed(() => this.workshopService.examples());

  updateTab(index: number) {
    this.workshopService.setHeroTab(index);
  }

  navigateTo(id: string) {
    this.workshopService.navigateTo(id, id + '-link');
  }

  ngAfterViewInit(): void {
    if (this.workshopService.urlFragment) {
      // find example corresponding to url fragment
      const startingExample = this.workshopService
        .examples()
        ?.find(
          (example) =>
            (this.workshopService.urlFragment && example.id.includes(this.workshopService.urlFragment)) ||
            example.id === this.workshopService.urlFragment
        );

      if (!startingExample) return;

      // check that example exists in the DOM before navigating
      const exampleElement = document.getElementById(startingExample.id);
      if (!exampleElement) return;
      this.workshopService.navigateTo(startingExample.id, startingExample.id + '-link');
    }
  }
}
