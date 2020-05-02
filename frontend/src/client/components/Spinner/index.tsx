import * as React from 'react';
import styled from 'styled-components';
import { Spinner8 } from 'styled-icons/icomoon';
import { Flex } from 'rebass/styled-components';

const Styled = {
  Spinner: styled(Spinner8)`
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(359deg);
      }
    }
    color: ${({ theme }) => theme.colors.secondary};
    animation: spin 0.8s linear infinite;
  `,
};

const Spinner = () => (
  /*
    // @ts-ignore flexGrow is incorrectly typed */
  <Flex flexGrow={1} justifyContent="center" alignItems="center" py={4}>
    <Styled.Spinner size={42} />
  </Flex>
);

export default Spinner;
