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
    console.error(`[server] unsupported currency ${baseCur} -> ${targetCur}`);
    return {
      rate: 0,
      result: 0,
    };
  }
  const inTargetCurrency = amount * rate;
  const toUsdRate = rates.USD || 1; // fallback in case base currency is USD
  const inUsd = baseCur.toLowerCase() === 'usd' ? amount : amount * toUsdRate;
  // store conversion in DB
  await database(TABLE_NAME)
    .insert({
      baseCurrency: baseCur,
      targetCurrency: targetCur,
      amountInBase: amount,
      amountInTarget: inTargetCurrency,
      amountInUsd: inUsd,
      conversionRate: rate,
    })
    .catch((err) => {
      console.error(`[server] ${err}`);
    });
  return {
    rate,
    result: inTargetCurrency,
  };
};
