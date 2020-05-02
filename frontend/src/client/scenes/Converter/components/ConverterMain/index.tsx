import * as React from 'react';
import { Flex, Box } from 'rebass/styled-components';
import styled from 'styled-components';

const Styled = {
  Pane: styled(Box)`
    width: 100%;
    max-width: 650px;
    border: 1px solid #dfe1e5;
    border-radius: 4px;
  `,
  Input: styled.input`
    border-radius: 6px;
    border: 1px solid #dfe1e5;
    color: #70757a;
    font-size: 14px;
    height: 36px;
    padding: 0 0 0 12px;
  `,
};

type Props = {
  currencies: string[];
};

const ConverterMain = ({ currencies }: Props) => {
  return (
    <>
      50 eur equals
      <Flex my={2}>
        <Styled.Input type="number" />
        <select>
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </Flex>
      <Flex my={2}>
        <Styled.Input type="number" />
        <select>
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </Flex>
    </>
  );
};

export default ConverterMain;
