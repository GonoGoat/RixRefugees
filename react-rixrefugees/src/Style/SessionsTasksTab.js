const { makeStyles } = require("@material-ui/core")

const classes = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
       //fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      //fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));
  

module.exports = classes