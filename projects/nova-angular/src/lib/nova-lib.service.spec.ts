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
import { Component, viewChildren } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'; // <-- Add this import for jest-dom matchers
import { ButtonDirective } from './button/button.directive';
import { CheckboxDirective } from './checkbox/checkbox.directive';
import { LinkDirective } from './link/link.directive';
import { ListboxItemComponent } from './listbox-item/listbox-item.component';
import { ListboxDirective } from './listbox/listbox.directive';
import { NovaLibService } from './nova-lib.service';
import { TabItemDirective } from './tab-item/tab-item.directive';
import { TabListDirective } from './tab-list/tab-list.directive';

describe('NovaLibService', () => {
  describe('addArrowKeyNavigation', () => {
    it('should add arrow key navigation to listbox items', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-listbox>
            <li v-listbox-item value="item1" data-testid="item1">Item 1</li>
            <li v-listbox-item value="item2" data-testid="item2">Item 2</li>
            <li v-listbox-item value="item3" data-testid="item3">Item 3</li>
          </ul>
        `,
        imports: [ListboxDirective, ListboxItemComponent],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ListboxItemComponent);
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      service.addArrowKeyNavigation(fixture.componentInstance.items());
      const firstItem = screen.getByTestId('item1');
      await userEvent.click(firstItem);

      await userEvent.keyboard('{ArrowDown}');

      expect(firstItem.getAttribute('tabindex')).toBe('-1');
      const secondItem = screen.getByTestId('item2');
      expect(secondItem.getAttribute('tabindex')).toBe('0');

      await userEvent.keyboard('{ArrowUp}');
      expect(secondItem.getAttribute('tabindex')).toBe('-1');
      expect(firstItem.getAttribute('tabindex')).toBe('0');
    });

    it('should add arrow key navigation to button items', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <button v-button data-testid="item1" (focus)="item1Focus()">Item 1</button>
          <button v-button data-testid="item2" (focus)="item2Focus()">Item 2</button>
          <button v-button data-testid="item3" (focus)="item3Focus()">Item 3</button>
        `,
        imports: [ButtonDirective],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ButtonDirective);
        item1Focus = jest.fn();
        item2Focus = jest.fn();
        item3Focus = jest.fn();
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      await fixture.whenStable();
      fixture.detectChanges();

      service.addArrowKeyNavigation(fixture.componentInstance.items());
      const firstItem = screen.getByTestId('item1');
      await userEvent.click(firstItem);

      await userEvent.keyboard('{ArrowDown}');
      expect(fixture.componentInstance.item2Focus).toHaveBeenCalled();

      await userEvent.keyboard('{ArrowUp}');
      expect(fixture.componentInstance.item1Focus).toHaveBeenCalled();

      await userEvent.keyboard('{ArrowDown}');
      expect(fixture.componentInstance.item2Focus).toHaveBeenCalled();

      await userEvent.keyboard('{ArrowDown}');
      expect(fixture.componentInstance.item3Focus).toHaveBeenCalled();
    });

    it('should add arrow key navigation to checkbox items', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <input v-checkbox data-testid="item1" (focus)="item1Focus($event)" />
          <input v-checkbox data-testid="item2" (focus)="item2Focus($event)" />
          <input v-checkbox data-testid="item3" (focus)="item3Focus($event)" />
        `,
        imports: [CheckboxDirective],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(CheckboxDirective);
        item1Focus = jest.fn();
        item2Focus = jest.fn();
        item3Focus = jest.fn();
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      await fixture.whenStable();
      fixture.detectChanges();

      service.addArrowKeyNavigation(fixture.componentInstance.items());
      const firstItem = screen.getByTestId('item1');
      await userEvent.click(firstItem);

      await userEvent.keyboard('{ArrowDown}');
      expect(fixture.componentInstance.item2Focus).toHaveBeenCalled();

      await userEvent.keyboard('{ArrowUp}');
      expect(fixture.componentInstance.item1Focus).toHaveBeenCalled();
    });

    describe('with remove tab navigation', () => {
      it('should remove tab navigation from items', async () => {
        @Component({
          selector: 'test-component',
          template: `
            <ul v-listbox>
              <li v-listbox-item value="item1" data-testid="item1">Item 1</li>
              <li v-listbox-item value="item2" data-testid="item2">Item 2</li>
              <li v-listbox-item value="item3" data-testid="item3">Item 3</li>
            </ul>
          `,
          imports: [ListboxDirective, ListboxItemComponent],
          standalone: true
        })
        class TestComponent {
          public readonly items = viewChildren(ListboxItemComponent);
        }
        const { fixture } = await render(TestComponent, {
          providers: [NovaLibService]
        });

        const service = fixture.debugElement.injector.get(NovaLibService);

        service.addArrowKeyNavigation(fixture.componentInstance.items(), true);
        const firstItem = screen.getByTestId('item1');
        const secondItem = screen.getByTestId('item2');
        await userEvent.click(firstItem);

        await userEvent.keyboard('{ArrowDown}');
        expect(firstItem.getAttribute('tabindex')).toBe('-1');
        expect(secondItem.getAttribute('tabindex')).toBe('0');

        // Tab key should not focus the next item, ie - no changes
        await userEvent.keyboard('{Tab}');
        const lastItem = screen.getByTestId('item3');
        expect(lastItem.getAttribute('tabindex')).not.toBe('0');
      });

      it('should remove focus with shift+tab', async () => {
        @Component({
          selector: 'test-component',
          template: `
            <ul v-listbox>
              <li v-listbox-item value="item1" data-testid="item1">Item 1</li>
              <li v-listbox-item value="item2" data-testid="item2">Item 2</li>
              <li v-listbox-item value="item3" data-testid="item3">Item 3</li>
            </ul>
          `,
          imports: [ListboxDirective, ListboxItemComponent],
          standalone: true
        })
        class TestComponent {
          public readonly items = viewChildren(ListboxItemComponent);
        }
        const { fixture } = await render(TestComponent, {
          providers: [NovaLibService]
        });

        const service = fixture.debugElement.injector.get(NovaLibService);

        service.addArrowKeyNavigation(fixture.componentInstance.items(), true);
        const firstItem = screen.getByTestId('item1');
        await userEvent.click(firstItem); // Focus the first item
        await userEvent.keyboard('{ArrowUp}'); // Move focus to the last item
        const lastItem = screen.getByTestId('item3');
        expect(lastItem.getAttribute('tabindex')).toBe('0');
        // Shift+Tab should not focus the previous item
        await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
        const secondItem = screen.getByTestId('item2');
        expect(secondItem.getAttribute('tabindex')).toBe('-1');
      });
    });
  });
  describe('resetNavigation', () => {
    it('should reset navigation for listbox items', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-listbox>
            <li v-listbox-item value="item1" data-testid="item1">Item 1</li>
            <li v-listbox-item value="item2" data-testid="item2">Item 2</li>
            <li v-listbox-item value="item3" data-testid="item3">Item 3</li>
          </ul>
        `,
        imports: [ListboxDirective, ListboxItemComponent],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ListboxItemComponent);
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      service.addArrowKeyNavigation(fixture.componentInstance.items());
      const firstItem = screen.getByTestId('item1');
      const secondItem = screen.getByTestId('item2');
      await userEvent.click(firstItem);

      await userEvent.keyboard('{ArrowDown}');
      expect(firstItem.getAttribute('tabindex')).toBe('-1');

      service.resetNavigationBehaviors(fixture.componentInstance.items());
      expect(firstItem.getAttribute('tabindex')).toBeNull();
      expect(secondItem.getAttribute('tabindex')).toBeNull();
    });

    it('should reset tab buttons to tab key navigation only', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-tabs>
            <li v-tab-item [active]="selectedButtonTab === 0">
              <button v-button data-testid="item1" (focus)="item1Focus($event)">Item 1</button>
            </li>
            <li v-tab-item [active]="selectedButtonTab === 1">
              <button v-button data-testid="item2" (focus)="item2Focus($event)">Item 2</button>
            </li>
            <li v-tab-item [active]="selectedButtonTab === 2">
              <button v-button data-testid="item3" (focus)="item3Focus($event)">Item 3</button>
            </li>
          </ul>
        `,
        imports: [TabListDirective, TabItemDirective, ButtonDirective],
        standalone: true
      })
      class TestComponent {
        public readonly tabItems = viewChildren(TabItemDirective);
        public readonly buttonItems = viewChildren(ButtonDirective);
        selectedButtonTab = 0;
        item1Focus = jest.fn();
        item2Focus = jest.fn();
        item3Focus = jest.fn();
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      service.addArrowKeyNavigation(fixture.componentInstance.buttonItems());
      const firstItem = screen.getByTestId('item1');
      await userEvent.click(firstItem);

      await userEvent.keyboard('{ArrowDown}');
      expect(fixture.componentInstance.item2Focus).toHaveBeenCalled();

      // navigation reset on tabs should remove the added arrow key navigation and default to tab navigation
      service.resetNavigationBehaviors(fixture.componentInstance.buttonItems());
      const secondItem = screen.getByTestId('item2');
      await userEvent.click(secondItem);

      await userEvent.keyboard('{ArrowDown}');
      expect(fixture.componentInstance.item3Focus).not.toHaveBeenCalled();

      await userEvent.keyboard('{Tab}');
      expect(fixture.componentInstance.item3Focus).toHaveBeenCalled();
    });
  });

  describe('findStartingFocus', () => {
    it('should find the first focusable element in a listbox', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-listbox>
            <li v-listbox-item value="item1" data-testid="item1">Item 1</li>
            <li v-listbox-item value="item2" data-testid="item2">Item 2</li>
            <li v-listbox-item value="item3" data-testid="item3">Item 3</li>
          </ul>
        `,
        imports: [ListboxDirective, ListboxItemComponent],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ListboxItemComponent);
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);
      service.findStartingFocus(fixture.componentInstance.items());
      const firstItem = screen.getByTestId('item1');
      expect(firstItem.getAttribute('tabindex')).toBe('0');
    });

    it('should set the first focusable element to an active/selected item, if available', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-listbox>
            <li v-listbox-item value="item1" data-testid="item1">Item 1</li>
            <li v-listbox-item value="item2" data-testid="item2" [active]="true">Item 2</li>
            <li v-listbox-item value="item3" data-testid="item3">Item 3</li>
          </ul>
        `,
        imports: [ListboxDirective, ListboxItemComponent],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ListboxItemComponent);
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);
      service.findStartingFocus(fixture.componentInstance.items());
      const firstItem = screen.getByTestId('item1');
      const secondItem = screen.getByTestId('item2');
      expect(firstItem.getAttribute('tabindex')).toBe('-1');
      expect(secondItem.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('nextEnabledItem', () => {
    it('should find the next enabled item in a listbox', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-listbox>
            <li v-listbox-item value="item1" data-testid="item1">Item 1</li>
            <li v-listbox-item value="item2" data-testid="item2" [disabled]="true">Item 2</li>
            <li v-listbox-item value="item3" data-testid="item3">Item 3</li>
          </ul>
        `,
        imports: [ListboxDirective, ListboxItemComponent],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ListboxItemComponent);
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      // index of last item
      expect(service.nextEnabledItem(fixture.componentInstance.items(), 0)).toBe(2);
      expect(service.nextEnabledItem(fixture.componentInstance.items(), 1)).toBe(2);

      // should loop back around
      expect(service.nextEnabledItem(fixture.componentInstance.items(), 2)).toBe(0);
    });
  });

  describe('lastEnabledItem', () => {
    it('should find the last enabled item in a listbox', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-listbox>
            <li v-listbox-item value="item1" data-testid="item1">Item 1</li>
            <li v-listbox-item value="item2" data-testid="item2" [disabled]="true">Item 2</li>
            <li v-listbox-item value="item3" data-testid="item3">Item 3</li>
          </ul>
        `,
        imports: [ListboxDirective, ListboxItemComponent],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ListboxItemComponent);
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      // index of last item
      expect(service.lastEnabledItem(fixture.componentInstance.items())).toBe(2);
    });

    it('should return -1 if no enabled items are found', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-listbox>
            <li v-listbox-item value="item1" data-testid="item1" [disabled]="true">Item 1</li>
            <li v-listbox-item value="item2" data-testid="item2" [disabled]="true">Item 2</li>
          </ul>
        `,
        imports: [ListboxDirective, ListboxItemComponent],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ListboxItemComponent);
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      expect(service.lastEnabledItem(fixture.componentInstance.items())).toBeLessThan(0);
    });

    it('should skip over disabled items when finding the last enabled item', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-listbox>
            <li v-listbox-item value="item1" data-testid="item1">Item 1</li>
            <li v-listbox-item value="item2" data-testid="item2">Item 2</li>
            <li v-listbox-item value="item3" data-testid="item3" [disabled]="true">Item 3</li>
          </ul>
        `,
        imports: [ListboxDirective, ListboxItemComponent],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ListboxItemComponent);
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      // index of second item
      expect(service.lastEnabledItem(fixture.componentInstance.items())).toBe(1);
    });
  });

  describe('firstEnabledItem', () => {
    it('should find the first enabled item in a listbox', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-listbox>
            <li v-listbox-item value="item1" data-testid="item1">Item 1</li>
            <li v-listbox-item value="item2" data-testid="item2" [disabled]="true">Item 2</li>
            <li v-listbox-item value="item3" data-testid="item3">Item 3</li>
          </ul>
        `,
        imports: [ListboxDirective, ListboxItemComponent],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ListboxItemComponent);
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      // index of first item
      expect(service.firstEnabledItem(fixture.componentInstance.items())).toBe(0);
    });

    it('should return -1 if no enabled items are found', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-listbox>
            <li v-listbox-item value="item1" data-testid="item1" [disabled]="true">Item 1</li>
            <li v-listbox-item value="item2" data-testid="item2" [disabled]="true">Item 2</li>
          </ul>
        `,
        imports: [ListboxDirective, ListboxItemComponent],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ListboxItemComponent);
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      expect(service.firstEnabledItem(fixture.componentInstance.items())).toBeLessThan(0);
    });
    it('should skip over disabled items when finding the first enabled item', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-listbox>
            <li v-listbox-item value="item1" data-testid="item1" [disabled]="true">Item 1</li>
            <li v-listbox-item value="item2" data-testid="item2">Item 2</li>
            <li v-listbox-item value="item3" data-testid="item3">Item 3</li>
          </ul>
        `,
        imports: [ListboxDirective, ListboxItemComponent],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ListboxItemComponent);
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      // index of second item
      expect(service.firstEnabledItem(fixture.componentInstance.items())).toBe(1);
    });
  });

  describe('previousEnabledItem', () => {
    it('should find the previous enabled item in a listbox', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-listbox>
            <li v-listbox-item value="item1" data-testid="item1">Item 1</li>
            <li v-listbox-item value="item2" data-testid="item2" [disabled]="true">Item 2</li>
            <li v-listbox-item value="item3" data-testid="item3">Item 3</li>
          </ul>
        `,
        imports: [ListboxDirective, ListboxItemComponent],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ListboxItemComponent);
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      // index of first item
      expect(service.previousEnabledItem(fixture.componentInstance.items(), 2)).toBe(0);
      expect(service.previousEnabledItem(fixture.componentInstance.items(), 1)).toBe(0);

      // should loop back around
      expect(service.previousEnabledItem(fixture.componentInstance.items(), 0)).toBe(2);
    });
  });

  describe('addAutomaticActivation', () => {
    it('should add automatic activation to listbox items', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-listbox>
            <li v-listbox-item value="item1" data-testid="item1">Item 1</li>
            <li v-listbox-item value="item2" data-testid="item2">Item 2</li>
            <li v-listbox-item value="item3" data-testid="item3">Item 3</li>
          </ul>
        `,
        imports: [ListboxDirective, ListboxItemComponent],
        standalone: true
      })
      class TestComponent {
        public readonly items = viewChildren(ListboxItemComponent);
        item1Activated = jest.fn();
        item2Activated = jest.fn();
        item3Activated = jest.fn();
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      service.addAutomaticActivation(fixture.componentInstance.items());
      const firstItem = screen.getByTestId('item1');
      const secondItem = screen.getByTestId('item2');
      const thirdItem = screen.getByTestId('item3');
      await userEvent.click(firstItem);

      expect(firstItem.getAttribute('aria-selected')).toBe('true');

      await userEvent.keyboard('{ArrowDown}');
      expect(secondItem.getAttribute('aria-selected')).toBe('true');
      expect(firstItem.getAttribute('aria-selected')).toBe('false');

      await userEvent.keyboard('{ArrowDown}');
      expect(thirdItem.getAttribute('aria-selected')).toBe('true');
      expect(secondItem.getAttribute('aria-selected')).toBe('false');

      await userEvent.keyboard('{ArrowUp}');
      expect(secondItem.getAttribute('aria-selected')).toBe('true');
      expect(thirdItem.getAttribute('aria-selected')).toBe('false');
    });

    it('should add automatic activation to tab items', async () => {
      @Component({
        selector: 'test-component',
        template: `
          <ul v-tabs>
            <li v-tab-item [active]="selectedButtonTab === 0">
              <button v-button data-testid="item1" (click)="updateActive(0)">Item 1</button>
            </li>
            <li v-tab-item [active]="selectedButtonTab === 1">
              <button v-button data-testid="item2" (click)="updateActive(1)">Item 2</button>
            </li>
            <li v-tab-item [active]="selectedButtonTab === 2">
              <button v-button data-testid="item3" (click)="updateActive(2)">Item 3</button>
            </li>
          </ul>
        `,
        imports: [TabListDirective, TabItemDirective, ButtonDirective],
        standalone: true
      })
      class TestComponent {
        public readonly tabItems = viewChildren(TabItemDirective);
        public readonly buttonItems = viewChildren(ButtonDirective);
        selectedButtonTab = 0;

        updateActive(index: number) {
          this.selectedButtonTab = index;
        }
      }
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });

      const service = fixture.debugElement.injector.get(NovaLibService);

      service.addArrowKeyNavigation(fixture.componentInstance.buttonItems());
      service.addAutomaticActivation(fixture.componentInstance.tabItems());
      const firstItem = screen.getByTestId('item1');
      const secondItem = screen.getByTestId('item2');
      const thirdItem = screen.getByTestId('item3');
      await userEvent.click(firstItem);
      expect(firstItem.getAttribute('aria-selected')).toBe('true');

      await userEvent.keyboard('{ArrowDown}');
      fixture.detectChanges();
      expect(secondItem.getAttribute('aria-selected')).toBe('true');
      expect(firstItem.getAttribute('aria-selected')).toBe('false');

      await userEvent.keyboard('{ArrowDown}');
      expect(thirdItem.getAttribute('aria-selected')).toBe('true');
      expect(secondItem.getAttribute('aria-selected')).toBe('false');

      await userEvent.keyboard('{ArrowUp}');
      expect(secondItem.getAttribute('aria-selected')).toBe('true');
      expect(thirdItem.getAttribute('aria-selected')).toBe('false');
    });
  });

  describe('setAriaCurrent', () => {
    it('should set aria-current="true" on the element with the given id', async () => {
      // Arrange
      document.body.innerHTML = `<a id="link1"></a>`;
      const { fixture } = await render('<div></div>', {
        providers: [
          NovaLibService,
          {
            provide: 'AppReadyService',
            useValue: { checkDocumentExists: () => true }
          }
        ]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);

      // Act
      service.setAriaCurrent('link1');

      // Assert
      expect(document.getElementById('link1')?.getAttribute('aria-current')).toBe('true');
    });

    it('should set aria-current="false" on the previous element', async () => {
      document.body.innerHTML = `<a id="link1" aria-current="true"></a><a id="link2"></a>`;
      const { fixture } = await render('<div></div>', {
        providers: [
          NovaLibService,
          {
            provide: 'AppReadyService',
            useValue: { checkDocumentExists: () => true }
          }
        ]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);

      // Set the first link as current
      service.setAriaCurrent('link1');
      // Now set the second link as current
      service.setAriaCurrent('link2');

      expect(document.getElementById('link1')?.getAttribute('aria-current')).toBe('false');
      expect(document.getElementById('link2')?.getAttribute('aria-current')).toBe('true');
    });

    it('should warn if the element is not found', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const { fixture } = await render('<div></div>', {
        providers: [
          NovaLibService,
          {
            provide: 'AppReadyService',
            useValue: { checkDocumentExists: () => true }
          }
        ]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);

      service.setAriaCurrent('notfound');
      expect(warnSpy).toHaveBeenCalledWith('NovaLibService: setAriaCurrent could not find element with id: notfound');
      warnSpy.mockRestore();
    });

    it('should throw a console warning if DOCUMENT is null', async () => {
      document.body.innerHTML = `<a id="link1"></a>`;
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const { fixture } = await render('<div></div>', {
        providers: [
          NovaLibService,
          {
            provide: Document,
            useValue: null
          }
        ]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);

      // Simulate DOCUMENT being null
      service['document'] = null;

      service.setAriaCurrent('link1');
      // check for partial match using expect.stringContaining
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('NovaLibService:'));
      warnSpy.mockRestore();
    });
  });

  describe('handleAriaCurrent', () => {
    @Component({
      template: `
        <a v-link data-testid="link1">Link 1</a>
        <a v-link data-testid="link2">Link 2</a>
        <a v-link data-testid="link3">Link 3</a>
      `,
      imports: [LinkDirective],
      standalone: true
    })
    class TestComponent {
      public links = viewChildren(LinkDirective);
    }

    it('should set aria-current="true" on clicked link and "false" on others', async () => {
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);

      // Wait for viewChildren to populate
      await fixture.whenStable();
      const links = fixture.componentInstance.links();

      // Initially, no aria-current
      expect(screen.getByTestId('link1')).not.toHaveAttribute('aria-current');
      expect(screen.getByTestId('link2')).not.toHaveAttribute('aria-current');
      expect(screen.getByTestId('link3')).not.toHaveAttribute('aria-current');

      // Add aria-current handling
      service.handleAriaCurrent(links);

      // Click link2
      await screen.getByTestId('link2').click();

      expect(screen.getByTestId('link2')).toHaveAttribute('aria-current', 'true');
      expect(screen.getByTestId('link1')).toHaveAttribute('aria-current', 'false');
      expect(screen.getByTestId('link3')).toHaveAttribute('aria-current', 'false');

      // Click link3
      await screen.getByTestId('link3').click();

      expect(screen.getByTestId('link3')).toHaveAttribute('aria-current', 'true');
      expect(screen.getByTestId('link1')).toHaveAttribute('aria-current', 'false');
      expect(screen.getByTestId('link2')).toHaveAttribute('aria-current', 'false');
    });

    it('should do nothing if a link has no el.nativeElement', async () => {
      const { fixture } = await render(TestComponent, {
        providers: [NovaLibService]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);

      await fixture.whenStable();
      const links = fixture.componentInstance.links();

      // Simulate a broken link (no el.nativeElement)
      Object.defineProperty(links[1], 'el', { get: () => undefined });

      // Should not throw
      expect(() => service.handleAriaCurrent(links)).not.toThrow();
    });
  });

  describe('all methods should not run if no items are given', () => {
    it('should return undefined if no items are given for addArrowKeyNavigation', async () => {
      const { fixture } = await render('<div></div>', {
        providers: [NovaLibService]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);
      expect(service.addArrowKeyNavigation(undefined as any)).toBeUndefined();
    });

    it('should return undefined if no items are given for resetNavigationBehaviors', async () => {
      const { fixture } = await render('<div></div>', {
        providers: [NovaLibService]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);
      expect(service.resetNavigationBehaviors(undefined as any)).toBeUndefined();
    });

    it('should return undefined if no items are given for findStartingFocus', async () => {
      const { fixture } = await render('<div></div>', {
        providers: [NovaLibService]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);
      expect(service.findStartingFocus(undefined as any)).toBeUndefined();
    });

    it('should return -1 if no items are given for nextEnabledItem', async () => {
      const { fixture } = await render('<div></div>', {
        providers: [NovaLibService]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);
      expect(service.nextEnabledItem(undefined as any, 0)).toBe(-1);
    });

    it('should return -1 if no items are given for lastEnabledItem', async () => {
      const { fixture } = await render('<div></div>', {
        providers: [NovaLibService]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);
      expect(service.lastEnabledItem(undefined as any)).toBe(-1);
    });

    it('should return -1 if no items are given for firstEnabledItem', async () => {
      const { fixture } = await render('<div></div>', {
        providers: [NovaLibService]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);
      expect(service.firstEnabledItem(undefined as any)).toBe(-1);
    });

    it('should return -1 if no items are given for previousEnabledItem', async () => {
      const { fixture } = await render('<div></div>', {
        providers: [NovaLibService]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);
      expect(service.previousEnabledItem(undefined as any, 0)).toBe(-1);
    });

    it('should return undefined if no items are given for addAutomaticActivation', async () => {
      const { fixture } = await render('<div></div>', {
        providers: [NovaLibService]
      });
      const service = fixture.debugElement.injector.get(NovaLibService);
      expect(service.addAutomaticActivation(undefined as any)).toBeUndefined();
    });
  });
});
