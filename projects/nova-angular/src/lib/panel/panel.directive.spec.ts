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

import { ButtonDirective } from '../button/button.directive';
import { PanelToggleDirective } from '../panel-toggle-button/panel-toggle-button.directive';
import { PanelDirective } from './panel.directive';

describe('PanelDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-panel>Panel</div>', {
      imports: [PanelDirective]
    });
    expect(container.firstElementChild?.textContent).toBe('Panel');
    expect(container.firstElementChild?.getAttribute('aria-modal')).toBe('true');
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-panel');
    expect(container.firstElementChild?.getAttribute('id')).toBe(null);
    expect(container.firstElementChild?.getAttribute('role')).toBe('dialog');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div v-panel class="test-class">Panel</div>', {
      imports: [PanelDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-panel test-class');
  });

  it('should allow responsive attribute', async () => {
    const { container } = await render('<div v-panel responsive>Panel</div>', {
      imports: [PanelDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-modal')).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-panel v-panel-responsive');
    expect(container.firstElementChild?.getAttribute('role')).toBe(null);
  });

  it('should allow custom id', async () => {
    const { container } = await render('<div v-panel id="test-id">Panel</div>', {
      imports: [PanelDirective]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should allow custom role', async () => {
    const { container } = await render('<div v-panel role="test-role">Panel</div>', {
      imports: [PanelDirective]
    });
    expect(container.firstElementChild?.getAttribute('role')).toBe('test-role');
  });

  it('should allow skrim attribute', async () => {
    const { container } = await render('<div v-panel skrim>Panel</div>', {
      imports: [PanelDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-panel v-panel-skrim');
  });

  it('should allow expandable attribute', async () => {
    const { container } = await render('<div v-panel expandable>Panel</div>', {
      imports: [PanelDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-panel v-panel-expandable');
  });

  it('should expand and collapse on toggle button click', async () => {
    const { container, fixture } = await render(
      `
      <div v-panel expandable>
        <button v-panel-toggle data-testid="toggle">Toggle</button>
        Panel Content
      </div>
    `,
      {
        imports: [PanelDirective, PanelToggleDirective, ButtonDirective]
      }
    );

    const toggleButton = screen.getByTestId('toggle');
    expect(container.firstElementChild?.getAttribute('class')).toContain('v-panel-expandable');

    toggleButton.click();
    fixture.detectChanges();
    expect(toggleButton?.getAttribute('aria-expanded')).toBe('true');

    toggleButton.click();
    fixture.detectChanges();
    expect(toggleButton?.getAttribute('aria-expanded')).toBe('false');
  });
});
