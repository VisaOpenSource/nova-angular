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
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FloatingUIContainer } from '../floating-ui-container/floating-ui-container.directive';
import { FloatingUIElementDirective } from '../floating-ui-element/floating-ui-element.directive';
import { FloatingUITriggerDirective } from '../floating-ui-trigger/floating-ui-trigger.directive';
import { FloatingUIService } from '../floating-ui/floating-ui.service';
import { InputDirective } from '../input/input.directive';
import { ListboxContainerDirective } from '../listbox-container/listbox-container.directive';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { ListboxDirective } from '../listbox/listbox.directive';
import { ComboboxDirective } from './combobox.directive';
import { ComboboxService } from './combobox.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ComboboxDirective,
    ListboxDirective,
    ListboxItemComponent,
    InputDirective,
    FloatingUIContainer,
    FloatingUITriggerDirective,
    FloatingUIElementDirective
  ],
  providers: [ComboboxService, FloatingUIService],
  standalone: true,
  template: `
    <div v-combobox v-floating-ui-container>
      <input v-input v-floating-ui-trigger data-testid="input" />
      <div v-listbox-container v-floating-ui-element data-testid="listbox-container">
        <ul v-listbox id="listbox">
          <li v-listbox-item value="option-a" id="option-a" data-testid="item-1">Option A</li>
          <li v-listbox-item value="option-b" id="option-b" data-testid="item-2">Option B</li>
          <li v-listbox-item value="option-c" id="option-c" data-testid="item-3">Option C</li>
        </ul>
      </div>
    </div>
  `
})
class TestComponent {
  public readonly combobox = viewChild.required(ComboboxDirective);
}

describe('ComboboxService', () => {
  const setup = async () => {
    const { fixture } = await render(TestComponent);

    await fixture.whenStable();
    const comboboxService = fixture.debugElement.injector.get(ComboboxService);
    const component = fixture.componentInstance;
    return { fixture, comboboxService, component };
  };

  const waitForChanges = async (fixture: any) => {
    await fixture.whenStable();
    fixture.detectChanges();
  };

  it('should be created', async () => {
    const { comboboxService } = await setup();
    expect(comboboxService).toBeTruthy();
  });

  describe('closeMenuOnItemClick', () => {
    it('should close the menu when an item is clicked', async () => {
      const { fixture, comboboxService, component } = await setup();
      const input = screen.getByTestId('input');
      const item1 = screen.getByTestId('item-1');

      await userEvent.click(input);
      comboboxService.closeMenuOnItemClick(component.combobox() as ComboboxDirective);
      await userEvent.click(item1);
      await waitForChanges(fixture);

      const listboxContainer = screen.getByTestId('listbox-container');
      expect(listboxContainer).not.toBeVisible();
    });
  });

  describe('autoFilterBasedOnList', () => {
    it('should filter items based on input', async () => {
      const { fixture, comboboxService, component } = await setup();
      const input = screen.getByTestId('input');
      const fullList = [
        { label: 'Option A', value: 'option-a' },
        { label: 'Option B', value: 'option-b' },
        { label: 'Option C', value: 'option-c' }
      ];

      let filteredItems: any[] = [];
      component.combobox().filteredListEmitter.subscribe((items: any[]) => {
        filteredItems = items;
      });

      comboboxService.autoFilterBasedOnList(component.combobox() as ComboboxDirective, fullList);
      await userEvent.type(input, 'B');
      await waitForChanges(fixture);

      expect(filteredItems).toHaveLength(1);
      expect(filteredItems[0].label).toBe('Option B');
    });

    it('should reset filter when input is cleared', async () => {
      const { fixture, comboboxService, component } = await setup();
      const input = screen.getByTestId('input');
      const fullList = [
        { label: 'Option A', value: 'option-a' },
        { label: 'Option B', value: 'option-b' },
        { label: 'Option C', value: 'option-c' }
      ];

      comboboxService.autoFilterBasedOnList(component.combobox() as ComboboxDirective, fullList);
      await userEvent.type(input, 'B');
      await userEvent.clear(input);
      await waitForChanges(fixture);

      const visibleItems = screen.getAllByRole('option', { hidden: false });
      expect(visibleItems).toHaveLength(3);
    });
  });

  describe('autoFilter', () => {
    it('should filter items based on input', async () => {
      const { fixture, comboboxService, component } = await setup();
      const input = screen.getByTestId('input');
      const fullList = [
        { label: 'Option A', value: 'option-a' },
        { label: 'Option B', value: 'option-b' },
        { label: 'Option C', value: 'option-c' }
      ];

      let filteredItems: any[] = [];
      component.combobox().filteredListEmitter.subscribe((items: any[]) => {
        filteredItems = items;
      });

      comboboxService.autoFilter(component.combobox() as ComboboxDirective, fullList, 'label');
      await userEvent.type(input, 'B');
      await waitForChanges(fixture);

      expect(filteredItems).toHaveLength(1);
      expect(filteredItems[0].label).toBe('Option B');

      const visibleItems = screen.getAllByRole('option', { hidden: false });
    });

    it('should use default condition "label" if not provided', async () => {
      const { fixture, comboboxService, component } = await setup();
      const input = screen.getByTestId('input');
      const fullList = [
        { label: 'Option A', value: 'option-a' },
        { label: 'Option B', value: 'option-b' },
        { label: 'Option C', value: 'option-c' }
      ];

      let filteredItems: any[] = [];
      component.combobox().filteredListEmitter.subscribe((items: any[]) => {
        filteredItems = items;
      });

      comboboxService.autoFilter(component.combobox() as ComboboxDirective, fullList);
      await userEvent.type(input, 'B');
      await waitForChanges(fixture);

      expect(filteredItems).toHaveLength(1);
      expect(filteredItems[0].label).toBe('Option B');
    });

    it('should auto-filter if a default value is present', async () => {
      const { fixture, debugElement } = await render(
        `<div v-combobox v-floating-ui-container [value]="{ label: 'Option A', value: 'option-a' }">
          <input v-input v-floating-ui-trigger data-testid="input" />
          <div v-listbox-container v-floating-ui-element data-testid="listbox-container">
            <ul v-listbox id="listbox">
              <li v-listbox-item value="option-a" id="option-a" data-testid="item-1">Option A</li>
              <li v-listbox-item value="option-b" id="option-b" data-testid="item-2">Option B</li>
              <li v-listbox-item value="option-c" id="option-c" data-testid="item-3">Option C</li>
            </ul>
          </div>
        </div>`,
        {
          imports: [
            ComboboxDirective,
            ListboxDirective,
            ListboxItemComponent,
            InputDirective,
            FloatingUIContainer,
            FloatingUITriggerDirective,
            FloatingUIElementDirective
          ],
          providers: [ComboboxService, FloatingUIService]
        }
      );
      const input = screen.getByTestId('input');
      const item1 = screen.getByTestId('item-1');
      const item2 = screen.getByTestId('item-2');
      const item3 = screen.getByTestId('item-3');
      const fullList = [
        { label: 'Option A', value: 'option-a' },
        { label: 'Option B', value: 'option-b' },
        { label: 'Option C', value: 'option-c' }
      ];
      const comboboxService = fixture.debugElement.injector.get(ComboboxService);
      const directive = debugElement.query(By.directive(ComboboxDirective)).injector.get(ComboboxDirective);
      comboboxService.autoFilter(directive, fullList, 'label');
      await fixture.whenStable();

      expect(input.getAttribute('value')).toBe('Option A');
      expect(item1.getAttribute('aria-selected')).toBe('true');
      expect(item2.getAttribute('aria-selected')).toBe('false');
      expect(item3.getAttribute('aria-selected')).toBe('false');
    });

    it('should filter items based on a custom condition', async () => {
      const { fixture, comboboxService, component } = await setup();
      const input = screen.getByTestId('input');
      const fullList = [
        { id: 'option-a', label: 'Option A' },
        { id: 'option-b', label: 'Option B' },
        { id: 'option-c', label: 'Option C' }
      ];

      let filteredItems: any[] = [];
      component.combobox().filteredListEmitter.subscribe((items: any[]) => {
        filteredItems = items;
      });

      comboboxService.autoFilter(component.combobox() as ComboboxDirective, fullList, 'id');
      await userEvent.type(input, 'option-b');
      await waitForChanges(fixture);

      expect(filteredItems).toHaveLength(1);
      expect(filteredItems[0].id).toBe('option-b');
    });

    it('should filter based on item selection', async () => {
      const { fixture, comboboxService, component } = await setup();
      const input = screen.getByTestId('input');
      const fullList = [
        { label: 'Option A', value: 'option-a' },
        { label: 'Option B', value: 'option-b' },
        { label: 'Option C', value: 'option-c' }
      ];

      let filteredItems: any[] = [];
      component.combobox().filteredListEmitter.subscribe((items: any[]) => {
        filteredItems = items;
      });

      comboboxService.autoFilter(component.combobox() as ComboboxDirective, fullList);
      await userEvent.click(input);
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Enter}');
      await waitForChanges(fixture);

      expect(filteredItems).toHaveLength(1);
      expect(filteredItems[0].label).toBe('Option A');
    });

    it('should reset filter when input is cleared', async () => {
      const { fixture, comboboxService, component } = await setup();
      const input = screen.getByTestId('input');
      const fullList = [
        { label: 'Option A', value: 'option-a' },
        { label: 'Option B', value: 'option-b' },
        { label: 'Option C', value: 'option-c' }
      ];

      comboboxService.autoFilter(component.combobox() as ComboboxDirective, fullList);
      await userEvent.type(input, 'B');
      await userEvent.clear(input);
      await waitForChanges(fixture);

      const visibleItems = screen.getAllByRole('option', { hidden: false });
      expect(visibleItems).toHaveLength(3);
    });
  });

  describe('autoSelectItem', () => {
    it('should highlight the first item when input changes', async () => {
      const { fixture, comboboxService, component } = await setup();
      const input = screen.getByTestId('input');

      comboboxService.autoSelectItem(component.combobox() as ComboboxDirective);
      await userEvent.type(input, 'A');
      await waitForChanges(fixture);

      const item1 = screen.getByTestId('item-1');
      expect(item1).toHaveClass('v-listbox-item-highlighted');
    });

    it('should highlight the first item in new list when filtered list changes', async () => {
      @Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
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
        providers: [ComboboxService, FloatingUIService],
        standalone: true,
        template: `
          <div v-combobox v-floating-ui-container>
            <input v-input v-floating-ui-trigger data-testid="input" />
            <div v-listbox-container v-floating-ui-element data-testid="listbox-container">
              <ul v-listbox id="listbox">
                @for (item of filteredItems(); track item.value) {
                  <li v-listbox-item [value]="item.value" [attr.data-testid]="'item-' + item.value">
                    {{ item.label }}
                  </li>
                }
              </ul>
            </div>
          </div>
        `
      })
      class TestFilterComponent {
        public readonly combobox = viewChild.required(ComboboxDirective);
        public readonly filteredItems = signal<any[]>([
          { label: 'Option A', value: 'option-a' },
          { label: 'Option B', value: 'option-b' },
          { label: 'Option C', value: 'option-c' }
        ]);
      }

      const { fixture } = await render(TestFilterComponent);
      const component = fixture.componentInstance;
      const comboboxService = fixture.debugElement.injector.get(ComboboxService);
      const input = screen.getByTestId('input');

      await fixture.whenStable();
      fixture.detectChanges();

      const fullList = [
        { label: 'Option A', value: 'option-a' },
        { label: 'Option B', value: 'option-b' },
        { label: 'Option C', value: 'option-c' }
      ];

      // Subscribe to filter changes and update the signal
      component.combobox().filteredListEmitter.subscribe((items: any[]) => {
        component.filteredItems.set(items);
        fixture.detectChanges();
      });

      comboboxService.autoFilterBasedOnList(component.combobox() as ComboboxDirective, fullList);
      comboboxService.autoSelectItem(component.combobox() as ComboboxDirective);

      // Type 'B' to filter - this will also open the menu
      await userEvent.type(input, 'B');
      await waitForChanges(fixture);

      const itemB = screen.getByTestId('item-option-b');
      expect(itemB).toHaveClass('v-listbox-item-highlighted');
      expect(itemB).toHaveTextContent('Option B');
    });

    it('should select the highlighted item when the menu is closed', async () => {
      const { fixture, comboboxService, component } = await setup();
      const input = screen.getByTestId('input');

      comboboxService.autoSelectItem(component.combobox() as ComboboxDirective);
      await userEvent.click(input);
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Escape}');
      await waitForChanges(fixture);

      expect(input).toHaveValue('Option B');
    });
  });
});
