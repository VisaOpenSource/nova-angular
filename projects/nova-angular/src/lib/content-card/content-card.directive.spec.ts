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
import { render } from '@testing-library/angular';

import { ContentCardDirective } from './content-card.directive';
import { ContentCardTitleLinkDirective } from '../content-card-title-link/content-card-title-link.directive';

describe('ContentCardDirective', () => {
  it('should render the defaults correctly', async () => {
    const { container } = await render('<div v-content-card>Card</div>', {
      imports: [ContentCardDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-content-card');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-content-card>Chip</div>', {
      imports: [ContentCardDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-content-card test-class');
  });

  it('should allow indicator', async () => {
    const { container } = await render('<div indicator v-content-card>Chip</div>', {
      imports: [ContentCardDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-content-card v-content-card-border-block-end');
  });

  it('should be disabled', async () => {
    const { container } = await render('<div disabled v-content-card>Chip</div>', {
      imports: [ContentCardDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-disabled')).toBe('true');
  });

  it('should be disabled if card title link disabled', async () => {
    const { container } = await render('<div v-content-card><a v-content-card-title-link disabled>Link</a></div>', {
      imports: [ContentCardDirective, ContentCardTitleLinkDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-disabled')).toBe('true');
  });

  it("shouldn't be disabled if card title link is not disabled", async () => {
    const { container } = await render('<div v-content-card><a v-content-card-title-link>Link</a></div>', {
      imports: [ContentCardDirective, ContentCardTitleLinkDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-disabled')).toBe(null);
  });

  it.skip('should allow clickable', async () => {
    const { container } = await render('<div clickable v-content-card>Chip</div>', {
      imports: [ContentCardDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class v-content-card');
  });

  it('should prevent default action on space key down when clickable', async () => {
    const { container } = await render('<div clickable v-content-card>Chip</div>', {
      imports: [ContentCardDirective]
    });
    const div = container.firstElementChild as HTMLElement;
    const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
    div.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should not prevent default action on space key down when not clickable', async () => {
    const { container } = await render('<div v-content-card>Chip</div>', {
      imports: [ContentCardDirective]
    });
    const div = container.firstElementChild as HTMLElement;
    const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
    div.dispatchEvent(event);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('should handle click when clickable and main link is present', async () => {
    const { container } = await render('<div clickable v-content-card><a v-content-card-title-link>Link</a></div>', {
      imports: [ContentCardDirective, ContentCardTitleLinkDirective]
    });
    const div = container.firstElementChild as HTMLElement;
    const link = div.querySelector('a') as HTMLElement;
    const clickSpy = jest.spyOn(link, 'click');
    div.click();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should not handle click when not clickable and main link is present', async () => {
    const { container } = await render('<div v-content-card><a v-content-card-title-link>Link</a></div>', {
      imports: [ContentCardDirective, ContentCardTitleLinkDirective]
    });
    const div = container.firstElementChild as HTMLElement;
    const link = div.querySelector('a') as HTMLElement;
    const clickSpy = jest.spyOn(link, 'click');
    div.click();
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should not handle click when clickable and main link is not present', async () => {
    const { container } = await render('<div clickable v-content-card><a>Link</a></div>', {
      imports: [ContentCardDirective]
    });
    const div = container.firstElementChild as HTMLElement;
    const link = div.querySelector('a') as HTMLElement;
    const clickSpy = jest.spyOn(link, 'click');
    div.click();
    expect(clickSpy).not.toHaveBeenCalled();
  });
});
