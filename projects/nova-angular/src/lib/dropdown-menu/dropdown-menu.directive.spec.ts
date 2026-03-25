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
import { By } from '@angular/platform-browser';
import { render, screen } from '@testing-library/angular';

import { DropdownMenuDirective } from './dropdown-menu.directive';
import { FloatingUIContainer } from '../floating-ui-container/floating-ui-container.directive';
import { FloatingUIService } from '../floating-ui/floating-ui.service';

describe('DropdownMenuDirective', () => {
  it('should render the defaults correctly', async () => {
    const { container } = await render('<div v-dropdown-menu>Label</div>', {
      imports: [DropdownMenuDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
    expect(container.firstElementChild?.getAttribute('id')).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-dropdown-menu v-surface');
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      'inline-size: 180px; --v-dropdown-menu-surface-margin-block-start: 0; z-index: 200;'
    );
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-dropdown-menu>Label</div>', {
      imports: [DropdownMenuDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-dropdown-menu v-surface test-class');
  });

  it('should allow custom id', async () => {
    const { container } = await render('<div id="test-id" v-dropdown-menu>Label</div>', {
      imports: [DropdownMenuDirective]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should allow custom z-index', async () => {
    const { container } = await render('<div z-index="2" v-dropdown-menu>Label</div>', {
      imports: [DropdownMenuDirective]
    });
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      'inline-size: 180px; --v-dropdown-menu-surface-margin-block-start: 0; z-index: 2;'
    );
  });

  it('should allow no z-index', async () => {
    const { container } = await render('<div [z-index]="null" v-dropdown-menu>Label</div>', {
      imports: [DropdownMenuDirective]
    });
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      'inline-size: 180px; --v-dropdown-menu-surface-margin-block-start: 0;'
    );
  });

  it('should adjust based on isShown true', async () => {
    const { debugElement, fixture } = await render(
      `
      <div v-floating-ui-container>
        <div v-dropdown-menu data-testid="menu">Label</div>
      </div>
    `,
      {
        imports: [DropdownMenuDirective, FloatingUIContainer],
        providers: [FloatingUIService]
      }
    );
    const directive = debugElement.query(By.directive(FloatingUIContainer)).injector.get(FloatingUIContainer);
    directive.floatingUIService?.isShown.set(true);
    const menu = screen.getByTestId('menu');
    fixture.detectChanges();
    expect(menu?.getAttribute('aria-hidden')).toBe('false');
  });
});
