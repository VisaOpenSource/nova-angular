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
import { VisaCloudLow, VisaSuccessTiny } from '@visa/nova-icons-angular';
import {
  DynamicReusableForm,
  PropertyConfig
} from '../../../shared/app-components/reusable-components-form/dynamic-reusable-form';
import { ReusableAccordion } from './reusable-component/reusable-component.docs';

/**
 * This is a reusable component template.
 * The files in the reusable-component/ subdirectory are the component implementation you can copy and modify.
 * The other files show usage examples.
 * #AI-first
 */
@Component({
  selector: 'nova-reusable-accordion-demo',
  imports: [NovaLibModule, ReusableAccordion, DynamicReusableForm, VisaCloudLow, VisaSuccessTiny],
  templateUrl: './reusable.docs.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableAccordionDemo {
  readonly name = 'reusable-accordion-demo';

  protected propertyConfigs: PropertyConfig[] = [
    {
      name: 'count',
      type: 'number',
      defaultValue: 1,
      label: 'Number of accordions'
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Success title',
      label: 'Title'
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'This is required text that describes the accordion in more detail.',
      label: 'Description'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      label: 'Disabled'
    },
    {
      name: 'multiselect',
      type: 'boolean',
      defaultValue: false,
      label: 'Multiselect'
    },
    {
      name: 'open',
      type: 'boolean',
      defaultValue: false,
      label: 'Open first accordion'
    },
    {
      name: 'padding',
      type: 'boolean',
      defaultValue: true,
      label: 'Padding'
    },
    {
      name: 'showBadge',
      type: 'boolean',
      defaultValue: false,
      label: 'Show badge'
    },
    {
      name: 'showIcon',
      type: 'boolean',
      defaultValue: false,
      label: 'Show icon'
    },
    {
      name: 'showToggleIcon',
      type: 'boolean',
      defaultValue: true,
      label: 'Show toggle icon'
    },
    {
      name: 'subtle',
      type: 'boolean',
      defaultValue: false,
      label: 'Subtle'
    }
  ];

  protected form = viewChild.required('formComponent', { read: DynamicReusableForm });
}
