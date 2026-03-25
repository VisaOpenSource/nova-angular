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
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ListboxDirective } from './listbox.directive';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { ListboxService } from './listbox.service';

describe('ListboxService', () => {
  it('should handle arrow down key', async () => {
    await render(
      `
      <div v-listbox>
        <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
        <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        <div v-listbox-item value="item3" data-testid="item3">Item 3</div>
      </div>
      `,
      {
        imports: [ListboxDirective, ListboxItemComponent],
        providers: [ListboxService]
      }
    );
    await userEvent.tab();
    const firstItem = screen.getByTestId('item1');
    expect(firstItem).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    const secondItem = screen.getByTestId('item2');
    expect(secondItem).toHaveFocus();
  });

  it('should handle arrow up key', async () => {
    await render(
      `
      <div v-listbox>
        <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
        <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        <div v-listbox-item value="item3" data-testid="item3">Item 3</div>
      </div>
      `,
      {
        imports: [ListboxDirective, ListboxItemComponent],
        providers: [ListboxService]
      }
    );
    await userEvent.tab();
    await userEvent.keyboard('{ArrowUp}');
    const lastItem = screen.getByTestId('item3');
    expect(lastItem).toHaveFocus();
  });

  it('should handle home key', async () => {
    await render(
      `
      <div v-listbox>
        <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
        <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        <div v-listbox-item value="item3" data-testid="item3">Item 3</div>
      </div>
      `,
      {
        imports: [ListboxDirective, ListboxItemComponent],
        providers: [ListboxService]
      }
    );
    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}'); // Move to second item
    await userEvent.keyboard('{ArrowDown}'); // Move to third item
    await userEvent.keyboard('{Home}');
    const firstItem = screen.getByTestId('item1');
    expect(firstItem).toHaveFocus();
  });

  it('should handle end key', async () => {
    await render(
      `
      <div v-listbox>
        <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
        <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        <div v-listbox-item value="item3" data-testid="item3">Item 3</div>
      </div>
      `,
      {
        imports: [ListboxDirective, ListboxItemComponent],
        providers: [ListboxService]
      }
    );
    await userEvent.tab();
    await userEvent.keyboard('{End}');
    const lastItem = screen.getByTestId('item3');
    expect(lastItem).toHaveFocus();
  });

  it('should handle character search', async () => {
    const { fixture } = await render(
      `
      <div v-listbox>
        <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
        <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        <div v-listbox-item value="item3" data-testid="item3">Item 3</div>
      </div>
      `,
      {
        imports: [ListboxDirective, ListboxItemComponent],
        providers: [ListboxService]
      }
    );
    await userEvent.tab();
    await userEvent.keyboard('2');

    await new Promise((resolve) => setTimeout(resolve, 1100)); // Adjust for the setTimeout delay in listbox service
    fixture.detectChanges();

    const item2 = screen.getByTestId('item2');
    expect(item2).toHaveFocus();
  });

  it('should scroll active item into view', async () => {
    const { fixture } = await render(
      `
      <div v-listbox containHeight="100px">
        <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
        <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        <div v-listbox-item value="item3" data-testid="item3">Item 3</div>
      </div>
      `,
      {
        imports: [ListboxDirective, ListboxItemComponent],
        providers: [ListboxService]
      }
    );
    const listboxService = fixture.debugElement.injector.get(ListboxService);
    const scrollSpy = jest.spyOn(listboxService, 'scrollItemIntoView');

    await userEvent.tab();
    await userEvent.keyboard('{End}');

    await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust for the setTimeout delay in listbox directive
    fixture.detectChanges();

    expect(scrollSpy).toHaveBeenCalled();
  });

  it('should handle rapid character search', async () => {
    const { fixture } = await render(
      `
      <div v-listbox>
        <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
        <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        <div v-listbox-item value="item3" data-testid="item3">Item 3</div>
      </div>
      `,
      {
        imports: [ListboxDirective, ListboxItemComponent],
        providers: [ListboxService]
      }
    );
    await userEvent.tab();
    await userEvent.keyboard('it');

    await new Promise((resolve) => setTimeout(resolve, 1100)); // Adjust for the setTimeout delay in listbox service
    fixture.detectChanges();

    const firstItem = screen.getByTestId('item1');
    expect(firstItem).toHaveFocus();
  });

  it.skip('should select all with Meta + A in multiselect mode', async () => {
    const { fixture } = await render(
      `
      <div v-listbox multiselect>
        <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
        <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        <div v-listbox-item value="item3" data-testid="item3">Item 3</div>
      </div>
      `,
      {
        imports: [ListboxDirective, ListboxItemComponent],
        providers: [ListboxService]
      }
    );
    await userEvent.tab();
    await userEvent.keyboard('{Meta>}a{/Meta}');

    fixture.detectChanges();

    const item1 = screen.getByTestId('item1');
    const item2 = screen.getByTestId('item2');
    const item3 = screen.getByTestId('item3');
    expect(item1.getAttribute('aria-selected')).toBe('true');
    expect(item2.getAttribute('aria-selected')).toBe('true');
    expect(item3.getAttribute('aria-selected')).toBe('true');
  });

  it.skip('should handle Shift + Space for contiguous selection', async () => {
    const { fixture } = await render(
      `
      <div v-listbox multiselect>
        <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
        <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        <div v-listbox-item value="item3" data-testid="item3">Item 3</div>
      </div>
      `,
      {
        imports: [ListboxDirective, ListboxItemComponent],
        providers: [ListboxService]
      }
    );
    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Shift>}{Space}{/Shift}');

    fixture.detectChanges();

    const items = screen.getAllByRole('option');
    expect(items[0].getAttribute('aria-selected')).toBe('true');
    expect(items[1].getAttribute('aria-selected')).toBe('true');
  });

  it.skip('should handle Shift + Arrow for toggling selection', async () => {
    const { fixture } = await render(
      `
      <div v-listbox multiselect>
        <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
        <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        <div v-listbox-item value="item3" data-testid="item3">Item 3</div>
      </div>
      `,
      {
        imports: [ListboxDirective, ListboxItemComponent],
        providers: [ListboxService]
      }
    );
    await userEvent.tab();
    await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');

    fixture.detectChanges();

    const item1 = screen.getByTestId('item1');
    expect(item1.getAttribute('aria-selected')).toBe('true');
  });

  it.skip('should handle Meta + Shift + Home/End for selecting range', async () => {
    const { fixture } = await render(
      `
      <div v-listbox multiselect>
        <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
        <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        <div v-listbox-item value="item3" data-testid="item3">Item 3</div>
      </div>
      `,
      {
        imports: [ListboxDirective, ListboxItemComponent],
        providers: [ListboxService]
      }
    );
    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Meta>}{Shift>}{End}{/Shift}{/Meta}');

    fixture.detectChanges();

    const item1 = screen.getByTestId('item1');
    const item2 = screen.getByTestId('item2');
    expect(item1.getAttribute('aria-selected')).toBe('true');
    expect(item2.getAttribute('aria-selected')).toBe('true');
  });
});
