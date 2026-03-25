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

import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { ChipDirective } from './chip.directive';

describe('ChipDirective', () => {
  it('should render the defaults correctly', async () => {
    const { container } = await render('<div v-chip>Chip</div>', {
      imports: [ChipDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-chip');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-chip>Chip</div>', {
      imports: [ChipDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-chip test-class');
  });

  it('should render compact correctly', async () => {
    const { container } = await render('<div compact v-chip>Chip</div>', {
      imports: [ChipDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-chip v-chip-compact');
  });

  it('should render checkbox chip correctly', async () => {
    const { container } = await render(
      '<label v-chip for="selection-chip-default">Label<input v-checkbox id="selection-chip-default" /></label>',
      {
        imports: [ChipDirective, CheckboxDirective]
      }
    );
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-chip v-chip-selection');
  });
});
