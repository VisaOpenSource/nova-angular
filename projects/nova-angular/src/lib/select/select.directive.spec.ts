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
import { render, screen } from '@testing-library/angular';

import { SelectDirective } from './select.directive';
import userEvent from '@testing-library/user-event';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SelectDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<select v-select></select>', {
      imports: [SelectDirective]
    });
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.getAttribute('value')).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-input');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<select class="test-class" v-select></select>', {
      imports: [SelectDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-input test-class');
  });

  it('should allow custom value', async () => {
    const { container } = await render('<select value="true" v-select></select>', {
      imports: [SelectDirective]
    });
    expect(container.firstElementChild?.getAttribute('value')).toBe('true');
  });

  it('should recognize change events', async () => {
    const { container } = await render(
      `
      <select v-select value="2">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>`,
      {
        imports: [SelectDirective]
      }
    );
    const select = container.firstElementChild as HTMLSelectElement;
    expect(select.getAttribute('value')).toBe('2');

    await userEvent.click(select);
    await userEvent.selectOptions(select, '3');
    expect(select.value).toBe('3');
  });

  describe('form integration', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<select v-select ngModel></select>', {
        imports: [SelectDirective]
      });
      expect(container).toMatchSnapshot();
      expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe(null);
      expect(container.firstElementChild?.getAttribute('value')).toBe(null);
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-input');
    });

    it('should allow custom class', async () => {
      const { container } = await render('<select class="test-class" v-select ngModel></select>', {
        imports: [SelectDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-input test-class');
    });

    it('should allow invalid', async () => {
      const { container } = await render('<select invalid v-select ngModel></select>', {
        imports: [SelectDirective]
      });
      expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe('true');
    });

    it('should allow ngModule value', async () => {
      const user = userEvent.setup();
      let testValue = 'option-1';
      const { fixture } = await render(
        `<select data-testid="test-input" [(ngModel)]="testValue" v-select>
          <option value="option-1">Option 1</option>
          <option value="option-2">Option 2</option>
        </select>`,
        {
          imports: [SelectDirective, FormsModule],
          componentProperties: {
            testValue
          }
        }
      );
      const input = screen.getByTestId<HTMLInputElement>('test-input');
      expect(input.value).toBe('option-1');

      await user.selectOptions(input, 'option-2');

      fixture.detectChanges();

      expect(input.value).toBe('option-2');
    });

    it('should allow formControl value', async () => {
      const user = userEvent.setup();
      const value = 'option-1';
      const formControl = new FormControl(value);
      await render(
        `<select data-testid="test-input" [formControl]="formControl" v-select>
          <option value="option-1">Option 1</option>
          <option value="option-2">Option 2</option>
        </select>`,
        {
          imports: [SelectDirective, ReactiveFormsModule],
          componentProperties: {
            formControl
          }
        }
      );
      const input = screen.getByTestId<HTMLInputElement>('test-input');
      expect(input.value).toBe(value);

      await user.selectOptions(input, 'option-2');

      expect(input.value).toBe('option-2');
      expect(formControl.value).toBe('option-2');
    });

    it('should allow formControl to disable input', async () => {
      const formControl = new FormControl('');
      const { fixture } = await render(
        '<select data-testid="test-input" [formControl]="formControl" v-select></select>',
        {
          imports: [SelectDirective, ReactiveFormsModule],
          componentProperties: {
            formControl
          }
        }
      );
      const input = screen.getByTestId<HTMLInputElement>('test-input');
      expect(input.disabled).toBe(false);

      formControl.disable();

      fixture.detectChanges();

      expect(input.disabled).toBe(true);
    });

    it('should allow formControl to enable input', async () => {
      const formControl = new FormControl({ disabled: true, value: '' });
      const { fixture } = await render(
        '<select data-testid="test-input" [formControl]="formControl" v-select></select>',
        {
          imports: [SelectDirective, ReactiveFormsModule],
          componentProperties: {
            formControl
          }
        }
      );
      const input = screen.getByTestId<HTMLInputElement>('test-input');
      expect(input.disabled).toBe(true);

      formControl.enable();

      fixture.detectChanges();

      expect(input.disabled).toBe(false);
    });

    it('should allow formControl to be touched', async () => {
      const formControl = new FormControl('');
      const { fixture } = await render(
        '<select data-testid="test-input" [formControl]="formControl" v-select></select>',
        {
          imports: [SelectDirective, ReactiveFormsModule],
          componentProperties: {
            formControl
          }
        }
      );

      const input = screen.getByTestId<HTMLInputElement>('test-input');
      expect(formControl.touched).toBe(false);
      input.focus();
      input.blur();
      fixture.detectChanges();
      expect(formControl.touched).toBe(true);
    });
  });
});
