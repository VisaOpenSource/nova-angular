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
import { render, screen } from '@testing-library/angular';

import { WizardStepDirective } from './wizard-step.directive';
import { WizardDirective } from '../wizard/wizard.directive';
import { AccordionDirective } from '../accordion/accordion.directive';
import { AccordionDetailsDirective } from '../accordion-item/accordion-item.directive';
import { AccordionHeadingDirective } from '../accordion-heading/accordion-heading.directive';
import userEvent from '@testing-library/user-event';
import { dispatchToggleEvent } from '../accordion/accordion.directive.spec';

describe('WizardStepDirective', () => {
  it('should render the v-flag defaults', async () => {
    const { container } = await render('<div v-wizard-step>Wizard step</div>', {
      imports: [WizardStepDirective]
    });

    expect(container.firstElementChild?.getAttribute('aria-current')).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-wizard-step');
  });

  it('should render custom class', async () => {
    const { container } = await render('<div class="test-class" v-wizard-step>Wizard step</div>', {
      imports: [WizardStepDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-wizard-step test-class');
  });

  it('should allow aria-current', async () => {
    const { container } = await render('<div v-wizard-step aria-current="test">Wizard step</div>', {
      imports: [WizardStepDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-current')).toBe('test');
  });

  it('aria-current should be step when active', async () => {
    const { container } = await render('<div v-wizard-step active>Wizard step</div>', {
      imports: [WizardStepDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-current')).toBe('step');
  });

  describe('accordion-style wizard step', () => {
    it('should react to changes in active state', async () => {
      const { fixture } = await render(
        `<div v-wizard vertical v-accordion>
          <details v-wizard-step v-accordion-item data-testid="step">
            <summary
              v-accordion-heading
              v-wizard-step
              v-button
              data-testid="button"
            >
              <div></div>
            </summary>
          </details>
        </div>
      `,
        {
          imports: [
            WizardDirective,
            WizardStepDirective,
            AccordionDirective,
            AccordionDetailsDirective,
            AccordionHeadingDirective
          ]
        }
      );
      const step = screen.getByTestId('step') as HTMLDetailsElement;

      expect(step.getAttribute('aria-current')).toBeNull();
      // Simulate toggling the first accordion item
      dispatchToggleEvent(step, 'open');
      await fixture.whenStable();
      fixture.detectChanges();
      expect(step.getAttribute('open')).toBeTruthy();
      expect(step.getAttribute('aria-current')).toBe('step');
    });

    it('should prioritize aria-current over active', async () => {
      const { fixture } = await render(
        `<div v-wizard vertical v-accordion>
          <details v-wizard-step aria-current="true" v-accordion-item data-testid="step">
            <summary
              v-accordion-heading
              v-wizard-step
              v-button
              data-testid="button"
            >
              <div></div>
            </summary>
          </details>
        </div>
      `,
        {
          imports: [
            WizardDirective,
            WizardStepDirective,
            AccordionDirective,
            AccordionDetailsDirective,
            AccordionHeadingDirective
          ]
        }
      );
      const step = screen.getByTestId('step') as HTMLDetailsElement;

      expect(step.getAttribute('aria-current')).toBe('true');
      // Simulate toggling the first accordion item
      dispatchToggleEvent(step, 'open');
      await fixture.whenStable();
      fixture.detectChanges();

      // should still use aria-current and not convert to active 'page'
      expect(step.getAttribute('aria-current')).toBe('true');
    });
  });
});
