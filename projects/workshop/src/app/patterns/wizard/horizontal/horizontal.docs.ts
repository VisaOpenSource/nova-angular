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
import { InputDirective, NovaLibModule } from '@visa/nova-angular';
import {
  VisaArrowBackTiny,
  VisaArrowForwardTiny,
  VisaCheckmarkTiny,
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

/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-wizard-horizontal',
  templateUrl: './horizontal.docs.html',
  standalone: true,
  imports: [
    FormsModule,
    NgTemplateOutlet,
    NovaLibModule,
    VisaChevronRightTiny,
    VisaCloseTiny,
    VisaErrorLow,
    VisaCheckmarkTiny,
    VisaErrorAltTiny,
    VisaErrorTiny,
    VisaArrowForwardTiny,
    VisaArrowBackTiny,
    SharedWizardSuccessPageComponent,
    SharedWizardExitDialogComponent,
    SharedWizardSaveFlagComponent,
    SharedWizardSummaryPageComponent,
  ],
})
export class HorizontalWizardComponent {
  readonly exitDialog =
    viewChild<SharedWizardExitDialogComponent>('exitDialog');
  readonly inputs = viewChildren<InputDirective, ElementRef<HTMLInputElement>>(
    InputDirective,
    { read: ElementRef },
  );
  readonly currentStep = signal(0);
  readonly showFlag = signal(false);
  readonly showSuccess = signal(false);
  readonly steps = [
    {
      stepLabel: 'Step 1 label',
      id: 'horizontal-0',
      invalid: false,
      complete: false,
      available: true,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
    {
      stepLabel: 'Step 2 label',
      id: 'horizontal-1',
      invalid: false,
      complete: false,
      available: false,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
    {
      stepLabel: 'Step 3 label',
      id: 'horizontal-2',
      invalid: false,
      complete: false,
      available: false,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
    {
      stepLabel: 'Step 4 label',
      id: 'horizontal-3',
      invalid: false,
      complete: false,
      available: false,
      inputLabel: '* Label',
      inputValue: '',
      showErrorMessage: false,
    },
    {
      stepLabel: 'Step 5 label',
      id: 'horizontal-4',
      invalid: false,
      complete: false,
      available: false,
      showErrorMessage: false,
    },
  ];

  previousStep() {
    this.goTo(this.currentStep() - 1);
  }

  nextStep(isSave: boolean = false) {
    if (isSave) return this.showFlag.set(true);

    const currentStep = this.steps[this.currentStep()];
    currentStep.invalid = !currentStep.inputValue;

    this.validateStep(this.currentStep());
    if (!currentStep.invalid) {
      // only make the next step available if current is valid
      if (this.currentStep() + 1 < this.steps.length) {
        this.steps[this.currentStep() + 1].available = true;
      }
      this.goTo(this.currentStep() + 1);
      return;
    }

    currentStep.complete = false;

    setTimeout(() => {
      const input = this.inputs()[this.currentStep()];
      if (
        input &&
        currentStep.inputLabel &&
        input.nativeElement !== document.activeElement
      ) {
        input.nativeElement.focus();
      }
    }, 0);
  }

  goTo(index: number) {
    const currentStep = this.steps[this.currentStep()];

    // clear error state for the current step when navigating away
    currentStep.invalid = false;
    currentStep.showErrorMessage = false;

    // validate the current step if navigating forward
    if (index > this.currentStep()) {
      this.validateStep(this.currentStep());
      if (currentStep.invalid) {
        currentStep.complete = false;
        return;
      }
      currentStep.complete = true;
    }

    this.steps[index].available = true;
    this.currentStep.set(index);

    // wait for input to render before setting focus
    setTimeout(() => {
      if (this.currentStep() < this.steps.length - 1) {
        const input = this.inputs()[this.currentStep()];
        const nextStep = this.steps[this.currentStep()];
        if (
          input &&
          nextStep.inputLabel &&
          input.nativeElement !== document.activeElement
        ) {
          input.nativeElement.focus();
        }
      } else {
        // focus the first edit button on the summary page
        const firstEditButton = document.querySelector('[aria-label^="edit"]');
        if (firstEditButton && firstEditButton !== document.activeElement) {
          (firstEditButton as HTMLElement).focus();
        }
      }
    }, 0);
  }

  submit() {
    this.showSuccess.set(true);
    this.steps.forEach((input, index) => {
      input.available = index === 0 ? true : false;
      input.complete = false;
      input.inputValue = '';
    });
    this.currentStep.set(0);
  }

  hideErrorMessage(index: number): void {
    this.steps[index].showErrorMessage = false;
  }

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
