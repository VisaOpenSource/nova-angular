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
import { screen } from '@testing-library/dom';

import { AccordionDirective } from './accordion.directive';
import { FlexDirective } from '../flex/flex.directive';
import { AccordionDetailsDirective } from '../accordion-item/accordion-item.directive';
import { By } from '@angular/platform-browser';
import { AccordionHeadingDirective } from '../accordion-heading/accordion-heading.directive';

export const dispatchToggleEvent = (target: HTMLElement, newState: 'open' | 'close' = 'open') => {
  const event = new Event('toggle', {
    bubbles: true,
    cancelable: false
  }) as Event & { newState: 'open' | 'close' };
  event.newState = newState;

  target.dispatchEvent(event);
};

describe('AccordionDirective', () => {
  it('should render the defaults correctly', async () => {
    const { container } = await render('<div v-accordion>Accordion</div>', {
      imports: [AccordionDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')?.includes('v-flex')).toBeTruthy();
    expect(container.firstElementChild?.getAttribute('class')?.includes('v-flex-col')).toBeTruthy();
    expect(container.firstElementChild?.getAttribute('class')?.includes('v-gap-6')).toBeTruthy();
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-accordion>Accordion</div>', {
      imports: [AccordionDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')?.includes('test-class')).toBeTruthy();
  });

  it('should proiritize user-given flex', async () => {
    const { container } = await render('<div v-accordion vFlex vFlexRow vGap="16">Accordion</div>', {
      imports: [AccordionDirective, FlexDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')?.includes('v-flex-row')).toBeTruthy();
    expect(container.firstElementChild?.getAttribute('class')?.includes('v-gap-16')).toBeTruthy();
  });

  it('should add a name to child accordion items if single select', async () => {
    await render(
      `
        <div v-accordion>
          <details v-accordion-item data-testid="accordion-item-1">
              Accordion title 1
          </details>
          <details v-accordion-item data-testid="accordion-item-2">
              Accordion title 2
          </details>
        </div>
      `,
      {
        imports: [AccordionDirective, AccordionDetailsDirective]
      }
    );
    const item1 = screen.getByTestId('accordion-item-1');
    const item2 = screen.getByTestId('accordion-item-2');
    expect(item1.getAttribute('name')).toEqual(item2.getAttribute('name'));
  });

  it('should recognize subtle as flag', async () => {
    const { container } = await render(
      `
      <div subtle v-accordion>
        <div v-accordion-heading data-testid="accordion-heading">Accordion</div>
      </div>`,
      {
        imports: [AccordionDirective, AccordionHeadingDirective]
      }
    );
    // further testing in accordion-heading.directive.spec.ts
    expect(screen.getByTestId('accordion-heading').style.getPropertyValue('--v-accordion-background')).toBe(
      'transparent'
    );
  });

  it('should not add a name to child accordion items if multi select', async () => {
    await render(
      `
        <div v-accordion multiselect>
          <details v-accordion-item data-testid="accordion-item-1" multiple>
              Accordion title 1
          </details>
          <details v-accordion-item data-testid="accordion-item-2" multiple>
              Accordion title 2
          </details>
        </div>
      `,
      {
        imports: [AccordionDirective, AccordionDetailsDirective]
      }
    );
    const item1 = screen.getByTestId('accordion-item-1');
    const item2 = screen.getByTestId('accordion-item-2');
    expect(item1.getAttribute('name')).toBeNull();
    expect(item2.getAttribute('name')).toBeNull();
  });
});
