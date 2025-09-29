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
import { NgModule } from '@angular/core';
import { CheckboxPanelDirective } from './checkbox-panel/checkbox-panel.directive';
import { CheckboxDirective } from './checkbox/checkbox.directive';
import { ChipDirective } from './chip/chip.directive';
import { ComboboxDirective } from './combobox/combobox.directive';
import { FloatingUIContainer } from './floating-ui-container/floating-ui-container.directive';
import { FloatingUIElementDirective } from './floating-ui-element/floating-ui-element.directive';
import { FloatingUITriggerDirective } from './floating-ui-trigger/floating-ui-trigger.directive';
import { IconToggleDefaultTemplateDirective } from './icon-toggle-default/icon-toggle-default.directive';
import { IconToggleRotatedTemplateDirective } from './icon-toggle-rotated/icon-toggle-rotated.directive';
import { IconToggleComponent } from './icon-toggle/icon-toggle.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { InputMessageDirective } from './input-message/input-message.directive';
import { InputDirective } from './input/input.directive';
import { LabelDirective } from './label/label.directive';
import { ListboxContainerDirective } from './listbox-container/listbox-container.directive';
import { ListboxItemComponent } from './listbox-item/listbox-item.component';
import { ListboxDirective } from './listbox/listbox.directive';
import { RadioGroupDirective } from './radio-group/radio-group.directive';
import { RadioDirective } from './radio/radio.directive';
import { SelectDirective } from './select/select.directive';
import { SwitchDirective } from './switch/switch.directive';
import { ToggleButtonDirective } from './toggle-button/toggle-button.directive';
import { ToggleContainerDirective } from './toggle-container/toggle-container.directive';
import { ToggleDirective } from './toggle/toggle.directive';

@NgModule({
  imports: [
    CheckboxDirective,
    CheckboxPanelDirective,
    ChipDirective,
    ComboboxDirective,
    FloatingUIContainer,
    FloatingUIElementDirective,
    FloatingUITriggerDirective,
    InputDirective,
    InputContainerComponent,
    InputMessageDirective,
    IconToggleComponent,
    IconToggleDefaultTemplateDirective,
    IconToggleRotatedTemplateDirective,
    LabelDirective,
    ListboxDirective,
    ListboxContainerDirective,
    ListboxItemComponent,
    RadioDirective,
    RadioGroupDirective,
    SelectDirective,
    SwitchDirective,
    ToggleDirective,
    ToggleButtonDirective,
    ToggleContainerDirective
  ],
  exports: [
    CheckboxDirective,
    CheckboxPanelDirective,
    ChipDirective,
    ComboboxDirective,
    FloatingUIContainer,
    FloatingUIElementDirective,
    FloatingUITriggerDirective,
    IconToggleComponent,
    IconToggleDefaultTemplateDirective,
    IconToggleRotatedTemplateDirective,
    InputDirective,
    InputContainerComponent,
    InputMessageDirective,
    LabelDirective,
    ListboxDirective,
    ListboxContainerDirective,
    ListboxItemComponent,
    RadioDirective,
    RadioGroupDirective,
    SelectDirective,
    SwitchDirective,
    ToggleDirective,
    ToggleButtonDirective,
    ToggleContainerDirective
  ]
})
export class NovaFormsModule {}
