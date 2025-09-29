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

import { MessageDirective } from './message.directive';

describe('MessageDirective', () => {
  it('should render defaults correctly', async () => {
    const { container } = await render('<div v-message>Message</div>', {
      imports: [MessageDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-message');
  });

  it('should render custom class', async () => {
    const { container } = await render('<div class="test-class" v-message>Message</div>', {
      imports: [MessageDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-message test-class');
  });

  it('should render close messageType', async () => {
    const { container } = await render('<div messageType="close" v-message>Message</div>', {
      imports: [MessageDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-message v-message-close');
  });

  it('should render error messageType', async () => {
    const { container } = await render('<div messageType="error" v-message>Message</div>', {
      imports: [MessageDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-message v-message-error');
  });

  it('should render subtle messageType', async () => {
    const { container } = await render('<div messageType="subtle" v-message>Message</div>', {
      imports: [MessageDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-message v-message-subtle');
  });

  it('should render success messageType', async () => {
    const { container } = await render('<div messageType="success" v-message>Message</div>', {
      imports: [MessageDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-message v-message-success');
  });

  it('should render warning messageType', async () => {
    const { container } = await render('<div messageType="warning" v-message>Message</div>', {
      imports: [MessageDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-message v-message-warning');
  });
});
