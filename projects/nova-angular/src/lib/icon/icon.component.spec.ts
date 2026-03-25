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
import { By } from '@angular/platform-browser';
import { render, screen } from '@testing-library/angular';
import { IconComponent } from './icon.component';
import { IconToggleDirective } from '../icon-toggle/icon-toggle.directive';

describe('IconComponent', () => {
  it('should render the defaults correctly', async () => {
    const { container } = await render('<svg v-icon>Label</svg>', {
      imports: [IconComponent]
    });
    expect(container).toMatchSnapshot();

    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-tiny v-icon-visa');
    expect(container.firstElementChild?.getAttribute('focusable')).toBe('false');
    expect(container.firstElementChild?.getAttribute('height')).toBe('16');
    expect(container.firstElementChild?.getAttribute('hidden')).toBe('true');
    expect(container.firstElementChild?.getAttribute('viewBox')).toBe('0 0 16 16');
    expect(container.firstElementChild?.getAttribute('width')).toBe('16');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should allow custom class', async () => {
    const { container } = await render('<svg class="test-class" v-icon>Label</svg>', {
      imports: [IconComponent]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon test-class v-icon-tiny v-icon-visa');
  });

  it('should allow customIcon', async () => {
    const { container } = await render('<svg customIcon="test" v-icon>Label</svg>', {
      imports: [IconComponent]
    });
    expect(container.firstElementChild?.firstElementChild?.getAttribute('href')).toBe('#test');
    expect(container.firstElementChild?.firstElementChild?.getAttribute('xlink:href')).toBe('#test');
  });

  it('should allow icon', async () => {
    const { container } = await render('<svg icon="test" v-icon>Label</svg>', {
      imports: [IconComponent]
    });
    expect(container.firstElementChild?.firstElementChild?.getAttribute('href')).toBe('#visa-test-tiny');
    expect(container.firstElementChild?.firstElementChild?.getAttribute('xlink:href')).toBe('#visa-test-tiny');
  });

  it('should allow custom iconSize low', async () => {
    const { container } = await render('<svg v-icon iconSize="low">Label</svg>', {
      imports: [IconComponent]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-low v-icon-visa');
  });

  it('should allow custom iconSize high', async () => {
    const { container } = await render('<svg v-icon iconSize="high">Label</svg>', {
      imports: [IconComponent]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-high v-icon-visa');
  });

  it('should allow custom iconSize tiny', async () => {
    const { container } = await render('<svg v-icon iconSize="tiny">Label</svg>', {
      imports: [IconComponent]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-tiny v-icon-visa');
  });

  it('should allow rtl', async () => {
    const { container } = await render('<svg v-icon rtl>Label</svg>', {
      imports: [IconComponent]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-rtl v-icon-tiny v-icon-visa');
  });

  it('should allow isBadgeEllipse icon', async () => {
    const { container } = await render('<svg v-icon isBadgeEllipse>Label</svg>', {
      imports: [IconComponent]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-badge-ellipse v-icon-tiny v-icon-visa');
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      '--v-icon-height: var(--size-scalable-8); --v-icon-primary: var(--v-badge-ellipse-color); --v-icon-secondary: var(--v-badge-ellipse-color); --v-icon-width: var(--size-scalable-8);'
    );
    expect(container).toMatchSnapshot();
  });

  it('should adjust based on tabSuffix true', async () => {
    const { container, debugElement, fixture } = await render('<svg v-icon>Label</svg>', {
      imports: [IconComponent]
    });
    const directive = debugElement.query(By.directive(IconComponent)).injector.get(IconComponent);
    directive.tabSuffix.set(true);
    fixture.detectChanges();
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-tiny v-icon-visa v-tab-suffix');
  });

  describe('Icon as icon toggle', () => {
    it('should render default icon', async () => {
      await render(
        `
        <span v-icon-toggle>
          <svg v-icon data-testid="icon"/>
        <span>
      `,
        {
          imports: [IconComponent, IconToggleDirective]
        }
      );

      const icon = screen.getByTestId('icon');
      expect(icon.firstElementChild?.getAttribute('href')).toContain('chevron-down');
    });

    it('should render default expanded icon', async () => {
      const { fixture, debugElement } = await render(
        `
        <span v-icon-toggle>
          <svg v-icon data-testid="icon"/>
        <span>
      `,
        {
          imports: [IconComponent, IconToggleDirective]
        }
      );
      const directiveElement = debugElement.query(By.directive(IconToggleDirective));
      const directive = directiveElement?.injector.get(IconToggleDirective);
      directive.rotatedInternal.set(true);
      await fixture.whenStable();
      fixture.detectChanges();

      const icon = screen.getByTestId('icon');
      expect(icon.firstElementChild?.getAttribute('href')).toContain('chevron-up');
    });
  });
});
