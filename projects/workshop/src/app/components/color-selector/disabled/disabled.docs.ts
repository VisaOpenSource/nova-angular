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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaAccessibilityTiny } from '@visa/nova-icons-angular';

/** #custom */
/** @ignore */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaLibModule, VisaAccessibilityTiny],
  standalone: true,
  selector: 'nova-workshop-color-selector-disabled',
  templateUrl: './disabled.docs.html',
  styles: `
    input[type='color']::-webkit-color-swatch {
      min-width: 46px;
      border: 1px solid lightgray;
      border-radius: var(--size-scalable-2);
    }
    input[type='color']:disabled::-webkit-color-swatch {
      block-size: 0;
      align-self: center;
    }
    input[type='color'] + .v-label {
      cursor: default;
      pointer-events: none;
      --v-label-color: var(--v-input-disabled-color);
    }
  ` // temporary inline styles as we work on adding them into nova-styles
})
export class DisabledColorSelectorComponent {}
