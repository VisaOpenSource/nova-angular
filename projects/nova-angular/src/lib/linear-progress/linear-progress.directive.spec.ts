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

import { LabelDirective } from '../label/label.directive';
import { LinearProgressDirective } from './linear-progress.directive';

describe('LinearProgressDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render(
      '<progress v-progress-linear></progress><label id="test-id" v-label progressLabel>Label</label>',
      {
        imports: [LabelDirective, LinearProgressDirective]
      }
    );
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-progress v-progress-bar v-progress-indeterminate'
    );
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
    expect(container.firstElementChild?.getAttribute('max')).toBe(null);
  });

  it('should render ariaHidden false correctly', async () => {
    const { container } = await render('<progress v-progress-linear aria-hidden="false"></progress>', {
      imports: [LinearProgressDirective]
    });

    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('false');
  });

  it('should render determinate true correctly', async () => {
    const { container } = await render('<progress v-progress-linear determinate></progress>', {
      imports: [LinearProgressDirective]
    });

    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-progress v-progress-bar v-progress-complete');
    expect(container.firstElementChild?.getAttribute('max')).toBe('100');
    expect(container.firstElementChild?.getAttribute('value')).toBe('100');
  });

  it('should render percentage correctly', async () => {
    const { container } = await render(
      '<progress v-progress-linear determinate percentage="90" value="null"></progress>',
      {
        imports: [LinearProgressDirective]
      }
    );

    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-progress v-progress-bar');
    expect(container.firstElementChild?.getAttribute('max')).toBe('100');
    expect(container.firstElementChild?.getAttribute('value')).toBe('90');
  });

  it('should prioritize percentage over value', async () => {
    const { container } = await render(
      '<progress v-progress-linear determinate percentage="90" value="50" max="50"></progress>',
      {
        imports: [LinearProgressDirective]
      }
    );

    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-progress v-progress-bar');
    expect(container.firstElementChild?.getAttribute('max')).toBe('100');
    expect(container.firstElementChild?.getAttribute('value')).toBe('90');
  });

  it('should allow custom value and max', async () => {
    const { container } = await render('<progress v-progress-linear determinate max="50" value="50"></progress>', {
      imports: [LinearProgressDirective]
    });

    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe(null);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-progress v-progress-bar v-progress-complete');
    expect(container.firstElementChild?.getAttribute('max')).toBe('50');
    expect(container.firstElementChild?.getAttribute('value')).toBe('50');
  });
});
