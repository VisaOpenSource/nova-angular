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
import { render, screen } from '@testing-library/angular';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import userEvent from '@testing-library/user-event';
import { RadioDirective } from './radio.directive';

describe('RadioDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<input v-radio/>', {
      imports: [RadioDirective],
    });
    expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe(
      null,
    );
    expect(container.firstElementChild?.getAttribute('disabled')).toBe(null);
    expect(container.firstElementChild?.getAttribute('id')).not.toBe(null);
    expect(container.firstElementChild?.getAttribute('required')).toBe(null);
    expect(container.firstElementChild?.getAttribute('value')).toBe(null);
    expect(container.firstElementChild?.getAttribute('name')).toBe(null);
    expect(container.firstElementChild?.getAttribute('type')).toBe('radio');
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-radio');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<input class="test-class" v-radio/>', {
      imports: [RadioDirective],
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-radio test-class',
    );
  });

  it('should allow invalid', async () => {
    const { container } = await render('<input invalid v-radio/>', {
      imports: [RadioDirective],
    });
    expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe(
      'true',
    );
  });

  it('should allow disabled', async () => {
    const { container } = await render('<input disabled v-radio/>', {
      imports: [RadioDirective],
    });
    expect(container.firstElementChild?.getAttribute('disabled')).toBe(
      'disabled',
    );
  });

  it('should allow custom id', async () => {
    const { container } = await render('<input id="test-id" v-radio/>', {
      imports: [RadioDirective],
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should allow custom name', async () => {
    const { container } = await render('<input name="test-name" v-radio/>', {
      imports: [RadioDirective],
    });
    expect(container.firstElementChild?.getAttribute('name')).toBe('test-name');
  });

  it('should allow custom formName', async () => {
    const { container } = await render(
      '<input formControlName="test-name" v-radio/>',
      {
        imports: [RadioDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('name')).toBe('test-name');
  });

  it('should allow custom required', async () => {
    const { container } = await render('<input required v-radio/>', {
      imports: [RadioDirective],
    });
    expect(container.firstElementChild?.getAttribute('required')).toBe(
      'required',
    );
  });

  it('should allow custom value', async () => {
    const { container } = await render('<input value="true" v-radio/>', {
      imports: [RadioDirective],
    });
    expect(container.firstElementChild?.getAttribute('value')).toBe('true');
  });

  it('should allow custom type', async () => {
    const { container } = await render('<input type="checkbox" v-radio/>', {
      imports: [RadioDirective],
    });
    expect(container.firstElementChild?.getAttribute('type')).toBe('checkbox');
  });

  // @TODO: This test should work, but currently does not
  it.skip('should allow ngModel checked selection', async () => {
    const user = userEvent.setup();
    const model = { testChecked: 'option-2' };
    const { fixture } = await render(
      `<input data-testid="test-radio-1" name="testRadio" [(ngModel)]="model.testChecked" value="option-1" v-radio/>
      <input data-testid="test-radio-2" name="testRadio" [(ngModel)]="model.testChecked" value="option-2" v-radio/>`,
      {
        imports: [RadioDirective, FormsModule],
        componentProperties: { model },
      },
    );
    const radio1 = screen.getByTestId<HTMLInputElement>('test-radio-1');
    const radio2 = screen.getByTestId<HTMLInputElement>('test-radio-2');
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);

    await user.click(radio1);
    fixture.detectChanges();

    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);
  });

  it('should allow ngModel checked deselection', async () => {
    const user = userEvent.setup();
    const testChecked = 'option-1';
    const { fixture } = await render(
      `<input data-testid="test-radio-1" name="testRadio" [(ngModel)]="testChecked" value="option-1" v-radio/>
      <input data-testid="test-radio-2" name="testRadio" [(ngModel)]="testChecked" value="option-2" v-radio/>`,
      {
        imports: [RadioDirective, FormsModule],
        componentProperties: { testChecked },
      },
    );

    const radio1 = screen.getByTestId<HTMLInputElement>('test-radio-1');
    const radio2 = screen.getByTestId<HTMLInputElement>('test-radio-2');
    // expect(radio1.checked).toBe(true); TODO: This test should work
    expect(radio2.checked).toBe(false);

    await user.click(radio2);
    fixture.detectChanges();

    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
  });

  it('should allow formControl checked selection', async () => {
    const user = userEvent.setup();
    const formControl = new FormControl('option-2');
    const { fixture } = await render(
      `<input data-testid="test-radio-1" name="testRadio" [formControl]="formControl" value="option-1" v-radio/>
      <input data-testid="test-radio-2" name="testRadio" [formControl]="formControl" value="option-2" v-radio/>`,
      {
        imports: [RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formControl,
        },
      },
    );

    const radio1 = screen.getByTestId<HTMLInputElement>('test-radio-1');
    const radio2 = screen.getByTestId<HTMLInputElement>('test-radio-2');
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);

    await user.click(radio1);
    fixture.detectChanges();

    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);
    expect(formControl.value).toBe('option-1');
  });

  it('should allow formControl checked deselection', async () => {
    const user = userEvent.setup();
    const formControl = new FormControl('option-1');
    const { fixture } = await render(
      `
      <input data-testid="test-radio-1" name="testRadio" [formControl]="formControl" value="option-1" v-radio/>
      <input data-testid="test-radio-2" name="testRadio" [formControl]="formControl" value="option-2" v-radio/>`,
      {
        imports: [RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formControl,
        },
      },
    );

    const radio1 = screen.getByTestId<HTMLInputElement>('test-radio-1');
    const radio2 = screen.getByTestId<HTMLInputElement>('test-radio-2');
    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);

    await user.click(radio2);
    fixture.detectChanges();

    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
    expect(formControl.value).toBe('option-2');
  });

  it('should allow formControl to disable input', async () => {
    const formControl = new FormControl(false);
    const { fixture } = await render(
      '<input data-testid="test-input" [formControl]="formControl" v-radio/>',
      {
        imports: [RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formControl,
        },
      },
    );
    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.disabled).toBe(false);

    formControl.disable();

    fixture.detectChanges();

    expect(input.disabled).toBe(true);
  });

  it('should allow formControl to enable input', async () => {
    const formControl = new FormControl({ disabled: true, value: false });
    const { fixture } = await render(
      '<input data-testid="test-input" [formControl]="formControl" v-radio/>',
      {
        imports: [RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formControl,
        },
      },
    );
    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.disabled).toBe(true);

    formControl.enable();

    fixture.detectChanges();

    expect(input.disabled).toBe(false);
  });

  it('should allow formControlName checked selection', async () => {
    const user = userEvent.setup();
    const formGroup = new FormGroup({
      testRadio: new FormControl('option-2'),
    });
    const { fixture } = await render(
      `<form [formGroup]="formGroup">
        <input data-testid="test-radio-1" name="testRadio" formControlName="testRadio" value="option-1" v-radio/>
        <input data-testid="test-radio-2" name="testRadio" formControlName="testRadio" value="option-2" v-radio/>
      </form>`,
      {
        imports: [RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formGroup,
        },
      },
    );

    const radio1 = screen.getByTestId<HTMLInputElement>('test-radio-1');
    const radio2 = screen.getByTestId<HTMLInputElement>('test-radio-2');
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);

    await user.click(radio1);
    fixture.detectChanges();

    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);
    expect(formGroup.get('testRadio')?.value).toBe('option-1');
  });

  it('should allow formControlName checked deselection', async () => {
    const user = userEvent.setup();
    const formGroup = new FormGroup({
      testRadio: new FormControl('option-1'),
    });
    const { fixture } = await render(
      `<form [formGroup]="formGroup">
        <input data-testid="test-radio-1" name="testRadio" formControlName="testRadio" value="option-1" v-radio/>
        <input data-testid="test-radio-2" name="testRadio" formControlName="testRadio" value="option-2" v-radio/>
      </form>`,
      {
        imports: [RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formGroup,
        },
      },
    );

    const radio1 = screen.getByTestId<HTMLInputElement>('test-radio-1');
    const radio2 = screen.getByTestId<HTMLInputElement>('test-radio-2');
    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);

    await user.click(radio2);
    fixture.detectChanges();

    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
    expect(formGroup.get('testRadio')?.value).toBe('option-2');
  });

  it('should allow formControlName to disable input', async () => {
    const formGroup = new FormGroup({
      testRadio: new FormControl({ value: false, disabled: false }),
    });
    const { fixture } = await render(
      `<form [formGroup]="formGroup">
        <input data-testid="test-input" name="testRadio" formControlName="testRadio" v-radio/>
      </form>`,
      {
        imports: [RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formGroup,
        },
      },
    );

    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.disabled).toBe(false);

    formGroup.get('testRadio')?.disable();
    fixture.detectChanges();

    expect(input.disabled).toBe(true);
  });

  it('should allow formControlName to enable input', async () => {
    const formGroup = new FormGroup({
      testRadio: new FormControl({ value: false, disabled: true }),
    });
    const { fixture } = await render(
      `<form [formGroup]="formGroup">
        <input data-testid="test-input" name="testRadio" formControlName="testRadio" v-radio/>
      </form>`,
      {
        imports: [RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formGroup,
        },
      },
    );

    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.disabled).toBe(true);

    formGroup.get('testRadio')?.enable();
    fixture.detectChanges();

    expect(input.disabled).toBe(false);
  });

  it('should be touched after change', async () => {
    const user = userEvent.setup();
    const formGroup = new FormGroup({
      testRadio: new FormControl(null),
    });
    const { fixture } = await render(
      `<form [formGroup]="formGroup">
        <input data-testid="test-input-0" formControlName="testRadio" v-radio value="0" />
        <input data-testid="test-input-1" formControlName="testRadio" v-radio value="1" />
      </form>`,
      {
        imports: [RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formGroup,
        },
      },
    );

    const input = screen.getByTestId<HTMLInputElement>('test-input-1');

    await user.click(input);
    input.blur();
    fixture.detectChanges();

    expect(formGroup.get('testRadio')?.touched).toBe(true);
    expect(formGroup.get('testRadio')?.pristine).toBe(false);
    expect(formGroup.get('testRadio')?.dirty).toBe(true);
    expect(formGroup?.touched).toBe(true);
    expect(formGroup?.pristine).toBe(false);
    expect(formGroup?.dirty).toBe(true);
  });
});
