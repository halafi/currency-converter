import * as React from 'react';
import formatPrice from './services/formatPrice';

type Props = {
  value: number;
  cur: string;
};

const Price = ({ value, cur }: Props) => {
  return <>{formatPrice(value, 'en', cur)}</>;
};

export default Price;
