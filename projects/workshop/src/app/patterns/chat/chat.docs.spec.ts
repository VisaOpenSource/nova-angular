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

import { HttpClient, HttpHandler } from '@angular/common/http';
import { WorkshopService } from '../../shared/services/workshop.service';

import { IdGenerator } from '@visa/nova-angular';

jest.useFakeTimers({ now: new Date('2025-01-01T12:00:00') });

// Dynamic imports so that fake timers are active when the module evaluates `new Date()`
let DialogChatComponent: any;
let FullPageChatComponent: any;
let PanelChatComponent: any;

beforeAll(async () => {
  ({ DialogChatComponent } = await import('./dialog-chat/dialog-chat.docs'));
  ({ FullPageChatComponent } = await import('./full-page-chat/full-page-chat.docs'));
  ({ PanelChatComponent } = await import('./panel-chat/panel-chat.docs'));
});

let examples: Record<string, any>;

beforeEach(() => {
  examples = {
    DialogChatComponent,
    FullPageChatComponent,
    PanelChatComponent,
  };
  IdGenerator.reset();
});

describe('Chat examples', () => {
  it.each(['DialogChatComponent', 'FullPageChatComponent', 'PanelChatComponent'])(
    '%s should render correctly',
    async (key) => {
      const { container } = await render(examples[key], {
        providers: [WorkshopService, HttpClient, HttpHandler],
      });
      expect(container).toMatchSnapshot();
    }
  );
});
