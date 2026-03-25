/**
 *              © 2026 Visa
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
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  numberAttribute,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdGenerator, NovaLibModule, PaginationControl } from '@visa/nova-angular';
import {
  VisaArrowEndTiny,
  VisaArrowStartTiny,
  VisaChevronDownTiny,
  VisaChevronLeftTiny,
  VisaChevronRightTiny,
  VisaChevronUpTiny,
  VisaOptionHorizontalTiny
} from '@visa/nova-icons-angular';

/** #AI-first */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nova-reusable-pagination',
  templateUrl: './reusable-component.docs.html',
  standalone: true,
  imports: [
    NovaLibModule,
    FormsModule,
    VisaArrowStartTiny,
    VisaChevronDownTiny,
    VisaChevronLeftTiny,
    VisaOptionHorizontalTiny,
    VisaChevronRightTiny,
    VisaArrowEndTiny,
    VisaChevronUpTiny
  ]
})
export class ReusablePagination {
  private initialized = false;

  // Unique ID for the pagination
  private readonly idGenerated = inject(IdGenerator).newId('reusable-pagination');

  // Inputs:
  readonly ariaLabel = input('Pagination for table', { alias: 'aria-label' });
  readonly compact = input(null, { transform: booleanAttribute });
  readonly disabledInput = input(false, { alias: 'disabled', transform: booleanAttribute });
  readonly endBlockSize = input(5, { transform: numberAttribute });
  readonly idInput = input<string | null>(null, { alias: 'id' });
  readonly inline = input(false, { transform: booleanAttribute });
  readonly itemsPerPage = model(10);
  readonly itemsPerPageOptions = input([5, 10, 15, 20]);
  readonly middleBlockSize = input(3, { transform: numberAttribute });
  readonly selectedPage = model<number>(1);
  readonly showItemsPerPage = input(true, { transform: booleanAttribute });
  readonly showPageRange = input(true, { transform: booleanAttribute });
  readonly startBlockSize = input(5, { transform: numberAttribute });
  readonly totalItems = input(100, { transform: numberAttribute });

  // State:
  readonly paginationControl = signal<PaginationControl>(
    new PaginationControl({
      selectedPage: this.selectedPage,
      defaultTotalPages: this.totalItems()
    })
  );

  // Computed values:
  protected readonly disabled = computed(() => this.disabledInput());
  protected readonly id = computed(() => this.idInput() ?? this.idGenerated);

  // Models:
  readonly pageRange = computed(() => {
    const control = this.paginationControl();
    return control.getToFrom(this.totalItems(), this.itemsPerPage());
  });

  // Effects:
  protected readonly blockSizeEffect = effect(() => {
    const startBlockSize = this.startBlockSize();
    const endBlockSize = this.endBlockSize();
    const middleBlockSize = this.middleBlockSize();
    const totalItems = this.totalItems();

    // Recreate the control when block sizes change
    const newControl = new PaginationControl({
      selectedPage: this.selectedPage,
      startBlockMaxLength: startBlockSize,
      endBlockMaxLength: endBlockSize,
      middleBlockMaxLength: middleBlockSize,
      defaultTotalPages: totalItems
    });
    this.paginationControl.set(newControl);
  });

  protected readonly compactEffect = effect(() => {
    const compact = this.compact();
    if (compact === null) return;
    this.paginationControl().compact.set(compact);
  });

  protected readonly resetEffect = effect(() => {
    // Reset when items per page changes
    const itemsPerPage = this.itemsPerPage();
    const totalItems = this.totalItems();
    this.paginationControl().resetPageCount(totalItems, itemsPerPage);
  });
}
