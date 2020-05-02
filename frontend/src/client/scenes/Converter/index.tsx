import * as React from 'react';
import { Flex, Box, Text } from 'rebass/styled-components';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Spinner from '../../components/Spinner/index';
import ConverterMain from './components/ConverterMain';

const CURRENCIES_QUERY = gql`
  {
    currencies
  }
`;

const Styled = {
  Pane: styled(Box)`
    width: 100%;
    max-width: 650px;
    height: 400px;
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

const Converter = () => {
  const { loading, error, data } = useQuery(CURRENCIES_QUERY);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" px={2}>
      <h1>Currency Convertor</h1>
      <Styled.Pane p={3} m={3}>
        {!error ? (
          <>
            {loading || !data.currencies ? (
              <Spinner />
            ) : (
              <ConverterMain currencies={data.currencies} />
            )}
          </>
        ) : (
          <Text textAlign="center" color="error" fontWeight="bold" mt={3}>
            {error.message}
          </Text>
        )}
      </Styled.Pane>
    </Flex>
  );
};

export default hot(module)(Converter);
