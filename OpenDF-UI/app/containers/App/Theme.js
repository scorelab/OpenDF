import {blue900} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const AppTheme = getMuiTheme({
  palette: {
    primary1Color: '#03a9f4',
    primaryLightColor: '#67daff',
    primaryDarkColor: '#007ac1',
    secondaryColor: '#263238',
    secondaryLightColor: '#4f5b62',
    secondaryDarkColor: '#000a12',
    primaryTextColor: '#000000',
    secondaryTextColor: '#ffffff'
  }
});

export default AppTheme;
