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
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IdGenerator, MessageType, NovaLibModule } from '@visa/nova-angular';
import {
  VisaCloseTiny,
  VisaErrorLow,
  VisaIdeaLow,
  VisaInformationLow,
  VisaSuccessLow,
  VisaWarningLow
} from '@visa/nova-icons-angular';

/** #AI-first */
@Component({
  selector: 'nova-reusable-section-message',
  imports: [
    NovaLibModule,
    VisaErrorLow,
    VisaIdeaLow,
    VisaInformationLow,
    VisaSuccessLow,
    VisaWarningLow,
    VisaCloseTiny,
    RouterLink
  ],
  templateUrl: './reusable-component.docs.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableSectionMessage {
  // Unique ID for the input
  private readonly generatedId = inject(IdGenerator).newId('reusable-section-message');

  private readonly titleContainer = viewChild.required('titleContainer', { read: ElementRef });

  // Inputs:
  readonly buttonLabel = input<string>();
  readonly description = input<string>();
  readonly dismissible = input(null, { transform: booleanAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly href = input<string>();
  readonly linkLabel = input<string>();
  readonly messageType = input<MessageType>('information');
  readonly showButton = input(false, { transform: booleanAttribute });
  readonly showIcon = input(null, { transform: booleanAttribute });
  readonly showLink = input(false, { transform: booleanAttribute });
  readonly title = input<string>();
  readonly titleLevel = input<'1' | '2' | '3' | '4' | '5' | '6'>('4');

  // Outputs:
  readonly buttonClick = output<Event>();
  readonly close = output<void>();

  // Computed values:
  protected readonly id = computed(() => this.idInput() ?? this.generatedId);

  // Side effects:
  protected readonly titleLevelEffect = effect(() => {
    const title = this.title();
    const titleLevel = 'h' + this.titleLevel();
    const titleContainer = this.titleContainer();
    titleContainer.nativeElement.innerHTML = '';
    if (!title) return;
    const element = Object.assign(document.createElement(titleLevel), {
      className: 'v-typography-body-2-bold',
      innerHTML: title || ''
    });
    titleContainer.nativeElement.appendChild(element);
  });
}
