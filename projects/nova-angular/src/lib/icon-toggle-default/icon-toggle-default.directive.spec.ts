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
import { IconToggleDefaultTemplateDirective } from './icon-toggle-default.directive';
import { TabItemDirective } from '../tab-item/tab-item.directive';

describe('IconToggleDefaultTemplateDirective', () => {
  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-toggle-default-template>Content</div>', {
      imports: [IconToggleDefaultTemplateDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
  });

  it('should allow tabSuffix', async () => {
    const { fixture } = await render(
      '<div v-tab-item disclosureTab><div class="test-class" v-toggle-default-template data-testid="icon">Content</div></div>',
      {
        imports: [IconToggleDefaultTemplateDirective, TabItemDirective]
      }
    );
    fixture.detectChanges();
    const icon = screen.getByTestId('icon');
    expect(icon?.getAttribute('class')).toBe('test-class v-tab-suffix');
  });
});
