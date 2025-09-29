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
import { TabListDirective } from './tab-list.directive';
import { PanelContentDirective } from '../panel-content/panel-content.directive';
import { Directive } from '@angular/core';
import { NavDirective } from '../nav/nav.directive';

@Directive({
  selector: '[v-panel-body]',
  standalone: true,
  providers: [{ provide: PanelContentDirective, useExisting: MockPanelContentDirective }]
})
export class MockPanelContentDirective {}

@Directive({
  selector: '[v-nav]',
  providers: [{ provide: NavDirective, useExisting: MockNavDirective }]
})
export class MockNavDirective {}

describe('TabListDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-tabs></div>', {
      imports: [TabListDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-tabs v-tabs-horizontal');
    expect(container.firstElementChild?.getAttribute('aria-orientation')).toBe(null);
    expect(container.firstElementChild?.getAttribute('role')).toBe('tablist');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div v-tabs class="test-class">Link</div>', {
      imports: [TabListDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-tabs test-class v-tabs-horizontal');
  });

  it('should allow vertical tabs', async () => {
    const { container } = await render('<div v-tabs vertical>Link</div>', {
      imports: [TabListDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-orientation')).toBe('vertical');
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-tabs v-tabs-vertical');
  });

  it('should allow custom role', async () => {
    const { container } = await render('<div v-tabs role="tablist">Link</div>', {
      imports: [TabListDirective]
    });
    expect(container.firstElementChild?.getAttribute('role')).toBe('tablist');
  });

  it('should add class v-panel-tabs when inside a panel', async () => {
    await render('<div v-panel-body><div v-tabs data-testid="tab-list"></div></div>', {
      imports: [TabListDirective, MockPanelContentDirective]
    });

    const tabList = screen.getByTestId('tab-list');
    expect(tabList.getAttribute('class')).toContain('v-panel-tabs');
  });

  /**
   * Error when uncommented -
   * `Can't construct a query for the property "tabs" of "TabListDirective" since the query selector wasn't defined.`
   */
  // it.skip('should set new active tab when a tab is clicked', async () => {
  //   const user = userEvent.setup();
  //   await render(
  //     `
  //       <div v-tabs>
  //         <div v-tab-item active><button v-button data-testid="button-1">Tab 1</button></div>
  //         <div v-tab-item ><button v-button data-testid="button-2">Tab 2</button></div>
  //         <div v-tab-item ><button v-button data-testid="button-3">Tab 3</button></div>
  //       </div>
  //     `,
  //     {
  //       imports: [TabListDirective, TabItemDirective, ButtonDirective]
  //     }
  //   );

  //   const button1 = screen.getByTestId('button-1');
  //   const button2 = screen.getByTestId('button-2');
  //   const button3 = screen.getByTestId('button-3');

  //   expect(button1.getAttribute('aria-selected')).toBe('true');
  //   expect(button2.getAttribute('aria-selected')).toBe('false');
  //   expect(button3.getAttribute('aria-selected')).toBe('false');

  //   await user.click(button2);

  //   expect(button1.getAttribute('aria-selected')).toBe('false');
  //   expect(button2.getAttribute('aria-selected')).toBe('true');
  //   expect(button3.getAttribute('aria-selected')).toBe('false');
  // });
});
