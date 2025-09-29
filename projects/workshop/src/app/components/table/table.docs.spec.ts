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

import { HttpClient, HttpHandler } from '@angular/common/http';
import { MockDataService } from '../../shared/services/mock-data.service';

import { IdGenerator } from '@visa/nova-angular';
import { CompactPaddingBandedRowsTableComponent } from './compact-padding-banded-rows/compact-padding-banded-rows.docs';
import { FixedFirstColumnComponent } from './fixed-first-column/fixed-first-column.docs';
import { GroupHeadersWithEmptyCellTableComponent } from './group-headers-with-empty-cell/group-headers-with-empty-cell.docs';
import { GroupHeadersTableComponent } from './group-headers/group-headers.docs';
import { KeyValueTableBandedTableComponent } from './key-value-table-banded/key-value-table-banded.docs';
import { KeyValueTableLinedTableComponent } from './key-value-table-lined/key-value-table-lined.docs';
import { LargePaddingBandedRowsTableComponent } from './large-padding-banded-rows/large-padding-banded-rows.docs';
import { LinedRowsTableComponent } from './lined-rows/lined-rows.docs';
import { MediumPaddingBandedRowsTableComponent } from './medium-padding-banded-rows/medium-padding-banded-rows.docs';
import { OuterBorderColumnAndRowDividersTableComponent } from './outer-border-column-and-row-dividers/outer-border-column-and-row-dividers.docs';
import { OuterBorderSubtleHeadersTableComponent } from './outer-border-subtle-headers/outer-border-subtle-headers.docs';
import { ScrollTableComponent } from './scroll/scroll.docs';

const examples = {
  CompactPaddingBandedRowsTableComponent,
  FixedFirstColumnComponent,
  GroupHeadersWithEmptyCellTableComponent,
  GroupHeadersTableComponent,
  KeyValueTableBandedTableComponent,
  KeyValueTableLinedTableComponent,
  LargePaddingBandedRowsTableComponent,
  LinedRowsTableComponent,
  MediumPaddingBandedRowsTableComponent,
  OuterBorderColumnAndRowDividersTableComponent,
  OuterBorderSubtleHeadersTableComponent,
  ScrollTableComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Table examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key], { providers: [MockDataService, HttpClient, HttpHandler] });
      expect(container).toMatchSnapshot();
    });
  });
});
