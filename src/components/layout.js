import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import { amber, blueGrey } from 'material-ui/colors'
import createPalette from 'material-ui/styles/createPalette'

export const PageWidthContainer = ({ children }) => (
  <div style={{ maxWidth: '30rem', padding: '0 1rem', margin: '0 auto' }}>
    {children}
  </div>
);

PageWidthContainer.propTypes = {
  children: PropTypes.node.isRequired
};

// Export material UI provider with standard configuration
// for use in App as well as tests, which require it for React context
const muiTheme = createMuiTheme({
  palette: createPalette({
    primary: blueGrey,
    accent: blueGrey,
    // accent1Color: blueGrey,
    error: amber,
    type: 'light'
  })
});

export const MaterialUIProvider = ({ children }) => (
  <MuiThemeProvider theme={muiTheme}>
    {children}
  </MuiThemeProvider>
);
