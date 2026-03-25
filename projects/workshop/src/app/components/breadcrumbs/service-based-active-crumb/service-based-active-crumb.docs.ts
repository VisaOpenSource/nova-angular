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
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { filter, map } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaLibModule, RouterModule],
  standalone: true,
  selector: 'nova-workshop-breadcrumbs-using-service-to-get-active-crumb',
  templateUrl: './service-based-active-crumb.docs.html'
})
export class ServiceBasedActiveCrumbBreadcrumbsComponent {
  readonly router = inject(Router);

  readonly pages = [
    { path: '/', text: 'L1 label' },
    { path: '/components', text: 'L2 label' },
    { path: '/components', text: 'L3 label' },
    { path: '/components/breadcrumbs', text: 'L4 label' },
    { path: '/examples/components/breadcrumbs/service-based-active-crumb', text: 'L5 label' }
  ];

  // Convert the router.url observable to a signal
  readonly currentRoute = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url)
    ),
    { initialValue: this.router.url }
  );

  readonly activeIndex = computed(() => {
    const routeWithoutAnchor = this.currentRoute().split('#')[0];
    return this.pages.findIndex((page) => page.path === (routeWithoutAnchor || this.currentRoute()));
  });
}
