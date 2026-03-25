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
import { DefaultInfoFlagWithTitleComponent } from './default-info-flag-title/default-info-flag-title.docs';
import { DefaultInfoFlagComponent } from './default-info-flag/default-info-flag.docs';
import { EmptyErrorFlagComponent } from './empty-error/empty-error.docs';
import { EmptyFlagComponent } from './empty-info/empty-info.docs';
import { EmptySuccessFlagComponent } from './empty-success/empty-success.docs';
import { EmptyWarningFlagComponent } from './empty-warning/empty-warning.docs';
import { ErrorFlagWithTitleComponent } from './error-flag-title/error-flag-title.docs';
import { ErrorFlagWithActionButtonFlagComponent } from './error-flag-with-action-button/error-flag-with-action-button.docs';
import { ErrorFlagWithLinkFlagComponent } from './error-flag-with-link/error-flag-with-link.docs';
import { ErrorFlagComponent } from './error-flag/error-flag.docs';
import { ErrorWithoutCloseIconButtonFlagComponent } from './error-without-close-icon-button/error-without-close-icon-button.docs';
import { InfoFlagWithActionButtonFlagComponent } from './info-flag-with-action-button/info-flag-with-action-button.docs';
import { InfoFlagWithLinkFlagComponent } from './info-flag-with-link/info-flag-with-link.docs';
import { InfoWithoutCloseIconButtonFlagComponent } from './info-without-close-icon-button/info-without-close-icon-button.docs';
import { SuccessFlagWithTitleComponent } from './success-flag-title/success-flag-title.docs';
import { SuccessFlagWithActionButtonFlagComponent } from './success-flag-with-action-button/success-flag-with-action-button.docs';
import { SuccessFlagWithLinkFlagComponent } from './success-flag-with-link/success-flag-with-link.docs';
import { SuccessFlagComponent } from './success-flag/success-flag.docs';
import { SuccessWithoutCloseIconButtonFlagComponent } from './success-without-close-icon-button/success-without-close-icon-button.docs';
import { WarningFlagWithTitleComponent } from './warning-flag-title/warning-flag-title.docs';
import { WarningFlagWithActionButtonFlagComponent } from './warning-flag-with-action-button/warning-flag-with-action-button.docs';
import { WarningFlagWithLinkFlagComponent } from './warning-flag-with-link/warning-flag-with-link.docs';
import { WarningFlagComponent } from './warning-flag/warning-flag.docs';
import { WarningWithoutCloseIconButtonFlagComponent } from './warning-without-close-icon-button/warning-without-close-icon-button.docs';

const examples = {
  EmptyErrorFlagComponent,
  EmptyFlagComponent,
  EmptySuccessFlagComponent,
  EmptyWarningFlagComponent,
  DefaultInfoFlagWithTitleComponent,
  DefaultInfoFlagComponent,
  ErrorFlagWithTitleComponent,
  ErrorFlagWithActionButtonFlagComponent,
  ErrorFlagWithLinkFlagComponent,
  ErrorFlagComponent,
  InfoFlagWithActionButtonFlagComponent,
  InfoFlagWithLinkFlagComponent,
  SuccessFlagWithTitleComponent,
  SuccessFlagWithActionButtonFlagComponent,
  SuccessFlagWithLinkFlagComponent,
  SuccessFlagComponent,
  WarningFlagWithTitleComponent,
  WarningFlagWithActionButtonFlagComponent,
  WarningFlagWithLinkFlagComponent,
  WarningFlagComponent,
  ErrorWithoutCloseIconButtonFlagComponent,
  InfoWithoutCloseIconButtonFlagComponent,
  SuccessWithoutCloseIconButtonFlagComponent,
  WarningWithoutCloseIconButtonFlagComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Flag examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
