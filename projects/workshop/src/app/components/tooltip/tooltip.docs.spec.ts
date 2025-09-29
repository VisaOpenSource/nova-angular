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

import { IdGenerator } from '@visa/nova-angular';
import { BottomTooltipComponent } from './bottom/bottom.docs';
import { CustomEventsTooltipComponent } from './custom-events/custom-events.docs';
import { CustomMiddlewareTooltipComponent } from './custom-middleware/custom-middleware.docs';
import { LeftTooltipComponent } from './left/left.docs';
import { RightTooltipComponent } from './right/right.docs';
import { TopTooltipComponent } from './top/top.docs';
import { WithArrowTooltipComponent } from './with-arrow/with-arrow.docs';

const examples = {
  BottomTooltipComponent,
  CustomEventsTooltipComponent,
  CustomMiddlewareTooltipComponent,
  LeftTooltipComponent,
  RightTooltipComponent,
  TopTooltipComponent,
  WithArrowTooltipComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Tooltip examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
