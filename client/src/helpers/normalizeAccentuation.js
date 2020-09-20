export default function normalizeAccentuation(string) {
  const regex = /[\u0300-\u036f]/g;

  return string.normalize('NFD').replace(regex, '');
}