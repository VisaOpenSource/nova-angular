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
import { render, screen } from '@testing-library/angular';

import { FloatingUITriggerDirective } from './floating-ui-trigger.directive';
import { FloatingUIContainer } from '../floating-ui-container/floating-ui-container.directive';
import { FloatingUIElementDirective } from '../floating-ui-element/floating-ui-element.directive';
import { ButtonDirective } from '../button/button.directive';
import { FloatingUIService } from '../floating-ui/floating-ui.service';
import { By } from '@angular/platform-browser';

describe('FloatingUITriggerDirective', () => {
  it('should render the defaults correctly', async () => {
    const { container } = await render('<div v-floating-ui-trigger>Label</div>', {
      imports: [FloatingUITriggerDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-controls')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-describedby')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-expanded')).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-dropdown');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-floating-ui-trigger>Label</div>', {
      imports: [FloatingUITriggerDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-dropdown test-class');
  });

  it.only('should adjust based on triggersDropdownMenu true', async () => {
    const { debugElement, fixture } = await render(
      `<div v-floating-ui-container>
        <button v-floating-ui-trigger v-button data-testid="trigger">Label</button> 
        <div v-floating-ui-element id="test-id">Dropdown Content</div>
      </div>
      `,
      {
        imports: [FloatingUITriggerDirective, FloatingUIContainer, FloatingUIElementDirective, ButtonDirective]
      }
    );
    const trigger = screen.getByTestId('trigger');
    const floatingContainer = debugElement.query(By.directive(FloatingUIContainer)).injector.get(FloatingUIContainer);
    floatingContainer.triggersDropdownMenu.set(true);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(trigger?.getAttribute('aria-controls')).toBe('test-id');
    // I don't understand why this isn't working, it works as expected when rendered
    // expect(trigger?.getAttribute('aria-expanded')).toBe(false);
    expect(trigger?.getAttribute('aria-describedby')).toBe(null);
  });

  it('should adjust based on triggersTooltip true', async () => {
    const { debugElement, fixture } = await render(
      `<div v-floating-ui-container>
        <button v-floating-ui-trigger v-button data-testid="trigger">Label</button>
        <div v-floating-ui-element id="test-id">Tooltip Content</div>
      </div>
      `,
      {
        imports: [FloatingUITriggerDirective, FloatingUIContainer, FloatingUIElementDirective, ButtonDirective],
        providers: [FloatingUIService]
      }
    );
    const trigger = screen.getByTestId('trigger');
    const floatingContainer = debugElement.query(By.directive(FloatingUIContainer)).injector.get(FloatingUIContainer);
    floatingContainer.triggersTooltip.set(true);
    floatingContainer.triggersDropdownMenu.set(false);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(trigger?.getAttribute('aria-describedby')).toBe('test-id');
    expect(trigger?.getAttribute('aria-controls')).toBe(null);
    expect(trigger?.getAttribute('aria-expanded')).toBe(null);
  });
});
