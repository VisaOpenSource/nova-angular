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
import {
  ChangeDetectorRef,
  Component,
  InputSignalWithTransform,
  OnInit,
  ViewEncapsulation,
  booleanAttribute,
  effect,
  inject,
  input,
  numberAttribute,
  signal
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaMaximizeTiny } from '@visa/nova-icons-angular';
import { MockDataKeys } from '../../../shared/services/mock-data.service';
import { WorkshopService } from '../../../shared/services/workshop.service';
import { CodeSnippetComponent } from '../code-snippet/code-snippet.component';
import { SafeUrlDirective } from '../safe-url/safe-url.directive';
@Component({
  selector: 'nova-workshop-example',
  templateUrl: './example.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaMaximizeTiny, RouterModule, CodeSnippetComponent, SafeUrlDirective],
  styleUrl: './example.docs.scss',
  encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit {
  readonly workshopService = inject(WorkshopService);
  private readonly cdRef = inject(ChangeDetectorRef);
  readonly exampleTitle = input('');
  readonly headingLevel = input(3, { transform: numberAttribute });

  readonly selector = input('');
  readonly codeSnippetsOnly = input(false);
  readonly loading = signal(true);
  exampleTitleID?: string;
  readonly iframeUrl = signal<string>('');

  readonly iframe: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(false, {
    transform: booleanAttribute
  });

  constructor() {
    effect(() => {
      if (!this.workshopService.docsJsonDataReady()) return;
      const match = this.workshopService.docsJsonData?.filter(
        (component: { selector: string }) => component.selector === this.selector().trim()
      )[0];
      if (!match) {
        this.loading.set(false);
        return;
      }
      this.templateData = match.templateData || match.template;
      this.exampleType = match.description.match(/#[a-zA-Z|\-]*/g);
      const matchingKeys = Object.keys(MockDataKeys).filter((key) => match.sourceCode.includes(key));
      if (matchingKeys.length > 0) {
        matchingKeys?.forEach((dataSet) => {
          fetch(`mock-data/${MockDataKeys[dataSet]}.json`)
            .then((res) => res.json())
            .then((data) => {
              if (!Array.isArray(data)) {
                throw new Error('Invalid data format');
              }
              if (data.length > 3) {
                data = data.slice(0, 3);
                this.exampleData =
                  this.exampleData +
                  `\n\n// ${dataSet}\n${JSON.stringify(data, null, 2).replace(/\]$/g, '  ...\n]\n')}`;
              } else {
                this.exampleData = this.exampleData + `\n\n// ${dataSet}\n${JSON.stringify(data, null, 2)}`;
              }
              this.cdRef.detectChanges();
            });
        });
      }
      this.exampleLink = match.file.split('/').slice(-4, -1).join('/'); // components/<component>/<example>
      this.iframeUrl.set('examples/' + this.exampleLink);
      this.sourceCode = match.sourceCode;
      if (!this.iframe()) {
        this.loading.set(false);
      }
    });
  }

  component = this.workshopService.componentName;

  ngOnInit(): void {
    if (this.exampleTitle() && !this.codeSnippetsOnly()) {
      this.exampleTitleID = this.exampleTitle()
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/\(|\)|,/g, '');
      const exampleData = { name: this.exampleTitle(), id: this.exampleTitleID };
      this.workshopService.examples.update((values) => (values ? [...values, exampleData] : [exampleData]));
    }
  }

  templateData?: string;
  sourceCode?: string;
  exampleData: string = '';
  exampleType: RegExpMatchArray | null = null;
  exampleLink = '';

  navigateTo(id?: string) {
    if (!id) return;
    this.workshopService.navigateTo(id);
  }

  handleiFrameLoad() {
    setTimeout(() => {
      this.loading.set(false);
    }, 500); // delay of half a second
  }
}
