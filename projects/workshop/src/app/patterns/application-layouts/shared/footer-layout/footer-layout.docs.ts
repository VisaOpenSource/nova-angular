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
import { Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';

@Component({
  imports: [NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-footer-layout',
  templateUrl: './footer-layout.docs.html'
})
export class FooterLayoutComponent {
  mockFooterData = [
    {
      path: './patterns/application-layouts',
      title: 'Contact us'
    },
    {
      path: './patterns/application-layouts',
      title: 'Privacy'
    },
    {
      path: './patterns/application-layouts',
      title: 'Terms of use'
    }
  ];
}
