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
import userEvent from '@testing-library/user-event';

import { ToggleContainerDirective } from '../toggle-container/toggle-container.directive';
import { ToggleButtonDirective } from './toggle-button.directive';

describe('ToggleButtonDirective', () => {
  it('should render the defaults correctly', async () => {
    await render('<div v-toggle-container><button data-testid="toggle-button" v-toggle>Label</button></div>', {
      imports: [ToggleButtonDirective]
    });
    const toggleButton = screen.getByTestId('toggle-button');
    expect(toggleButton?.getAttribute('aria-disabled')).toBe(null);
    expect(toggleButton?.getAttribute('aria-pressed')).toBe('false');
    expect(toggleButton?.getAttribute('disabled')).toBe(null);
    expect(toggleButton?.getAttribute('type')).toBe('button');
  });

  it('should render disabled correctly', async () => {
    await render('<div v-toggle-container><button v-toggle data-testid="toggle-button" disabled>Label</button></div>', {
      imports: [ToggleButtonDirective]
    });
    const toggleButton = screen.getByTestId('toggle-button');
    expect(toggleButton?.getAttribute('aria-disabled')).toBe('true');
    expect(toggleButton?.getAttribute('disabled')).toBe('disabled');
  });

  it('should render as disabled if container is disabled', async () => {
    const { fixture } = await render(
      '<div v-toggle-container disabled><button v-toggle data-testid="toggle-button">Label</button></div>',
      {
        imports: [ToggleButtonDirective, ToggleContainerDirective]
      }
    );

    fixture.detectChanges();

    const toggleButton = screen.getByTestId('toggle-button');
    expect(toggleButton?.getAttribute('aria-disabled')).toBe('true');
    expect(toggleButton?.getAttribute('disabled')).toBe('disabled');
  });

  it('should recognize initial active state', async () => {
    await render('<div v-toggle-container><button v-toggle active data-testid="toggle-button">Label</button></div>', {
      imports: [ToggleButtonDirective, ToggleContainerDirective]
    });

    const toggleButton = screen.getByTestId('toggle-button');
    expect(toggleButton?.getAttribute('aria-pressed')).toBe('true');
  });

  it('should set active state to true when clicked', async () => {
    const user = userEvent.setup();
    const { container } = await render(
      '<div v-toggle-container><button v-toggle data-testid="toggle-button">Label</button></div>',
      {
        imports: [ToggleButtonDirective]
      }
    );
    const button = screen.getByTestId('toggle-button');
    if (!button) return;
    const btnAriaPressed = button?.getAttribute('aria-pressed');
    expect(btnAriaPressed === null || btnAriaPressed === 'false').toBe(true);
    await user.click(button);
    expect(button?.getAttribute('aria-pressed')).toBe('true');
  });

  it('should behave as multiselect if container is multiselect', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(
      '<div v-toggle-container multiselect><button v-toggle data-testid="toggle-button">Label</button></div>',
      {
        imports: [ToggleButtonDirective, ToggleContainerDirective]
      }
    );

    fixture.detectChanges();

    const button = screen.getByTestId('toggle-button');

    // should not be active by default
    const btnAriaPressed = button?.getAttribute('aria-pressed');
    expect(btnAriaPressed === null || btnAriaPressed === 'false').toBe(true);

    // click the button to set it active
    if (!button) return;
    await user.click(button);
    expect(button?.getAttribute('aria-pressed')).toBe('true');

    // click the button again to set it inactive
    await user.click(button);
    expect(button?.getAttribute('aria-pressed')).toBe('false');
  });
});
