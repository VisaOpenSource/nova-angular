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
import { capitalCase } from 'change-case';
import {
  DynamicReusableForm,
  PropertyConfig
} from '../../../shared/app-components/reusable-components-form/dynamic-reusable-form';
import { ReusableProgress } from './reusable-component/reusable-component.docs';

/**
 * This is a reusable component template.
 * The files in the reusable-component/ subdirectory are the component implementation you can copy and modify.
 * The other files show usage examples.
 * #AI-first
 */
@Component({
  selector: 'nova-reusable-progress-demo',
  imports: [NovaLibModule, ReusableProgress, DynamicReusableForm],
  templateUrl: './reusable.docs.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableProgressDemo {
  readonly name = 'reusable-progress-demo';

  protected propertyConfigs: PropertyConfig[] = [
    // type should come first
    {
      name: 'type',
      type: 'enum',
      label: 'Progress type',
      options: ['linear', 'circular'].map((option) => ({
        value: option,
        label: capitalCase(option)
      })),
      defaultValue: 'linear'
    },
    {
      name: 'ariaHidden',
      type: 'boolean',
      label: 'Hide from screen readers',
      defaultValue: false,
      visibleWhen: [
        { property: 'type', value: 'linear' },
        { property: 'determinate', value: true }
      ]
    },
    {
      name: 'calculate',
      type: 'boolean',
      label: 'Calculate percentage',
      defaultValue: false,
      helpText: 'Percentage will be calculated from value and max inputs.',
      visibleWhen: { property: 'type', value: 'linear' }
    },
    {
      name: 'determinate',
      type: 'boolean',
      label: 'Determinate',
      defaultValue: true
    },
    {
      name: 'hidePercentage',
      type: 'boolean',
      label: 'Hide percentage label',
      defaultValue: false
    },
    {
      name: 'inline',
      type: 'boolean',
      label: 'Inline',
      defaultValue: false,
      visibleWhen: { property: 'type', value: 'circular' }
    },
    {
      name: 'invalid',
      type: 'boolean',
      label: 'Invalid',
      defaultValue: false
    },
    {
      name: 'label',
      type: 'string',
      label: 'Label',
      defaultValue: 'Filename.jpg',
      visibleWhen: { property: 'showLabel', value: true }
    },
    {
      name: 'labelledby',
      type: 'string',
      label: 'Aria labelledby',
      defaultValue: null,
      helpText:
        'Aria attribute pointing to id of labelling element. By default, points to child label element if present.',
      visibleWhen: { property: 'type', value: 'circular' }
    },
    {
      name: 'max',
      type: 'number',
      label: 'Max',
      defaultValue: 100,
      visibleWhen: [
        { property: 'type', value: 'linear' },
        { property: 'calculate', value: true },
        { property: 'hidePercentage', value: false }
      ]
    },
    {
      name: 'message',
      type: 'string',
      label: 'Status message',
      defaultValue: 'This is text that describes the label in more detail.',
      visibleWhen: { property: 'showMessage', value: true }
    },
    {
      name: 'paused',
      type: 'boolean',
      label: 'Paused',
      defaultValue: false,
      visibleWhen: { property: 'determinate', value: false }
    },
    {
      name: 'percentage',
      type: 'number',
      label: 'Percentage',
      defaultValue: 12,
      visibleWhen: [
        { property: 'hidePercentage', value: false },
        { property: 'calculate', value: false }
      ]
    },
    {
      name: 'role',
      type: 'string',
      label: 'Role',
      defaultValue: null,
      helpText: 'Sets custom role. By default, "progressbar" when determinate and null when indeterminate.',
      visibleWhen: { property: 'type', value: 'circular' }
    },
    {
      name: 'showLabel',
      type: 'boolean',
      label: 'Show label',
      defaultValue: true
    },
    {
      name: 'showMessage',
      type: 'boolean',
      label: 'Show message',
      defaultValue: false,
      visibleWhen: { property: 'type', value: 'circular' }
    },
    {
      name: 'size',
      type: 'number',
      label: 'Cusom size',
      defaultValue: null,
      visibleWhen: [
        { property: 'type', value: 'circular' },
        { property: 'small', value: false }
      ]
    },
    {
      name: 'small',
      type: 'boolean',
      label: 'Small',
      defaultValue: false,
      visibleWhen: { property: 'type', value: 'circular' }
    },
    {
      name: 'speed',
      type: 'number',
      label: 'Speed',
      defaultValue: 1,
      visibleWhen: { property: 'type', value: 'circular' }
    },
    {
      name: 'value',
      type: 'number',
      label: 'Value',
      defaultValue: 12,
      visibleWhen: [
        { property: 'type', value: 'linear' },
        { property: 'calculate', value: true },
        { property: 'hidePercentage', value: false }
      ]
    }
  ];

  protected form = viewChild.required('formComponent', { read: DynamicReusableForm });
}
