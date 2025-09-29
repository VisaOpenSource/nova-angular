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
import { AccordionDetailsDirective } from '../accordion-item/accordion-item.directive';
import { IconToggleDefaultTemplateDirective } from '../icon-toggle-default/icon-toggle-default.directive';
import { IconToggleRotatedTemplateDirective } from '../icon-toggle-rotated/icon-toggle-rotated.directive';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { IconToggleComponent } from './icon-toggle.component';

describe('IconToggleComponent', () => {
  it('should render defaults', async () => {
    const { container } = await render('<v-icon-visa-toggle>Content</v-icon-visa-toggle>', {
      imports: [IconToggleComponent]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-tiny');
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      'align-items: center; justify-content: center; pointer-events: none; --v-icon-primary: inherit; --v-icon-secondary: inherit;'
    );
  });

  it('should allow custom class', async () => {
    const { container } = await render('<v-icon-visa-toggle class="test-class">Content</v-icon-visa-toggle>', {
      imports: [IconToggleComponent]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-tiny test-class');
  });

  it('should allow rotated input', async () => {
    const { container } = await render(
      `<v-icon-visa-toggle rotated> 
			    <div v-toggle-rotated-template>Rotated</div> 
			    <div v-toggle-default-template>Default</div> 
		    </v-icon-visa-toggle>`,
      {
        imports: [IconToggleComponent, IconToggleDefaultTemplateDirective, IconToggleRotatedTemplateDirective]
      }
    );
    expect(container).toMatchSnapshot();
  });

  it('should allow red color', async () => {
    const { container } = await render('<v-icon-visa-toggle color="red">Content</v-icon-visa-toggle>', {
      imports: [IconToggleComponent]
    });
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      'align-items: center; justify-content: center; pointer-events: none; --v-icon-primary: red; --v-icon-secondary: red;'
    );
  });

  it('should allow start alignment', async () => {
    const { container } = await render('<v-icon-visa-toggle alignment="start">Content</v-icon-visa-toggle>', {
      imports: [IconToggleComponent]
    });
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      'align-items: start; justify-content: start; pointer-events: none; --v-icon-primary: inherit; --v-icon-secondary: inherit;'
    );
  });

  it('should allow inherit pointer events', async () => {
    const { container } = await render('<v-icon-visa-toggle pointerEvents="inherit">Content</v-icon-visa-toggle>', {
      imports: [IconToggleComponent]
    });
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      'align-items: center; justify-content: center; pointer-events: inherit; --v-icon-primary: inherit; --v-icon-secondary: inherit;'
    );
  });

  it('should allow tagSuffix', async () => {
    const { container, fixture } = await render(
      `<v-icon-visa-toggle v-tab-item disclosureTab> 
			<div v-toggle-rotated-template>Rotated</div> 
			<div v-toggle-default-template>Default</div> 
		</v-icon-visa-toggle>`,
      {
        imports: [
          IconToggleComponent,
          IconToggleDefaultTemplateDirective,
          IconToggleRotatedTemplateDirective,
          TabItemDirective
        ]
      }
    );
    expect(container).toMatchSnapshot();
    fixture.detectChanges();
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-tiny v-tab v-tab-suffix');
    expect(container.firstElementChild?.firstElementChild?.getAttribute('class')).toBe('v-tab-suffix');
  });

  it('should allow accordionToggle', async () => {
    const { fixture } = await render(
      `<div v-accordion-item><v-icon-visa-toggle  data-testid="toggleIcon">
        <div v-toggle-rotated-template>Rotated</div>
        <div v-toggle-default-template>Default</div>
      </v-icon-visa-toggle></div>`,
      {
        imports: [
          IconToggleComponent,
          IconToggleDefaultTemplateDirective,
          IconToggleRotatedTemplateDirective,
          AccordionDetailsDirective
        ]
      }
    );
    fixture.detectChanges();
    const toggleIcon = screen.getByTestId('toggleIcon');
    expect(toggleIcon?.getAttribute('class')).toBe('v-icon v-icon-tiny v-accordion-toggle-icon');
  });
});
