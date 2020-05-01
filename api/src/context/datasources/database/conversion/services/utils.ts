import * as R from 'ramda';

// @ts-ignore
const sortByCount = R.sortBy(R.descend(R.prop('count')));

type CurrencyCount = { count: number; currency: string };
type CurrencyMap = {
  [currency: string]: CurrencyCount;
};

type Record = {
  targetCurrency: string;
  amountInUsd: number;
  createdAt: string;
};

// eslint-disable-next-line import/prefer-default-export
export const getMostPopularTargetCurrency = (records: Record[]): string => {
  const conversionCountPerCurrency: CurrencyMap = records.reduce((acc, r) => {
    if (!acc[r.targetCurrency]) {
      acc[r.targetCurrency] = { count: 1, currency: r.targetCurrency };
    } else {
      acc[r.targetCurrency] = {
        currency: r.targetCurrency,
        count: acc[r.targetCurrency].count + 1,
      };
    }
    return acc;
  }, {});
  // @ts-ignore
  const mostPopularCurrency: CurrencyCount = R.head(
    sortByCount(R.values(conversionCountPerCurrency)),
  );
  return mostPopularCurrency?.currency || '';
};
