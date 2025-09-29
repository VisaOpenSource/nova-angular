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

import { TooltipDirective } from './tooltip.directive';

describe('TooltipDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-tooltip>Tooltip</div>', {
      imports: [TooltipDirective]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-surface v-tooltip');
    expect(container.firstElementChild?.getAttribute('role')).toBe('tooltip');
    expect(container.firstElementChild?.getAttribute('style')).toBe('display: none; z-index: 700;');
  });

  it('should render custom class', async () => {
    const { container } = await render('<div class="test-class" v-tooltip>Tooltip</div>', {
      imports: [TooltipDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-surface v-tooltip test-class');
  });

  it('should render custom display', async () => {
    const { container } = await render('<div display="flex" v-tooltip>Tooltip</div>', {
      imports: [TooltipDirective]
    });
    expect(container.firstElementChild?.getAttribute('style')).toBe('display: flex; z-index: 700;');
  });

  it('should render custom z-index', async () => {
    const { container } = await render('<div v-tooltip z-index="20">Tooltip</div>', {
      imports: [TooltipDirective]
    });
    expect(container.firstElementChild?.getAttribute('style')).toBe('display: none; z-index: 20;');
  });

  it('should render custom id', async () => {
    const { container } = await render('<div v-tooltip id="test-id">Tooltip</div>', {
      imports: [TooltipDirective]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should render custom role', async () => {
    const { container } = await render('<div v-tooltip role="test-role">Tooltip</div>', {
      imports: [TooltipDirective]
    });
    expect(container.firstElementChild?.getAttribute('role')).toBe('test-role');
  });
});
