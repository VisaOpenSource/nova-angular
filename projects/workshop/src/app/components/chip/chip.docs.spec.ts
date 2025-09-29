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
import { CompactDeleteChipAvatarChipComponent } from './compact-delete-chip-avatar/compact-delete-chip-avatar.docs';
import { CompactDeleteChipDefaultChipComponent } from './compact-delete-chip-default/compact-delete-chip-default.docs';
import { CompactDeleteChipIconChipComponent } from './compact-delete-chip-icon/compact-delete-chip-icon.docs';
import { CustomChipComponent } from './custom-chip/custom-chip.docs';
import { CustomErrorChipComponent } from './custom-error-chip/custom-error-chip.docs';
import { DeleteChipAvatarChipComponent } from './delete-chip-avatar/delete-chip-avatar.docs';
import { DeleteChipDefaultChipComponent } from './delete-chip-default/delete-chip-default.docs';
import { DeleteChipDisabledChipComponent } from './delete-chip-disabled/delete-chip-disabled.docs';
import { DeleteChipIconChipComponent } from './delete-chip-icon/delete-chip-icon.docs';
import { DisabledSelectedSelectionChipChipComponent } from './disabled-selected-selection-chip/disabled-selected-selection-chip.docs';
import { DisabledSelectionChipComponent } from './disabled-selection-chip/disabled-selection-chip.docs';
import { MultiLineSelectionChipComponent } from './multi-line-selection-chip/multi-line-selection-chip.docs';
import { ReadOnlySelectionChipCheckedChipComponent } from './read-only-selection-chip-checked/read-only-selection-chip-checked.docs';
import { ReadOnlySelectionChipComponent } from './read-only-selection-chip/read-only-selection-chip.docs';
import { SelectedSelectionChipComponent } from './selected-selection-chip/selected-selection-chip.docs';
import { SelectionChipComponent } from './selection-chip/selection-chip.docs';
import { SetOfChipsDeleteChipsCompactChipComponent } from './set-of-chips-delete-chips-compact/set-of-chips-delete-chips-compact.docs';
import { SetOfChipsDeleteChipsChipComponent } from './set-of-chips-delete-chips/set-of-chips-delete-chips.docs';
import { SetOfChipsSelectionChipComponent } from './set-of-chips-selection-chip/set-of-chips-selection-chip.docs';
import { StandardChipComponent } from './standard-chip/standard-chip.docs';

const examples = {
  CompactDeleteChipAvatarChipComponent,
  CompactDeleteChipDefaultChipComponent,
  CompactDeleteChipIconChipComponent,
  CustomChipComponent,
  CustomErrorChipComponent,
  DeleteChipAvatarChipComponent,
  DeleteChipDefaultChipComponent,
  DeleteChipDisabledChipComponent,
  DeleteChipIconChipComponent,
  DisabledSelectedSelectionChipChipComponent,
  DisabledSelectionChipComponent,
  MultiLineSelectionChipComponent,
  ReadOnlySelectionChipCheckedChipComponent,
  ReadOnlySelectionChipComponent,
  SelectedSelectionChipComponent,
  SelectionChipComponent,
  SetOfChipsDeleteChipsCompactChipComponent,
  SetOfChipsDeleteChipsChipComponent,
  SetOfChipsSelectionChipComponent,
  StandardChipComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Chip examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
