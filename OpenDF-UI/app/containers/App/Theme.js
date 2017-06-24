import {blue900} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const AppTheme = getMuiTheme({
  palette: {
    primary1Color: blue900,
  }
});

export default AppTheme;
