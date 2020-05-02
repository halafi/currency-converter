import formatPrice from '../formatPrice';

describe('#formatPrice', () => {
  it('works', () => {
    // for other locales you need full-icu to test
    expect(formatPrice(10, 'en', 'usd')).toEqual('$10.00');
    expect(formatPrice(10, 'en-US', 'usd')).toEqual('$10.00');
    expect(formatPrice(10, 'en', 'czk')).toEqual('CZK 10.00');
    expect(formatPrice(10, 'en', 'gbp')).toEqual('£10.00');
    expect(formatPrice(10, 'en-US', 'gbp')).toEqual('£10.00');
    expect(formatPrice(10, 'en', 'eur')).toEqual('€10');
  });
});
