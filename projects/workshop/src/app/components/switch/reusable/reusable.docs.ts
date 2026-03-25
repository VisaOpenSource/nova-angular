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
import { ReusableSwitch } from './reusable-component/reusable-component.docs';

/**
 * This is a reusable component template.
 * The files in the reusable-component/ subdirectory are the component implementation you can copy and modify.
 * The other files show usage examples.
 * #AI-first
 */
@Component({
  selector: 'nova-reusable-switch-demo',
  imports: [NovaLibModule, ReusableSwitch, DynamicReusableForm],
  templateUrl: './reusable.docs.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableSwitchDemo {
  readonly name = 'reusable-switch-demo';

  protected propertyConfigs: PropertyConfig[] = [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Label',
      label: 'Label'
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'This is optional text that describes the label in more detail.',
      label: 'Description'
    },
    {
      name: 'alignStart',
      type: 'boolean',
      defaultValue: true,
      label: 'Align start',
      helpText: 'When enabled, the switch appears on the left side of the label.'
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
      name: 'required',
      type: 'boolean',
      defaultValue: false,
      label: 'Required'
    },
    {
      name: 'selected',
      type: 'boolean',
      defaultValue: false,
      label: 'Selected'
    }
  ];

  protected form = viewChild.required('formComponent', { read: DynamicReusableForm });
}
