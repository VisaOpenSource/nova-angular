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
import { render, screen } from '@testing-library/angular';

import { ListboxItemComponent } from './listbox-item.component';
import { By } from '@angular/platform-browser';
import { ListboxDirective } from '../listbox/listbox.directive';
import { Component } from '@angular/core';
import userEvent from '@testing-library/user-event';

describe('ListboxItemComponent', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-listbox-item value="test">Label</div>', {
      imports: [ListboxItemComponent]
    });
    expect(container.firstElementChild?.getAttribute('aria-disabled')).not.toBe(true); // doesn't really matter if false or null
    expect(container.firstElementChild?.getAttribute('aria-selected')).not.toBe(true); // doesn't really matter if false or null
    expect(container.firstElementChild?.getAttribute('disabled')).toBe(null);
    expect(container.firstElementChild?.getAttribute('id')).not.toBe(null);
    expect(container.firstElementChild?.getAttribute('role')).toBe('option');
    expect(container.firstElementChild?.getAttribute('value')).toBe('test');
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-listbox-item');
  });

  it('should render custom class', async () => {
    const { container } = await render('<div class="test-class" v-listbox-item value="test-list-item"></div>', {
      imports: [ListboxItemComponent]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-listbox-item test-class');
  });

  it('should allow disabled', async () => {
    const { container } = await render('<div disabled="true" v-listbox-item value="test-list-item"></div>', {
      imports: [ListboxItemComponent]
    });
    expect(container.firstElementChild?.getAttribute('aria-disabled')).toBe('true');
    expect(container.firstElementChild?.getAttribute('disabled')).toBe(null);
  });

  it('should allow custom id', async () => {
    const { container } = await render('<div id="test-id" v-listbox-item value="test-list-item"></div>', {
      imports: [ListboxItemComponent]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should allow custom role', async () => {
    const { container } = await render('<div role="test-role" v-listbox-item value="test-list-item"></div>', {
      imports: [ListboxItemComponent]
    });
    expect(container.firstElementChild?.getAttribute('role')).toBe('test-role');
  });

  it('should allow custom value', async () => {
    const { container } = await render('<div value="test" v-listbox-item value="test-list-item">Label</div>', {
      imports: [ListboxItemComponent]
    });
    expect(container.firstElementChild?.getAttribute('value')).toBe('test-list-item');
  });

  it('should recognize an initial active state', async () => {
    const { container } = await render(
      `<div v-listbox>
      <div v-listbox-item value="test-list-item" active data-testid="listitem">Label</div>
    </div>`,
      {
        imports: [ListboxDirective, ListboxItemComponent] // needs listbox directive to set active state
      }
    );
    const listItem = screen.getByTestId('listitem');
    expect(listItem?.getAttribute('aria-selected')).toBeTruthy();
  });

  it('should allow highlighted item on focus', async () => {
    const { fixture, debugElement } = await render(
      `
      <div v-listbox data-testid="listbox">
        <div data-testid="item" v-listbox-item value="test-list-item" active></div>
      </div>`,
      {
        imports: [ListboxDirective, ListboxItemComponent]
      }
    );
    const directiveElement = debugElement.query(By.directive(ListboxDirective));
    if (!directiveElement) {
      throw new Error('ListboxDirective not found in the rendered template.');
    }
    const directive = directiveElement.injector.get(ListboxDirective);

    directive.showFocus.set(true);
    const listbox = screen.getByTestId('listbox');
    const item = screen.getByTestId('item');

    listbox.focus();
    await fixture.whenStable();

    expect(item?.getAttribute('class')).toBe('v-listbox-item v-listbox-item-highlighted');
  });

  describe('selection', () => {
    it('should select an item on click', async () => {
      const { fixture } = await render(
        `<div v-listbox>
        <div v-listbox-item value="test-list-item">Label</div>
      </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent]
        }
      );
      const listItem = screen.getByText('Label');
      listItem.click();
      await fixture.whenStable();

      expect(listItem.getAttribute('aria-selected')).toBe('true');
    });

    it('should select an item on space key press', async () => {
      const { fixture } = await render(
        `<div v-listbox data-testid="listbox">
        <div v-listbox-item value="test-list-item" data-testid="item1" active>Label 1</div>
        <div v-listbox-item value="test-list-item" >Label 2</div>      
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent]
        }
      );
      const listbox = screen.getByTestId('listbox');
      const listItem = screen.getByTestId('item1');
      await userEvent.click(listbox);
      await userEvent.keyboard('{Space}');
      await fixture.whenStable();

      expect(listItem.getAttribute('aria-selected')).toBe('true');
    });

    it('should select an item on enter key press', async () => {
      const { fixture } = await render(
        `<div v-listbox data-testid="listbox">
        <div v-listbox-item value="test-list-item" data-testid="item1" active>Label 1</div>
        <div v-listbox-item value="test-list-item" >Label 2</div>      
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent]
        }
      );
      const listbox = screen.getByTestId('listbox');
      const listItem = screen.getByTestId('item1');
      await userEvent.click(listbox);
      await userEvent.keyboard('{Enter}');
      await fixture.whenStable();

      expect(listItem.getAttribute('aria-selected')).toBe('true');
    });

    it('should not select an item on other key presses', async () => {
      const { fixture } = await render(
        `<div v-listbox>
        <div v-listbox-item value="test-list-item" data-testid="item1" active>Label 1</div>
        <div v-listbox-item value="test-list-item" >Label 2</div>
      </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent]
        }
      );
      const listItem = screen.getByTestId('item1');
      const otherEvent = new KeyboardEvent('keydown', { key: 'a' });
      listItem.dispatchEvent(otherEvent);
      await fixture.whenStable();

      expect(listItem.getAttribute('aria-selected')).toBe('true'); // Should remain selected
    });
  });

  describe('HTML rendering', () => {
    it('should render a span with v-checkbox class (and flex class) when multiselect is true', async () => {
      const { container } = await render(
        `
        <div v-listbox multiselect>
          <div v-listbox-item value="test-list-item">Label</div>
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent]
        }
      );

      const checkbox = container.querySelector('.v-checkbox');
      expect(checkbox).toBeTruthy();
      expect(checkbox?.classList.contains('v-flex-shrink-0')).toBeTruthy();
    });

    it('should render a span with v-radio class (and flex class) when multiselect is false', async () => {
      const { container } = await render(
        `
        <div v-listbox>
          <div v-listbox-item value="test-list-item">Label</div>
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent]
        }
      );

      const radio = container.querySelector('.v-radio');
      expect(radio).toBeTruthy();
      expect(radio?.classList.contains('v-flex-shrink-0')).toBeTruthy();
    });
  });
});
