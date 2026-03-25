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
import { render, screen, fireEvent, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FloatingUIContainer } from './floating-ui-container.directive';
import { Component, viewChild } from '@angular/core';
import { FloatingUIPlacements } from '../floating-ui/floating-ui.constants';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { FloatingUITriggerDirective } from '../floating-ui-trigger/floating-ui-trigger.directive';
import { ButtonDirective } from '../button/button.directive';
import { FloatingUIElementDirective } from '../floating-ui-element/floating-ui-element.directive';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';
import { IconToggleDefaultTemplateDirective } from '../icon-toggle-default/icon-toggle-default.directive';
import { IconToggleRotatedTemplateDirective } from '../icon-toggle-rotated/icon-toggle-rotated.directive';
import { DropdownItemDirective } from '../dropdown-item/dropdown-item.directive';
import { DropdownMenuDirective } from '../dropdown-menu/dropdown-menu.directive';
import { DropdownListDirective } from '../dropdown-list/dropdown-list.directive';

@Component({
  template: `
    <div v-floating-ui-container [placement]="placement">
      <button v-floating-ui-trigger>Trigger</button>
      <div v-tooltip>Tooltip Content</div>
    </div>
  `,
  standalone: true,
  imports: [FloatingUIContainer, FloatingUITriggerDirective, TooltipDirective]
})
class TestComponent {
  readonly floatingUIContainer = viewChild.required(FloatingUIContainer);
  placement: FloatingUIPlacements = 'bottom-start';
  isDisabled = false;
}

describe('FloatingUIContainer', () => {
  it('should render the trigger button', async () => {
    await render(TestComponent);
    const triggerButton = screen.getByText('Trigger');
    expect(triggerButton).toBeTruthy();
  });

  it('should have correct accessibility attributes', async () => {
    await render(TestComponent);
    const triggerButton = screen.getByText('Trigger');
    const tooltipContent = screen.getByText('Tooltip Content');

    expect(triggerButton).toHaveAttribute('aria-describedby', tooltipContent.id);
    expect(tooltipContent).toHaveAttribute('role', 'tooltip');
  });

  it('should show tooltip on Tab navigation and hide on Escape', async () => {
    await render(TestComponent);
    const triggerButton = screen.getByText('Trigger');

    await userEvent.tab();
    expect(triggerButton).toHaveFocus();

    const tooltipContent = await screen.findByText('Tooltip Content');
    expect(tooltipContent).toBeVisible();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(tooltipContent).not.toBeVisible();
    });
  });

  it('should show tooltip on trigger focus', async () => {
    await render(TestComponent);
    const triggerButton = screen.getByText('Trigger');

    await userEvent.click(triggerButton);

    const tooltipContent = await screen.findByText('Tooltip Content');
    expect(tooltipContent).toBeVisible();
  });

  it('should hide tooltip on trigger blur', async () => {
    await render(TestComponent);
    const triggerButton = screen.getByText('Trigger');

    await userEvent.click(triggerButton);
    const tooltipContent = await screen.findByText('Tooltip Content');

    await userEvent.tab();
    await waitFor(() => {
      expect(tooltipContent).not.toBeVisible();
    });
  });

  it('should hide tooltip when clicking outside', async () => {
    await render(TestComponent);
    const triggerButton = screen.getByText('Trigger');

    fireEvent.mouseEnter(triggerButton);
    const tooltipContent = await screen.findByText('Tooltip Content');

    fireEvent.click(document.body);
    await waitFor(() => {
      expect(tooltipContent).not.toBeVisible();
    });
  });

  it('should render the tooltip content', async () => {
    await render(TestComponent);
    const tooltipContent = screen.getByText('Tooltip Content');
    expect(tooltipContent).toBeTruthy();
  });

  it('should show tooltip on trigger hover', async () => {
    await render(TestComponent);
    const triggerButton = screen.getByText('Trigger');

    fireEvent.mouseEnter(triggerButton);

    const tooltipContent = await screen.findByText('Tooltip Content');
    expect(tooltipContent).toBeVisible();
  });

  it('should hide tooltip on trigger mouse leave', async () => {
    await render(TestComponent);
    const triggerButton = screen.getByText('Trigger');

    fireEvent.mouseEnter(triggerButton);
    const tooltipContent = await screen.findByText('Tooltip Content');

    fireEvent.mouseLeave(triggerButton);
    await waitFor(
      () => {
        expect(tooltipContent).not.toBeVisible();
      },
      { timeout: 1000 }
    );
  });

  it('should set correct initial placement', async () => {
    const { fixture } = await render(TestComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.floatingUIContainer().placement()).toBe('bottom-start');
  });

  // it('should update placement dynamically', async () => {
  //   const { fixture } = await render(TestComponent);

  //   const floatingUIService = fixture.debugElement.injector.get(FloatingUIService);
  //   const customizeFloatingUISpy = jest.spyOn(floatingUIService, 'customizeFloatingUI');

  //   fixture.componentInstance.placement = 'top-end';
  //   fixture.detectChanges();

  //   await waitFor(() => {
  //     expect(fixture.componentInstance.floatingUIContainer.placement()).toBe('top-end');
  //     expect(customizeFloatingUISpy).toHaveBeenCalledWith(
  //       'top-end',
  //       expect.anything(),
  //       expect.anything(),
  //       expect.anything()
  //     );
  //   });
  // });

  it('should not show tooltip when disabled', async () => {
    await render(
      `<div v-floating-ui-container>
      <button v-floating-ui-trigger v-button disabled>Trigger</button>
      <div v-tooltip>Tooltip Content</div>
      </div>`,
      {
        imports: [FloatingUIContainer, FloatingUITriggerDirective, TooltipDirective, ButtonDirective]
      }
    );

    const triggerButton = screen.getByText('Trigger');
    fireEvent.mouseEnter(triggerButton);

    await waitFor(
      () => {
        const tooltipContent = screen.queryByText('Tooltip Content');
        expect(tooltipContent).not.toBeVisible();
      },
      { timeout: 1000 }
    );
  });

  it('should hide menu when item is clicked', async () => {
    const { fixture } = await render(
      `
        <div v-floating-ui-container>
          <button v-floating-ui-trigger>Trigger</button>
            <div v-floating-ui-element>
                  <button v-dropdown-item>Label 1</button>
                  <button v-dropdown-item>Label 2</button>
                  <button v-dropdown-item>Label 3</button>
            </div>
        </div>
      `,
      {
        imports: [FloatingUIContainer, FloatingUITriggerDirective, FloatingUIElementDirective, DropdownItemDirective]
      }
    );
    fixture.detectChanges();
    const triggerButton = screen.getByText('Trigger');
    await userEvent.click(triggerButton);

    const menuItem1 = await screen.findByText('Label 1');
    expect(menuItem1).toBeVisible();
    await userEvent.click(menuItem1);

    expect(menuItem1).not.toBeVisible();
  });

  it('should stay open on click when closeOnClick is false', async () => {
    const { fixture } = await render(
      `
        <div v-floating-ui-container [closeOnClick]="false">
          <button v-floating-ui-trigger>Trigger</button>
          <div v-floating-ui-element>
            <button v-button>Button content</button>
          Tooltip Content
          </div>
        </div>
      `,
      {
        imports: [FloatingUIContainer, FloatingUITriggerDirective, FloatingUIElementDirective, ButtonDirective]
      }
    );
    fixture.detectChanges();

    const triggerButton = screen.getByText('Trigger');
    await userEvent.click(triggerButton);

    const buttonContent = await screen.findByText('Tooltip Content');
    await userEvent.click(buttonContent);

    expect(buttonContent).toBeVisible();
  });

  it('should set up correctly with menu as floating element', async () => {
    const { fixture } = await render(
      `
        <div v-floating-ui-container>
          <button v-floating-ui-trigger>Trigger</button>
            <div v-dropdown-menu>
              <ul v-dropdown-list>
                <li>
                  <button v-dropdown-item>Label 1</button>
                </li>
                <li>
                  <button v-dropdown-item>Label 2</button>
                </li>
                <li>
                  <button v-dropdown-item>Label 3</button>
                </li>
              </ul>
            </div>
        </div>
      `,
      {
        imports: [
          FloatingUIContainer,
          FloatingUITriggerDirective,
          DropdownMenuDirective,
          DropdownListDirective,
          DropdownItemDirective
        ]
      }
    );
    fixture.detectChanges();

    const triggerButton = screen.getByText('Trigger');
    const menuItem1 = await screen.findByText('Label 1');

    expect(menuItem1).not.toBeVisible();
    await userEvent.click(triggerButton);

    expect(menuItem1).toBeVisible();
  });

  it('should rotate the toggle icon as expected', async () => {
    await render(
      `
        <div v-floating-ui-container>
          <button v-floating-ui-trigger>
            Trigger
              <v-icon-visa-toggle>
                <span v-toggle-default-template data-testid="default">Default</span>
                <span v-toggle-rotated-template data-testid="rotated">Rotated</span>
              </v-icon-visa-toggle>
            </button>
          <div v-floating-ui-element>
            Content
          </div>
        </div>
      `,
      {
        imports: [
          FloatingUIContainer,
          FloatingUITriggerDirective,
          FloatingUIElementDirective,
          IconToggleComponent,
          IconToggleDefaultTemplateDirective,
          IconToggleRotatedTemplateDirective
        ]
      }
    );
    const triggerButton = screen.getByText('Trigger');
    const defaultTemplate = screen.getByTestId('default');

    expect(defaultTemplate).toBeVisible();

    await userEvent.click(triggerButton);

    const rotatedTemplate = screen.getByTestId('rotated');
    expect(rotatedTemplate).toBeVisible();
    expect(defaultTemplate).not.toBeInTheDocument();
  });
});
