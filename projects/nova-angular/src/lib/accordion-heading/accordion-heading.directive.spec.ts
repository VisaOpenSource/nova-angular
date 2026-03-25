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
import { By } from '@angular/platform-browser';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';

import { AccordionHeadingDirective } from './accordion-heading.directive';
import { AccordionDirective } from '../accordion/accordion.directive';
import { ButtonDirective } from '../button/button.directive';
import { AccordionDetailsDirective } from '../accordion-item/accordion-item.directive';

describe('AccordionHeadingDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<span v-accordion-heading>span</span>', {
      imports: [AccordionHeadingDirective]
    });

    expect(container.firstElementChild?.getAttribute('class')).toBe('v-accordion-heading');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<span class="test-class" v-accordion-heading>Menu</span>', {
      imports: [AccordionHeadingDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-accordion-heading test-class');
  });

  it('should allow subtle true', async () => {
    await render(
      `<div v-accordion subtle>
        <div v-accordion-item>
          <span v-accordion-heading v-button data-testid="heading">Menu</span>
        </div>
      </div>`,
      {
        imports: [AccordionHeadingDirective, AccordionDetailsDirective, AccordionDirective, ButtonDirective]
      }
    );
    const heading = screen.getByTestId('heading');
    expect(heading.getAttribute('style')).toContain('--v-button-default-background: transparent');
    expect(heading.getAttribute('style')).toContain('--v-accordion-background: transparent');
    expect(heading.getAttribute('style')).toContain('--v-button-default-gap: 2px');
    expect(heading.getAttribute('style')).toContain('--v-accordion-items-gap: 2px');
    expect(heading.getAttribute('style')).toContain('--v-accordion-foreground-initial: var(--palette-default-active)');
    expect(heading.getAttribute('class')).toContain('v-button-tertiary');
  });

  it('should prioritize disabled coloring even when subtle is true', async () => {
    await render(
      '<div v-accordion subtle><span v-accordion-heading v-button disabled data-testid="heading">Menu</span></div>',
      {
        imports: [AccordionHeadingDirective, AccordionDirective, ButtonDirective]
      }
    );
    const heading = screen.getByTestId('heading');
    expect(heading.getAttribute('style')).not.toContain(
      '--v-accordion-foreground-initial: var(--palette-default-active)'
    );
  });

  it('should set button styling', async () => {
    await render('<span v-accordion-heading v-button data-testid="heading">Menu</span>', {
      imports: [AccordionHeadingDirective, ButtonDirective]
    });
    const heading = screen.getByTestId('heading');

    expect(heading?.getAttribute('class')).toContain('v-button-large');
    expect(heading?.getAttribute('class')).toContain('v-button-secondary');
  });
});
