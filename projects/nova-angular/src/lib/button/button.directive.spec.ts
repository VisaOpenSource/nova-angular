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

import { ButtonDirective } from './button.directive';
import { ComboboxDirective } from '../combobox/combobox.directive';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';

describe('ButtonDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<button v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.getAttribute('aria-current')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-describedby')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-expanded')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-expanded')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-haspopup')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-selected')).toBe(null);
    expect(container.firstElementChild?.getAttribute('id')).toBe(null);
    expect(container.firstElementChild?.getAttribute('role')).toBe(null);
    expect(container.firstElementChild?.getAttribute('disabled')).toBe(null);
    expect(container.firstElementChild?.getAttribute('tabindex')).toBe(null);
    expect(container.firstElementChild?.getAttribute('type')).toBe('button');
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<button class="test-class" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button test-class');
  });

  it('should allow destructive button', async () => {
    const { container } = await render('<button destructive v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button v-button-destructive');
  });

  it('should allow large button', async () => {
    const { container } = await render('<button buttonSize="large" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button v-button-large');
  });

  it('should allow secondary button', async () => {
    const { container } = await render('<button buttonColor="secondary" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button v-button-secondary');
  });

  it('should allow disabled button', async () => {
    const { container } = await render('<button disabled v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('disabled')).toBe('disabled');
  });

  it('should allow tertiary button', async () => {
    const { container } = await render('<button buttonColor="tertiary" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button v-button-tertiary');
  });

  it('should allow small button', async () => {
    const { container } = await render('<button buttonSize="small" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button v-button-small');
  });

  it('should allow subtle button', async () => {
    const { container } = await render('<button subtle v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button v-button-subtle');
  });

  it('should allow custom type', async () => {
    const { container } = await render('<button type="submit" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('type')).toBe('submit');
  });

  it('should allow custom id', async () => {
    const { container } = await render('<button id="test-id" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should allow custom role', async () => {
    const { container } = await render('<button role="test" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('role')).toBe('test');
  });

  it('should allow custom tabindex', async () => {
    const { container } = await render('<button tabindex="2" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('tabindex')).toBe('2');
  });

  it('should allow custom tabindex', async () => {
    const { container } = await render('<button tabindex="2" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('tabindex')).toBe('2');
  });

  it('should allow custom aria-controls', async () => {
    const { container } = await render('<button aria-controls="test-id" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-controls')).toBe('test-id');
  });

  it('should allow custom aria-current', async () => {
    const { container } = await render('<button aria-current="test-id" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-current')).toBe('true');
  });

  it('should allow aria-current page', async () => {
    const { container } = await render('<button aria-current="page" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-current')).toBe('page');
  });

  it('should allow custom aria-describedby', async () => {
    const { container } = await render('<button aria-describedby="test-id" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-describedby')).toBe('test-id');
  });

  it('should allow custom aria-expanded', async () => {
    const { container } = await render('<button aria-expanded="true" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-expanded')).toBe('true');
  });

  it('should allow custom aria-haspopup', async () => {
    const { container } = await render('<button aria-haspopup="true" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-haspopup')).toBe('true');
  });

  it('should allow custom aria-selected', async () => {
    const { container } = await render('<button aria-selected="true" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-selected')).toBe('true');
  });

  it('should adjust tab index to -1 if in combobox and contains toggle icon', async () => {
    const { fixture } = await render(
      '<div v-combobox v-floating-ui-container><button v-button>Content<v-icon-visa-toggle></v-icon-visa-toggle></button></div>',
      {
        imports: [ComboboxDirective, ButtonDirective, IconToggleComponent]
      }
    );
    const button = screen.getByText('Content');
    fixture.detectChanges();
    expect(button.getAttribute('tabindex')).toBe('-1');
  });

  it('should render the defaults correctly', async () => {
    const { container } = await render('<button v-button-stacked>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button v-button-stacked');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<button class="test-class" v-button-stacked>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button test-class v-button-stacked');
  });

  it('should render the defaults correctly', async () => {
    const { container } = await render('<button v-button-icon>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button v-button-icon');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<button class="test-class" v-button-icon>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button test-class v-button-icon');
  });

  it('should render defaults correctly', async () => {
    const { container } = await render('<button v-button disabled>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button');
    expect(container.firstElementChild?.getAttribute('aria-disabled')).toBe(null);
    expect(container.firstElementChild?.getAttribute('disabled')).toBe('disabled');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<button disabled class="test-class" v-button>Content</button>', {
      imports: [ButtonDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-button test-class');
  });
});
