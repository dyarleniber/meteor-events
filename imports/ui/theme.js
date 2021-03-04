import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';

const initialTheme = createMuiTheme({
  palette: {
    primary: {
      light: deepPurple[300],
      main: deepPurple[500],
      dark: deepPurple[700],
    },
  },
});

export const theme = responsiveFontSizes(initialTheme);
