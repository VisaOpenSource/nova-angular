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
import { NovaLibModule } from '@visa/nova-angular';
import {
  DynamicReusableForm,
  PropertyConfig
} from '../../../shared/app-components/reusable-components-form/dynamic-reusable-form';
import { ReusableSelect, ReusableSelectOption } from './reusable-component/reusable-component.docs';

const demoOptions: ReusableSelectOption[] = Array.from({ length: 5 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: i + 1
}));

/**
 * This is a reusable component template.
 * The files in the reusable-component/ subdirectory are the component implementation you can copy and modify.
 * The other files show usage examples.
 * #AI-first
 */
@Component({
  selector: 'nova-reusable-select-demo',
  imports: [NovaLibModule, ReusableSelect, DynamicReusableForm],
  templateUrl: './reusable.docs.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableSelectDemo {
  readonly name = 'reusable-select-demo';

  protected propertyConfigs: PropertyConfig[] = [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Label',
      label: 'Label'
    },
    {
      name: 'message',
      type: 'string',
      defaultValue: 'This is optional text that describes the label in more detail.',
      label: 'Message'
    },
    {
      name: 'options',
      type: 'json',
      defaultValue: JSON.stringify(demoOptions, null, 2),
      label: 'Options (JSON)',
      helpText: 'Edit the JSON array of options. Each option should have "label" and "value" properties.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      label: 'Disabled'
    },
    {
      name: 'inline',
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
      name: 'readonly',
      type: 'boolean',
      defaultValue: false,
      label: 'Readonly'
    },
    {
      name: 'required',
      type: 'boolean',
      defaultValue: false,
      label: 'Required'
    }
  ];

  protected form = viewChild.required('formComponent', { read: DynamicReusableForm });

  protected parseOptions(value: string): ReusableSelectOption[] {
    try {
      return JSON.parse(value) as ReusableSelectOption[];
    } catch {
      return demoOptions;
    }
  }
}
