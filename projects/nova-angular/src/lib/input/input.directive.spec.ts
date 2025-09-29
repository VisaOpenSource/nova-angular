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
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { render } from '@testing-library/angular';
import { fireEvent, screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { SPACE_KEY } from '../nova-lib.constants';
import { InputDirective } from './input.directive';
import { ComboboxDirective } from '../combobox/combobox.directive';
import { Component } from '@angular/core';

describe('InputDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<input v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-activedescendant')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-autocomplete')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-controls')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-expanded')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-haspopup')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-owns')).toBe(null);
    expect(container.firstElementChild?.getAttribute('disabled')).toBe(null);
    expect(container.firstElementChild?.getAttribute('id')).not.toBe(null);
    expect(container.firstElementChild?.getAttribute('role')).toBe(null);
    expect(container.firstElementChild?.getAttribute('readonly')).toBe(null);
    expect(container.firstElementChild?.getAttribute('value')).toBe('');
    expect(container.firstElementChild?.getAttribute('name')).toBe(null);
    expect(container.firstElementChild?.getAttribute('type')).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-input');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<input class="test-class" v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-input test-class');
  });

  it('should allow custom aria-activedescendant', async () => {
    const { container } = await render('<input aria-activedescendant="some-id" v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-activedescendant')).toBe('some-id');
  });

  it('should allow invalid', async () => {
    const { container } = await render('<input invalid v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe('true');
  });

  it('should allow disabled', async () => {
    const { container } = await render('<input disabled v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('disabled')).toBe('disabled');
  });

  it('should allow custom id', async () => {
    const { container } = await render('<input id="test-id" v-input/>', {
      imports: [InputDirective]
    });
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should allow custom aria-autocomplete', async () => {
    const { container } = await render('<input aria-autocomplete="true" v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-autocomplete')).toBe('true');
  });

  it('should allow custom aria-controls', async () => {
    const { container } = await render('<input aria-controls="some-id" v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-controls')).toBe('some-id');
  });

  it('should allow custom aria-expanded', async () => {
    const { container } = await render('<input aria-expanded v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-expanded')).toBe('true');
  });

  it('should allow custom aria-haspopup', async () => {
    const { container } = await render('<input aria-haspopup v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-haspopup')).toBe('true');
  });

  it('should allow custom aria-owns', async () => {
    const { container } = await render('<input aria-owns="some-id" v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-owns')).toBe('some-id');
  });

  it('should allow custom name', async () => {
    const { container } = await render('<input name="test-name" v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('name')).toBe('test-name');
  });

  it('should allow custom role', async () => {
    const { container } = await render('<input role="popup" v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('role')).toBe('popup');
  });

  it('should allow otp input', async () => {
    const { container } = await render('<input otp v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-input v-input-otp');
  });

  it('should allow noResize input', async () => {
    const { container } = await render('<input noResize v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-input v-input-resize-none');
  });

  it('should allow readonly input', async () => {
    const { container } = await render('<input readonly v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('readonly')).toBe('readonly');
  });

  it('should allow custom type', async () => {
    const { container } = await render('<input type="radio" v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('type')).toBe('radio');
  });

  it('should allow custom value', async () => {
    const { container } = await render('<input value="true" v-input/>', {
      imports: [InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('value')).toBe('true');
  });

  it('should allow ngModule value', async () => {
    const user = userEvent.setup();
    const model = { testName: 'Sam' };
    const { fixture } = await render('<input data-testid="test-input" [(ngModel)]="model.testName" v-input/>', {
      imports: [InputDirective, FormsModule],
      componentProperties: {
        model
      }
    });
    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.value).toBe('Sam');

    await user.type(input, 'Option A');

    fixture.detectChanges();

    expect(input.value).toBe('SamOption A');
  });

  it('should allow formControl value', async () => {
    const user = userEvent.setup();
    const formControl = new FormControl('Default value');
    const { container } = await render('<input data-testid="test-input" [formControl]="formControl" v-input/>', {
      imports: [InputDirective, ReactiveFormsModule],
      componentProperties: {
        formControl
      }
    });
    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.value).toBe('Default value');

    await user.type(input, 'Option A');

    expect(input.value).toBe('Default valueOption A');
    expect(formControl.value).toBe('Default valueOption A');
  });

  it('should allow formControl to disable input', async () => {
    const formControl = new FormControl('');
    const { fixture } = await render('<input data-testid="test-input" [formControl]="formControl" v-input/>', {
      imports: [InputDirective, ReactiveFormsModule],
      componentProperties: {
        formControl
      }
    });
    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.disabled).toBe(false);

    formControl.disable();

    fixture.detectChanges();

    expect(input.disabled).toBe(true);
  });

  it('should allow formControl to enable input', async () => {
    const formControl = new FormControl({ disabled: true, value: '' });
    const { fixture } = await render('<input data-testid="test-input" [formControl]="formControl" v-input/>', {
      imports: [InputDirective, ReactiveFormsModule],
      componentProperties: {
        formControl
      }
    });
    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.disabled).toBe(true);

    formControl.enable();

    fixture.detectChanges();

    expect(input.disabled).toBe(false);
  });

  it('should adjust to being inside a combobox', async () => {
    const { fixture } = await render('<div v-combobox><input data-testid="test-input" v-input/></div>', {
      imports: [InputDirective, ComboboxDirective]
    });

    fixture.detectChanges();

    const input = screen.getByTestId<HTMLInputElement>('test-input');

    expect(input.getAttribute('aria-autocomplete')).toBe('list');
    expect(input.getAttribute('aria-haspopup')).toBe('listbox');
    expect(input.getAttribute('role')).toBe('combobox');
  });

  it('should prevent default event when space keydown', async () => {
    const { fixture } = await render('<input data-testid="test-input" readonly v-input/>', {
      imports: [InputDirective]
    });

    const input = screen.getByTestId<HTMLInputElement>('test-input');

    const event = fireEvent.keyDown(input, { key: SPACE_KEY });

    fixture.detectChanges();

    expect(event).toBe(false);
  });

  it('should be marked as touched on blur', async () => {
    const inputControl = new FormControl('');
    const { fixture } = await render('<input [formControl]="inputControl" data-testid="test-input" v-input/>', {
      imports: [InputDirective, ReactiveFormsModule],
      componentProperties: {
        inputControl
      }
    });

    const input = screen.getByTestId<HTMLInputElement>('test-input');

    fireEvent.focus(input);

    fixture.detectChanges();

    expect(inputControl.touched).toBe(false);
    expect(inputControl.dirty).toBe(false);
    expect(inputControl.pristine).toBe(true);
    expect(input.classList.contains('ng-touched')).toBe(false);
    fireEvent.blur(input);
    fixture.detectChanges();
    expect(inputControl.touched).toBe(true);
    expect(inputControl.valid).toBe(true);
    expect(inputControl.invalid).toBe(false);

    await userEvent.type(input, 'Test Input');
    expect(inputControl.dirty).toBe(true);
    expect(inputControl.pristine).toBe(false);

    expect(input.classList.contains('ng-touched')).toBe(true);
  });

  describe('date and time inputs', () => {
    it('should allow date input value to be reset', async () => {
      @Component({
        selector: 'v-test-component',
        template: `<div>
          <input data-testid="test-input" type="date" [value]="value" v-input />
          <button data-testid="test-button" (click)="reset()">Reset</button>
        </div>`,
        standalone: true,
        imports: [InputDirective]
      })
      class TestComponent {
        value = '2024-01-01';
        reset() {
          this.value = '';
        }
      }
      // Create a test component with the directive
      const { fixture } = await render(TestComponent);
      await fixture.whenStable();

      const input = screen.getByTestId<HTMLInputElement>('test-input');
      expect(input.value).toBe('2024-01-01');

      // Call the reset method to change the value
      const button = screen.getByTestId('test-button');
      await userEvent.click(button);
      fixture.detectChanges();
      await fixture.whenStable(); // Wait for all async operations to complete

      expect(input.value).toBe('');
    });

    it('should allow time input value to be reset', async () => {
      @Component({
        selector: 'v-test-component',
        template: `<div>
          <input data-testid="test-input" type="time" [value]="value" v-input />
          <button data-testid="test-button" (click)="reset()">Reset</button>
        </div>`,
        standalone: true,
        imports: [InputDirective]
      })
      class TestComponent {
        value = '13:45';
        reset() {
          this.value = '';
        }
      }
      // Create a test component with the directive
      const { fixture } = await render(TestComponent);
      await fixture.whenStable();

      const input = screen.getByTestId<HTMLInputElement>('test-input');
      expect(input.value).toBe('13:45');

      // Call the reset method to change the value
      const button = screen.getByTestId('test-button');
      await userEvent.click(button);
      fixture.detectChanges();
      await fixture.whenStable(); // Wait for all async operations to complete

      expect(input.value).toBe('');
    });
  });
});
