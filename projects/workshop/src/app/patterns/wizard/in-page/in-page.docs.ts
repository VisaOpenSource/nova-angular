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
  readonly exitDialog =
    viewChild<SharedWizardExitDialogComponent>('exitDialog');
  readonly accordionHeadings = viewChildren(AccordionHeadingDirective);
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

  previousStep() {
    this.goTo(this.currentStep() - 1);
  }

  nextStep(isSave: boolean = false) {
    if (isSave) return this.showFlag.set(true);

    const currentStep = this.steps[this.currentStep()];
    currentStep.invalid = !currentStep.inputValue;

    this.validateStep(this.currentStep());
    if (!currentStep.invalid) return this.goTo(this.currentStep() + 1);

    currentStep.complete = false;
    for (let i = this.currentStep() + 1; i < this.steps.length; i++) {
      if (!this.steps[i].available) {
        this.steps[i].available = false;
      }
    }
    this.inputs()[this.currentStep()].nativeElement.focus();
  }

  goTo(index: number, event?: MouseEvent) {
    this.showFlag.set(false);
    if (!this.steps[this.currentStep()]) return;
    if (!this.steps[index]) return;

    const currentStepIdx = this.currentStep();
    const currentStep = this.steps[currentStepIdx];

    // validate current step if navigating forward
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

    for (let i = 0; i <= index; i++) {
      this.steps[i].available = true;
    }

    // reset error state for current step if navigating away
    currentStep.showErrorMessage = false;
    currentStep.invalid = false;

    this.currentStep.set(index);

    setTimeout(() => {
      // wait for new item to enable before setting focus
      const { hostButton } = this.accordionHeadings()[index];
      hostButton?.el.nativeElement.focus();
    });
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
