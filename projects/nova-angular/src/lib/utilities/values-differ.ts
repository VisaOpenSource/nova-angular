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
/** Improved version inspired by AI and best practices */

/**
 * Internal only. Not included in public API.
 * This can most likely be removed once all our supported versions support linked signals
 * since linked signals will store previous and current values automatically.
 */
type Primitive = string | number | boolean | null | undefined;
type PrimitiveArray = Primitive[];
type PrimitiveObject = { [key: string]: Primitive | PrimitiveArray | PrimitiveObject };

function isPrimitive(value: unknown): value is Primitive {
  return value === null || ['string', 'number', 'boolean', 'undefined'].includes(typeof value);
}

function isArray(value: unknown): value is PrimitiveArray {
  return Array.isArray(value);
}

function isObject(value: unknown): value is PrimitiveObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date);
}

/**
 * Compares two values for differences.
 * @param a primitive, array, or object to compare
 * @param b primitive, array, or object to compare
 * @returns true if values differ, false if they are the same
 */
export function valuesDiffer<T extends Primitive | PrimitiveArray | PrimitiveObject>(a: T, b: T): boolean {
  // Check for identity
  if (Object.is(a, b)) return false;

  // Check for different types
  if (typeof a !== typeof b) return true;

  // Handle arrays
  if (isArray(a) && isArray(b)) {
    return a.length !== b.length || !a.every((value, index) => !valuesDiffer(value, b[index]));
  }

  // Handle objects
  if (isObject(a) && isObject(b)) {
    const entriesA = Object.entries(a);
    const entriesB = Object.entries(b);

    if (entriesA.length !== entriesB.length) return true;

    return entriesA.some(
      ([key, value]) => !Object.prototype.hasOwnProperty.call(b, key) || valuesDiffer(value, b[key])
    );
  }

  // Handle primitives
  if (isPrimitive(a) && isPrimitive(b)) {
    return a !== b;
  }

  // Fallback for complex objects
  return JSON.stringify(a) !== JSON.stringify(b);
}
