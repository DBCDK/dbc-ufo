/**
 * Splits a string into an url and an ID.
 *
 * @param row
 * @returns {{url: string, id: string}}
 */
export default function splitIntoUrlAndID(row) {
  let id = '', url = '';

  row.replace('\t', ' ').split(' ').forEach(el => {
    if (el.indexOf('http') === 0) {
      url = el;
    }
    else {
      id = el;
    }
  });
  return {url, id};
}
