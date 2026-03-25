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
import { PaginationDefaultFirstPageComponent } from './default-first-page/default-first-page.docs';
import { PaginationDefaultLastPageComponent } from './default-last-page/default-last-page.docs';
import { PaginationDefaultMiddlePageComponent } from './default-middle-page/default-middle-page.docs';
import { ReusablePagination } from './reusable/reusable.docs';
import { PaginationSlimWithCountComponent } from './slim-with-count/slim-with-count.docs';
import { PaginationSlimComponent } from './slim/slim.docs';

const examples: Record<string, any> = {
  PaginationDefaultFirstPageComponent,
  PaginationDefaultLastPageComponent,
  PaginationDefaultMiddlePageComponent,
  PaginationSlimWithCountComponent,
  PaginationSlimComponent,
  ReusablePagination
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe.skip('Pagination examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
