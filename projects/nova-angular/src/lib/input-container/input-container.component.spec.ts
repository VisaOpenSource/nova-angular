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

import { ButtonDirective } from '../button/button.directive';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { InputDirective } from '../input/input.directive';
import { LabelDirective } from '../label/label.directive';
import { RadioDirective } from '../radio/radio.directive';
import { SelectDirective } from '../select/select.directive';
import { InputContainerComponent } from './input-container.component';

describe('InputContainerComponent', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-input-container>Menu</div>', {
      imports: [InputContainerComponent]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-input-container');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-input-container>Menu</div>', {
      imports: [InputContainerComponent]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-input-container test-class');
  });

  it('should render surface class when input is a child', async () => {
    const { container } = await render('<div v-input-container><input v-input/></div>', {
      imports: [InputContainerComponent, InputDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-input-container v-surface');
  });

  it('should render surface class when select is a child', async () => {
    const { container } = await render('<div v-input-container><select v-select></select></div>', {
      imports: [InputContainerComponent, SelectDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-input-container v-surface');
  });

  it('should render v-input-control when select is a child and v-icon-visa-toggle is a child', async () => {
    const { container } = await render(
      `<div v-input-container>
        <select v-select id="default-select-field">
          <option hidden></option>
        </select>
        <svg v-icon-visa-chevron-down-tiny></svg>
      </div>`,
      {
        imports: [InputContainerComponent, SelectDirective]
      }
    );

    const inputControl = container.querySelector('.v-input-control');
    expect(inputControl).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('should not render v-input-control when select is a child and v-icon-visa-toggle is a child', async () => {
    const { container } = await render(
      `<div v-input-container useCustomIcon="true">
        <select v-select id="default-select-field">
          <option hidden></option>
        </select>
        <svg v-icon-visa-chevron-down-tiny></svg>
      </div>`,
      {
        imports: [InputContainerComponent, SelectDirective]
      }
    );

    const inputControl = container.querySelector('.v-input-control');
    expect(inputControl).toBeNull();
    expect(container).toMatchSnapshot();
  });

  describe('it should disable all child buttons', () => {
    it('when input is disabled', async () => {
      const { container, fixture } = await render(
        `<div v-input-container>
        <input id="test-id" disabled v-input/>
        <button v-button role="button"></button>
        <button v-button role="button"></button>
      </div>`,
        {
          imports: [InputContainerComponent, InputDirective, ButtonDirective]
        }
      );

      fixture.detectChanges();

      expect(container).toMatchSnapshot();

      const buttons = container.querySelectorAll('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('disabled');
      });
    });

    it('when input is readonly', async () => {
      const { container, fixture } = await render(
        `<div v-input-container>
        <input id="test-id" readonly v-input/>
        <button v-button role="button"></button>
        <button v-button role="button"></button>
      </div>`,
        {
          imports: [InputContainerComponent, InputDirective, ButtonDirective]
        }
      );

      fixture.detectChanges();

      expect(container).toMatchSnapshot();

      const buttons = container.querySelectorAll('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('disabled');
      });
    });
  });

  it('should pass htmlFor to labels with checkbox', async () => {
    const { fixture } = await render(
      `<div v-input-container>
        <input id="test-id" v-checkbox/>
        <label v-label>Test</label>
      </div>`,
      {
        imports: [InputContainerComponent, CheckboxDirective, LabelDirective]
      }
    );

    fixture.detectChanges();
    const label = screen.getByText('Test');
    expect(label).toHaveAttribute('for', 'test-id');
  });

  it('should pass htmlFor to labels with radio', async () => {
    const { fixture } = await render(
      `<div v-input-container>
        <input id="test-id" v-radio/>
        <label v-label>Test</label>
      </div>`,
      {
        imports: [InputContainerComponent, RadioDirective, LabelDirective]
      }
    );

    fixture.detectChanges();
    const label = screen.getByText('Test');
    expect(label).toHaveAttribute('for', 'test-id');
  });

  it("shouldn't pass htmlFor to labels without child input", async () => {
    const { fixture } = await render(
      `<div v-input-container>
        <label v-label>Test</label>
      </div>`,
      {
        imports: [InputContainerComponent, RadioDirective, LabelDirective]
      }
    );

    fixture.detectChanges();
    const label = screen.getByText('Test');
    expect(label.getAttribute('for')).toBe(null);
  });
});
