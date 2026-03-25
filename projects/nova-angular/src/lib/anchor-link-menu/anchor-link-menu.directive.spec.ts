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

import { AnchorLinkMenuDirective } from './anchor-link-menu.directive';

describe('AnchorLinkMenuDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-anchor-link-menu>Menu</div>', {
      imports: [AnchorLinkMenuDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-anchor-link-menu');
  });

  it('should render custom class', async () => {
    const { container } = await render('<div class="test-class" v-anchor-link-menu>Menu</div>', {
      imports: [AnchorLinkMenuDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-anchor-link-menu test-class');
  });

  it('should render ariaLabel class', async () => {
    const { container } = await render('<div aria-label="test-label" v-anchor-link-menu>Menu</div>', {
      imports: [AnchorLinkMenuDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-label');
  });
});
