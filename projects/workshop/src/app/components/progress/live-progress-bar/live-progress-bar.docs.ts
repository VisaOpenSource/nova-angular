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
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-progress-live-progress-bar',
  templateUrl: './live-progress-bar.docs.html'
})
export class NovaLiveProgressBarProgressComponent {
  linearTimer?: ReturnType<typeof setInterval>;
  readonly linearProgress = signal(0);
  readonly linearMax = signal(256);
  readonly percentage = computed(() =>
    Math.min(this.linearProgress() || Math.trunc((this.linearProgress() / this.linearMax()) * 100), 100)
  );
  readonly srStatusMessage = computed(() => {
    if (this.linearProgress() === this.linearMax()) return 'Loading complete';
    if (this.linearProgress() > 0) return 'Loading...';
    return '';
  });

  resetProgress() {
    this.resetTimer();
    this.linearProgress.set(0);
  }

  resetTimer() {
    if (this.linearTimer === undefined) return;
    clearInterval(this.linearTimer);
    this.linearTimer = undefined;
  }

  startProgressLinear() {
    this.resetProgress();
    this.linearTimer = setInterval(() => this.updateLinearProgress(), 40);
  }

  updateLinearProgress() {
    this.linearProgress.update((val) => val + 2);
    if (this.linearProgress() >= this.linearMax()) this.resetTimer();
  }
}
