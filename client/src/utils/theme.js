import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#03a9f4',
    },
    secondary: {
      main: '#303030',
    },
  },
  overrides: {
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: '$labelcolor',
        },
      },
    },
  },
});

export default theme;
