/**
 * Escape html for xml.
 *
 * @param text
 * @returns {*}
 */
export default function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;'
  };

  return text.replace(/[&<>"']/g, (m) => map[m]);
}
