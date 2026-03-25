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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { FormControlValuesComponent } from './form-control-values/form-control-values.docs';
import { NestedTriggersTestComponent } from './nested-triggers/nested-triggers.docs';
import { NestedFloatingElementsTestComponent } from './nested-floating-elements/nested-floating-elements.docs';
import { ComboboxFocusTestComponent } from './combobox-focus-test/combobox-focus-test.docs';
import { NestedMenusTestComponent } from './nested-menus/nested-menus.docs';
import { NestedComboboxInDropdownTestComponent } from './nested-combobox-in-dropdown/nested-combobox-in-dropdown.docs';
import { FloatingUiInDisclosureTabTestComponent } from './floating-ui-in-disclosure-tab/floating-ui-in-disclosure-tab.docs';
import { FloatingUiInPanelTestComponent } from './floating-ui-in-panel/floating-ui-in-panel.docs';
import { NestedAccordionsTestComponent } from './nested-accordions/nested-accordions.docs';
import { HorizontalNavNestedMenusTestComponent } from './horizontal-nav-nested-menus/horizontal-nav-nested-menus.docs';
import { FormControlNgComponent } from './form-control-ng/form-control-ng.docs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NovaSharedModule,
    NovaLibModule,
    ComboboxFocusTestComponent,
    FloatingUiInDisclosureTabTestComponent,
    FloatingUiInPanelTestComponent,
    FormControlValuesComponent,
    FormControlNgComponent,
    HorizontalNavNestedMenusTestComponent,
    NestedAccordionsTestComponent,
    NestedComboboxInDropdownTestComponent,
    NestedFloatingElementsTestComponent,
    NestedMenusTestComponent,
    NestedTriggersTestComponent
  ],
  standalone: true,
  selector: 'nova-workshop-component-tests',
  templateUrl: './tests.docs.html'
})
export class TestDocsComponent {}
