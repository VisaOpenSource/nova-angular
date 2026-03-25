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

import { HttpClient, HttpHandler } from '@angular/common/http';
import { WorkshopService } from '../../shared/services/workshop.service';

import { IdGenerator } from '@visa/nova-angular';
import { MultiFileUploadComponent } from './multi-file-upload/multi-file-upload.docs';
import { SingleFileUploadComponent } from './single-file-upload/single-file-upload.docs';
import { MultiFileManualUploadComponent } from './multi-file-manual-upload/multi-file-manual-upload.docs';
import { FileUploadWithAlternateDisplayComponent } from './file-upload-with-alternate-display/file-upload-with-alternate-display.docs';

const examples = {
  MultiFileUploadComponent,
  SingleFileUploadComponent,
  MultiFileManualUploadComponent,
  FileUploadWithAlternateDisplayComponent,
};

const keys = Object.keys(examples) as Array<keyof typeof examples>;

beforeEach(() => {
  IdGenerator.reset();
});

describe('File upload examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key], {
        providers: [WorkshopService, HttpClient, HttpHandler],
      });
      expect(container).toMatchSnapshot();
    });
  });
});
