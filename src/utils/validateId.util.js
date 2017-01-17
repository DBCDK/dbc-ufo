/**
 * @file
 * Methods for extracting id from filename og urls and validating id as pid, faust or isbn.
 */

/**
 * Validate string as id.
 *
 * @param id
 * @returns {*}
 */
export function validateId(id) {
  if (isPid(id)) {
    return {type: 'pid', id: id};
  }
  else if (isIsbn(id)) {
    return {type: 'isbn', id: id};
  }
  else if (isFaust(id)) {
    return {type: 'faust', id: id};
  }
  return {type: 'error', id: id};
}

/**
 * Get id from url.
 *
 * @param url
 * @returns {{type, id}}
 */
export function getIdFromUrl(url) {
  return getIdFromFile(url.split('/').pop());
}

/**
 * Get id from filename.
 *
 * @param filename
 * @returns {{type, id}}
 */
export function getIdFromFile(filename) {
  const id = filename.split('.')[0];
  return validateId(id);
}

/**
 * Test if string is pid id.
 *
 * @param id
 * @returns {boolean}
 */
function isPid(id) {
  return /.+-.+:.+/.test(id);
}

/**
 * Test if string is isbn id.
 *
 * @param id
 * @returns {boolean}
 */
function isIsbn(id) {
  const isbn = id.replace(/-/g, '');
  if (isbn.length === 10 || isbn.length === 13) {
    if (/^x?[0-9]*x?$/.test(isbn)) {
      return true;
    }
  }

  return false;
}

/**
 * Test if string is faust id.
 * @param id
 * @returns {boolean}
 */
function isFaust(id) {
  return id.length >= 8 && id.length <= 9 && Number(id) > 0;
}
