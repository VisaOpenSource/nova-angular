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
import { render } from '@testing-library/angular';
import { RadioDirective } from '../radio/radio.directive';
import { RadioGroupDirective } from './radio-group.directive';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { screen } from '@testing-library/dom';

describe('RadioGroupDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-radio-group>Content</div>', {
      imports: [RadioGroupDirective],
    });
    expect(container.firstElementChild?.getAttribute('aria-required')).toBe(
      null,
    );
    expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    expect(container.firstElementChild?.getAttribute('role')).toBe(
      'radiogroup',
    );
  });

  it('should allow custom class', async () => {
    const { container } = await render(
      '<td class="test-class" v-radio-group>Content</td>',
      {
        imports: [RadioGroupDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'test-class',
    );
  });

  it('should not render required false', async () => {
    const { container } = await render(
      '<div v-radio-group required="false">Content</div>',
      {
        imports: [RadioGroupDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('aria-required')).toBe(
      null,
    );
    expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    expect(container.firstElementChild?.getAttribute('role')).toBe(
      'radiogroup',
    );
  });

  it('should render required true', async () => {
    const { container } = await render(
      '<div v-radio-group required>Content</div>',
      {
        imports: [RadioGroupDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('aria-required')).toBe(
      'true',
    );
    expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    expect(container.firstElementChild?.getAttribute('role')).toBe(
      'radiogroup',
    );
  });

  it('should allow custom role', async () => {
    const { container } = await render(
      '<div v-radio-group role="test-role">Content</div>',
      {
        imports: [RadioGroupDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('role')).toBe('test-role');
  });

  it('should propagate name', async () => {
    const { fixture } = await render(
      '<div v-radio-group name="test-name"><input v-radio data-testid="radio"/></div>',
      {
        imports: [RadioGroupDirective, RadioDirective],
      },
    );
    fixture.detectChanges();
    const radio = screen.getByTestId('radio');
    expect(radio?.getAttribute('name')).toBe('test-name');
  });

  it('should propagate disabled', async () => {
    const { fixture } = await render(
      '<div v-radio-group disabled="true"><input v-radio data-testid="radio"/></div>',
      {
        imports: [RadioGroupDirective, RadioDirective],
      },
    );
    fixture.detectChanges();
    const radio = screen.getByTestId('radio');
    fixture.detectChanges();
    expect(radio?.getAttribute('disabled')).toBe('disabled');
  });

  it('should propagate invalid', async () => {
    const { fixture } = await render(
      '<div v-radio-group invalid><input v-radio data-testid="radio"/></div>',
      {
        imports: [RadioGroupDirective, RadioDirective],
      },
    );
    fixture.detectChanges();
    const radio = screen.getByTestId('radio');
    expect(radio?.getAttribute('aria-invalid')).toBe('true');
  });

  it('should propagate required', async () => {
    const { fixture } = await render(
      '<div v-radio-group required><input v-radio data-testid="radio"/></div>',
      {
        imports: [RadioGroupDirective, RadioDirective],
      },
    );
    fixture.detectChanges();
    const radio = screen.getByTestId('radio');
    expect(radio?.getAttribute('required')).toBe('required');
  });

  it('should propagate value', async () => {
    const { fixture } = await render(
      '<div v-radio-group value="test-value"><input v-radio data-testid="radio" value="test-value"/></div>',
      {
        imports: [RadioGroupDirective, RadioDirective],
      },
    );
    fixture.detectChanges();
    const radio = screen.getByTestId<HTMLInputElement>('radio');
    expect(radio?.checked).toBe(true);
  });

  it('should propagate value from children to group', async () => {
    const formControl = new FormControl();
    const { fixture } = await render(
      '<div v-radio-group [formControl]="formControl"><input v-radio data-testid="radio" value="test-value"/></div>',
      {
        imports: [RadioGroupDirective, RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formControl,
        },
      },
    );
    fixture.detectChanges();
    const radio = screen.getByTestId<HTMLInputElement>('radio');
    expect(radio?.checked).toBe(false);
    radio.click();
    fixture.detectChanges();
    expect(radio?.checked).toBe(true);
    expect(formControl.value).toBe('test-value');
  });

  it('should propagate value from group to child', async () => {
    const formControl = new FormControl('test-value');
    const { fixture } = await render(
      '<div v-radio-group [formControl]="formControl"><input v-radio data-testid="radio" value="test-value"/></div>',
      {
        imports: [RadioGroupDirective, RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formControl,
        },
      },
    );
    fixture.detectChanges();
    const radio = screen.getByTestId<HTMLInputElement>('radio');
    expect(radio?.checked).toBe(true);
    expect(formControl.value).toBe('test-value');
  });

  it('should allow formControl to disable radios', async () => {
    const formControl = new FormControl({
      value: 'test-value',
      disabled: true,
    });
    const { fixture } = await render(
      `<div v-radio-group [formControl]="formControl">
      <input v-radio data-testid="radio-0" value="test-value-0"/>
      <input v-radio data-testid="radio-1" value="test-value-1"/>
      </div>`,
      {
        imports: [RadioGroupDirective, RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formControl,
        },
      },
    );
    fixture.detectChanges();
    const radio0 = screen.getByTestId<HTMLInputElement>('radio-0');
    const radio1 = screen.getByTestId<HTMLInputElement>('radio-1');
    expect(radio0?.disabled).toBe(true);
    expect(radio1?.disabled).toBe(true);
    expect(radio0?.checked).toBe(false);
    expect(radio1?.checked).toBe(false);
    radio0.click();
    fixture.detectChanges();
    expect(radio0?.checked).toBe(false);
    expect(radio1?.checked).toBe(false);
    // expect(formControl.value).toBe('test-value');
    expect(formControl.disabled).toBe(true);
  });

  it('should allow formControl to enable radios', async () => {
    const formControl = new FormControl({
      value: 'test-value',
      disabled: true,
    });
    const { fixture } = await render(
      `<div v-radio-group [formControl]="formControl">
      <input v-radio data-testid="radio-0" value="test-value-0"/>
      <input v-radio data-testid="radio-1" value="test-value-1"/>
      </div>`,
      {
        imports: [RadioGroupDirective, RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formControl,
        },
      },
    );
    fixture.detectChanges();
    const radio0 = screen.getByTestId<HTMLInputElement>('radio-0');
    const radio1 = screen.getByTestId<HTMLInputElement>('radio-1');
    expect(radio0?.disabled).toBe(true);
    expect(radio1?.disabled).toBe(true);
    expect(radio0?.checked).toBe(false);
    expect(radio1?.checked).toBe(false);
    formControl.enable();
    fixture.detectChanges();
    expect(radio0?.disabled).toBe(false);
    expect(radio1?.disabled).toBe(false);
    expect(radio0?.checked).toBe(false);
    expect(radio1?.checked).toBe(false);
    radio0.click();
    fixture.detectChanges();
    expect(radio0?.checked).toBe(true);
    expect(radio1?.checked).toBe(false);
    expect(formControl.value).toBe('test-value-0');
    expect(formControl.disabled).toBe(false);
  });

  it('should allow formControl to be touched', async () => {
    const formControl = new FormControl();
    const { fixture } = await render(
      `<div v-radio-group [formControl]="formControl">
      <input v-radio data-testid="radio-0" value="test-value-0"/>
      <input v-radio data-testid="radio-1" value="test-value-1"/>
      </div>`,
      {
        imports: [RadioGroupDirective, RadioDirective, ReactiveFormsModule],
        componentProperties: {
          formControl,
        },
      },
    );
    fixture.detectChanges();
    const radio0 = screen.getByTestId<HTMLInputElement>('radio-0');
    const radio1 = screen.getByTestId<HTMLInputElement>('radio-1');
    expect(radio0?.checked).toBe(false);
    expect(radio1?.checked).toBe(false);
    radio0.focus();
    radio0.click();
    radio0.blur();
    fixture.detectChanges();
    expect(radio0?.checked).toBe(true);
    expect(radio1?.checked).toBe(false);
    expect(formControl.value).toBe('test-value-0');
    expect(formControl.touched).toBe(true);
    expect(formControl.dirty).toBe(true);
    expect(formControl.pristine).toBe(false);
  });

  it('should allow ngModel checked selection', async () => {
    let model = { testModel: 'test-value-1' };
    const { fixture } = await render(
      `<div v-radio-group [(ngModel)]="model.testModel">
      <input v-radio data-testid="radio-0" value="test-value-0"/>
      <input v-radio data-testid="radio-1" value="test-value-1"/>
      </div>`,
      {
        imports: [RadioGroupDirective, RadioDirective, FormsModule],
        componentProperties: {
          model,
        },
      },
    );
    fixture.detectChanges();
    const radio0 = screen.getByTestId<HTMLInputElement>('radio-0');
    const radio1 = screen.getByTestId<HTMLInputElement>('radio-1');
    expect(radio0?.checked).toBe(false);
    expect(radio1?.checked).toBe(true);
    // expect(testModel).toBe('test-value-1');
    radio1.click();
    fixture.detectChanges();
    expect(radio0?.checked).toBe(false);
    expect(radio1?.checked).toBe(true);
    // expect(testModel).toBe('test-value-1');
  });
});
