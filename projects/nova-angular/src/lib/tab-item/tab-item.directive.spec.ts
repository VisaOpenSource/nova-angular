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
import userEvent from '@testing-library/user-event';
import { ButtonDirective } from '../button/button.directive';
import { IconToggleDefaultTemplateDirective } from '../icon-toggle-default/icon-toggle-default.directive';
import { IconToggleRotatedTemplateDirective } from '../icon-toggle-rotated/icon-toggle-rotated.directive';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';
import { TabListDirective } from '../tab-list/tab-list.directive';
import { TabItemDirective } from './tab-item.directive';

describe('TabItemDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-tab-item><button v-button></button></div>', {
      imports: [TabItemDirective, ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-tab');
    expect(container.firstElementChild?.getAttribute('role')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div v-tab-item class="test-class"><a v-button>Link</a></div>', {
      imports: [TabItemDirective, ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-tab test-class');
  });

  it('should allow custom role', async () => {
    const { container } = await render('<div v-tab-item role="tab"><a v-button>Link</a></div>', {
      imports: [TabItemDirective, ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('role')).toBe('tab');
  });

  it('should set expected button properties, if none given', async () => {
    const { fixture } = await render('<div v-tab-item><button v-button data-testid="button"></button></div>', {
      imports: [ButtonDirective, TabItemDirective]
    });

    await fixture.whenStable();

    const button = screen.getByTestId('button');
    expect(button.getAttribute('class')).toContain('v-button-tertiary');
    expect(button.getAttribute('class')).toContain('v-button-large');
    expect(button.getAttribute('role')).toBeNull();
  });

  it('should set expected stacked button properties, if none given', async () => {
    const { fixture } = await render('<div v-tab-item><button v-button-stacked data-testid="button"></button></div>', {
      imports: [ButtonDirective, TabItemDirective, ButtonDirective]
    });

    await fixture.whenStable();

    const button = screen.getByTestId('button');
    expect(button.getAttribute('class')).not.toContain('v-button-large');
  });

  it('should set expected button properties on vertical tab, if none given', async () => {
    const { fixture } = await render(
      '<div v-tabs [vertical]="true"><div v-tab-item><button v-button data-testid="button"></button></div></div>',
      {
        imports: [ButtonDirective, TabItemDirective, TabListDirective]
      }
    );

    await fixture.whenStable();

    const button = screen.getByTestId('button');
    expect(button.getAttribute('class')).not.toContain('v-button-large');
  });

  it('should default to user-given button properties', async () => {
    const { fixture } = await render(
      '<div v-tab-item><button v-button buttonColor="secondary" role="button" data-testid="button"></button></div>',
      {
        imports: [ButtonDirective, TabItemDirective, TabListDirective]
      }
    );

    await fixture.whenStable();

    const button = screen.getByTestId('button');
    expect(button.getAttribute('class')).toContain('v-button-secondary');
    expect(button.getAttribute('role')).toBe('button');
  });

  it('should allow active false', async () => {
    const { fixture } = await render('<div v-tab-item><button v-button data-testid="button">Button</button></div>', {
      imports: [ButtonDirective, TabItemDirective]
    });
    fixture.detectChanges();
    const button = screen.getByTestId('button');
    expect(button.getAttribute('aria-current')).toBe(null);
    expect(button.getAttribute('aria-selected')).toBe(null);
  });

  it('should allow active true', async () => {
    const { fixture } = await render(
      '<div active v-tab-item><button v-button data-testid="button">Button</button></div>',
      {
        imports: [ButtonDirective, TabItemDirective]
      }
    );
    fixture.detectChanges();
    const button = screen.getByTestId('button');
    expect(button.getAttribute('aria-current')).toBe(null);
    expect(button.getAttribute('aria-selected')).toBe('true');
  });

  it('should use aria-current when in nested tab list', async () => {
    const { fixture } = await render(
      '<div v-tabs><div v-tabs><div active v-tab-item><button v-button data-testid="button">Button</button></div></div></div>',
      {
        imports: [ButtonDirective, TabItemDirective, TabListDirective]
      }
    );
    fixture.detectChanges();
    const button = screen.getByTestId('button');
    expect(button.getAttribute('aria-current')).toBe('true');
    expect(button.getAttribute('aria-selected')).toBe(null);
  });

  it('should allow active true and disclosureTab true', async () => {
    const { fixture } = await render(
      '<div active v-tab-item disclosureTab><button v-button data-testid="button">Button</button></div>',
      {
        imports: [ButtonDirective, TabItemDirective]
      }
    );
    fixture.detectChanges();
    const button = screen.getByTestId('button');
    expect(button.getAttribute('aria-current')).toBe(null);
    expect(button.getAttribute('aria-selected')).toBe(null);
  });

  it('should allow for sectionTitle', async () => {
    const { container } = await render('<div v-tab-item sectionTitle></div>', {
      imports: [ButtonDirective, TabItemDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-tab v-tab-section-title');
  });

  it('should render defaults correctly', async () => {
    const { container } = await render('<div disclosureTab>Menu</div>', {
      imports: [TabItemDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-tab-item disclosureTab>Menu</div>', {
      imports: [TabItemDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-tab test-class');
  });

  it('should show rotated toggle icon', async () => {
    const { container } = await render(
      `<div v-tab-item disclosureTab expanded>
          <button v-button>
            <v-icon-visa-toggle>
              <svg v-toggle-default-template data-testid="default-icon"></svg>
              <svg v-toggle-rotated-template data-testid="rotated-icon"></svg>
            </v-icon-visa-toggle>
          </button>
      </div>`,
      {
        imports: [
          TabItemDirective,
          TabItemDirective,
          ButtonDirective,
          IconToggleComponent,
          IconToggleDefaultTemplateDirective,
          IconToggleRotatedTemplateDirective
        ]
      }
    );
    const defaultIcon = screen.queryByTestId('default-icon');
    const rotatedIcon = screen.queryByTestId('rotated-icon');
    expect(container).toMatchSnapshot();
    expect(defaultIcon).toBeNull();
    expect(rotatedIcon).not.toBeNull();
  });

  it('should show default toggle icon', async () => {
    const { container } = await render(
      `<div v-tab-item disclosureTab>
          <button v-button>
            <v-icon-visa-toggle>
              <svg v-toggle-default-template data-testid="default-icon"></svg>
              <svg v-toggle-rotated-template data-testid="rotated-icon"></svg>
            </v-icon-visa-toggle>
          </button>
      </div>`,
      {
        imports: [
          TabItemDirective,
          ButtonDirective,
          IconToggleComponent,
          IconToggleDefaultTemplateDirective,
          IconToggleRotatedTemplateDirective
        ]
      }
    );
    const defaultIcon = screen.queryByTestId('default-icon');
    const rotatedIcon = screen.queryByTestId('rotated-icon');
    expect(container).toMatchSnapshot();
    expect(defaultIcon).not.toBeNull();
    expect(rotatedIcon).toBeNull();
  });

  it('should toggle icon', async () => {
    const { fixture } = await render(
      `<div v-tab-item disclosureTab>
          <button v-button>
            Button
            <v-icon-visa-toggle>
              <svg v-toggle-default-template data-testid="default-icon"/>
              <svg v-toggle-rotated-template data-testid="rotated-icon"/>
            </v-icon-visa-toggle>
          </button>
      </div>`,
      {
        imports: [
          TabItemDirective,
          TabItemDirective,
          ButtonDirective,
          IconToggleComponent,
          IconToggleDefaultTemplateDirective,
          IconToggleRotatedTemplateDirective
        ]
      }
    );
    const user = userEvent.setup();
    const button = screen.getByText('Button');
    const defaultIcon = screen.queryByTestId('default-icon');
    const rotatedIcon = screen.queryByTestId('rotated-icon');
    expect(defaultIcon).not.toBeNull();
    expect(rotatedIcon).toBeNull();

    await user.click(button);
    fixture.detectChanges();

    const afterToggleDefaultIcon = screen.queryByTestId('default-icon');
    const afterToggleRotatedIcon = screen.queryByTestId('rotated-icon');
    expect(afterToggleDefaultIcon).toBeNull();
    expect(afterToggleRotatedIcon).not.toBeNull();
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
          TabItemDirective,
          TabItemDirective
        ]
      }
    );
    expect(container).toMatchSnapshot();
    fixture.detectChanges();
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-tiny v-tab v-tab-suffix');
    expect(container.firstElementChild?.firstElementChild?.getAttribute('class')).toBe('v-tab-suffix');
  });
});
