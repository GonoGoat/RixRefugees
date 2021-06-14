const { createMuiTheme} = require('@material-ui/core/styles');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00bcd4',
    },
    secondary : {
      main : "#d50000",
      dark : '#950000'
    }
  },
  typography : {
    h6 : {
      marginBottom : '10px',
      textDecoration : 'underline'
    },
    h3 : {
      marginBottom : '20px',
    },
    body1 : {
      marginBottom : '10px'
    }
  },
  background : {
    paper : "#eeeeee"
  }
});

export default theme;