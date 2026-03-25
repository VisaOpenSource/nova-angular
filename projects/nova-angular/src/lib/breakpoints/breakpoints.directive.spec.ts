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

import { BreakpointsDirective } from './breakpoints.directive';

describe('BreakpointsDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div vHide>Menu</div>', {
      imports: [BreakpointsDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-hide');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" vHide>Menu</div>', {
      imports: [BreakpointsDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class v-hide');
  });

  it('should allow vContainerHide class', async () => {
    const { container } = await render('<div vContainerHide="xs">Menu</div>', {
      imports: [BreakpointsDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-xs-container-hide');
  });

  it('should allow vContainerHide arrays', async () => {
    const { container } = await render(`<div [vContainerHide]="['xs', 's']">Menu</div>`, {
      imports: [BreakpointsDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-s-container-hide v-xs-container-hide');
  });

  it('should allow vMediaHide class', async () => {
    const { container } = await render('<div vMediaHide="xs">Menu</div>', {
      imports: [BreakpointsDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-xs-media-hide');
  });

  it('should allow vMediaHide arrays', async () => {
    const { container } = await render(`<div [vMediaHide]="['xs', 's']">Menu</div>`, {
      imports: [BreakpointsDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-s-media-hide v-xs-media-hide');
  });

  it('should allow empty vMediaHide', async () => {
    const { container } = await render(`<div vMediaHide="">Menu</div>`, {
      imports: [BreakpointsDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe(null);
  });
});
