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
import { ChangeDetectionStrategy, Component, inject, viewChildren, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListboxDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-listbox-model-driven-fb',
  templateUrl: './model-driven-fb.docs.html',
  standalone: true,
  imports: [NovaLibModule, ReactiveFormsModule, VisaErrorTiny]
})
export class ModelDrivenFBListboxComponent {
  readonly fb = inject(FormBuilder);

  readonly listboxes = viewChildren(ListboxDirective);

  // Signals to track form control values
  singleSelectValue = signal<string | null>(null);
  multiSelectValue = signal<string[] | null>(null);

  // Computed signals for formatted display values
  singleSelectDisplay = computed(() => {
    const value = this.singleSelectValue();
    return value !== undefined ? value : 'none';
  });

  multiSelectDisplay = computed(() => {
    const value = this.multiSelectValue();
    return value !== undefined ? value : 'none';
  });
  readonly singleSelectItems = [
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

  multiselectItems = [
    {
      label: 'Item A',
      value: 'item-a-multiselect-reactive'
    },
    {
      label: 'Item B',
      value: 'item-b-multiselect-reactive'
    },
    {
      label: 'Item C',
      value: 'item-c-multiselect-reactive'
    },
    {
      label: 'Item D',
      value: 'item-d-multiselect-reactive'
    },
    {
      label: 'Item E',
      value: 'item-e-multiselect-reactive',
      active: true
    },
    {
      label: 'Item F',
      value: 'item-f-multiselect-reactive'
    },
    {
      label: 'Item G',
      value: 'item-g-multiselect-reactive'
    }
  ];

  formValidation = this.fb.group({
    ssFormControl: ['', Validators.required],
    msFormControl: [[], Validators.required]
  });
  isSubmitted = false;

  constructor() {
    // Initialize signals with initial form control values
    const ssControl = this.formValidation.get('ssFormControl');
    const msControl = this.formValidation.get('msFormControl');

    this.singleSelectValue.set(ssControl?.value || null);
    this.multiSelectValue.set(msControl?.value || null);

    // Subscribe to form value changes
    ssControl?.valueChanges.subscribe((value) => {
      this.singleSelectValue.set(value || null);
    });

    msControl?.valueChanges.subscribe((value) => {
      this.multiSelectValue.set(value || null);
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    const invalidIndex = Object.values(this.formValidation.controls).findIndex((control) => control.invalid);
    if (invalidIndex !== -1) {
      this.listboxes()[invalidIndex]?.listItems()[0].el.nativeElement.focus();
    }

    // Update signals with current form control values
    const ssControl = this.formValidation.get('ssFormControl');
    const msControl = this.formValidation.get('msFormControl');

    this.singleSelectValue.set(ssControl?.value || null);
    this.multiSelectValue.set(msControl?.value || null);
  }

  // Handle form reset
  onReset() {
    this.isSubmitted = false;
    this.formValidation.reset();

    // Reset signals
    this.singleSelectValue.set(null);
    this.multiSelectValue.set(null);
  }
}
