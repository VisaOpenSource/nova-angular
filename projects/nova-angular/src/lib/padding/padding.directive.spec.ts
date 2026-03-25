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

import { PaddingDirective } from './padding.directive';

describe('PaddingDirective', () => {
  describe('vP', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vP>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vP>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vP="1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-p-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vP="-1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-p-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vP="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-p-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vP="auto">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-p-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vP="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-p-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vP="inherit">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-p-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vP="normal">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-p-normal');
    });
  });

  describe('vPB', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vPB>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vPB>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vPB="1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pb-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vPB="-1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-pb-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vPB="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pb-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vPB="auto">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pb-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vPB="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pb-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vPB="inherit">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pb-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vPB="normal">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pb-normal');
    });
  });

  describe('vPL', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vPL>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vPL>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vPL="1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pl-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vPL="-1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-pl-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vPL="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pl-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vPL="auto">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pl-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vPL="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pl-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vPL="inherit">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pl-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vPL="normal">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pl-normal');
    });
  });

  describe('vPR', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vPR>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vPR>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vPR="1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pr-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vPR="-1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-pr-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vPR="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pr-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vPR="auto">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pr-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vPR="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pr-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vPR="inherit">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pr-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vPR="normal">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pr-normal');
    });
  });

  describe('vPT', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vPT>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vPT>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vPT="1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pt-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vPT="-1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-pt-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vPT="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pt-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vPT="auto">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pt-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vPT="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pt-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vPT="inherit">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pt-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vPT="normal">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-pt-normal');
    });
  });

  describe('vPX', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vPX>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vPX>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vPX="1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-px-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vPX="-1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-px-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vPX="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-px-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vPX="auto">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-px-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vPX="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-px-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vPX="inherit">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-px-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vPX="normal">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-px-normal');
    });
  });

  describe('vPY', () => {
    it('should render defaults correctly', async () => {
      const { container } = await render('<div vPY>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe(null);
    });

    it('should allow custom class', async () => {
      const { container } = await render('<div class="test-class" vPY>Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('test-class');
    });

    it('should render 1 correctly', async () => {
      const { container } = await render('<div vPY="1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-py-1');
    });

    it('should render -1 correctly', async () => {
      const { container } = await render('<div vPY="-1">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('-v-py-1');
    });

    it('should render 0 correctly', async () => {
      const { container } = await render('<div vPY="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-py-0');
    });

    it('should render auto correctly', async () => {
      const { container } = await render('<div vPY="auto">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-py-auto');
    });

    it('should render -0 correctly', async () => {
      const { container } = await render('<div vPY="0">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-py-0');
    });

    it('should render inherit correctly', async () => {
      const { container } = await render('<div vPY="inherit">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-py-inherit');
    });

    it('should render normal correctly', async () => {
      const { container } = await render('<div vPY="normal">Child</div>', {
        imports: [PaddingDirective]
      });
      expect(container.firstElementChild?.getAttribute('class')).toBe('v-py-normal');
    });
  });
});
