export default function textFormat(count, singular, plural) {
  const str = count === 1 && singular || plural;
  return str.replace('$', count);
}
