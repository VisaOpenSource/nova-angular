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

import { TableDirective } from './table.directive';

describe('TableDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<table v-table>Content</table>', {
      imports: [TableDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-table');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<table class="test-class" v-table>Content</table>', {
      imports: [TableDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-table test-class');
  });

  it('should allow alternate class', async () => {
    const { container } = await render('<table alternate v-table>Content</table>', {
      imports: [TableDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-table v-table-alt');
  });

  it('should allow dividerLines class', async () => {
    const { container } = await render('<table dividerLines v-table>Content</table>', {
      imports: [TableDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-table v-table-border');
  });

  it('should allow horizontalDividerLines class', async () => {
    const { container } = await render('<table horizontalDividerLines v-table>Content</table>', {
      imports: [TableDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-table v-table-border-block');
  });

  it('should allow keyValue class', async () => {
    const { container } = await render('<table keyValue v-table>Content</table>', {
      imports: [TableDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-table v-table-key-value');
  });

  it('should allow subtle class', async () => {
    const { container } = await render('<table subtle v-table>Content</table>', {
      imports: [TableDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-table v-table-subtle');
  });

  it('should allow tableSize compact', async () => {
    const { container } = await render('<table tableSize="compact" v-table>Content</table>', {
      imports: [TableDirective]
    });
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      '--v-table-data-block-default: var(--v-table-data-block-small); --v-table-data-padding-block-default: var(--v-table-data-padding-block-small);'
    );
  });

  it('should allow tableSize large', async () => {
    const { container } = await render('<table tableSize="large" v-table>Content</table>', {
      imports: [TableDirective]
    });
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      '--v-table-data-block-default: var(--v-table-data-block-large); --v-table-data-padding-block-default: var(--v-table-data-padding-block-large);'
    );
  });

  it('should allow tableSize unknown', async () => {
    const { container } = await render('<table tableSize="xsmall" v-table>Content</table>', {
      imports: [TableDirective]
    });
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });
});
