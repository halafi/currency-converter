import React, { useReducer } from 'react';
import type { Reducer } from 'react';
import { Flex, Box, Text } from 'rebass/styled-components';
import styled from 'styled-components';

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
};

type State = {
  baseCur: string;
  targetCur: string;
  baseAmount: string;
  targetAmount: string;
};

const SET_BASE_CURRENCY = 'SET_BASE_CURRENCY';
const SET_TARGET_CURRENCY = 'SET_TARGET_CURRENCY';
const SET_BASE_AMOUNT = 'SET_BASE_AMOUNT';
const SET_TARGET_AMOUNT = 'SET_TARGET_AMOUNT';

type SetBaseCurrencyAction = {
  type: typeof SET_BASE_CURRENCY;
  payload: {
    baseCur: string;
  };
};

type SetTargetCurrencyAction = {
  type: typeof SET_TARGET_CURRENCY;
  payload: {
    targetCur: string;
  };
};

type SetBaseAmount = {
  type: typeof SET_BASE_AMOUNT;
  payload: {
    baseAmount: string;
  };
};
type SetTargetAmount = {
  type: typeof SET_TARGET_AMOUNT;
  payload: {
    targetAmount: string;
  };
};

type ConverterActions =
  | SetBaseCurrencyAction
  | SetTargetCurrencyAction
  | SetBaseAmount
  | SetTargetAmount;

const converterReducer = (oldState: State, action: ConverterActions): State => {
  switch (action.type) {
    case SET_BASE_CURRENCY:
      return { ...oldState, baseCur: action.payload.baseCur };
    case SET_TARGET_CURRENCY:
      return { ...oldState, targetCur: action.payload.targetCur };
    case SET_BASE_AMOUNT:
      return { ...oldState, baseAmount: action.payload.baseAmount };
    case SET_TARGET_AMOUNT:
      return { ...oldState, targetAmount: action.payload.targetAmount };
    default:
      throw new Error();
  }
};

const ConverterMain = ({ currencies }: Props) => {
  const [state, dispatch] = useReducer<Reducer<State, ConverterActions>>(converterReducer, {
    baseCur: 'eur',
    targetCur: 'eur',
    baseAmount: '0',
    targetAmount: '0',
  });

  const { baseCur, targetCur, baseAmount, targetAmount } = state;

  const options = currencies.map((cur) => (
    <option key={cur} value={cur}>
      {cur}
    </option>
  ));

  return (
    <>
      <Flex my={2}>
        <Styled.Input
          type="number"
          value={baseAmount}
          onChange={(e) =>
            dispatch({
              type: SET_BASE_AMOUNT,
              payload: { baseAmount: e.target.value },
            })
          }
        />
        <Styled.Select
          value={baseCur}
          onChange={(e) =>
            dispatch({ type: SET_BASE_CURRENCY, payload: { baseCur: e.target.value } })
          }
        >
          {options}
        </Styled.Select>
      </Flex>
      <Flex my={2}>
        <Styled.Input
          type="number"
          value={targetAmount}
          onChange={(e) =>
            dispatch({
              type: SET_TARGET_AMOUNT,
              payload: { targetAmount: e.target.value },
            })
          }
        />
        <Styled.Select
          value={targetCur}
          onChange={(e) =>
            dispatch({ type: SET_TARGET_CURRENCY, payload: { targetCur: e.target.value } })
          }
        >
          {options}
        </Styled.Select>
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
