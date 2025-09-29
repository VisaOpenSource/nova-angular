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
import { TabListDirective } from '../tab-list/tab-list.directive';
import { PanelContentDirective } from './panel-content.directive';

describe('PanelContentDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-panel-content></div>', {
      imports: [PanelContentDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-panel-content v-surface');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div v-panel-content class="test-class">Link</div>', {
      imports: [PanelContentDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-panel-content v-surface test-class');
  });

  it('should set tabs.isPanelTabs when tab list is child', async () => {
    const { fixture } = await render('<div v-panel-content><div v-tabs data-testid="tabs">Tab</div></div>', {
      imports: [PanelContentDirective, TabListDirective]
    });
    fixture.detectChanges();
    const tabs = screen.getByTestId('tabs');
    expect(Object.values(tabs.classList).join(' ')).toBe('v-tabs v-panel-tabs v-tabs-horizontal');
  });
});
