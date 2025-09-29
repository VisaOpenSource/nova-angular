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

import { LabelDirective } from '../label/label.directive';
import { CircularProgressComponent } from './circular-progress.component';

describe('CircularProgressComponent', () => {
  it('should allow custom class', async () => {
    const { container } = await render(
      `<div v-progress-circular>
          <span role="alert" vSR>Loading...</span>
        </div>`,
      {
        imports: [CircularProgressComponent]
      }
    );
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-progress v-progress-circular v-progress-indeterminate'
    );
    expect(container.firstElementChild?.getAttribute('role')).toBe(null);
    expect(container.firstElementChild?.getAttribute('aria-labelledby')).toBe(null);
  });

  it('should pass progressBar to label', async () => {
    const { fixture } = await render('<div v-progress-circular><label v-label>Label</label> Progress </div>', {
      imports: [CircularProgressComponent, LabelDirective]
    });
    fixture.detectChanges();
    const labelElement = screen.getByText<HTMLLabelElement>('Label');
    expect(labelElement?.getAttribute('class')).toBe('v-progress-label');
  });

  it('should allow custom role', async () => {
    const { container } = await render('<div v-progress-circular role="text"> Progress </div>', {
      imports: [CircularProgressComponent]
    });

    expect(container.firstElementChild?.getAttribute('role')).toBe('text');
  });

  it('should allow custom invalid', async () => {
    const { container } = await render('<div v-progress-circular invalid> Progress </div>', {
      imports: [CircularProgressComponent]
    });

    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-progress v-progress-circular v-progress-error v-progress-indeterminate'
    );
  });

  it('should allow small', async () => {
    const { container } = await render('<div v-progress-circular small> Progress </div>', {
      imports: [CircularProgressComponent]
    });

    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-progress v-progress-circular v-progress-circular-small v-progress-indeterminate'
    );
  });

  it('should allow determinate', async () => {
    const { container } = await render('<div v-progress-circular determinate> Progress </div>', {
      imports: [CircularProgressComponent]
    });

    expect(container.firstElementChild?.getAttribute('class')).toBe('v-progress v-progress-circular');
    expect(container.firstElementChild?.getAttribute('role')).toBe('progressbar');
  });

  it('should allow determinate complete', async () => {
    const { container } = await render('<div v-progress-circular determinate percentage="100"> Progress </div>', {
      imports: [CircularProgressComponent]
    });

    expect(container.firstElementChild?.getAttribute('role')).toBe('progressbar');
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-progress v-progress-circular v-progress-complete'
    );
  });

  it('should allow for custom sizes', async () => {
    jest.useFakeTimers();
    const { container } = await render(
      `<style>
          .custom-circular-progress {
            transform: scale(0.25);
            block-size: calc(var(--v-progress-circular-size) * 0.25);
            inline-size: calc(var(--v-progress-circular-size) * 0.25);
            display: grid;
            justify-content: center;
            align-content: center;
          }
        </style>
        <div v-progress-circular class="custom-circular-progress">
          <span role="alert" vSR>Loading...</span>
        </div>
        `,
      {
        imports: [CircularProgressComponent]
      }
    );
    jest.runAllTimers();
    expect(container).toMatchSnapshot();
    jest.useRealTimers();
  });
});
