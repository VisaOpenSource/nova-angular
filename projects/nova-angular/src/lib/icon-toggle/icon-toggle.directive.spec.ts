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
import { By } from '@angular/platform-browser';
import { render } from '@testing-library/angular';

import { IconComponent } from '../icon/icon.component';
import { IconToggleDirective } from './icon-toggle.directive';
import { AccordionHeadingDirective } from '../accordion-heading/accordion-heading.directive';
import { screen } from '@testing-library/dom';
import { AccordionDetailsDirective } from '../accordion-item/accordion-item.directive';

describe('IconToggleDirective', () => {
  it('should render defaults', async () => {
    const { container, debugElement } = await render('<div v-icon-toggle v-icon>Content</div>', {
      imports: [IconToggleDirective, IconComponent]
    });
    const directive = debugElement.query(By.directive(IconToggleDirective)).injector.get(IconToggleDirective);

    expect(directive?.['collapsedIcon']()).toBe('chevron-down');
    expect(directive?.['expandedIcon']()).toBe('chevron-up');
    expect(directive.expanded()).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-tiny v-icon-visa');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-icon-toggle v-icon>Content</div>', {
      imports: [IconToggleDirective, IconComponent]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon test-class v-icon-tiny v-icon-visa');
  });

  it('should allow tagSuffix', async () => {
    const { debugElement } = await render('<div collapsedIcon="chevron-up" v-icon-toggle v-icon>Content</div>', {
      imports: [IconToggleDirective, IconComponent]
    });
    const directive = debugElement.query(By.directive(IconToggleDirective)).injector.get(IconToggleDirective);
    expect(directive?.['collapsedIcon']()).toBe('chevron-up');
  });

  it('should allow accordionToggle', async () => {
    const { debugElement, fixture } = await render(
      '<div v-accordion-item><div v-icon-toggle v-icon data-testid="toggleIcon">Content</div></div>',
      {
        imports: [IconToggleDirective, IconComponent, AccordionDetailsDirective]
      }
    );
    const directive = debugElement.query(By.directive(IconToggleDirective)).injector.get(IconToggleDirective);
    fixture.detectChanges();
    const toggleIcon = screen.getByTestId('toggleIcon');
    expect(toggleIcon?.getAttribute('class')).toBe('v-icon v-icon-tiny v-icon-visa v-accordion-toggle-icon');
    expect(directive?.['expandedIcon']()).toBe('chevron-down');
    expect(directive?.['collapsedIcon']()).toBe('chevron-right');
  });

  // @TODO: fix in floating-ui work
  it.skip('should adjust expanded icon', async () => {
    const { debugElement, fixture } = await render('<div v-icon-toggle v-icon>Content</div>', {
      imports: [IconToggleDirective, IconComponent]
    });
    const icon = debugElement.query(By.directive(IconComponent)).injector.get(IconComponent);
    const toggleIcon = debugElement.query(By.directive(IconToggleDirective)).injector.get(IconToggleDirective);
    // toggleIcon.expanded.set(true);
    fixture.detectChanges();
    expect(icon?.['icon']()).toBe('chevron-up');
  });
});
