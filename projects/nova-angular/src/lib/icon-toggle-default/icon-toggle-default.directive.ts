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
import { computed, Directive, inject, Signal } from '@angular/core';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';
import { TabItemDirective } from '../tab-item/tab-item.directive';

@Directive({
  host: {
    '[class.v-tab-suffix]': 'tabSuffix()',
    '[class.v-accordion-toggle-icon]': '!!iconToggle?.accordion'
  },
  selector: '[v-toggle-default-template]',
  standalone: true
})
export class IconToggleDefaultTemplateDirective {
  protected readonly iconToggle: IconToggleComponent | null = inject(IconToggleComponent, {
    optional: true,
    host: true
  });
  readonly tabItem: TabItemDirective | null = inject(TabItemDirective, {
    optional: true,
    host: true
  });

  readonly tabSuffix: Signal<boolean> = computed(() => !!(this.tabItem?.disclosureTab() || this.tabItem?.trigger()));
}
