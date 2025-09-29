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

import { TypographyDirective } from './typography.directive';

describe('TypographyDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<span vTypography>Content</span>', {
      imports: [TypographyDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<span class="test-class" vTypography>Content</span>', {
      imports: [TypographyDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
  });

  it('should allow display-1 typography with custom class', async () => {
    const { container } = await render('<span class="test-class" vTypography="display-1">Content</span>', {
      imports: [TypographyDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class v-typography-display-1');
  });

  it('should allow display-1 typography', async () => {
    const { container } = await render('<span vTypography="display-1">Content</span>', {
      imports: [TypographyDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-typography-display-1');
  });

  it('should allow display-1 font', async () => {
    const { container } = await render('<span vFont="display-1">Content</span>', {
      imports: [TypographyDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-typography-display-1');
  });

  it('should render defaults correctly', async () => {
    const { container } = await render('<span vTypographyColor>Content</span>', {
      imports: [TypographyDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<span class="test-class" vTypographyColor>Content</span>', {
      imports: [TypographyDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
  });

  it('should allow active typography with custom class', async () => {
    const { container } = await render('<span class="test-class" vTypographyColor="active">Content</span>', {
      imports: [TypographyDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class v-typography-color-active');
  });

  it('should allow active typography', async () => {
    const { container } = await render('<span vTypographyColor="active">Content</span>', {
      imports: [TypographyDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-typography-color-active');
  });

  it('should allow active font', async () => {
    const { container } = await render('<span vFontColor="active">Content</span>', {
      imports: [TypographyDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-typography-color-active');
  });
});
