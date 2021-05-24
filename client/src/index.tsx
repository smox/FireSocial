import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AuthContextProvider from "./context/AuthContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#990011FF',
      main: '#990011FF',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FCF6F5FF',
      main: '#FCF6F5FF',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);