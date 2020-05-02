import React, { useReducer, useEffect, useMemo } from 'react';
import type { Reducer } from 'react';
import { Flex, Box, Text } from 'rebass/styled-components';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Price from '../../../../components/Price';
import converterReducer, {
  setBaseAmount,
  setTargetAmount,
  setBaseCurrency,
  setTargetCurrency,
  setError,
} from './services/reducer';
import type { State, ConverterActions } from './services/reducer';
import useDebounce from '../../../../hooks/useDebounce';

const CONVERT = gql`
  mutation convert($baseCur: String!, $targetCur: String!, $amount: Float!) {
    conversion(baseCur: $baseCur, targetCur: $targetCur, amount: $amount) {
      rate
      result
    }
  }
`;

const Styled = {
  Pane: styled(Box)`
    width: 100%;
    max-width: 650px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 4px;
  `,
  Input: styled.input`
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.gray2};
    font-size: 14px;
    height: 36px;
    padding: 0 0 0 12px;
    margin-right: 8px;
  `,
  Select: styled.select`
    box-sizing: content-box;
    height: 36px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    font-size: 14px;
    list-style: none;
    outline: none;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray2};
    border-radius: 5px;
    text-align: left;
    text-decoration: none;
    vertical-align: middle;
    width: 80px;
  `,
  Disclaimer: styled.a`
    color: ${({ theme }) => theme.colors.gray2};
    font-size: 12px;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  `,
};

type Props = {
  currencies: string[];
  mostPopularTargetCurrency: string;
  totalAmountConvertedInUsd: number;
  conversionCount: number;
};

const ConverterMain = ({
  currencies,
  mostPopularTargetCurrency,
  totalAmountConvertedInUsd,
  conversionCount,
}: Props) => {
  const [convert] = useMutation(CONVERT);
  const [state, dispatch] = useReducer<Reducer<State, ConverterActions>>(converterReducer, {
    baseCur: 'EUR', // inital values could go form localstorage, value should ideally be from 'currencies' to prevent breaking api change
    targetCur: 'CZK',
    baseAmount: '0',
    targetAmount: '0',
    error: '',
  });

  const { baseCur, targetCur, baseAmount, targetAmount, error } = state;

  // has a drawback but avoids tons of requsts in current approach
  const debouncedBaseAmount = useDebounce(baseAmount, 250);

  useEffect(() => {
    async function updateData() {
      const parsedAmount = parseFloat(baseAmount);
      if (parsedAmount) {
        if (baseCur === targetCur) {
          // avoid unneded api call
          dispatch(setTargetAmount(baseAmount));
        } else {
          convert({ variables: { baseCur, targetCur, amount: parsedAmount } })
            .then(({ data }) => {
              if (data?.conversion?.result) {
                dispatch(setTargetAmount(String(data.conversion.result)));
              }
            })
            .catch((err) => {
              dispatch(setError(String(err)));
            });
          // as improvement stats could refetch after mutation
        }
      } else if (parsedAmount === 0) {
        // avoid unneded api call
        dispatch(setTargetAmount('0'));
      }
    }
    updateData();
  }, [baseCur, targetCur, debouncedBaseAmount]);

  const options = useMemo(
    () =>
      currencies.map((cur) => (
        <option key={cur} value={cur}>
          {cur}
        </option>
      )),
    [currencies],
  );

  return (
    <>
      <Flex my={2}>
        <Styled.Input
          type="number"
          value={baseAmount}
          onChange={(e) => dispatch(setBaseAmount(e.target.value))}
        />
        <Styled.Select value={baseCur} onChange={(e) => dispatch(setBaseCurrency(e.target.value))}>
          {options}
        </Styled.Select>
      </Flex>
      <Flex my={2}>
        <Styled.Input type="number" value={targetAmount} disabled />
        <Styled.Select
          value={targetCur}
          onChange={(e) => dispatch(setTargetCurrency(e.target.value))}
        >
          {options}
        </Styled.Select>
      </Flex>
      {error && <Text color="error">{error}</Text>}
      <Flex flexDirection="column" my={3}>
        <Text lineHeight={1.6} fontSize={1}>
          Most popular currency: {mostPopularTargetCurrency.toUpperCase()}
        </Text>
        <Text lineHeight={1.6} fontSize={1}>
          Total Converted: <Price cur="usd" value={totalAmountConvertedInUsd} />
        </Text>
        <Text lineHeight={1.6} fontSize={1}>
          Total Conversions: {conversionCount}
        </Text>
      </Flex>
      <Box mt={3}>
        <Styled.Disclaimer
          href="https://exchangeratesapi.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Data provided by Exchange rates API
        </Styled.Disclaimer>
      </Box>
    </>
  );
};

export default ConverterMain;
