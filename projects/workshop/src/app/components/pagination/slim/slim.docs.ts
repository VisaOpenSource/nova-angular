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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ButtonDirective,
  FlexDirective,
  PaginationControl,
  PaginationDirective,
  PaginationOverflowDirective
} from '@visa/nova-angular';
import { VisaChevronLeftTiny, VisaChevronRightTiny, VisaOptionHorizontalTiny } from '@visa/nova-icons-angular';

/** @docs */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-workshop-pagination-slim',
  templateUrl: './slim.docs.html',
  standalone: true,
  imports: [
    ButtonDirective,
    FlexDirective,
    PaginationDirective,
    PaginationOverflowDirective,
    VisaChevronLeftTiny,
    VisaOptionHorizontalTiny,
    VisaChevronRightTiny
  ]
})
export class PaginationSlimComponent {
  readonly paginationControl = new PaginationControl({
    blockMaxLength: 5,
    compact: true,
    defaultSelected: 1,
    defaultTotalPages: 15
  });
}
