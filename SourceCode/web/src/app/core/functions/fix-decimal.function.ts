export const FixDecimal = (value: number, decimal: number): string => {
  if (!value || isNaN(value)) {
    return '';
  }

  const divisor = +`1${'0'.repeat(decimal)}`;
  const roundedNumber = Math.round(value * divisor) / divisor;

  return roundedNumber.toFixed(decimal);
};
