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

import { TableDirective } from '../table/table.directive';
import { ThDirective } from './th.directive';

describe('ThDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<th v-th>Content</th>', {
      imports: [ThDirective, TableDirective],
      providers: [TableDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-th');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<th class="test-class" v-th>Content</th>', {
      imports: [ThDirective, TableDirective],
      providers: [TableDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class v-th');
  });

  it('should allow groupHeader class', async () => {
    const { container } = await render('<th groupHeader v-th>Content</th>', {
      imports: [ThDirective, TableDirective],
      providers: [TableDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-th v-th-alt v-typography-overline');
  });
});
