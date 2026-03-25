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
import { Component } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { render } from '@testing-library/angular';

import { IdGenerator } from '@visa/nova-angular';
import { VerticalWithActiveElementNavComponent } from './active-element/active-element.docs';
import { VerticalAlternateWithActiveElementNavComponent } from './alternate-with-active-element/alternate-with-active-element.docs';
import { AlternateWithIconsVerticalNavComponent } from './alternate-with-icons/alternate-with-icons.docs';
import { AlternateVerticalNavComponent } from './alternate/alternate.docs';
import { DefaultVerticalNavComponent } from './default/default.docs';
import { LinksOnlyVerticalNavComponent } from './links-only/links-only.docs';
import { NestedWithSectionTitleVerticalNavComponent } from './nested-with-section-titles/nested-with-section-titles.docs';
import { NestedVerticalNavComponent } from './nested/nested.docs';
import { WithIconsVerticalNavComponent } from './with-icons/with-icons.docs';
import { WithSectionTitleVerticalNavComponent } from './with-section-titles/with-section-titles.docs';

const examples = {
  VerticalWithActiveElementNavComponent,
  VerticalAlternateWithActiveElementNavComponent,
  AlternateWithIconsVerticalNavComponent,
  AlternateVerticalNavComponent,
  DefaultVerticalNavComponent,
  LinksOnlyVerticalNavComponent,
  NestedWithSectionTitleVerticalNavComponent,
  NestedVerticalNavComponent,
  WithIconsVerticalNavComponent,
  WithSectionTitleVerticalNavComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

@Component({ template: '', standalone: true })
class DummyComponent {}

describe('Vertical navigation examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container, fixture } = await render(examples[key], {
        providers: [
          provideRouter([
            { path: '', component: DummyComponent },
            { path: 'components/vertical-navigation', component: DummyComponent }
          ])
        ]
      });

      const router = fixture.debugElement.injector.get(Router);
      await router.navigate(['/']);
      fixture.detectChanges();

      expect(container).toMatchSnapshot();
    });
  });
});
