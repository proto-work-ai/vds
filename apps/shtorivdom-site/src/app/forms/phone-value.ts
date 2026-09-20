export const toLocalPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8')))
    return digits.slice(1);
  return digits.slice(-10);
};
