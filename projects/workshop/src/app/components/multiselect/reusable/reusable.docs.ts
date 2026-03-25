/**
 *              © 2026 Visa
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
import { MultiselectOption, ReusableMultiselect } from './reusable-component/reusable-component.docs';

const demoOptions: MultiselectOption[] = Array.from({ length: 5 }, (_, i) => ({
  label: `Option ${String.fromCharCode('A'.charCodeAt(0) + i)}`,
  value: `option-${i + 1}`
}));

/**
 * This is a reusable component template.
 * The files in the reusable-component/ subdirectory are the component implementation you can copy and modify.
 * The other files show usage examples.
 * #AI-first
 */
@Component({
  selector: 'nova-reusable-multiselect-demo',
  imports: [NovaLibModule, ReusableMultiselect, DynamicReusableForm],
  templateUrl: './reusable.docs.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableMultiselectDemo {
  readonly name = 'reusable-multiselect-demo';

  // @TODO: Add infinite scroll and scrollToTop properties
  protected propertyConfigs: PropertyConfig[] = [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Label (required)',
      label: 'Label'
    },
    {
      name: 'input-message',
      type: 'boolean',
      defaultValue: true,
      label: 'Input message'
    },
    {
      name: 'message',
      type: 'string',
      defaultValue: 'This is optional text that describes the label in more detail.',
      label: 'Message',
      visibleWhen: { property: 'input-message', value: true }
    },
    {
      name: 'options',
      type: 'json',
      defaultValue: JSON.stringify(demoOptions, null, 2),
      label: 'Options (JSON array)',
      helpText: 'Each option should be an object with "label" and "value" properties, and optionally "disabled".'
    },
    {
      name: 'autoFilter',
      type: 'boolean',
      defaultValue: false,
      label: 'Auto filter'
    },
    {
      name: 'autoSelect',
      type: 'boolean',
      defaultValue: false,
      label: 'Auto select'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      label: 'Disabled'
    },
    {
      name: 'hideDropdownButton',
      type: 'boolean',
      defaultValue: false,
      label: 'Hide dropdown button'
    },
    {
      name: 'hideSelectionButtons',
      type: 'boolean',
      defaultValue: false,
      label: 'Hide selection buttons'
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
    }
  ];

  protected form = viewChild.required('formComponent', { read: DynamicReusableForm });

  // Helper method to parse options JSON
  protected parseOptions(optionsString: string): MultiselectOption[] {
    try {
      const parsed = JSON.parse(optionsString);
      return Array.isArray(parsed) ? parsed : demoOptions;
    } catch {
      return demoOptions;
    }
  }
}
