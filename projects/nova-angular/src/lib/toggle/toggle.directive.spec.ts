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

import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { RadioDirective } from '../radio/radio.directive';
import { ToggleDirective } from './toggle.directive';

describe('ToggleDirective', () => {
  it('should render default class correctly', async () => {
    await render('<div v-toggle-container><div v-toggle data-testid="toggle">Child</div></div>', {
      imports: [ToggleDirective]
    });
    const toggle = screen.getByTestId('toggle');
    expect(toggle?.getAttribute('class')).toBe('v-toggle');
  });

  it('should allow custom class', async () => {
    await render('<div v-toggle-container><div class="test-class" v-toggle data-testid="toggle">Child</div></div>', {
      imports: [ToggleDirective]
    });
    const toggle = screen.getByTestId('toggle');
    expect(toggle?.getAttribute('class')).toBe('v-toggle test-class');
  });

  it('should add an id to a child radio and match its for attribute to it', async () => {
    await render(
      '<div v-toggle-container><label v-toggle data-testid="toggle"><input v-radio data-testid="toggle-radio" /></label></div>',
      {
        imports: [ToggleDirective, RadioDirective]
      }
    );
    const toggle = screen.getByTestId('toggle');
    const input = screen.getByTestId('toggle-radio');
    expect(input?.getAttribute('id')).toBeTruthy();
    expect(toggle?.getAttribute('for')).toBe(input?.getAttribute('id'));
  });

  it('should not override a user-given id on a child radio ', async () => {
    await render(
      '<div v-toggle-container><label v-toggle data-testid="toggle"><input v-radio id="custom-id" data-testid="toggle-radio" /></label></div>',
      {
        imports: [ToggleDirective, RadioDirective]
      }
    );
    const radio = screen.getByTestId('toggle-radio');
    expect(radio?.getAttribute('id')).toBe('custom-id');
  });

  it('should add an id to a child checkbox and match its for attribute to it', async () => {
    await render(
      '<div v-toggle-container><label v-toggle data-testid="toggle"><input v-checkbox data-testid="toggle-checkbox" /></label></div>',
      {
        imports: [ToggleDirective, CheckboxDirective]
      }
    );
    const toggle = screen.getByTestId('toggle');
    const input = screen.getByTestId('toggle-checkbox');
    expect(input?.getAttribute('id')).toBeTruthy();
    expect(toggle?.getAttribute('for')).toBe(input?.getAttribute('id'));
  });

  it('should not override a user-given id on a child checkbox ', async () => {
    await render(
      '<div v-toggle-container><label v-toggle data-testid="toggle"><input data-testid="toggle-checkbox" v-checkbox id="custom-id" /></label></div>',
      {
        imports: [ToggleDirective, CheckboxDirective]
      }
    );
    const checkbox = screen.getByTestId('toggle-checkbox');
    expect(checkbox?.getAttribute('id')).toBe('custom-id');
  });
});
