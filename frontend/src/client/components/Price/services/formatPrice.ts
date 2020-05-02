const formatPrice = (value: number, language: string, currency: string): string =>
  new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

export default formatPrice;
