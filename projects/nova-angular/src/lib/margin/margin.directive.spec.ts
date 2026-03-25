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

import { MarginDirective } from './margin.directive';

describe('MarginDirective', () => {
  describe('vM', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vM>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vM>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vM="1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-m-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vM="-1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-m-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vM="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-m-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vM="auto">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-m-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vM="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-m-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vM="inherit">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-m-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vM="normal">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-m-normal');
    });
  });

  describe('vMB', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vMB>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vMB>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vMB="1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mb-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vMB="-1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-mb-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vMB="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mb-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vMB="auto">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mb-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vMB="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mb-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vMB="inherit">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mb-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vMB="normal">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mb-normal');
    });
  });

  describe('vML', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vML>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vML>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vML="1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-ml-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vML="-1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-ml-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vML="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-ml-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vML="auto">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-ml-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vML="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-ml-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vML="inherit">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-ml-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vML="normal">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-ml-normal');
    });
  });

  describe('vMR', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vMR>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vMR>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vMR="1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mr-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vMR="-1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-mr-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vMR="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mr-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vMR="auto">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mr-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vMR="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mr-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vMR="inherit">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mr-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vMR="normal">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mr-normal');
    });
  });

  describe('vMT', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vMT>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vMT>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vMT="1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mt-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vMT="-1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-mt-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vMT="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mt-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vMT="auto">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mt-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vMT="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mt-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vMT="inherit">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mt-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vMT="normal">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mt-normal');
    });
  });

  describe('vMX', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vMX>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vMX>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vMX="1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mx-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vMX="-1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-mx-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vMX="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mx-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vMX="auto">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mx-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vMX="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mx-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vMX="inherit">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mx-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vMX="normal">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-mx-normal');
    });
  });

  describe('vMY', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vMY>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vMY>Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vMY="1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-my-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vMY="-1">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-my-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vMY="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-my-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vMY="auto">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-my-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vMY="0">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-my-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vMY="inherit">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-my-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vMY="normal">Child</div>', {
        imports: [MarginDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-my-normal');
    });
  });
});
