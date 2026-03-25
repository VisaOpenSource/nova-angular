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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-footer-extended',
  templateUrl: './extended.docs.html',
  styles: `
    .footer-main-column {
      flex-basis: calc(30% - 32px);
    }
    .footer-link-column {
      flex-basis: calc(15% - 32px);
    }
  ` // container width can be adjusted as needed
})
export class NovaFooterExtendedComponent {
  mockFooterData = [
    {
      title: 'Visa Inc.',
      links: [
        {
          path: './components/footer',
          title: 'Privacy'
        },
        {
          path: './components/footer',
          title: 'Terms of use'
        },
        {
          path: './components/footer',
          title: 'About Visa'
        }
      ]
    },
    {
      title: 'Support',
      links: [
        {
          path: './components/footer',
          title: 'FAQs'
        },
        {
          path: './components/footer',
          title: 'Feedback/Contact us'
        },
        {
          path: './components/footer',
          title: 'Online help'
        }
      ]
    },
    {
      title: 'Update Profile',
      links: [
        {
          path: './components/footer',
          title: 'My information'
        },
        {
          path: './components/footer',
          title: 'My security'
        },
        {
          path: './components/footer',
          title: 'My services'
        }
      ]
    },
    {
      title: 'Site Index',
      links: [
        {
          path: './components/footer',
          title: 'Alphabetized index'
        },
        {
          path: './components/footer',
          title: 'Site map'
        },
        {
          path: './components/footer',
          title: 'Topic index'
        }
      ]
    }
  ];
}
