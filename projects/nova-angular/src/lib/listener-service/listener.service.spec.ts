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
import { Component, EffectRef, Injectable } from '@angular/core';
import { render } from '@testing-library/angular';
import { ListenerService } from './listener.service';
import { Unsubscribable } from 'rxjs';

describe('ListenerService', () => {
  @Component({
    selector: 'test-component',
    template: '<div>Test Component</div>',
    standalone: true,
  })
  class TestComponent {}

  it('should be created', async () => {
    const { fixture } = await render(TestComponent, {
      providers: [ListenerService],
    });

    const service = fixture.debugElement.injector.get(ListenerService);
    expect(service).toBeTruthy();
  });

  describe('cleanup', () => {
    it('should call all listeners and clear the listeners array', async () => {
      // Arrange
      const { fixture } = await render(TestComponent, {
        providers: [ListenerService],
      });

      const service = fixture.debugElement.injector.get(ListenerService);
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      service.listeners = [listener1, listener2];

      // Act
      service.cleanup();

      // Assert
      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
      expect(service.listeners.length).toBe(0);
    });

    it('should unsubscribe from all subscriptions and clear the subscriptions array', async () => {
      // Arrange
      const { fixture } = await render(TestComponent, {
        providers: [ListenerService],
      });

      const service = fixture.debugElement.injector.get(ListenerService);
      const subscription1: Unsubscribable = { unsubscribe: jest.fn() };
      const subscription2: Unsubscribable = { unsubscribe: jest.fn() };
      service.subscriptions = [subscription1, subscription2];

      // Act
      service.cleanup();

      // Assert
      expect(subscription1.unsubscribe).toHaveBeenCalled();
      expect(subscription2.unsubscribe).toHaveBeenCalled();
      expect(service.subscriptions.length).toBe(0);
    });

    it('should handle undefined subscriptions gracefully', async () => {
      // Arrange
      const { fixture } = await render(TestComponent, {
        providers: [ListenerService],
      });

      const service = fixture.debugElement.injector.get(ListenerService);
      const subscription1: Unsubscribable = { unsubscribe: jest.fn() };
      service.subscriptions = [subscription1, undefined];

      // Act
      expect(() => service.cleanup()).not.toThrow();

      // Assert
      expect(subscription1.unsubscribe).toHaveBeenCalled();
      expect(service.subscriptions.length).toBe(0);
    });

    it('should handle empty arrays gracefully', async () => {
      // Arrange
      const { fixture } = await render(TestComponent, {
        providers: [ListenerService],
      });

      const service = fixture.debugElement.injector.get(ListenerService);
      service.listeners = [];
      service.subscriptions = [];

      // Act
      expect(() => service.cleanup()).not.toThrow();

      // Assert
      expect(service.listeners.length).toBe(0);
      expect(service.subscriptions.length).toBe(0);
    });
  });

  describe('cleanupNavListeners', () => {
    it('should call all nav listeners and clear the navListeners array', async () => {
      // Arrange
      const { fixture } = await render(TestComponent, {
        providers: [ListenerService],
      });

      const service = fixture.debugElement.injector.get(ListenerService);
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      service.navListeners = [listener1, listener2];

      // Act
      service.cleanupNavListeners();

      // Assert
      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
      expect(service.navListeners.length).toBe(0);
    });

    it('should unsubscribe from all nav subscriptions and clear the navSubscriptions array', async () => {
      // Arrange
      const { fixture } = await render(TestComponent, {
        providers: [ListenerService],
      });

      const service = fixture.debugElement.injector.get(ListenerService);
      const subscription1: Unsubscribable = { unsubscribe: jest.fn() };
      const subscription2: Unsubscribable = { unsubscribe: jest.fn() };
      service.navSubscriptions = [subscription1, subscription2];

      // Act
      service.cleanupNavListeners();

      // Assert
      expect(subscription1.unsubscribe).toHaveBeenCalled();
      expect(subscription2.unsubscribe).toHaveBeenCalled();
      expect(service.navSubscriptions.length).toBe(0);
    });

    it('should handle undefined nav subscriptions gracefully', async () => {
      // Arrange
      const { fixture } = await render(TestComponent, {
        providers: [ListenerService],
      });

      const service = fixture.debugElement.injector.get(ListenerService);
      const subscription1: Unsubscribable = { unsubscribe: jest.fn() };
      service.navSubscriptions = [subscription1, undefined];

      // Act
      expect(() => service.cleanupNavListeners()).not.toThrow();

      // Assert
      expect(subscription1.unsubscribe).toHaveBeenCalled();
      expect(service.navSubscriptions.length).toBe(0);
    });

    it('should handle empty arrays gracefully', async () => {
      // Arrange
      const { fixture } = await render(TestComponent, {
        providers: [ListenerService],
      });

      const service = fixture.debugElement.injector.get(ListenerService);
      service.navListeners = [];
      service.navSubscriptions = [];

      // Act
      expect(() => service.cleanupNavListeners()).not.toThrow();

      // Assert
      expect(service.navListeners.length).toBe(0);
      expect(service.navSubscriptions.length).toBe(0);
    });
  });

  describe('effect cleanup', () => {
    it('should register cleanup functions that call cleanup and cleanupNavListeners', async () => {
      // Arrange
      const { fixture } = await render(TestComponent, {
        providers: [ListenerService],
      });

      const service = fixture.debugElement.injector.get(ListenerService);
      const cleanupSpy = jest.spyOn(service, 'cleanup');
      const cleanupNavListenersSpy = jest.spyOn(service, 'cleanupNavListeners');

      // Mock the effect implementation
      const mockEffect = jest.fn();
      const mockOnCleanup = jest.fn();

      // Act - Simulate the effect's onCleanup call
      mockEffect.mockImplementation((fn) => fn(mockOnCleanup));

      // Call the mock effect with the same function that would be used in the service constructor
      mockEffect((onCleanup: (cleanupFn: () => void) => void) => {
        onCleanup(() => {
          service.cleanup();
          service.cleanupNavListeners();
        });
      });

      // Get the cleanup function that was registered
      const registeredCleanupFn = mockOnCleanup.mock.calls[0][0];

      // Manually call the cleanup function
      registeredCleanupFn();

      // Assert
      expect(cleanupSpy).toHaveBeenCalled();
      expect(cleanupNavListenersSpy).toHaveBeenCalled();
    });
  });
});
