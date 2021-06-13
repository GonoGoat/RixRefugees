const { makeStyles } = require("@material-ui/core")

const classes = makeStyles((theme) => ({
    root : {
        minHeight : '1000px',
        paddingBottom : theme.spacing(8)
    },
}));

module.exports = classes