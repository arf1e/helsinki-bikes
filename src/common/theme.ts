import { createGlobalStyle } from 'styled-components';

const theme = {
  primaryColor: '#6268FF',
  secondaryColor: '#cccfff',
  backgroundColor: '#fefeff',
  grayColor: '#bfc0cf',
  blackColor: '#212340',
  darkGrayColor: '#575a87',
  appBackgroundColor: '#f0f1ff',
  errorColor: '#FF626B',
  successColor: '#62FFD0',
  containerDesktopWidth: '80vw',
  minContainerDesktopWidth: '1120px',
  appBoxPadding: '24px',
};

export const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Roboto';
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    min-width: ${theme.minContainerDesktopWidth};
    max-width: 100vw;
    overflow-x: hidden;
    background-color: ${theme.appBackgroundColor};
  }

  body {
    min-width: ${theme.minContainerDesktopWidth}
  }
`;

export default theme;
