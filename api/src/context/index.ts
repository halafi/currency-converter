import DataLoader from 'dataloader';
import type { Stats } from '../records/Stats';
import { getCurrencies } from './datasources/currencyRates';
import { getStats, newConversion } from './datasources/database/conversion';

type Context = {
  currenciesLoader: DataLoader<string, string[]>;
  statsLoader: DataLoader<string, Stats>;
  convert: (base: string, target: string, amount: number) => void;
};

const context: Context = {
  currenciesLoader: new DataLoader((ids) => Promise.all(ids.map(getCurrencies))),
  statsLoader: new DataLoader((ids) => Promise.all(ids.map(getStats))),
  convert: (base, target, amount) => newConversion(base, target, amount),
};

export default context;
