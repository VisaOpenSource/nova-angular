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
import { NovaLibModule } from '@visa/nova-angular';
import { FooterLayoutComponent } from '../shared/footer-layout/footer-layout.docs';
import { StackedNavLayoutComponent } from './stacked-nav-layout/stacked-nav-layout.docs';

/**
 * Layout with stacked horizontal navigation.
 * Combines two-tier navigation (top bar and secondary menu), content area, and footer.
 * #patterns
 **/
@Component({
  selector: 'nova-workshop-stacked-horizontal-application-layout',
  templateUrl: './stacked-horizontal-application-layout.docs.html',
  styleUrls: ['./stacked-layout.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, NovaLibModule, FooterLayoutComponent, StackedNavLayoutComponent]
})
export class StackedHorizontalApplicationLayoutComponent {}
