import database from '..';
import type { Stats } from '../../../../records/Stats';
import { getMostPopularTargetCurrency } from './services/utils';
import { getRates } from '../../currencyRates';

const TABLE_NAME = 'conversion';

// eslint-disable-next-line import/prefer-default-export
export const getStats = async (): Promise<Stats> =>
  new Promise((resolve) => {
    database
      .from(TABLE_NAME)
      .select({
        targetCurrency: 'targetCurrency',
        amountInUsd: 'amountInUsd',
        createdAt: 'createdAt', // TODO: might be not be needed
      })
      .orderBy('createdAt', 'desc') // TODO: check if correct
      .limit(1000)
      .then((records) => {
        const totalAmountConvertedInUsd = records.reduce((acc, r) => acc + r.amountInUsd, 0);
        const conversionCount = records.length;
        resolve({
          mostPopularTargetCurrency: getMostPopularTargetCurrency(records),
          totalAmountConvertedInUsd,
          conversionCount,
        });
      })
      .catch((err) => {
        console.error(`[server] ${err}`);
        resolve({
          mostPopularTargetCurrency: '',
          totalAmountConvertedInUsd: 0,
          conversionCount: 0,
        });
      });
  });

export const newConversion = async (baseCur: string, targetCur: string, amount: number) => {
  if (baseCur === targetCur) {
    return {
      rate: 1,
      result: amount,
    };
  }
  const { rates } = await getRates(baseCur.toLowerCase());
  const rate = rates && rates[targetCur.toUpperCase()];
  if (!rate) {
    console.error(
      `[server] unsupported currency ${baseCur.toUpperCase()} -> ${targetCur.toUpperCase()}`,
    );
    return {
      rate: 0,
      result: 0,
    };
  }
  const inTargetCurrency = amount * rate;
  // store conversion in DB
  // TODO
  return {
    rate,
    result: inTargetCurrency,
  };
};
