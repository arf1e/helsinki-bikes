import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import theme, { GlobalStyle } from '../common/theme';
import Background from '../components/Background/Background';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation />
        <Background>
          <Component {...pageProps} />
        </Background>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}
