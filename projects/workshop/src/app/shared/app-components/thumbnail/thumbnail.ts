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
//src: https://stackoverflow.com/questions/53066823/how-do-i-import-svg-from-file-to-a-component-in-angular-5
import { HttpClient } from '@angular/common/http';
import { Component, inject, input, OnChanges, OutputRefSubscription, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { SafeHtmlDirective } from '../safe-html/safe-html.directive';
import { HtmlSanitizerService } from '../safe-html/safe-html.service';

@Component({
  selector: 'nova-workshop-thumbnail',
  template: `@if (svgIcon()) {
    <span [safeHtml]="svgIcon()"></span>
  }`,
  standalone: true,
  imports: [NovaLibModule, SafeHtmlDirective]
})
export class ThumbnailComponent implements OnChanges {
  readonly componentsGraphic = input<boolean>();
  private readonly httpClient = inject(HttpClient);
  private readonly htmlSanitizerService = inject(HtmlSanitizerService);
  readonly name = input<string>();
  readonly svgIcon = signal<string | null>(null);
  private httpSubscription?: OutputRefSubscription;

  ngOnChanges(): void {
    if (!this.name() && !this.componentsGraphic()) return;

    const assetUrl = this.componentsGraphic() ? 'imgs/components-graphic.svg' : `thumbnails/${this.name()}-graphic.svg`;
    this.httpSubscription = this.httpClient.get(assetUrl, { responseType: 'text' }).subscribe((value) => {
      this.svgIcon.set(this.htmlSanitizerService.sanitizeHtml(value));
    });
  }

  ngOnDestroy(): void {
    this.httpSubscription?.unsubscribe();
    this.svgIcon.set(null);
  }
}
