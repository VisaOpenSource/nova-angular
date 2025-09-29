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

import { DialogDirective } from './dialog.directive';

describe('DialogDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<dialog v-dialog>Dialog</dialog>', {
      imports: [DialogDirective]
    });

    expect(container.firstElementChild?.getAttribute('class')).toBe('v-dialog v-dialog-default');
    expect(container.firstElementChild?.getAttribute('aria-modal')).toBe('true');
    expect(container.firstElementChild?.getAttribute('role')).toBe('dialog');
  });

  it('should allow children', async () => {
    const { container } = await render('<dialog v-dialog>Dialog</dialog>', {
      imports: [DialogDirective]
    });
    expect(container.firstElementChild?.textContent).toBe('Dialog');
  });

  it('should allow child element', async () => {
    const { container } = await render('<dialog v-dialog><p>Hello</p></dialog>', {
      imports: [DialogDirective]
    });
    expect(container).toMatchSnapshot();
  });

  it('should allow custom class', async () => {
    const { container } = await render('<dialog class="test-class" v-dialog>Dialog</dialog>', {
      imports: [DialogDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-dialog test-class v-dialog-default');
  });

  it('should allow custom id', async () => {
    const { container } = await render('<dialog id="test-id" v-dialog>Dialog</dialog>', {
      imports: [DialogDirective]
    });
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
  });

  it('should allow custom label', async () => {
    const { container } = await render('<dialog aria-labelledby="test-label" v-dialog>Dialog</dialog>', {
      imports: [DialogDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-labelledby')).toBe('test-label');
  });

  it('should allow custom described by', async () => {
    const { container } = await render('<dialog aria-describedby="test-id" v-dialog>Dialog</dialog>', {
      imports: [DialogDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-describedby')).toBe('test-id');
  });

  it('should allow custom aria-modal', async () => {
    const { container } = await render('<dialog aria-modal="false" v-dialog>Dialog</dialog>', {
      imports: [DialogDirective]
    });
    expect(container.firstElementChild?.getAttribute('aria-modal')).toBe('false');
  });

  it('should allow custom role', async () => {
    const { container } = await render('<dialog role="test" v-dialog>Dialog</dialog>', {
      imports: [DialogDirective]
    });
    expect(container.firstElementChild?.getAttribute('role')).toBe('test');
  });

  it('should allow custom messageType', async () => {
    const { container } = await render('<dialog messageType="subtle" v-dialog>Dialog</dialog>', {
      imports: [DialogDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-dialog');
  });
});
