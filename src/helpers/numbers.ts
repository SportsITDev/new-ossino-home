export const formatNumber = (
  val: number,
  digit: number = 2,
  locale: string = 'en',
  options: Intl.NumberFormatOptions = {},
) => {
  let opts: Intl.NumberFormatOptions = { ...options };
  // If caller explicitly sets min/max fraction digits, use them as-is
  if (
    typeof opts.minimumFractionDigits === 'number' &&
    typeof opts.maximumFractionDigits === 'number'
  ) {
    if (opts.maximumFractionDigits < opts.minimumFractionDigits) {
      opts.maximumFractionDigits = opts.minimumFractionDigits;
    }
    return val.toLocaleString(locale, opts);
  }
  // Use 2 decimal places for all values
  const formattedDigit = digit || 2;
  opts.minimumFractionDigits = formattedDigit;
  opts.maximumFractionDigits = formattedDigit;
  return val.toLocaleString(locale, opts);
};
