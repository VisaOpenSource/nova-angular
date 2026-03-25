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

import { WizardDirective } from './wizard.directive';

describe('WizardDirective', () => {
  it('should render the v-flag defaults', async () => {
    const { container } = await render('<div v-wizard>Wizard</div>', {
      imports: [WizardDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-wizard');
  });

  it('should render custom class', async () => {
    const { container } = await render('<div class="test-class" v-wizard>Wizard</div>', {
      imports: [WizardDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-wizard test-class');
  });

  it('should render compact class', async () => {
    const { container } = await render('<div compact v-wizard>Wizard</div>', {
      imports: [WizardDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-wizard v-wizard-compact');
  });

  it('should render vertical class', async () => {
    const { container } = await render('<div vertical v-wizard>Wizard</div>', {
      imports: [WizardDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-wizard v-wizard-vertical');
  });
});
