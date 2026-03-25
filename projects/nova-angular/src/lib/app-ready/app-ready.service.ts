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
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

/**
 * @note Where possible, use Angular's new `afterRender` and `afterNextRender` lifecycle hooks instead of this service.
 * This service is used internally by the library and can optionally be used directly. <br />
 * It’s required for SSR integration but not necessary for functions behind Angular's renderer.
 */
@Injectable({
  providedIn: 'root'
})
export class AppReadyService {
  private document: Document | null = inject(DOCUMENT, { optional: true });
  private platformId: object = inject(PLATFORM_ID);

  /**
   * The isPlatformBrowser property checks if the platform is a browser (as opposed to server).
   */
  public readonly isPlatformBrowser: boolean = isPlatformBrowser(this.platformId);

  /**
   * The isBrowserAndDomAvailable property checks for both the document and the browser platform.
   */
  public readonly isBrowserAndDomAvailable: boolean = !!this.document && this.isPlatformBrowser;
}
