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
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaInformationLow } from '@visa/nova-icons-angular';
import {
  DynamicReusableForm,
  PropertyConfig
} from '../../../shared/app-components/reusable-components-form/dynamic-reusable-form';
import { ReusableCheckbox } from './reusable-component/reusable-component.docs';

/**
 * This is a reusable component template.
 * The files in the reusable-component/ subdirectory are the component implementation you can copy and modify.
 * The other files show usage examples.
 * #AI-first
 */
@Component({
  selector: 'nova-reusable-checkbox-demo',
  imports: [NovaLibModule, ReusableCheckbox, DynamicReusableForm, VisaInformationLow, RouterModule],
  templateUrl: './reusable.docs.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableCheckboxDemo {
  readonly name = 'reusable-checkbox-demo';

  protected propertyConfigs: PropertyConfig[] = [
    {
      name: 'checked',
      type: 'boolean',
      defaultValue: false,
      label: 'Checked'
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Label',
      label: 'Label',
      visibleWhen: { property: 'showLabel', value: true }
    },
    {
      name: 'showLabel',
      type: 'boolean',
      defaultValue: true,
      label: 'Show label'
    },
    {
      name: 'showMessage',
      type: 'boolean',
      defaultValue: true,
      label: 'Show input message'
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'This is optional text that describes the label in more detail.',
      label: 'Input message',
      visibleWhen: { property: 'showMessage', value: true }
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      label: 'Disabled'
    },
    {
      name: 'invalid',
      type: 'boolean',
      defaultValue: false,
      label: 'Invalid'
    },
    {
      name: 'errorMessage',
      type: 'string',
      defaultValue: 'This is required text that describes the error in more detail.',
      label: 'Error message',
      visibleWhen: { property: 'invalid', value: true }
    },
    {
      name: 'panel',
      type: 'boolean',
      defaultValue: false,
      label: 'Panel'
    },
    {
      name: 'required',
      type: 'boolean',
      defaultValue: false,
      label: 'Required'
    }
  ];

  protected form = viewChild.required('formComponent', { read: DynamicReusableForm });
}
