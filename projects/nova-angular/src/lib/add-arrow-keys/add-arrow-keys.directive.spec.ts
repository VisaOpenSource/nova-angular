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

import { DropdownItemDirective } from '../dropdown-item/dropdown-item.directive';
import { AddArrowKeysDirective } from './add-arrow-keys.directive';

describe('AddArrowKeysDirective', () => {
  it('should focus the next item on DOWN_ARROW_KEY press', async () => {
    const { fixture } = await render(
      `<div vAddArrowKeys> <button v-dropdown-item>Item 1</button> <button v-dropdown-item>Item 2</button> </div>`,
      { imports: [AddArrowKeysDirective, DropdownItemDirective] }
    );
    const firstItem = screen.getByText('Item 1');
    const secondItem = screen.getByText('Item 2');

    firstItem.focus();

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    firstItem.dispatchEvent(event);

    fixture.detectChanges();
    expect(document.activeElement).toBe(secondItem);
  });

  it('should focus the previous item on UP_ARROW_KEY press', async () => {
    const { fixture } = await render(
      `<div vAddArrowKeys> <button v-dropdown-item>Item 1</button> <button v-dropdown-item>Item 2</button> </div>`,
      { imports: [AddArrowKeysDirective, DropdownItemDirective] }
    );
    const firstItem = screen.getByText('Item 1');
    const secondItem = screen.getByText('Item 2');

    firstItem.focus();
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    firstItem.dispatchEvent(event);

    fixture.detectChanges();
    expect(document.activeElement).toBe(secondItem);
  });

  it('should not change focus on ESCAPE_KEY press', async () => {
    const { fixture } = await render(
      `<div vAddArrowKeys> <button v-dropdown-item>Item 1</button> <button v-dropdown-item>Item 2</button> </div>`,
      { imports: [AddArrowKeysDirective, DropdownItemDirective] }
    );
    const firstItem = screen.getByText('Item 1');

    firstItem.focus();
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    firstItem.dispatchEvent(event);

    fixture.detectChanges();
    expect(document.activeElement).toBe(firstItem);
  });

  it('should do nothing if there are no items', async () => {
    const listenMock = jest.fn();
    const renderer2Mock = {
      listen: listenMock
    };
    const { fixture } = await render(`<div vAddArrowKeys></div>`, {
      imports: [AddArrowKeysDirective],
      providers: [{ provide: require('@angular/core').Renderer2, useValue: renderer2Mock }]
    });

    await fixture.whenStable();

    expect(listenMock).not.toHaveBeenCalled();
  });

  it('should do nothing if all items are disabled', async () => {
    const listenMock = jest.fn();
    const renderer2Mock = {
      listen: listenMock
    };
    const { fixture } = await render(
      `
        <ul vAddArrowKeys>
          <li>
            <button v-dropdown-item>Label 1</button>
          </li>
          <li>
            <button v-dropdown-item>Label 2</button>
          </li>
          <li>
            <button v-dropdown-item>Label 3</button>
          </li>
        </ul>
      `,
      {
        imports: [AddArrowKeysDirective, DropdownItemDirective],
        providers: [{ provide: require('@angular/core').Renderer2, useValue: renderer2Mock }]
      }
    );

    await fixture.whenStable();
    expect(listenMock).not.toHaveBeenCalled();
  });
});
