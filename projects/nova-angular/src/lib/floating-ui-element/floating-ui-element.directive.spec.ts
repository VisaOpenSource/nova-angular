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

import { FloatingUIElementDirective } from './floating-ui-element.directive';

describe('FloatingUIElementDirective', () => {
  it('should render the defaults correctly', async () => {
    const { container } = await render('<div v-floating-ui-element>Label</div>', {
      imports: [FloatingUIElementDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    expect(container.firstElementChild?.getAttribute('id')).toBe(null);
    expect(container.firstElementChild?.getAttribute('style.inline-size')).toBe(null);
    expect(container.firstElementChild?.getAttribute('style.z-index')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-floating-ui-element>Label</div>', {
      imports: [FloatingUIElementDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
  });

  it('should allow custom id', async () => {
    const { container } = await render('<div id="test-id" v-floating-ui-element>Label</div>', {
      imports: [FloatingUIElementDirective]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should allow custom inlineSize', async () => {
    const { container } = await render('<div inlineSize="90%" v-floating-ui-element>Label</div>', {
      imports: [FloatingUIElementDirective]
    });
    expect(container.firstElementChild?.getAttribute('style')).toBe('inline-size: 90%; z-index: 200;');
  });

  it('should allow custom z-index', async () => {
    const { container } = await render('<div v-floating-ui-element z-index="2">Label</div>', {
      imports: [FloatingUIElementDirective]
    });
    expect(container.firstElementChild?.getAttribute('style')).toBe('inline-size: 100%; z-index: 2;');
  });
});
