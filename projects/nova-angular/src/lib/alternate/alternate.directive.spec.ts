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

import { AlternateDirective } from './alternate.directive';

describe('AlternateDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div vAlternate>Content</div>', {
      imports: [AlternateDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-alternate');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" vAlternate>Content</div>', {
      imports: [AlternateDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-alternate test-class');
  });
});
