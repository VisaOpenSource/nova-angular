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
import { valuesDiffer } from './values-differ';

describe('valuesDiffer', () => {
  describe('Primitives', () => {
    it('should return false for identical primitives', () => {
      expect(valuesDiffer(1, 1)).toBe(false);
      expect(valuesDiffer('test', 'test')).toBe(false);
      expect(valuesDiffer(true, true)).toBe(false);
      expect(valuesDiffer(null, null)).toBe(false);
      expect(valuesDiffer(undefined, undefined)).toBe(false);
    });

    it('should return true for different primitives', () => {
      expect(valuesDiffer(1, 2)).toBe(true);
      expect(valuesDiffer('test', 'test2')).toBe(true);
      expect(valuesDiffer(true, false)).toBe(true);
      expect(valuesDiffer(null, undefined)).toBe(true);
      expect(valuesDiffer(0, null)).toBe(true);
    });
  });

  describe('Arrays', () => {
    it('should return false for identical arrays', () => {
      expect(valuesDiffer([1, 2, 3], [1, 2, 3])).toBe(false);
      expect(valuesDiffer(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(false);
    });

    it('should return true for arrays with different lengths', () => {
      expect(valuesDiffer([1, 2, 3], [1, 2])).toBe(true);
    });

    it('should return true for arrays with different elements', () => {
      expect(valuesDiffer([1, 2, 3], [1, 2, 4])).toBe(true);
    });
  });

  describe('Objects', () => {
    it('should return false for identical objects', () => {
      expect(valuesDiffer({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(false);
    });

    it('should return true for objects with different keys', () => {
      expect(valuesDiffer({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(true);
    });

    it('should return true for objects with different values', () => {
      expect(valuesDiffer({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(true);
    });
  });

  describe('Complex nested structures', () => {
    it('should return false for identical nested structures', () => {
      const obj1 = { a: 1, b: [1, 2, 3], c: { d: 'test', e: true } };
      const obj2 = { a: 1, b: [1, 2, 3], c: { d: 'test', e: true } };
      expect(valuesDiffer(obj1, obj2)).toBe(false);
    });

    it('should return true for different nested structures', () => {
      const obj1 = { a: 1, b: [1, 2, 3], c: { d: 'test', e: true } };
      const obj2 = { a: 1, b: [1, 2, 4], c: { d: 'test', e: false } };
      expect(valuesDiffer(obj1, obj2)).toBe(true);
    });
  });
});
