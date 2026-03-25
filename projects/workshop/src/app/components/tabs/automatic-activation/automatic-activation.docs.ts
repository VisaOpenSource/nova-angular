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
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { ButtonDirective, NovaLibModule, NovaLibService, TabListDirective } from '@visa/nova-angular';

/** #custom */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-tabs-automatic-activation',
  templateUrl: './automatic-activation.docs.html'
})
export class AutomaticActivationTabsComponent implements AfterViewInit {
  readonly buttons = computed<(ButtonDirective | undefined)[] | undefined>(() =>
    this.tabList()
      ?.tabs()
      .map((tab) => tab.button())
  ); // alternatively, you could add a viewChildren to get the ButtonDirectives directly
  readonly novaLibService = inject(NovaLibService);
  readonly tabList = viewChild(TabListDirective);

  selectedButtonTab = 0;
  readonly tabContent = [
    {
      tabLabel: 'Label 1',
      text: 'This is content area for label 1',
      id: 'nova-auto-activation-tabs-example-0'
    },
    {
      tabLabel: 'Label 2',
      text: 'This is content area for label 2',
      id: 'nova-auto-activation-tabs-example-1'
    },
    {
      tabLabel: 'Label 3',
      text: 'This is content area for label 3',
      id: 'nova-auto-activation-tabs-example-2'
    },
    {
      tabLabel: 'Label 4',
      text: 'This is content area for label 4',
      id: 'nova-auto-activation-tabs-example-3'
    }
  ];

  ngAfterViewInit(): void {
    const buttons = this.buttons();
    const tabList = this.tabList()?.tabs();
    if (!buttons || !tabList) return;
    this.novaLibService.addArrowKeyNavigation(buttons, true);
    this.novaLibService.addAutomaticActivation(tabList);
  }

  showPanel(index: number) {
    this.selectedButtonTab = index;
  }

  activeChange(active: string | boolean | null, index: number) {
    if (active) this.selectedButtonTab = index;
  }
}
