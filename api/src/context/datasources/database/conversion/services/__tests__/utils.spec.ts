import { getMostPopularTargetCurrency } from '../utils';

const common = {
  amountInUsd: 1,
};
describe('#utils', () => {
  test('getMostPopularTargetCurrency', () => {
    expect(
      getMostPopularTargetCurrency([
        { ...common, targetCurrency: 'eur' },
        { ...common, targetCurrency: 'eur' },
        { ...common, targetCurrency: 'idr' },
        { ...common, targetCurrency: 'czk' },
      ]),
    ).toEqual('eur');
    expect(
      getMostPopularTargetCurrency([
        { ...common, targetCurrency: 'eur' },
        { ...common, targetCurrency: 'idr' },
        { ...common, targetCurrency: 'czk' },
      ]),
    ).toEqual('eur');
    expect(getMostPopularTargetCurrency([])).toEqual('');
  });
});
