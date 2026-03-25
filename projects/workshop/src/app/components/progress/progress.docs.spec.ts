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
import { NovaCompletedProgressBarProgressComponent } from './completed-progress-bar/completed-progress-bar.docs';
import { NovaCustomLinearProgressComponent } from './custom-linear-progress/custom-linear-progress.docs';
import { NovaCustomSizeCircularProgressComponent } from './custom-size-circular-progress/custom-size-circular-progress.docs';
import { NovaCustomSlowCircularProgressComponent } from './custom-slow-circular-progress/custom-slow-circular-progress.docs';
import { NovaDeterminateCircularProgressCompletedComponent } from './determinate-circular-progress-completed/determinate-circular-progress-completed.docs';
import { NovaDeterminateCircularSmallProgressComponent } from './determinate-circular-progress-small/determinate-circular-progress-small.docs';
import { NovaDeterminateCircularProgressComponent } from './determinate-circular-progress/determinate-circular-progress.docs';
import { NovaDeterminateProgressBarNoLabelProgressComponent } from './determinate-progress-bar-no-label/determinate-progress-bar-no-label.docs';
import { NovaDeterminateProgressBarProgressComponent } from './determinate-progress-bar/determinate-progress-bar.docs';
import { NovaErrorProgressCircularProgressComponent } from './error-circular-progress/error-circular-progress.docs';
import { NovaErrorProgressBarProgressComponent } from './error-progress-bar/error-progress-bar.docs';
import { NovaIndeterminateCircularProgressSmallComponent } from './indeterminate-circular-progress-small/indeterminate-circular-progress-small.docs';
import { NovaIndeterminateCircularProgressComponent } from './indeterminate-circular-progress/indeterminate-circular-progress.docs';
import { NovaIndeterminateProgressBarNoLabelProgressComponent } from './indeterminate-progress-bar-no-label/indeterminate-progress-bar-no-label.docs';
import { NovaIndeterminateProgressBarProgressComponent } from './indeterminate-progress-bar/indeterminate-progress-bar.docs';
import { NovaLiveCircularProgressComponent } from './live-circular-progress/live-circular-progress.docs';
import { NovaLiveProgressBarProgressComponent } from './live-progress-bar/live-progress-bar.docs';

const examples = {
  NovaCompletedProgressBarProgressComponent,
  NovaCustomLinearProgressComponent,
  NovaCustomSizeCircularProgressComponent,
  NovaCustomSlowCircularProgressComponent,
  NovaDeterminateCircularProgressCompletedComponent,
  NovaDeterminateCircularSmallProgressComponent,
  NovaDeterminateCircularProgressComponent,
  NovaDeterminateProgressBarNoLabelProgressComponent,
  NovaDeterminateProgressBarProgressComponent,
  NovaErrorProgressCircularProgressComponent,
  NovaErrorProgressBarProgressComponent,
  NovaIndeterminateCircularProgressSmallComponent,
  NovaIndeterminateCircularProgressComponent,
  NovaIndeterminateProgressBarNoLabelProgressComponent,
  NovaIndeterminateProgressBarProgressComponent,
  NovaLiveCircularProgressComponent,
  NovaLiveProgressBarProgressComponent
};

const keys = Object.keys(examples);

beforeEach(() => {
  IdGenerator.reset();
});

describe('Progress examples', () => {
  keys.forEach((key) => {
    it(`${key} should render correctly`, async () => {
      const { container } = await render(examples[key]);
      expect(container).toMatchSnapshot();
    });
  });
});
