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
import { ButtonAsLinkButtonComponent } from './button-as-link/button-as-link.docs';
import { DestructivePrimaryButtonComponent } from './destructive-primary/destructive-primary.docs';
import { DestructiveSecondaryButtonComponent } from './destructive-secondary/destructive-secondary.docs';
import { DestructiveTertiaryButtonComponent } from './destructive-tertiary/destructive-tertiary.docs';
import { IconButtonPrimaryAlternateButtonComponent } from './icon-button-primary-alternate/icon-button-primary-alternate.docs';
import { IconButtonPrimaryDisabledButtonComponent } from './icon-button-primary-disabled/icon-button-primary-disabled.docs';
import { IconButtonPrimaryLabelButtonComponent } from './icon-button-primary-label/icon-button-primary-label.docs';
import { IconButtonPrimaryLargeButtonComponent } from './icon-button-primary-large/icon-button-primary-large.docs';
import { IconButtonPrimarySmallButtonComponent } from './icon-button-primary-small/icon-button-primary-small.docs';
import { IconButtonPrimaryButtonComponent } from './icon-button-primary/icon-button-primary.docs';
import { IconButtonSecondaryAlternateButtonComponent } from './icon-button-secondary-alternate/icon-button-secondary-alternate.docs';
import { IconButtonSecondaryDisabledButtonComponent } from './icon-button-secondary-disabled/icon-button-secondary-disabled.docs';
import { IconButtonSecondaryLabelButtonComponent } from './icon-button-secondary-label/icon-button-secondary-label.docs';
import { IconButtonSecondaryLargeButtonComponent } from './icon-button-secondary-large/icon-button-secondary-large.docs';
import { IconButtonSecondaryButtonComponent } from './icon-button-secondary/icon-button-secondary.docs';
import { PrimaryAlternateButtonComponent } from './primary-alternate/primary-alternate.docs';
import { PrimaryDefaultButtonComponent } from './primary-default/primary-default.docs';
import { PrimaryDisabledButtonComponent } from './primary-disabled/primary-disabled.docs';
import { PrimaryLargeButtonComponent } from './primary-large/primary-large.docs';
import { PrimaryLeadingIconButtonComponent } from './primary-leading-icon/primary-leading-icon.docs';
import { PrimarySmallButtonComponent } from './primary-small/primary-small.docs';
import { PrimaryTrailingIconButtonComponent } from './primary-trailing-icon/primary-trailing-icon.docs';
import { SecondaryAlternateButtonComponent } from './secondary-alternate/secondary-alternate.docs';
import { SecondaryDefaultButtonComponent } from './secondary-default/secondary-default.docs';
import { SecondaryDisabledButtonComponent } from './secondary-disabled/secondary-disabled.docs';
import { SecondaryLargeButtonComponent } from './secondary-large/secondary-large.docs';
import { SecondaryLeadingIconButtonComponent } from './secondary-leading-icon/secondary-leading-icon.docs';
import { SecondarySmallButtonComponent } from './secondary-small/secondary-small.docs';
import { SecondaryTrailingIconButtonComponent } from './secondary-trailing-icon/secondary-trailing-icon.docs';
import { StackedIconButtonAlternateButtonComponent } from './stacked-icon-button-alternate/stacked-icon-button-alternate.docs';
import { StackedIconButtonDefaultButtonComponent } from './stacked-icon-button-default/stacked-icon-button-default.docs';
import { TertiaryAlternateButtonComponent } from './tertiary-alternate/tertiary-alternate.docs';
import { TertiaryDefaultButtonComponent } from './tertiary-default/tertiary-default.docs';
import { TertiaryDisabledButtonComponent } from './tertiary-disabled/tertiary-disabled.docs';
import { TertiaryLargeButtonComponent } from './tertiary-large/tertiary-large.docs';
import { TertiaryLeadingIconButtonComponent } from './tertiary-leading-icon/tertiary-leading-icon.docs';
import { TertiarySmallButtonComponent } from './tertiary-small/tertiary-small.docs';
import { TertiaryTrailingIconButtonComponent } from './tertiary-trailing-icon/tertiary-trailing-icon.docs';
import { UiIconAlternateButtonComponent } from './ui-icon-alternate/ui-icon-alternate.docs';
import { UiIconBadgeButtonComponent } from './ui-icon-badge/ui-icon-badge.docs';
import { UiIconLargeButtonComponent } from './ui-icon-large/ui-icon-large.docs';
import { UiIconMediumButtonComponent } from './ui-icon-medium/ui-icon-medium.docs';
import { UiIconSmallButtonComponent } from './ui-icon-small/ui-icon-small.docs';
import { UiIconSubtleButtonComponent } from './ui-icon-subtle/ui-icon-subtle.docs';

const examples = {
  ButtonAsLinkButtonComponent,
  DestructivePrimaryButtonComponent,
  DestructiveSecondaryButtonComponent,
  DestructiveTertiaryButtonComponent,
  IconButtonPrimaryAlternateButtonComponent,
  IconButtonPrimaryDisabledButtonComponent,
  IconButtonPrimaryLabelButtonComponent,
  IconButtonPrimaryLargeButtonComponent,
  IconButtonPrimarySmallButtonComponent,
  IconButtonPrimaryButtonComponent,
  IconButtonSecondaryAlternateButtonComponent,
  IconButtonSecondaryDisabledButtonComponent,
  IconButtonSecondaryLabelButtonComponent,
  IconButtonSecondaryLargeButtonComponent,
  IconButtonSecondaryButtonComponent,
  PrimaryAlternateButtonComponent,
  PrimaryDefaultButtonComponent,
  PrimaryDisabledButtonComponent,
  PrimaryLargeButtonComponent,
  PrimaryLeadingIconButtonComponent,
  PrimarySmallButtonComponent,
  PrimaryTrailingIconButtonComponent,
  SecondaryAlternateButtonComponent,
  SecondaryDefaultButtonComponent,
  SecondaryDisabledButtonComponent,
  SecondaryLargeButtonComponent,
  SecondaryLeadingIconButtonComponent,
  SecondarySmallButtonComponent,
  SecondaryTrailingIconButtonComponent,
  StackedIconButtonAlternateButtonComponent,
  StackedIconButtonDefaultButtonComponent,
  TertiaryAlternateButtonComponent,
  TertiaryDefaultButtonComponent,
  TertiaryDisabledButtonComponent,
  TertiaryLargeButtonComponent,
  TertiaryLeadingIconButtonComponent,
  TertiarySmallButtonComponent,
  TertiaryTrailingIconButtonComponent,
  UiIconAlternateButtonComponent,
  UiIconBadgeButtonComponent,
  UiIconLargeButtonComponent,
  UiIconMediumButtonComponent,
  UiIconSmallButtonComponent,
  UiIconSubtleButtonComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Button examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
