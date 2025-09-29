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
import { coerceSpacing, pxAttribute } from './nova-lib.utils';

describe('Nova library utils', () => {
  describe('coerceSpacing', () => {
    it('should return null if the value is falsy', () => {
      expect(coerceSpacing(null, 'test')).toBeNull();
    });

    it('should return with - prefix if negative number', () => {
      expect(coerceSpacing(-1, 'test')).toBe('-test-1');
    });

    it('should return with - prefix if negative number string', () => {
      expect(coerceSpacing('-1', 'test')).toBe('-test-1');
    });

    it('should return without - prefix if positive number', () => {
      expect(coerceSpacing(1, 'test')).toBe('test-1');
    });

    it('should return without - prefix if positive number string', () => {
      expect(coerceSpacing('1', 'test')).toBe('test-1');
    });

    it('should return without - prefix if 0', () => {
      expect(coerceSpacing(0, 'test')).toBe('test-0');
    });

    it('should return without - prefix if 0 string', () => {
      expect(coerceSpacing('0', 'test')).toBe('test-0');
    });

    it('should return with string', () => {
      expect(coerceSpacing('string', 'test')).toBe('test-string');
    });
  });

  describe('pxAttribute', () => {
    it('should allow valid px value', () => {
      expect(pxAttribute('22')).toBe('22px');
    });

    it('should allow default invalid px value', () => {
      expect(pxAttribute('two')).toBe(null);
    });

    it('should allow custom invalid px value', () => {
      expect(pxAttribute('two', 22)).toBe(22);
    });
  });
});
