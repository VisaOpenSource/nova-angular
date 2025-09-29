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
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';

interface Crumb {
  name: string;
  route: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaLibModule, RouterModule],
  standalone: true,
  selector: 'nova-workshop-breadcrumbs-dynamic',
  templateUrl: './dynamic.docs.html'
})
export class DynamicBreadcrumbsComponent {
  readonly items = signal<Crumb[]>([
    { name: 'L1 label', route: '' },
    { name: 'L2 label', route: '/components/accordion' },
    { name: 'L3 label', route: './' }
  ]);

  readonly next = computed(() => this.items().length + 1);

  crumbSelected(crumb: Crumb) {
    // Since only the non-last crumb can be selected, we need to remove all of the other crumbs from our list of crumbs
    this.items.update((items) => {
      const index = items.findIndex((current) => crumb.route === current.route);
      return items.slice(0, index + 1);
    });
  }

  addCrumb() {
    this.items.update((items) => [
      ...items,
      {
        name: `L${this.next()} label`,
        route: `/level-${this.next()}`
      }
    ]);
  }

  removeCrumb() {
    this.items.update((items) => items.slice(0, -1));
  }
}
