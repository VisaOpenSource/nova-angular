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
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/angular';
import { AccordionPanelDirective } from './accordion-panel.directive';
import { AccordionDetailsDirective } from '../accordion-item/accordion-item.directive';
import { AccordionDirective } from '../accordion/accordion.directive';

describe('AccordionPanelDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-accordion-panel>Menu</div>', {
      imports: [AccordionPanelDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-accordion-panel');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-accordion-panel>Menu</div>', {
      imports: [AccordionPanelDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-accordion-panel test-class');
  });

  it('should allow subtle true', async () => {
    await render(
      `<div v-accordion subtle>
          <div v-accordion-item>
            <span v-accordion-panel data-testid="panel">Menu</span>
          </div>
        </div>`,
      {
        imports: [AccordionPanelDirective, AccordionDetailsDirective, AccordionDirective]
      }
    );
    const heading = screen.getByTestId('panel');
    expect(heading.getAttribute('style')).toContain('--v-accordion-panel-background-color: transparent');
    expect(heading.getAttribute('style')).toContain('--v-accordion-panel-border-size: 0px');
    expect(heading.getAttribute('style')).toContain('--v-accordion-panel-padding-inline: 32px');
  });
});
