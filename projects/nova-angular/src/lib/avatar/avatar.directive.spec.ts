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
import { AvatarDirective } from './avatar.directive';

describe('AvatarDirective', () => {
  it('should render the defaults correctly', async () => {
    const { container } = await render('<div v-avatar>Avatar</div>', {
      imports: [AvatarDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-avatar');
  });

  it('should allow custom class', async () => {
    const { container } = await render('<div class="test-class" v-avatar>Avatar</div>', {
      imports: [AvatarDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-avatar test-class');
  });

  it('should append small class', async () => {
    const { container } = await render('<div small v-avatar>Avatar</div>', {
      imports: [AvatarDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-avatar v-avatar-small');
  });

  it('should render the defaults correctly', async () => {
    const { container } = await render('<div v-avatar>Avatar</div>', {
      imports: [AvatarDirective]
    });
    expect(container.firstElementChild?.getAttribute('role')).toBe('img');
  });

  it('should allow custom role', async () => {
    const { container } = await render('<div v-avatar role="tab">Avatar</div>', {
      imports: [AvatarDirective]
    });
    expect(container.firstElementChild?.getAttribute('role')).toBe('tab');
  });
});
