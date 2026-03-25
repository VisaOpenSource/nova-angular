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
import { render } from '@testing-library/angular';

import { IdGenerator } from '@visa/nova-angular';
import { CharacterCounterInputComponent } from './character-counter/character-counter.docs';
import { DefaultInputComponent } from './default/default.docs';
import { DisabledInputComponent } from './disabled/disabled.docs';
import { ErrorInputComponent } from './error/error.docs';
import { InitialValueInputComponent } from './initial-value/initial-value.docs';
import { InlineMessageInputComponent } from './inline-message/inline-message.docs';
import { InlineInputComponent } from './inline/inline.docs';
import { LeadingIconInputComponent } from './leading-icon/leading-icon.docs';
import { ModelDrivenFbInputComponent } from './model-driven-fb/model-driven-fb.docs';
import { ModelDrivenFormInputComponent } from './model-driven-form/model-driven-form.docs';
import { ModelDrivenInputComponent } from './model-driven/model-driven.docs';
import { OneTimePasscodeInputComponent } from './one-time-passcode/one-time-passcode.docs';
import { PrefixInputComponent } from './prefix/prefix.docs';
import { ReadOnlyInputComponent } from './read-only/read-only.docs';
import { ReusableInputDemo } from './reusable/reusable.docs';
import { SuffixInputComponent } from './suffix/suffix.docs';
import { TemplateDrivenFormInputComponent } from './template-driven-form/template-driven-form.docs';
import { TemplateDrivenInputComponent } from './template-driven/template-driven.docs';
import { TextareaWithFixedHeightAndResizeInputComponent } from './textarea-with-fixed-height-and-resize/textarea-with-fixed-height-and-resize.docs';
import { TextareaWithFixedHeightInputComponent } from './textarea-with-fixed-height/textarea-with-fixed-height.docs';
import { TextareaWithNativeRowsAttributeInputComponent } from './textarea-with-native-rows-attribute/textarea-with-native-rows-attribute.docs';
import { TextareaWithResizeInputComponent } from './textarea-with-resize/textarea-with-resize.docs';
import { TextareaWithoutResizeInputComponent } from './textarea-without-resize/textarea-without-resize.docs';
import { WithActionButtonInputComponent } from './with-action-button/with-action-button.docs';
import { WithClearTextButtonInputComponent } from './with-clear-text-button/with-clear-text-button.docs';
import { WithMaskedFieldInputComponent } from './with-masked-field/with-masked-field.docs';

const examples = {
  CharacterCounterInputComponent,
  DefaultInputComponent,
  DisabledInputComponent,
  ErrorInputComponent,
  InitialValueInputComponent,
  InlineInputComponent,
  InlineMessageInputComponent,
  LeadingIconInputComponent,
  ModelDrivenFbInputComponent,
  ModelDrivenFormInputComponent,
  ModelDrivenInputComponent,
  OneTimePasscodeInputComponent,
  PrefixInputComponent,
  ReadOnlyInputComponent,
  SuffixInputComponent,
  TemplateDrivenFormInputComponent,
  TemplateDrivenInputComponent,
  TextareaWithFixedHeightAndResizeInputComponent,
  TextareaWithFixedHeightInputComponent,
  TextareaWithNativeRowsAttributeInputComponent,
  TextareaWithoutResizeInputComponent,
  TextareaWithResizeInputComponent,
  WithActionButtonInputComponent,
  WithClearTextButtonInputComponent,
  WithMaskedFieldInputComponent,
  ReusableInputDemo
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Input examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container, fixture } = await render(examples[key]);
      fixture.detectChanges();
      expect(container).toMatchSnapshot();
    });
  });
});
