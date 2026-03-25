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
export const DOWN_ARROW_KEY = 'ArrowDown';
export const END_KEY = 'End';
export const ESCAPE_KEY = 'Escape';
export const HOME_KEY = 'Home';
export const LEFT_ARROW_KEY = 'ArrowLeft';
export const RIGHT_ARROW_KEY = 'ArrowRight';
export const SPACE_KEY = ' ';
export const SPACE_CODE = 'Space';
export const TAB_KEY = 'Tab';
export const UP_ARROW_KEY = 'ArrowUp';
export const ENTER_KEY = 'Enter';
export const BACKSPACE_KEY = 'Backspace';

export const SpacingProperties = {
  INHERIT: 'inherit',
  NORMAL: 'normal',
  AUTO: 'auto'
} as const;

export type SpacingProperties = (typeof SpacingProperties)[keyof typeof SpacingProperties] | number;
