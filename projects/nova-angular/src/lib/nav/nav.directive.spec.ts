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
import { ButtonDirective } from '../button/button.directive';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { TabListDirective } from '../tab-list/tab-list.directive';
import { NavDirective } from './nav.directive';

describe('NavDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-nav></div>', {
      imports: [NavDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-nav v-nav-horizontal');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div v-nav class="test-class"></div>', {
      imports: [NavDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-nav test-class v-nav-horizontal');
  });

  it('should allow vertical nav', async () => {
    const { container } = await render('<div v-nav vertical></div>', {
      imports: [NavDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-nav v-nav-vertical');
  });

  it('should allow drawer', async () => {
    const { container } = await render('<div v-nav drawer></div>', {
      imports: [NavDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-nav v-nav-drawer v-nav-horizontal');
  });

  it('should set up tab lists', async () => {
    const { fixture } = await render(
      `<div v-nav data-testid="nav"> <div v-tabs data-testid="tabs"> <div v-tab-item><button v-button data-testid="button">Tab 1</button></div> </div> </div>`,
      {
        imports: [NavDirective, TabItemDirective, TabListDirective, ButtonDirective]
      }
    );
    await fixture.whenStable();
    const nav = screen.getByTestId('nav');
    const tabs = screen.getByTestId('tabs');
    const button = screen.getByTestId('button');
    expect(Object.values(nav.classList).join(' ')).toBe('v-nav v-nav-horizontal');
    expect(Object.values(tabs.classList).join(' ')).toBe('v-tabs v-tabs-horizontal');
    expect(Object.values(button.classList).join(' ')).toBe('v-button v-button-large v-button-tertiary');
  });
});
