const { makeStyles } = require("@material-ui/core")

const classes = makeStyles((theme) => ({
    button : {
        color : theme.palette.primary.main
    },
}));

module.exports = classes