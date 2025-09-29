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

import { EmptyErrorBannerComponent } from './empty-error/empty-error.docs';
import { EmptyInfoBannerComponent } from './empty-info/empty-info.docs';
import { EmptySuccessBannerComponent } from './empty-success/empty-success.docs';
import { EmptyWarningBannerComponent } from './empty-warning/empty-warning.docs';
import { DefaultInfoBannerWithPersistentComponent } from './nova-default-info-banner-persistent/nova-default-info-banner-persistent.docs';
import { DefaultInfoBannerWithTitleComponent } from './nova-default-info-banner-title/nova-default-info-banner-title.docs';
import { DefaultInfoBannerBannerComponent } from './nova-default-info-banner/nova-default-info-banner.docs';
import { ErrorPersistentBannerComponent } from './nova-error-banner-persistent/nova-error-banner-persistent.docs';
import { ErrorTitleBannerComponent } from './nova-error-banner-title/nova-error-banner-title.docs';
import { ErrorBannerWithActionButtonBannerComponent } from './nova-error-banner-with-action-button/nova-error-banner-with-action-button.docs';
import { ErrorBannerWithLinkBannerComponent } from './nova-error-banner-with-link/nova-error-banner-with-link.docs';
import { ErrorBannerBannerComponent } from './nova-error-banner/nova-error-banner.docs';
import { InfoBannerWithActionButtonBannerComponent } from './nova-info-banner-with-action-button/nova-info-banner-with-action-button.docs';
import { InfoBannerWithLinkBannerComponent } from './nova-info-banner-with-link/nova-info-banner-with-link.docs';
import { SuccessPersistentBannerComponent } from './nova-success-banner-persistent/nova-success-banner-persistent.docs';
import { SuccessTitleBannerComponent } from './nova-success-banner-title/nova-success-banner-title.docs';
import { SuccessBannerWithActionButtonBannerComponent } from './nova-success-banner-with-action-button/nova-success-banner-with-action-button.docs';
import { SuccessBannerWithLinkBannerComponent } from './nova-success-banner-with-link/nova-success-banner-with-link.docs';
import { SuccessBannerBannerComponent } from './nova-success-banner/nova-success-banner.docs';
import { WarningPersistentBannerComponent } from './nova-warning-banner-persistent/nova-warning-banner-persistent.docs';
import { WarningTitleBannerComponent } from './nova-warning-banner-title/nova-warning-banner-title.docs';
import { WarningBannerWithActionButtonBannerComponent } from './nova-warning-banner-with-action-button/nova-warning-banner-with-action-button.docs';
import { WarningBannerWithLinkBannerComponent } from './nova-warning-banner-with-link/nova-warning-banner-with-link.docs';
import { WarningBannerBannerComponent } from './nova-warning-banner/nova-warning-banner.docs';
import { IdGenerator } from '@visa/nova-angular';

const examples = {
  EmptyErrorBannerComponent,
  EmptyInfoBannerComponent,
  EmptySuccessBannerComponent,
  EmptyWarningBannerComponent,
  DefaultInfoBannerWithPersistentComponent,
  DefaultInfoBannerWithTitleComponent,
  DefaultInfoBannerBannerComponent,
  ErrorPersistentBannerComponent,
  ErrorTitleBannerComponent,
  ErrorBannerWithActionButtonBannerComponent,
  ErrorBannerWithLinkBannerComponent,
  ErrorBannerBannerComponent,
  InfoBannerWithActionButtonBannerComponent,
  InfoBannerWithLinkBannerComponent,
  SuccessPersistentBannerComponent,
  SuccessTitleBannerComponent,
  SuccessBannerWithActionButtonBannerComponent,
  SuccessBannerWithLinkBannerComponent,
  SuccessBannerBannerComponent,
  WarningPersistentBannerComponent,
  WarningTitleBannerComponent,
  WarningBannerWithActionButtonBannerComponent,
  WarningBannerWithLinkBannerComponent,
  WarningBannerBannerComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Banner examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
