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
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { By } from '@angular/platform-browser';
import {
  ToggleContainerDirective,
  ToggleContainerValue,
} from './toggle-container.directive';
import { ToggleButtonDirective } from '../toggle-button/toggle-button.directive';
import { ToggleDirective } from '../toggle/toggle.directive';
import { RadioDirective } from '../radio/radio.directive';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';

describe('ToggleContainerDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-toggle-container>Child</div>', {
      imports: [ToggleContainerDirective],
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-toggle-container',
    );
    expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe(
      null,
    );
    expect(container.firstElementChild?.getAttribute('disabled')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render(
      '<div class="test-class" v-toggle-container>Child</div>',
      {
        imports: [ToggleContainerDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-toggle-container test-class',
    );
  });

  it('should set aria-invalid attribute', async () => {
    const { container } = await render(
      '<div v-toggle-container invalid>Child</div>',
      {
        imports: [ToggleContainerDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe(
      'true',
    );
  });

  it('should show as disabled if all children are disabled', async () => {
    const { container } = await render(
      `<fieldset v-toggle-container>
        <button v-toggle disabled>Label 1</button>
        <button v-toggle disabled>Label 2</button>
        <button v-toggle disabled>Label 3</button>
      </fieldset>`,
      {
        imports: [ToggleContainerDirective, ToggleButtonDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('disabled')).toBe(
      'disabled',
    );
  });

  it('should update items if given initial value', async () => {
    const { fixture } = await render(
      `<fieldset v-toggle-container value="2">
        <button v-toggle vGap="6" value="1" data-testid="test-toggle-1">Label 1</button>
        <button v-toggle vGap="6" value="2" data-testid="test-toggle-2">Label 2</button>
        <button v-toggle vGap="6" value="3" data-testid="test-toggle-3">Label 3</button>
      </fieldset>`,
      {
        imports: [ToggleContainerDirective, ToggleButtonDirective],
      },
    );

    await fixture.whenStable();

    const toggle1 = screen
      .getByTestId('test-toggle-1')
      ?.getAttribute('aria-pressed');
    const toggle2 = screen
      .getByTestId('test-toggle-2')
      ?.getAttribute('aria-pressed');
    const toggle3 = screen
      .getByTestId('test-toggle-3')
      ?.getAttribute('aria-pressed');

    // aria-pressed can return as null (unset) or 'false' (value is given, but not pressed)
    // 'false' is truthy as a string, so we check for both
    expect(toggle1 === 'false' || toggle1 === null).toBe(true);
    expect(toggle2).toBe('true');
    expect(toggle3 === 'false' || toggle1 === null).toBe(true);
  });

  it('should update value if items are given initial active state', async () => {
    const { fixture } = await render(
      `<fieldset v-toggle-container>
        <button v-toggle vGap="6" value="1" data-testid="test-toggle-1">Label 1</button>
        <button v-toggle vGap="6" value="2" data-testid="test-toggle-2" active>Label 2</button>
        <button v-toggle vGap="6" value="3" data-testid="test-toggle-3">Label 3</button>
      </fieldset>`,
      {
        imports: [ToggleContainerDirective, ToggleButtonDirective],
      },
    );

    await fixture.whenStable();

    // toggle container doesn't render the value anywhere, test directive
    const containerDirective = fixture.debugElement.query(
      By.directive(ToggleContainerDirective),
    );
    const toggleContainer = containerDirective.injector.get(
      ToggleContainerDirective,
    );
    expect(toggleContainer.value()).toBe('2');
  });

  it('should set all radio names to the same value', async () => {
    await render(
      `<fieldset v-toggle-container>
        <label v-toggle vGap="6"> <input v-radio data-testid="test-toggle-1" />Label 1</label>
        <label v-toggle vGap="6"> <input v-radio data-testid="test-toggle-2" />Label 2</label>
        <label v-toggle vGap="6"> <input v-radio data-testid="test-toggle-3" />Label 3</label>
      </fieldset>`,
      {
        imports: [ToggleContainerDirective, ToggleDirective, RadioDirective],
      },
    );

    const toggle1 = screen.getByTestId('test-toggle-1');
    const toggle2 = screen.getByTestId('test-toggle-2');
    const toggle3 = screen.getByTestId('test-toggle-3');

    expect(toggle1?.getAttribute('name')).toBe(toggle2?.getAttribute('name'));
    expect(toggle1?.getAttribute('name')).toBe(toggle3?.getAttribute('name'));
  });

  it('should allow multiple selected values if multiselect is true', async () => {
    const { fixture } = await render(
      `<fieldset v-toggle-container multiselect [value]="['1', '3']">
        <button v-toggle value="1" data-testid="test-toggle-1">
          Label 1
        </button>
        <button v-toggle value="2" data-testid="test-toggle-2">
          Label 2
        </button>
        <button v-toggle value="3" data-testid="test-toggle-3">
          Label 3
        </button>
      </fieldset>`,
      {
        imports: [ToggleContainerDirective, ToggleButtonDirective],
      },
    );
    await fixture.whenStable();

    const toggle1 = screen
      .getByTestId('test-toggle-1')
      ?.getAttribute('aria-pressed');
    const toggle2 = screen
      .getByTestId('test-toggle-2')
      ?.getAttribute('aria-pressed');
    const toggle3 = screen
      .getByTestId('test-toggle-3')
      ?.getAttribute('aria-pressed');

    // aria-pressed can return as null (unset) or 'false' (value is given, but not pressed)
    // 'false' is truthy as a string, so we check for both
    expect(toggle1).toBe('true');
    expect(toggle2 === 'false' || toggle2 === null).toBe(true);
    expect(toggle3).toBe('true');
  });
});

describe('ToggleContainerDirective with FormsModule', () => {
  /**
   * Form integration tests
   */
  it('should allow ngModel to set value', async () => {
    const model = { value: 'test-toggle-2' }; // Ensure this is a model object
    const { fixture } = await render(
      `<fieldset
          v-toggle-container
          [(ngModel)]="model.value"
        >
          <button v-toggle value="test-toggle-1" data-testid="test-toggle-1">
            Label 1
          </button>
          <button v-toggle value="test-toggle-2" data-testid="test-toggle-2">
            Label 2
          </button>
          <button v-toggle value="test-toggle-3" data-testid="test-toggle-3">
            Label 3
          </button>
        </fieldset>`,
      {
        imports: [ToggleContainerDirective, ToggleButtonDirective, FormsModule],
        componentProperties: {
          model,
        },
      },
    );
    await fixture.whenStable();

    const toggle1 = screen
      .getByTestId('test-toggle-1')
      ?.getAttribute('aria-pressed');
    const toggle2 = screen
      .getByTestId('test-toggle-2')
      ?.getAttribute('aria-pressed');
    const toggle3 = screen
      .getByTestId('test-toggle-3')
      ?.getAttribute('aria-pressed');

    // aria-pressed can return as null (unset) or 'false' (value is given, but not pressed)
    // 'false' is truthy as a string, so we check for both
    expect(toggle1 === 'false' || toggle1 === null).toBe(true);
    expect(toggle2).toBe('true');
    expect(toggle3 === 'false' || toggle3 === null).toBe(true);
  });
  it('should allow ngModel to set value to multiple values', async () => {
    const model = { value: ['test-toggle-1', 'test-toggle-3'] }; // Ensure this is a model object
    const { fixture } = await render(
      `<fieldset
          v-toggle-container
          [(ngModel)]="model.value"
          multiselect
        >
          <button v-toggle value="test-toggle-1" data-testid="test-toggle-1">
            Label 1
          </button>
          <button v-toggle value="test-toggle-2" data-testid="test-toggle-2">
            Label 2
          </button>
          <button v-toggle value="test-toggle-3" data-testid="test-toggle-3">
            Label 3
          </button>
        </fieldset>`,
      {
        imports: [ToggleContainerDirective, ToggleButtonDirective, FormsModule],
        componentProperties: {
          model,
        },
      },
    );

    fixture.detectChanges();
    await fixture.whenStable();

    const toggle1 = screen
      .getByTestId('test-toggle-1')
      ?.getAttribute('aria-pressed');
    const toggle2 = screen
      .getByTestId('test-toggle-2')
      ?.getAttribute('aria-pressed');
    const toggle3 = screen
      .getByTestId('test-toggle-3')
      ?.getAttribute('aria-pressed');

    // aria-pressed can return as null (unset) or 'false' (value is given, but not pressed)
    // 'false' is truthy as a string, so we check for both
    expect(toggle1).toBe('true');
    expect(toggle2 === 'false' || toggle2 === null).toBe(true);
    expect(toggle3).toBe('true');
  });
  it('should update ngModel value with interaction', async () => {
    const user = userEvent.setup();
    const model = { value: 'test-toggle-2' }; // Ensure this is a model object
    const { fixture } = await render(
      `<fieldset
        v-toggle-container
        [(ngModel)]="model.value"
      >
        <button v-toggle value="test-toggle-1" data-testid="test-toggle-1">
          Label 1
        </button>
        <button v-toggle value="test-toggle-2" data-testid="test-toggle-2">
          Label 2
        </button>
        <button v-toggle value="test-toggle-3" data-testid="test-toggle-3">
          Label 3
        </button>
      </fieldset>`,
      {
        imports: [ToggleContainerDirective, ToggleButtonDirective, FormsModule],
        componentProperties: {
          model,
        },
      },
    );
    await fixture.whenStable();

    const toggle1El = screen.getByTestId('test-toggle-1');
    const toggle1 = toggle1El?.getAttribute('aria-pressed');
    const toggle2El = screen.getByTestId('test-toggle-2');
    const toggle2 = toggle2El?.getAttribute('aria-pressed');
    const toggle3 = screen
      .getByTestId('test-toggle-3')
      ?.getAttribute('aria-pressed');

    // aria-pressed can return as null (unset) or 'false' (value is given, but not pressed)
    // 'false' is truthy as a string, so we check for both
    expect(toggle1 === 'false' || toggle1 === null).toBe(true);
    expect(toggle2).toBe('true');
    expect(toggle3 === 'false' || toggle3 === null).toBe(true);

    await user.click(toggle1El!);
    const updatedToggle1 = toggle1El?.getAttribute('aria-pressed');
    const updatedToggle2 = toggle2El?.getAttribute('aria-pressed');

    // aria-pressed can return as null (unset) or 'false' (value is given, but not pressed)
    // 'false' is truthy as a string, so we check for both
    expect(updatedToggle1).toBe('true');
    expect(updatedToggle2 === 'false' || updatedToggle2 === null).toBe(true);
    expect(toggle3 === 'false' || toggle3 === null).toBe(true);

    // check if ngModel is updated
    expect(model.value).toBe('test-toggle-1');
  });
});

describe('ToggleContainerDirective with ReactiveFormsModule', () => {
  it('should allow formControl to set value', async () => {
    const formControl = new FormControl<ToggleContainerValue>('test-toggle-2'); // Ensure this is a FormControl
    const { fixture } = await render(
      `<fieldset
    v-toggle-container
    [formControl]="formControl"
  >
    <button v-toggle value="test-toggle-1" data-testid="test-toggle-1">
      Label 1
    </button>
    <button v-toggle value="test-toggle-2" data-testid="test-toggle-2">
      Label 2
    </button>
    <button v-toggle value="test-toggle-3" data-testid="test-toggle-3">
      Label 3
    </button>
  </fieldset>`,
      {
        imports: [
          ToggleContainerDirective,
          ToggleButtonDirective,
          ReactiveFormsModule,
        ],
        componentProperties: { formControl },
      },
    );
    await fixture.whenStable();

    const toggle1 = screen
      .getByTestId('test-toggle-1')
      ?.getAttribute('aria-pressed');
    const toggle2 = screen
      .getByTestId('test-toggle-2')
      ?.getAttribute('aria-pressed');
    const toggle3 = screen
      .getByTestId('test-toggle-3')
      ?.getAttribute('aria-pressed');

    // aria-pressed can return as null (unset) or 'false' (value is given, but not pressed)
    // 'false' is truthy as a string, so we check for both
    expect(toggle1 === 'false' || toggle1 === null).toBe(true);
    expect(toggle2).toBe('true');
    expect(toggle3 === 'false' || toggle3 === null).toBe(true);
  });
  it('should allow formControl to set value to multiple values', async () => {
    const formControl = new FormControl<ToggleContainerValue>([
      'test-toggle-1',
      'test-toggle-3',
    ]); // Ensure this is a FormControl
    const { fixture } = await render(
      `<fieldset
        v-toggle-container
        [formControl]="formControl"
        multiselect
       >
        <button v-toggle value="test-toggle-1" data-testid="test-toggle-1">
          Label 1
        </button>
        <button v-toggle value="test-toggle-2" data-testid="test-toggle-2">
          Label 2
        </button>
        <button v-toggle value="test-toggle-3" data-testid="test-toggle-3">
          Label 3
        </button>
      </fieldset>`,
      {
        imports: [
          ToggleContainerDirective,
          ToggleButtonDirective,
          ReactiveFormsModule,
        ],
        componentProperties: { formControl },
      },
    );
    fixture.detectChanges();
    await fixture.whenStable();

    const toggle1 = screen
      .getByTestId('test-toggle-1')
      ?.getAttribute('aria-pressed');
    const toggle2 = screen
      .getByTestId('test-toggle-2')
      ?.getAttribute('aria-pressed');
    const toggle3 = screen
      .getByTestId('test-toggle-3')
      ?.getAttribute('aria-pressed');

    expect(toggle1).toBe('true');
    expect(toggle2 === 'false' || toggle2 === null).toBe(true);
    expect(toggle3).toBe('true');
  });
  it('should update formControl value with interaction', async () => {
    const user = userEvent.setup();
    const formControl = new FormControl<ToggleContainerValue>('test-toggle-2'); // Ensure this is a FormControl
    const { fixture } = await render(
      `<fieldset
        v-toggle-container
        [formControl]="formControl"
      >
        <button v-toggle value="test-toggle-1" data-testid="test-toggle-1">
          Label 1
        </button>
        <button v-toggle value="test-toggle-2" data-testid="test-toggle-2">
          Label 2
        </button>
        <button v-toggle value="test-toggle-3" data-testid="test-toggle-3">
          Label 3
        </button>
      </fieldset>`,
      {
        imports: [
          ToggleContainerDirective,
          ToggleButtonDirective,
          ReactiveFormsModule,
        ],
        componentProperties: { formControl },
      },
    );
    await fixture.whenStable();

    const toggle1El = screen.getByTestId('test-toggle-1');
    const toggle1 = toggle1El?.getAttribute('aria-pressed');
    const toggle2El = screen.getByTestId('test-toggle-2');
    const toggle2 = toggle2El?.getAttribute('aria-pressed');
    const toggle3 = screen
      .getByTestId('test-toggle-3')
      ?.getAttribute('aria-pressed');

    expect(toggle1 === 'false' || toggle1 === null).toBe(true);
    expect(toggle2).toBe('true');
    expect(toggle3 === 'false' || toggle3 === null).toBe(true);

    await user.click(toggle1El!);
    const updatedToggle1 = toggle1El?.getAttribute('aria-pressed');
    const updatedToggle2 = toggle2El?.getAttribute('aria-pressed');

    expect(updatedToggle1).toBe('true');
    expect(updatedToggle2 === 'false' || updatedToggle2 === null).toBe(true);
    expect(toggle3 === 'false' || toggle3 === null).toBe(true);

    // check if formControl is updated
    expect(formControl.value).toBe('test-toggle-1');
  });
});
