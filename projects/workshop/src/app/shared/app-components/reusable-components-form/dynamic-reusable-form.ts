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
import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaChevronDownTiny,
  VisaCloseTiny,
  VisaMediaFastForwardTiny,
  VisaMediaRewindTiny
} from '@visa/nova-icons-angular';

/**
 * Property configuration for dynamic form generation
 */
export interface PropertyConfig {
  name: string;
  type: 'boolean' | 'string' | 'number' | 'enum' | 'json';
  defaultValue?: any;
  options?: { label: string; value: any }[]; // For enum types
  label?: string; // Display label (defaults to name)
  visibleWhen?: { property: string; value: any } | Array<{ property: string; value: any }>; // Conditional visibility (single condition or array of conditions that must all be met)
  defaultLabel?: string; // Default label to use when condition is met but field is empty
  helpText?: string; // Optional help text displayed below the field
}

/**
 * Dynamic form generator for reusable components
 *
 * Takes a list of property configurations and generates appropriate form controls
 * (checkboxes for booleans, text inputs for strings, selects for enums, etc.)
 *
 * Usage:
 * <nova-dynamic-reusable-form
 *   [properties]="propertyConfigs"
 *   (valuesChange)="handleValuesChange($event)"
 * />
 */
@Component({
  selector: 'nova-dynamic-reusable-form',
  standalone: true,
  imports: [
    NovaLibModule,
    ReactiveFormsModule,
    VisaMediaRewindTiny,
    VisaMediaFastForwardTiny,
    VisaCloseTiny,
    TextFieldModule,
    VisaChevronDownTiny
  ],
  templateUrl: './dynamic-reusable-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'nova-dynamic-reusable-form' }
})
export class DynamicReusableForm implements OnInit {
  readonly expanded = signal(true);

  /**
   * Toggle the expanded state of the form panel
   */
  toggleExpanded() {
    this.expanded.update((expanded) => !expanded);
  }

  // Input: Array of property configurations
  readonly properties = input.required<PropertyConfig[]>();

  // Computed array of JSON properties for special handling (appear on their own row since they can be complex objects)
  readonly jsonProperties = computed<PropertyConfig[]>(() => {
    const props = this.properties();
    const currentValues = this.customizations();
    return props.filter((prop) => {
      const isJson = prop.type === 'json';
      if (!isJson) return false;

      if (!prop.visibleWhen) return true;
      return this.checkVisibility(prop.visibleWhen, currentValues);
    });
  });

  // Computed grouping of properties by type for form generation, also applying visibility conditions
  readonly propertiesSplit = computed<Array<{ type: string; title: string; properties: PropertyConfig[] }>>(() => {
    const props = this.properties();
    const currentValues = this.customizations();
    const booleans: PropertyConfig[] = [];
    const others: PropertyConfig[] = [];

    // Filter properties based on visibility conditions
    const visibleProps = props.filter((prop) => {
      if (!prop.visibleWhen) return true;
      return this.checkVisibility(prop.visibleWhen, currentValues);
    });

    visibleProps.forEach((prop) => {
      if (prop.type === 'boolean') {
        booleans.push(prop);
      } else if (prop.type !== 'json') {
        others.push(prop);
      }
    });

    // Return two groups, filtering out empty ones
    return [
      { type: 'boolean', title: 'Boolean properties', properties: booleans },
      { type: 'other', title: 'Text/numeric properties', properties: others }
    ].filter((group) => group.properties.length > 0);
  });

  // Form group and state
  protected form!: FormGroup;
  protected readonly customizations = signal<Record<string, any>>({});
  protected isSubmitted = false;
  private readonly fb = inject(FormBuilder);

  ngOnInit() {
    this.buildForm();

    // Set initial customizations with default values
    this.customizations.set(this.form.value);
  }

  private buildForm() {
    const props = this.properties();
    const formConfig: Record<string, any> = {};

    // Build form controls from property configurations
    props.forEach((prop) => {
      formConfig[prop.name] = prop.defaultValue ?? this.getDefaultForType(prop.type);
    });

    this.form = this.fb.group(formConfig);
  }

  private getDefaultForType(type: PropertyConfig['type']): any {
    switch (type) {
      case 'boolean':
        return false;
      case 'string':
        return '';
      case 'number':
        return 0;
      case 'enum':
        return null;
      case 'json':
        return '';
      default:
        return null;
    }
  }

  /**
   * Check if a property should be visible based on its visibility conditions
   */
  private checkVisibility(
    visibleWhen: { property: string; value: any } | Array<{ property: string; value: any }>,
    currentValues: Record<string, any>
  ): boolean {
    // Handle array of conditions (all must be met)
    if (Array.isArray(visibleWhen)) {
      return visibleWhen.every((condition) => currentValues[condition.property] === condition.value);
    }
    // Handle single condition
    return currentValues[visibleWhen.property] === visibleWhen.value;
  }

  protected handleApply() {
    this.isSubmitted = true;
    if (this.form.valid) {
      const formValue = { ...this.form.value };
      const props = this.properties();

      // Auto-populate fields with defaultLabel when their condition becomes true and field is empty
      props.forEach((prop) => {
        if (prop.visibleWhen && prop.defaultLabel) {
          const conditionMet = this.checkVisibility(prop.visibleWhen, formValue);
          const fieldIsEmpty = !formValue[prop.name] || formValue[prop.name] === '';

          if (conditionMet && fieldIsEmpty) {
            formValue[prop.name] = prop.defaultLabel;
            // Also update the form control so user sees it
            this.form.patchValue({ [prop.name]: prop.defaultLabel }, { emitEvent: false });
          }
        }
      });

      this.customizations.set(formValue);
    }
  }

  protected handleReset() {
    const props = this.properties();
    const defaults: Record<string, any> = {};
    props.forEach((prop) => {
      defaults[prop.name] = prop.defaultValue ?? this.getDefaultForType(prop.type);
    });
    this.form.reset(defaults);
    this.customizations.set(defaults);
    this.isSubmitted = false;
  }

  // Public method to get current values (reactive signal)
  public getValues() {
    return this.customizations();
  }

  // Public signal for reactive binding
  public readonly values = this.customizations.asReadonly();
}
