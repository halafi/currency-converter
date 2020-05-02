import * as React from 'react';
import { render } from 'react-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Normalize } from 'styled-normalize';
import { themeDefault } from './records/Theme';
import type { Theme } from './records/Theme';
import Converter from './scenes/Converter';

const client = new ApolloClient({
  uri: process.env.API_URL || 'http://localhost:8000/graphql',
});

const container = document.getElementById('container');

type GlobalStyleProps = {
  theme: Theme;
};

const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }: GlobalStyleProps) => theme.colors.text};
    font-family: 'Baloo 2', cursive;
  }
`;

if (container) {
  render(
    <ThemeProvider theme={themeDefault}>
      <ApolloProvider client={client}>
        <>
          <Normalize />
          <GlobalStyle />
          <Converter />
        </>
      </ApolloProvider>
    </ThemeProvider>,
    container,
  );
}
