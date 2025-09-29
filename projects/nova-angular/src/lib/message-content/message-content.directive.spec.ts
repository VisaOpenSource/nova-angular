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

import { MessageContentDirective } from './message-content.directive';

describe('MessageContentDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-message-content>Content</div>', {
      imports: [MessageContentDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-message-content');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-message-content>Content</div>', {
      imports: [MessageContentDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-message-content test-class');
  });
});
