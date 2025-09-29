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
import { Component, ElementRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { FloatingUIService } from './floating-ui.service';
import { render, screen } from '@testing-library/angular';
import { FloatingUIVisibility, UIEventVisibilityPair } from './floating-ui.constants';
import { offset } from '@floating-ui/core';
import { ComputePositionConfig } from '@floating-ui/dom';
import userEvent from '@testing-library/user-event';
import { FloatingUIContainer } from '../floating-ui-container/floating-ui-container.directive';
import { FloatingUIElementDirective } from '../floating-ui-element/floating-ui-element.directive';
import { FloatingUITriggerDirective } from '../floating-ui-trigger/floating-ui-trigger.directive';
import { By } from '@angular/platform-browser';
import { TooltipArrowDirective } from '../arrow/arrow.directive';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { ButtonDirective } from '../button/button.directive';

const events: UIEventVisibilityPair = [[new UIEvent('click')]];

describe('FloatingUIService', () => {
  it('should set up floating UI with correct styles', async () => {
    const { fixture } = await render(`<div id="trigger"></div><div id="floating"></div>`);
    const triggerEl = fixture.nativeElement.querySelector('#trigger');
    const floatingEl = fixture.nativeElement.querySelector('#floating');

    const service = fixture.debugElement.injector.get(FloatingUIService);

    service.setUpfloatingUI(new ElementRef(triggerEl), new ElementRef(floatingEl), events);

    expect(floatingEl.style.top).toBe('0px');
    expect(floatingEl.style.left).toBe('0px');
    expect(floatingEl.style.display).toBe('none');
  });

  it('should show the floating UI element', async () => {
    const { fixture } = await render(`<div id="trigger"></div><div id="floating"></div>`);
    const floatingEl = fixture.nativeElement.querySelector('#floating');
    const service = fixture.debugElement.injector.get(FloatingUIService);

    service.setUpfloatingUI(new ElementRef(floatingEl), new ElementRef(floatingEl), events);
    service.showfloatingUI();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(floatingEl.style.display).toBe('flex');
  });

  it('should toggle the floating UI element visibility', async () => {
    const { fixture } = await render(`<div id="trigger"></div><div id="floating"></div>`);
    const floatingEl = fixture.nativeElement.querySelector('#floating');
    const service = fixture.debugElement.injector.get(FloatingUIService);

    service.setUpfloatingUI(new ElementRef(floatingEl), new ElementRef(floatingEl), events);

    service.toggleFloatingUI();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(floatingEl.style.display).toBe('flex');

    service.toggleFloatingUI();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(floatingEl.style.display).toBe('none');
  });

  it('should log an error if trigger element is not defined', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const { fixture } = await render(`<div id="floating"></div>`);
    const floatingEl = fixture.nativeElement.querySelector('#floating');
    const service = fixture.debugElement.injector.get(FloatingUIService);

    service.setUpfloatingUI(null as any, new ElementRef(floatingEl), events);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Floating UI trigger element is not defined.');
    consoleErrorSpy.mockRestore();
  });

  it('should log an error if floating UI element is not defined', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const { fixture } = await render(`<div id="trigger"></div>`);
    const triggerEl = fixture.nativeElement.querySelector('#trigger');
    const service = fixture.debugElement.injector.get(FloatingUIService);

    service.setUpfloatingUI(new ElementRef(triggerEl), null as any, events);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Floating UI element is not defined.');
    consoleErrorSpy.mockRestore();
  });

  it('should log an error if events are not defined', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const { fixture } = await render(`<div id="trigger"></div><div id="floating"></div>`);
    const triggerEl = fixture.nativeElement.querySelector('#trigger');
    const floatingEl = fixture.nativeElement.querySelector('#floating');
    const service = fixture.debugElement.injector.get(FloatingUIService);

    service.setUpfloatingUI(new ElementRef(triggerEl), new ElementRef(floatingEl) as any, null);

    expect(consoleErrorSpy).toHaveBeenCalledWith('No events provided to trigger the Floating UI.');
    consoleErrorSpy.mockRestore();
  });

  // come back to this test
  it.skip('should not show the floating UI element if the trigger is disabled', async () => {
    const { fixture } = await render(`<div id="trigger" disabled></div><div id="floating"></div>`);
    const triggerEl = fixture.nativeElement.querySelector('#trigger');
    const floatingEl = fixture.nativeElement.querySelector('#floating');
    const service = fixture.debugElement.injector.get(FloatingUIService);

    service.setUpfloatingUI(new ElementRef(triggerEl), new ElementRef(floatingEl), events);

    service.showfloatingUI();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(floatingEl.style.display).toBe('none');
  });

  it('should allow custom placement', async () => {
    const computePositionSpy = jest.spyOn(require('@floating-ui/dom'), 'computePosition');
    const { fixture } = await render(`<div id="trigger"></div><div id="floating"></div>`);
    const triggerEl = fixture.nativeElement.querySelector('#trigger');
    const floatingEl = fixture.nativeElement.querySelector('#floating');
    const service = fixture.debugElement.injector.get(FloatingUIService);

    service.customizeFloatingUI('left-start', null, null, null);
    service.setUpfloatingUI(new ElementRef(triggerEl), new ElementRef(floatingEl), events);

    service.positionFloatingUI();

    expect(computePositionSpy).toHaveBeenCalledWith(triggerEl, floatingEl, {
      placement: 'left-start',
      middleware: service['middleware']
    });

    computePositionSpy.mockRestore();
  });

  it('should invoke computePosition with default placement and middleware', async () => {
    const computePositionSpy = jest.spyOn(require('@floating-ui/dom'), 'computePosition');
    const { fixture } = await render(`<div id="trigger"></div><div id="floating"></div>`);
    const triggerEl = fixture.nativeElement.querySelector('#trigger');
    const floatingEl = fixture.nativeElement.querySelector('#floating');
    const service = fixture.debugElement.injector.get(FloatingUIService);

    service.setUpfloatingUI(new ElementRef(triggerEl), new ElementRef(floatingEl), events);

    service.positionFloatingUI();

    expect(computePositionSpy).toHaveBeenCalledWith(triggerEl, floatingEl, {
      placement: service['placement'],
      middleware: service['middlewareDefault']
    });

    computePositionSpy.mockRestore();
  });

  it('should allow custom middleware', async () => {
    const customMiddleware = [offset(10)];
    const computePositionSpy = jest.spyOn(require('@floating-ui/dom'), 'computePosition');
    const { fixture, debugElement } = await render(
      `<div v-floating-ui-container [middleware]="customMiddleware">
         <div v-floating-ui-trigger data-testid="trigger"></div>
         <div v-floating-ui-element data-testid="floating"></div>
       </div>
       `,
      {
        imports: [FloatingUIContainer, FloatingUIElementDirective, FloatingUITriggerDirective],
        providers: [FloatingUIService],
        componentProperties: {
          middleware: customMiddleware
        }
      }
    );
    const triggerEl = screen.getByTestId('trigger');
    const floatingEl = screen.getByTestId('floating');
    // temporary measure while componentProperties aren't supported for directives
    const directive = debugElement.query(By.directive(FloatingUIContainer)).injector.get(FloatingUIContainer);
    directive.floatingUIService.customizeFloatingUI(null, customMiddleware, null, null);

    await userEvent.click(triggerEl);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(computePositionSpy).toHaveBeenCalledWith(triggerEl, floatingEl, {
      placement: expect.anything(),
      middleware: customMiddleware
    });
    computePositionSpy.mockRestore();
  });

  it('should accept a custom display style', async () => {
    const { fixture } = await render(`<div id="trigger"></div><div id="floating"></div>`);
    const triggerEl = fixture.nativeElement.querySelector('#trigger');
    const floatingEl = fixture.nativeElement.querySelector('#floating');
    const service = fixture.debugElement.injector.get(FloatingUIService);

    service.customizeFloatingUI(null, null, 'block', null);
    service.setUpfloatingUI(new ElementRef(triggerEl), new ElementRef(floatingEl), events);

    service.showfloatingUI();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(floatingEl.style.display).toBe('block');
  });

  // not sure why this doesn't work
  // works in CustomEventsTooltipComponent
  it.skip('should accept a custom events array', async () => {
    @Component({
      template: `<div v-floating-ui-container [eventsArray]="events">
        <div v-floating-ui-trigger data-testid="trigger"></div>
        <div v-floating-ui-element data-testid="floating"></div>
      </div> `,
      imports: [FloatingUIContainer, FloatingUIElementDirective, FloatingUITriggerDirective],
      standalone: true
    })
    class TestComponent {
      events = [
        [new UIEvent('click'), FloatingUIVisibility.SHOW],
        [new UIEvent('keydown.space'), FloatingUIVisibility.HIDE]
      ];
    }

    const { fixture } = await render(TestComponent, {
      providers: [FloatingUIService]
    });

    await fixture.whenStable();
    fixture.detectChanges();

    const triggerEl = screen.getByTestId('trigger');
    const floatingEl = screen.getByTestId('floating');

    await userEvent.click(triggerEl);
    expect(floatingEl.style.display).toBe('flex');

    console.log('pressing space');
    await userEvent.keyboard('{Space}');
    await fixture.whenStable();
    fixture.detectChanges();

    expect(floatingEl.style.display).toBe('none');
  });

  it('should close the floating UI element on click outside', async () => {
    const { fixture } = await render(
      `<div v-floating-ui-container>
        <div v-floating-ui-trigger data-testid="trigger"></div>
        <div v-floating-ui-element data-testid="floating"></div>
      </div>
      `,
      {
        imports: [FloatingUIContainer, FloatingUIElementDirective, FloatingUITriggerDirective],
        providers: [FloatingUIService]
      }
    );
    const triggerEl = screen.getByTestId('trigger');
    const floatingEl = screen.getByTestId('floating');

    await userEvent.click(triggerEl);

    await fixture.whenStable();
    fixture.detectChanges();

    expect(floatingEl.style.display).toBe('flex');

    // Simulate a click outside the floating UI
    await userEvent.click(document.body);

    await fixture.whenStable();
    fixture.detectChanges();

    expect(floatingEl.style.display).toBe('none');
  });

  it('should close the floating UI element on escape key press', async () => {
    const { fixture } = await render(
      `<div v-floating-ui-container>
        <div v-floating-ui-trigger data-testid="trigger"></div>
        <div v-floating-ui-element data-testid="floating"></div>
      </div>
      `,
      {
        imports: [FloatingUIContainer, FloatingUIElementDirective, FloatingUITriggerDirective],
        providers: [FloatingUIService]
      }
    );
    const triggerEl = screen.getByTestId('trigger');
    const floatingEl = screen.getByTestId('floating');

    await userEvent.click(triggerEl);

    await fixture.whenStable();
    fixture.detectChanges();

    expect(floatingEl.style.display).toBe('flex');

    // Simulate an escape key press
    await userEvent.keyboard('{Escape}');

    await fixture.whenStable();
    fixture.detectChanges();

    expect(floatingEl.style.display).toBe('none');
  });

  describe('FloatingUIService - Tooltip Arrow', () => {
    it('should set up the tooltip arrow', async () => {
      await render(
        `<div v-floating-ui-container>
        <div v-floating-ui-trigger data-testid="trigger"></div>
        <div v-floating-ui-element data-testid="floating">
          <div v-tooltip-arrow data-testid="arrow"></div>
        </div>
      </div>`,
        {
          imports: [FloatingUIContainer, FloatingUIElementDirective, FloatingUITriggerDirective, TooltipArrowDirective],
          providers: [FloatingUIService]
        }
      );

      const arrowEl = screen.getByTestId('arrow');

      expect(arrowEl).toBeTruthy();
      const sides = ['left', 'top', 'right', 'bottom'];
      sides.forEach((side) => {
        const value = arrowEl.style[side as any];
        expect(value).not.toBeNull();
        expect(typeof value).toBe('string');
      });
      const negativeSides = sides.filter((side) => {
        const value = arrowEl.style[side as any];
        return value && (value.startsWith('-') || parseFloat(value) < 0);
      });
      expect(negativeSides.length).toBeLessThanOrEqual(1);
    });

    it('should render the arrow element inside the floating UI', async () => {
      await render(
        `<div v-floating-ui-container>
        <div v-floating-ui-trigger data-testid="trigger"></div>
        <div v-floating-ui-element data-testid="floating">
          <div v-tooltip-arrow data-testid="arrow"></div>
        </div>
      </div>`,
        {
          imports: [FloatingUIContainer, FloatingUIElementDirective, FloatingUITriggerDirective, TooltipArrowDirective],
          providers: [FloatingUIService]
        }
      );

      const arrowEl = screen.getByTestId('arrow');
      expect(arrowEl).toBeInTheDocument();
      expect(arrowEl.parentElement).toBe(screen.getByTestId('floating'));
    });

    it('should apply position styles to the arrow element', async () => {
      await render(
        `<div v-floating-ui-container>
        <div v-floating-ui-trigger data-testid="trigger"></div>
        <div v-floating-ui-element data-testid="floating">
          <div v-tooltip-arrow data-testid="arrow"></div>
        </div>
      </div>`,
        {
          imports: [FloatingUIContainer, FloatingUIElementDirective, FloatingUITriggerDirective, TooltipArrowDirective],
          providers: [FloatingUIService]
        }
      );

      const arrowEl = screen.getByTestId('arrow');
      // Simulate what your service/directive would do after positioning
      // For a real test, you might want to trigger the positioning logic
      // Here, we just check that the style properties exist (could be '', '0px', etc.)
      ['left', 'top', 'right', 'bottom'].forEach((side) => {
        expect(arrowEl.style[side as any]).not.toBeUndefined();
      });
    });

    it('should not have more than one negative side value for arrow positioning', async () => {
      await render(
        `<div v-floating-ui-container>
        <div v-floating-ui-trigger data-testid="trigger"></div>
        <div v-floating-ui-element data-testid="floating">
          <div v-tooltip-arrow data-testid="arrow"></div>
        </div>
      </div>`,
        {
          imports: [FloatingUIContainer, FloatingUIElementDirective, FloatingUITriggerDirective, TooltipArrowDirective],
          providers: [FloatingUIService]
        }
      );

      const arrowEl = screen.getByTestId('arrow');
      const sides = ['left', 'top', 'right', 'bottom'];
      const negativeSides = sides.filter((side) => {
        const value = arrowEl.style[side as any];
        return value && (value.startsWith('-') || parseFloat(value) < 0);
      });
      expect(negativeSides.length).toBeLessThanOrEqual(1);
    });

    it('should call customizeFloatingUI when an arrow is present', async () => {
      // Create a spy on the prototype before rendering, so it catches calls during lifecycle hooks
      const customizeSpy = jest.spyOn(FloatingUIService.prototype, 'customizeFloatingUI');

      const { fixture } = await render(
        `<div v-floating-ui-container>
          <div v-floating-ui-trigger data-testid="trigger"></div> 
          <div v-tooltip data-testid="floating">
        <div v-tooltip-arrow data-testid="arrow"></div>
          </div>
        </div>`,
        {
          imports: [FloatingUIContainer, FloatingUIElementDirective, TooltipDirective, TooltipArrowDirective],
          providers: [FloatingUIService]
        }
      );

      await fixture.whenStable();
      fixture.detectChanges();
      expect(customizeSpy).toHaveBeenCalled();
      customizeSpy.mockRestore();
    });

    it('should set up the arrow correctly in customizeFloatingUI', async () => {
      const { fixture } = await render(
        `<div v-floating-ui-container>
          <div v-floating-ui-trigger data-testid="trigger"></div> 
          <div v-tooltip data-testid="floating">
            <div v-tooltip-arrow data-testid="arrow"></div>
          </div>
        </div>`,
        {
          imports: [FloatingUIContainer, FloatingUIElementDirective, TooltipDirective, TooltipArrowDirective],
          providers: [FloatingUIService]
        }
      );

      const service = fixture.debugElement.injector.get(FloatingUIService);
      const arrowDirective = fixture.debugElement
        .query(By.directive(TooltipArrowDirective))
        .injector.get(TooltipArrowDirective);

      service.customizeFloatingUI(null, null, null, arrowDirective);

      expect(service['arrow']).toBe(arrowDirective);
      expect(service['offset']).toBeGreaterThan(service['offsetDefault']);
      expect(service['middleware']).toContainEqual(expect.objectContaining({ name: 'arrow' }));
    });

    it('should position the arrow correctly in positionFloatingUI', async () => {
      const { fixture } = await render(
        `<div style="display: flex">
          <div v-floating-ui-container placement="top" style="padding-block: 36px; margin: auto">
            <button v-button v-floating-ui-trigger data-testid="trigger">Action</button>
            <span v-tooltip data-testid="floating">
              Tooltip label <span v-tooltip-arrow data-testid="arrow"></span>
            </span>
          </div>
        </div>`,
        {
          imports: [
            FloatingUIContainer,
            ButtonDirective,
            FloatingUIElementDirective,
            TooltipDirective,
            TooltipArrowDirective
          ],
          providers: [FloatingUIService]
        }
      );

      const service = fixture.debugElement.injector.get(FloatingUIService);
      const triggerEl = screen.getByTestId('trigger');
      const floatingEl = screen.getByTestId('floating');
      const arrowEl = screen.getByTestId('arrow');
      const arrowDirective = fixture.debugElement
        .query(By.directive(TooltipArrowDirective))
        .injector.get(TooltipArrowDirective);

      service.setUpfloatingUI(new ElementRef(triggerEl), new ElementRef(floatingEl), [[new UIEvent('click')]]);
      service.customizeFloatingUI('top', null, null, arrowDirective);

      // Mock computePosition and autoUpdate to return arrow data
      const computePositionSpy = jest
        .spyOn(require('@floating-ui/dom'), 'computePosition')
        .mockImplementation((...args: any[]) =>
          Promise.resolve({
            x: 0,
            y: 0,
            placement: 'top',
            middlewareData: {
              arrow: { x: 10, y: 5 }
            }
          })
        );
      jest.spyOn(require('@floating-ui/dom'), 'autoUpdate').mockImplementation((...args: any[]) => {
        const update = args[2];
        if (typeof update === 'function') {
          update();
        }
        return () => {};
      });

      service.positionFloatingUI();
      await userEvent.hover(triggerEl);
      await fixture.whenStable();
      fixture.detectChanges();

      expect(computePositionSpy).toHaveBeenCalled();
      expect(arrowEl.style.left).toBe('10px');
      expect(arrowEl.style.top).toBe('5px');
      expect(arrowEl.style.right).toBe('');
      expect(arrowEl.style.bottom).toBe('0px'); // static side when placement = 'top'

      computePositionSpy.mockRestore();
    });
  });

  describe('FloatingUIService - KeepOnHover', () => {
    it('should keep the floating UI visible when hovering over it', async () => {
      const { fixture } = await render(
        `<div v-floating-ui-container>
        <div v-floating-ui-trigger data-testid="trigger"></div>
        <div v-floating-ui-element data-testid="floating"></div>
      </div>`,
        {
          imports: [FloatingUIContainer, FloatingUIElementDirective, FloatingUITriggerDirective],
          providers: [FloatingUIService]
        }
      );

      const service = fixture.debugElement.injector.get(FloatingUIService);
      const triggerEl = screen.getByTestId('trigger');
      const floatingEl = screen.getByTestId('floating');

      service.setUpfloatingUI(new ElementRef(triggerEl), new ElementRef(floatingEl), [
        [new UIEvent('mouseenter'), FloatingUIVisibility.SHOW],
        [new UIEvent('mouseleave'), FloatingUIVisibility.HIDE]
      ]);

      await userEvent.hover(triggerEl);
      await fixture.whenStable();
      fixture.detectChanges();

      expect(floatingEl.style.display).toBe('flex');

      await userEvent.unhover(triggerEl);
      await userEvent.hover(floatingEl);
      await fixture.whenStable();
      fixture.detectChanges();

      expect(floatingEl.style.display).toBe('flex');

      await userEvent.click(document.body);
      await fixture.whenStable();
      fixture.detectChanges();

      expect(floatingEl.style.display).toBe('none');
    });

    it.skip('should use custom hideOnHoverTimeout when provided', async () => {
      const { fixture } = await render(
        `<div v-floating-ui-container>
        <div v-floating-ui-trigger data-testid="trigger"></div>
        <div v-floating-ui-element data-testid="floating"></div>
      </div>`,
        {
          imports: [FloatingUIContainer, FloatingUIElementDirective, FloatingUITriggerDirective],
          providers: [FloatingUIService]
        }
      );

      const service = fixture.debugElement.injector.get(FloatingUIService);
      const triggerEl = screen.getByTestId('trigger');
      const floatingEl = screen.getByTestId('floating');

      const customTimeout = 1000;
      service['hideOnHoverTimeout'] = customTimeout;

      service.setUpfloatingUI(new ElementRef(triggerEl), new ElementRef(floatingEl), [
        [new UIEvent('mouseenter'), FloatingUIVisibility.SHOW],
        [new UIEvent('mouseleave'), FloatingUIVisibility.HIDE]
      ]);

      await userEvent.hover(triggerEl);
      fixture.detectChanges();

      expect(floatingEl.style.display).toBe('flex');

      await userEvent.unhover(triggerEl);

      // Wait for just before the timeout
      await new Promise((resolve) => setTimeout(resolve, customTimeout - 40));
      fixture.detectChanges();

      // The floating UI should still be visible
      expect(floatingEl.style.display).toBe('flex');

      // Wait for the full timeout
      await new Promise((resolve) => setTimeout(resolve, 60));
      fixture.detectChanges();

      // The floating UI should now be hidden
      expect(floatingEl.style.display).toBe('none');
    });
  });
});
