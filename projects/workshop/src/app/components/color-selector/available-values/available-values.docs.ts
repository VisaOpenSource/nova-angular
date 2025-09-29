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
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaAccessibilityTiny } from '@visa/nova-icons-angular';

type RGB = {
  r: number;
  g: number;
  b: number;
};

type HSL = {
  h: number;
  s: number;
  l: number;
};

/** #custom */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaLibModule, VisaAccessibilityTiny],
  standalone: true,
  selector: 'nova-workshop-color-selector-available-values',
  templateUrl: './available-values.docs.html',
  styles: `
    input[type='color'] {
      cursor: pointer;
    }
    input[type='color' i]::-webkit-color-swatch {
      min-width: 46px;
      border: 1px solid lightgray;
      border-radius: var(--size-scalable-2);
    }
  ` // temporary inline styles as we work on adding them into nova-styles
})
export class AvailableValuesColorSelectorComponent implements OnInit {
  readonly hex = signal<string>('#a4afe0');
  readonly rgb = signal<RGB>({ r: 0, g: 0, b: 0 });
  readonly hsl = signal<HSL>({ h: 0, s: 0, l: 0 });

  ngOnInit(): void {
    this.getColors(this.hex());
  }

  /**
   * Convert hex color value to RGB value
   * Credit to (Learners Bucket)[https://learnersbucket.com/examples/interview/convert-hex-color-to-rgb-in-javascript/]
   * @param hex string of hex value to convert
   */
  hexToRGB(hex: string) {
    // hex.length < 6 means we were given a short form hex (ie. #fff)
    const isShortForm: boolean = hex.length < 6;
    const firstSplit = isShortForm ? 2 : 3;
    const secondSplit = isShortForm ? 3 : 5;

    let r = hex.slice(1, firstSplit);
    let g = hex.slice(firstSplit, secondSplit);
    let b = hex.slice(secondSplit, hex.length);

    return isShortForm
      ? { r: parseInt(r + r, 16), g: parseInt(g + g, 16), b: parseInt(b + b, 16) }
      : { r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16) };
  }

  /**
   * Convert hex color value to HSL value
   * Credit to (CSS Tricks)[https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hex-to-hsl]
   * @param hex string of hex value to convert
   */
  hexToHSL(rgb: RGB) {
    const { r, g, b } = rgb;
    let newR = r / 255;
    let newG = g / 255;
    let newB = b / 255;
    let cmin = Math.min(newR, newG, newB),
      cmax = Math.max(newR, newG, newB),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    else if (cmax == newR) h = ((newG - newB) / delta) % 6;
    else if (cmax == newG) h = (newB - newR) / delta + 2;
    else h = (newR - newG) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
  }

  getColors(hex: string) {
    const rgb = this.hexToRGB(hex);
    const hsl = this.hexToHSL(rgb);
    this.hex.set(hex);
    this.rgb.set(rgb);
    this.hsl.set(hsl);
  }
}
