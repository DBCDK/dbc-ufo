/**
 * Validate elements in object
 *
 * @param validator
 * @param elements
 * @returns {boolean}
 */
export default function validateObject(validator, elements) {
  for (let key of Object.keys(validator)) {
    if (!elements[key] || typeof elements[key] !== validator[key]) {
      return false;
    }
  }
  return true;
}
