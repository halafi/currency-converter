import * as Knex from 'knex';

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex): Promise<any> {
  return knex('conversion')
    .del()
    .then(() => {
      return knex('conversion').insert([
        {
          baseCurrency: 'eur',
          targetCurrency: 'czk',
          amountInBase: 10.55,
          amountInTarget: 286.49,
          amountInUsd: 11.55,
          conversionRate: 27.15,
        },
        {
          baseCurrency: 'eur',
          targetCurrency: 'czk',
          amountInBase: 1,
          amountInTarget: 27.15,
          amountInUsd: 1.1,
          conversionRate: 27.15,
        },
        {
          baseCurrency: 'btc',
          targetCurrency: 'idr',
          amountInBase: 0.00000001119,
          amountInTarget: 1.46,
          amountInUsd: 1.1,
          conversionRate: 130473637.18,
        },
        {
          baseCurrency: 'idr',
          targetCurrency: 'btc',
          amountInBase: 10000000,
          amountInTarget: 0.074,
          amountInUsd: 676.95,
          conversionRate: 0.00000000765652,
        },
      ]);
    });
}
