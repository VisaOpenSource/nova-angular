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
import { ReusableBanner } from './reusable-component/reusable-component.docs';

/**
 * This is a reusable component template.
 * The files in the reusable-component/ subdirectory are the component implementation you can copy and modify.
 * The other files show usage examples.
 * #AI-first
 */
@Component({
  selector: 'nova-reusable-banner-demo',
  imports: [NovaLibModule, ReusableBanner, DynamicReusableForm],
  templateUrl: './reusable.docs.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableBannerDemo {
  readonly name = 'reusable-banner-demo';

  protected propertyConfigs: PropertyConfig[] = [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Success title',
      label: 'Title'
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'This is required text that describes the banner in more detail.',
      label: 'Description'
    },
    {
      name: 'messageType',
      type: 'enum',
      defaultValue: 'success',
      label: 'Message type',
      options: ['success', 'information', 'warning', 'error', 'subtle'].map((type) => ({
        label: capitalCase(type),
        value: type
      }))
    },
    {
      name: 'titleLevel',
      type: 'enum',
      defaultValue: '4',
      label: 'Title level',
      options: ['1', '2', '3', '4', '5', '6'].map((level) => ({ label: level, value: level }))
    },
    {
      name: 'showIcon',
      type: 'boolean',
      defaultValue: true,
      label: 'Show icon'
    },
    {
      name: 'dismissible',
      type: 'boolean',
      defaultValue: true,
      label: 'Dismissible'
    },
    {
      name: 'showButton',
      type: 'boolean',
      defaultValue: false,
      label: 'Show button'
    },
    {
      name: 'buttonLabel',
      type: 'string',
      defaultValue: '',
      label: 'Button label',
      visibleWhen: { property: 'showButton', value: true },
      defaultLabel: 'Action'
    },
    {
      name: 'showLink',
      type: 'boolean',
      defaultValue: false,
      label: 'Show link'
    },
    {
      name: 'linkLabel',
      type: 'string',
      defaultValue: '',
      label: 'Link label',
      visibleWhen: { property: 'showLink', value: true },
      defaultLabel: 'Learn more'
    },
    {
      name: 'href',
      type: 'string',
      defaultValue: 'www.visa.com',
      label: 'Href',
      visibleWhen: { property: 'showLink', value: true }
    },
    {
      name: 'isGlobal',
      type: 'boolean',
      defaultValue: false,
      label: 'Global banner',
      helpText:
        "When enabled, the banner sticks to the top of its container (not the full screen) and increases the container's height."
    }
  ];

  protected form = viewChild.required('formComponent', { read: DynamicReusableForm });

  protected handleClose() {
    console.log('Banner closed');
  }

  protected handleClick() {
    console.log('Banner button clicked');
  }
}
