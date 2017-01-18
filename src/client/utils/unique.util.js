/**
 * Return array with unique values
 *
 * @param {Array} list
 * @returns {Array}
 */
export default function unique(list) {
  return list.filter((elem, pos, arr) => {
    return arr.indexOf(elem) === pos;
  });
}
