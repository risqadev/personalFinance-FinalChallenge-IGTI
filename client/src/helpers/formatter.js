const formatter = Intl.NumberFormat;
const locale = 'pt-BR';

function formatBRL(value) {
  return formatter(locale, {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export { formatBRL };