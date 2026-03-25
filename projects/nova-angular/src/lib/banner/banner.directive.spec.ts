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

import { BannerDirective } from './banner.directive';

describe('BannerDirective', () => {
  it('should render the defaults correctly', async () => {
    const { container } = await render('<div v-banner>Banner</div>', {
      imports: [BannerDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-banner');
    expect(container.firstElementChild?.getAttribute('style')).toBe(null);
  });

  it('should render isGlobal styles', async () => {
    const { container } = await render('<div v-banner isGlobal>Banner</div>', {
      imports: [BannerDirective]
    });
    expect(container.firstElementChild?.getAttribute('style')).toBe('position: sticky; top: 0px; z-index: 888;');
  });
});
