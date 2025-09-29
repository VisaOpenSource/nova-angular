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

import { ElevationDirective } from './elevation.directive';

describe('ElevationDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div vElevation>Content</div>', {
      imports: [ElevationDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" vElevation>Content</div>', {
      imports: [ElevationDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
  });

  it('should allow vElevation none', async () => {
    const { container } = await render('<div vElevation="none">Content</div>', {
      imports: [ElevationDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-elevation-none');
  });

  it('should allow vElevation inset', async () => {
    const { container } = await render('<div vElevation="inset">Content</div>', {
      imports: [ElevationDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-elevation-inset');
  });

  it('should allow vElevation xsmall', async () => {
    const { container } = await render('<div vElevation="xs">Content</div>', {
      imports: [ElevationDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-elevation-xsmall');
  });

  it('should allow vElevation small', async () => {
    const { container } = await render('<div vElevation="sm">Content</div>', {
      imports: [ElevationDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-elevation-small');
  });

  it('should allow vElevation medium', async () => {
    const { container } = await render('<div vElevation="md">Content</div>', {
      imports: [ElevationDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-elevation-medium');
  });

  it('should allow vElevation large', async () => {
    const { container } = await render('<div vElevation="lg">Content</div>', {
      imports: [ElevationDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-elevation-large');
  });

  it('should allow vElevation xlarge', async () => {
    const { container } = await render('<div vElevation="xl">Content</div>', {
      imports: [ElevationDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-elevation-xlarge');
  });

  it('should allow vElevation xxlarge', async () => {
    const { container } = await render('<div vElevation="xxl">Content</div>', {
      imports: [ElevationDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-elevation-xxlarge');
  });
});
