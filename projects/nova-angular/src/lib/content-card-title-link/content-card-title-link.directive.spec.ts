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

import { ContentCardTitleLinkDirective } from './content-card-title-link.directive';
import { ContentCardDirective } from '../content-card/content-card.directive';
import { screen } from '@testing-library/dom';
import { By } from '@angular/platform-browser';

describe('ContentCardTitleLinkDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-content-card-title-link>Child</div>', {
      imports: [ContentCardTitleLinkDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-disabled')).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-content-card-title-link');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-content-card-title-link>Child</div>', {
      imports: [ContentCardTitleLinkDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-content-card-title-link test-class');
  });

  it('should render disabled correctly', async () => {
    const { container } = await render('<div v-content-card-title-link disabled>Child</div>', {
      imports: [ContentCardTitleLinkDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-disabled')).toBe('true');
  });

  it('should be disabled when parent card disabled', async () => {
    await render(
      `<div v-content-card disabled>
        <div data-testid="content-card-link" v-content-card-title-link>Child</div>
      </div>`,
      {
        imports: [ContentCardDirective, ContentCardTitleLinkDirective]
      }
    );

    const contentCardLink = screen.getByTestId('content-card-link');
    expect(contentCardLink?.getAttribute('aria-disabled')).toBe('true');
  });

  it('should not allow click when disabled', async () => {
    const { debugElement } = await render('<div v-content-card-title-link disabled>Child</div>', {
      imports: [ContentCardTitleLinkDirective]
    });
    const directive = debugElement
      .query(By.directive(ContentCardTitleLinkDirective))
      .injector.get(ContentCardTitleLinkDirective);

    const link = screen.getByText('Child');
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

    Object.defineProperty(clickEvent, 'preventDefault', { writable: true, value: jest.fn() });

    link.dispatchEvent(clickEvent);

    expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);

    expect(link?.getAttribute('aria-disabled')).toBe('true');
  });
});
