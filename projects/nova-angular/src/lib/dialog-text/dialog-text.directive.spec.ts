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
import { screen } from '@testing-library/dom';

import { DialogDirective } from '../dialog/dialog.directive';
import { DialogTextDirective } from './dialog-text.directive';

describe('DialogTextDirective', () => {
  it('should allow custom id', async () => {
    const { container } = await render('<div id="test-id" v-dialog-text>Text</div>', {
      imports: [DialogTextDirective, DialogDirective],
      providers: [DialogDirective]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should pick up dialog id', async () => {
    await render('<div v-dialog id="test-id"><div data-testid="text-id" v-dialog-text>Text</div></div>', {
      imports: [DialogTextDirective, DialogDirective],
      providers: [DialogDirective]
    });
    const dialogText = screen.getByTestId('text-id');
    expect(dialogText?.getAttribute('id')).toBe('test-id-description');
  });
});
