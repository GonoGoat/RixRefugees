const { makeStyles } = require("@material-ui/core")

const classes = makeStyles((theme) => ({
    user : {
        backgroundColor : theme.palette.primary.main,
        color : theme.palette.common.white
    },
    admin : {
        backgroundColor : theme.palette.secondary.main,
        color : theme.palette.common.white
    },
}));

module.exports = classes