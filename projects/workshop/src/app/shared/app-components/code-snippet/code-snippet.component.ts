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
import { Component, input } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronRightTiny, VisaCodeForkAltTiny } from '@visa/nova-icons-angular';
import { CodeSnippetSingleComponent } from '../code-snippet-single/code-snippet-single.component';

@Component({
  selector: 'nova-workshop-code-snippet',
  templateUrl: './code-snippet.component.html',
  standalone: true,
  imports: [NovaLibModule, CodeSnippetSingleComponent, VisaCodeForkAltTiny, VisaChevronRightTiny, VisaChevronDownTiny],
  host: {
    class: 'w-code-snippet v-mt-12'
  },
  styleUrl: './code-snippet.component.scss'
})
export class CodeSnippetComponent {
  readonly templateData = input<string>();
  readonly sourceCode = input<string>();
  readonly exampleData = input<string>();
  readonly selector = input('');
  readonly ariaLabel = input<string | undefined>('');
  readonly exampleTitle = input<string>('');
  example?: string;
  NOVA_ANGULAR = 'nova-workshop-';

  ngOnInit() {
    this.example = this.selector().split(this.NOVA_ANGULAR)[1];
  }
}
