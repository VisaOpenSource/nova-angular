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

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ButtonDirective } from '../button/button.directive';
import { FloatingUIContainer } from '../floating-ui-container/floating-ui-container.directive';
import { FloatingUIElementDirective } from '../floating-ui-element/floating-ui-element.directive';
import { FloatingUITriggerDirective } from '../floating-ui-trigger/floating-ui-trigger.directive';
import { FloatingUIService } from '../floating-ui/floating-ui.service';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';
import { IdGenerator } from '../id-generator/id-generator.service';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputDirective } from '../input/input.directive';
import { LabelDirective } from '../label/label.directive';
import { ListboxContainerDirective } from '../listbox-container/listbox-container.directive';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { ListboxDirective } from '../listbox/listbox.directive';
import { NovaLibService } from '../nova-lib.service';
import { ComboboxDirective } from './combobox.directive';

describe('ComboboxDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-combobox>Content</div>', {
      imports: [ComboboxDirective]
    });
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe(null);
    expect(container.firstElementChild?.getAttribute('disabled')).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-combobox');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-combobox>Content</div>', {
      imports: [ComboboxDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-combobox test-class');
  });

  describe('Combobox readonly behavior', () => {
    it('should add readonly span by default when readonly is passed', async () => {
      const { fixture, container } = await render(
        `<div v-combobox readonly>
            <label v-label data-testid="label">Label</label>
        </div>`,
        {
          imports: [ComboboxDirective, LabelDirective]
        }
      );
      await fixture.whenStable();
      expect(container.querySelector('.v-sr')).not.toBeNull();
    });

    it('should not add readonly span if user specifies', async () => {
      const { fixture, container } = await render(
        `<div v-combobox readonly removeReadonlyText>
            <label v-label data-testid="label">Label</label>
        </div>`,
        {
          imports: [ComboboxDirective, LabelDirective]
        }
      );
      await fixture.whenStable();
      expect(container.querySelector('.v-sr')).toBeNull();
    });

    // can't test at the moment because of angular testing library limitations with directive property setting
    it.skip('should remove readonly span if readonly is removed', async () => {
      const { fixture, container, debugElement } = await render(
        `<div v-combobox readonly>
          <label v-label data-testid="label">Label</label>
          <input v-input data-testid="input" />
        </div>`,
        {
          imports: [ComboboxDirective, LabelDirective, InputDirective],
          providers: [IdGenerator]
        }
      );

      // Update the readonly property
      const input = screen.getByTestId('input');
      fixture.detectChanges();
      await fixture.whenStable();
      expect(input.getAttribute('readonly')).toBe('readonly');
      expect(container.querySelector('.v-sr')).not.toBeNull();

      await fixture.whenStable();
      fixture.detectChanges();
      expect(input.getAttribute('readonly')).toBe(null);
      expect(container.querySelector('.v-sr')).toBeNull();
    });
  });

  describe('ComboboxDirective should correctly determine input child attributes', () => {
    it('should set input aria-owns to match listbox container id', async () => {
      await render(
        `
        <div v-combobox>
          <input v-input data-testid="input" />
          <div v-listbox-container id="test" data-testid="listbox-container"></div>
        </div>`,
        {
          imports: [ComboboxDirective, ListboxContainerDirective, InputDirective]
        }
      );
      const input = screen.getByTestId('input');
      const listboxContainer = screen.getByTestId('listbox-container');
      const listboxId = listboxContainer.getAttribute('id');
      expect(input.getAttribute('aria-owns')).toBe(listboxId);
    });

    it('should set input as disabled when disabled is passed', async () => {
      await render(
        `
        <div v-combobox disabled>
          <input v-input data-testid="input" />
        </div>`,
        {
          imports: [ComboboxDirective, InputDirective]
        }
      );
      const input = screen.getByTestId('input');
      expect(input.getAttribute('disabled')).toBe('disabled');
    });

    it('should set input as readonly when readonly is passed', async () => {
      await render(
        `
        <div v-combobox readonly>
          <input v-input data-testid="input" />
        </div>`,
        {
          imports: [ComboboxDirective, InputDirective]
        }
      );
      const input = screen.getByTestId('input');
      expect(input.getAttribute('readonly')).toBe('readonly');
    });

    it('should set input as invalid when invalid is passed', async () => {
      await render(
        `
        <div v-combobox invalid>
          <input v-input data-testid="input" />
        </div>`,
        {
          imports: [ComboboxDirective, InputDirective]
        }
      );
      const input = screen.getByTestId('input');
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    it('should set input aria-expanded and aria-control attributes correctly on listbox expand and collapse', async () => {
      await render(
        `<div v-combobox v-floating-ui-container>
          <div v-input-container v-floating-ui-trigger>
            <input v-input data-testid="input" />
          </div>
          <div v-listbox-container v-floating-ui-element data-testid="listbox-container">
            <ul v-listbox data-testid="listbox" id="listbox">
              <li v-listbox-item value="option-a" id="option-a">Option A</li>
            </ul>
          </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            ListboxDirective,
            InputDirective,
            ListboxContainerDirective,
            FloatingUITriggerDirective,
            FloatingUITriggerDirective,
            FloatingUIContainer,
            FloatingUIElementDirective
          ],
          providers: [FloatingUIService]
        }
      );
      const input = screen.getByTestId('input');
      const listbox = screen.getByTestId('listbox');
      const listboxContainer = screen.getByTestId('listbox-container');
      const listboxId = listbox.getAttribute('id');

      // should be null when menu is closed
      expect(input.getAttribute('aria-controls')).toBe(null);
      expect(input.getAttribute('aria-expanded')).toBe('false');
      expect(listboxContainer.style.display).toBe('none');

      await userEvent.click(input);
      await userEvent.keyboard('{ArrowDown}');
      // should be set to listbox id when menu is open
      expect(listboxContainer.style.display).toBe('flex');
      expect(input.getAttribute('aria-controls')).toBe(listboxId);
      expect(input.getAttribute('aria-expanded')).toBe('true');

      await userEvent.keyboard('{Escape}');
      // should be null when menu is closed
      expect(input.getAttribute('aria-controls')).toBe(null);
      expect(input.getAttribute('aria-expanded')).toBe('false');
      expect(listboxContainer.style.display).toBe('none');
    });

    it('should set input aria-activedescendant attribute correctly on listbox selection', async () => {
      await render(
        `<div v-combobox v-floating-ui-container>
          <div v-input-container v-floating-ui-trigger>
            <input v-input data-testid="input" />
          </div>
          <div v-listbox-container v-floating-ui-element >
            <ul v-listbox id="listbox">
              <li v-listbox-item data-testid="listbox-item" value="option-a" id="option-a">Option A</li>
            </ul>
          </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            ListboxDirective,
            InputDirective,
            ListboxContainerDirective,
            ListboxItemComponent,
            FloatingUITriggerDirective,
            FloatingUITriggerDirective,
            FloatingUIContainer,
            FloatingUIElementDirective
          ],
          providers: [FloatingUIService, NovaLibService]
        }
      );
      const input = screen.getByTestId('input');
      const listboxItem = screen.getByTestId('listbox-item');
      const listboxItemId = listboxItem.getAttribute('id');

      // should be null when menu is closed
      expect(input.getAttribute('aria-activedescendant')).toBe(null);

      await userEvent.click(input);
      // navigate to and select first item
      await userEvent.keyboard('{ArrowDown}');
      // should be set to listbox id when menu is open
      expect(listboxItem.classList.contains('v-listbox-item-highlighted')).toBeTruthy();
      expect(input.getAttribute('aria-activedescendant')).toBe(listboxItemId);

      await userEvent.keyboard('{Escape}');
      // should be null when menu is closed, even if item is selected
      expect(input.getAttribute('aria-activedescendant')).toBe(null);
    });

    it('should set input aria-autocomplete attribute correctly', async () => {
      await render(
        `<div v-combobox>
            <input v-input data-testid="input" />
        </div>`,
        {
          imports: [ComboboxDirective, InputDirective],
          providers: [FloatingUIService]
        }
      );
      const input = screen.getByTestId('input');
      expect(input.getAttribute('aria-autocomplete')).toBe('list');
    });
    it('should set aria-haspopup attribute correctly', async () => {
      await render(
        `<div v-combobox>
            <input v-input data-testid="input" />
        </div>`,
        {
          imports: [ComboboxDirective, InputDirective],
          providers: [FloatingUIService]
        }
      );
      const input = screen.getByTestId('input');
      expect(input.getAttribute('aria-haspopup')).toBe('listbox');
    });
    it('should set role attribute correctly', async () => {
      await render(
        `<div v-combobox>
            <input v-input data-testid="input" />
        </div>`,
        {
          imports: [ComboboxDirective, InputDirective],
          providers: [FloatingUIService]
        }
      );
      const input = screen.getByTestId('input');
      expect(input.getAttribute('role')).toBe('combobox');
    });
  });

  describe('ComboboxDirective should correctly determine listbox child attributes', () => {
    it('should set role attribute correctly', async () => {
      await render(
        `<div v-combobox>
              <ul v-listbox data-testid="listbox">
              </ul>
        </div>`,
        {
          imports: [ComboboxDirective, ListboxDirective]
        }
      );
      const listbox = screen.getByTestId('listbox');
      expect(listbox.getAttribute('role')).toBe('group');
    });

    it('should set listbox items as disabled when disabled is passed', async () => {
      await render(
        `
        <div v-combobox disabled>
          <div v-listbox data-testid="listbox">
            <li v-listbox-item value="option-a" id="option-a" data-testid="listbox-item-1">Option A</li>
            <li v-listbox-item value="option-b" id="option-b" data-testid="listbox-item-2">Option B</li>
          </div>
        </div>`,
        {
          imports: [ComboboxDirective, ListboxDirective, ListboxItemComponent]
        }
      );
      const listboxItem1 = screen.getByTestId('listbox-item-1');
      const listboxItem2 = screen.getByTestId('listbox-item-2');
      expect(listboxItem1.getAttribute('aria-disabled')).toBe('true');
      expect(listboxItem2.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set listbox as invalid when invalid is passed', async () => {
      await render(
        `
        <div v-combobox invalid>
          <div v-listbox data-testid="listbox"></div>
        </div>`,
        {
          imports: [ComboboxDirective, ListboxDirective]
        }
      );
      const listbox = screen.getByTestId('listbox');
      expect(listbox.classList.contains('v-listbox-error')).toBeTruthy();
    });
  });

  describe('Combobox value management', () => {
    it('should set a default value correctly', async () => {
      const { fixture } = await render(
        `<div v-combobox [value]="{label: 'Test value', value: 'test-value'}">
            <input v-input data-testid="input" />
            <div v-listbox-container data-testid="listbox-container">
              <ul v-listbox id="listbox">
                <li v-listbox-item value="test-value" id="option-a" data-testid="item-1">Test value</li>
                <li v-listbox-item value="option-b" id="option-b">Option B</li>
                </ul>
                </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            InputDirective
          ]
        }
      );
      const input = screen.getByTestId('input');
      const listboxContainer = screen.getByTestId('listbox-container');
      const listboxItem = screen.getByTestId('item-1');
      await fixture.whenStable();
      expect(input.getAttribute('value')).toBe('Test value');
      expect(listboxItem.getAttribute('aria-selected')).toBe('true');
      expect(listboxContainer.getAttribute('aria-activedescendant')).toBe(listboxItem.getAttribute('id'));
    });

    it('should set input value when an item is selected', async () => {
      await render(
        `<div v-combobox>
            <input v-input data-testid="input" />
              <ul v-listbox id="listbox">
                <li v-listbox-item value="option-a" id="option-a" data-testid="item-1">Option A</li>
                <li v-listbox-item value="option-b" id="option-b">Option B</li>
                </ul>
        </div>`,
        {
          imports: [ComboboxDirective, ListboxDirective, ListboxItemComponent, InputDirective]
        }
      );
      const input = screen.getByTestId('input');
      const listboxItem = screen.getByTestId('item-1');
      await userEvent.click(listboxItem);
      expect(input.getAttribute('value')).toBe('Option A');
    });
    it('should set input value to null when an item is deselected', async () => {
      await render(
        `<div v-combobox>
            <input v-input data-testid="input" />
              <ul v-listbox id="listbox">
                <li v-listbox-item value="option-a" id="option-a" data-testid="item-1">Option A</li>
                <li v-listbox-item value="option-b" id="option-b">Option B</li>
                </ul>
        </div>`,
        {
          imports: [ComboboxDirective, ListboxDirective, ListboxItemComponent, InputDirective]
        }
      );
      const input = screen.getByTestId('input');
      const listboxItem = screen.getByTestId('item-1');
      await userEvent.click(listboxItem);
      expect(input.getAttribute('value')).toBe('Option A');
      await userEvent.keyboard('{Control>}a{/Control}');
      await userEvent.keyboard('{Delete}');
      expect(input.getAttribute('value')).toBe('');
    });

    // I don't think we still allow this..
    it.skip('should allow input value to set combobox value', async () => {
      const { fixture } = await render(
        `<div v-combobox>
            <input v-input data-testid="input" value="Option A" />
            <div v-listbox-container data-testid="listbox-container">
              <ul v-listbox id="listbox">
                <li v-listbox-item value="option-a" id="option-a" data-testid="item-1">Option A</li>
                <li v-listbox-item value="option-b" id="option-b">Option B</li>
                </ul>
            </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            InputDirective
          ]
        }
      );
      const input = screen.getByTestId('input');
      const listboxContainer = screen.getByTestId('listbox-container');
      const listboxItem = screen.getByTestId('item-1');
      await fixture.whenStable();
      expect(input.getAttribute('value')).toBe('Option A');
      expect(listboxItem.getAttribute('aria-selected')).toBe('true');
      expect(listboxContainer.getAttribute('aria-activedescendant')).toBe(listboxItem.getAttribute('id'));
    });
  });

  describe('Combobox keyboard interaction', () => {
    it('should open the listbox on down arrow key press', async () => {
      await render(
        `<div v-combobox v-floating-ui-container>
            <input v-input v-floating-ui-trigger data-testid="input" />
            <div v-listbox-container v-floating-ui-element data-testid="listbox-container">
              <ul v-listbox id="listbox">
                <li v-listbox-item value="option-a" id="option-a" data-testid="item-1">Option A</li>
                </ul>
            </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            InputDirective,
            FloatingUIContainer,
            FloatingUITriggerDirective,
            FloatingUIElementDirective
          ],
          providers: [FloatingUIService]
        }
      );
      const input = screen.getByTestId('input');
      const listboxContainer = screen.getByTestId('listbox-container');
      await userEvent.click(input);
      await userEvent.keyboard('{ArrowDown}');
      expect(listboxContainer.style.display).toBe('flex');
    });

    it('should open the listbox on up arrow key press', async () => {
      await render(
        `<div v-combobox v-floating-ui-container>
            <input v-input v-floating-ui-trigger data-testid="input" />
            <div v-listbox-container v-floating-ui-element data-testid="listbox-container">
              <ul v-listbox id="listbox">
                <li v-listbox-item value="option-a" id="option-a" data-testid="item-1">Option A</li>
                </ul>
            </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            InputDirective,
            FloatingUIContainer,
            FloatingUITriggerDirective,
            FloatingUIElementDirective
          ],
          providers: [FloatingUIService]
        }
      );
      const input = screen.getByTestId('input');
      const listboxContainer = screen.getByTestId('listbox-container');
      await userEvent.click(input);
      await userEvent.keyboard('{ArrowUp}');
      expect(listboxContainer.style.display).toBe('flex');
    });

    it('should follow highlight on arrow key press', async () => {
      await render(
        `<div v-combobox v-floating-ui-container>
            <input v-input v-floating-ui-trigger data-testid="input" />
            <div v-listbox-container v-floating-ui-element data-testid="listbox-container">
              <ul v-listbox id="listbox">
                <li v-listbox-item value="option-a" id="option-a" data-testid="item-1">Option A</li>
                <li v-listbox-item value="option-b" id="option-b" data-testid="item-2">Option B</li>
                <li v-listbox-item value="option-c" id="option-b" data-testid="item-3">Option C</li>
                </ul>
            </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            InputDirective,
            FloatingUIContainer,
            FloatingUITriggerDirective,
            FloatingUIElementDirective
          ],
          providers: [FloatingUIService]
        }
      );
      const input = screen.getByTestId('input');
      const listboxItem1 = screen.getByTestId('item-1');
      const listboxItem2 = screen.getByTestId('item-2');
      const listboxItem3 = screen.getByTestId('item-3');
      await userEvent.click(input);
      await userEvent.keyboard('{ArrowDown}');
      expect(listboxItem1.classList.contains('v-listbox-item-highlighted')).toBeTruthy();
      await userEvent.keyboard('{ArrowDown}');
      expect(listboxItem1.classList.contains('v-listbox-item-highlighted')).toBeFalsy();
      expect(listboxItem2.classList.contains('v-listbox-item-highlighted')).toBeTruthy();
      await userEvent.keyboard('{ArrowDown}');
      expect(listboxItem2.classList.contains('v-listbox-item-highlighted')).toBeFalsy();
      expect(listboxItem3.classList.contains('v-listbox-item-highlighted')).toBeTruthy();
      await userEvent.keyboard('{ArrowUp}');
      expect(listboxItem3.classList.contains('v-listbox-item-highlighted')).toBeFalsy();
      expect(listboxItem2.classList.contains('v-listbox-item-highlighted')).toBeTruthy();
      await userEvent.keyboard('{ArrowUp}');
      expect(listboxItem2.classList.contains('v-listbox-item-highlighted')).toBeFalsy();
      expect(listboxItem1.classList.contains('v-listbox-item-highlighted')).toBeTruthy();
    });

    it('should close the listbox on escape key press', async () => {
      await render(
        `<div v-combobox v-floating-ui-container>
            <input v-input v-floating-ui-trigger data-testid="input" />
            <div v-listbox-container v-floating-ui-element data-testid="listbox-container">
              <ul v-listbox id="listbox">
                <li v-listbox-item value="option-a" id="option-a" data-testid="item-1">Option A</li>
                </ul>
            </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            InputDirective,
            FloatingUIContainer,
            FloatingUITriggerDirective,
            FloatingUIElementDirective
          ],
          providers: [FloatingUIService]
        }
      );
      const input = screen.getByTestId('input');
      const listboxContainer = screen.getByTestId('listbox-container');
      await userEvent.click(input);
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Escape}');
      expect(listboxContainer.style.display).toBe('none');
    });
    it('should close the listbox on tab key press', async () => {
      const { fixture } = await render(
        `<div>
          <div v-combobox v-floating-ui-container>
            <input v-input v-floating-ui-trigger data-testid="input" />
            <div v-listbox-container v-floating-ui-element data-testid="listbox-container">
              <ul v-listbox id="listbox">
                <li v-listbox-item value="option-a" id="option-a" data-testid="item-1">Option A</li>
                </ul>
            </div>
          </div>
          <button data-testid="next-element">Next Element</button>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            InputDirective,
            FloatingUIContainer,
            FloatingUITriggerDirective,
            FloatingUIElementDirective
          ],
          providers: [FloatingUIService]
        }
      );
      const input = screen.getByTestId('input');
      const listboxContainer = screen.getByTestId('listbox-container');
      await userEvent.click(input);
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Tab}');
      await fixture.whenStable();
      fixture.detectChanges();
      expect(listboxContainer.style.display).toBe('none');
    });
  });

  describe('Combobox focus management', () => {
    // not sure why this isn't working, works in examples
    it.skip('should set focus on input when toggle button is pressed', async () => {
      const { fixture } = await render(
        `<div v-combobox v-floating-ui-container>
          <div v-input-container v-floating-ui-trigger>
            <input v-input data-testid="input"/>
            <button v-button-icon data-testid="toggle-button">
              <v-icon-visa-toggle>
              </v-icon-visa-toggle>
            </button>
          </div>
        </div>`,
        {
          imports: [ComboboxDirective, InputContainerComponent, InputDirective, ButtonDirective, IconToggleComponent]
        }
      );
      const input = screen.getByTestId('input');
      const toggleButton = screen.getByTestId('toggle-button');
      expect(input.getAttribute('aria-expanded')).toBe(null);
      await userEvent.click(toggleButton);
      await fixture.whenStable();
      fixture.detectChanges();
      expect(input.getAttribute('aria-expanded')).toBe('true');
      expect(document.activeElement).toBe(input);
    });

    it('should set focus on input when listbox item is selected', async () => {
      await render(
        `<div v-combobox v-floating-ui-container>
          <input v-input data-testid="input" v-floating-ui-trigger/>
          <div v-listbox-container v-floating-ui-element>
            <ul v-listbox id="listbox">
              <li v-listbox-item value="option-a" id="option-a" data-testid="item-1">Option A</li>
            </ul>
          </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            InputDirective,
            FloatingUIContainer,
            FloatingUITriggerDirective,
            FloatingUIElementDirective
          ],
          providers: [FloatingUIService]
        }
      );
      const input = screen.getByTestId('input');
      const listboxItem = screen.getByTestId('item-1');
      await userEvent.click(listboxItem);
      expect(document.activeElement).toBe(input);
    });
  });

  describe('Combobox forms management', () => {
    it('should allow ngModule value', async () => {
      const user = userEvent.setup();
      const model = { testValue: { label: 'Option B', value: 'option-b' } };
      const { fixture } = await render(
        `<div v-combobox [(ngModel)]="model.testValue">
              <input v-input data-testid="input"/>
            <div v-listbox-container data-testid="listbox-container">
              <ul v-listbox>
                <li v-listbox-item value="option-a" data-testid="item-1">Option A</li>
                <li v-listbox-item value="option-b" data-testid="item-2">Option B</li>
              </ul>
            </div>
          </div>
          `,
        {
          imports: [
            ComboboxDirective,
            InputDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            FormsModule
          ],
          componentProperties: {
            model
          }
        }
      );
      const input = screen.getByTestId('input');
      const listboxItem1 = screen.getByTestId('item-1');
      const listboxItem2 = screen.getByTestId('item-2');
      await fixture.whenStable();

      expect(input.getAttribute('value')).toBe('Option B');
      expect(listboxItem2.getAttribute('aria-selected')).toBe('true');
      // aria-activeDescendant only shows when listbox is open and we're not testing floating-ui
      // expect(listboxContainer.getAttribute('aria-activedescendant')).toBe(listboxItem2.getAttribute('id'));

      await user.click(listboxItem1);

      await fixture.whenStable();
      fixture.detectChanges();

      expect(input.getAttribute('value')).toBe('Option A');
      expect(listboxItem1.getAttribute('aria-selected')).toBe('true');

      // aria-activeDescendant only shows when listbox is open and we're not testing floating-ui
      // expect(listboxContainer.getAttribute('aria-activedescendant')).toBe(listboxItem1.getAttribute('id'));
    });

    it('should allow formControl value', async () => {
      const user = userEvent.setup();
      const formControl = new FormControl({
        label: 'Option B',
        value: 'option-b'
      });
      const { fixture } = await render(
        `<div v-combobox [formControl]="formControl">
              <input v-input data-testid="input"/>
            <div v-listbox-container data-testid="listbox-container">
              <ul v-listbox>
                <li v-listbox-item value="option-a" data-testid="item-1">Option A</li>
                <li v-listbox-item value="option-b" data-testid="item-2">Option B</li>
              </ul>
            </div>
          </div>`,
        {
          imports: [
            ComboboxDirective,
            InputDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            ReactiveFormsModule
          ],
          componentProperties: {
            formControl
          }
        }
      );
      const input = screen.getByTestId('input');
      const listboxItem1 = screen.getByTestId('item-1');
      const listboxItem2 = screen.getByTestId('item-2');
      await fixture.whenStable();
      expect(input.getAttribute('value')).toBe('Option B');
      expect(listboxItem2.getAttribute('aria-selected')).toBe('true');
      // aria-activeDescendant only shows when listbox is open and we're not testing floating-ui
      // expect(listboxContainer.getAttribute('aria-activedescendant')).toBe(listboxItem2.getAttribute('id'));

      await user.click(listboxItem1);

      await fixture.whenStable();
      fixture.detectChanges();

      expect(input.getAttribute('value')).toBe('Option A');
      expect(listboxItem1.getAttribute('aria-selected')).toBe('true');
      // aria-activeDescendant only shows when listbox is open and we're not testing floating-ui
      // expect(listboxContainer.getAttribute('aria-activedescendant')).toBe(listboxItem1.getAttribute('id'));
      expect(formControl.value).toEqual({
        label: 'Option A',
        value: 'option-a'
      });
    });

    it('should allow formControl to disable combobox', async () => {
      const formControl = new FormControl(null);
      const { fixture } = await render('<div data-testid="combobox" [formControl]="formControl" v-combobox></div>', {
        imports: [ComboboxDirective, ReactiveFormsModule],
        componentProperties: {
          formControl
        }
      });
      const combobox = screen.getByTestId('combobox');
      expect(combobox.getAttribute('disabled')).toBe(null);

      formControl.disable();

      fixture.detectChanges();

      expect(combobox.getAttribute('disabled')).toBe('disabled');
    });

    it('should allow formControl to enable input', async () => {
      const formControl = new FormControl({ disabled: true, value: '' });
      const { fixture } = await render('<div data-testid="combobox" [formControl]="formControl" v-combobox></div>', {
        imports: [ComboboxDirective, ReactiveFormsModule],
        componentProperties: {
          formControl
        }
      });
      const combobox = screen.getByTestId('combobox');
      expect(combobox.getAttribute('disabled')).toBe('disabled');

      formControl.enable();

      fixture.detectChanges();

      expect(combobox.getAttribute('disabled')).toBe(null);
    });
  });

  describe('Combobox as multiselect', () => {
    it('should convert a single string value to an array when multiselect is enabled', async () => {
      const { fixture, debugElement } = await render(
        `<div v-combobox [value]="{label: 'Option A', value: 'option-a'}">
            <input v-input data-testid="input" />
            <div v-listbox-container data-testid="listbox-container">
              <ul v-listbox multiselect id="listbox">
                <li v-listbox-item value="option-a" id="option-a">Option A</li>
                <li v-listbox-item value="option-b" id="option-b">Option B</li>
              </ul>
            </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            InputDirective
          ]
        }
      );

      await fixture.whenStable();
      fixture.detectChanges();

      const directiveElement = debugElement.query(By.directive(ComboboxDirective));
      const directive = directiveElement?.injector.get(ComboboxDirective);

      expect(Array.isArray(directive.value()?.value)).toBe(true);
    });

    it('should clear input on item selection', async () => {
      const { fixture } = await render(
        `<div v-combobox>
            <input v-input data-testid="input" />
            <div v-listbox-container data-testid="listbox-container">
              <ul v-listbox multiselect id="listbox">
                <li v-listbox-item value="option-a" id="option-a" data-testid="item1">Option A</li>
                <li v-listbox-item value="option-b" id="option-b" data-testid="item2">Option B</li>
              </ul>
            </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            InputDirective
          ]
        }
      );
      const input = screen.getByTestId('input');
      await userEvent.type(input, 'option');

      const item1 = screen.getByTestId('item1');
      await userEvent.click(item1);

      await fixture.whenStable();
      fixture.detectChanges();

      expect(input.getAttribute('value')).toBe('');
    });

    // @TODO: should we test the chips implementation?
  });

  describe('Combobox touched state', () => {
    it('should be marked as touched when input is blurred', async () => {
      const comboboxControl = new FormControl(null);
      const { fixture } = await render(
        `<div v-combobox [formControl]="comboboxControl">
          <input v-input data-testid="input" />
          <div v-listbox-container>
            <ul v-listbox>
              <li v-listbox-item value="option-a">Option A</li>
              <li v-listbox-item value="option-b">Option B</li>
            </ul>
          </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            InputDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            ReactiveFormsModule
          ],
          componentProperties: {
            comboboxControl
          }
        }
      );

      const input = screen.getByTestId<HTMLInputElement>('input');

      // Initially should be untouched
      expect(comboboxControl.touched).toBe(false);
      expect(comboboxControl.untouched).toBe(true);

      // Focus the input
      await userEvent.click(input);
      fixture.detectChanges();

      // Still untouched after focus
      expect(comboboxControl.touched).toBe(false);

      // Blur the input
      await userEvent.tab();
      fixture.detectChanges();
      await fixture.whenStable();

      // Should be touched after blur
      expect(comboboxControl.touched).toBe(true);
      expect(comboboxControl.untouched).toBe(false);
    });

    it('should remain pristine when initialized with a value', async () => {
      const comboboxControl = new FormControl({ label: 'Option A', value: 'option-a' });
      const { fixture } = await render(
        `<div v-combobox [formControl]="comboboxControl">
          <input v-input data-testid="input" />
          <div v-listbox-container>
            <ul v-listbox>
              <li v-listbox-item value="option-a" data-testid="item-a">Option A</li>
              <li v-listbox-item value="option-b" data-testid="item-b">Option B</li>
            </ul>
          </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            InputDirective,
            ListboxContainerDirective,
            ListboxDirective,
            ListboxItemComponent,
            ReactiveFormsModule
          ],
          componentProperties: {
            comboboxControl
          }
        }
      );

      fixture.detectChanges();
      await fixture.whenStable();

      const input = screen.getByTestId<HTMLInputElement>('input');

      // Should have the initial value
      expect(input.value).toBe('Option A');

      // Should remain pristine with initial value
      expect(comboboxControl.pristine).toBe(true);
      expect(comboboxControl.dirty).toBe(false);

      // Should remain untouched until user interacts
      expect(comboboxControl.touched).toBe(false);
      expect(comboboxControl.untouched).toBe(true);

      // After user selects different item, it should become dirty
      const itemB = screen.getByTestId('item-b');
      await userEvent.click(itemB);
      fixture.detectChanges();

      expect(input.value).toBe('Option B');
      expect(comboboxControl.dirty).toBe(true);
      expect(comboboxControl.pristine).toBe(false);
    });
  });
});
