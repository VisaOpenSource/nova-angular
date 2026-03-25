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

import { OpensInNewTabDirective } from './opens-in-new-tab.directive';

describe('OpensInNewTabDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<a vOpensInNewTab></a>', {
      imports: [OpensInNewTabDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe(null);
    expect(container.firstElementChild?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(container.firstElementChild?.getAttribute('target')).toBe('blank');
  });

  it('should render defaults with text content correctly', async () => {
    const { container } = await render('<a vOpensInNewTab>Link</a>', {
      imports: [OpensInNewTabDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('Link (opens in new tab)');
  });

  it('should render defaults with nested text content correctly', async () => {
    const { container } = await render('<a vOpensInNewTab>Link <span>content</span></a>', {
      imports: [OpensInNewTabDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('Link content (opens in new tab)');
  });

  it('should allow custom aria-label', async () => {
    const { container } = await render('<a vOpensInNewTab aria-label="test label">Link</a>', {
      imports: [OpensInNewTabDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test label');
  });

  it('should allow custom rel', async () => {
    const { container } = await render('<a vOpensInNewTab rel="test-rel">Link</a>', {
      imports: [OpensInNewTabDirective]
    });
    expect(container.firstElementChild?.getAttribute('rel')).toBe('test-rel');
  });

  it('should allow custom target', async () => {
    const { container } = await render('<a vOpensInNewTab [attr.target]="null">Link</a>', {
      imports: [OpensInNewTabDirective]
    });
    expect(container.firstElementChild?.getAttribute('target')).toBe(null);
  });
});
