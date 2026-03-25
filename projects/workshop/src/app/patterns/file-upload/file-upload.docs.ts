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
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { MultiFileUploadComponent } from './multi-file-upload/multi-file-upload.docs';
import { SingleFileUploadComponent } from './single-file-upload/single-file-upload.docs';
import { MultiFileManualUploadComponent } from './multi-file-manual-upload/multi-file-manual-upload.docs';
import { FileUploadWithAlternateDisplayComponent } from './file-upload-with-alternate-display/file-upload-with-alternate-display.docs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NovaSharedModule,
    NovaLibModule,
    MultiFileUploadComponent,
    SingleFileUploadComponent,
    MultiFileManualUploadComponent,
    FileUploadWithAlternateDisplayComponent,
  ],
  standalone: true,
  selector: 'nova-workshop-file-upload',
  templateUrl: './file-upload.docs.html',
})
export class FileUploadDocsComponent {
  readonly workshopService = inject(WorkshopService);
  constructor() {
    this.workshopService.componentName.set('File Upload');
    this.workshopService.neededAPI.set([]);
    this.workshopService.isLoadingExamples.set(true);

    afterNextRender(() => {
      this.workshopService.isLoadingExamples.set(false);
    });
  }
}
