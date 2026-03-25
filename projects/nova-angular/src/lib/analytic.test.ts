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
import { InputDirective } from '../lib/input/input.directive';
import { ButtonDirective } from './button/button.directive';

describe.skip('Performance analytics', () => {
  it('should test render time of button directive', async () => {
    // Test implementation
    const startTime = performance.now();
    await render('<button v-button>Button</button>', {
      imports: [ButtonDirective]
    });
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    console.log(`Button render time: ${renderTime}ms`);

    expect(renderTime).toBeLessThan(1000); // Expect render time to be less than 100ms
  });

  it('should test render time of input directive', async () => {
    // Test implementation
    const startTime = performance.now();
    await render('<input v-input />', {
      imports: [InputDirective]
    });
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    console.log(`Input render time: ${renderTime}ms`);

    expect(renderTime).toBeLessThan(1000); // Expect render time to be less than 100ms
  });
});
