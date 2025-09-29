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
import { Directive, Renderer2, RendererFactory2, Signal, contentChildren, inject } from '@angular/core';
import { DropdownItemDirective } from '../dropdown-item/dropdown-item.directive';
import { DOWN_ARROW_KEY, ESCAPE_KEY, LEFT_ARROW_KEY, RIGHT_ARROW_KEY, UP_ARROW_KEY } from '../nova-lib.constants';

@Directive({
  selector: '[vAddArrowKeys]',
  standalone: true
})
export class AddArrowKeysDirective {
  private readonly items: Signal<readonly DropdownItemDirective[]> = contentChildren(DropdownItemDirective, {
    descendants: true
  });
  private readonly renderer: Renderer2 = inject(RendererFactory2).createRenderer(null, null);

  ngAfterContentInit() {
    const itemsArray = this.items()?.filter((item) => !item.el.nativeElement.disabled) ?? [];

    if (!itemsArray.length) return;

    itemsArray.forEach((item, index) => {
      item.listenerService.navListeners.push(
        this.renderer.listen(item.el.nativeElement, 'keydown', (event: KeyboardEvent) => {
          if (
            event.key === ESCAPE_KEY ||
            ![DOWN_ARROW_KEY, RIGHT_ARROW_KEY, UP_ARROW_KEY, LEFT_ARROW_KEY].includes(event.key)
          )
            return;

          event.preventDefault();
          const isForward = [DOWN_ARROW_KEY, RIGHT_ARROW_KEY].includes(event.key);
          const nextIndex = isForward
            ? (index + 1) % itemsArray.length
            : (index - 1 + itemsArray.length) % itemsArray.length;
          itemsArray[nextIndex].el.nativeElement.focus();
        })
      );
    });
  }
}
