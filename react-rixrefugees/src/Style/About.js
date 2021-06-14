const { makeStyles } = require("@material-ui/core")

const classes = makeStyles((theme) => ({
    box : {
        padding : theme.spacing(2),
    },
    card : {
        backgroundColor : theme.background.paper,
        minHeight : '200px'
    }
}));

module.exports = classes