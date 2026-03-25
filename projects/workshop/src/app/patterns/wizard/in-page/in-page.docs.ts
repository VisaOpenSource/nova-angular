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
  ElementRef,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import {
  AccordionHeadingDirective,
  InputDirective,
  NovaLibModule,
} from '@visa/nova-angular';
import {
  VisaArrowBackTiny,
  VisaArrowForwardTiny,
  VisaCheckmarkTiny,
  VisaChevronDownTiny,
  VisaChevronRightTiny,
  VisaCloseTiny,
  VisaErrorAltTiny,
  VisaErrorLow,
  VisaErrorTiny,
} from '@visa/nova-icons-angular';
import { SharedWizardExitDialogComponent } from '../shared/exit-dialog/exit-dialog.docs';
import { SharedWizardSaveFlagComponent } from '../shared/save-flag/save-flag.docs';
import { SharedWizardSuccessPageComponent } from '../shared/success-page/success-page.docs';
import { SharedWizardSummaryPageComponent } from '../shared/summary-page/summary-page.docs';

/**
 * Single-page wizard using accordion panels for each step.
 * All steps are visible on one page, with only the active step expanded.
 * Users can navigate by expanding accordion panels, validated on forward progression.
 */
/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-wizard-in-page',
  templateUrl: './in-page.docs.html',
  standalone: true,
  imports: [
    FormsModule,
    NgTemplateOutlet,
    NovaLibModule,
    VisaChevronRightTiny,
    VisaCheckmarkTiny,
    VisaCloseTiny,
    VisaErrorLow,
    VisaErrorAltTiny,
    VisaErrorTiny,
    VisaArrowForwardTiny,
    VisaChevronDownTiny,
    VisaArrowBackTiny,
    SharedWizardSuccessPageComponent,
    SharedWizardExitDialogComponent,
    SharedWizardSaveFlagComponent,
    SharedWizardSummaryPageComponent,
  ],
})
export class InPageWizardComponent {
  /** Reference to the exit confirmation dialog component */
  readonly exitDialog =
    viewChild<SharedWizardExitDialogComponent>('exitDialog');

  /** References to all accordion heading directives for focus management */
  readonly accordionHeadings = viewChildren(AccordionHeadingDirective);

  /** References to all input elements in the wizard steps */
  readonly inputs = viewChildren<InputDirective, ElementRef<HTMLInputElement>>(
    InputDirective,
    { read: ElementRef },
  );

  /** Index of the currently active step (zero-based) */
  readonly currentStep = signal(0);

  /** Controls visibility of the save success flag notification */
  readonly showFlag = signal(false);

  /** Controls whether the success page is displayed after submission */
  readonly showSuccess = signal(false);

  /**
   * Configuration for each wizard step including label, validation state, and input values.
   * Each step tracks its own completion status, availability, and error state.
   */
  readonly steps = [
    {
      stepLabel: 'Step 1 label',
      id: 'in-page-0',
      invalid: false,
      complete: false,
      available: true,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
    {
      stepLabel: 'Step 2 label',
      id: 'in-page-1',
      invalid: false,
      complete: false,
      available: false,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
    {
      stepLabel: 'Step 3 label',
      id: 'in-page-2',
      invalid: false,
      complete: false,
      available: false,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
    {
      stepLabel: 'Step 4 label',
      id: 'in-page-3',
      invalid: false,
      complete: false,
      available: false,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
    {
      stepLabel: 'Step 5 label',
      id: 'in-page-4',
      invalid: false,
      complete: false,
      available: false,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
  ];

  /**
   * Navigates to the previous step in the wizard.
   */
  previousStep() {
    this.goTo(this.currentStep() - 1);
  }

  /**
   * Advances to the next step after validating the current step's input.
   * If called with isSave=true, displays the save flag instead of advancing.
   * If validation fails, marks future steps as unavailable.
   * @param {boolean} isSave - Whether this is a save action rather than navigation
   */
  nextStep(isSave: boolean = false) {
    if (isSave) return this.showFlag.set(true);

    const currentStep = this.steps[this.currentStep()];
    currentStep.invalid = !currentStep.inputValue;

    this.validateStep(this.currentStep());
    if (!currentStep.invalid) return this.goTo(this.currentStep() + 1);

    currentStep.complete = false;
    // Keep unavailable steps unavailable when current step is invalid
    for (let i = this.currentStep() + 1; i < this.steps.length; i++) {
      if (!this.steps[i].available) {
        this.steps[i].available = false;
      }
    }
    this.inputs()[this.currentStep()].nativeElement.focus();
  }

  /**
   * Navigates to a specific step by index.
   * Validates the current step if navigating forward. Prevents navigation if validation fails.
   * Makes all steps up to the target index available.
   * @param {number} index - Zero-based index of the target step
   * @param {MouseEvent} [event] - Optional mouse event to prevent default on validation failure
   */
  goTo(index: number, event?: MouseEvent) {
    this.showFlag.set(false);
    if (!this.steps[this.currentStep()]) return;
    if (!this.steps[index]) return;

    const currentStepIdx = this.currentStep();
    const currentStep = this.steps[currentStepIdx];

    // Validate current step if navigating forward
    if (index > currentStepIdx) {
      this.validateStep(currentStepIdx);
      if (currentStep.invalid) {
        event?.preventDefault();
        currentStep.complete = false;
        currentStep.showErrorMessage = true;
        this.inputs()[currentStepIdx].nativeElement.focus();
        return;
      }
      currentStep.complete = true;
    }

    // Make all steps up to target available
    for (let i = 0; i <= index; i++) {
      this.steps[i].available = true;
    }

    // Clear error state when navigating away
    currentStep.showErrorMessage = false;
    currentStep.invalid = false;

    this.currentStep.set(index);

    // Focus the accordion heading button after navigation
    setTimeout(() => {
      const { hostButton } = this.accordionHeadings()[index];
      hostButton?.el.nativeElement.focus();
    });
  }

  /**
   * Completes the wizard submission, displays the success page, and resets all step data.
   */
  submit() {
    this.showSuccess.set(true);
    this.steps.forEach((input, index) => {
      input.available = index === 0 ? true : false;
      input.complete = false;
      input.inputValue = '';
    });
    this.currentStep.set(0);
  }

  /**
   * Hides the error message banner for a specific step.
   * @param {number} index - Index of the step whose error message should be hidden
   */
  hideErrorMessage(index: number): void {
    this.steps[index].showErrorMessage = false;
  }

  /**
   * Validates a step's input value and updates its error state.
   * A step is invalid if its input value is empty or contains only whitespace.
   * @param {number} index - Index of the step to validate
   */
  validateStep(index: number): void {
    const step = this.steps[index];
    if (!step.inputValue || step.inputValue.trim() === '') {
      step.invalid = true;
      step.showErrorMessage = true;
    } else {
      step.invalid = false;
      step.showErrorMessage = false;
    }
  }
}
