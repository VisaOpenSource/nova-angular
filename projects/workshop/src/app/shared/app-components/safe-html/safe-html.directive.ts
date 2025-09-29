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
import { Directive, ElementRef, inject, OnChanges, Renderer2, SimpleChanges, input } from '@angular/core';
import { HtmlSanitizerService } from './safe-html.service';

@Directive({
  selector: '[safeHtml]',
  standalone: true
})
export class SafeHtmlDirective implements OnChanges {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly htmlSanitizerService = inject(HtmlSanitizerService);
  readonly safeHtml = input<string | boolean | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    // allow boolean value `false` to be passed if needed
    const safeHtml = this.safeHtml();
    if (changes['safeHtml'] && safeHtml !== null) {
      const sanitizedHtml = this.htmlSanitizerService.sanitizeHtml(safeHtml.toString());
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', sanitizedHtml);
    }
  }
}

// END GENAI
