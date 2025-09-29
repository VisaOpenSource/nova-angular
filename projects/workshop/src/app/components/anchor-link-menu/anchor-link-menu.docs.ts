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
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { MarkdownModule } from 'ngx-markdown';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaDefaultNestedAnchorLinkMenuComponent } from './default-nested/default-nested.docs';
import { NovaDefaultNoTitleAnchorLinkMenuComponent } from './default-no-title/default-no-title.docs';
import { NovaDefaultAnchorLinkMenuComponent } from './default/default.docs';
import { NovaRightToLeftAnchorLinkMenuComponent } from './right-to-left/right-to-left.docs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MarkdownModule,
    NovaLibModule,
    NovaSharedModule,
    NovaDefaultAnchorLinkMenuComponent,
    NovaDefaultNoTitleAnchorLinkMenuComponent,
    NovaDefaultNestedAnchorLinkMenuComponent,
    NovaRightToLeftAnchorLinkMenuComponent
  ],
  standalone: true,
  selector: 'nova-workshop-anchor-link-menu',
  templateUrl: './anchor-link-menu.docs.html'
})
export class AnchorLinkMenuDocsComponent {
  constructor() {
    this.workshopService.componentName.set('Anchor link menu');
    this.workshopService.neededAPI.set([
      { name: 'AnchorLinkMenuDirective' },
      { name: 'AnchorLinkMenuHeaderDirective' },
      { name: 'LinkDirective' },
      { name: 'NovaLibService', type: 'service-source' },
      { name: 'IdGenerator', type: 'service-source' }
    ]);
  }

  readonly workshopService = inject(WorkshopService);

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
