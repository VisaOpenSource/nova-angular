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

import { IdGenerator } from '@visa/nova-angular';
import { ModalDefaultPanelComponent } from './modal-default/modal-default.docs';
import { ModalExpandableTabbedPanelComponent } from './modal-expandable-tabbed/modal-expandable-tabbed.docs';
import { ModalExpandableSecondaryButtonPanelComponent } from './modal-expandable-with-secondary-button/modal-expandable-with-secondary-button.docs';
import { ModalExpandableSkrimPanelComponent } from './modal-expandable-with-skrim/modal-expandable-with-skrim.docs';
import { ModalExpandablePanelComponent } from './modal-expandable/modal-expandable.docs';
import { DefaultResponsivePanelComponent } from './responsive-default/responsive-default.docs';
import { ResponsiveExpandedTabbedPanelComponent } from './responsive-expanded-tabbed/responsive-expanded-tabbed.docs';
import { ResposniveExpandedWithCustomPlacementPanelComponent } from './responsive-expanded-with-custom-placement/responsive-expanded-with-custom-placement.docs';
import { ResponsiveExpandedPanelComponent } from './responsive-expanded/responsive-expanded.docs';

const examples = {
  ResposniveExpandedWithCustomPlacementPanelComponent,
  ModalDefaultPanelComponent,
  ModalExpandableTabbedPanelComponent,
  ModalExpandableSecondaryButtonPanelComponent,
  ModalExpandableSkrimPanelComponent,
  ModalExpandablePanelComponent,
  DefaultResponsivePanelComponent,
  ResponsiveExpandedTabbedPanelComponent,
  ResponsiveExpandedPanelComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Panel examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
