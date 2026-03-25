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

import { TableWrapperDirective } from './table-wrapper.directive';

describe('TableWrapperDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-table-wrapper>Content</div>', {
      imports: [TableWrapperDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-table-wrapper');
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      '--v-table-wrapper-block-size: unset; --v-table-wrapper-inline-size: unset;'
    );
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-table-wrapper>Content</div>', {
      imports: [TableWrapperDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-table-wrapper test-class');
  });

  it('should allow valid number scrollBlockSize', async () => {
    const { container } = await render('<div v-table-wrapper scrollBlockSize="22">Content</div>', {
      imports: [TableWrapperDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-table-wrapper');
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      '--v-table-wrapper-block-size: 22px; --v-table-wrapper-inline-size: unset;'
    );
  });

  it('should allow valid number scrollInlineSize', async () => {
    const { container } = await render('<div v-table-wrapper scrollInlineSize="22">Content</div>', {
      imports: [TableWrapperDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-table-wrapper');
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      '--v-table-wrapper-block-size: unset; --v-table-wrapper-inline-size: 22px;'
    );
  });

  it('should allow invalid number scrollBlockSize', async () => {
    const { container } = await render('<div v-table-wrapper scrollBlockSize="two">Content</div>', {
      imports: [TableWrapperDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-table-wrapper');
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      '--v-table-wrapper-block-size: unset; --v-table-wrapper-inline-size: unset;'
    );
  });

  it('should allow invalid number scrollInlineSize', async () => {
    const { container } = await render('<div v-table-wrapper scrollInlineSize="two">Content</div>', {
      imports: [TableWrapperDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-table-wrapper');
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      '--v-table-wrapper-block-size: unset; --v-table-wrapper-inline-size: unset;'
    );
  });
});
