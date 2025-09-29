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
// START GENAI
import { Directive, ElementRef, Renderer2, OnChanges, SimpleChanges, inject, input } from '@angular/core';
import { UrlSanitizerService } from './safe-url.service';

@Directive({
  selector: '[safeUrl]',
  standalone: true
})
export class SafeUrlDirective implements OnChanges {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly urlSanitizerService = inject(UrlSanitizerService);
  readonly safeUrl = input<string>();

  ngOnChanges(changes: SimpleChanges): void {
    const safeUrl = this.safeUrl();
    if (changes['safeUrl'] && safeUrl) {
      const sanitizedUrl = this.urlSanitizerService.sanitizeUrl(safeUrl);
      this.renderer.setAttribute(this.el.nativeElement, 'src', sanitizedUrl);
    }
  }
}

// END GENAI
