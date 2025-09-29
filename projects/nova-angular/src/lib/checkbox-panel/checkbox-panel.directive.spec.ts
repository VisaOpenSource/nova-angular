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
import { render } from '@testing-library/angular';

import { screen } from '@testing-library/dom';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { RadioDirective } from './../radio/radio.directive';
import { CheckboxPanelDirective } from './checkbox-panel.directive';
import { By } from '@angular/platform-browser';
import userEvent from '@testing-library/user-event';

describe('CheckboxPanelDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-checkbox-panel></div>', {
      imports: [CheckboxPanelDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-action v-action-secondary v-checkbox-panel');
  });

  it('should render defaults correctly with radio selector', async () => {
    const { container } = await render('<div v-radio-panel></div>', {
      imports: [CheckboxPanelDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-action v-action-secondary v-checkbox-panel');
  });

  it('should allow custom classes', async () => {
    const { container } = await render('<div v-checkbox-panel class="test-class"></div>', {
      imports: [CheckboxPanelDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-action v-action-secondary v-checkbox-panel test-class'
    );
  });

  it('should toggle checkbox control', async () => {
    await render(
      '<div v-checkbox-panel><input v-checkbox id="checkbox" /><label for="checkbox">Checkbox</label></div>',
      {
        imports: [CheckboxPanelDirective, CheckboxDirective]
      }
    );
    const checkbox = screen.getByLabelText<HTMLInputElement>('Checkbox');
    expect(checkbox.checked).toBe(false);
    checkbox.click();
    expect(checkbox.checked).toBe(true);
  });

  it('should toggle radio control', async () => {
    await render('<div v-checkbox-panel><input v-radio id="radio" /><label for="radio">Radio</label></div>', {
      imports: [CheckboxPanelDirective, RadioDirective]
    });
    const checkbox = screen.getByLabelText<HTMLInputElement>('Radio');
    expect(checkbox.checked).toBe(false);
    checkbox.click();
    expect(checkbox.checked).toBe(true);
  });

  it('should return early if no checkbox or radio control', async () => {
    const { container, debugElement } = await render('<div v-checkbox-panel></div>', {
      imports: [CheckboxPanelDirective]
    });
    const directiveElement = debugElement.query(By.directive(CheckboxPanelDirective));
    const directive = directiveElement?.injector.get(CheckboxPanelDirective);
    const spy = jest.spyOn(directive, 'toggleControl');

    const checkboxPanel = container.firstElementChild;
    if (!checkboxPanel) return;
    await userEvent.click(checkboxPanel);
    expect(spy).not.toHaveBeenCalled();
  });
});
