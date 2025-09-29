/**
 *              © 2025 Visa
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
import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
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
  // Signal to track form control value
  formValue = signal<string | null>(null);

  // Computed signal for formatted display value
  formValueDisplay = computed(() => {
    const value = this.formValue();
    return value !== undefined ? value : 'none';
  });

  constructor() {
    // Initialize signal with initial form control value
    this.formValue.set(this.listboxFormControl.value);

    // Subscribe to form control value changes
    this.listboxFormControl.valueChanges.subscribe((value) => {
      this.formValue.set(value);
    });
  }
}
