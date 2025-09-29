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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { CheckboxDirective } from './checkbox.directive';

describe('CheckboxDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<input v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe(null);
    expect(container.firstElementChild?.getAttribute('checked')).toBe(null);
    expect(container.firstElementChild?.getAttribute('disabled')).toBe(null);
    expect(container.firstElementChild?.getAttribute('id')).not.toBe(null);
    expect(container.firstElementChild?.getAttribute('required')).toBe(null);
    expect(container.firstElementChild?.getAttribute('value')).toBe(null);
    expect(container.firstElementChild?.getAttribute('name')).toBe(null);
    expect(container.firstElementChild?.getAttribute('type')).toBe('checkbox');
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-checkbox');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<input class="test-class" v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-checkbox test-class');
  });

  it('should allow invalid', async () => {
    const { container } = await render('<input invalid v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe('true');
  });

  it('should allow disabled', async () => {
    const { container } = await render('<input disabled v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    expect(container.firstElementChild?.getAttribute('disabled')).toBe('disabled');
  });

  it('should allow custom id', async () => {
    const { container } = await render('<input id="test-id" v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should allow custom name', async () => {
    const { container } = await render('<input name="test-name" v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    expect(container.firstElementChild?.getAttribute('name')).toBe('test-name');
  });

  it('should allow default checked', async () => {
    const { container } = await render('<input data-testid="checkbox" checked v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    const checkbox = screen.getByTestId<HTMLInputElement>('checkbox');
    expect(checkbox.checked).toBe(true);
    expect(container.firstElementChild?.getAttribute('checked')).toBe('checked');
  });

  it('should allow custom required', async () => {
    const { container } = await render('<input required v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    expect(container.firstElementChild?.getAttribute('required')).toBe('required');
  });

  it('should allow custom value', async () => {
    const { container } = await render('<input value="true" v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    expect(container.firstElementChild?.getAttribute('value')).toBe('true');
  });

  it('should allow changes to checked from user selection', async () => {
    const user = userEvent.setup();
    const { container } = await render('<input v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    const checkbox = container.firstElementChild as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);
    await user.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('should allow programmatic changes to checked', async () => {
    const user = userEvent.setup();
    const { container, fixture } = await render('<input v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    const checkbox = container.firstElementChild as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    const directiveInstance = fixture.debugElement.children[0].injector.get(CheckboxDirective);
    directiveInstance.checked.set(true);
    fixture.detectChanges();
    expect(checkbox.checked).toBe(true);
    directiveInstance.checked.set(false);
    fixture.detectChanges();
    expect(checkbox.checked).toBe(false);
  });

  it('should allow custom type', async () => {
    const { container } = await render('<input type="radio" v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    expect(container.firstElementChild?.getAttribute('type')).toBe('radio');
  });

  it('should allow indeterminate', async () => {
    await render('<label for="test-id">Checkbox</label><input id="test-id" indeterminate v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    const checkbox = screen.getByLabelText<HTMLInputElement>('Checkbox');
    expect(checkbox.getAttribute('indeterminate')).not.toBeNull();
    // expect(checkbox.indeterminate).toBe(true); // we removed [indeterminate]
  });

  it('should allow false indeterminate but not bind to element', async () => {
    const { container } = await render(
      '<label for="test-id">Checkbox</label><input id="test-id" indeterminate="false" v-checkbox/>',
      {
        imports: [CheckboxDirective]
      }
    );
    const checkbox = screen.getByLabelText<HTMLInputElement>('Checkbox');
    // expect(checkbox.indeterminate).toBe(false); // we removed [indeterminate]
    expect(checkbox?.getAttribute('indeterminate')).toBe('false'); // using setProperty allows 'false'
  });

  it('should allow false checked but not bind to element', async () => {
    const { container, fixture } = await render(
      '<label for="test-id">Checkbox</label><input id="test-id" [checked]="false" v-checkbox/>',
      {
        imports: [CheckboxDirective]
      }
    );
    const checkbox = screen.getByLabelText<HTMLInputElement>('Checkbox');
    fixture.detectChanges();
    // we have to use falsy here since checked can be a string of 'false' rather than boolean false and the model input can't use transform
    expect(checkbox.checked).toBeFalsy();
    expect(container.firstElementChild?.getAttribute('checked')).toBeNull();
  });

  it('should allow false disabled but not bind to element', async () => {
    const { container } = await render(
      '<label for="test-id">Checkbox</label><input id="test-id" disabled="false" v-checkbox/>',
      {
        imports: [CheckboxDirective]
      }
    );
    const checkbox = screen.getByLabelText<HTMLInputElement>('Checkbox');
    expect(checkbox.disabled).toBe(false);
    expect(container.firstElementChild?.getAttribute('disabled')).toBeNull();
  });

  it('should allow false required but not bind to element', async () => {
    const { container } = await render(
      '<label for="test-id">Checkbox</label><input id="test-id" required="false" v-checkbox/>',
      {
        imports: [CheckboxDirective]
      }
    );
    const checkbox = screen.getByLabelText<HTMLInputElement>('Checkbox');
    expect(checkbox.required).toBe(false);
    expect(container.firstElementChild?.getAttribute('required')).toBeNull();
  });

  it('should allow true checked', async () => {
    await render('<label for="test-id">Checkbox</label><input id="test-id" checked="true" v-checkbox/>', {
      imports: [CheckboxDirective]
    });
    const checkbox = screen.getByLabelText<HTMLInputElement>('Checkbox');
    expect(checkbox.checked).toBe(true);
  });

  it('should allow ngModule checked selection', async () => {
    const user = userEvent.setup();
    const testChecked = false;
    const { fixture } = await render('<input data-testid="test-input" [(ngModel)]="testChecked" v-checkbox/>', {
      imports: [CheckboxDirective, FormsModule],
      componentProperties: { testChecked }
    });
    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.checked).toBe(false);

    await user.click(input);

    fixture.detectChanges();

    expect(input.checked).toBe(true);
  });

  it('should allow ngModule checked deselection', async () => {
    const user = userEvent.setup();
    const testChecked = true;
    const { fixture } = await render('<input data-testid="test-input" [(ngModel)]="testChecked" v-checkbox/>', {
      imports: [CheckboxDirective, FormsModule],
      componentProperties: { testChecked }
    });
    const input = screen.getByTestId<HTMLInputElement>('test-input');
    fixture.detectChanges();
    expect(input.checked).toBe(true);

    await user.click(input);

    fixture.detectChanges();

    expect(input.checked).toBe(false);
  });

  it('should allow formControl checked selection', async () => {
    const user = userEvent.setup();
    const formControl = new FormControl(false);
    const { fixture } = await render('<input data-testid="test-input" [formControl]="formControl" v-checkbox/>', {
      imports: [CheckboxDirective, ReactiveFormsModule],
      componentProperties: {
        formControl
      }
    });

    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.checked).toBe(false);

    await user.click(input);
    fixture.detectChanges();

    expect(input.checked).toBe(true);
    expect(formControl.value).toBe(true);
  });

  it('should allow formControl checked deselection', async () => {
    const user = userEvent.setup();
    const formControl = new FormControl(true);
    const { fixture } = await render('<input data-testid="test-input" [formControl]="formControl" v-checkbox/>', {
      imports: [CheckboxDirective, ReactiveFormsModule],
      componentProperties: {
        formControl
      }
    });

    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.checked).toBe(true);

    await user.click(input);
    fixture.detectChanges();

    expect(input.checked).toBe(false);
    expect(formControl.value).toBe(false);
  });

  it('should allow formControl to disable input', async () => {
    const formControl = new FormControl(false);
    const { fixture } = await render('<input data-testid="test-input" [formControl]="formControl" v-checkbox/>', {
      imports: [CheckboxDirective, ReactiveFormsModule],
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
    const formControl = new FormControl({ disabled: true, value: false });
    const { fixture } = await render('<input data-testid="test-input" [formControl]="formControl" v-checkbox/>', {
      imports: [CheckboxDirective, ReactiveFormsModule],
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

  it('should allow formControlName checked selection', async () => {
    const user = userEvent.setup();
    const formControl = new FormControl(false);
    const { fixture } = await render(
      '<form [formGroup]="form"><input data-testid="test-input" formControlName="testControl" v-checkbox/></form>',
      {
        imports: [CheckboxDirective, ReactiveFormsModule],
        componentProperties: {
          form: new FormGroup({
            testControl: formControl
          })
        }
      }
    );

    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.checked).toBe(false);

    await user.click(input);
    fixture.detectChanges();

    expect(input.checked).toBe(true);
    expect(formControl.value).toBe(true);
  });

  it('should allow formControlName checked deselection', async () => {
    const user = userEvent.setup();
    const formControl = new FormControl(true);
    const { fixture } = await render(
      '<form [formGroup]="form"><input data-testid="test-input" formControlName="testControl" v-checkbox/></form>',
      {
        imports: [CheckboxDirective, ReactiveFormsModule],
        componentProperties: {
          form: new FormGroup({
            testControl: formControl
          })
        }
      }
    );

    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.checked).toBe(true);

    await user.click(input);
    fixture.detectChanges();

    expect(input.checked).toBe(false);
    expect(formControl.value).toBe(false);
  });

  it('should allow formControlName to disable input', async () => {
    const formControl = new FormControl(false);
    const { fixture } = await render(
      '<form [formGroup]="form"><input data-testid="test-input" formControlName="testControl" v-checkbox/></form>',
      {
        imports: [CheckboxDirective, ReactiveFormsModule],
        componentProperties: {
          form: new FormGroup({
            testControl: formControl
          })
        }
      }
    );

    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.disabled).toBe(false);

    formControl.disable();
    fixture.detectChanges();

    expect(input.disabled).toBe(true);
  });

  it('should allow formControlName to enable input', async () => {
    const formControl = new FormControl({ disabled: true, value: false });
    const { fixture } = await render(
      '<form [formGroup]="form"><input data-testid="test-input" formControlName="testControl" v-checkbox/></form>',
      {
        imports: [CheckboxDirective, ReactiveFormsModule],
        componentProperties: {
          form: new FormGroup({
            testControl: formControl
          })
        }
      }
    );

    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.disabled).toBe(true);

    formControl.enable();
    fixture.detectChanges();

    expect(input.disabled).toBe(false);
  });
});
