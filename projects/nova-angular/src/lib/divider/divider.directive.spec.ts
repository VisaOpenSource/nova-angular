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
import { DividerDirective } from './divider.directive';

describe('DividerDirective', () => {
  it('should render the v-divider defaults', async () => {
    const { container } = await render('<hr v-divider class="test-class" />', {
      imports: [DividerDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-divider test-class');
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe(null);
  });

  it('should render the correct decorative dividerType attributes', async () => {
    const { container } = await render('<hr v-divider dividerType="decorative" class="test-class" />', {
      imports: [DividerDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-divider test-class v-divider-decorative');
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render the correct section dividerType attributes', async () => {
    const { container } = await render('<hr v-divider dividerType="section" class="test-class" />', {
      imports: [DividerDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-divider test-class v-divider-section');
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe(null);
  });

  it('should allow for custom aria-hidden attribute', async () => {
    const { container } = await render(
      '<hr v-divider dividerType="section" aria-hidden="false" class="test-class" />',
      {
        imports: [DividerDirective]
      }
    );
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-divider test-class v-divider-section');
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('false');
  });
});
