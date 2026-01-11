export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (typeof amount !== 'number') return '';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const truncateAddress = (address, start = 6, end = 4) => {
  if (!address || address.length < start + end) return address || '';
  return `${address.slice(0, start)}...${address.slice(-end)}`;
};
