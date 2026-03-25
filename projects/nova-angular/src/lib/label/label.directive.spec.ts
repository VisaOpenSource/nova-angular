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

import { LabelDirective } from './label.directive';
import { axe } from 'jest-axe';

describe('LabelDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<label v-label>Content</label>', {
      imports: [LabelDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-label');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<label class="test-class" v-label>Content</label>', {
      imports: [LabelDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class v-label');
  });

  it('should allow custom id', async () => {
    const { container } = await render('<label id="test-id" v-label>Content</label>', {
      imports: [LabelDirective]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should allow custom progressLabel', async () => {
    const { container } = await render('<label progressLabel v-label>Content</label>', {
      imports: [LabelDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-progress-label');
  });

  it('should allow custom for', async () => {
    const { container } = await render('<label for="test-id" v-label>Content</label>', {
      imports: [LabelDirective]
    });
    expect(container.firstElementChild?.getAttribute('for')).toBe('test-id');
  });

  it('should stop event propagation on click', async () => {
    const { container } = await render('<label v-label>Content</label>', {
      imports: [LabelDirective]
    });

    const label = container.firstElementChild;
    const clickEvent = new Event('click', { bubbles: true, cancelable: true });
    let propagationStopped = false;

    label?.addEventListener('click', (event) => {
      propagationStopped = event.cancelBubble;
    });

    label?.dispatchEvent(clickEvent);

    expect(propagationStopped).toBe(true);
  });

  it('should render correctly', async () => {
    const { container } = await render('<span v-switch-label></span>', {
      imports: [LabelDirective]
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should allow custom classes', async () => {
    const { container } = await render('<span v-switch-label class="test-class"></span>', {
      imports: [LabelDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class v-label v-switch-label');
  });
});
