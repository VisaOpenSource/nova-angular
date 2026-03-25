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
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { ListboxDirective, MultiSelectValue, NovaLibModule, NovaLibService } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #docs */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-listbox-multi-select-with-error',
  templateUrl: './multi-select-with-error.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaErrorTiny]
})
export class MultiSelectWithErrorListboxComponent {
  readonly listbox = viewChild(ListboxDirective);
  readonly items = [
    {
      label: 'Item A',
      value: 'item-a-multiselect'
    },
    {
      label: 'Item B',
      value: 'item-b-multiselect'
    },
    {
      label: 'Item C',
      value: 'item-c-multiselect'
    },
    {
      label: 'Item D',
      value: 'item-d-multiselect'
    },
    {
      label: 'Item E',
      value: 'item-e-multiselect'
    },
    {
      label: 'Item F',
      value: 'item-f-multiselect'
    },
    {
      label: 'Item G',
      value: 'item-g-multiselect'
    }
  ];
  readonly value: WritableSignal<MultiSelectValue | null> = signal<MultiSelectValue | null>(null);
  readonly submitted: WritableSignal<boolean> = signal(false);
  readonly isInvalid: Signal<boolean> = computed(() => this.submitted() && !this.value());

  readonly novaLibService = inject(NovaLibService);

  handleSubmit() {
    const listbox = this.listbox();
    this.submitted.set(true);
    if (!this.isInvalid || !listbox) return;
    const focusableIndex = this.novaLibService.nextEnabledItem(listbox.listItems());
    listbox.listItems()[focusableIndex].el.nativeElement.focus();
  }

  handleReset() {
    this.submitted.set(false);
    this.value.set(null);
  }
}
