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

import { ListboxDirective } from './listbox.directive';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { By } from '@angular/platform-browser';
import userEvent from '@testing-library/user-event';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ListboxDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-listbox>div</div>', {
      imports: [ListboxDirective],
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-listbox',
    );
    expect(container.firstElementChild?.getAttribute('id')).not.toBe(null);
    expect(container.firstElementChild?.getAttribute('role')).toBe('group');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render custom class', async () => {
    const { container } = await render(
      '<div class="test-class" v-listbox>div</div>',
      {
        imports: [ListboxDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-listbox test-class',
    );
  });

  it('should allow custom id', async () => {
    const { container } = await render(
      '<div id="test-id" v-listbox>div</div>',
      {
        imports: [ListboxDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should allow custom role', async () => {
    const { container } = await render(
      '<div role="test-role" v-listbox>div</div>',
      {
        imports: [ListboxDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('role')).toBe('test-role');
  });

  it('should allow false containHeight', async () => {
    const { container } = await render(
      '<div containHeight="false" v-listbox>div</div>',
      {
        imports: [ListboxDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-listbox',
    );
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should allow true containHeight', async () => {
    const { container } = await render(
      '<div containHeight v-listbox>div</div>',
      {
        imports: [ListboxDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-listbox v-listbox-scroll',
    );
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should allow number containHeight', async () => {
    const { container } = await render(
      '<div containHeight="1" v-listbox>div</div>',
      {
        imports: [ListboxDirective],
      },
    );
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-listbox v-listbox-scroll',
    );
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      '--v-listbox-block-size-scroll: 1px;',
    );
  });

  describe('state management', () => {
    it('should disable children when disabled is true', async () => {
      const { fixture } = await render(
        `<div v-listbox disabled>
          <div v-listbox-item data-testid="item1" value="test1">Item 1</div>
          <div v-listbox-item data-testid="item2" value="test2">Item 2</div>
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent],
        },
      );
      const item1 = screen.getByTestId('item1');
      const item2 = screen.getByTestId('item2');

      fixture.detectChanges();

      expect(item1?.getAttribute('aria-disabled')).toBe('true');
      expect(item2?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should be disabled if all items are disabled', async () => {
      const { fixture, debugElement } = await render(
        `<div v-listbox>
          <div v-listbox-item disabled value="test1">Item 1</div>
          <div v-listbox-item disabled value="test2">Item 2</div>
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent],
        },
      );

      const directiveElement = debugElement.query(
        By.directive(ListboxDirective),
      );
      const directive = directiveElement?.injector.get(ListboxDirective);

      fixture.detectChanges();
      await fixture.whenStable();
      expect(directive.disabled()).toBe(true);
    });
    it('should not be disabled if at least one item is enabled', async () => {
      const { container } = await render(
        `<div v-listbox>
          <div v-listbox-item disabled value="test1">Item 1</div>
          <div v-listbox-item value="test2">Item 2</div>
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent],
        },
      );
      expect(container.firstElementChild?.getAttribute('aria-disabled')).toBe(
        null,
      );
    });
  });

  describe('value management', () => {
    it('should set correct item active when given value', async () => {
      const { fixture } = await render(
        `<div v-listbox value="item2">
          <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
          <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent],
        },
      );
      const item1 = screen.getByTestId('item1');
      const item2 = screen.getByTestId('item2');

      fixture.detectChanges();
      await fixture.whenStable();

      expect(item1?.getAttribute('aria-selected')).not.toBe('true');
      expect(item2?.getAttribute('aria-selected')).toBe('true');
    });

    // @TODO: listbox isn't working with just 'active' flag
    it('should set the correct value when an item is active by default', async () => {
      const { fixture, debugElement } = await render(
        `<div v-listbox>
          <div v-listbox-item value="item1" data-testid="item1" [active]="true">Item 1</div>
          <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent],
        },
      );

      const directiveElement = debugElement.query(
        By.directive(ListboxDirective),
      );
      const directive = directiveElement?.injector.get(ListboxDirective);
      const item1 = screen.getByTestId('item1');

      fixture.detectChanges();
      await fixture.whenStable();
      expect(item1?.getAttribute('aria-selected')).toBe('true');
      expect(directive?.value()).toBe('item1');
    });

    it('should set correct items active when given value in multiselect mode', async () => {
      const { fixture, debugElement } = await render(
        `<div v-listbox multiselect [value]="['item1','item2']">
          <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
          <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
          <div v-listbox-item value="item3" data-testid="item3">Item 3</div>
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent],
        },
      );

      fixture.detectChanges();
      await fixture.whenStable();

      const item1 = screen.getByTestId('item1');
      const item2 = screen.getByTestId('item2');
      const item3 = screen.getByTestId('item3');
      expect(item1?.getAttribute('aria-selected')).toBe('true');
      expect(item2?.getAttribute('aria-selected')).toBe('true');
      expect(item3?.getAttribute('aria-selected')).not.toBe('true');
    });

    it('should update value when an item is selected', async () => {
      const { fixture, debugElement } = await render(
        `<div v-listbox>
          <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
          <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent],
        },
      );
      const directiveElement = debugElement.query(
        By.directive(ListboxDirective),
      );
      const directive = directiveElement?.injector.get(ListboxDirective);

      const item1 = screen.getByTestId('item1');
      await userEvent.click(item1);
      await fixture.whenStable();

      expect(item1?.getAttribute('aria-selected')).toBe('true');
      expect(directive?.value()).toBe('item1');

      const item2 = screen.getByTestId('item2');
      await userEvent.click(item2);
      await fixture.whenStable();
      expect(item2?.getAttribute('aria-selected')).toBe('true');
      expect(item1?.getAttribute('aria-selected')).not.toBe('true');
    });

    it('should update value - and maintain selection order!! - in multiselect mode when an item is selected', async () => {
      const { fixture, debugElement } = await render(
        `<div v-listbox multiselect>
          <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
          <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
          <div v-listbox-item value="item3" data-testid="item3">Item 3</div>
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent],
        },
      );
      const directiveElement = debugElement.query(
        By.directive(ListboxDirective),
      );
      const directive = directiveElement?.injector.get(ListboxDirective);

      const item1 = screen.getByTestId('item1');
      const item2 = screen.getByTestId('item2');
      const item3 = screen.getByTestId('item3');
      await userEvent.click(item3);
      await userEvent.click(item1);
      await userEvent.click(item2);
      // order is 3-1-2
      // maintaining order is important, especially for multiselect
      await fixture.whenStable();

      expect(directive?.value()).toEqual(['item3', 'item1', 'item2']);
    });
  });

  describe('focus and keyboard interaction', () => {
    it('should focus the first item on arrow down key press', async () => {
      const { fixture } = await render(
        `<div v-listbox>
          <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
          <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent],
        },
      );
      const item1 = screen.getByTestId('item1');
      const item2 = screen.getByTestId('item2');
      item1.focus();
      const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      item1.dispatchEvent(arrowDownEvent);
      await fixture.whenStable();

      expect(item2.getAttribute('tabindex')).toBe('0');
    });

    it.skip('should focus the last item on arrow up key press', async () => {
      const { fixture } = await render(
        `<button data-testid="button">dummy button</button>
        <div v-listbox data-testid="listbox">
          <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
          <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
        </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent],
        },
      );
      const item1 = screen.getByTestId('item1');
      const button = screen.getByTestId('button');
      await userEvent.click(button);
      await userEvent.tab();
      await userEvent.keyboard('{ArrowUp}');
      await fixture.whenStable();

      expect(item1.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('Form integration', () => {
    it('should allow ngModule value', async () => {
      const user = userEvent.setup();
      const model = { testValue: 'option-1' };
      const { fixture } = await render(
        `<div data-testid="listbox" [(ngModel)]="model.testValue" v-listbox>
            <div v-listbox-item value="option-1" data-testid="item1">Option 1</div>
            <div v-listbox-item value="option-2" data-testid="item2">Option 2</div>
          </div>`,
        {
          imports: [ListboxDirective, ListboxItemComponent, FormsModule],
          componentProperties: {
            model,
          },
        },
      );
      fixture.detectChanges();
      await fixture.whenStable();

      const item1 = screen.getByTestId<HTMLDivElement>('item1');
      expect(item1.getAttribute('aria-selected')).toBe('true');

      const item2 = screen.getByTestId<HTMLDivElement>('item2');
      await user.click(item2);

      fixture.detectChanges();

      expect(item1.getAttribute('aria-selected')).not.toBe('true');
      expect(item2.getAttribute('aria-selected')).toBe('true');
    });

    it('should allow formControl value', async () => {
      const user = userEvent.setup();
      const formControl = new FormControl('option-1');
      const { fixture } = await render(
        `<div v-listbox data-testid="listbox" [formControl]="formControl">
            <div v-listbox-item value="option-1" data-testid="item1">Option 1</div>
            <div v-listbox-item value="option-2" data-testid="item2">Option 2</div>
          </div>`,
        {
          imports: [
            ListboxDirective,
            ListboxItemComponent,
            ReactiveFormsModule,
          ],
          componentProperties: {
            formControl,
          },
        },
      );
      fixture.detectChanges();
      await fixture.whenStable();

      const item1 = screen.getByTestId<HTMLDivElement>('item1');
      expect(item1.getAttribute('aria-selected')).toBe('true');

      const item2 = screen.getByTestId<HTMLDivElement>('item2');
      await user.click(item2);

      fixture.detectChanges();

      expect(item1.getAttribute('aria-selected')).not.toBe('true');
      expect(item2.getAttribute('aria-selected')).toBe('true');

      expect(formControl.value).toBe('option-2');
    });

    it('should allow formControl to disable input', async () => {
      const formControl = new FormControl('');
      const { fixture } = await render(
        `<div v-listbox data-testid="listbox" [formControl]="formControl">
            <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
            <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
          </div>`,
        {
          imports: [
            ListboxDirective,
            ListboxItemComponent,
            ReactiveFormsModule,
          ],
          componentProperties: {
            formControl,
          },
        },
      );
      const item1 = screen.getByTestId<HTMLDivElement>('item1');
      const item2 = screen.getByTestId<HTMLDivElement>('item2');
      expect(item1.getAttribute('aria-disabled')).not.toBe('true');
      expect(item2.getAttribute('aria-disabled')).not.toBe('true');

      formControl.disable();

      fixture.detectChanges();

      expect(item1.getAttribute('aria-disabled')).toBe('true');
      expect(item2.getAttribute('aria-disabled')).toBe('true');
    });

    it('should allow formControl to enable input', async () => {
      const formControl = new FormControl({ disabled: true, value: '' });
      const { fixture } = await render(
        `<div v-listbox data-testid="listbox" [formControl]="formControl">
            <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
            <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
          </div>`,
        {
          imports: [
            ListboxDirective,
            ListboxItemComponent,
            ReactiveFormsModule,
          ],
          componentProperties: {
            formControl,
          },
        },
      );

      fixture.detectChanges();
      await fixture.whenStable();

      const item1 = screen.getByTestId<HTMLDivElement>('item1');
      const item2 = screen.getByTestId<HTMLDivElement>('item2');
      expect(item1.getAttribute('aria-disabled')).toBe('true');
      expect(item2.getAttribute('aria-disabled')).toBe('true');

      formControl.enable();

      fixture.detectChanges();

      expect(item1.getAttribute('aria-disabled')).not.toBe('true');
      expect(item2.getAttribute('aria-disabled')).not.toBe('true');
    });

    it('should allow formControl to be touched', async () => {
      const formControl = new FormControl('');
      const { fixture } = await render(
        `<div v-listbox data-testid="listbox" [formControl]="formControl">
            <div v-listbox-item value="item1" data-testid="item1">Item 1</div>
            <div v-listbox-item value="item2" data-testid="item2">Item 2</div>
          </div>`,
        {
          imports: [
            ListboxDirective,
            ListboxItemComponent,
            ReactiveFormsModule,
          ],
          componentProperties: {
            formControl,
          },
        },
      );

      const item1 = screen.getByTestId<HTMLDivElement>('item1');

      expect(formControl.touched).toBe(false);
      await userEvent.click(item1);
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.tab();
      fixture.detectChanges();
      expect(formControl.touched).toBe(true);
    });
  });
});
