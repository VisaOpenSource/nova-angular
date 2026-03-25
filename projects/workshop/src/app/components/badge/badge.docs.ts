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
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { MarkdownModule } from 'ngx-markdown';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { DefaultBadgeComponent } from './default/default.docs';
import { LongNumberBadgeComponent } from './long-number/long-number.docs';
import { NegativeIconNoBackgroundBadgeComponent } from './negative-icon-no-background/negative-icon-no-background.docs';
import { NegativeIconOnlyBadgeComponent } from './negative-icon-only/negative-icon-only.docs';
import { NegativeLabelOnlyBadgeComponent } from './negative-label-only/negative-label-only.docs';
import { NegativeNoBackgroundBadgeComponent } from './negative-no-background/negative-no-background.docs';
import { NegativeWithEllipseBadgeComponent } from './negative-with-ellipse/negative-with-ellipse.docs';
import { NegativeWithIconBadgeComponent } from './negative-with-icon/negative-with-icon.docs';
import { NeutralIconNoBackgroundBadgeComponent } from './neutral-icon-no-background/neutral-icon-no-background.docs';
import { NeutralIconOnlyBadgeComponent } from './neutral-icon-only/neutral-icon-only.docs';
import { NeutralLabelOnlyBadgeComponent } from './neutral-label-only/neutral-label-only.docs';
import { NeutralNoBackgroundBadgeComponent } from './neutral-no-background/neutral-no-background.docs';
import { NeutralWithEllipseBadgeComponent } from './neutral-with-ellipse/neutral-with-ellipse.docs';
import { NeutralWithIconBadgeComponent } from './neutral-with-icon/neutral-with-icon.docs';
import { NumberNoBackgroundBadgeComponent } from './number-no-background/number-no-background.docs';
import { NumberBadgeComponent } from './number/number.docs';
import { StableIconNoBackgroundBadgeComponent } from './stable-icon-no-background/stable-icon-no-background.docs';
import { StableIconOnlyBadgeComponent } from './stable-icon-only/stable-icon-only.docs';
import { StableLabelOnlyBadgeComponent } from './stable-label-only/stable-label-only.docs';
import { StableNoBackgroundBadgeComponent } from './stable-no-background/stable-no-background.docs';
import { StableWithEllipseBadgeComponent } from './stable-with-ellipse/stable-with-ellipse.docs';
import { StableWithIconBadgeComponent } from './stable-with-icon/stable-with-icon.docs';
import { SubtleIconNoBackgroundBadgeComponent } from './subtle-icon-no-background/subtle-icon-no-background.docs';
import { SubtleIconOnlyBadgeComponent } from './subtle-icon-only/subtle-icon-only.docs';
import { SubtleLabelOnlyBadgeComponent } from './subtle-label-only/subtle-label-only.docs';
import { SubtleNoBackgroundBadgeComponent } from './subtle-no-background/subtle-no-background.docs';
import { SubtleWithEllipseBadgeComponent } from './subtle-with-ellipse/subtle-with-ellipse.docs';
import { SubtleWithIconBadgeComponent } from './subtle-with-icon/subtle-with-icon.docs';
import { WarningIconNoBackgroundBadgeComponent } from './warning-icon-no-background/warning-icon-no-background.docs';
import { WarningIconOnlyBadgeComponent } from './warning-icon-only/warning-icon-only.docs';
import { WarningLabelOnlyBadgeComponent } from './warning-label-only/warning-label-only.docs';
import { WarningNoBackgroundBadgeComponent } from './warning-no-background/warning-no-background.docs';
import { WarningWithEllipseBadgeComponent } from './warning-with-ellipse/warning-with-ellipse.docs';
import { WarningWithIconBadgeComponent } from './warning-with-icon/warning-with-icon.docs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MarkdownModule,
    NovaLibModule,
    NovaSharedModule,
    NegativeLabelOnlyBadgeComponent,
    NegativeWithEllipseBadgeComponent,
    NegativeNoBackgroundBadgeComponent,
    DefaultBadgeComponent,
    NeutralLabelOnlyBadgeComponent,
    NeutralNoBackgroundBadgeComponent,
    NeutralWithEllipseBadgeComponent,
    StableLabelOnlyBadgeComponent,
    StableWithEllipseBadgeComponent,
    StableNoBackgroundBadgeComponent,
    WarningLabelOnlyBadgeComponent,
    WarningWithEllipseBadgeComponent,
    WarningNoBackgroundBadgeComponent,
    SubtleLabelOnlyBadgeComponent,
    SubtleWithEllipseBadgeComponent,
    SubtleNoBackgroundBadgeComponent,
    NumberBadgeComponent,
    NumberNoBackgroundBadgeComponent,
    LongNumberBadgeComponent,
    NegativeWithIconBadgeComponent,
    NegativeIconOnlyBadgeComponent,
    NegativeIconNoBackgroundBadgeComponent,
    NeutralWithIconBadgeComponent,
    NeutralIconNoBackgroundBadgeComponent,
    NeutralIconOnlyBadgeComponent,
    StableIconNoBackgroundBadgeComponent,
    StableIconOnlyBadgeComponent,
    StableWithIconBadgeComponent,
    WarningWithIconBadgeComponent,
    SubtleWithIconBadgeComponent,
    WarningIconOnlyBadgeComponent,
    WarningIconNoBackgroundBadgeComponent,
    SubtleWithIconBadgeComponent,
    SubtleIconOnlyBadgeComponent,
    SubtleIconNoBackgroundBadgeComponent
  ],
  standalone: true,
  selector: 'nova-workshop-badge',
  templateUrl: './badge.docs.html'
})
export class BadgeDocsComponent {
  readonly workshopService = inject(WorkshopService);

  constructor() {
    this.workshopService.componentName.set('Badge');
    this.workshopService.neededAPI.set([
      { name: 'BadgeDirective', type: 'directive' },
      { name: 'BadgeType', type: 'constant' },
      { name: 'IdGenerator', type: 'service-source' }
    ]);
  }
}
