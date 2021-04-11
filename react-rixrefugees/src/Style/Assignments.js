const { makeStyles } = require("@material-ui/core")

const classes = makeStyles((theme) => ({
    root : {
        width : '100%',
        display : "flex"
    },
    formRoot : {
        width : "100%"
    },
    listRoot : {
        width: '100%',
        maxWidth: 600,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    }
}));

module.exports = classes