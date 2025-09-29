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
import { effect, Injectable } from '@angular/core';
import { Unsubscribable } from '../types';

@Injectable()
export class ListenerService {
  public listeners: (() => void)[] = [];
  public navListeners: (() => void)[] = []; // For navigation events added by nova-lib-service
  public navSubscriptions: (Unsubscribable | undefined)[] = []; // For navigation subscriptions added by nova-lib-service
  public subscriptions: (Unsubscribable | undefined)[] = [];

  cleanupEffect = effect((onCleanup) => {
    onCleanup(() => {
      this.cleanup();
      this.cleanupNavListeners();
    });
  });

  cleanup(): void {
    this.listeners?.forEach((listener) => listener());
    this.listeners = [];
    this.subscriptions?.forEach((subscription) => subscription?.unsubscribe());
    this.subscriptions = [];
  }

  cleanupNavListeners(): void {
    this.navListeners?.forEach((listener) => listener());
    this.navListeners = [];
    this.navSubscriptions?.forEach((sub) => sub?.unsubscribe());
    this.navSubscriptions = [];
  }
}
