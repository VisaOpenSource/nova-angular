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
import { BadgeDirective } from './badge.directive';

describe('BadgeDirective', () => {
  it('should render the defaults correctly', async () => {
    const { container } = await render('<div v-badge>Badge</div>', {
      imports: [BadgeDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-badge v-badge-default');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-badge>Badge</div>', {
      imports: [BadgeDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-badge test-class v-badge-default');
  });

  it('should render noBackground class', async () => {
    const { container } = await render('<div v-badge noBackground>Badge</div>', {
      imports: [BadgeDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-badge v-badge-clear v-badge-default');
  });

  it('should render critical badgeType', async () => {
    const { container } = await render('<div v-badge badgeType="critical">Badge</div>', {
      imports: [BadgeDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-badge v-badge-critical');
  });

  it('should render active badgeType', async () => {
    const { container } = await render('<div v-badge badgeType="active">Badge</div>', {
      imports: [BadgeDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-badge v-badge-active');
  });

  it('should render icon input', async () => {
    const { container } = await render('<div v-badge icon>Badge</div>', {
      imports: [BadgeDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-badge v-badge-default v-badge-icon');
  });

  it('should render neutral badgeType', async () => {
    const { container } = await render('<div v-badge badgeType="neutral">Badge</div>', {
      imports: [BadgeDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-badge v-badge-neutral');
  });

  it('should render number badgeType', async () => {
    const { container } = await render('<div v-badge badgeType="number">Badge</div>', {
      imports: [BadgeDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-badge v-badge-number');
  });

  it('should render number input', async () => {
    const { container } = await render('<div v-badge number>Badge</div>', {
      imports: [BadgeDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-badge v-badge-default v-badge-number');
  });

  it('should render stable badgeType', async () => {
    const { container } = await render('<div v-badge badgeType="stable">Badge</div>', {
      imports: [BadgeDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-badge v-badge-stable');
  });

  it('should render warning badgeType', async () => {
    const { container } = await render('<div v-badge badgeType="warning">Badge</div>', {
      imports: [BadgeDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-badge v-badge-warning');
  });

  it('should allow custom id', async () => {
    const { container } = await render('<div v-badge id="test-id">Badge</div>', {
      imports: [BadgeDirective]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });
});
