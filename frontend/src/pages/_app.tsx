import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import theme, { GlobalStyle } from '../common/theme';
import Background from '../components/Background/Background';
import StatusBarContextProvider from '../components/StatusBarContextProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation />
        <StatusBarContextProvider>
          <Background>
            <Component {...pageProps} />
          </Background>
        </StatusBarContextProvider>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}
