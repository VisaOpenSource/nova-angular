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

import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FooterLayoutComponent } from '../shared/footer-layout/footer-layout.docs';
import { VerticalMixedNavLayoutComponent } from './vertical-mixed-nav-layout/vertical-mixed-nav-layout.docs';
import { HorizontalMixedNavLayoutComponent } from './horizontal-mixed-nav-layout/horizontal-mixed-nav-layout.docs';

/**
 * Layout combining horizontal and vertical navigation.
 * Includes top navigation bar, sidebar, content area, and footer.
 * #patterns
 **/
@Component({
  selector: 'nova-workshop-mixed-application-layout',
  templateUrl: './mixed-application-layout.docs.html',
  styleUrls: ['./mixed-layout.docs.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, FooterLayoutComponent, VerticalMixedNavLayoutComponent, HorizontalMixedNavLayoutComponent]
})
export class MixedApplicationLayoutComponent {}
