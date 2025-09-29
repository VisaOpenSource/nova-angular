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

import { FlagDirective } from './flag.directive';

describe('FlagDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-flag>Flag</div>', {
      imports: [FlagDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flag');
  });

  it('should render custom class', async () => {
    const { container } = await render('<div class="test-class" v-flag>Flag</div>', {
      imports: [FlagDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-flag test-class');
  });
});
