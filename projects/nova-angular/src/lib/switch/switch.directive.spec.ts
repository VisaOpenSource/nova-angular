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
import { FormsModule } from '@angular/forms';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { SwitchDirective } from './switch.directive';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import userEvent from '@testing-library/user-event';

describe('SwitchDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<input v-switch/>', {
      imports: [SwitchDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe(null);
    expect(container.firstElementChild?.getAttribute('checked')).toBe(null);
    expect(container.firstElementChild?.getAttribute('disabled')).toBe(null);
    expect(container.firstElementChild?.getAttribute('id')).toBe(null);
    expect(container.firstElementChild?.getAttribute('required')).toBe(null);
    expect(container.firstElementChild?.getAttribute('value')).toBe(null);
    expect(container.firstElementChild?.getAttribute('name')).toBe(null);
    expect(container.firstElementChild?.getAttribute('type')).toBe('checkbox');
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-switch');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<input class="test-class" v-switch/>', {
      imports: [SwitchDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-switch test-class');
  });

  it('should allow invalid', async () => {
    const { container } = await render('<input invalid v-switch/>', {
      imports: [SwitchDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe('true');
  });

  it('should allow disabled', async () => {
    const { container } = await render('<input disabled v-switch/>', {
      imports: [SwitchDirective]
    });
    expect(container.firstElementChild?.getAttribute('disabled')).toBe('disabled');
  });

  it('should allow custom id', async () => {
    const { container } = await render('<input id="test-id" v-switch/>', {
      imports: [SwitchDirective]
    });
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should allow custom name', async () => {
    const { container } = await render('<input name="test-name" v-switch/>', {
      imports: [SwitchDirective]
    });
    expect(container.firstElementChild?.getAttribute('name')).toBe('test-name');
  });

  it('should allow default checked', async () => {
    await render('<input data-testid="switch" v-switch checked/>', {
      imports: [SwitchDirective]
    });
    const switchInput = screen.getByTestId<HTMLInputElement>('switch');
    expect(switchInput.checked).toBe(true);
  });

  it('should allow custom required', async () => {
    const { container } = await render('<input required v-switch/>', {
      imports: [SwitchDirective]
    });
    expect(container.firstElementChild?.getAttribute('required')).toBe('required');
  });

  it('should allow custom value', async () => {
    const { container } = await render('<input value="true" v-switch/>', {
      imports: [SwitchDirective]
    });
    expect(container.firstElementChild?.getAttribute('value')).toBe('true');
  });

  it('should allow custom type', async () => {
    const { container } = await render('<input type="radio" v-switch/>', {
      imports: [SwitchDirective]
    });
    expect(container.firstElementChild?.getAttribute('type')).toBe('radio');
  });

  it('should allow false checked', async () => {
    await render('<label for="test-id">Switch</label><input id="test-id" [checked]="false" v-switch/>', {
      imports: [SwitchDirective]
    });
    const switchComponent = screen.getByLabelText<HTMLInputElement>('Switch');
    expect(switchComponent.checked).toBe(false);
  });

  it('should allow true checked', async () => {
    const { fixture } = await render('<input data-testid="test-id" [checked]="true" v-switch/>', {
      imports: [SwitchDirective]
    });

    const switchComponent = screen.getByTestId<HTMLInputElement>('test-id');

    expect(switchComponent.getAttribute('checked')).toBe('checked');
    expect(switchComponent.checked).toBe(true);
  });

  it('should allow custom value', async () => {
    const { container } = await render('<input value="true" v-switch/>', {
      imports: [SwitchDirective]
    });
    expect(container.firstElementChild?.getAttribute('value')).toBe('true');
  });

  it('should allow ngModule checked selection', async () => {
    const user = userEvent.setup();
    const testChecked = false;
    const { fixture } = await render('<input data-testid="test-input" [(ngModel)]="testChecked" v-switch/>', {
      imports: [SwitchDirective, FormsModule],
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
    const { fixture } = await render('<input data-testid="test-input" [(ngModel)]="testChecked" v-switch/>', {
      imports: [SwitchDirective, FormsModule],
      componentProperties: { testChecked }
    });
    const input = screen.getByTestId<HTMLInputElement>('test-input');
    expect(input.checked).toBe(true);

    await user.click(input);

    fixture.detectChanges();

    expect(input.checked).toBe(false);
  });

  it('should allow formControl checked selection', async () => {
    const user = userEvent.setup();
    const formControl = new FormControl(false);
    const { fixture } = await render('<input data-testid="test-input" [formControl]="formControl" v-switch/>', {
      imports: [SwitchDirective, ReactiveFormsModule],
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
    const { fixture } = await render('<input data-testid="test-input" [formControl]="formControl" v-switch/>', {
      imports: [SwitchDirective, ReactiveFormsModule],
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
    const { fixture } = await render('<input data-testid="test-input" [formControl]="formControl" v-switch/>', {
      imports: [SwitchDirective, ReactiveFormsModule],
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
    const { fixture } = await render('<input data-testid="test-input" [formControl]="formControl" v-switch/>', {
      imports: [SwitchDirective, ReactiveFormsModule],
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
      '<form [formGroup]="form"><input data-testid="test-input" formControlName="testControl" v-switch/></form>',
      {
        imports: [SwitchDirective, ReactiveFormsModule],
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
      '<form [formGroup]="form"><input data-testid="test-input" formControlName="testControl" v-switch/></form>',
      {
        imports: [SwitchDirective, ReactiveFormsModule],
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
      '<form [formGroup]="form"><input data-testid="test-input" formControlName="testControl" v-switch/></form>',
      {
        imports: [SwitchDirective, ReactiveFormsModule],
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
      '<form [formGroup]="form"><input data-testid="test-input" formControlName="testControl" v-switch/></form>',
      {
        imports: [SwitchDirective, ReactiveFormsModule],
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
