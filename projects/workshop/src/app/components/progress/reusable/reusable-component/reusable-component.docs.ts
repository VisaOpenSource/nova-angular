/**
 *              © 2026 Visa
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
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  numberAttribute
} from '@angular/core';
import { IdGenerator, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny, VisaSuccessTiny } from '@visa/nova-icons-angular';

/** We need this because the progress bar's size inversely affects its thickness, meaning the smaller the size, the thicker the progress bar */
interface InverseScaleOptions {
  offset?: number;
  min?: number;
  max?: number;
}
const defaultInverseScaleOptions: Required<InverseScaleOptions> = { offset: 0, min: 0, max: 100 };
function inverseScale(value: number, scaler: number, options: InverseScaleOptions): number {
  const { offset, min, max } = { ...defaultInverseScaleOptions, ...options };
  const result = scaler / (value + offset);
  return Math.max(min, Math.min(result, max));
}

/** #AI-first */
@Component({
  selector: 'nova-reusable-progress',
  imports: [NovaLibModule, VisaErrorTiny, VisaSuccessTiny],
  templateUrl: './reusable-component.docs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .circular-progress-label {
      block-size: 100%;
      inline-size: 100%;
    }
    .progress-paused {
      animation-play-state: paused !important;
    }
  `
})
export class ReusableProgress {
  // Unique ID for the input
  private readonly generatedId = inject(IdGenerator).newId('reusable-progress');

  // Inputs:
  readonly ariaHidden = input<string | null>(null, { alias: 'aria-hidden' });
  readonly ariaLabelledBy = input<string | null>(null, { alias: 'aria-labelledby' });
  readonly determinate = input(false, { transform: booleanAttribute });
  readonly hidePercentage = input(false, { transform: booleanAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly inline = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  /** Only applies to circular progress */
  readonly label = input<string>();
  readonly max = input(100, { transform: numberAttribute });
  readonly message = input('Loading...');
  readonly paused = input(null, { transform: booleanAttribute });
  readonly percentage = input(null, { transform: numberAttribute });
  readonly role = input<HTMLElement['role']>(null);
  readonly showLabel = input(null, { transform: booleanAttribute });
  readonly showMessage = input(false, { transform: booleanAttribute });
  readonly size = input(0, { transform: numberAttribute });
  /** Only applies to circular progress */
  readonly small = input(null, { transform: booleanAttribute });
  /** Only applies to circular progress */
  readonly speed = input(null, { transform: (v) => numberAttribute(v, 1) });
  readonly type = input<'linear' | 'circular'>('circular');
  readonly value = input(0, { transform: numberAttribute });

  // Computed values:
  protected readonly complete = computed(
    () => this.determinate() && (this.percentage() === 100 || this.value() >= this.max())
  );
  /** Only applies to circular progress */
  protected readonly circularProgressStyles = computed(() => {
    const size = this.size();
    if (!size || this.small() || size === 0) return null;
    const defaultThickness = 5;
    const maxThickness = 14;
    // The smaller the size the thinner the progress bar should be, but we cap it at a max thickness
    const thickness = Math.ceil(inverseScale(size, defaultThickness, { max: maxThickness, min: 2 })) + 'px';
    return {
      transform: `scale(${size})`,
      'block-size': `calc(var(--v-progress-circular-size) * ${size})`,
      'inline-size': `calc(var(--v-progress-circular-size) * ${size})`,
      display: 'grid',
      'justify-content': 'center',
      'align-content': 'center',
      '--v-progress-bar-thickness': thickness
    };
  });
  protected readonly id = computed(() => this.idInput() ?? this.generatedId);
  /** Only applies to circular progress */
  protected readonly progressVisible = computed(() => {
    const size = this.size();
    const sizeBigEnough = size === null || typeof size === 'string' || (typeof size === 'number' && size >= 0.5);
    return this.determinate() && !this.hidePercentage() && sizeBigEnough;
  });
}
