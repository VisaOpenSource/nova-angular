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
import { ChangeDetectionStrategy, Component, viewChildren, signal, viewChild, computed } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ListboxDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-listbox-template-driven-form',
  templateUrl: './template-driven-form.docs.html',
  standalone: true,
  imports: [NovaLibModule, FormsModule, VisaErrorTiny]
})
export class TemplateDrivenFormListboxComponent {
  readonly listboxes = viewChildren(ListboxDirective);
  isSubmitted = false;

  readonly ss_items = [
    {
      label: 'Item A',
      value: 'item-a-template'
    },
    {
      label: 'Item B',
      value: 'item-b-template'
    },
    {
      label: 'Item C',
      value: 'item-c-template'
    },
    {
      label: 'Item D',
      value: 'item-d-template'
    },
    {
      label: 'Item E',
      value: 'item-e-template'
    },
    {
      label: 'Item F',
      value: 'item-f-template'
    },
    {
      label: 'Item G',
      value: 'item-g-template'
    }
  ];
  readonly ms_items = [
    {
      label: 'Item A',
      value: 'item-a-multiselect-template'
    },
    {
      label: 'Item B',
      value: 'item-b-multiselect-template'
    },
    {
      label: 'Item C',
      value: 'item-c-multiselect-template'
    },
    {
      label: 'Item D',
      value: 'item-d-multiselect-template'
    },
    {
      label: 'Item E',
      value: 'item-e-multiselect-template',
      active: true
    },
    {
      label: 'Item F',
      value: 'item-f-multiselect-template'
    },
    {
      label: 'Item G',
      value: 'item-g-multiselect-template'
    }
  ];

  handleFormSubmit(form: NgForm) {
    this.isSubmitted = true;
    if (form.invalid) {
      const invalidIndex = Object.values(form.controls).findIndex((control) => control.invalid);
      if (invalidIndex !== -1) {
        this.listboxes()[invalidIndex].listItems()[0]?.el.nativeElement.focus();
      }
    }

    // For demo: track form values for display using signals
    this.formValues.set(form.value || {});
  }

  handleFormReset(form: NgForm) {
    this.isSubmitted = false;
    form.reset();

    // For demo: track form values for display using signals
    this.formValues.set({});
  }

  // For demo: update tracked values on change
  onFormChange(form: NgForm) {
    this.formValues.set(form.value || {});
  }

  // For demo: store form values for display as a signal
  readonly formValues = signal<{ singleselect?: string | null; multiselect?: string[] | null }>({});

  // For demo: display helpers as computed signals
  readonly singleSelectDisplay = computed(() => this.formValues().singleselect ?? 'none');

  readonly multiSelectDisplay = computed(() => this.formValues().multiselect ?? 'none');
}
