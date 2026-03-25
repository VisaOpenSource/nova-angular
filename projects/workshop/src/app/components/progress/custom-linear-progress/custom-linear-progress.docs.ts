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
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaMediaPauseAltTiny, VisaMediaPlayAltTiny } from '@visa/nova-icons-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaLibModule, VisaMediaPlayAltTiny, VisaMediaPauseAltTiny],
  standalone: true,
  selector: 'nova-workshop-progress-custom-linear-progress',
  templateUrl: './custom-linear-progress.docs.html',
  styles: `
    .my-progress {
      --v-progress-bar-border-radius: 0px;
      --v-progress-bar-background-color: #0099ff11;
      --v-progress-bar-foreground-color: #0099ff;
      --v-progress-bar-thickness: 6px;
    }
  `
})
export class NovaCustomLinearProgressComponent {
  readonly initiate = signal(false);
  readonly isPaused = signal(false);

  initiateProgress() {
    this.initiate.update((prevState) => !prevState);
  }

  resetProgress() {
    this.initiate.set(false);
    this.isPaused.set(false);
  }

  togglePause() {
    this.isPaused.update((paused) => !paused);
  }
}
