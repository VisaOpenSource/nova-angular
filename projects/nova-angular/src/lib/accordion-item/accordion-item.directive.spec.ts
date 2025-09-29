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
import { screen } from '@testing-library/dom';

import { AccordionDetailsDirective } from './accordion-item.directive';
import { dispatchToggleEvent } from '../accordion/accordion.directive.spec';

describe('AccordionDetailsDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<details v-accordion-item>details</details>', {
      imports: [AccordionDetailsDirective]
    });

    expect(container.firstElementChild?.getAttribute('class')).toBe('v-accordion');
    expect(container.firstElementChild?.getAttribute('open')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<details class="test-class" v-accordion-item>Menu</details>', {
      imports: [AccordionDetailsDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-accordion test-class');
  });

  it('should allow expanded true', async () => {
    const { container } = await render('<details open v-accordion-item>Menu</details>', {
      imports: [AccordionDetailsDirective]
    });
    expect(container.firstElementChild?.getAttribute('open')).toBe('open');
  });

  it('should allow expanded false', async () => {
    const { container } = await render('<details [open]="false" v-accordion-item>Menu</details>', {
      imports: [AccordionDetailsDirective]
    });
    expect(container.firstElementChild?.getAttribute('open')).toBe(null);
  });

  it('click should trigger toggled output', async () => {
    const toggled = jest.fn();
    const { debugElement, fixture } = await render(
      '<details data-testid="test-id" (toggled)="toggled($event)" id="test-id" v-accordion-item>Menu</details>',
      {
        imports: [AccordionDetailsDirective],
        componentOutputs: {
          toggled
        }
      }
    );

    const details = screen.getByTestId<HTMLDetailsElement>('test-id')!;

    dispatchToggleEvent(details, 'open');
    await fixture.whenStable();
    expect(toggled).toHaveBeenCalledWith(true);
  });
});
