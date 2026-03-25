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
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { DialogChatComponent } from './dialog-chat/dialog-chat.docs';
import { FullPageChatComponent } from './full-page-chat/full-page-chat.docs';

/** #patterns **/
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaSharedModule, NovaLibModule, DialogChatComponent, FullPageChatComponent],
  standalone: true,
  selector: 'nova-workshop-chat',
  templateUrl: './chat.docs.html'
})
export class ChatDocsComponent {
  readonly workshopService = inject(WorkshopService);
  constructor() {
    this.workshopService.componentName.set('Chat');
  }
}
