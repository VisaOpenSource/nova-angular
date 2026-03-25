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
import { contentChild, Directive, inject, Signal } from '@angular/core';
import { AppReadyService } from '../app-ready/app-ready.service';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { RadioDirective } from '../radio/radio.directive';

@Directive({
  host: {
    class: 'v-action v-action-secondary v-checkbox-panel',

    '(click)': 'handleClick($event)'
  },
  selector: '[v-checkbox-panel], [v-radio-panel]',
  standalone: true
})
export class CheckboxPanelDirective {
  private readonly appReadyService: AppReadyService = inject(AppReadyService);
  private readonly checkbox: Signal<CheckboxDirective | undefined> = contentChild(CheckboxDirective);
  private readonly radio: Signal<RadioDirective | undefined> = contentChild(RadioDirective);

  handleClick(event: Event): void {
    const control = this.checkbox() || this.radio();
    if (!control) return;
    this.toggleControl(control, event);
  }

  /**
   * Toggles checkbox or radio programmatically.
   * @param control Checkbox or Radio item to toggle.
   * @param event Event to check if target is the control.
   */
  public toggleControl(control: RadioDirective | CheckboxDirective, event: Event): void {
    // check that browser is available before manipulating/checking DOM elements
    if (!this.appReadyService.isBrowserAndDomAvailable || !control || control.el.nativeElement.contains(event.target))
      return;
    control.el.nativeElement.click();
  }
}
