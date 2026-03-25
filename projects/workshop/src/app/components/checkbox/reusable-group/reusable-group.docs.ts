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
import { CheckboxGroup, ReusableCheckboxGroup } from './reusable-component/reusable-component.docs';

/**
 * This is a reusable component template.
 * The files in the reusable-component/ subdirectory are the component implementation you can copy and modify.
 * The other files show usage examples.
 * #AI-first
 */
@Component({
  selector: 'nova-reusable-checkbox-group-demo',
  imports: [NovaLibModule, ReusableCheckboxGroup, DynamicReusableForm, VisaInformationLow, RouterModule],
  templateUrl: './reusable-group.docs.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableCheckboxGroupDemo {
  readonly name = 'reusable-checkbox-group-demo';

  protected readonly defaultCheckboxes: CheckboxGroup[] = [
    {
      description: 'This is optional text that describes the label in more detail.',
      checked: false,
      label: 'L1 label 1'
    },
    {
      checked: false,
      label: 'L1 label 2',
      children: [
        {
          checked: false,
          label: 'L2 label 1'
        },
        {
          checked: false,
          label: 'L2 label 2',
          children: [
            {
              checked: false,
              label: 'L3 label 1'
            },
            {
              checked: false,
              label: 'L3 label 2',
              children: [
                {
                  checked: false,
                  label: 'L4 label 1'
                },
                {
                  checked: false,
                  label: 'L4 label 2'
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  protected propertyConfigs: PropertyConfig[] = [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Group label',
      label: 'Label'
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'This is optional text that describes the label in more detail.',
      label: 'Description'
    },
    {
      name: 'checkboxes',
      type: 'json',
      defaultValue: JSON.stringify(this.defaultCheckboxes, null, 2),
      label: 'Checkboxes (JSON)',
      helpText: 'Edit the JSON structure to customize the checkbox group hierarchy.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      label: 'Disabled'
    },
    {
      name: 'horizontal',
      type: 'boolean',
      defaultValue: false,
      label: 'Inline'
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

  protected parseCheckboxes(value: string): CheckboxGroup[] {
    try {
      return JSON.parse(value) as CheckboxGroup[];
    } catch {
      return this.defaultCheckboxes;
    }
  }
}
