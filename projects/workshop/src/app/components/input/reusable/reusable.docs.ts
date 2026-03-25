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
import { VisaAccountLow, VisaSearchTiny } from '@visa/nova-icons-angular';
import {
  DynamicReusableForm,
  PropertyConfig
} from '../../../shared/app-components/reusable-components-form/dynamic-reusable-form';
import { ReusableInput } from './reusable-component/reusable-component.docs';

/**
 * This is a reusable component template.
 * The files in the reusable-component/ subdirectory are the component implementation you can copy and modify.
 * The other files show usage examples.
 * #AI-first
 */
@Component({
  selector: 'nova-reusable-input-demo',
  imports: [NovaLibModule, ReusableInput, DynamicReusableForm, VisaAccountLow, VisaSearchTiny],
  templateUrl: './reusable.docs.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableInputDemo {
  readonly name = 'reusable-input-demo';

  protected propertyConfigs: PropertyConfig[] = [
    {
      name: 'showActionButton',
      type: 'boolean',
      defaultValue: false,
      label: 'Show action button'
    },
    {
      name: 'showCharacterCounter',
      type: 'boolean',
      defaultValue: false,
      label: 'Show character counter'
    },
    {
      name: 'maxLength',
      type: 'number',
      defaultValue: 400,
      label: 'Max length',
      visibleWhen: { property: 'showCharacterCounter', value: true }
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Label',
      label: 'Label'
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: '',
      label: 'Placeholder',
      defaultLabel: 'Placeholder text',
      visibleWhen: { property: 'show-placeholder', value: true }
    },
    {
      name: 'showPlaceholder',
      type: 'boolean',
      defaultValue: false,
      label: 'Show placeholder'
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
      name: 'clearable',
      type: 'boolean',
      defaultValue: false,
      label: 'Clearable'
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
      name: 'maskable',
      type: 'boolean',
      defaultValue: false,
      label: 'Maskable'
    },
    {
      name: 'otp',
      type: 'boolean',
      defaultValue: false,
      label: 'OTP'
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
    },
    {
      name: 'showLeadingIcon',
      type: 'boolean',
      defaultValue: false,
      label: 'Show leading icon'
    },
    {
      name: 'showPrefix',
      type: 'boolean',
      defaultValue: false,
      label: 'Show prefix'
    },
    {
      name: 'showSuffix',
      type: 'boolean',
      defaultValue: false,
      label: 'Show suffix'
    },
    {
      name: 'textarea',
      type: 'boolean',
      defaultValue: false,
      label: 'Textarea'
    },
    {
      name: 'type',
      type: 'enum',
      defaultValue: 'text',
      label: 'Type',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Number', value: 'number' },
        { label: 'Email', value: 'email' },
        { label: 'Tel', value: 'tel' },
        { label: 'URL', value: 'url' },
        { label: 'Password', value: 'password' },
        { label: 'Search', value: 'search' }
      ],
      visibleWhen: { property: 'textarea', value: false }
    },
    {
      name: 'resizable',
      type: 'boolean',
      defaultValue: false,
      label: 'Resizable'
    }
  ];

  protected form = viewChild.required('formComponent', { read: DynamicReusableForm });

  readonly handleActionClick = () => {
    console.log('Action button clicked!');
  };
}
