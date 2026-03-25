/**
 *              © 2026 Visa
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
import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  linkedSignal,
  model
} from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IdGenerator, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

// This is from the reusable checkbox component example. If copying this code please copy the component into your codebase.
import { ReusableCheckbox } from '../../reusable/reusable-component/reusable-component.docs';

export interface CheckboxGroup {
  checked?: boolean;
  children?: CheckboxGroup[];
  description?: string;
  disabled?: string;
  label: string;
}

/// This allows for reactive `formControl`'s or `ngModel`'s
const CHECKBOX_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ReusableCheckboxGroup),
  multi: true
};

/** @AI-first */
@Component({
  selector: 'nova-reusable-checkbox-group',
  imports: [CommonModule, NovaLibModule, ReusableCheckbox, VisaErrorTiny],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CHECKBOX_GROUP_VALUE_ACCESSOR],
  templateUrl: './reusable-component.docs.html'
})
export class ReusableCheckboxGroup extends DefaultValueAccessor {
  // Unique ID for the input
  private readonly generatedId = inject(IdGenerator).newId('reusable-checkbox-group');

  // Inputs:
  readonly description = input<string>();
  readonly checkboxes = model<CheckboxGroup[]>([]);
  readonly disabledInput = input(null, { alias: 'disabled', transform: booleanAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly horizontal = input(false, { transform: booleanAttribute });
  readonly invalid = input(null, { transform: booleanAttribute });
  readonly label = input('');
  readonly message = input<string>();
  readonly panel = input(null, { transform: booleanAttribute });
  readonly required = input(null, { transform: booleanAttribute });
  readonly value = input();

  // This input is set to false within the template and not exposed to the user
  readonly root = input(true, { transform: booleanAttribute }); // as opposed to nested group

  // Computed values:
  protected readonly disabled = linkedSignal(() => this.disabledInput());
  protected readonly fieldsetLabelledBy = computed(() => {
    const id = this.id();
    const legendId = id + '-legend';
    const descriptionId = this.description() ? id + '-description' : false;
    return [legendId, descriptionId].filter(Boolean).join(' ');
  });
  protected readonly id = computed(() => this.idInput() ?? this.generatedId);

  // Effects:
  protected readonly disabledEffect = effect(() => {
    const disabled = !!this.disabled();
    this.setDisabledState(disabled);
  });

  // Helpers:
  protected getChecked(group: CheckboxGroup): boolean {
    const { children } = group;
    if (!children?.length) return !!group.checked;
    return children.every((c) => c.checked);
  }

  protected getIndeterminate(group: CheckboxGroup, everyChecked: boolean): boolean {
    const { children } = group;
    if (!children?.length) return false;
    return children.some((c) => c.checked || this.recursivelyLookForCheckedChildren(c.children)) && !everyChecked;
  }

  // Events:
  protected handleCheckChange(checked: boolean, index: number) {
    this.checkboxes.update((boxes) => {
      const box = boxes[index];
      box.checked = checked;
      if (box.children?.length) {
        box.children = this.updateChildrenRecursively(box.children, checked);
      }
      return [...boxes];
    });
  }

  private recursivelyLookForCheckedChildren(children?: CheckboxGroup[]): boolean {
    if (!children?.length) return false;
    for (const child of children) {
      if (child.checked) {
        return true;
      }
      if (child.children?.length) {
        if (this.recursivelyLookForCheckedChildren(child.children)) {
          return true;
        }
      }
    }
    return false;
  }

  private updateChildrenRecursively(children: CheckboxGroup[], checked: boolean): CheckboxGroup[] {
    return children.map((child) => ({
      ...child,
      checked,
      children: child.children?.length ? this.updateChildrenRecursively(child.children, checked) : child.children
    }));
  }

  protected handleGroupChange(newGroup: CheckboxGroup[], groupIndex: number) {
    this.checkboxes.update((boxes) => {
      const group = boxes[groupIndex];
      if (group) {
        group.children = [...newGroup];
        // Update parent's checked state based on children
        group.checked = newGroup.every((c) => c.checked);
      }
      return [...boxes];
    });
  }
}
