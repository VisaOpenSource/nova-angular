/**
 *              © 2025 Visa
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
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaMaximizeTiny,
  VisaMediaFastForwardTiny,
  VisaMediaRewindTiny
} from '@visa/nova-icons-angular';
import { componentRoutesWithTitleWithHiddenRoutes } from '../../../components/components.routes';
import { patternRoutesWithTitle } from '../../../patterns/patterns.routes';
import { servicesRoutesWithTitle } from '../../../services/services.routes';
import { WorkshopService } from '../../../shared/services/workshop.service';
import { utilitiesRoutesWithTitle } from '../../../utilities/utilities.routes';

export const routeSorter = (a: { path: string } & Route, b: { path: string } & Route) => {
  var compA = a.path.toUpperCase();
  var compB = b.path.toUpperCase();

  return compA.localeCompare(compB);
};

@Component({
  host: { class: 'layout__nav' },
  selector: 'nova-workshop-site-nav',
  templateUrl: './site-nav.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NovaLibModule,
    RouterModule,
    VisaMediaFastForwardTiny,
    VisaMediaRewindTiny,
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaMaximizeTiny
  ],
  styleUrl: './site-nav.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SiteNavComponent {
  readonly workshopService = inject(WorkshopService);
  foundationsOpen = false;
  utilitiesOpen = false;
  servicesOpen = false;
  patternsOpen = false;
  currentPage = '';
  versionOpen = false;
  supportOpen = false;

  components = componentRoutesWithTitleWithHiddenRoutes.sort(routeSorter);
  services = servicesRoutesWithTitle.sort(routeSorter);
  utilities = utilitiesRoutesWithTitle.sort(routeSorter);
  patterns = patternRoutesWithTitle.sort(routeSorter);

  navOpen = this.workshopService.sideNavOpen;
  componentDisclosureOpen = this.workshopService.componentDisclosureOpen;
  version = this.workshopService.version;
  versionLinks = this.workshopService.versionLinks;
  supportLinks = this.workshopService.supportLinks;

  toggleNav() {
    this.workshopService.toggleNav();
  }

  toggleComponentDisclosure() {
    this.workshopService.toggleComponentDisclosure();
  }

  closeSideNavOnMobile() {
    if (document.body.clientWidth < 768) {
      this.workshopService.sideNavOpen.set(false);
    }
  }
}
