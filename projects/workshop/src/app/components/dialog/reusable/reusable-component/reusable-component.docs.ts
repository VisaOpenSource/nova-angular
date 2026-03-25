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
import { CdkTrapFocus } from '@angular/cdk/a11y';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  output,
  viewChild
} from '@angular/core';
import { DialogDirective, IdGenerator, MessageType, NovaLibModule } from '@visa/nova-angular';
import {
  VisaCloseTiny,
  VisaErrorLow,
  VisaInformationLow,
  VisaSuccessLow,
  VisaWarningLow
} from '@visa/nova-icons-angular';

/** #AI-first */
@Component({
  selector: 'nova-reusable-dialog',
  imports: [
    CdkTrapFocus,
    NovaLibModule,
    VisaErrorLow,
    VisaInformationLow,
    VisaSuccessLow,
    VisaWarningLow,
    VisaCloseTiny
  ],
  templateUrl: './reusable-component.docs.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableDialog {
  // Unique ID for the input
  private readonly generatedId = inject(IdGenerator).newId('reusable-dialog');

  private readonly dialog = viewChild<DialogDirective, ElementRef<HTMLDialogElement>>(DialogDirective, {
    read: ElementRef
  });

  // Inputs:
  readonly description = input<string>();
  readonly dismissible = input(null, { transform: booleanAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly messageType = input<MessageType>('information');
  readonly open = model<boolean>(false);
  readonly primaryButtonLabel = input<string>();
  readonly secondaryButtonLabel = input<string>();
  readonly showIcon = input(null, { transform: booleanAttribute });
  readonly title = input<string>();

  // Outputs:
  readonly primaryButtonClick = output<Event>();
  readonly secondaryButtonClick = output<Event>();

  // Computed values:
  protected readonly id = computed(() => this.idInput() ?? this.generatedId);

  protected readonly openEffect = effect(() => {
    const open = this.open();
    const el = this.dialog()?.nativeElement;
    if (!el) return;
    if (open) return el.showModal();
    el.close();
  });

  public close() {
    this.open.set(false);
  }

  public show() {
    this.open.set(true);
  }

  protected handleEscapeKey(event: Event) {
    event.preventDefault();
    if (!this.dismissible()) return;
    this.close();
  }

  public toggleDialog() {
    this.open.update((open) => !open);
  }
}
