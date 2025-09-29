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

import { DialogDirective } from '../dialog/dialog.directive';
import { DialogHeaderDirective } from './dialog-header.directive';

describe('DialogHeaderDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-dialog-header>Menu</div>', {
      imports: [DialogHeaderDirective, DialogDirective],
      providers: [DialogDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-dialog-header');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-dialog-header>Menu</div>', {
      imports: [DialogHeaderDirective, DialogDirective],
      providers: [DialogDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-dialog-header test-class');
  });

  it('should allow custom id', async () => {
    const { container } = await render('<div id="test-id" v-dialog-header>Menu</div>', {
      imports: [DialogHeaderDirective, DialogDirective],
      providers: [DialogDirective]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });
});
