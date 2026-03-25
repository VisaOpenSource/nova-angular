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

import { ListboxContainerDirective } from './listbox-container.directive';
import { ListboxDirective } from '../listbox/listbox.directive';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';

describe('ListboxContainerDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-listbox-container>div</div>', {
      imports: [ListboxContainerDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-listbox-container');
    expect(container.firstElementChild?.getAttribute('aria-activedecendant')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-invalid')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-multiselectable')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-required')).toBe(null);
    expect(container.firstElementChild?.getAttribute('role')).toBe('listbox');
  });

  it('should render custom class', async () => {
    const { container } = await render('<div class="test-class" v-listbox-container>div</div>', {
      imports: [ListboxContainerDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-listbox-container test-class');
  });

  it('should allow custom id', async () => {
    const { container } = await render('<div id="test-id" v-listbox-container>div</div>', {
      imports: [ListboxContainerDirective]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should allow custom role', async () => {
    const { container } = await render('<div role="test-role" v-listbox-container>div</div>', {
      imports: [ListboxContainerDirective]
    });
    expect(container.firstElementChild?.getAttribute('role')).toBe('test-role');
  });

  it('should allow custom aria-activedescendant', async () => {
    const { container } = await render('<div aria-activedescendant="test-id" v-listbox-container>div</div>', {
      imports: [ListboxContainerDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-activedescendant')).toBe('test-id');
  });

  it('should compute correct aria-activedescendant if no custom value given', async () => {
    const { container, fixture } = await render(
      `<div v-listbox-container>
          <div v-listbox>
            <div v-listbox-item value="item2" id="listbox-id">Item 1</div>
            <div v-listbox-item value="item1" active id="listbox-id-2">Item 2</div>
          </div>
        </div>`,
      {
        imports: [ListboxContainerDirective, ListboxDirective, ListboxItemComponent]
      }
    );
    await fixture.whenStable();
    fixture.detectChanges();
    const activeItem = container.querySelector('.v-listbox-item[active]');
    const activeItemID = activeItem?.getAttribute('id');
    expect(container.firstElementChild?.getAttribute('aria-activedescendant')).toBe(activeItemID);
  });
});
