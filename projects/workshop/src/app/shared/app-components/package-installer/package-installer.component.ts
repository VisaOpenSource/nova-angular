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
import { Component, computed, input, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { CodeSnippetSingleComponent } from '../code-snippet-single/code-snippet-single.component';
import { VisaMaximizeTiny } from '@visa/nova-icons-angular';

type FormatterProps = {
  versionRanged?: boolean;
  version?: string;
};
const packageManagers = [
  {
    formatter: (packageName: string, { version, versionRanged }: FormatterProps) =>
      `npm install ${packageName}${version ? `@${versionRanged ? '^' : ''}${version}` : ''}`,
    name: 'NPM'
  },
  {
    formatter: (packageName: string, { version, versionRanged }: FormatterProps) =>
      `pnpm install ${packageName}${version ? `@${versionRanged ? '^' : ''}${version}` : ''}`,
    name: 'PNPM'
  },
  {
    formatter: (packageName: string, { version, versionRanged }: FormatterProps) =>
      `yarn add ${packageName}${version ? `@${versionRanged ? '^' : ''}${version}` : ''}`,
    name: 'Yarn'
  },
  {
    formatter: (packageName: string, { version }: FormatterProps) =>
      `bun add ${packageName}${version ? `@${version}` : ''}`,
    name: 'Bun'
  }
];

@Component({
  selector: 'nova-workshop-package-installer',
  templateUrl: './package-installer.component.html',
  standalone: true,
  imports: [NovaLibModule, CodeSnippetSingleComponent, VisaMaximizeTiny]
})
export class PackageInstallerComponent {
  readonly description = input<string>();
  readonly packageLink = input<string>();
  readonly packageName = input.required<string>();
  readonly packageOfficialName = input<string>();
  readonly title = input<string>();
  readonly version = input<string>();
  readonly versionRanged = input<boolean>(false);

  readonly packageManagers = packageManagers;
  readonly selectedIndex = signal(0);

  readonly currentPackageManager = computed(() => this.packageManagers[this.selectedIndex()]);

  readonly installCommand = computed(() =>
    this.currentPackageManager().formatter(this.packageName(), {
      version: this.version(),
      versionRanged: this.versionRanged()
    })
  );

  onIndexChange = (index: number) => {
    this.selectedIndex.set(index);
  };
}
