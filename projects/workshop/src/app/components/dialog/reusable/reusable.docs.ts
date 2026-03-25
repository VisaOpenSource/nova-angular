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
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { capitalCase } from 'change-case';
import {
  DynamicReusableForm,
  PropertyConfig
} from '../../../shared/app-components/reusable-components-form/dynamic-reusable-form';
import { ReusableDialog } from './reusable-component/reusable-component.docs';

/**
 * This is a reusable component template.
 * The files in the reusable-component/ subdirectory are the component implementation you can copy and modify.
 * The other files show usage examples.
 * #AI-first
 */
@Component({
  selector: 'nova-reusable-dialog-demo',
  imports: [NovaLibModule, ReusableDialog, DynamicReusableForm],
  templateUrl: './reusable.docs.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableDialogDemo {
  readonly name = 'reusable-dialog-demo';

  readonly dialogOpen = signal(false);

  protected propertyConfigs: PropertyConfig[] = [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Reusable title',
      label: 'Title'
    },
    {
      name: 'description',
      type: 'string',
      defaultValue: 'This is required text that describes the dialog title in more detail.',
      label: 'Description'
    },
    {
      name: 'messageType',
      type: 'enum',
      defaultValue: 'information',
      label: 'Message type',
      options: ['information', 'success', 'warning', 'error'].map((type) => ({
        label: capitalCase(type),
        value: type
      }))
    },
    {
      name: 'dismissible',
      type: 'boolean',
      defaultValue: true,
      label: 'Dismissible'
    },
    {
      name: 'showIcon',
      type: 'boolean',
      defaultValue: true,
      label: 'Show icon'
    },
    {
      name: 'showPrimaryButton',
      type: 'boolean',
      defaultValue: true,
      label: 'Show primary button'
    },
    {
      name: 'primaryButtonLabel',
      type: 'string',
      defaultValue: 'Primary action',
      label: 'Primary button label',
      visibleWhen: { property: 'showPrimaryButton', value: true }
    },
    {
      name: 'showSecondaryButton',
      type: 'boolean',
      defaultValue: true,
      label: 'Show secondary button'
    },
    {
      name: 'secondaryButtonLabel',
      type: 'string',
      defaultValue: 'Secondary action',
      label: 'Secondary button label',
      visibleWhen: { property: 'showSecondaryButton', value: true }
    }
  ];

  protected form = viewChild.required('formComponent', { read: DynamicReusableForm });

  protected handlePrimaryClick() {
    console.log('Dialog primary button clicked');
  }

  protected handleSecondaryClick() {
    console.log('Dialog secondary button clicked');
  }
}
