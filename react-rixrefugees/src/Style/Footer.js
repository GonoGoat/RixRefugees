const { makeStyles } = require("@material-ui/core")

const classes = makeStyles({
    links : {
        display : 'inline-block',
        padding: '5px'
    },
    connection : {
        float : 'right'
    },
    admin : {
        float : 'left'
    }
});

module.exports = classes