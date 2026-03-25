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
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';

/** #framework-specific */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaLibModule, ReactiveFormsModule],
  standalone: true,
  selector: 'nova-workshop-listbox-single-select-model-driven',
  templateUrl: './single-select-model-driven.docs.html'
})
export class SingleSelectModelDrivenListboxComponent {
  items = [
    {
      label: 'Item A',
      value: 'item-a-reactive'
    },
    {
      label: 'Item B',
      value: 'item-b-reactive'
    },
    {
      label: 'Item C',
      value: 'item-c-reactive'
    },
    {
      label: 'Item D',
      value: 'item-d-reactive'
    },
    {
      label: 'Item E',
      value: 'item-e-reactive',
      active: true
    },
    {
      label: 'Item F',
      value: 'item-f-reactive'
    },
    {
      label: 'Item G',
      value: 'item-g-reactive'
    }
  ];
  listboxFormControl = new FormControl(this.items[2].value);

  /** For demo purposes */
  // Signal to track form control value using toSignal
  formValue = toSignal(this.listboxFormControl.valueChanges, {
    initialValue: this.listboxFormControl.value
  });

  // Computed signal for formatted display value
  formValueDisplay = computed(() => {
    const value = this.formValue();
    return value !== undefined ? value : '';
  });
}
