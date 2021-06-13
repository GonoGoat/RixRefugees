const { makeStyles } = require("@material-ui/core")

const classes = makeStyles((theme) => ({
    img : {
        maxWidth : '500px',
    },
    paper : {
        backgroundColor : theme.background.paper
    },
    container : {
        minHeight : '900px'
    }
}));

module.exports = classes