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
import { ReusablePagination } from './reusable-component/reusable-component.docs';

/**
 * This is a reusable component template.
 * The files in the reusable-component/ subdirectory are the component implementation you can copy and modify.
 * The other files show usage examples.
 * #AI-first
 */
@Component({
  selector: 'nova-reusable-pagination-demo',
  imports: [NovaLibModule, ReusablePagination, DynamicReusableForm],
  templateUrl: './reusable.docs.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusablePaginationDemo {
  readonly name = 'reusable-pagination-demo';

  protected propertyConfigs: PropertyConfig[] = [
    {
      name: 'ariaLabel',
      type: 'string',
      defaultValue: 'Pagination for table',
      label: 'Aria label'
    },
    {
      name: 'totalItems',
      type: 'number',
      defaultValue: 100,
      label: 'Total items'
    },
    {
      name: 'selectedPage',
      type: 'number',
      defaultValue: 1,
      label: 'Selected page (initial)'
    },
    {
      name: 'itemsPerPageOptions',
      type: 'json',
      defaultValue: JSON.stringify([5, 10, 15, 20], null, 2),
      label: 'Items per page options (JSON array)',
      helpText: 'Array of numbers for the items per page dropdown options.'
    },
    {
      name: 'compact',
      type: 'boolean',
      defaultValue: false,
      label: 'Compact'
    },
    {
      name: 'inline',
      type: 'boolean',
      defaultValue: true,
      label: 'Inline'
    },
    {
      name: 'showItemsPerPage',
      type: 'boolean',
      defaultValue: true,
      label: 'Show items per page'
    },
    {
      name: 'showPageRange',
      type: 'boolean',
      defaultValue: true,
      label: 'Show page range'
    },
    {
      name: 'startBlockSize',
      type: 'number',
      defaultValue: 5,
      label: 'Start block size'
    },
    {
      name: 'endBlockSize',
      type: 'number',
      defaultValue: 5,
      label: 'End block size'
    },
    {
      name: 'middleBlockSize',
      type: 'number',
      defaultValue: 3,
      label: 'Middle block size'
    }
  ];

  protected form = viewChild.required('formComponent', { read: DynamicReusableForm });

  // Helper method to parse items per page options JSON
  protected parseItemsPerPageOptions(optionsString: string): number[] {
    try {
      const parsed = JSON.parse(optionsString);
      return Array.isArray(parsed) ? parsed : [5, 10, 15, 20];
    } catch {
      return [5, 10, 15, 20];
    }
  }
}
