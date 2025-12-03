import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';

export const formatTransactionsDateToRender = (rawDate: {
  day: string;
  time: string;
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { screenWidth } = useBreakpoint();
  const isLargeScreen = screenWidth >= BREAKPOINTS.xl;

  return isLargeScreen ? `${rawDate.day}, ${rawDate.time}` : rawDate.day;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};
